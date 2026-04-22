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

const collectItems = [
  "Your email address when you join the waitlist or create an account",
  "Photos you voluntarily upload for vision board generation",
  "Basic usage data to improve the app experience",
];

const dontDoItems = [
  "We do not sell your data",
  "We do not sell your photos",
  "We do not share your information with advertisers",
];

const useItems = [
  "To generate your personalized AI vision board images",
  "To send you app updates and launch notifications",
  "To improve the Dreamt experience",
];

const prose: { title: string; body: string; isEmail?: boolean }[] = [
  {
    title: "Your photos",
    body: "Photos you upload are used solely to place your likeness into your dream life scenarios. They are not stored permanently after your images are generated unless you choose to save them.",
  },
  {
    title: "Third party services",
    body: "We use trusted third party services for hosting and email delivery. These services have their own privacy policies.",
  },
  {
    title: "Your rights",
    body: "You can request deletion of your data at any time by emailing us at support@newburyai.com",
    isEmail: true,
  },
  {
    title: "Cookies",
    body: "We use minimal cookies for basic app functionality only.",
  },
  {
    title: "Children",
    body: "Dreamt is not intended for users under 18.",
  },
  {
    title: "Contact",
    body: "support@newburyai.com",
    isEmail: true,
  },
];

function BulletList({
  items,
  accent,
}: {
  items: string[];
  accent: string;
}) {
  return (
    <ul className="space-y-2 mt-1">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            style={{ backgroundColor: accent, marginTop: "0.45rem" }}
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          />
          <span
            style={{ color: C.dark }}
            className="text-base leading-relaxed opacity-80"
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ color: C.muted }} className="text-sm">
            Last updated: April 2026
          </p>
          <div style={{ borderBottomColor: C.cardBorder }} className="border-b mt-8" />
        </div>

        {/* Bullet sections */}
        <div className="space-y-10 mb-10">

          <div>
            <h2
              style={{ fontFamily: serif, color: C.forest }}
              className="text-xl font-bold mb-3"
            >
              What we collect
            </h2>
            <BulletList items={collectItems} accent={C.forest} />
          </div>

          {/* What we DON'T do — highlighted card */}
          <div
            style={{
              backgroundColor: "white",
              borderTop: `4px solid ${C.forest}`,
            }}
            className="rounded-2xl p-8 shadow-sm"
          >
            <h2
              style={{ fontFamily: serif, color: C.forest }}
              className="text-xl font-bold mb-3"
            >
              What we don&apos;t do
            </h2>
            <BulletList items={dontDoItems} accent={C.gold} />
          </div>

          <div>
            <h2
              style={{ fontFamily: serif, color: C.forest }}
              className="text-xl font-bold mb-3"
            >
              How we use your data
            </h2>
            <BulletList items={useItems} accent={C.pink} />
          </div>

        </div>

        {/* Prose sections */}
        <div className="space-y-10">
          {prose.map((s) => (
            <div key={s.title}>
              <h2
                style={{ fontFamily: serif, color: C.forest }}
                className="text-xl font-bold mb-2"
              >
                {s.title}
              </h2>
              {s.isEmail && s.title === "Your rights" ? (
                <p style={{ color: C.dark }} className="text-base leading-relaxed opacity-80">
                  You can request deletion of your data at any time by emailing us at{" "}
                  <a
                    href="mailto:support@newburyai.com"
                    style={{ color: C.forest }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    support@newburyai.com
                  </a>
                </p>
              ) : s.isEmail ? (
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
            style={{ color: C.forest }}
            className="text-sm font-medium no-underline"
          >
            Privacy
          </Link>
        </div>
      </div>

    </main>
  );
}
