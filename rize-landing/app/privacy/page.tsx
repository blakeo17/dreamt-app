import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <Link href="/" className="back-link">
          ← Back to RIZE
        </Link>
      </header>

      <main className="privacy-main">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated September 2026</p>

        <div className="privacy-content">
          <p>
            RiZe is an upcoming app by Newbury AI LLC. This website is currently a waitlist page.
          </p>

          <h2>What we collect</h2>
          <p>Only the email address you submit to join the waitlist.</p>

          <h2>How we use it</h2>
          <p>
            To notify you when RiZe launches and to share occasional updates about the product. Nothing else.
          </p>

          <h2>What we don&apos;t do</h2>
          <p>We don&apos;t sell, rent, or share your email with third parties.</p>

          <h2>Analytics</h2>
          <p>
            We use Vercel Analytics to measure page visits. It collects anonymous traffic data and doesn&apos;t track or identify individuals.
          </p>

          <h2>Your control</h2>
          <p>
            You can ask us to delete your email at any time by emailing{" "}
            <a href="mailto:support@tryrize.app">support@tryrize.app</a> and we&apos;ll remove it.
          </p>

          <h2>Contact</h2>
          <p>
            <a href="mailto:support@tryrize.app">support@tryrize.app</a>
          </p>
        </div>
      </main>
    </div>
  );
}
