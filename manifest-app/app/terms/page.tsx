import Link from "next/link";

const C = {
  cream: "#F7F3EE",
  forest: "#2D6A4F",
  dark: "#1a1a1a",
  muted: "#888888",
  cardBorder: "#e8e0d4",
};

const serif = "var(--font-playfair, Georgia, serif)";
const sans = "var(--font-geist-sans, system-ui, sans-serif)";

const sections = [
  {
    title: "What Dreamt is",
    body: "Dreamt is a manifestation and visualization app designed to help users connect emotionally with their personal goals. It is not a therapeutic, medical, or psychological service.",
  },
  {
    title: "Your account",
    body: "You are responsible for keeping your login information secure. You must be 18 or older to use Dreamt.",
  },
  {
    title: "Your content",
    body: "Any photos you upload remain yours. We use them only to generate your personalized vision board images. We do not sell or share your photos with third parties.",
  },
  {
    title: "Payments",
    body: "Subscriptions auto-renew unless cancelled at least 24 hours before the renewal date. All purchases are final unless required by law.",
  },
  {
    title: "Our content",
    body: "All app content, design, and generated images are owned by Dreamt. You may not copy or redistribute them.",
  },
  {
    title: "Disclaimer",
    body: "Dreamt does not guarantee any specific life outcomes. Results are personal and vary by individual.",
  },
  {
    title: "Changes",
    body: "We may update these terms at any time. Continued use means you accept the changes.",
  },
  {
    title: "Contact",
    body: "support@newburyai.com",
    isEmail: true,
  },
];

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: C.cream, fontFamily: sans, minHeight: "100vh" }}>

      {/* Nav */}
      <div style={{ borderBottomColor: C.cardBorder }} className="border-b px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div
              style={{ backgroundColor: C.forest }}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C19 7 19 17 12 22C5 17 5 7 12 2Z" fill="white" />
                <path
                  d="M12 22V9"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              style={{ color: C.forest, fontFamily: serif }}
              className="text-lg font-semibold"
            >
              Dreamt
            </span>
          </Link>
          <Link
            href="/"
            style={{ color: C.muted, fontFamily: sans }}
            className="text-sm hover:opacity-60 transition-opacity no-underline"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 pb-28">

        {/* Header */}
        <div className="mb-14">
          <p style={{ color: C.muted }} className="text-sm mb-3 uppercase tracking-widest">
            Legal
          </p>
          <h1
            style={{ fontFamily: serif, color: C.dark }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Terms of Service
          </h1>
          <p style={{ color: C.muted }} className="text-sm">
            Last updated: April 2026
          </p>
          <div
            style={{ borderBottomColor: C.cardBorder }}
            className="border-b mt-8"
          />
          <p style={{ color: C.dark }} className="mt-6 text-base leading-relaxed opacity-80">
            By accessing or using Dreamt you agree to these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2
                style={{ fontFamily: serif, color: C.forest }}
                className="text-xl font-bold mb-2"
              >
                {s.title}
              </h2>
              {s.isEmail ? (
                <a
                  href={`mailto:${s.body}`}
                  style={{ color: C.forest }}
                  className="text-base hover:opacity-70 transition-opacity"
                >
                  {s.body}
                </a>
              ) : (
                <p style={{ color: C.dark }} className="text-base leading-relaxed opacity-80">
                  {s.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTopColor: C.cardBorder,
          backgroundColor: C.cream,
        }}
        className="border-t px-6 py-8"
      >
        <div className="max-w-3xl mx-auto flex gap-8 justify-center">
          <Link
            href="/terms"
            style={{ color: C.forest }}
            className="text-sm font-medium no-underline"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            style={{ color: C.muted }}
            className="text-sm hover:opacity-60 transition-opacity no-underline"
          >
            Privacy
          </Link>
        </div>
      </div>

    </main>
  );
}
