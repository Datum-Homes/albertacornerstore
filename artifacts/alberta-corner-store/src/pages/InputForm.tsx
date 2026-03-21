import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

const FORMSPREE_URL = "https://formspree.io/f/REPLACE_WITH_ID";

const radioOptions = [
  "A warm, grab-and-go spot — coffee, snacks, familiar faces",
  "A place to slow down — somewhere to sit, have a conversation, stay a while",
  "A reliable neighbourhood shop for everyday essentials",
  "Something creative or unexpected that Ramsay doesn't have yet",
  "I'm not sure yet — I just want to see something good happen here",
];

export default function InputForm() {
  const [, navigate] = useLocation();
  const [selected, setSelected] = useState<string | null>(null);
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [q1Error, setQ1Error] = useState(false);
  const q1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selected) {
      setQ1Error(true);
      q1Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setQ1Error(false);
    setFormError(false);
    setLoading(true);

    const formData = {
      q1_feeling: selected,
      q2_missing: q2,
      q3_avoid: q3,
      email: email,
      _gotcha: (e.currentTarget.querySelector(".honeypot") as HTMLInputElement)?.value ?? "",
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          style={{ backgroundImage: "url('/exterior_signage.png')" }}
          aria-hidden="true"
        />
        <div className="form-header-overlay" aria-hidden="true" />
        <div className="form-header-content">
          <span className="eyebrow" style={{ marginBottom: "16px" }}>YOUR TURN</span>
          <h1 className="form-header-heading">Help us decide what comes next.</h1>
          <p className="form-header-sub">
            Three questions. 90 seconds. Your honest answer<br />
            matters more than a polished one.
          </p>
        </div>
      </div>

      {/* Trust signals */}
      <div className="trust-signals">
        <span className="trust-item">⏱ 90 seconds</span>
        <span className="trust-item">☰ 3 questions</span>
        <span className="trust-item">🔒 No account needed</span>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <input type="text" name="_gotcha" className="honeypot" tabIndex={-1} autoComplete="off" />

          {/* Question 1 */}
          <div ref={q1Ref} className={`question-block ${q1Error ? "has-error" : ""}`}>
            <label className="question-label">QUESTION 1 OF 3</label>
            <p className="question-text">
              When you picture the ideal version of this corner store,
              what does it feel like?
            </p>
            <div className="radio-options" role="radiogroup" aria-required="true" aria-label="How the corner store should feel">
              {radioOptions.map((option) => (
                <label
                  key={option}
                  className={`radio-label ${selected === option ? "selected" : ""}`}
                  onClick={() => { setSelected(option); setQ1Error(false); }}
                >
                  <input
                    type="radio"
                    name="q1"
                    value={option}
                    checked={selected === option}
                    onChange={() => { setSelected(option); setQ1Error(false); }}
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

          {/* Question 2 */}
          <div className="question-block">
            <label htmlFor="q2" className="question-label">QUESTION 2 OF 3 (optional)</label>
            <p className="question-text">
              Is there something Ramsay is missing that this space could fix?
              Even something small.
            </p>
            <textarea
              id="q2"
              className="form-textarea"
              placeholder="Could be as simple as: a decent coffee without driving to 17th. Or something bigger. Whatever comes to mind."
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
              rows={4}
            />
            <p className="char-count">{q2.length} characters</p>
          </div>

          {/* Question 3 */}
          <div className="question-block">
            <label htmlFor="q3" className="question-label">QUESTION 3 OF 3 (optional)</label>
            <p className="question-text">
              Is there anything you'd hate to see this space become?
            </p>
            <textarea
              id="q3"
              className="form-textarea"
              placeholder="Completely optional — but sometimes knowing what to avoid is as useful as knowing what to aim for."
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
              rows={4}
            />
            <p className="char-count">{q3.length} characters</p>
          </div>

          {/* Email */}
          <div className="email-section">
            <h2 className="email-heading">Want to hear what we decide?</h2>
            <p className="email-sub">
              Leave your email and we'll send one message — what we chose, and
              why. That's it. No list, no updates, no marketing.
            </p>
            <label htmlFor="email" className="sr-only">Your email address (optional)</label>
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

          {/* Error message */}
          <div className={`form-error-msg ${formError ? "visible" : ""}`} role="alert">
            Something went wrong with the submission. You can also reach us directly at{" "}
            <strong>hello@albertacornerstore.ca</strong>.
          </div>

          {/* Submit */}
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
