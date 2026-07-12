import Link from "next/link";

const C = {
  cream: "#F7F3EE",
  forest: "#2D6A4F",
  gold: "#F5C842",
  pink: "#F4A7B9",
  dark: "#1a1a1a",
  muted: "#888888",
  cardBorder: "#e8e0d4",
};

const serif = "var(--font-playfair, Georgia, serif)";
const sans = "var(--font-geist-sans, system-ui, sans-serif)";

export default function SupportPage() {
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

      {/* Hero Section */}
      <div
        style={{
          background: `linear-gradient(180deg, rgba(45,106,79,0.08) 0%, ${C.cream} 100%)`,
        }}
        className="px-6 py-16 md:py-24"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            style={{ color: C.forest, fontFamily: sans }}
            className="text-sm mb-4 uppercase tracking-widest font-medium"
          >
            Support
          </p>
          <h1
            style={{ fontFamily: serif, color: C.dark }}
            className="text-4xl md:text-5xl font-bold mb-5"
          >
            How can we help?
          </h1>
          <p style={{ color: C.muted }} className="text-base md:text-lg max-w-md mx-auto">
            Thanks for reaching out to Dreamt Support. We&apos;re here to help with any questions, feedback, or issues you might have.
          </p>
        </div>
      </div>

      {/* Contact Card */}
      <div className="px-6 pb-24">
        <div className="max-w-md mx-auto">
          <div
            style={{
              backgroundColor: "white",
              border: `1px solid ${C.cardBorder}`,
            }}
            className="rounded-2xl p-8 shadow-sm text-center"
          >
            {/* Mail Icon */}
            <div
              style={{ backgroundColor: "rgba(45,106,79,0.08)" }}
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.forest}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </div>

            <h2
              style={{ fontFamily: serif, color: C.dark }}
              className="text-xl font-bold mb-3"
            >
              Contact Us
            </h2>

            <p style={{ color: C.muted }} className="text-sm mb-6 leading-relaxed">
              Send us an email and we&apos;ll get back to you as soon as we can.
            </p>

            {/* Email Button */}
            <a
              href="mailto:support@trydreamt.app"
              style={{
                backgroundColor: C.forest,
                color: "white",
                fontFamily: sans,
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity no-underline"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              support@trydreamt.app
            </a>

            {/* Response Time */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <span
                style={{ backgroundColor: C.forest }}
                className="w-2 h-2 rounded-full"
              />
              <p style={{ color: C.muted }} className="text-xs">
                Typical response time: 1–2 business days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{ borderTopColor: C.cardBorder, backgroundColor: C.cream }}
        className="border-t px-6 py-8"
      >
        <div className="max-w-3xl mx-auto flex gap-8 justify-center">
          <Link
            href="/terms"
            style={{ color: C.muted }}
            className="text-sm hover:opacity-60 transition-opacity no-underline"
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
          <Link
            href="/support"
            style={{ color: C.forest }}
            className="text-sm font-medium no-underline"
          >
            Support
          </Link>
        </div>
      </div>

    </main>
  );
}
