import { PublicLegalLayout } from "@/components/legal/PublicLegalLayout";

export default function Privacy() {
  return (
    <PublicLegalLayout title="Privacy Policy">
      <p>
        <strong>Effective date:</strong> {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <p>
        Lumina (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates this application and is committed to protecting your privacy.
        This Privacy Policy describes how we collect, use, and safeguard information when you use our services.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Google Ads API — data usage disclosure</h2>
      <p>
        <strong>
          Lumina uses Google Ads API data for reporting and visualization purposes only, within the product you are using.
        </strong>{" "}
        With your consent and authorization, we access Google Ads account and campaign data through Google&apos;s official APIs solely to
        display performance metrics, aggregates, and related operational insights (such as spend, conversions, and ROAS-style measures) in
        your workspace. We do not use Google Ads API data for unrelated profiling, for selling personal information, or to serve
        third-party advertising outside the scope of the analytics and reporting features you request.
      </p>
      <p>
        Processing of this data is subject to Google&apos;s policies for developers and API customers. You can review Google&apos;s terms
        at{" "}
        <a
          href="https://developers.google.com/google-ads/api/terms-conditions"
          className="text-primary underline-offset-2 hover:underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads API Terms of Service
        </a>
        . Lumina does not claim ownership of your Google Ads data; you retain your rights subject to your agreements with Google.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Sale of data</h2>
      <p>
        <strong>We do not sell user data to third parties.</strong> We do not sell your personal information or your advertising account
        data to data brokers or unrelated advertisers.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Your control and Google account access</h2>
      <p>
        <strong>Users can revoke API access at any time through their Google Security settings.</strong> You may disconnect third-party
        access to your Google Account and manage which applications can access your data by visiting your Google Account security and
        permissions pages. Revoking access may limit or prevent Lumina from syncing Google Ads data until you reconnect.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Information we may process</h2>
      <p>
        Depending on how you use Lumina, we may process account identifiers, authentication data, and advertising metrics made available
        through connected platforms (including but not limited to Google Ads, Meta, TikTok, Snapchat, and X) strictly to provide the
        analytics features of the application.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Security</h2>
      <p>
        We implement appropriate technical and organizational measures designed to protect information in line with industry practice.
        No method of transmission over the Internet is completely secure; we strive to protect your data but cannot guarantee absolute
        security.
      </p>

      <h2 className="text-lg font-semibold text-foreground pt-2">Contact</h2>
      <p>
        For privacy-related requests, contact your organization&apos;s administrator or the support channel provided with your Lumina
        deployment.
      </p>

      <p className="text-xs text-muted-foreground/90 pt-4">
        This policy may be updated from time to time. Continued use of Lumina after changes constitutes acceptance of the revised policy
        where permitted by law.
      </p>
    </PublicLegalLayout>
  );
}
