import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import Landing from "@/pages/Landing";
import InputForm from "@/pages/InputForm";
import ThankYou from "@/pages/ThankYou";

function Nav() {
  return (
    <nav className="site-nav" aria-label="Site navigation">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Alberta Corner Store
        </Link>
        <Link href="/input" className="nav-cta">
          Share Your Input
        </Link>
      </div>
    </nav>
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
