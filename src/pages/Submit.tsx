import { useState, useCallback, useRef } from "react";

/**
 * Submit page — full submission form + guidelines.
 *
 * TODO: Connect form submission to a backend or form service
 *       (e.g., Formspree, Netlify Forms, custom API endpoint).
 */
export function Submit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facility: "",
    category: "",
    title: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Max individual file size: 10 MB */
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  /** Max total attachments */
  const MAX_FILES = 5;
  /** Accepted MIME types / extensions */
  const ACCEPTED_TYPES = ".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.gif,.webp";

  const categories = [
    { value: "essay", label: "Essay", icon: "📝", desc: "Personal narratives, opinion pieces, or reflections — 500 to 2,000 words." },
    { value: "poetry", label: "Poetry", icon: "🖊️", desc: "Original poetry in any style — up to 5 poems per submission." },
    { value: "letter", label: "Letter", icon: "✉️", desc: "Open letters, letters of encouragement, or advice — up to 1,000 words." },
    { value: "artwork", label: "Artwork", icon: "🎨", desc: "Drawings, paintings, or mixed media — describe the piece and medium." },
    { value: "interview", label: "Interview", icon: "🎤", desc: "Q&A format sharing your experience or expertise — 800 to 2,500 words." },
    { value: "resource", label: "Resource Tip", icon: "📋", desc: "Practical tips for reentry, wellness, education, or legal matters." },
  ];

  const guidelines = [
    { icon: "✅", title: "Who Can Submit", text: "Currently or formerly incarcerated individuals, family members, and advocates." },
    { icon: "📏", title: "Length", text: "Essays: 500–2,000 words. Poetry: up to 5 poems. Letters: up to 1,000 words." },
    { icon: "⏳", title: "Review Time", text: "Our editorial team reviews every submission. Expect a response within 4–6 weeks." },
    { icon: "📬", title: "Mail-In", text: "No internet access? Mail submissions to our P.O. Box listed on the Contact page." },
    { icon: "🔒", title: "Privacy", text: "Pen names accepted. We will never share your personal info without consent." },
    { icon: "📖", title: "Rights", text: "You retain rights to your work. We request first publication rights for print and digital." },
  ];

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.category) newErrors.category = "Please select a category.";
    if (!formData.title.trim()) newErrors.title = "Please give your piece a title.";
    if (!formData.message.trim()) newErrors.message = "Please tell us about your submission.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error for this field on change
      setErrors((prev) => {
        if (prev[name]) {
          const next = { ...prev };
          delete next[name];
          return next;
        }
        return prev;
      });
    },
    []
  );

  /** Opens the native file picker */
  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /** Handles files selected via the file input */
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles) return;

      const newFiles: File[] = [];
      const fileErrors: string[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (file.size > MAX_FILE_SIZE) {
          fileErrors.push(`"${file.name}" exceeds 10 MB limit.`);
        } else {
          newFiles.push(file);
        }
      }

      setAttachments((prev) => {
        const combined = [...prev, ...newFiles];
        if (combined.length > MAX_FILES) {
          fileErrors.push(`Maximum ${MAX_FILES} files allowed.`);
          return combined.slice(0, MAX_FILES);
        }
        return combined;
      });

      if (fileErrors.length > 0) {
        setErrors((prev) => ({ ...prev, attachments: fileErrors.join(" ") }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.attachments;
          return next;
        });
      }

      // Reset file input so same file can be re-selected
      e.target.value = "";
    },
    []
  );

  /** Remove a single attachment by index */
  const removeAttachment = useCallback((index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.attachments;
      return next;
    });
  }, []);

  /** Format file size for display */
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      // TODO: Connect to backend / form service (Formspree, Netlify Forms, custom API)
      // When connecting, use FormData to include file attachments:
      //   const fd = new FormData();
      //   Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      //   attachments.forEach((file) => fd.append("attachments", file));
      // For now, simulate a successful submission.
      console.log("Submission data:", formData);
      console.log("Attachments:", attachments);
      setSubmitted(true);
    },
    [formData, validate]
  );

  const resetForm = useCallback(() => {
    setFormData({ name: "", email: "", facility: "", category: "", title: "", message: "" });
    setAttachments([]);
    setSubmitted(false);
    setErrors({});
  }, []);

  return (
    <div className="submit-page container">
      {/* ===== PAGE HEADER ===== */}
      <div className="submit-hero">
        <p className="script-title">Share Your Voice</p>
        <h1>Submit Your Work</h1>
        <p>
          We welcome essays, poetry, letters, artwork, and more from
          incarcerated and formerly incarcerated contributors. Every
          submission is reviewed by our editorial team.
        </p>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section className="submit-categories">
        <h2 className="submit-section-title">What We Accept</h2>
        <div className="submit-cat-grid">
          {categories.map((cat, i) => (
            <article
              key={cat.value}
              className={`card floating-card submit-card-sm submit-cat-bg-${i + 1}`}
              style={{ "--float-delay": `${i * 0.15}s` } as React.CSSProperties}
            >
              <div className="card-content">
                <span className="contact-card-emoji" aria-hidden="true">{cat.icon}</span>
                <h3>{cat.label}</h3>
                <p>{cat.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== GUIDELINES ===== */}
      <section className="submit-guidelines">
        <h2 className="submit-section-title">Submission Guidelines</h2>
        <div className="submit-guidelines-grid">
          {guidelines.map((g) => (
            <div key={g.title} className="submit-guideline-item">
              <span className="submit-guideline-icon" aria-hidden="true">{g.icon}</span>
              <div>
                <h4>{g.title}</h4>
                <p>{g.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SUBMISSION FORM ===== */}
      <section className="submit-form-section" id="submit-form">
        <h2 className="submit-section-title">Start Your Submission</h2>

        {submitted ? (
          <div className="submit-success" role="status" aria-live="polite">
            <span className="submit-success-icon" aria-hidden="true">✅</span>
            <h3>Thank You for Your Submission</h3>
            <p>
              We've received your work and our editorial team will review it.
              Expect a response within 4–6 weeks. We appreciate your voice
              and your trust.
            </p>
            <button className="btn" type="button" onClick={resetForm}>
              Submit Another Piece
            </button>
          </div>
        ) : (
          /* TODO: Connect action to real form endpoint */
          <form
            className="submit-form"
            onSubmit={handleSubmit}
            noValidate
            action="#"
          >
            <div className="submit-form-grid">
              {/* Name */}
              <div className="submit-field">
                <label htmlFor="submit-name" className="submit-label">
                  Full Name <span className="submit-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="submit-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`submit-input ${errors.name ? "submit-input--error" : ""}`}
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "submit-name-error" : undefined}
                />
                {errors.name && (
                  <p id="submit-name-error" className="submit-error" role="alert">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="submit-field">
                <label htmlFor="submit-email" className="submit-label">
                  Email <span className="submit-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="submit-email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`submit-input ${errors.email ? "submit-input--error" : ""}`}
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "submit-email-error" : "submit-email-help"}
                />
                {errors.email ? (
                  <p id="submit-email-error" className="submit-error" role="alert">{errors.email}</p>
                ) : (
                  <p id="submit-email-help" className="submit-helper">So we can follow up on your submission.</p>
                )}
              </div>

              {/* Facility (optional) */}
              <div className="submit-field">
                <label htmlFor="submit-facility" className="submit-label">
                  Facility / Location <span className="submit-optional">(optional)</span>
                </label>
                <input
                  id="submit-facility"
                  name="facility"
                  type="text"
                  placeholder="e.g., State Correctional Inst."
                  value={formData.facility}
                  onChange={handleChange}
                  className="submit-input"
                />
              </div>

              {/* Category */}
              <div className="submit-field">
                <label htmlFor="submit-category" className="submit-label">
                  Category <span className="submit-required" aria-hidden="true">*</span>
                </label>
                <select
                  id="submit-category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className={`submit-input ${errors.category ? "submit-input--error" : ""}`}
                  aria-invalid={errors.category ? "true" : undefined}
                  aria-describedby={errors.category ? "submit-category-error" : undefined}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                {errors.category && (
                  <p id="submit-category-error" className="submit-error" role="alert">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Title — full width */}
            <div className="submit-field">
              <label htmlFor="submit-title" className="submit-label">
                Title of Your Piece <span className="submit-required" aria-hidden="true">*</span>
              </label>
              <input
                id="submit-title"
                name="title"
                type="text"
                required
                placeholder="Give your work a title"
                value={formData.title}
                onChange={handleChange}
                className={`submit-input ${errors.title ? "submit-input--error" : ""}`}
                aria-invalid={errors.title ? "true" : undefined}
                aria-describedby={errors.title ? "submit-title-error" : undefined}
              />
              {errors.title && (
                <p id="submit-title-error" className="submit-error" role="alert">{errors.title}</p>
              )}
            </div>

            {/* Message / Description — full width */}
            <div className="submit-field">
              <label htmlFor="submit-message" className="submit-label">
                About Your Submission <span className="submit-required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="submit-message"
                name="message"
                required
                rows={6}
                placeholder="Tell us about your piece — share the text, describe the artwork, or give us context about your submission…"
                value={formData.message}
                onChange={handleChange}
                className={`submit-input submit-textarea ${errors.message ? "submit-input--error" : ""}`}
                aria-invalid={errors.message ? "true" : undefined}
                aria-describedby={errors.message ? "submit-message-error" : "submit-message-help"}
              />
              {errors.message ? (
                <p id="submit-message-error" className="submit-error" role="alert">{errors.message}</p>
              ) : (
                <p id="submit-message-help" className="submit-helper">
                  For essays, poetry, and letters you can paste the full text here.
                  For artwork, describe the piece and medium used.
                </p>
              )}
            </div>

            {/* ===== FILE ATTACHMENT ===== */}
            <div className="submit-field">
              <span className="submit-label">
                Attachments <span className="submit-optional">(optional — up to {MAX_FILES} files, 10 MB each)</span>
              </span>

              {/* Hidden native file input */}
              <input
                ref={fileInputRef}
                id="submit-attachments"
                type="file"
                multiple
                accept={ACCEPTED_TYPES}
                onChange={handleFileChange}
                className="submit-file-input-hidden"
                aria-describedby={errors.attachments ? "submit-attach-error" : "submit-attach-help"}
                tabIndex={-1}
              />

              {/* Styled upload button */}
              <button
                type="button"
                className="submit-attach-btn"
                onClick={triggerFileInput}
                aria-controls="submit-attachments"
              >
                <span className="submit-attach-btn-icon" aria-hidden="true">📎</span>
                Choose Files
              </button>

              {/* File list */}
              {attachments.length > 0 && (
                <ul className="submit-file-list" role="list" aria-label="Attached files">
                  {attachments.map((file, i) => (
                    <li key={`${file.name}-${i}`} className="submit-file-item">
                      <span className="submit-file-name" title={file.name}>
                        {file.name}
                      </span>
                      <span className="submit-file-size">{formatSize(file.size)}</span>
                      <button
                        type="button"
                        className="submit-file-remove"
                        onClick={() => removeAttachment(i)}
                        aria-label={`Remove ${file.name}`}
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {errors.attachments ? (
                <p id="submit-attach-error" className="submit-error" role="alert">{errors.attachments}</p>
              ) : (
                <p id="submit-attach-help" className="submit-helper">
                  Accepted: PDF, DOC, DOCX, TXT, RTF, JPG, PNG, GIF, WEBP.
                </p>
              )}
            </div>

            {/* Submit button */}
            <div className="submit-form-actions">
              <button className="btn submit-btn-primary" type="submit">
                Submit Your Work
              </button>
              <p className="submit-form-note">
                By submitting, you confirm this is your original work and agree to our review process.
              </p>
            </div>
          </form>
        )}
      </section>

      {/* ===== MAIL-IN CTA ===== */}
      <div className="submit-mail-cta">
        <h3>📬 Prefer to Mail Your Submission?</h3>
        <p>
          Send typed or handwritten submissions to our mailing address. Include your
          name, contact info (or facility info), and category. We review mailed
          submissions with the same care as digital ones.
        </p>
        <p className="submit-mail-address">
          Prison Life Times · P.O. Box XXXXX · City, State ZIP
        </p>
        {/* TODO: Replace with actual mailing address */}
        <p className="contact-placeholder" style={{ color: "rgba(255,255,255,0.5)" }}>
          Placeholder — update with real mailing address
        </p>
      </div>
    </div>
  );
}
