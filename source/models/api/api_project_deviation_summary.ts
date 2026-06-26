export class ApiProjectDeviationSummary {
  inPlace: number;
  deviatedWithinTolerance: number;
  criticallyDeviated: number;
  notBuilt: number;
  latestBuiltAt: number | null;
  latestFixedAt: number | null;
  latestScanDate: number | null;
  latestAnalysisCompletedAt: number | null;
  latestDeviationChangedAt: number | null;
  latestUpdatedAt: number | null;
}

export default ApiProjectDeviationSummary;
