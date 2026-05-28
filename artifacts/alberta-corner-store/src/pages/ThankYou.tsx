import { useEffect, useRef } from "react";

export default function ThankYou() {
  const copyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url).then(() => {
      if (copyRef.current) {
        const original = copyRef.current.textContent;
        copyRef.current.textContent = "Copied!";
        setTimeout(() => {
          if (copyRef.current) {
            copyRef.current.textContent = original;
          }
        }, 2000);
      }
    });
  };

  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`;

  return (
    <main className="thankyou-page">
      <div className="thankyou-container">
        <span className="eyebrow">THANK YOU</span>
        <h1 className="thankyou-heading">We heard you.</h1>
        <div className="thankyou-body">
          <p>
            Your input is in. Genuinely — thank you. We know your time
            matters, and the fact that you took 90 seconds to tell us what
            you think means something to us.
          </p>
          <br />
          <p>
            What you've shared goes directly into the conversation the
            ownership group is having about what this space becomes. No
            filters, no summaries, no corporate translation.
          </p>
        </div>

        <h2 className="thankyou-subheading">What happens with this?</h2>
        <div className="body-text">
          <p>
            We're collecting input through <strong>June</strong>. After that, we'll read
            everything, look for patterns, and make a decision about direction.
          </p>
          <br />
          <p>
            If you left your email, we'll send you one message when we've
            decided — what we're planning, what the community told us, and
            how we got there.
          </p>
          <br />
          <p>
            If you didn't leave your email — that's completely fine. Check
            back here. We'll update this page when there's news.
          </p>
        </div>

        <div className="closing-quote">
          <blockquote>
            "The community actually got built around this community hub."
          </blockquote>
          <cite>— Ramsay resident, from the documentary</cite>
        </div>
        <p className="closing-line">That's what we're trying to protect.</p>

        <div className="share-section">
          <h2 className="share-heading">Know someone else in Ramsay who should weigh in?</h2>
          <p className="share-body">
            The more voices we hear, the better the decision.
            Share this with a neighbour.
          </p>
          <div className="share-buttons">
            <button
              ref={copyRef}
              className="share-btn"
              onClick={handleCopyLink}
              type="button"
            >
              Copy link
            </button>
            <a
              href={fbShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
