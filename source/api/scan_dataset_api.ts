import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import type { ApiBuiltStatus, ApiDetailedElement, ApiPhotoSession, ApiScanDatasetQaState, ApiScannedElementType, ApiView, ApiViewArgument, User } from "../models";
import { ApiScanDataset } from "../models";
import type { AssociationIds, DateLike } from "type_aliases";
import { DateConverter } from "../converters";

function isApiScanDataset(obj: any): obj is Partial<ApiScanDataset> {
  return obj.scanDate != null || obj.name != null
}

export default class ScanDatasetApi {
  static listScanDatasetsForFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiScanDataset[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset[]>;
  }

  static createScanDataset({ projectId, floorId }: AssociationIds,
                           apiScanDataset: Partial<ApiScanDataset>,
                           user: User): Promise<ApiScanDataset>
  static createScanDataset({ projectId, floorId }: AssociationIds,
                           scanDate: DateLike,
                           user: User): Promise<ApiScanDataset>
  static createScanDataset({ projectId, floorId }: AssociationIds,
                           scan: Partial<ApiScanDataset> | DateLike,
                           user: User): Promise<ApiScanDataset> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets`;
    if (isApiScanDataset(scan)) {
      return Http.post(url, user, scan) as unknown as Promise<ApiScanDataset>;
    } else {
      return Http.post(url + `?scanDate=${DateConverter.dateLikeToDate(scan).valueOf()}`, user) as unknown as Promise<ApiScanDataset>;
    }
  }


  static deleteScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  };

  static updateScanDataset({
                             projectId,
                             floorId,
                             scanDatasetId
                           }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<ApiScanDataset> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.patch(url, user, scanDataset) as unknown as Promise<ApiScanDataset>;
  }

  /**
   * @deprecated use updateScanDataset instead, this is an alias
   */
  static mergeScanDataset({
                            projectId,
                            floorId,
                            scanDatasetId
                          }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<ApiScanDataset> {
    return this.updateScanDataset({ projectId, floorId, scanDatasetId }, scanDataset, user);
  }

  /**
   * @deprecated use updateScanDataset instead, it does the exact same thing on the back end
   */
  static replaceScanDataset({
                              projectId,
                              floorId,
                              scanDatasetId
                            }: AssociationIds, scanDataset: ApiScanDataset, user: User): Promise<ApiScanDataset> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.put(url, user, scanDataset) as unknown as Promise<ApiScanDataset>;
  }

  static updateQaState({
                         projectId,
                         floorId,
                         scanDatasetId
                       }: AssociationIds, qaState: ApiScanDatasetQaState, user: User): Promise<ApiScanDataset> {

    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/qa-state`;
    return Http.post(url, user, qaState) as unknown as Promise<ApiScanDataset>;
  }

  static saveScanAnalysis({
                            projectId,
                            floorId,
                            scanDatasetId
                          }: AssociationIds,
                          analysis: ApiScannedElementType<ApiBuiltStatus>[],
                          user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/analysis?enforceBuiltPersistence=false`;
    return Http.post(url, user, analysis) as unknown as Promise<void>;
  }

  static getScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds, user: User): Promise<ApiScanDataset> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset>;
  }

  /** @deprecated Use planned building element end points instead */
  static getViewerDetailedElementsForScanDataset({
                                                   projectId,
                                                   floorId,
                                                   scanDatasetId
                                                 }: AssociationIds, user: User): Promise<ApiDetailedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/viewer`;
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

  /** @deprecated Use the scan's point cloud instead */
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
                                }: AssociationIds, user: User): Promise<ApiViewArgument[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/views`;
    return Http.get(url, user) as unknown as Promise<ApiViewArgument[]>;
  }

  static getNewElementsForScanDataset({ projectId, floorId, scanDatasetId }: AssociationIds,
                                      user: User): Promise<string[]> {
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
                            }: AssociationIds,
                            { id, photoAreaId, sessionDate }: ApiPhotoSession,
                            user: User): Promise<ApiPhotoSession> {

    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/photo-session/${id}`;
    return Http.post(url, user, { sessionDate }) as unknown as Promise<ApiPhotoSession>;
  }

  static listScanDatasetsForProject({ projectId }: AssociationIds, user: User): Promise<ApiScanDataset[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/scan-datasets`;
    return Http.get(url, user) as unknown as Promise<ApiScanDataset[]>;
  }
}

makeErrorsPretty(ScanDatasetApi);
