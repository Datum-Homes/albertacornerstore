import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Landing from "@/pages/Landing";
import InputForm from "@/pages/InputForm";
import ThankYou from "@/pages/ThankYou";

function Nav() {
  const [location] = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only hide on landing page
    if (location === "/" && latest > window.innerHeight * 0.75) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.nav 
      className="site-nav" 
      aria-label="Site navigation"
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1 
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Alberta Corner<br />Store
        </Link>
        <Link href="/input" className="nav-cta">
          Share Your Vision
        </Link>
      </div>
    </motion.nav>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-left">Alberta Corner Store — 922 19 Ave SE, Ramsay, Calgary.</span>
        <span className="footer-right">A community project, 2026.</span>
      </div>
    </footer>
  );
}

function NotFound() {
  return (
    <div style={{ padding: "120px 24px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: "var(--store-green)", fontSize: "32px" }}>
        Page not found
      </h1>
      <p style={{ marginTop: "16px", fontFamily: "'DM Sans', sans-serif", color: "var(--sidewalk-grey)" }}>
        <Link href="/" style={{ color: "var(--store-green)" }}>← Back to home</Link>
      </p>
    </div>
  );
}

function Router() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/input" component={InputForm} />
        <Route path="/thank-you" component={ThankYou} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
