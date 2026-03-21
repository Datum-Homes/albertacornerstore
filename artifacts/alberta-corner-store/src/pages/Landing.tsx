import { useEffect, useRef } from "react";
import { Link } from "wouter";

export default function Landing() {
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroBgRef.current) {
      heroBgRef.current.classList.remove("animate-hero-zoom");
      void heroBgRef.current.offsetWidth;
      heroBgRef.current.classList.add("animate-hero-zoom");
    }
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div
          ref={heroBgRef}
          className="hero-bg"
          style={{ backgroundImage: "url('/herodrone.png')" }}
        />
        <div className="hero-gradient" />
        <div className="hero-year">1902</div>
        <div className="hero-content">
          <span className="hero-eyebrow animate-fade-up-1">
            Ramsay, Calgary · 922 19 Ave SE
          </span>
          <h1 className="hero-headline animate-fade-up-2">
            The Corner Store<br />is coming back.
          </h1>
          <p className="hero-subtitle animate-fade-up-3">
            We just bought it. Before we decide anything,<br className="hidden-mobile" />
            we want to hear from you.
          </p>
          <div className="scroll-prompt animate-fade-up-4">
            <span className="scroll-prompt-text">Read the story</span>
            <div className="scroll-line-wrap">
              <div className="scroll-line animate-scroll-line" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — Who We Are */}
      <section className="section who-we-are">
        <div className="section-inner">
          <span className="eyebrow">WHO WE ARE</span>
          <div className="body-text">
            <p>
              We're a small group of Calgarians who bought this building because
              we didn't want to see it become something forgettable.
            </p>
            <p>
              We're not a big developer. We don't have a concept locked in. What
              we do have is a building that has anchored this corner since 1902,
              and a real question: what should it be for Ramsay now?
            </p>
            <p>
              We're asking before we decide. That's the whole point of this page.
            </p>
          </div>
          <div>
            <img
              src="/ownersphoto.png"
              alt="Two people standing in front of the Alberta Corner Store building at 922 19 Ave SE"
              className="owners-photo"
              loading="lazy"
            />
            <p className="photo-caption">
              "922 19 Ave SE — the day we got the keys."
            </p>
          </div>
        </div>
      </section>

      <hr className="divider-gold" style={{ maxWidth: "720px", margin: "0 auto" }} />

      {/* Section 2 — The Story */}
      <section className="section">
        <div className="section-inner">
          <h2 className="section-heading">What this place has meant to Ramsay</h2>
          <div className="body-text">
            <p>
              The Alberta Corner Store — or as most people in Ramsay know it,
              Miss Kim's — has been the kind of place that doesn't exist much
              anymore. In 2024, a documentary filmmaker spent time with Miss Kim
              and the neighbours who had been coming here for decades. What they
              said tells you more about this building than we ever could.
            </p>
          </div>

          <div className="pull-quote-large">
            <blockquote>
              "She is our community. She has been the community. And she will always forever be the community."
            </blockquote>
            <cite>— Ramsay resident</cite>
          </div>

          <div className="pull-quote-small">
            <blockquote>
              "We're so isolated in our lives. We connect a lot through screens and not face to face. So having that — somebody who knows you, who knows your name — that's irreplaceable."
            </blockquote>
            <cite>— Ramsay resident</cite>
          </div>

          <div className="video-container">
            <p className="video-framing">
              Before we decide anything about this building, watch what it's
              meant to the people who live here.
            </p>
            <div className="video-wrap">
              <iframe
                src="https://www.youtube-nocookie.com/embed/FJsVo2dDYnc"
                title="Alberta Corner Store — Documentary"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <hr className="divider-gold" style={{ maxWidth: "720px", margin: "0 auto" }} />

      {/* Section 3 — The History */}
      <section className="section">
        <div className="section-inner">
          <h2 className="section-heading-plain">A corner store since 1902</h2>
          <div className="body-text">
            <p>
              This building has been a corner store for as long as Ramsay has
              existed as a neighbourhood. First under the Cooper family — two
              generations — then under Miss Kim and her family, who ran it for
              a third. Only two families. Over a hundred years.
            </p>
            <p>
              It's been a place where seniors who can't walk two blocks came for
              a loaf of bread. Where kids spent a dollar on a bag of candy. Where
              a woman going through the worst year of her life found someone who
              showed up.
            </p>
            <p>
              The shelves are empty now. But the building is still standing on
              the same corner.
            </p>
          </div>
          <div className="history-photos">
            <img
              src="/exterior_signage.png"
              alt="The Alberta Corner Store building showing the full GROCERIES · ALBERTA CORNER STORE · DRY GOODS sign band"
              loading="lazy"
            />
            <img
              src="/interior1.jpg"
              alt="Interior of the Alberta Corner Store showing original shelving and hardwood floors"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Section 4 — The Ask */}
      <section className="ask-section">
        <div className="ask-inner">
          <span className="eyebrow">BEFORE WE DECIDE</span>
          <h2 className="ask-heading">
            What should this place be for Ramsay?
          </h2>
          <p className="ask-body">
            We have some ideas. But ideas from owners who don't live here are
            worth less than honest input from the people who do. If you've
            walked past this building, shopped here, or just noticed the lights
            were off — we want to hear from you.
          </p>
          <p className="ask-body" style={{ marginBottom: "36px" }}>
            It takes 90 seconds. There are three questions. No wrong answers.
          </p>
          <Link href="/input" className="cta-btn">
            Tell us what you think
          </Link>
          <p className="trust-line">
            No spam. No sales pitch. We'll send one update — what we decided,
            and why — to anyone who leaves their email.
          </p>
        </div>
      </section>
    </main>
  );
}
