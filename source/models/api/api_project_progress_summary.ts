export class ApiProjectProgressSummary {
  // null once fetched means the project has no QA/QC-verified data yet (empty state).
  built: number | null;
  latestBuiltAt: number | null;
  latestFixedAt: number | null;
  latestScanDate: number | null;
  latestAnalysisCompletedAt: number | null;
  latestDeviationChangedAt: number | null;
  latestUpdatedAt: number | null;
  // when the QA/QC-approved donut data last changed (feature-flagged donut "last updated").
  approvedUpdatedAt: number | null;
}

export default ApiProjectProgressSummary;
