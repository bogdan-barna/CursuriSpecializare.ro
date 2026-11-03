import type { EvaluationRecord, EvaluationOutcome } from '../types';

const OUTCOME_LABELS: Record<EvaluationOutcome, string> = {
  promovat: 'Promovat',
  respins: 'Respins',
  in_asteptare: 'În așteptare',
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('ro-RO', { dateStyle: 'long' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Branded A4 HTML for CursuriSpecializare evaluation PDF export. */
export function buildEvaluationPdfHtml(record: EvaluationRecord): string {
  const criteriaRows = record.criteria
    .map(
      (c) => `
      <tr>
        <td>${escapeHtml(c.label)}</td>
        <td class="num">${c.score} / ${c.maxScore}</td>
        <td class="num">${Math.round((c.score / c.maxScore) * 100)}%</td>
      </tr>`
    )
    .join('');

  const outcome = OUTCOME_LABELS[record.outcome];
  const generatedAt = new Intl.DateTimeFormat('ro-RO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="utf-8" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      color: #0B1C30;
      background: #F8F9FF;
      font-size: 11pt;
      line-height: 1.45;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 0 0 1px #E2E8F0;
    }
    .header {
      background: linear-gradient(135deg, #004CCA 0%, #0062FF 100%);
      color: #fff;
      padding: 22px 28px 20px;
    }
    .brand-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.02em;
    }
    .brand-name {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .brand-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #93C5FD;
      margin-left: 4px;
      vertical-align: middle;
    }
    .badge {
      font-size: 9pt;
      font-weight: 600;
      background: #DCE9FF;
      color: #004CCA;
      padding: 6px 12px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .doc-title {
      margin-top: 18px;
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: -0.03em;
    }
    .doc-sub {
      margin-top: 6px;
      font-size: 10pt;
      opacity: 0.92;
    }
    .content {
      padding: 24px 28px 32px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 24px;
      margin-bottom: 22px;
    }
    .meta-item label {
      display: block;
      font-size: 8.5pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748B;
      margin-bottom: 4px;
    }
    .meta-item span {
      font-weight: 500;
      color: #0B1C30;
    }
    .summary {
      display: flex;
      gap: 16px;
      margin-bottom: 22px;
    }
    .summary-card {
      flex: 1;
      background: #F8F9FF;
      border: 1px solid #DCE9FF;
      border-radius: 8px;
      padding: 14px 16px;
    }
    .summary-card .label {
      font-size: 8.5pt;
      font-weight: 600;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .summary-card .value {
      margin-top: 6px;
      font-size: 20pt;
      font-weight: 700;
      color: #004CCA;
    }
    .summary-card.outcome .value {
      font-size: 14pt;
      color: #0B1C30;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 10pt;
    }
    th {
      text-align: left;
      background: #F8F9FF;
      color: #485E8D;
      font-weight: 600;
      padding: 10px 12px;
      border-bottom: 2px solid #DCE9FF;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #E2E8F0;
    }
    td.num { text-align: right; font-variant-numeric: tabular-nums; }
    th:last-child, td.num { text-align: right; }
    .comments {
      background: #F8F9FF;
      border-left: 4px solid #004CCA;
      border-radius: 0 8px 8px 0;
      padding: 14px 16px;
      margin-bottom: 24px;
    }
    .comments h3 {
      font-size: 9pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748B;
      margin-bottom: 8px;
    }
    .footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
      font-size: 8.5pt;
      color: #64748B;
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    .footer strong { color: #485E8D; }
  </style>
</head>
<body>
  <div class="page">
    <header class="header">
      <div class="brand-row">
        <div class="brand">
          <div class="logo">CS</div>
          <div>
            <div class="brand-name">CursuriSpecializare<span class="brand-dot"></span></div>
          </div>
        </div>
        <div class="badge">Program acreditat UE</div>
      </div>
      <h1 class="doc-title">Fișă de evaluare</h1>
      <p class="doc-sub">Document oficial · cursurispecializare.ro · ${escapeHtml(record.courseTitle)}</p>
    </header>
    <div class="content">
      <div class="meta-grid">
        <div class="meta-item"><label>Cursant</label><span>${escapeHtml(record.studentName)}</span></div>
        <div class="meta-item"><label>Email</label><span>${escapeHtml(record.studentEmail)}</span></div>
        <div class="meta-item"><label>Curs</label><span>${escapeHtml(record.courseTitle)}</span></div>
        <div class="meta-item"><label>Grupă / cohortă</label><span>${escapeHtml(record.cohortLabel)}</span></div>
        <div class="meta-item"><label>Evaluator</label><span>${escapeHtml(record.evaluatorName)}</span></div>
        <div class="meta-item"><label>Data evaluării</label><span>${escapeHtml(formatDate(record.evaluatedAt))}</span></div>
      </div>
      <div class="summary">
        <div class="summary-card">
          <div class="label">Scor total</div>
          <div class="value">${record.overallPercent}%</div>
        </div>
        <div class="summary-card outcome">
          <div class="label">Rezultat</div>
          <div class="value">${escapeHtml(outcome)}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Criteriu</th>
            <th>Punctaj</th>
            <th>Procent</th>
          </tr>
        </thead>
        <tbody>${criteriaRows}</tbody>
      </table>
      <div class="comments">
        <h3>Observații evaluator</h3>
        <p>${escapeHtml(record.comments)}</p>
      </div>
      <footer class="footer">
        <span>Generat ${escapeHtml(generatedAt)} · Design Academic Blue v1.4</span>
        <span><strong>ID:</strong> ${escapeHtml(record.id)}</span>
      </footer>
    </div>
  </div>
</body>
</html>`;
}
