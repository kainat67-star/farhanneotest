import { Link } from "react-router-dom";
import { PublicLegalLayout } from "@/components/legal/PublicLegalLayout";

export default function Terms() {
  return (
    <PublicLegalLayout title="Terms of Service">
      <p>
        <strong>Effective date:</strong> {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of Lumina (the &quot;Service&quot;). By accessing or using
        the Service, you agree to these Terms.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Use of the Service</h2>
      <p>
        You agree to use the Service only for lawful purposes and in accordance with these Terms and applicable third-party platform
        policies (including Google Ads, Meta, TikTok, Snapchat, and X where you connect accounts).
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Accounts and authentication</h2>
      <p>
        You are responsible for maintaining the confidentiality of your credentials and for activity under your account. You must provide
        accurate information where required and notify us promptly of unauthorized use if applicable.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Data and integrations</h2>
      <p>
        The Service may process advertising and analytics data from connected platforms to provide reporting and visualization. Your use
        of third-party APIs remains subject to those providers&apos; terms and policies. See our{" "}
        <Link to="/privacy" className="text-primary underline-offset-2 hover:underline">
          Privacy Policy
        </Link>{" "}
        for additional detail.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Google Ads API — data usage disclosure</h2>
      <p>
        When you connect a Google Ads account, Lumina accesses Google Ads API data only with your authorization and only to deliver the
        reporting, metrics, and product features you enable (for example dashboards and exports). We do not use Google Ads API data to serve
        unrelated ads, build unrelated user profiles for sale, or for purposes outside operating the Service for your workspace.
      </p>
      <p>
        Your use of the Google Ads API through Lumina remains subject to Google&apos;s applicable terms and policies, including the{" "}
        <a
          href="https://developers.google.com/google-ads/api/terms-conditions"
          className="text-primary underline-offset-2 hover:underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads API Terms of Service
        </a>
        . For the full privacy-oriented description of how we receive, use, retain, and protect Google Ads data — and how you can revoke
        access — see the{" "}
        <Link to="/privacy" className="text-primary underline-offset-2 hover:underline font-medium">
          Privacy Policy
        </Link>
        , section &quot;Google Ads API — data usage disclosure.&quot;
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Disclaimers</h2>
      <p>
        The Service is provided &quot;as is&quot; without warranties of any kind, express or implied, to the fullest extent permitted by
        law. We do not warrant uninterrupted or error-free operation.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Lumina and its suppliers shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Changes</h2>
      <p>
        We may modify these Terms from time to time. Material changes will be communicated as appropriate. Continued use of the Service
        after changes constitutes acceptance of the updated Terms where permitted by law.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Contact</h2>
      <p>For questions about these Terms, contact your organization&apos;s administrator or the support channel for your deployment.</p>
    </PublicLegalLayout>
  );
}
