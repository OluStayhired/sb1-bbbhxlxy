// src/utils/reportGenerator.ts
import { DementiaAssessmentModal } from '../components/DementiaAssessmentModal';

export function generateReportHTML(
  result: DementiaAssessmentModal,
  score: number,
  totalQuestions: number,
  patientName: string,
  relationshipToPatient: string,
  currentDate: string
): string {
  const colorMap: Record<string, { bg: string; border: string; text: string; primary: string }> = {
    low: {
      bg: '#ecfdf5',
      border: '#059669',
      text: '#065f46',
      primary: '#10b981'
    },
    mild: {
      bg: '#fef3c7',
      border: '#f59e0b',
      text: '#92400e',
      primary: '#f59e0b'
    },
    moderate: {
      bg: '#fed7aa',
      border: '#ea580c',
      text: '#7c2d12',
      primary: '#ea580c'
    },
    high: {
      bg: '#fee2e2',
      border: '#dc2626',
      text: '#991b1b',
      primary: '#ef4444'
    }
  };

  const colors = colorMap[result.level] || colorMap.low;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dementia Assessment Report - ${patientName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f9fafb;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      padding: 24px;
    }
    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header-icon {
      width: 48px;
      height: 48px;
      {/*background: #fee2e2;*/}
      background: #f0fDf4;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    .header-title {
      font-size: 24px;
      font-weight: 700;
      color: #111827;
    }
    .header-date {
      font-size: 14px;
      color: #6b7280;
      margin-top: 4px;
    }
    .content {
      padding: 24px;
    }
    .section {
      margin-bottom: 24px;
    }
    .info-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
    }
    .info-title {
      font-weight: 600;
      color: #111827;
      margin-bottom: 16px;
      font-size: 16px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .info-item label {
      display: block;
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .info-item p {
      font-weight: 600;
      color: #111827;
      font-size: 14px;
    }
    .result-hero {
      background: ${colors.bg};
      border: 2px solid ${colors.border};
      border-radius: 12px;
      padding: 24px;
    }
    .result-content {
      display: flex;
      gap: 16px;
      align-items: start;
    }
    .result-icon {
      width: 64px;
      height: 64px;
      background: ${colors.bg};
      border: 2px solid ${colors.border};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      flex-shrink: 0;
    }
    .result-details {
      flex: 1;
    }
    .result-label {
      font-size: 12px;
      font-weight: 600;
      color: ${colors.text};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }
    .result-severity {
      font-size: 28px;
      font-weight: 700;
      color: ${colors.text};
      margin-bottom: 12px;
    }
    .result-urgency {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: white;
      border: 2px solid ${colors.border};
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      color: ${colors.text};
      margin-bottom: 16px;
    }
    .result-message {
      color: ${colors.text};
      line-height: 1.6;
    }
    .score-card {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
    }
    .score-title {
      font-weight: 700;
      color: #111827;
      margin-bottom: 16px;
      font-size: 16px;
    }
    .score-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .score-number {
      font-size: 36px;
      font-weight: 700;
      color: #111827;
    }
    .score-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .risk-badge {
      display: inline-block;
      padding: 8px 16px;
      background: ${colors.bg};
      color: ${colors.text};
      border: 1px solid ${colors.border};
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }
    .score-note {
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
      line-height: 1.6;
    }
    .recommendation-card {
      background: white;
      border: 2px solid ${colors.border};
      border-radius: 8px;
      padding: 20px;
    }
    .recommendation-title {
      font-weight: 700;
      color: ${colors.text};
      margin-bottom: 16px;
      font-size: 16px;
    }
    .recommendation-text {
      color: ${colors.text};
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .next-steps {
      background: ${colors.bg};
      border: 1px solid ${colors.border};
      border-radius: 8px;
      padding: 16px;
    }
    .next-steps-title {
      font-weight: 600;
      color: ${colors.text};
      margin-bottom: 12px;
      font-size: 14px;
    }
    .next-steps ul {
      list-style: none;
    }
    .next-steps li {
      color: ${colors.text};
      font-size: 14px;
      padding-left: 20px;
      position: relative;
      margin-bottom: 8px;
    }
    .next-steps li:before {
      content: "›";
      position: absolute;
      left: 0;
      font-weight: 700;
      color: ${colors.primary};
      font-size: 18px;
    }
    .disclaimer {
      background: #fffbeb;
      border: 2px solid #f59e0b;
      border-radius: 8px;
      padding: 20px;
    }
    .disclaimer-title {
      font-weight: 700;
      color: #92400e;
      margin-bottom: 8px;
      font-size: 16px;
    }
    .disclaimer-text {
      font-size: 14px;
      color: #92400e;
      line-height: 1.6;
    }
    .cta-card {
      background: linear-gradient(to right, #fee2e2, #fce7f3);
      border: 1px solid #fca5a5;
      border-radius: 8px;
      padding: 24px;
      text-align: center;
    }
    .cta-title {
      font-weight: 700;
      color: #111827;
      margin-bottom: 12px;
      font-size: 18px;
    }
    .cta-text {
      font-size: 14px;
      color: #374151;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 24px;
      background: #ef4444;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      transition: background 0.2s;
    }
    .cta-button:hover {
      background: #dc2626;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
      }
      .cta-card {
        display: none;
      }
    }
    @media (max-width: 640px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
      .result-content {
        flex-direction: column;
      }
      .score-display {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-content">
        <div class="header-icon">✅</div>
        <div>
          <h1 class="header-title">Assessment Report</h1>
          <p class="header-date">📅 ${currentDate}</p>
        </div>
      </div>
    </div>

    <div class="content">
      ${patientName || relationshipToPatient ? `
      <div class="section">
        <div class="info-card">
          <h3 class="info-title">📄 Assessment Information</h3>
          <div class="info-grid">
            ${patientName ? `
            <div class="info-item">
              <label>Patient Name:</label>
              <p>${patientName}</p>
            </div>
            ` : ''}
            ${relationshipToPatient ? `
            <div class="info-item">
              <label>Completed By:</label>
              <p>${relationshipToPatient.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            </div>
            ` : ''}
            <div class="info-item">
              <label>Assessment Date:</label>
              <p>${currentDate}</p>
            </div>
            <div class="info-item">
              <label>Questions Completed:</label>
              <p>${totalQuestions} of ${totalQuestions}</p>
            </div>
          </div>
        </div>
      </div>
      ` : ''}

      <div class="section">
        <div class="result-hero">
          <div class="result-content">
            <div class="result-icon">⚠️</div>
            <div class="result-details">
              <div class="result-label">Assessment Result</div>
              <h2 class="result-severity">${result.severity}</h2>
              <div class="result-urgency">
                ⚠️ ${result.urgency}
              </div>
              <p class="result-message">${result.message}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="score-card">
          <h3 class="score-title">ℹ️ Assessment Score</h3>
          <div class="score-display">
            <div>
              <p class="score-label">Total Concern Score</p>
              <p class="score-number">${score} points</p>
            </div>
            <div style="text-align: right;">
              <p class="score-label">Risk Level</p>
              <span class="risk-badge">${result.severity}</span>
            </div>
          </div>
          <div class="score-note">
            <strong>About this score:</strong> This assessment combines elements from the AD8 
            (Eight-item Informant Interview) and GPCOG (General Practitioner Assessment of Cognition) 
            screening tools. Higher scores indicate more concerning cognitive changes that warrant 
            professional evaluation.
          </div>
        </div>
      </div>

      <div class="section">
        <div class="recommendation-card">
          <h3 class="recommendation-title">📞 Professional Recommendation</h3>
          <p class="recommendation-text">${result.recommendation}</p>
          <div class="next-steps">
            <h4 class="next-steps-title">Recommended Next Steps:</h4>
            <ul>
              ${result.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="disclaimer">
          <h4 class="disclaimer-title">⚠️ Important Disclaimer</h4>
          <p class="disclaimer-text">
            This screening tool is designed to help identify cognitive changes that may warrant professional 
            evaluation. <strong>It is not a diagnostic tool and cannot diagnose dementia.</strong> Only a 
            qualified healthcare professional can provide a proper diagnosis after comprehensive evaluation. 
            If you have concerns about cognitive changes, please consult with a physician, neurologist, 
            geriatrician, or memory specialist.
          </p>
        </div>
      </div>

      <div class="section">
        <div class="cta-card">
          <h4 class="cta-title">❤️ Need Help Navigating Care Options?</h4>
          <p class="cta-text">
            Our care specialists can help you understand these results and connect you with appropriate 
            resources, from finding memory specialists to exploring care options for your loved one.
          </p>
          <a href="https://meetings.hubspot.com/olu-adedeji" class="cta-button" target="_blank">
            📅 Schedule Consultation
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}
