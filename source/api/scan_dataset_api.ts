import ApiScanDataset from "../models/api/api_scan_dataset";
import {User} from "../utilities/get_authorization_headers";
import {AssociationIds} from "type_aliases";
import {ScanLabelValues} from "../models/enums/scan_label";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ProgressReportForScanDataset from "../models/domain/progress/progress_report_for_scan_dataset";
import DetailedElement from "../models/domain/detailed_element";
import View, {ViewParameter} from "../models/domain/view";

class ScanDatasetApi {
  static listScanDatasetsForFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset[]>;
  }

  static updateScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.patch(url, user, scanDataset) as unknown as Promise<void>;
  }

  static createScanDataset({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset>{
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.post(url, user, null) as unknown as Promise<ApiScanDataset>;
  }

  static deleteScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User):Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  };

  static saveScanAnalysis({ projectId, floorId, scanDatasetId }: AssociationIds, analysis: { globalId: string, scanLabel: ScanLabelValues }, user: User): Promise<void>{
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/analysis?enforceBuiltPersistence=false`;
    return Http.post(url, user, analysis) as unknown as Promise<void>;
  }

  static getScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<ApiScanDataset> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset>;
  }

  static getViewerDetailedElementsForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<DetailedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/viewer`;
    return Http.get(url, user) as unknown as Promise<DetailedElement[]>;
  }

  static getProgressReportForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<ProgressReportForScanDataset> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/progress`;
    return Http.get(url, user) as unknown as Promise<ProgressReportForScanDataset>;
  }

  static getScanRepresentation({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<{url: string}> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/files/scan-representation`;
    return Http.get(url, user) as Promise<{ url: string }>;
  }

  static createView({ projectId, floorId, scanDatasetId }: AssociationIds, view: View, user: User): Promise<ViewParameter> {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views`;
    return Http.post(url, user, view) as Promise<ViewParameter>;
  }

  static getView({ projectId, floorId, scanDatasetId }: AssociationIds, viewId: number, user: User): Promise<ViewParameter> {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views/${viewId}`;
    return Http.get(url, user) as Promise<ViewParameter>;
  }

}

makeErrorsPretty(ScanDatasetApi);

export default ScanDatasetApi;