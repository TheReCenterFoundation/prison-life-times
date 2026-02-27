import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Contact page — placeholder content.
 *
 * TODO: Replace all placeholder details (address, phone, email, hours)
 *       with real contact information once available.
 */
export function Contact() {
  const navigate = useNavigate();

  const goToSubmissions = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("submit")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    },
    [navigate]
  );

  return (
    <div className="contact-page container">
      {/* ===== PAGE HEADER ===== */}
      <div className="contact-hero">
        <p className="script-title">Get in Touch</p>
        <h1>Contact</h1>
        <p>
          We'd love to hear from you. Whether you have questions about our
          publication, want to discuss partnerships, or need to reach our
          editorial team — we're here to help.
        </p>
      </div>

      {/* ===== CONTACT CARDS ===== */}
      <div className="contact-card-grid">
        <article
          className="card floating-card contact-card-sm contact-bg-1"
          style={{ "--float-delay": "0s" } as React.CSSProperties}
        >
          <div className="card-content">
            <span className="contact-card-emoji" aria-hidden="true">📍</span>
            <h3>Mailing Address</h3>
            <p>
              Prison Life Times<br />
              P.O. Box XXXXX<br />
              City, State ZIP
            </p>
            {/* TODO: Replace with actual mailing address */}
            <p className="contact-placeholder">Placeholder — update with real address</p>
          </div>
        </article>

        <article
          className="card floating-card contact-card-sm contact-bg-2"
          style={{ "--float-delay": "0.15s" } as React.CSSProperties}
        >
          <div className="card-content">
            <span className="contact-card-emoji" aria-hidden="true">📞</span>
            <h3>Phone</h3>
            <p>1-800-PRISON-MAG</p>
            <p className="contact-card-note">Available Monday – Friday</p>
            {/* TODO: Confirm phone number and availability hours */}
            <p className="contact-placeholder">Placeholder — confirm phone number</p>
          </div>
        </article>

        <article
          className="card floating-card contact-card-sm contact-bg-3"
          style={{ "--float-delay": "0.3s" } as React.CSSProperties}
        >
          <div className="card-content">
            <span className="contact-card-emoji" aria-hidden="true">✉️</span>
            <h3>Email</h3>
            <p>info@prisonlifetimes.com</p>
            <p className="contact-card-note">We aim to respond within 48 hours</p>
            {/* TODO: Replace with actual email address */}
            <p className="contact-placeholder">Placeholder — update with real email</p>
          </div>
        </article>

        <article
          className="card floating-card contact-card-sm contact-bg-4"
          style={{ "--float-delay": "0.45s" } as React.CSSProperties}
        >
          <div className="card-content">
            <span className="contact-card-emoji" aria-hidden="true">🕐</span>
            <h3>Business Hours</h3>
            <p>
              Monday – Friday<br />
              9:00 AM – 5:00 PM EST
            </p>
            {/* TODO: Confirm business hours */}
            <p className="contact-placeholder">Placeholder — confirm hours</p>
          </div>
        </article>

        <article
          className="card floating-card contact-card-sm contact-bg-5"
          style={{ "--float-delay": "0.6s" } as React.CSSProperties}
        >
          <div className="card-content">
            <span className="contact-card-emoji" aria-hidden="true">📰</span>
            <h3>Media &amp; Press</h3>
            <p>
              For press inquiries, interview requests, or media kits, email{" "}
              <strong>press@prisonlifetimes.com</strong>.
            </p>
            {/* TODO: Replace with real press email */}
            <p className="contact-placeholder">Placeholder — update press email</p>
          </div>
        </article>

        <article
          className="card floating-card contact-card-sm contact-bg-6"
          style={{ "--float-delay": "0.75s" } as React.CSSProperties}
        >
          <div className="card-content">
            <span className="contact-card-emoji" aria-hidden="true">🤝</span>
            <h3>Partnerships</h3>
            <p>
              Interested in distributing Prison Life Times in your facility or
              organization? Reach out to discuss bulk subscriptions.
            </p>
            {/* TODO: Add partnership contact details */}
            <p className="contact-placeholder">Placeholder — add partnership contact</p>
          </div>
        </article>
      </div>

      {/* ===== SUBMISSIONS CTA ===== */}
      <div className="contact-cta">
        <h3>Want to Submit Your Work?</h3>
        <p>
          We welcome essays, poetry, letters, and artwork from incarcerated
          and formerly incarcerated contributors. Our editorial team reviews
          every submission.
        </p>
        <a className="btn" href="#submit" onClick={goToSubmissions}>
          Go to Submissions
        </a>
      </div>
    </div>
  );
}
