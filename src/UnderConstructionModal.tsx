import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "plt_construction_seen";
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/** Check whether the user has dismissed the modal within the last 24 hours. */
export function hasSeenNotice(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    return Date.now() - ts < EXPIRY_MS;
  } catch {
    return false;
  }
}

/** Mark the notice as seen right now. */
function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* storage unavailable — silently continue */
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UnderConstructionModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  /* ---------- close helper ---------- */
  const close = useCallback(() => {
    markSeen();
    onClose();
  }, [onClose]);

  /* ---------- lock body scroll & manage focus ---------- */
  useEffect(() => {
    if (!open) return;

    // Remember what was focused before
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // Lock scroll
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    // Focus the modal
    requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    return () => {
      // Restore scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);

      // Restore previous focus
      previousFocusRef.current?.focus();
    };
  }, [open]);

  /* ---------- ESC key ---------- */
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close]);

  /* ---------- focus trap ---------- */
  useEffect(() => {
    if (!open) return;
    const modal = modalRef.current;
    if (!modal) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  /* ---------- click outside ---------- */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) close();
    },
    [close]
  );

  /* ---------- email form submit ---------- */
  const handleEmailSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Basic client-side validation
      const trimmed = email.trim();
      if (!trimmed) {
        setEmailError("Please enter your email address.");
        return;
      }

      // Simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setEmailError("Please enter a valid email address.");
        return;
      }

      setEmailError("");

      // TODO: connect to email provider / form service (Formspree/Mailchimp/etc.)
      // Replace this block with an actual fetch/POST to your chosen service.
      // Example:
      //   fetch("https://formspree.io/f/YOUR_FORM_ID", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email: trimmed }),
      //   });

      setEmailSubmitted(true);
    },
    [email]
  );

  if (!open) return null;

  return (
    <div
      className="uc-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      aria-hidden="false"
    >
      <div
        className="uc-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="uc-title"
        aria-describedby="uc-desc"
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          className="uc-close"
          type="button"
          onClick={close}
          aria-label="Close notice"
        >
          ✕
        </button>

        {/* Construction icon */}
        <div className="uc-icon" aria-hidden="true">🚧</div>

        {/* Title */}
        <h2 id="uc-title" className="uc-title">Under Construction</h2>

        {/* Body */}
        <p id="uc-desc" className="uc-body">
          Thank you for visiting <strong>Prison Life Times</strong>. We're
          actively building this site to bring practical guidance, real stories,
          and opportunities to incarcerated readers, families, and returning
          citizens. We appreciate your patience as we put the finishing touches
          in place.
        </p>

        {/* Kickstarter CTA + Email capture */}
        <div className="uc-kickstarter">
          <p className="uc-kickstarter-copy">
            Help us reach more people. Support our mission on Kickstarter and
            be part of the change.
          </p>

          {/* ---- Email capture ---- */}
          {!emailSubmitted ? (
            <form
              className="uc-email-form"
              onSubmit={handleEmailSubmit}
              noValidate
              /* TODO: connect to email provider / form service (Formspree/Mailchimp/etc.) */
              action="#"
            >
              <div className="uc-email-field">
                <label htmlFor="uc-email-input" className="uc-email-label">
                  Email for updates
                </label>
                <input
                  id="uc-email-input"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  aria-describedby={
                    emailError ? "uc-email-error" : "uc-email-helper"
                  }
                  aria-invalid={emailError ? "true" : undefined}
                  className={`uc-email-input${emailError ? " uc-email-input--error" : ""}`}
                  autoComplete="email"
                />
                {emailError ? (
                  <p
                    id="uc-email-error"
                    className="uc-email-error"
                    role="alert"
                  >
                    {emailError}
                  </p>
                ) : (
                  <p id="uc-email-helper" className="uc-email-helper">
                    We'll only use this to send launch updates.
                  </p>
                )}
              </div>
              <button type="submit" className="uc-btn-notify">
                Notify Me
              </button>
            </form>
          ) : (
            <p
              className="uc-email-success"
              role="status"
              aria-live="polite"
              id="uc-email-success"
            >
              ✓ Thanks — you're on the update list.
            </p>
          )}

          {/* TODO: Replace href="#kickstarter" with the real Kickstarter campaign URL */}
          {/* TODO: Update button text and campaign-specific copy as needed */}
          <a
            className="btn uc-btn-primary"
            href="#kickstarter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support on Kickstarter
          </a>
        </div>

        {/* Continue */}
        <button
          className="uc-btn-secondary"
          type="button"
          onClick={close}
        >
          Continue to Site
        </button>
      </div>
    </div>
  );
}
