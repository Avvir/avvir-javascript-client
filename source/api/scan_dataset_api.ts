import {User} from "../utilities/get_authorization_headers";
import {AssociationIds, DateLike} from "../models";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import ApiProgressScanDataset from "../models/api/api_progress_scan_dataset";
import ApiView, {ViewParameter} from "../models/api/api_view";
import {DateConverter} from "../converters";
import {ApiScanDataset, ApiDetailedElement, ApiPhotoSession, ApiBuiltStatus, ApiScannedElementType} from "../models";

export default class ScanDatasetApi {
  static listScanDatasetsForFloor({projectId, floorId}: AssociationIds, user: User): Promise<ApiScanDataset[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset[]>;
  }

  static mergeScanDataset({
                             projectId,
                             floorId,
                             scanDatasetId
                           }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.patch(url, user, scanDataset) as unknown as Promise<void>;
  }
  //@Deprecated
  static updateScanDataset({
                            projectId,
                            floorId,
                            scanDatasetId
                          }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<void> {
    return this.mergeScanDataset({projectId, floorId, scanDatasetId}, scanDataset, user);
  }

  static replaceScanDataset({
      projectId,
      floorId,
      scanDatasetId
                            }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<void> {
      const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
      return Http.put(url, user, scanDataset) as unknown as Promise<void>;
  }

  static createScanDataset({
                             projectId,
                             floorId,
                             scanDate
                           }: AssociationIds & { scanDate?: DateLike }, user: User): Promise<ApiScanDataset> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    if (scanDate) {
      url += `?scanDate=${DateConverter.dateToISO(scanDate)}`
    }
    return Http.post(url, user, null) as unknown as Promise<ApiScanDataset>;
  }

  static deleteScanDataset({projectId, floorId, scanDatasetId}: AssociationIds, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  };

  static saveScanAnalysis({
                            projectId,
                            floorId,
                            scanDatasetId
                          }: AssociationIds, analysis: ApiScannedElementType<ApiBuiltStatus>[], user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/analysis?enforceBuiltPersistence=false`;
    return Http.post(url, user, analysis) as unknown as Promise<void>;
  }

  static getScanDataset({projectId, floorId, scanDatasetId}: AssociationIds, user: User): Promise<ApiScanDataset> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset>;
  }

  static getViewerDetailedElementsForScanDataset({
                                                   projectId,
                                                   floorId,
                                                   scanDatasetId
                                                 }: AssociationIds, user: User): Promise<ApiDetailedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/viewer`;
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

  static getScanRepresentation({
                                 projectId,
                                 floorId,
                                 scanDatasetId
                               }: AssociationIds, user: User): Promise<{ url: string }> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/files/scan-representation`;
    return Http.get(url, user) as Promise<{ url: string }>;
  }

  static createView({
                      projectId,
                      floorId,
                      scanDatasetId
                    }: AssociationIds, view: ApiView, user: User): Promise<ApiView> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views`;
    return Http.post(url, user, view) as unknown as Promise<ApiView>;
  }

  static getView({
                   projectId,
                   floorId,
                   scanDatasetId
                 }: AssociationIds, viewId: number, user: User): Promise<ApiView> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views/${viewId}`;
    return Http.get(url, user) as unknown as Promise<ApiView>;
  }

  static getViewsForScanDataset({
                                  projectId,
                                  floorId,
                                  scanDatasetId
                                }: AssociationIds, user: User): Promise<ViewParameter[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views`;
    return Http.get(url, user) as unknown as Promise<ViewParameter[]>;
  }

  static getNewElementsForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<string[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/new-elements`;
    return Http.get(url, user) as unknown as Promise<string[]>;
  }

  static getOrCreatePhotoSession({
                                   projectId,
                                   floorId,
                                   scanDatasetId
                                 }: AssociationIds, user: User): Promise<ApiPhotoSession> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/get-or-create-photo-session`;
    return Http.post(url, user, null) as unknown as Promise<ApiPhotoSession>;
  }

  static updatePhotoSession({
                              projectId,
                              floorId,
                              scanDatasetId
                            }: AssociationIds, { id, photoAreaId, sessionDate }:ApiPhotoSession, user: User): Promise<ApiPhotoSession> {

    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/photo-session/${id}`;
    return Http.post(url, user, {sessionDate}) as unknown as Promise<ApiPhotoSession>;
  }

  static clearVerified({projectId, floorId, scanDatasetId}: AssociationIds, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/clear-verified`;
    return Http.post(url, user) as unknown as Promise<void>;
  };
}

makeErrorsPretty(ScanDatasetApi);
