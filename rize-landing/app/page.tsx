"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import Image from "next/image";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

function Step({ num, title, desc, img, alt }: { num: string; title: string; desc: string; img: string; alt: string }) {
  const { ref, revealed } = useReveal();
  return (
    <div ref={ref} className={`step ${revealed ? "revealed" : ""}`}>
      <div className="step-header">
        <span className="n">{num}</span>
        <h3>{title}</h3>
      </div>
      <p>{desc}</p>
      <div className="step-img">
        <Image src={img} alt={alt} width={280} height={560} />
      </div>
    </div>
  );
}

function HowSection() {
  const { ref, revealed } = useReveal();
  return (
    <section ref={ref} className={`how wrap ${revealed ? "revealed" : ""}`}>
      <h2>How RIZE works</h2>
      <Step num="1." title="Decide who you're becoming." desc="Visualize the ideal version of yourself." img="/step1.png" alt="Decide who you're becoming" />
      <Step num="2." title="Take action everyday." desc="Each proof takes you 1% closer to becoming who you want to be." img="/step2.png" alt="Take action everyday" />
      <Step num="3." title="Rise up together." desc="Post your wins, keep yourself accountable, grow with your generation." img="/step3.png" alt="Rise up together" />
    </section>
  );
}

function WaitlistForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("https://app.loops.so/api/newsletter-form/cmn85yiux0kp10i0qxkxjaca3", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${encodeURIComponent(trimmedEmail)}`,
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong — try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong — try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="success show">
        <div className="big">You&apos;re in.</div>
        <p>You&apos;ll be first through the door when RIZE opens.</p>
      </div>
    );
  }

  return (
    <>
      <form id={id} onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          autoComplete="email"
          inputMode="email"
          aria-label="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Joining…" : "Join the waitlist"}
        </button>
      </form>
      {status === "error" && <div className="form-error show">{errorMsg}</div>}
    </>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  return (
    <div className={loaded ? "loaded" : ""}>
      <header>
        <div className="wrap header-inner">
          <Image src="/logo.png" alt="RiZe" width={900} height={411} className="logo" priority />
        </div>
      </header>

      <main>
        <section className="hero wrap">
          <div className="oldself" aria-hidden="true">
            <i>Chud 🥀</i>
            <i>Loser 💔</i>
            <i>Bum 😭</i>
          </div>

          <h1>
            No More Excuses…
            <br />
            <span className="h1-underline">Lock The F--K In</span>
          </h1>

          <p className="lede">
            It&apos;s <em>not</em> over. Join the rest of Gen Z and rise up together.
          </p>

          <div className="signup">
            <WaitlistForm id="waitlist-form" />
            <p className="micro">Launching soon on iPhone. Early members get first access.</p>
          </div>
        </section>

        <HowSection />

        <section className="bottom wrap">
          <p className="cta-text">Join the community now.</p>
          <div className="signup">
            <WaitlistForm id="waitlist-form-2" />
          </div>
        </section>
      </main>

      <footer className="wrap">
        <span>RiZe · © 2026 Newbury AI LLC</span>
        <a href="/support" className="footer-link">Support</a>
        <a href="/privacy" className="footer-link">Privacy</a>
      </footer>
    </div>
  );
}
