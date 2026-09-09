"use client";

import { useEffect, useState, FormEvent } from "react";

function WaitlistForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !email.includes("@") || email.indexOf(".") < 3) {
      setErrorMsg("That didn't go through — check the email and try again.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("YOUR_FORM_ENDPOINT_HERE", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target as HTMLFormElement),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        throw new Error("bad response");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something broke on our end — try once more.");
    }
  }

  if (status === "success") {
    return (
      <div className="success show">
        <div className="big">You&apos;re in.</div>
        <p>You&apos;ll be first through the door when RiZe opens. Until then — keep your word.</p>
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
        <div className="wordmark">
          Ri<span>Z</span>e
        </div>
      </header>

      <main>
        <section className="hero wrap">
          <div className="oldself" aria-hidden="true">
            <i>Inconsistent.</i>
            <i>Distracted.</i>
            <i>Overthinking.</i>
          </div>

          <h1>
            Become who you
            <br />
            said you&apos;d become.
          </h1>

          <p className="lede">
            One meaningful action a day. Real evidence you&apos;re changing.{" "}
            <b>A whole generation locking in together.</b>
          </p>

          <div className="signup">
            <WaitlistForm id="waitlist-form" />
            <p className="micro">Launching soon on iPhone. Early members get first access.</p>
          </div>
        </section>

        <section className="how wrap">
          <h2>How RiZe works</h2>

          <div className="step">
            <div className="n">1</div>
            <div>
              <h3>Decide who you&apos;re proving you are today</h3>
              <p>
                <em>Disciplined. Focused. Confident.</em> Pick the identity you&apos;re building — not
                another goal.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="n">2</div>
            <div>
              <h3>Do one real thing that proves it</h3>
              <p>One meaningful action. Your word is active until midnight. Then you prove it.</p>
            </div>
          </div>

          <div className="step">
            <div className="n">3</div>
            <div>
              <h3>Watch the evidence stack up</h3>
              <p>
                Every proof is a receipt of who you&apos;re becoming — and you&apos;ll see everyone
                else proving it with you, every single day.
              </p>
            </div>
          </div>
        </section>

        <section className="max wrap">
          <p className="line">Everyone says they&apos;re locking in. This is where you prove it.</p>
          <p className="who">
            Built with <b>Maxwell Rhoe</b>, for the generation that&apos;s done just talking about it.
          </p>
        </section>

        <section className="bottom wrap">
          <h2>Your word starts here.</h2>
          <div className="signup">
            <WaitlistForm id="waitlist-form-2" />
          </div>
        </section>
      </main>

      <footer className="wrap">© 2026 RiZe</footer>
    </div>
  );
}
