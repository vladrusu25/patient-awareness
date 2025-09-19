// src/lib/pdf/report.ts
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

type PdfPageSpec = {
  title: string;        // e.g., "Part 1. ENDOPAIN-4D"
  lines: string[];      // numbered items
  scoring?: string;     // extra scoring line shown at the end of the page
};

export async function renderSummaryPdf(opts: {
  token: string;
  generatedAt: Date;
  pages: PdfPageSpec[];  // one element per part you want to render
}): Promise<Uint8Array> {
  const { token, generatedAt, pages } = opts;
  const doc = await PDFDocument.create();

  // Fonts & colors
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const green = rgb(0.13, 0.55, 0.33);
  const gray = rgb(0.2, 0.2, 0.2);
  const subGray = rgb(0.35, 0.35, 0.35);

  // Layout constants (A4)
  const pageW = 595;
  const pageH = 842;
  const margin = 56;
  const contentWidth = pageW - margin * 2;

  const titleSize = 20;
  const metaSize = 10;
  const sectionSize = 12;
  const lineSize = 11;

  const lineGap = 16;
  const headerGap = 24;
  const sectionGap = 14;

  const dt = formatDateTime(generatedAt);
  const total = pages.length;

  pages.forEach((spec, idx) => {
    const page = doc.addPage([pageW, pageH]);

    // header
    const x = margin;
    let y = pageH - margin;

    if (idx === 0) {
      page.drawText('Health Assessment Summary', {
        x, y, size: titleSize, font: fontBold, color: green
      });
      y -= 26;
    }

    page.drawText(`Session: ${token}`, {
      x, y, size: metaSize, font: fontRegular, color: subGray
    });
    y -= 14;
    page.drawText(`Generated: ${dt}`, {
      x, y, size: metaSize, font: fontRegular, color: subGray
    });
    y -= headerGap;

    // section header
    page.drawText(spec.title, {
      x, y, size: sectionSize, font: fontBold, color: gray
    });
    y -= sectionGap;

    // numbered answers (single-line fit with ellipsis)
    const fit = (text: string, maxW: number) => {
      if (fontRegular.widthOfTextAtSize(text, lineSize) <= maxW) return text;
      const ellipsis = '…';
      const ellW = fontRegular.widthOfTextAtSize(ellipsis, lineSize);
      let lo = 0, hi = text.length;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        const part = text.slice(0, mid).trim();
        const w = fontRegular.widthOfTextAtSize(part, lineSize) + ellW;
        if (w <= maxW) lo = mid + 1; else hi = mid;
      }
      const trimmed = text.slice(0, Math.max(0, lo - 1)).trim();
      return trimmed + ellipsis;
    };

    const numberWidth = fontBold.widthOfTextAtSize('21.', lineSize);
    const numberGap = 6;
    const textStartX = x + numberWidth + numberGap;
    const usableWidth = x + contentWidth - textStartX;

    spec.lines.forEach((raw, i) => {
      const ixStr = `${i + 1}.`;
      page.drawText(ixStr, {
        x, y, size: lineSize, font: fontBold, color: gray
      });
      page.drawText(fit(raw, usableWidth), {
        x: textStartX, y, size: lineSize, font: fontRegular, color: gray
      });
      y -= lineGap;
    });

    if (spec.scoring) {
      y -= 6;
      page.drawText(spec.scoring, {
        x, y, size: 11, font: fontBold, color: gray
      });
    }

    // footer page number
    const footer = `${idx + 1}/${total}`;
    const w = fontRegular.widthOfTextAtSize(footer, 10);
    page.drawText(footer, {
      x: pageW / 2 - w / 2,
      y: margin / 2,
      size: 10,
      font: fontRegular,
      color: subGray
    });
  });

  return await doc.save();
}

/* ---------- helpers ---------- */
function pad2(n: number) { return n < 10 ? `0${n}` : `${n}`; }
function formatDateTime(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}, ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
