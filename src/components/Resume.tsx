import { motion } from "framer-motion";
import { Download, FileText, ExternalLink, RefreshCw } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
//  ✏️  RESUME CONFIG — only edit this block when updating your resume
//
//  HOW TO UPDATE:
//  1. Upload new PDF to Google Drive
//  2. Click "Share" → "Anyone with the link can view" → Copy link
//  3. Paste it as DRIVE_SHARE_URL below
//  4. Update RESUME_FILENAME to the new file name (shown in the header bar)
//  5. Update LAST_UPDATED to today's date
//
//  The embedded viewer, download button, and open-in-tab link all update
//  automatically — no other changes needed anywhere.
// ═══════════════════════════════════════════════════════════════════════════════
const DRIVE_SHARE_URL =
  "https://drive.google.com/file/d/16GnSXbZtbXiTKqk4XaZ_BqP3iaztDoEl/view?usp=sharing";
//   ↑ Replace with your actual Google Drive share link

const RESUME_FILENAME = "Rohan_Uke_Resume_Apr2026.pdf";
const LAST_UPDATED    = "April 2026";
// ═══════════════════════════════════════════════════════════════════════════════

// Converts a Google Drive share URL → embedded preview URL
// Share:    https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// Preview:  https://drive.google.com/file/d/FILE_ID/preview
const toEmbedUrl = (shareUrl: string): string => {
  try {
    const match = shareUrl.match(/\/file\/d\/([^/?]+)/);
    if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  } catch (_) {}
  return shareUrl;
};

// Converts share URL → direct download URL
// Download: https://drive.google.com/uc?export=download&id=FILE_ID
const toDownloadUrl = (shareUrl: string): string => {
  try {
    const match = shareUrl.match(/\/file\/d\/([^/?]+)/);
    if (match)
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  } catch (_) {}
  return shareUrl;
};

const embedUrl    = toEmbedUrl(DRIVE_SHARE_URL);
const downloadUrl = toDownloadUrl(DRIVE_SHARE_URL);

// ─────────────────────────────────────────────────────────────────────────────

const Resume = () => (
  <section id="resume" className="max-w-5xl mx-auto px-6 py-20">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="font-heading font-extrabold text-3xl md:text-4xl gradient-text mb-3">
        Resume
      </h2>
      <p className="text-muted-foreground max-w-lg mx-auto text-sm">
        A snapshot of my skills, experience, and education — always up to date for recruiters and collaborators.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl overflow-hidden border border-border/50"
    >
      {/* ── Action bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/20 flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm">
          <FileText size={16} className="text-primary" />
          <span className="font-medium text-foreground">{RESUME_FILENAME}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground/60 ml-1">
            <RefreshCw size={10} /> Updated {LAST_UPDATED}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={DRIVE_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink size={13} /> Open in Drive
          </a>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Download size={14} /> Download Resume
          </a>
        </div>
      </div>

      {/* ── Embedded Google Drive PDF viewer ── */}
      <div className="w-full bg-muted/10" style={{ height: "820px" }}>
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allow="autoplay"
          title="Rohan Uke Resume"
        >
          {/* Fallback for very old browsers */}
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-6">
            <FileText size={52} className="text-muted-foreground/40" />
            <div>
              <p className="text-foreground font-semibold mb-1">
                Preview unavailable in your browser
              </p>
              <p className="text-muted-foreground text-sm">
                Download the resume directly using the button below.
              </p>
            </div>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Download size={15} /> Download Resume
            </a>
          </div>
        </iframe>
      </div>

      {/* ── Bottom strip ── */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-border/50 bg-muted/10 flex-wrap gap-2">
        <span className="text-xs text-muted-foreground">
          Backend Engineer · Rohan Uke · Amravati, Maharashtra
        </span>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
        >
          <Download size={12} /> Download PDF
        </a>
      </div>
    </motion.div>
  </section>
);

export default Resume;