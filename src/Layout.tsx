import { useRef, useCallback, useState, useEffect } from "react";
// useRef still needed for noticeOpenerRef
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { UnderConstructionModal, hasSeenNotice } from "./UnderConstructionModal";

/**
 * Shared layout rendered on every page.
 *
 * - On the home page ("/"), the header renders the full hero with
 *   background image and hero content.
 * - On all other pages, a compact dark-green header is shown.
 * - Footer, submission dialog, and under-construction modal are
 *   shared across every route.
 */
export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const noticeOpenerRef = useRef<HTMLButtonElement>(null);
  const year = new Date().getFullYear();

  /* ===== Scroll to top on route change ===== */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* ===== Under-Construction Modal State ===== */
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    if (!hasSeenNotice()) setShowNotice(true);
  }, []);

  const openNotice = useCallback(() => setShowNotice(true), []);

  const closeNotice = useCallback(() => {
    setShowNotice(false);
    noticeOpenerRef.current?.focus();
  }, []);

  /* Submission dialog removed — Submit page handles submissions directly */

  /* ===== Section-scroll helper (for nav links to home-page sections) ===== */
  const goToSection = useCallback(
    (e: React.MouseEvent, id: string) => {
      if (!isHome) {
        e.preventDefault();
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
      // If already on home, the default anchor behaviour handles scrolling
    },
    [isHome, navigate]
  );

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={isHome ? "hero" : "page-header"}>
        <div className="topbar container">
          <p>Working in all 50 states • Print + Digital edition</p>
          <p>Info line: 1-800-PRISON-MAG</p>
        </div>

        <nav className="navbar container">
          <Link className="brand" to="/">
            <img
              src="https://i.imgur.com/oK7mScc.png"
              alt="Prison Life Times"
              className="brand-logo"
            />
          </Link>
          <ul>
            <li>
              <a href="#programs" onClick={(e) => goToSection(e, "programs")}>
                Programs
              </a>
            </li>
            <li>
              <a href="#stories" onClick={(e) => goToSection(e, "stories")}>
                Stories
              </a>
            </li>
            <li>
              <Link to="/submit">Submit</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Hero content — home page only */}
        {isHome && (
          <section className="hero-content container">
            <p className="kicker">PROVIDING</p>
            <h1>
              <span className="script">Inspiration</span>
              <br />
              INSIDE &amp; BEYOND
            </h1>
            <p className="hero-copy">
              Practical guidance, real stories, and opportunities for
              incarcerated readers, families, and returning citizens—published
              in print and online.
            </p>
            <div className="hero-cta-group">
              <a className="btn" href="#programs">
                Explore All Programs
              </a>
              <a className="btn btn-bold" href="#support">
                Support the Mission
              </a>
            </div>
          </section>
        )}
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <main>
        <Outlet />
      </main>

      {/* Submission dialog removed — /submit page handles submissions */}

      {/* ===== FOOTER ===== */}
      <footer>
        <p>
          © {year} Prison Life Times. Pathways from incarceration to
          opportunity.
        </p>
        <button
          ref={noticeOpenerRef}
          className="site-notice-link"
          type="button"
          onClick={openNotice}
        >
          📢 Site Notice
        </button>
      </footer>

      {/* ===== UNDER CONSTRUCTION MODAL ===== */}
      <UnderConstructionModal open={showNotice} onClose={closeNotice} />
    </>
  );
}
