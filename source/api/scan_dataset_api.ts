import ApiScanDataset from "../models/api/api_scan_dataset";
import {User} from "../utilities/get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import {AssociationIds} from "type_aliases";
import {ScanLabelValues} from "../models/enums/scan_label";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ProgressReportForScanDataset from "../models/domain/progress/progress_report_for_scan_dataset";
import DetailedElement from "../models/domain/detailed_element";

class ScanDatasetApi {
  static listScanDatasetsForFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset[]> {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.get(url, user);
  }

  static updateScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<void> {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.patch(url, user, scanDataset);
  }

  static createScanDataset({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset>{
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.post(url, user, null);
  }

  static deleteScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User):Promise<void> {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.delete(url, user);
  };

  static saveScanAnalysis({ projectId, floorId, scanDatasetId }: AssociationIds, analysis: { globalId: string, scanLabel: ScanLabelValues }, user: User): Promise<void>{
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/analysis?enforceBuiltPersistence=false`;
    return Http.post(url, user, analysis);
  }

  static getScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<ApiScanDataset> {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.get(url, user);
  }

  static getViewerDetailedElementsForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<DetailedElement[]> {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/viewer`;
    return Http.get(url, user);
  }

  static getProgressReportForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<ProgressReportForScanDataset> {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/progress`;
    return Http.get(url, user) as unknown as Promise<ProgressReportForScanDataset>;
  }
}
makeErrorsPretty(ScanDatasetApi)
export default ScanDatasetApi;