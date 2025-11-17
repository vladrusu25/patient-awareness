// src/lib/pdf/report.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit/dist/fontkit.umd.js';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Language } from '$lib/i18n/types';
import { getReportLocale } from '$lib/assessment/report-i18n';

type PdfPageSpec = {
  title: string;        // e.g., "Part 1. ENDOPAIN-4D"
  lines: string[];      // numbered items
  scoring?: string;     // extra scoring line shown at the end of the page
  intro?: string[];     // optional description paragraphs shown before lines
};

const FONT_PATHS = {
  regular: join(process.cwd(), 'static', 'fonts', 'NotoSans-Regular.ttf'),
  bold: join(process.cwd(), 'static', 'fonts', 'NotoSans-Bold.ttf')
};

let fontCache: { regular: Uint8Array; bold: Uint8Array } | null = null;

async function loadFontData() {
  if (fontCache) return fontCache;
  const [regular, bold] = await Promise.all([
    readFile(FONT_PATHS.regular),
    readFile(FONT_PATHS.bold)
  ]);
  fontCache = {
    regular: new Uint8Array(regular),
    bold: new Uint8Array(bold)
  };
  return fontCache;
}

export async function renderSummaryPdf(opts: {
  token: string;
  patientId?: string | null;
  doctorName?: string | null;
  generatedAt: Date;
  pages: PdfPageSpec[];  // one element per part you want to render
  language?: Language;
}): Promise<Uint8Array> {
  const { token, patientId, generatedAt, pages, doctorName: rawDoctorName } = opts;
  const doctorName = rawDoctorName && rawDoctorName.trim().length ? rawDoctorName.trim() : null;
  const language: Language = opts.language ?? 'en';
  const doc = await PDFDocument.create();
  const locale = getReportLocale(language);
  doc.registerFontkit(fontkit);

  // Fonts & colors
  let fontRegular;
  let fontBold;
  try {
    const fonts = await loadFontData();
    fontRegular = await doc.embedFont(fonts.regular);
    fontBold = await doc.embedFont(fonts.bold);
  } catch (err) {
    console.warn('Falling back to standard PDF fonts:', err);
    fontRegular = await doc.embedFont(StandardFonts.Helvetica);
    fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
    if (language === 'ru' || language === 'kz' || language === 'hr' || language === 'sk') {
      throw new Error('Custom font required for non-Latin PDF output');
    }
  }
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

  const dt = formatDateTime(generatedAt, language);
  const total = pages.length;
  const patientLabel =
    patientId && patientId.trim() ? patientId.trim() : locale.headers.patientNotProvided;

  pages.forEach((spec, idx) => {
    const page = doc.addPage([pageW, pageH]);

    // header
    const x = margin;
    let y = pageH - margin;

    if (idx === 0) {
      page.drawText(locale.summaryTitle, {
        x, y, size: titleSize, font: fontBold, color: green
      });
      y -= 26;
    }

    page.drawText(`${locale.headers.assessmentId}: ${token}`, {
      x, y, size: metaSize, font: fontRegular, color: subGray
    });
    y -= 14;
    page.drawText(`${locale.headers.patientId}: ${patientLabel}`, {
      x, y, size: metaSize, font: fontRegular, color: subGray
    });
    y -= 14;
    if (doctorName) {
      const doctorLabel = locale.headers.doctorName ?? 'Doctor';
      page.drawText(`${doctorLabel}: ${doctorName}`, {
        x, y, size: metaSize, font: fontRegular, color: subGray
      });
      y -= 14;
    }
    page.drawText(`${locale.headers.generated}: ${dt}`, {
      x, y, size: metaSize, font: fontRegular, color: subGray
    });
    y -= headerGap;

    // section header
    page.drawText(spec.title, {
      x, y, size: sectionSize, font: fontBold, color: gray
    });
    y -= sectionGap;

    const wrapText = (text: string, maxW: number, font: PDFFont, size: number) => {
      const lines: string[] = [];
      let remaining = text.trim();
      while (remaining.length) {
        let lo = 0;
        let hi = remaining.length;
        if (font.widthOfTextAtSize(remaining, size) <= maxW) {
          lines.push(remaining);
          break;
        }
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          const slice = remaining.slice(0, mid + 1);
          const width = font.widthOfTextAtSize(slice, size);
          if (width <= maxW) lo = mid + 1;
          else hi = mid;
        }
        let end = lo;
        const candidate = remaining.slice(0, end);
        const lastSpace = candidate.lastIndexOf(' ');
        if (lastSpace > 0) end = lastSpace;
        const chunk = remaining.slice(0, end).trim();
        if (!chunk) {
          lines.push(remaining);
          break;
        }
        lines.push(chunk);
        remaining = remaining.slice(end).trim();
      }
      return lines;
    };

    if (spec.intro?.length) {
      const introSize = 10;
      spec.intro.forEach((paragraph) => {
        const introLines = wrapText(paragraph, contentWidth, fontRegular, introSize);
        introLines.forEach((line) => {
          page.drawText(line, {
            x,
            y,
            size: introSize,
            font: fontRegular,
            color: subGray
          });
          y -= introSize + 4;
        });
        y -= 6;
      });
      y -= 4;
    }

    // summary lines (single-line fit with ellipsis)
    const fit = (text: string, maxW: number) => {
      if (fontRegular.widthOfTextAtSize(text, lineSize) <= maxW) return text;
      const ellipsis = '...';
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

    spec.lines.forEach((raw) => {
      const boldMatch = /^\*\*(.+)\*\*$/.exec(raw.trim());
      const isBold = Boolean(boldMatch);
      const text = isBold ? boldMatch![1] : raw;
      const font = isBold ? fontBold : fontRegular;
      const lineText = fit(text, contentWidth);

      page.drawText(lineText, {
        x,
        y,
        size: lineSize,
        font,
        color: gray
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
function formatDateTime(d: Date, language: Language) {
  try {
    const locale =
      language === 'ru'
        ? 'ru-RU'
        : language === 'kz'
          ? 'kk-KZ'
        : language === 'hr'
            ? 'hr-HR'
            : language === 'sk'
              ? 'sk-SK'
              : 'en-GB';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d);
  } catch {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}, ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  }
}
