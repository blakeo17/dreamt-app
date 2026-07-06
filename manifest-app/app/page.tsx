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

function DreamtLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
          fill="#2D6A4F"
        />
      </svg>
      <span style={{ color: C.forest, fontFamily: serif }} className="text-2xl font-semibold">
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
const LOOPS_MAILING_LIST = "cmo9lgz983qfn0i0i36u1egut";

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

    setStatus("loading");

    try {
      const res = await fetch(LOOPS_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userGroup=&mailingLists=${LOOPS_MAILING_LIST}&email=${encodeURIComponent(email)}`,
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
      if (msg) {
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
          <DreamtLogo />
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
            <img src="/onbording.png" alt="Dreamt onboarding mockup" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>

          {/* Center — VISION BOARD (always visible, on top) */}
          <img
            src="/vision-board-new.png"
            alt="Dreamt vision board mockup"
            style={{ zIndex: 10, position: "relative" }}
            className="w-56 sm:w-64 md:w-72 rounded-3xl flex-shrink-0 shadow-md"
          />

          {/* Right — DAILY PRACTICE (rotated, only shown on lg+) */}
          <div
            style={{ transform: "rotate(6deg)", zIndex: 0, position: "relative", width: "256px", height: "553px", flexShrink: 0 }}
            className="hidden lg:block rounded-3xl overflow-hidden shadow-sm"
          >
            <img src="/daily.png" alt="Dreamt daily practice mockup" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
        </div>

      </section>

      {/* ──────────────────────────────────────────
          SECTION 2 — THE PROBLEM
      ────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: C.forest }}
        className="relative py-16 md:py-20 px-6 overflow-hidden"
      >
        {/* Decorative circle — left (filled solid lighter green) */}
        <div style={{
          position: "absolute", top: "50%", left: "-200px", transform: "translateY(-50%)",
          width: "480px", height: "480px",
          backgroundColor: "rgba(255,255,255,0.07)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        {/* Decorative circle — right (outline only) */}
        <div style={{
          position: "absolute", top: "50%", right: "-200px", transform: "translateY(-50%)",
          width: "480px", height: "480px",
          border: "1.5px solid rgba(255,255,255,0.1)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Headline */}
          <h2 style={{ fontFamily: serif, color: "white" }} className="text-3xl md:text-6xl font-bold text-center leading-tight mb-5">
            You&apos;ve seen it in your head
            <br />
            <span style={{ color: C.gold, fontStyle: "italic" }}>a thousand times.</span>
          </h2>

          <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.55)", fontStyle: "italic" }} className="text-center text-base md:text-xl mb-10 md:mb-14">
            But it still feels like{" "}
            <span style={{ color: C.gold }}>someday</span>.
          </p>

          {/* 4-column card row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            {[
              { img: "/dream-home.png",    label: "The Home",    sub: "Where you wake up every morning", pos: "top"    },
              { img: "/dream-car.png",     label: "The Car",     sub: "How you move through the world",  pos: "bottom" },
              { img: "/dream-freedom.png", label: "The Freedom", sub: "Time, money, and peace of mind",  pos: "92%"    },
              { img: "/dream-love.png",    label: "The Love",    sub: "The people by your side",         pos: "bottom" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: item.pos }}
                  />
                </div>
                <div className="px-5 py-5">
                  <p style={{ fontFamily: serif, color: "white" }} className="font-semibold text-lg mb-1">{item.label}</p>
                  <p style={{ fontFamily: sans, color: "rgba(255,255,255,0.45)" }} className="text-sm leading-relaxed">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* THE TRUTH card */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              position: "relative",
            }}
            className="px-5 md:px-8 py-6 text-center"
          >
            {/* Large quote marks — top left */}
            <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.18)", fontSize: "2rem", lineHeight: 1, position: "absolute", top: "16px", left: "24px" }}>&ldquo;&ldquo;</p>

            {/* THE TRUTH label */}
            <div className="flex items-center gap-4 mb-4">
              <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.15)", flex: 1 }} />
              <span style={{ color: "rgba(255,255,255,0.4)", fontFamily: sans, letterSpacing: "0.2em" }} className="text-xs uppercase whitespace-nowrap">The Truth</span>
              <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.15)", flex: 1 }} />
            </div>

            <p style={{ fontFamily: serif, color: "white" }} className="text-lg md:text-xl font-bold leading-snug mb-1">
              It&apos;s not meant for someone else.
            </p>
            <p style={{ fontFamily: serif, color: "white" }} className="text-lg md:text-xl font-bold leading-snug mb-4">
              You just haven&apos;t{" "}
              <span style={{ color: C.pink, fontStyle: "italic" }}>seen yourself there</span>
              {" "}yet.
            </p>

            <p style={{ color: C.gold }} className="text-sm mb-3">✦</p>

            <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }} className="text-sm">
              That&apos;s exactly what{" "}
              <span style={{ color: C.gold }}>Dreamt</span>
              {" "}changes.
            </p>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION 3 — HOW IT WORKS
      ────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="relative pt-24 pb-24 px-6 overflow-hidden">
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
                mockupSrc: "/onbording.png",
                mockupAlt: "Dreamt onboarding mockup",
                mockupOffset: 0,
                badgeBg: "rgba(45,106,79,0.1)",
                badgeColor: C.forest,
                title: "Build your dream life",
                desc: "Answer 5 questions. Your home, your car, your career, your relationships. AI generates your exact vision, personalized to you.",
              },
              {
                num: 2,
                cardBg: C.forest,
                mockupSrc: "/daily.png",
                mockupAlt: "Dreamt morning session mockup",
                mockupOffset: 0,
                badgeBg: "rgba(245,200,66,0.22)",
                badgeColor: "#8a6800",
                title: "Feel it every morning",
                desc: "A 2-minute guided audio session puts you inside your dream life before your day starts. Your voice, your home, your vision, every single morning.",
              },
              {
                num: 3,
                cardBg: "#fce8ec",
                mockupSrc: "/sam-2.png",
                mockupAlt: "Sam AI coach mockup",
                mockupOffset: 60,
                badgeBg: "rgba(244,167,185,0.22)",
                badgeColor: "#b05570",
                title: "Talk it through with Sam",
                desc: "Sam is your personal AI coach. He already knows your goals, your situation, and your full journey. Available 24/7, never generic, always specific to you.",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{ backgroundColor: "white" }}
                className="rounded-2xl overflow-hidden shadow-sm flex flex-col"
              >
                <div
                  className="overflow-hidden h-[360px] md:h-[390px]"
                  style={{ position: "relative" }}
                >
                  <img
                    src={step.mockupSrc}
                    alt={step.mockupAlt}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: "133%",
                      width: "auto",
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
          <div className="flex flex-col items-center mt-8 gap-7">
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
          SECTION — MEET SAM
      ────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }} className="relative pt-10 pb-16 px-6 overflow-hidden">
        {/* Background blobs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-160px",
          width: "420px", height: "420px",
          backgroundColor: "rgba(45,106,79,0.12)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-100px",
          width: "320px", height: "320px",
          backgroundColor: "rgba(244,167,185,0.15)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div className="relative z-10 max-w-7xl mx-auto">


          {/* Headline */}
          <h2 style={{ fontFamily: serif }} className="font-bold text-center leading-tight mb-4">
            <span style={{ color: C.dark }} className="text-4xl md:text-6xl block">Meet Sam</span>
            <span style={{ color: C.forest, fontStyle: "italic" }} className="text-4xl md:text-6xl block">your personal coach</span>
          </h2>

          {/* Body */}
          <div className="text-center mb-12">
            <p style={{ fontFamily: serif, color: C.muted }} className="text-lg md:text-xl mb-1">
              Sam knows your dream, your current reality,<br />and everything in between.
            </p>
            <p style={{ fontFamily: serif, color: C.dark, fontWeight: 700 }} className="text-lg md:text-xl">
              He&apos;s not a chatbot. He&apos;s a coach who already knows you
            </p>
          </div>

          {/* 3-col layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">

            {/* Left — feature bullets */}
            <div className="flex flex-col gap-8">
              {[
                { icon: "🎯", title: "Built around you",     desc: "Sam learns what matters most to you and builds your plan." },
                { icon: "💬", title: "Real conversations",   desc: "Talk naturally. Get real answers, not generic advice."      },
                { icon: "🔒", title: "Always by your side",  desc: "Available 24/7 to support your journey."                   },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div
                    style={{ backgroundColor: "rgba(45,106,79,0.08)", border: "1px solid rgba(45,106,79,0.15)", flexShrink: 0 }}
                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: sans, color: C.forest }} className="font-semibold text-sm mb-1">{f.title}</p>
                    <p style={{ fontFamily: sans, color: C.muted }} className="text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center — phones (hidden on mobile, too tall) */}
            <div className="hidden md:flex items-end justify-center gap-4">
              <img src="/sam-1.png" alt="Sam ready" style={{ height: "540px", width: "auto", display: "block" }} />
              <img src="/sam-2.png" alt="Sam chat" style={{ height: "540px", width: "auto", display: "block" }} />
            </div>

            {/* Right — quote card */}
            <div
              style={{ backgroundColor: "white", border: "1px solid #e8e0d4" }}
              className="rounded-2xl p-8 shadow-sm flex flex-col gap-5"
            >
              <p style={{ fontFamily: serif, color: C.forest, fontSize: "3rem", lineHeight: 1 }}>&ldquo;</p>
              <p style={{ fontFamily: serif, color: C.dark }} className="text-lg leading-relaxed">
                Having someone who truly gets me changes everything.
              </p>
              <p style={{ fontFamily: sans, color: C.muted }} className="text-sm leading-relaxed">
                Thousands already building their dream life with Sam.
              </p>
              <div>
                <p style={{ color: C.gold }} className="text-lg mb-1">★★★★★</p>
                <p style={{ fontFamily: sans, color: C.muted }} className="text-xs">4.9/5</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION 5 — THE FEELING
      ────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.forest, position: "relative", overflow: "hidden" }}>

        {/* Grain texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.06,
        }} />

        {/* Decorative circle — left */}
        <div style={{
          position: "absolute", top: "50%", left: "-180px", transform: "translateY(-50%)",
          width: "500px", height: "500px",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "50%", pointerEvents: "none", zIndex: 2,
        }} />

        {/* Decorative circle — right */}
        <div style={{
          position: "absolute", top: "50%", right: "-180px", transform: "translateY(-50%)",
          width: "500px", height: "500px",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "50%", pointerEvents: "none", zIndex: 2,
        }} />

        {/* Main content */}
        <div className="relative px-6 md:px-16 py-20" style={{ zIndex: 10 }}>
          <div className="max-w-3xl mx-auto text-center">

            {/* Badge */}
            <div className="flex justify-center mb-10">
              <span style={{ color: "rgba(255,255,255,0.6)", fontFamily: sans, letterSpacing: "0.18em", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }} className="flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase">
                <span style={{ backgroundColor: C.gold }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
                The Truth
              </span>
            </div>

            {/* Headline */}
            <h2 style={{ fontFamily: serif, lineHeight: 1.05, marginBottom: "24px", fontWeight: 700 }}>
              <span style={{ color: "white" }} className="text-4xl md:text-7xl block">Your dream life</span>
              <span style={{ color: C.gold, fontStyle: "italic" }} className="text-4xl md:text-7xl block">already exists.</span>
            </h2>

            {/* Subtitle */}
            <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.7)", fontSize: "20px", marginBottom: "32px" }}>
              It&apos;s waiting for you to{" "}
              <strong style={{ color: C.pink }}>feel it</strong>
              {" "}first.
            </p>

            {/* Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {[
                { label: "Home", icon: "🏡" },
                { label: "Career", icon: "💼" },
                { label: "Relationships", icon: "💗" },
                { label: "Freedom", icon: "🌍" },
                { label: "Peace", icon: "🌿" },
              ].map((p) => (
                <span key={p.label} style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "white", fontFamily: sans }} className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm whitespace-nowrap">
                  <span>{p.icon}</span>{p.label}
                </span>
              ))}
            </div>

            {/* Quote card */}
            <div style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }} className="rounded-2xl px-5 md:px-8 py-8 mb-12">
              <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.2)", fontSize: "2.2rem", lineHeight: 1, marginBottom: "16px" }}>&ldquo;</p>
              <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.85)", fontStyle: "italic" }} className="text-xl leading-relaxed mb-3">
                The moment you see yourself already living it,
              </p>
              <p style={{ fontFamily: serif, color: C.gold, fontWeight: 700 }} className="text-xl leading-relaxed mb-3">
                your brain begins treating it as possible.
              </p>
              <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.45)", fontStyle: "italic" }} className="text-base leading-relaxed mb-7">
                That&apos;s when your actions start to change.
              </p>
              <div className="flex items-center gap-3">
                <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.15)", flex: 1 }} />
                <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: sans, letterSpacing: "0.18em" }} className="text-xs uppercase whitespace-nowrap">The Dreamt Philosophy</span>
                <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.15)", flex: 1 }} />
              </div>
            </div>

            {/* Bottom tagline */}
            <div className="flex items-center gap-4 mb-4 max-w-xs mx-auto">
              <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.18)", flex: 1 }} />
              <span style={{ color: C.gold }}>✦</span>
              <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.18)", flex: 1 }} />
            </div>
            <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }} className="text-sm mb-1">
              Dreamt isn&apos;t about pretending your dream life exists.
            </p>
            <p style={{ fontFamily: serif, color: "rgba(255,255,255,0.85)" }} className="text-sm">
              It&apos;s about training your mind to{" "}
              <strong style={{ color: C.gold }}>recognize the path</strong>
              {" "}toward it.
            </p>

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
            <DreamtLogo />
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
              microcopy="7-day free trial · Cancel anytime"
            />
          </div>

          <div className="mt-10 mb-20" />

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
                className="rounded-2xl px-3 md:px-6 py-5 md:py-7 flex flex-col items-center text-center shadow-sm"
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
