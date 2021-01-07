import ApiScanDataset from "./models/api/api_scan_dataset";
import {User} from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import {AssociationIds} from "type_aliases";
import {ScanLabelValues} from "./models/enums/scan_label";
import Http from "./http";
import makeErrorsPretty from "./make_errors_pretty";

class ScanDatasetApi {
  static listScanDatasetsForFloor({ projectId, floorId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.get(url, user);
  }

  static updateScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, scanDataset: ApiScanDataset, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.patch(url, user, scanDataset);
  }

  static createScanDataset({ projectId, floorId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.post(url, user, null);
  }

  static deleteScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.delete(url, user);
  };

  static saveScanAnalysis({ projectId, floorId, scanDatasetId }: AssociationIds, analysis: { globalId: string, scanLabel: ScanLabelValues }, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/analysis?enforceBuiltPersistence=false`;
    return Http.post(url, user, analysis);
  }

  static getScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.get(url, user);
  }

  static getViewerDetailedElementsForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/viewer`;
    return Http.get(url, user);
  }

  static getProgressReportForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/progress`;
    return Http.get(url, user);
  }
}
makeErrorsPretty(ScanDatasetApi)
export default ScanDatasetApi;