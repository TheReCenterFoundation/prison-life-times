import React from "react";
import { Link } from "react-router-dom";
import { PdfViewer } from "../PdfViewer";
import { issues } from "../issueConfig";

export function Home() {

  return (
    <>
      {/* ===== PROGRAMS ===== */}
      <section id="programs" className="program-section">
        <div className="program-section-inner container">
          <div className="section-head">
            <p className="script-title">Working Forward</p>
            <h2>Programs</h2>
            <p>
              Education, legal literacy, wellness, and reentry resources in each
              monthly issue.
            </p>
            <a className="btn" href="#stories">
              Explore All Programs
            </a>

            {/* PDF Viewer — Current Issue */}
            <PdfViewer issue={issues[0]} />
          </div>

          <div className="card-grid">
            <article
              className="card floating-card bg-1"
              style={{ "--float-delay": "0s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Education</h3>
                <p>GED, college pathways, and certificate opportunities.</p>
              </div>
            </article>
            <article
              className="card floating-card bg-2"
              style={{ "--float-delay": "0.15s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Legal Literacy</h3>
                <p>Plain-language updates on rights and legal process.</p>
              </div>
            </article>
            <article
              className="card floating-card bg-3"
              style={{ "--float-delay": "0.3s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Wellness</h3>
                <p>Trauma-informed tools for mental and physical wellbeing.</p>
              </div>
            </article>
            <article
              className="card floating-card bg-4"
              style={{ "--float-delay": "0.45s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Reentry</h3>
                <p>Housing, ID recovery, and first-90-day planning.</p>
              </div>
            </article>
            <article
              className="card floating-card bg-5"
              style={{ "--float-delay": "0.6s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Faith &amp; Reflection</h3>
                <p>
                  Spiritual and reflective practices that strengthen resilience.
                </p>
              </div>
            </article>
            <article
              className="card floating-card bg-6"
              style={{ "--float-delay": "0.75s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Financial Basics</h3>
                <p>Budgeting, debt cleanup, and planning for release.</p>
              </div>
            </article>
            <article
              className="card floating-card bg-7"
              style={{ "--float-delay": "0.9s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Career Readiness</h3>
                <p>Resume, interview prep, and fair-chance hiring tactics.</p>
              </div>
            </article>
            <article
              className="card floating-card bg-8"
              style={{ "--float-delay": "1.05s" } as React.CSSProperties}
            >
              <div className="card-content">
                <h3>Family Rebuild</h3>
                <p>
                  Reconnection tools for parenting and healthy communication.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== STORIES ===== */}
      <section id="stories" className="program-section light">
        <div className="program-section-inner container">
          <div className="section-head">
            <p className="script-title">Voices &amp; Vision</p>
            <h2>Stories</h2>
            <p>
              Personal journeys and practical playbooks for life during
              incarceration and after release.
            </p>
            <Link className="btn" to="/submit">
              Explore all features
            </Link>

            {/* PDF Viewer — Last Issue */}
            <PdfViewer issue={issues[1]} />
          </div>

          <div className="card-grid">
            <article
              className="card floating-card story-bg-1"
              style={{ "--float-delay": "0s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/Q2pxDb4.jpg"
                alt="Family Bonds"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Family Bonds</h3>
                <p>How families support release planning from home.</p>
              </div>
            </article>
            <article
              className="card floating-card story-bg-2"
              style={{ "--float-delay": "0.15s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/OoB1eB9.jpg"
                alt="Second Chances"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Second Chances</h3>
                <p>Employment routes after incarceration.</p>
              </div>
            </article>
            <article
              className="card floating-card story-bg-3"
              style={{ "--float-delay": "0.3s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/iSZf6Wl.jpg"
                alt="Inside Voices"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Inside Voices</h3>
                <p>Poetry and essays from incarcerated writers.</p>
              </div>
            </article>
            <article
              className="card floating-card story-bg-4"
              style={{ "--float-delay": "0.45s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/XKyRl6X.jpg"
                alt="Community"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Community</h3>
                <p>Organizations creating pathways to stability.</p>
              </div>
            </article>
            <article
              className="card floating-card story-bg-5"
              style={{ "--float-delay": "0.6s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/n0pKiTu.jpg"
                alt="Health Journey"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Health Journey</h3>
                <p>
                  Personal routines that improved mental wellness inside.
                </p>
              </div>
            </article>
            <article
              className="card floating-card story-bg-6"
              style={{ "--float-delay": "0.75s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/ekbxy9C.jpg"
                alt="Legal Win"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Legal Win</h3>
                <p>
                  Navigating appeals and finding the right legal support.
                </p>
              </div>
            </article>
            <article
              className="card floating-card story-bg-7"
              style={{ "--float-delay": "0.9s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/5Vlc1iU.jpg"
                alt="Back to School"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Back to School</h3>
                <p>From prison classrooms to higher education goals.</p>
              </div>
            </article>
            <article
              className="card floating-card story-bg-8"
              style={{ "--float-delay": "1.05s" } as React.CSSProperties}
            >
              <img
                className="card-media"
                src="https://i.imgur.com/gmnZCwJ.jpg"
                alt="Homecoming"
                loading="lazy"
              />
              <div className="card-content">
                <h3>Homecoming</h3>
                <p>Preparing for reunification and long-term stability.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CTA STRIP ===== */}
      <section id="submit" className="cta-strip container">
        <h3>Have a story, poem, letter, or artwork?</h3>
        <p>
          Our editorial team reviews every submission from incarcerated and
          formerly incarcerated contributors.
        </p>
        <Link className="btn" to="/submit">
          Start a Submission
        </Link>
      </section>
    </>
  );
}
