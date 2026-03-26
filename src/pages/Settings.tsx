import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  User,
  Mail,
  Lock,
  Globe,
  Clock,
  Moon,
  Sun,
  Check,
  Link2,
  Unlink,
  ChevronDown,
  Save,
} from "lucide-react";

/* ─── Platform Data ─── */
const platforms = [
  { id: "google", name: "Google Ads", color: "#4285f4", connected: true, account: "ads@company.com" },
  { id: "meta", name: "Meta Ads", color: "#1877f2", connected: true, account: "business@company.com" },
  { id: "tiktok", name: "TikTok Ads", color: "#fe2c55", connected: false, account: "" },
  { id: "snap", name: "Snapchat Ads", color: "#FFFC00", connected: false, account: "" },
  { id: "x", name: "X Ads", color: "#71717a", connected: true, account: "@company" },
];

const currencies = ["USD ($)", "EUR (€)", "GBP (£)", "JPY (¥)", "CAD (C$)", "AUD (A$)"];
const timezones = [
  "America/New_York (EST)",
  "America/Chicago (CST)",
  "America/Denver (MST)",
  "America/Los_Angeles (PST)",
  "Europe/London (GMT)",
  "Europe/Berlin (CET)",
  "Asia/Tokyo (JST)",
  "Australia/Sydney (AEST)",
];

/* ─── Helpers ─── */
function PlatformLogo({ color, name }: { color: string; name: string }) {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: color + "20", color }}>
      {name.charAt(0)}
    </div>
  );
}

function Dropdown({ value, onChange, options, icon: Icon }: { value: string; onChange: (v: string) => void; options: string[]; icon: React.ElementType }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-accent/30 border border-border text-sm text-foreground hover:bg-accent/50 transition-colors"
      >
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="flex-1 text-left">{value}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-20 mt-1 w-full rounded-lg border border-border bg-card shadow-xl py-1 max-h-48 overflow-y-auto"
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                value === opt ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Stagger ─── */
const stagger = {
  container: { transition: { staggerChildren: 0.06 } },
  item: { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

/* ─── Page ─── */
const Settings = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [connections, setConnections] = useState(platforms);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@company.com");
  const [currency, setCurrency] = useState("USD ($)");
  const [timezone, setTimezone] = useState("America/New_York (EST)");
  const darkMode = resolvedTheme === "dark";

  const toggleConnection = (id: string) => {
    setConnections((prev) => prev.map((p) => p.id === id ? { ...p, connected: !p.connected } : p));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-8">
        {/* ── Ad Platform Integrations ── */}
        <section>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-primary" /> Ad Platform Integrations
          </motion.h2>
          <motion.div variants={stagger.container} initial="initial" animate="animate" className="space-y-3">
            {connections.map((p) => (
              <motion.div
                key={p.id}
                variants={stagger.item}
                className="glass-card-hover flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <PlatformLogo color={p.color} name={p.name} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    {p.connected ? (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 shrink-0 text-primary" /> Connected
                        {p.account ? ` · ${p.account}` : ""}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleConnection(p.id)}
                  className={`flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg px-3.5 py-2.5 text-xs font-medium transition-colors sm:w-auto sm:py-2 ${
                    p.connected
                      ? "bg-danger/10 text-danger hover:bg-danger/20"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {p.connected ? <><Unlink className="w-3 h-3" /> Disconnect</> : <><Link2 className="w-3 h-3" /> Connect</>}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Account Settings ── */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Account Settings
          </h2>
          <div className="glass-card p-5 space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-accent/30 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-accent/30 border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value="••••••••••"
                  readOnly
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-accent/30 border border-border text-sm text-muted-foreground cursor-not-allowed"
                />
              </div>
              <button className="text-xs text-primary hover:text-primary/80 mt-1.5 transition-colors">Change password</button>
            </div>

            <button className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5 mt-2">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        </motion.section>

        {/* ── Preferences ── */}
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Preferences
          </h2>
          <div className="glass-card p-5 space-y-5">
            {/* Currency */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Currency</label>
              <Dropdown value={currency} onChange={setCurrency} options={currencies} icon={Globe} />
            </div>
            {/* Timezone */}
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Timezone</label>
              <Dropdown value={timezone} onChange={setTimezone} options={timezones} icon={Clock} />
            </div>
            {/* Dark Mode */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-muted-foreground" />}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Dark Mode</p>
                  <p className="text-[11px] text-muted-foreground">Use dark theme across the dashboard</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTheme(darkMode ? "light" : "dark")}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center self-start rounded-full transition-colors duration-200 sm:self-auto ${
                  darkMode ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-foreground transition-transform duration-200 ${
                    darkMode ? "translate-x-[22px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
