/**
 * ============================================================
 * ISSUE → PDF CONFIGURATION
 * ============================================================
 *
 * HOW TO ADD / UPDATE PDFS:
 *
 * 1. Place your PDF files in the  public/pdf/issues/  folder.
 *    Example:  public/pdf/issues/current-issue.pdf
 *
 * 2. Update the `pdfPath` field below to match the filename:
 *    pdfPath: "/pdf/issues/current-issue.pdf"
 *
 * 3. The path is relative to the public root — Vite serves
 *    everything in /public at the site root automatically.
 *
 * 4. Update `title` and `label` as needed for each issue.
 *
 * FILE STRUCTURE EXPECTED:
 *   public/
 *   └── pdf/
 *       └── issues/
 *           ├── current-issue.pdf    ← TODO: drop your PDF here
 *           └── last-issue.pdf       ← TODO: drop your PDF here
 * ============================================================
 */

export interface IssueConfig {
  /** Unique slug for routing / identification */
  slug: string;
  /** Display label shown in the viewer header (e.g. "📖 Current Issue") */
  label: string;
  /** Descriptive title used for the iframe/object title attribute (accessibility) */
  title: string;
  /**
   * Path to the PDF file, relative to the public root.
   * TODO: Replace these placeholder paths with the real PDF filenames
   *       once the files are available.
   */
  pdfPath: string;
}

/**
 * Master list of issues displayed on the site.
 * Add, remove, or reorder entries here — the rest of the app
 * reads from this array automatically.
 */
export const issues: IssueConfig[] = [
  {
    slug: "current-issue",
    label: "📖 Current Issue",
    title: "Prison Life Times — Current Issue (PDF)",
    // TODO: Replace with the real PDF path once available
    pdfPath: "/pdf/issues/current-issue.pdf",
  },
  {
    slug: "last-issue",
    label: "📖 Last Issue",
    title: "Prison Life Times — Last Issue (PDF)",
    // TODO: Replace with the real PDF path once available
    pdfPath: "/pdf/issues/last-issue.pdf",
  },
];

/**
 * Helper: look up a single issue by slug.
 */
export function getIssueBySlug(slug: string): IssueConfig | undefined {
  return issues.find((i) => i.slug === slug);
}
