"use client";

import { useState } from "react";
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

function LeafLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        style={{ backgroundColor: C.forest }}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C19 7 19 17 12 22C5 17 5 7 12 2Z" fill="white" />
          <path
            d="M12 22V9"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 14C14.5 11.5 17 10 19 9"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span style={{ color: C.forest, fontFamily: serif }} className="text-2xl font-semibold tracking-wide">
        Dreamt
      </span>
    </div>
  );
}

// Used in How It Works section
function PhoneMockup({ label }: { label: string }) {
  return (
    <div
      style={{
        backgroundColor: "#ece6dc",
        border: "2px dashed #c8bfb0",
        color: "#b0a898",
        fontFamily: sans,
      }}
      className="w-44 h-80 rounded-[2.5rem] flex items-center justify-center text-sm font-medium select-none"
    >
      [{label}]
    </div>
  );
}

const LOOPS_FORM_URL = "https://app.loops.so/api/newsletter-form/cmn85yiux0kp10i0qxkxjaca3";

// Wide email form — used in hero and final CTA
function WideEmailForm({
  buttonText = "Join Waitlist",
  microcopy = "Be first to know when we launch · No spam ever",
  inputId,
}: {
  buttonText?: string;
  microcopy?: string;
  inputId?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("Oops! Something went wrong, please try again");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limit: prevent submissions within 60s of each other
    const now = Date.now();
    const prev = localStorage.getItem("loops-form-timestamp");
    if (prev && Number(prev) + 60000 > now) {
      setErrorMsg("Too many signups, please try again in a little while");
      setStatus("error");
      return;
    }
    localStorage.setItem("loops-form-timestamp", String(now));

    setStatus("loading");

    try {
      const res = await fetch(LOOPS_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userGroup=&mailingLists=&email=${encodeURIComponent(email)}`,
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.message || res.statusText || "Something went wrong");
        setStatus("error");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Failed to fetch") {
        setErrorMsg("Too many signups, please try again in a little while");
        localStorage.setItem("loops-form-timestamp", "");
      } else if (msg) {
        setErrorMsg(msg);
      }
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p style={{ color: C.forest, fontFamily: serif }} className="text-lg font-semibold italic py-4 text-center">
        ✓ You&apos;re on the list. We&apos;ll be in touch.
      </p>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-2">
        <p style={{ color: "#b91c1c", fontFamily: sans }} className="text-sm mb-3">{errorMsg}</p>
        <button
          onClick={() => { setStatus("idle"); setEmail(""); }}
          style={{ color: C.muted, fontFamily: sans }}
          className="text-sm underline cursor-pointer bg-transparent border-none"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{ backgroundColor: "white", border: "1.5px solid #ddd5c8" }}
          className="flex items-center rounded-xl shadow-sm overflow-hidden"
        >
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === "loading"}
            style={{ color: C.dark, fontFamily: sans, outline: "none" }}
            className="flex-1 px-5 py-4 text-base placeholder:text-gray-400 bg-transparent min-w-0"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{ backgroundColor: C.forest, color: "white", fontFamily: sans }}
            className="px-6 py-3 m-1.5 rounded-lg font-semibold text-sm uppercase tracking-widest whitespace-nowrap hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex-shrink-0 disabled:opacity-70"
          >
            {status === "loading" ? "Please wait..." : buttonText}
          </button>
        </div>
      </form>
      <p style={{ color: C.muted, fontFamily: sans }} className="text-xs text-center mt-3">
        {microcopy}
      </p>
    </div>
  );
}

// Section 6 pill-style form
function EmailForm({ buttonText }: { buttonText: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p style={{ color: C.forest, fontFamily: serif }} className="text-lg font-semibold italic py-4 text-center">
        ✓ You&apos;re on the list. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{ borderColor: C.forest, color: C.dark, backgroundColor: "white", fontFamily: sans, outline: "none" }}
        className="flex-1 px-5 py-3.5 rounded-full border-2 text-base placeholder:text-gray-400"
      />
      <button
        type="submit"
        style={{ backgroundColor: C.forest, color: "white", fontFamily: sans }}
        className="px-7 py-3.5 rounded-full font-semibold text-base whitespace-nowrap hover:opacity-90 active:scale-95 transition-all cursor-pointer"
      >
        {buttonText}
      </button>
    </form>
  );
}

function AvatarCluster() {
  const avatars = [
    { initial: "A", bg: "#1E5940" },
    { initial: "M", bg: "#7A5E2A" },
    { initial: "S", bg: "#4E8B5F" },
    { initial: "J", bg: "#2D4F4F" },
  ];
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex">
        {avatars.map((a, i) => (
          <div
            key={i}
            style={{
              backgroundColor: a.bg,
              color: "white",
              marginLeft: i === 0 ? 0 : "-10px",
              zIndex: 10 - i,
              border: "2.5px solid white",
              position: "relative",
              fontFamily: sans,
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
          >
            {a.initial}
          </div>
        ))}
      </div>
      <p style={{ color: C.dark, fontFamily: sans }} className="text-sm">
        Joining <strong>1,000+</strong> people already on the waitlist
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ fontFamily: sans }}>

      {/* ──────────────────────────────────────────
          SECTION 1 — HERO
      ────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: C.cream }}
        className="relative flex flex-col"
      >
        {/* Background blobs — own overflow-hidden wrapper so they don't cause scroll */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-150px", left: "-200px",
            width: "580px", height: "580px",
            backgroundColor: "rgba(172, 182, 166, 0.3)",
            borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", bottom: "4%", left: "-110px",
            width: "360px", height: "360px",
            backgroundColor: "rgba(244, 167, 185, 0.17)",
            borderRadius: "50%",
          }} />
          <div style={{
            position: "absolute", top: "20%", right: "-80px",
            width: "260px", height: "260px",
            backgroundColor: "rgba(245, 200, 66, 0.09)",
            borderRadius: "50%",
          }} />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-5 md:px-12 py-5 w-full">
          <LeafLogo />
          <button
            onClick={() => document.getElementById("hero-email")?.focus()}
            style={{
              border: "1.5px solid rgba(26,26,26,0.35)",
              color: C.dark,
              fontFamily: sans,
              backgroundColor: "transparent",
            }}
            className="px-5 py-2 rounded-full text-sm hover:bg-black/5 transition-colors cursor-pointer"
          >
            Join waitlist
          </button>
        </nav>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-6 pb-10">

          {/* Outlined pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-7 md:mb-10">
            <span
              style={{ border: `1px solid ${C.forest}`, color: C.forest, backgroundColor: "rgba(45,106,79,0.07)" }}
              className="px-5 py-1.5 rounded-full text-sm"
            >
              Abundance
            </span>
            <span
              style={{ border: "1px solid #c9a42a", color: "#9a7a0a", backgroundColor: "rgba(245,200,66,0.08)" }}
              className="px-5 py-1.5 rounded-full text-sm"
            >
              Wealth
            </span>
            <span
              style={{ border: "1px solid #e0809a", color: "#b05570", backgroundColor: "rgba(244,167,185,0.1)" }}
              className="px-5 py-1.5 rounded-full text-sm"
            >
              Love
            </span>
          </div>

          {/* Headline — dark first line, green italic second line */}
          <h1
            style={{ fontFamily: serif, color: C.dark }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 max-w-3xl"
          >
            Your dream life is
            <br />
            <span style={{ color: C.forest, fontStyle: "italic" }}>
              closer than you think.
            </span>
          </h1>

          {/* Subheadline — two separate lines */}
          <p style={{ color: C.dark }} className="text-lg md:text-2xl opacity-70 mb-1">
            You know it&apos;s possible.
          </p>
          <p style={{ color: C.dark }} className="text-lg md:text-2xl opacity-70 mb-5">
            You just can&apos;t feel it yet.
          </p>

          {/* Italic emphasis */}
          <p style={{ fontFamily: serif, color: C.forest }} className="text-lg md:text-2xl italic font-medium mb-8 md:mb-10">
            We change that.
          </p>

          {/* Wide email form */}
          <div className="w-full max-w-lg">
            <WideEmailForm inputId="hero-email" />
          </div>
        </div>

        {/* Three-card phone mockup fan */}
        <div className="relative z-10 flex items-end justify-center px-4 gap-5 mt-2">

          {/* Left — ONBOARDING (rotated, only shown on lg+) */}
          <div
            style={{ transform: "rotate(-6deg)", zIndex: 0, position: "relative", width: "256px", height: "553px", flexShrink: 0 }}
            className="hidden lg:block rounded-3xl overflow-hidden shadow-sm"
          >
            <img src="/onboarding.png" alt="Dreamt onboarding mockup" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>

          {/* Center — VISION BOARD (always visible, on top) */}
          <img
            src="/vision-board.png"
            alt="Dreamt vision board mockup"
            style={{ zIndex: 10, position: "relative" }}
            className="w-56 sm:w-64 md:w-72 rounded-3xl flex-shrink-0 shadow-md"
          />

          {/* Right — DAILY PRACTICE (rotated, only shown on lg+) */}
          <div
            style={{ transform: "rotate(6deg)", zIndex: 0, position: "relative", width: "256px", height: "553px", flexShrink: 0 }}
            className="hidden lg:block rounded-3xl overflow-hidden shadow-sm"
          >
            <img src="/daily-practice.png" alt="Dreamt daily practice mockup" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
        </div>

        {/* Social proof */}
        <div className="relative z-10 flex justify-center pt-10 pb-16">
          <AvatarCluster />
        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION 2 — THE PROBLEM
      ────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: C.forest }}
        className="relative py-16 px-6 overflow-hidden"
      >
        {/* Background blob */}
        <div style={{
          position: "absolute", top: "-100px", left: "-180px",
          width: "480px", height: "480px",
          backgroundColor: "rgba(172, 182, 166, 0.18)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto">

          {/* "SOUND FAMILIAR" badge */}
          <div className="flex justify-center mb-14">
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.65)",
                fontFamily: sans,
                letterSpacing: "0.14em",
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase"
            >
              <span style={{ backgroundColor: C.pink }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
              Sound Familiar
            </span>
          </div>

          {/* Row 01 */}
          <div className="relative">
            <div style={{ borderTopColor: "rgba(255,255,255,0.13)" }} className="border-t" />
            <span style={{ color: "rgba(255,255,255,0.22)", fontFamily: sans, position: "absolute", top: "-9px", left: 0 }} className="text-xs">
              01
            </span>
            <div className="py-8 text-center">
              <p style={{ fontFamily: serif, color: "white" }} className="text-2xl md:text-3xl leading-snug">
                You&apos;ve seen it in your head a thousand times.
              </p>
            </div>
          </div>

          {/* Row 02 */}
          <div className="relative">
            <div style={{ borderTopColor: "rgba(255,255,255,0.13)" }} className="border-t" />
            <span style={{ color: "rgba(255,255,255,0.22)", fontFamily: sans, position: "absolute", top: "-9px", left: 0 }} className="text-xs">
              02
            </span>
            <div className="py-8 text-center">
              <p style={{ fontFamily: serif, color: "white" }} className="text-2xl md:text-3xl leading-snug">
                The{" "}
                <span style={{ color: C.gold, fontStyle: "italic" }}>home.</span>
                {" "}The{" "}
                <span style={{ color: C.gold, fontStyle: "italic" }}>car.</span>
                {" "}The{" "}
                <span style={{ color: C.gold, fontStyle: "italic" }}>freedom.</span>
                {" "}The{" "}
                <span style={{ color: C.gold, fontStyle: "italic" }}>love.</span>
              </p>
            </div>
          </div>

          {/* Row 03 — italic, fading */}
          <div className="relative">
            <div style={{ borderTopColor: "rgba(255,255,255,0.13)" }} className="border-t" />
            <span style={{ color: "rgba(255,255,255,0.15)", fontFamily: sans, position: "absolute", top: "-9px", left: 0 }} className="text-xs">
              03
            </span>
            <div className="py-8 text-center">
              <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.52)", fontStyle: "italic" }} className="text-2xl md:text-3xl leading-snug">
                But it still feels like someday.
              </p>
            </div>
          </div>

          {/* Row 04 — most faded */}
          <div className="relative">
            <div style={{ borderTopColor: "rgba(255,255,255,0.13)" }} className="border-t" />
            <span style={{ color: "rgba(255,255,255,0.1)", fontFamily: sans, position: "absolute", top: "-9px", left: 0 }} className="text-xs">
              04
            </span>
            <div className="py-8 text-center">
              <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.32)" }} className="text-2xl md:text-3xl leading-snug">
                Like a fantasy. Like it&apos;s meant for someone else.
              </p>
            </div>
          </div>

          {/* Closing divider */}
          <div style={{ borderTopColor: "rgba(255,255,255,0.13)" }} className="border-t" />

          {/* THE TRUTH card */}
          <div className="my-10">
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              className="rounded-2xl px-5 sm:px-8 py-8 sm:py-10 text-center relative overflow-hidden"
            >
              {/* Card blobs */}
              <div style={{
                position: "absolute", bottom: "-50px", left: "-50px",
                width: "180px", height: "180px",
                backgroundColor: "rgba(45,106,79,0.5)",
                borderRadius: "50%", pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: "-40px", right: "-40px",
                width: "140px", height: "140px",
                backgroundColor: "rgba(25,65,45,0.55)",
                borderRadius: "50%", pointerEvents: "none",
              }} />

              <div className="relative z-10">
                <p
                  style={{ color: "rgba(255,255,255,0.38)", fontFamily: sans, letterSpacing: "0.16em" }}
                  className="text-xs uppercase mb-7"
                >
                  The Truth
                </p>
                <p style={{ fontFamily: serif, color: "white" }} className="text-xl md:text-2xl font-bold leading-snug mb-2">
                  It&apos;s not meant for someone else.
                </p>
                <p style={{ fontFamily: serif, color: "white" }} className="text-xl md:text-2xl font-bold leading-snug mb-6">
                  You just haven&apos;t{" "}
                  <span style={{ color: C.pink, fontStyle: "italic" }}>seen yourself there</span>
                  {" "}yet.
                </p>
                <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.42)", fontStyle: "italic" }} className="text-sm mb-7">
                  That&apos;s exactly what Dreamt changes.
                </p>
                {/* Dot · line · dot */}
                <div className="flex items-center justify-center gap-2">
                  <div style={{ backgroundColor: C.gold }} className="w-1.5 h-1.5 rounded-full" />
                  <div style={{ backgroundColor: "rgba(255,255,255,0.25)", width: "32px", height: "1px" }} />
                  <div style={{ backgroundColor: C.pink }} className="w-1.5 h-1.5 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* KEEP GOING */}
          <div className="flex justify-center pb-6">
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: sans, letterSpacing: "0.16em" }} className="text-xs uppercase">
              Keep Going
            </p>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION 3 — HOW IT WORKS
      ────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="relative py-24 px-6 overflow-hidden">
        {/* Background blob */}
        <div style={{
          position: "absolute", top: "-80px", left: "-160px",
          width: "420px", height: "420px",
          backgroundColor: "rgba(172, 182, 166, 0.2)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* HOW IT WORKS badge */}
          <div className="flex justify-center mb-8">
            <span
              style={{
                backgroundColor: "rgba(45,106,79,0.07)",
                border: "1px solid rgba(45,106,79,0.2)",
                color: C.forest,
                fontFamily: sans,
                letterSpacing: "0.14em",
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase"
            >
              <span style={{ backgroundColor: C.forest }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
              How It Works
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{ fontFamily: serif, color: C.dark }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight mb-4"
          >
            Three steps to feeling
            <br />
            <span style={{ color: C.forest, fontStyle: "italic" }}>your dream life now.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{ fontFamily: serif, color: C.muted, fontStyle: "italic" }}
            className="text-center text-lg mb-10 md:mb-16"
          >
            No vision board has ever felt this real.
          </p>

          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {[
              {
                num: 1,
                cardBg: "#cee8d8",
                mockupSrc: "/onboarding.png",
                mockupAlt: "Dreamt onboarding mockup",
                mockupOffset: 0,
                badgeBg: "rgba(45,106,79,0.1)",
                badgeColor: C.forest,
                title: "Build your dream life",
                desc: "Answer a few deep questions. Where you live. What you drive. How you feel when you wake up. We build your world from your words.",
              },
              {
                num: 2,
                cardBg: C.forest,
                mockupSrc: "/vision-board.png",
                mockupAlt: "Dreamt vision board mockup",
                mockupOffset: 0,
                badgeBg: "rgba(245,200,66,0.22)",
                badgeColor: "#8a6800",
                title: "See yourself inside it",
                desc: "AI places you — your face, your energy — inside your exact dream life. Not a fantasy. You. There. Now.",
              },
              {
                num: 3,
                cardBg: "#fce8ec",
                mockupSrc: "/daily-practice.png",
                mockupAlt: "Dreamt daily practice mockup",
                mockupOffset: 60,
                badgeBg: "rgba(244,167,185,0.22)",
                badgeColor: "#b05570",
                title: "Feel it every single day",
                desc: "Every morning, a 60 second visualization puts you inside your dream life. Every evening, a simple check-in keeps you aligned.",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{ backgroundColor: "white" }}
                className="rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                <div
                  className="overflow-hidden h-[420px] md:h-[560px]"
                >
                  <img
                    src={step.mockupSrc}
                    alt={step.mockupAlt}
                    style={{
                      display: "block", width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "top",
                      transform: step.num === 3 ? "scale(1.2)" : "none",
                      transformOrigin: "top center",
                    }}
                  />
                </div>

                {/* Content area */}
                <div className="pt-4 px-7 pb-7 flex-1">
                  {/* Number badge */}
                  <div
                    style={{
                      backgroundColor: step.badgeBg,
                      color: step.badgeColor,
                      fontFamily: sans,
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "14px",
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: serif, color: C.dark }} className="text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p style={{ color: C.muted }} className="text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom tagline + CTA */}
          <div className="flex flex-col items-center mt-20 gap-7">
            <p style={{ fontFamily: serif, color: C.dark }} className="text-xl md:text-2xl text-center">
              <span style={{ fontStyle: "italic", color: C.muted }}>
                Your dream life isn&apos;t someday.
              </span>
              {" "}
              <strong>It&apos;s every morning.</strong>
            </p>
            <button
              onClick={() => document.getElementById("hero-email")?.focus()}
              style={{
                backgroundColor: C.forest,
                color: "white",
                fontFamily: sans,
                letterSpacing: "0.13em",
              }}
              className="px-9 py-4 rounded-full text-sm font-semibold uppercase hover:opacity-90 transition-opacity cursor-pointer"
            >
              Join the Waitlist
            </button>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION 4 — SOCIAL PROOF
      ────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#ffffff" }}
        className="relative py-24 px-6 overflow-hidden"
      >
        {/* Background blob */}
        <div style={{
          position: "absolute", top: "-60px", left: "-140px",
          width: "380px", height: "380px",
          backgroundColor: "rgba(172, 182, 166, 0.13)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* "REAL PEOPLE. REAL SHIFTS." badge */}
          <div className="flex justify-center mb-8">
            <span
              style={{
                backgroundColor: "rgba(244,167,185,0.1)",
                border: "1px solid rgba(244,167,185,0.45)",
                color: "#b05570",
                fontFamily: sans,
                letterSpacing: "0.14em",
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase"
            >
              <span style={{ backgroundColor: C.pink }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
              Real People. Real Shifts.
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{ fontFamily: serif, color: C.dark }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight mb-4"
          >
            Something shifts when you
            <br />
            <span style={{ color: C.forest, fontStyle: "italic" }}>see yourself there.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{ fontFamily: serif, color: C.muted, fontStyle: "italic" }}
            className="text-center text-lg mb-14"
          >
            This is what people feel the moment it becomes real.
          </p>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                accent: C.forest,
                quoteNode: (
                  <>
                    <em>I cried the first time I saw myself in my dream home.</em>
                    {" "}Something shifted that day.{" "}
                    <em>I haven&apos;t stopped believing since.</em>
                  </>
                ),
                name: "Aaliyah",
                age: 24,
                city: "Miami, FL",
                avatarBg: "#1E5940",
                initial: "A",
              },
              {
                accent: C.gold,
                quoteNode: (
                  <>
                    <em>I&apos;ve done vision boards before but nothing felt real until I saw</em>
                    {" "}my actual face there.{" "}
                    <em>I check it every morning now. It&apos;s the first thing I do.</em>
                  </>
                ),
                name: "Marcus",
                age: 26,
                city: "Atlanta, GA",
                avatarBg: "#7A5E2A",
                initial: "M",
              },
              {
                accent: C.pink,
                quoteNode: (
                  <>
                    <em>The daily practice changed everything. I used to doubt it. Now it just</em>
                    {" "}feels like a matter of time.{" "}
                    <em>I wake up excited about my life.</em>
                  </>
                ),
                name: "Sofia",
                age: 22,
                city: "Los Angeles, CA",
                avatarBg: "#A04060",
                initial: "S",
              },
            ].map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#f5f0ea",
                  borderTop: `3px solid ${t.accent}`,
                }}
                className="rounded-2xl p-7 flex flex-col justify-between"
              >
                {/* Large quotation mark */}
                <div>
                  <p
                    style={{
                      fontFamily: serif,
                      color: "rgba(0,0,0,0.12)",
                      fontSize: "3rem",
                      lineHeight: 1,
                      marginBottom: "12px",
                    }}
                  >
                    &ldquo;
                  </p>
                  <p
                    style={{ fontFamily: serif, color: C.dark }}
                    className="text-base leading-relaxed mb-8"
                  >
                    {t.quoteNode}
                  </p>
                </div>

                {/* Footer: avatar + name/city + stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        backgroundColor: t.avatarBg,
                        color: "white",
                        fontFamily: sans,
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: "700",
                        flexShrink: 0,
                      }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <p style={{ color: C.dark, fontFamily: sans }} className="text-sm font-semibold leading-tight">
                        {t.name}
                      </p>
                      <p style={{ color: C.muted, fontFamily: sans }} className="text-xs">
                        {t.age} · {t.city}
                      </p>
                    </div>
                  </div>
                  <span style={{ color: C.gold, letterSpacing: "1px" }} className="text-sm">
                    ★★★★★
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div
            style={{ backgroundColor: "#f5f0ea" }}
            className="rounded-2xl px-8 py-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-[#e0d8ce] gap-0">
              {[
                { value: "1,000+", label: "People on the waitlist", color: C.forest },
                { value: "2 min", label: "Daily practice time", color: C.forest },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center py-5 md:py-0 md:px-16 w-full md:w-auto">
                  <p style={{ fontFamily: serif, color: stat.color }} className="text-4xl font-bold mb-1">
                    {stat.value}
                  </p>
                  <p style={{ color: C.muted, fontFamily: sans }} className="text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION 5 — THE FEELING
      ────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.dark }} className="relative py-20 px-6 text-center overflow-hidden">

        {/* Background blobs */}
        <div style={{
          position: "absolute", top: "-80px", left: "-160px",
          width: "420px", height: "420px",
          backgroundColor: "rgba(45,106,79,0.22)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "60px", right: "-120px",
          width: "360px", height: "360px",
          backgroundColor: "rgba(80,80,80,0.25)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* ——— THE TRUTH ——— */}
          <div className="flex items-center justify-center gap-4 mb-14">
            <div style={{ width: "44px", height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }} />
            <span style={{ color: "rgba(255,255,255,0.32)", fontFamily: sans, letterSpacing: "0.2em" }} className="text-xs uppercase">
              The Truth
            </span>
            <div style={{ width: "44px", height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }} />
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: serif }} className="font-bold leading-tight mb-5">
            <span style={{ color: "white" }} className="text-4xl md:text-5xl block">
              Your dream life
            </span>
            <span style={{ color: C.forest, fontStyle: "italic" }} className="text-4xl md:text-5xl block">
              already exists.
            </span>
          </h2>

          {/* Subheadline — "feel it" in pink */}
          <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }} className="text-base md:text-lg mb-10">
            It&apos;s waiting for you to{" "}
            <strong style={{ color: C.pink, fontStyle: "normal" }}>feel it</strong>
            {" "}first.
          </p>

          {/* Dark pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { label: "Abundance", dot: C.forest },
              { label: "Wealth",    dot: C.gold   },
              { label: "Love",      dot: C.pink   },
            ].map((p) => (
              <span
                key={p.label}
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: sans,
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm"
              >
                <span style={{ backgroundColor: p.dot }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
                {p.label}
              </span>
            ))}
          </div>

          {/* Quote card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            className="rounded-2xl px-5 sm:px-8 md:px-12 py-8 md:py-10 text-center"
          >
            {/* Small faint quotation mark */}
            <p style={{
              fontFamily: serif,
              color: "rgba(255,255,255,0.12)",
              fontSize: "2rem",
              lineHeight: 1,
              textAlign: "left",
              marginBottom: "12px",
            }}>
              &ldquo;
            </p>

            {/* Quote */}
            <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.88)" }} className="text-lg md:text-xl leading-relaxed mb-8">
              <em>The moment you see yourself{" "}
              <strong style={{ fontStyle: "normal" }}>already living it</strong>
              {" "}— really see yourself there — something in you stops waiting and starts believing.</em>
            </p>

            {/* ——— The Dreamt philosophy ——— */}
            <div className="flex items-center justify-center gap-4">
              <div style={{ width: "36px", height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }} />
              <span style={{ color: "rgba(255,255,255,0.25)", fontFamily: sans, letterSpacing: "0.16em" }} className="text-xs uppercase">
                The Dreamt philosophy
              </span>
              <div style={{ width: "36px", height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }} />
            </div>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION 6 — FINAL CTA
      ────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="relative py-24 px-6 text-center overflow-hidden">

        {/* Background blobs */}
        <div style={{
          position: "absolute", top: "-100px", left: "-180px",
          width: "460px", height: "460px",
          backgroundColor: "rgba(172, 182, 166, 0.25)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-80px",
          width: "300px", height: "300px",
          backgroundColor: "rgba(245, 200, 66, 0.12)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-2xl mx-auto">

          {/* Centered logo */}
          <div className="flex justify-center mb-12">
            <LeafLogo />
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: serif }} className="font-bold leading-tight mb-6">
            <span style={{ color: C.dark }} className="text-5xl md:text-7xl block">
              You&apos;ve waited
            </span>
            <span style={{ color: C.forest, fontStyle: "italic" }} className="text-5xl md:text-7xl block">
              long enough.
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{ fontFamily: serif, color: C.muted, fontStyle: "italic" }}
            className="text-lg md:text-xl mb-10 leading-relaxed"
          >
            Be the first to know when we launch. Your dream life is closer than you think.
          </p>

          {/* Wide email form */}
          <div className="mb-4">
            <WideEmailForm
              buttonText="I'M READY"
              microcopy="No spam ever · Unsubscribe anytime · Free to join"
            />
          </div>

          {/* DREAMT — COMING SOON badge */}
          <div className="flex justify-center mt-10 mb-20">
            <span
              style={{
                backgroundColor: "rgba(45,106,79,0.07)",
                border: "1px solid rgba(45,106,79,0.2)",
                color: C.forest,
                fontFamily: sans,
                letterSpacing: "0.14em",
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase"
            >
              <span style={{ backgroundColor: C.forest }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
              Dreamt — Coming Soon
            </span>
          </div>

          {/* Three value cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-16">
            {[
              { dot: C.forest, title: "Abundance", desc: "Growth, freedom, prosperity" },
              { dot: C.gold,   title: "Wealth",    desc: "Financial energy, power"     },
              { dot: C.pink,   title: "Love",      desc: "Connection, belonging, joy"  },
            ].map((v) => (
              <div
                key={v.title}
                style={{ backgroundColor: "white" }}
                className="rounded-2xl px-6 py-7 flex flex-col items-center text-center shadow-sm"
              >
                <div style={{ backgroundColor: v.dot }} className="w-3 h-3 rounded-full mb-3" />
                <p style={{ color: C.dark, fontFamily: sans }} className="font-semibold text-sm mb-1">
                  {v.title}
                </p>
                <p style={{ color: C.muted, fontFamily: sans }} className="text-xs">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ borderTopColor: C.cardBorder }} className="border-t pt-8 flex gap-8 justify-center">
            <Link href="/privacy" style={{ color: C.muted }} className="text-sm hover:opacity-60 transition-opacity no-underline">
              Privacy
            </Link>
            <Link href="/terms" style={{ color: C.muted }} className="text-sm hover:opacity-60 transition-opacity no-underline">
              Terms
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
