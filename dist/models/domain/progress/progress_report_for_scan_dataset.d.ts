import ProgressCategory from "./progress_category";
export default class ProgressReportForScanDataset {
    id: number;
    firebaseId: string;
    scanNumber: number;
    progressCategories: ProgressCategory[];
}
