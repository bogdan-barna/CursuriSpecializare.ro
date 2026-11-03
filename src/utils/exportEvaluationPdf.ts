import type { EvaluationRecord } from '../types';
import { buildEvaluationPdfHtml } from './evaluationPdfHtml';

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 40);
}

export function evaluationPdfFilename(record: EvaluationRecord): string {
  const date = record.evaluatedAt.slice(0, 10);
  return `evaluare-${slugify(record.studentName)}-${date}.pdf`;
}

/**
 * Renders a branded evaluation sheet and downloads it as PDF (A4).
 */
export async function downloadEvaluationPdf(record: EvaluationRecord): Promise<void> {
  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.position = 'fixed';
  container.style.left = '-10000px';
  container.style.top = '0';
  container.style.width = '794px';
  container.innerHTML = buildEvaluationPdfHtml(record);
  document.body.appendChild(container);

  const page = container.querySelector('.page') as HTMLElement | null;
  if (!page) {
    document.body.removeChild(container);
    throw new Error('PDF layout failed');
  }

  try {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    await pdf.html(page, {
      margin: [0, 0, 0, 0],
      autoPaging: 'text',
      html2canvas: { scale: 0.264583, useCORS: true, logging: false },
      width: 210,
      windowWidth: 794,
    });
    pdf.save(evaluationPdfFilename(record));
  } finally {
    document.body.removeChild(container);
  }
}
