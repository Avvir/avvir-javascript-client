import ProgressCategory from "./progress_category";

export class ProgressReportForScanDataset {
  id: number;
  firebaseId: string;
  scanNumber: number;
  progressCategories: ProgressCategory[];
}

export default ProgressReportForScanDataset;