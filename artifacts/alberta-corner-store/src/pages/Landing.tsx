import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { fadeInUp, staggerContainer, heroZoom, hoverScale, maskReveal, clipPathReveal, letterBounce } from "../lib/animations";
import Magnetic from "../components/Magnetic";

function MaskedText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="overflow-hidden py-1">
      <motion.div variants={maskReveal} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > window.innerHeight * 0.8) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const navItems = [
    { label: "What It Could Be", href: "#vision" },
    { label: "Tell Us Your Vision", href: "#ask" },
    { label: "How It Unfolds", href: "#timeline" },
    { label: "The Story", href: "#story" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="sticky-nav"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sticky-nav-inner">
            <Link href="/" className="sticky-nav-logo">
              Alberta Corner Store
            </Link>
            <div className="sticky-nav-right">
              <div className="sticky-nav-links">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} className="sticky-nav-link">
                    {item.label}
                  </a>
                ))}
              </div>
              <Link href="/input" className="sticky-nav-cta">
                Share Your Vision
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default function Landing() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main>
      <StickyNav />
      {/* Hero */}
      <section className="hero" id="hero">
        <motion.video
          className="hero-bg hero-video"
          poster="https://images.albertacornerstore.com/media/images/poster_img.webp"
          autoPlay
          muted
          loop
          playsInline
          variants={heroZoom}
          initial="initial"
          animate="animate"
        >
          <source src="https://images.albertacornerstore.com/media/videos/ABCS Hero.mp4" type="video/mp4" />
        </motion.video>
        <div className="hero-gradient" />
        <motion.div
          className="hero-year"
          initial="initial"
          animate="animate"
          style={{ opacity: 0.1 }}
        >
          {"1902".split("").map((char, i) => (
            <motion.span key={i} variants={letterBounce} custom={i} style={{ display: "inline-block" }}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.span className="hero-eyebrow" variants={fadeInUp}>
            Ramsay, Calgary · 922 19 Ave SE
          </motion.span>
          <MaskedText className="hero-headline">
            <h1>The Corner Store<br />is coming back.</h1>
          </MaskedText>
          <motion.p className="hero-subtitle" variants={fadeInUp}>
            We just bought it. Before we decide anything,<br className="hidden-mobile" />
            we want to hear from you.
          </motion.p>
          <motion.div className="scroll-prompt" variants={fadeInUp}>
            <span className="scroll-prompt-text">Read the story</span>
            <div className="scroll-line-wrap">
              <motion.div
                className="scroll-line"
                animate={{
                  scaleY: [0, 1, 1, 0],
                  originY: ["0%", "0%", "100%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why This Matters / The Opportunity */}
      <section className="why-section" id="opportunity">
        <motion.div
          className="why-inner"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span className="eyebrow" variants={fadeInUp}>THE OPPORTUNITY</motion.span>
          <MaskedText className="why-heading">
            Here’s what we know so far.
          </MaskedText>
          <div className="why-pillars">
            {[
              { num: "01", title: "The neighbourhood", body: "Ramsay is changing fast. A corner store that serves the people who actually live here — not just visitors — is rarer than it sounds." },
              { num: "02", title: "The building", body: "922 19 Ave SE has been a corner store since 1902. What it becomes next will define that corner for the next hundred years." },
              { num: "03", title: "The decision", body: "We haven't decided anything yet. That's deliberate. The people who know this street should shape what happens on it." }
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="why-pillar-number">
                  {pillar.num.split("").map((char, j) => (
                    <motion.span key={j} variants={letterBounce} custom={j} style={{ display: "inline-block" }}>
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="why-pillar-title">{pillar.title}</div>
                <p className="why-pillar-body">{pillar.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="why-accent-image"
            variants={clipPathReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            style={{ marginTop: "48px" }}
          >
            <img
              src="https://images.albertacornerstore.com/media/images/IMG_2317.webp"
              alt="The Alberta Corner Store signage showing 'GROCERIES · ALBERTA CORNER STORE · DRY GOODS' across the building facade"
              loading="lazy"
              style={{ maxWidth: "400px", marginLeft: "auto", marginRight: "auto", display: "block" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Integrated Form Block (Elevated) */}
      <section className="home-form-section" id="vision">
        <div className="home-form-inner">
          <span className="eyebrow">YOUR TURN</span>
          <h2 className="home-form-heading">
            What should it <span>become?</span>
          </h2>
          <p className="home-form-sub">
            Pick the one that feels closest. We'll ask a few follow-up
            questions on the next page.
          </p>
          <div className="home-q1-options">
            {[
              { title: "A warm, grab-and-go spot", desc: "Coffee, snacks, the basics — the kind Ramsay doesn't have within walking distance." },
              { title: "A place to slow down", desc: "Something with seating, presence, and a sense of time." },
              { title: "A reliable neighbourhood shop", desc: "The essentials you forgot, just a block away." },
              { title: "Something creative", desc: "A concept that fits Ramsay's character and artistic soul." },
              { title: "I'm not sure yet", desc: "I'd need to think about it more." }
            ].map((option, i) => (
              <Link key={i} href="/input">
                <motion.a className="home-q1-option" variants={hoverScale} whileHover="hover">
                  <div className="option-content">
                    <span className="option-title">{option.title}</span>
                    <span className="option-desc">{option.desc}</span>
                  </div>
                  <span className="home-q1-arrow">→</span>
                </motion.a>
              </Link>
            ))}
          </div>
          <p className="home-form-note">
            Any option takes you to the full form. Takes 2–3 minutes.
          </p>
        </div>
      </section>

      {/* The Final Ask (Elevated) */}
      <section className="ask-section" id="ask">
        <div className="ask-inner">
          <span className="eyebrow">BEFORE WE DECIDE</span>
          <h2 className="ask-heading">
            Tell us your vision
          </h2>
          <p className="ask-body">
            We have ideas — but before anything is decided, we want to hear
            from the people who know this neighbourhood best. If you've walked
            past this building, shopped here, or just noticed the lights were
            off — we want to hear from you.
          </p>
          <p className="ask-body" style={{ marginBottom: "36px" }}>
            It takes 90 seconds. There are three questions. No wrong answers.
          </p>
          <Magnetic strength={0.2}>
            <Link href="/input" className="cta-btn">
              Share your input
            </Link>
          </Magnetic>
          <p className="trust-line">
            No spam. No sales pitch. We'll send one update — what we decided,
            and why — to anyone who leaves their email.
          </p>
        </div>
      </section>

      <hr className="divider-brick" />

      {/* Timeline (How It Unfolds) — Elevated */}
      <section className="timeline-section" id="timeline" ref={timelineRef}>
        <motion.div
          className="timeline-inner"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <span
            className="eyebrow"
            style={{ position: "relative", zIndex: 10 }}
          >
            HOW IT UNFOLDS
          </span>
          <h2 className="timeline-heading">What happens next</h2>

          <div className="timeline-container" style={{ position: "relative" }}>
            <div className="timeline-line-bg" style={{ position: "absolute", left: "11px", top: "8px", bottom: "8px", width: "1px", background: "rgba(200, 185, 107, 0.2)" }} />
            <motion.div
              className="timeline-line-progress"
              style={{
                position: "absolute",
                left: "11px",
                top: "8px",
                width: "1px",
                background: "var(--stucco-gold)",
                height: timelineHeight
              }}
            />

            <ul className="timeline-list">
              {[
                { date: "Early 2026", label: "Building acquired. Renovation begins.", status: "" },
                { date: "Now", label: "Community input open", status: "active" },
                { date: "May 2026", label: "We share what we heard & final concept.", status: "future" },
                { date: "June 2026", label: "Tenant selection finalized.", status: "future" },
                { date: "July 2026", label: "Doors open.", status: "future" }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className={`timeline-item ${item.status === "active" ? "is-active" : ""} ${item.status === "future" ? "is-future" : ""}`}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <div className="timeline-dot" />
                  <div>
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-label">
                      {item.label}
                      {item.status === "active" && <span className="timeline-active-badge">You are here</span>}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      <hr className="divider-brick" />

      {/* The Story Group (Who We Are + History + Community Voice) */}
      <section className="story-group" id="story">
        {/* Who We Are */}
        <div className="section who-we-are" id="about">
          <div className="section-inner">
            <span className="eyebrow">WHO WE ARE</span>
            <h2 className="section-heading-plain" style={{ marginBottom: "24px" }}>
              A small group of Calgarians.
            </h2>
            <div className="body-text">
              <p>
                We bought this building because we didn't want to see it become
                something forgettable.
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
            <motion.div variants={clipPathReveal} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.2 }}>
              <img
                src="https://images.albertacornerstore.com/media/images/ownersphoto_1774129959876.webp"
                alt="Two people standing in front of the Alberta Corner Store building at 922 19 Ave SE"
                className="owners-photo"
                loading="eager"
              />
              <p className="photo-caption">
                "922 19 Ave SE — the day we got the keys."
              </p>
            </motion.div>
          </div>
        </div>

        <hr className="divider-gold" style={{ maxWidth: "720px", margin: "0 auto" }} />

        {/* History */}
        <div className="section" id="history">
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
              <motion.img
                variants={clipPathReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                src="https://images.albertacornerstore.com/media/images/exterior_signage_1774129959875.webp"
                alt="The Alberta Corner Store building showing the full GROCERIES · ALBERTA CORNER STORE · DRY GOODS sign band"
                loading="lazy"
              />
              <motion.img
                variants={clipPathReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                src="https://images.albertacornerstore.com/media/images/IMG_2321.webp"
                alt="Storefront window of the Alberta Corner Store showing retail display items visible through the glass"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <hr className="divider-brick" />

        {/* Community Voice (The Story & Video) */}
        <div className="section story-section">
          <div className="section-inner">
            <span className="eyebrow">THE STORY</span>
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

            {/* YouTube Video (Emotional Peak - Reward at bottom) */}
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
        </div>
      </section>

      {/* Map (Keep at bottom) */}
      <section className="map-section" id="map">
        <div className="map-inner">
          <span className="eyebrow" style={{ color: "var(--sidewalk-grey)" }}>FIND US</span>
          <h2 className="map-heading">The corner</h2>
          <p className="map-address">922 19 Ave SE — Ramsay, Calgary, AB</p>
          <div className="map-embed-wrap">
            <iframe
              src="https://maps.google.com/maps?q=922+19+Ave+SE+Calgary+AB+Canada&t=&z=16&ie=UTF8&iwloc=&output=embed"
              title="Alberta Corner Store location — 922 19 Ave SE, Ramsay, Calgary"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
