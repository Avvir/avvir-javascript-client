import ApiScanDataset from "../models/api/api_scan_dataset";
import { User } from "../utilities/get_authorization_headers";
import { AssociationIds } from "type_aliases";
import { ScanLabelValues } from "../models/enums/scan_label";
import ProgressReportForScanDataset from "../models/domain/progress/progress_report_for_scan_dataset";
import DetailedElement from "../models/domain/detailed_element";
declare class ScanDatasetApi {
    static listScanDatasetsForFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset[]>;
    static updateScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<void>;
    static createScanDataset({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset>;
    static deleteScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<void>;
    static saveScanAnalysis({ projectId, floorId, scanDatasetId }: AssociationIds, analysis: {
        globalId: string;
        scanLabel: ScanLabelValues;
    }, user: User): Promise<void>;
    static getScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<ApiScanDataset>;
    static getViewerDetailedElementsForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<DetailedElement[]>;
    static getProgressReportForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<ProgressReportForScanDataset>;
}
export default ScanDatasetApi;
