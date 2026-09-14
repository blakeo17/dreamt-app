import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="support-page">
      <header className="support-header">
        <Link href="/" className="back-link">
          ← Back to RIZE
        </Link>
      </header>

      <main className="support-main">
        <span className="support-label">Support</span>
        <h1>How can we help?</h1>
        <p className="support-subtext">
          Questions, feedback, or something broken — reach out and we&apos;ll get back to you.
        </p>

        <div className="contact-card">
          <h2>Contact us</h2>
          <p>We&apos;d love to hear from you.</p>
          <a href="mailto:support@tryrize.app" className="contact-btn">
            support@tryrize.app
          </a>
        </div>

        <p className="response-time">Typical response time: 1–2 business days</p>
      </main>
    </div>
  );
}
