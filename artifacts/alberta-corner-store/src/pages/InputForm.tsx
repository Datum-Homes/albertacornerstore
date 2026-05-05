import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Turnstile } from "@marsidev/react-turnstile";

const WORKER_URL = import.meta.env.VITE_WORKER_URL as string;
const TURNSTILE_SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA") as string;

const feelingOptions = [
  "A warm, grab-and-go spot — coffee, snacks, familiar faces",
  "A place to slow down — somewhere to sit, have a conversation, stay a while",
  "A reliable neighbourhood shop for everyday essentials",
  "Something creative or unexpected that Ramsay doesn't have yet",
  "I'm not sure yet — I just want to see something good happen here",
];

const useOptions = [
  "Café",
  "Small grocery / corner store",
  "Barber shop",
  "Liquor store",
  "Bakery",
  "Deli / prepared foods",
  "Florist",
  "Local goods / gift shop",
  "Community gathering space",
  "Other",
];

const directionOptions = [
  "Yes",
  "No",
  "Not sure",
  "I like parts of it, but would change something",
];

const neighbourhoodOptions = [
  "I live in Ramsay",
  "I work in or near Ramsay",
  "I visit or shop in Ramsay",
  "I used to live in Ramsay",
  "Just interested",
];

export default function InputForm() {
  const [, navigate] = useLocation();
  const q1Ref = useRef<HTMLDivElement>(null);

  // Q1
  const [q1Feeling, setQ1Feeling] = useState<string | null>(null);
  const [q1Error, setQ1Error] = useState(false);

  // Q2 — checkboxes
  const [selectedUses, setSelectedUses] = useState<string[]>([]);
  const [otherUseText, setOtherUseText] = useState("");

  // Q3
  const [q3Missing, setQ3Missing] = useState("");

  // Q4
  const [q4Products, setQ4Products] = useState("");

  // Q5
  const [q5Avoid, setQ5Avoid] = useState("");

  // Q6 — directional
  const [q6Direction, setQ6Direction] = useState<string | null>(null);
  const [q6Comment, setQ6Comment] = useState("");

  // Personal info
  const [neighbourhood, setNeighbourhood] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Form state
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleUse = (use: string) => {
    setSelectedUses((prev) =>
      prev.includes(use) ? prev.filter((u) => u !== use) : [...prev, use]
    );
  };

  const showQ6Comment =
    q6Direction === "No" || q6Direction === "I like parts of it, but would change something";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!q1Feeling) {
      setQ1Error(true);
      q1Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!turnstileToken) {
      setCaptchaError(true);
      return;
    }

    setQ1Error(false);
    setFormError(false);
    setCaptchaError(false);
    setLoading(true);

    const usesValue = selectedUses.includes("Other") && otherUseText
      ? [...selectedUses.filter((u) => u !== "Other"), `Other: ${otherUseText}`].join(" | ")
      : selectedUses.join(" | ");

    const body = new URLSearchParams({
      q1_feeling: q1Feeling,
      q2_uses: usesValue,
      q3_missing: q3Missing,
      q4_products: q4Products,
      q5_avoid: q5Avoid,
      q6_direction: q6Direction || "",
      q6_comment: q6Comment,
      neighbourhood: neighbourhood || "",
      name: name,
      email: email,
      "cf-turnstile-response": turnstileToken,
    });

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        navigate("/thank-you");
      } else {
        setFormError(true);
      }
    } catch {
      setFormError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-page">
      {/* Header */}
      <div className="form-header">
        <div
          className="form-header-bg"
          style={{ backgroundImage: "url('https://images.albertacornerstore.com/media/images/IMG_2328.webp')" }}
          role="img"
          aria-label="Alberta Corner Store building viewed from the street in Ramsay, Calgary"
        />
        <div className="form-header-overlay" aria-hidden="true" />
        <div className="form-header-content">
          <span className="eyebrow" style={{ marginBottom: "16px" }}>YOUR TURN</span>
          <h1 className="form-header-heading">Help us decide what comes next.</h1>
          <p className="form-header-sub">
            A few questions. 2–3 minutes. Your honest answer<br />
            matters more than a polished one.
          </p>
        </div>
      </div>

      {/* Trust signals */}
      <div className="trust-signals">
        <span className="trust-item">⏱ 2–3 minutes</span>
        <span className="trust-item">☰ A few questions</span>
        <span className="trust-item">🔒 No account needed</span>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>

          {/* Q1 — Feeling */}
          <div ref={q1Ref} className={`question-block ${q1Error ? "has-error" : ""}`}>
            <label className="question-label">QUESTION 1</label>
            <p className="question-text">
              When you picture the ideal version of this corner store,
              what does it feel like?
            </p>
            <div className="radio-options" role="radiogroup" aria-required="true" aria-label="How the corner store should feel">
              {feelingOptions.map((option) => (
                <label
                  key={option}
                  className={`radio-label ${q1Feeling === option ? "selected" : ""}`}
                  onClick={() => { setQ1Feeling(option); setQ1Error(false); }}
                >
                  <input
                    type="radio"
                    name="q1"
                    value={option}
                    checked={q1Feeling === option}
                    onChange={() => { setQ1Feeling(option); setQ1Error(false); }}
                    aria-label={option}
                  />
                  <span className="radio-custom" aria-hidden="true" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <p className="q1-error" role="alert">
              Let us know how you'd want this place to feel — just pick the option closest to you.
            </p>
          </div>

          {/* Q2 — Uses (checkboxes) */}
          <div className="question-block">
            <label className="question-label">QUESTION 2 (optional)</label>
            <p className="question-text">
              What kinds of uses would you be happy to see in the building?
              Select all that apply.
            </p>
            <div className="checkbox-options" role="group" aria-label="Acceptable uses for the building">
              {useOptions.map((option) => (
                <label
                  key={option}
                  className={`checkbox-label ${selectedUses.includes(option) ? "checked" : ""}`}
                  onClick={() => toggleUse(option)}
                >
                  <input
                    type="checkbox"
                    name="q2_uses"
                    value={option}
                    checked={selectedUses.includes(option)}
                    onChange={() => toggleUse(option)}
                    aria-label={option}
                  />
                  <span className="checkbox-custom" aria-hidden="true" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {selectedUses.includes("Other") && (
              <input
                type="text"
                className="other-input"
                placeholder="What else would you like to see?"
                value={otherUseText}
                onChange={(e) => setOtherUseText(e.target.value)}
                aria-label="Other use"
              />
            )}
          </div>

          {/* Q3 — Missing */}
          <div className="question-block">
            <label htmlFor="q3" className="question-label">QUESTION 3 (optional)</label>
            <p className="question-text">
              Is there something Ramsay is missing that this space could fix?
              Even something small.
            </p>
            <textarea
              id="q3"
              className="form-textarea"
              placeholder="Could be as simple as: a decent coffee without driving to 17th. Or something bigger. Whatever comes to mind."
              value={q3Missing}
              onChange={(e) => setQ3Missing(e.target.value)}
              rows={4}
            />
            <p className="char-count">{q3Missing.length} characters</p>
          </div>

          {/* Q4 — Products */}
          <div className="question-block">
            <label htmlFor="q4" className="question-label">QUESTION 4 (optional)</label>
            <p className="question-text">
              If this became a small corner store or neighbourhood grocer,
              what would you actually want to be able to buy here?
            </p>
            <textarea
              id="q4"
              className="form-textarea"
              placeholder="Eggs, milk, local meat, produce, pantry staples, coffee, prepared meals, etc."
              value={q4Products}
              onChange={(e) => setQ4Products(e.target.value)}
              rows={4}
            />
            <p className="char-count">{q4Products.length} characters</p>
          </div>

          {/* Q5 — Avoid */}
          <div className="question-block">
            <label htmlFor="q5" className="question-label">QUESTION 5 (optional)</label>
            <p className="question-text">
              Is there anything you'd hate to see this space become?
            </p>
            <textarea
              id="q5"
              className="form-textarea"
              placeholder="Completely optional — but sometimes knowing what to avoid is as useful as knowing what to aim for."
              value={q5Avoid}
              onChange={(e) => setQ5Avoid(e.target.value)}
              rows={4}
            />
            <p className="char-count">{q5Avoid.length} characters</p>
          </div>

          {/* Q6 — Directional */}
          <div className="question-block">
            <label className="question-label">QUESTION 6 (optional)</label>
            <p className="question-text">
              Our current thinking is a small neighbourhood corner store: useful daily staples,
              selected local goods, some fresh items, and a place that feels connected to Ramsay
              rather than generic. Does that general direction feel right to you?
            </p>
            <div className="radio-options" role="radiogroup" aria-label="Does the current direction feel right">
              {directionOptions.map((option) => (
                <label
                  key={option}
                  className={`radio-label ${q6Direction === option ? "selected" : ""}`}
                  onClick={() => setQ6Direction(option)}
                >
                  <input
                    type="radio"
                    name="q6"
                    value={option}
                    checked={q6Direction === option}
                    onChange={() => setQ6Direction(option)}
                    aria-label={option}
                  />
                  <span className="radio-custom" aria-hidden="true" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {showQ6Comment && (
              <textarea
                className="form-textarea"
                style={{ marginTop: "12px" }}
                placeholder="What would you change or add? (optional)"
                value={q6Comment}
                onChange={(e) => setQ6Comment(e.target.value)}
                rows={3}
              />
            )}
          </div>

          {/* Personal info */}
          <div className="email-section">
            <h2 className="email-heading">A little about you (all optional)</h2>

            <label className="question-label" style={{ marginBottom: "10px", display: "block" }}>
              How are you connected to Ramsay?
            </label>
            <div className="radio-options" role="radiogroup" aria-label="Connection to Ramsay" style={{ marginBottom: "28px" }}>
              {neighbourhoodOptions.map((option) => (
                <label
                  key={option}
                  className={`radio-label ${neighbourhood === option ? "selected" : ""}`}
                  onClick={() => setNeighbourhood(option)}
                >
                  <input
                    type="radio"
                    name="neighbourhood"
                    value={option}
                    checked={neighbourhood === option}
                    onChange={() => setNeighbourhood(option)}
                    aria-label={option}
                  />
                  <span className="radio-custom" aria-hidden="true" />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <label htmlFor="name" className="email-heading" style={{ fontSize: "16px", marginBottom: "8px", display: "block" }}>
              Your name
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="First name, or whatever you're comfortable with"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              style={{ marginBottom: "24px" }}
            />

            <label htmlFor="email" className="email-heading" style={{ fontSize: "16px", marginBottom: "8px", display: "block" }}>
              Want to hear what we decide?
            </label>
            <p className="email-sub">
              Leave your email and we'll send one message — what we chose, and
              why. That's it. No list, no updates, no marketing.
            </p>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <p className="consent-note">We'll send one email. We won't share your address.</p>
          </div>

          {/* Datum Homes */}
          <p className="datum-link">
            Want to know more about the team behind this project?{" "}
            <a href="https://datumhomes.com" target="_blank" rel="noopener noreferrer">
              Learn about Datum Homes
            </a>
          </p>

          {/* Turnstile */}
          <div className="turnstile-wrapper">
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => { setTurnstileToken(token); setCaptchaError(false); }}
              onError={() => { setTurnstileToken(null); setCaptchaError(true); }}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "light" }}
            />
          </div>

          {captchaError && (
            <p className="captcha-error" role="alert">
              Verification didn't complete — please wait a moment and try again.
            </p>
          )}

          <div className={`form-error-msg ${formError ? "visible" : ""}`} role="alert">
            Something went wrong with the submission. You can also reach us directly at{" "}
            <strong>hello@albertacornerstore.ca</strong>.
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Sending...
              </>
            ) : (
              "Send my input"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
