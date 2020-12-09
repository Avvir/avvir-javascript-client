import ApiScanDataset from "../../models/api/api_scan_dataset";
import checkFetchStatus from "./check_fetch_status";
import DetailedElement from "../../models/domain/detailed_element";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import getErrorCallback from "./get_error_callback";
import ProgressReportForScanDataset from "../../models/domain/progress/progress_report_for_scan_dataset";
import WebGatewayApi from "./web_gateway_api";
import { ApiFailureEvent } from "../../events/notifications/failures/api_failure";
import { AssociationIds, Dispatch } from "type_aliases";
import { httpGetHeaders, httpPostHeaders } from "./request_headers";
import { ScanLabelValues } from "../../models/domain/enums/scan_label";

export default class ScanDatasetApi {
  static listScanDatasetsForFloor({ projectId, floorId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiScanDataset[]>)
      .catch(getErrorCallback(dispatch));
  }

  static updateScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, apiScanDataset: ApiScanDataset, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return (fetch(url, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(apiScanDataset)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(getErrorCallback(dispatch));
  }

  static createScanDataset({ projectId, floorId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<ApiScanDataset>)
      .catch(getErrorCallback(dispatch));
  }

  static deleteScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`, {
      method: "DELETE",
      headers: {
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<void>)
      .catch(getErrorCallback(dispatch, true))
  };

  static saveScanAnalysis({ projectId, floorId, scanDatasetId }: AssociationIds, analysis: { globalId: string, scanLabel: ScanLabelValues }, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/analysis?enforceBuiltPersistence=false`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(analysis)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(getErrorCallback(dispatch));
  }

  static getScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiScanDataset>)
      .catch(getErrorCallback(dispatch));
  }

  static getViewerDetailedElementsForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/viewer`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<DetailedElement[]>)
      .catch(getErrorCallback(dispatch));
  }

  static getProgressReportForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/progress`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ProgressReportForScanDataset>)
      .catch(getErrorCallback(dispatch));
  }
}
