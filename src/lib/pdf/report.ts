import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

/**
 * Render a single-page A4 (portrait) PDF with:
 *  - Title, session token, generated at
 *  - Section header: "Part 1. ENDOPAIN-4D"
 *  - Numbered list of answers (1 line per answer)
 *
 * @param opts.title       (optional) main title. Default: "Health Assessment Summary"
 * @param opts.token       public session token to show in the header
 * @param opts.generatedAt JS Date for the "Generated" line
 * @param opts.lines       The already-humanized answer lines in display order (length <= 21)
 *                         e.g. "Spontaneous pelvic pain: No", "Menstrual pain: Yes — 4/10", ...
 */
export async function renderSummaryPdf(opts: {
  title?: string;
  token: string;
  generatedAt: Date;
  lines: string[];
}): Promise<Uint8Array> {
  const title = opts.title ?? 'Health Assessment Summary';
  const { token, generatedAt, lines } = opts;

  const doc = await PDFDocument.create();

  // A4 portrait: 595 x 842 points
  const page = doc.addPage([595, 842]);

  // Fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  // Color palette
  const green = rgb(0.13, 0.55, 0.33);  // header title (same vibe as your site header)
  const gray = rgb(0.2, 0.2, 0.2);
  const subGray = rgb(0.35, 0.35, 0.35);

  // Layout
  const margin = 56;                                // outer page margin
  const contentWidth = page.getWidth() - margin * 2; // single-column width
  const titleSize = 20;
  const headerSize = 10;
  const sectionSize = 12;
  const lineSize = 11;
  const lineGap = 16;                                // line height for answers
  const headerGap = 24;                              // extra gap between header block and section header
  const sectionGap = 14;                             // gap after section header before first answer

  const x = margin;
  let y = page.getHeight() - margin;

  // ---- Title
  page.drawText(title, {
    x,
    y,
    size: titleSize,
    font: fontBold,
    color: green
  });
  y -= 26;

  // ---- Session metadata
  page.drawText(`Session: ${token}`, {
    x,
    y,
    size: headerSize,
    font: fontRegular,
    color: subGray
  });
  y -= 14;

  const dt = formatDateTime(generatedAt);
  page.drawText(`Generated: ${dt}`, {
    x,
    y,
    size: headerSize,
    font: fontRegular,
    color: subGray
  });

  // Add extra padding before the section header
  y -= headerGap;

  // ---- Section header
  page.drawText('Part 1. ENDOPAIN-4D', {
    x,
    y,
    size: sectionSize,
    font: fontBold,
    color: gray
  });
  y -= sectionGap;

  // ---- Answers as a numbered, single-line list
  // Helper to keep any line to a single row by truncating with ellipsis when required
  const fitOneLine = (text: string, maxWidth: number) => {
    if (fontRegular.widthOfTextAtSize(text, lineSize) <= maxWidth) return text;

    const ellipsis = '…';
    const ellipsisW = fontRegular.widthOfTextAtSize(ellipsis, lineSize);

    // binary trim for speed on long strings
    let lo = 0;
    let hi = text.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      const part = text.slice(0, mid).trim();
      const w = fontRegular.widthOfTextAtSize(part, lineSize) + ellipsisW;
      if (w <= maxWidth) lo = mid + 1;
      else hi = mid;
    }
    const trimmed = text.slice(0, Math.max(0, lo - 1)).trim();
    return trimmed + ellipsis;
  };

  const numberWidth = fontBold.widthOfTextAtSize('21.', lineSize); // reserve for the largest index
  const numberGap = 6;
  const textStartX = x + numberWidth + numberGap;
  const usableWidth = x + contentWidth - textStartX;

  // We expect <= 21 items; keep within 1 page
  lines.forEach((raw, i) => {
    // If you want to force single page, stop writing if we're too low
    // but 21 lines * 16 + header fits fine with this layout.
    const idx = i + 1;
    const ixStr = `${idx}.`;

    // Draw number
    page.drawText(ixStr, {
      x,
      y,
      size: lineSize,
      font: fontBold,
      color: gray
    });

    // Fit text in single line
    const text = fitOneLine(raw, usableWidth);
    page.drawText(text, {
      x: textStartX,
      y,
      size: lineSize,
      font: fontRegular,
      color: gray
    });

    y -= lineGap;
  });

  return await doc.save();
}

/* ---------- helpers ---------- */

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDateTime(d: Date) {
  // yyyy-mm-dd, HH:MM
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}, ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
