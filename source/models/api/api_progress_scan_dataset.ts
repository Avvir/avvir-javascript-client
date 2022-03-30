import ApiProgressCategory from "./api_progress_category";

export class ApiProgressScanDataset {
  id: number;
  firebaseId: string;
  scanNumber: number;
  progressCategories: ApiProgressCategory[];
}

export default ApiProgressScanDataset;