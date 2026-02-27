import { useState, useCallback, useEffect } from "react";
import type { IssueConfig } from "./issueConfig";

/**
 * PdfViewer — inline, responsive PDF viewer with graceful fallback.
 *
 * Uses <object> for broad native PDF rendering, with a built-in
 * fallback message + action links for browsers/devices that cannot
 * render PDFs inline (most mobile browsers).
 */
export function PdfViewer({ issue }: { issue: IssueConfig }) {
  const { label, title, pdfPath } = issue;

  // Track whether the <object> loaded successfully
  const [loadFailed, setLoadFailed] = useState(false);

  const handleError = useCallback(() => {
    setLoadFailed(true);
  }, []);

  return (
    <div className="pdf-viewer" role="region" aria-label={title}>
      {/* Header bar */}
      <div className="pdf-viewer-header">{label}</div>

      {/* Viewer frame — native <object> embed */}
      {!loadFailed ? (
        <div className="pdf-viewer-frame">
          <object
            data={pdfPath}
            type="application/pdf"
            title={title}
            aria-label={title}
            className="pdf-viewer-object"
            onError={handleError}
          >
            {/*
             * Fallback rendered inside <object> when the browser
             * cannot display the PDF inline.
             */}
            <FallbackContent pdfPath={pdfPath} title={title} onFallback={handleError} />
          </object>
        </div>
      ) : (
        /* Explicit fallback UI when we know embed failed */
        <div className="pdf-viewer-fallback">
          <div className="pdf-viewer-fallback-icon" aria-hidden="true">📄</div>
          <p className="pdf-viewer-fallback-title">
            Inline PDF preview is not available on this device.
          </p>
          <p className="pdf-viewer-fallback-copy">
            You can still read the full issue using the links below.
          </p>
          <div className="pdf-viewer-actions-centered">
            <a
              className="btn pdf-viewer-btn-open"
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PDF
            </a>
            <a
              className="btn pdf-viewer-btn-download"
              href={pdfPath}
              download
            >
              Download PDF
            </a>
          </div>
        </div>
      )}

      {/* Action bar — always visible below the viewer */}
      <div className="pdf-viewer-actions">
        <a
          className="pdf-viewer-link"
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in New Tab ↗
        </a>
        <a
          className="pdf-viewer-link"
          href={pdfPath}
          download
        >
          Download PDF ↓
        </a>
      </div>
    </div>
  );
}

/**
 * Inner fallback rendered inside <object> when PDF can't display.
 * Also fires `onFallback` so the parent can switch to explicit fallback UI.
 */
function FallbackContent({
  pdfPath,
  title,
  onFallback,
}: {
  pdfPath: string;
  title: string;
  onFallback: () => void;
}) {
  // Fire once on mount so the parent state flips to fallback mode
  useEffect(() => {
    const timer = setTimeout(onFallback, 600);
    return () => clearTimeout(timer);
  }, [onFallback]);

  return (
    <div className="pdf-viewer-fallback">
      <div className="pdf-viewer-fallback-icon" aria-hidden="true">📄</div>
      <p className="pdf-viewer-fallback-title">
        Your browser does not support inline PDF viewing.
      </p>
      <p className="pdf-viewer-fallback-copy">
        Use the links below to read <strong>{title}</strong>.
      </p>
      <div className="pdf-viewer-actions-centered">
        <a
          className="btn pdf-viewer-btn-open"
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open PDF
        </a>
        <a
          className="btn pdf-viewer-btn-download"
          href={pdfPath}
          download
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
