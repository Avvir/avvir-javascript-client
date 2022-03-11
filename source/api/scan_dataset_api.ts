import ApiScanDataset from "../models/api/api_scan_dataset";
import {User} from "../utilities/get_authorization_headers";
import {AssociationIds, DateLike} from "type_aliases";
import {ApiPhotoSession, ScanLabelValues} from "../models";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ProgressReportForScanDataset from "../models/domain/progress/progress_report_for_scan_dataset";
import DetailedElement from "../models/domain/detailed_element";
import View, {ViewParameter} from "../models/domain/view";
import {DateConverter} from "../converters";
import {ApiCommentThread} from "../models/api/api_comment_thread";
import {ApiComment} from "../models/api/api_comment";

export default class ScanDatasetApi {
  static listScanDatasetsForFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset[]>;
  }

  static updateScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.patch(url, user, scanDataset) as unknown as Promise<void>;
  }

  static createScanDataset({ projectId, floorId, scanDate }: AssociationIds & {scanDate?: DateLike}, user: User): Promise<ApiScanDataset>{
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    if (scanDate) {
      url += `?scanDate=${DateConverter.dateToISO(scanDate)}`
    }
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
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views`;
    return Http.post(url, user, view) as Promise<ViewParameter>;
  }

  static getView({ projectId, floorId, scanDatasetId }: AssociationIds, viewId: number, user: User): Promise<ViewParameter> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views/${viewId}`;
    return Http.get(url, user) as Promise<ViewParameter>;
  }

  static getCommentThreadsForView({ projectId, floorId, scanDatasetId }: AssociationIds, viewId: number, user: User): Promise<ApiCommentThread[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/comments/threads-for-view/${viewId}`;
    return Http.get(url, user) as unknown as Promise<ApiCommentThread[]>;
  }

  static createCommentThread({ projectId, floorId, scanDatasetId }: AssociationIds, viewId: number, body: ApiCommentThread, user: User): Promise<ApiCommentThread> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/comments/threads-for-view/${viewId}`;
    return Http.post(url, user, body) as unknown as Promise<ApiCommentThread>;
  }

  static createCommentForThread({ projectId, floorId, scanDatasetId }: AssociationIds, threadId: number, body: ApiComment, user: User): Promise<ApiComment> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/comments/threads/${threadId}`;
    return Http.post(url, user, body) as unknown as Promise<ApiComment>;
  }

  static updateComment({ projectId, floorId, scanDatasetId }: AssociationIds, commentId: number, body: ApiComment, user: User): Promise<ApiComment> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/comments/${commentId}`;
    return Http.put(url, user, body) as unknown as Promise<ApiComment>;
  }

  static getOrCreatePhotoSession({projectId, floorId, scanDatasetId}: AssociationIds, user: User): Promise<ApiPhotoSession> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/get-or-create-photo-session`;
    return Http.post(url, user, null) as unknown as Promise<ApiPhotoSession>;
  }

}

makeErrorsPretty(ScanDatasetApi);
