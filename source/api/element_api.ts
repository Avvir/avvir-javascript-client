import { User } from "../utilities/get_authorization_headers";
import { ApiPlannedElement } from "../models/api/api_planned_element";
import Http from "../utilities/http";
import DeviationStatus from "../models/enums/deviation_status";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {
  ApiBcfBuildingElement, ApiBuiltStatus,
  ApiDetailedElement,
  ApiQueryResource,
  ApiRunningProcess, ApiScannedElement,
  ApiUserAction,
  AssociationIds
} from "../models";

export default class ElementApi {
  static getPlannedBuildingElements({ projectId, floorId }: AssociationIds, user: User): Promise<ApiPlannedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

  static updateDeviationStatus({ projectId, floorId, scanDatasetId }: AssociationIds,
                               deviationGlobalId: string,
                               status: DeviationStatus,
                               user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/deviation-status`;
    let deviation = {
      globalId: deviationGlobalId,
      status
    };
    return Http.patch(url, user, deviation) as unknown as Promise<void>;
  }

  /** @deprecated See getElementDetails */
  static getDetailedElement = ElementApi.getElementDetails;

  static getElementDetails({
                             projectId,
                             floorId,
                             scanDatasetId
                           }: AssociationIds, elementGlobalId: string, user: User): Promise<ApiDetailedElement> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/element/${elementGlobalId}`;
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement>;
  }

  /** @deprecated see getManyElementsDetails */
  static getDetailedElements = ElementApi.getManyElementsDetails;

  static getManyElementsDetails({ projectId, floorId, scanDatasetId }: AssociationIds,
                                user: User,
                                viewerIds?: string[]): Promise<ApiDetailedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/building-elements`;
    if (viewerIds) {
      url += `?viewerIds=${viewerIds.join(",")}`;
    }
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

  /** @deprecated See updateManyElements */
  static updateElement({ projectId, floorId, scanDatasetId, globalId }: AssociationIds,
                       element: ApiDetailedElement,
                       user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/elements/${globalId}`;
    return Http.patch(url, user, element) as unknown as Promise<void>;
  }

  static updateManyElements({ projectId, floorId, scanDatasetId }: AssociationIds,
                            elements: ApiDetailedElement[],
                            user: User,
                            progressMode?: boolean): Promise<{ [scanDatasetId: string]: ApiDetailedElement[] }> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements`;
    if (progressMode) {
      url += "?progressMode=true";
    }
    return Http.patch(url, user, elements) as unknown as Promise<{ [scanDatasetId: string]: ApiDetailedElement[] }>;
  }

  static createDetailedElementsQuery({
                                       projectId,
                                       floorId,
                                       scanDatasetId
                                     }: AssociationIds, globalIds: string[], user: User): Promise<ApiQueryResource> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/query`;
    return Http.post(url, user, globalIds) as unknown as Promise<ApiQueryResource>;
  }

  static getDetailedElementsQueryResult({
                                          projectId,
                                          floorId,
                                          scanDatasetId
                                        }: AssociationIds, queryId: number, user: User): Promise<ApiDetailedElement[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements/query/${queryId}`;
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

  static createPlannedBuildingElementsQuery({
                                              projectId,
                                              floorId
                                            }: AssociationIds,
                                            globalIds: string[],
                                            user: User): Promise<ApiQueryResource> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/query`;
    return Http.post(url, user, globalIds) as unknown as Promise<ApiQueryResource>;
  }

  static getPlannedBuildingElementsQueryResult({
                                                 projectId,
                                                 floorId,
                                               }: AssociationIds,
                                               queryId: number,
                                               user: User): Promise<ApiDetailedElement[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/query/${queryId}`;
    return Http.get(url, user) as unknown as Promise<ApiPlannedElement[]>;
  }

  /** @deprecated */
  static createElements({ projectId, floorId }: AssociationIds,
                        elements: ApiDetailedElement[],
                        user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.post(url, user, elements) as unknown as Promise<void>;
  }

  static matchPlannedBuildingElements({ projectId, floorId }: AssociationIds,
                                      matches: { [v1Id: string]: string },
                                      newElements: ApiPlannedElement[],
                                      user: User): Promise<ApiRunningProcess> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/match`;
    return Http.post(url, user, { matches, newElements }) as unknown as Promise<ApiRunningProcess>;
  }

  static updatePlannedBuildingElements({ projectId, floorId }: AssociationIds,
                                       elements: ApiPlannedElement[],
                                       user: User): Promise<ApiRunningProcess> {
    return Http.patch(`${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`,
      user,
      elements
    ) as unknown as Promise<ApiRunningProcess>;
  }

  static updatePlannedBuildingElementsForViewer({ projectId, floorId, scanDatasetId }: AssociationIds,
                                                elements: ApiScannedElement<ApiBuiltStatus>[],
                                                progressMode: boolean,
                                                user: User): Promise<ApiPlannedElement[]> {
    return Http.patch(`${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/${scanDatasetId}/viewer${progressMode ? "?progressMode=true;" : ""}`,
      user,
      elements) as unknown as Promise<ApiPlannedElement[]>;
  }

  static updatePlannedBuildingElementsForViewerUndo({ projectId, floorId }: AssociationIds,
                                                    elements: ApiPlannedElement[],
                                                    user: User): Promise<ApiPlannedElement[]> {
    return Http.patch(`${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/viewer`,
      user,
      elements) as unknown as Promise<ApiPlannedElement[]>;
  }

  static getUserActionsForElement({ projectId, floorId, globalId }: AssociationIds,
                                  user: User): Promise<ApiUserAction[]> {
    let url = `${Http.baseUrl()}/user-actions/projects/${projectId}/floors/${floorId}/element-history/${globalId}`;
    return Http.get(url, user) as unknown as Promise<ApiUserAction[]>;
  }

  static exportBcfBuildingElements({ projectId, floorId, scanDatasetId }: AssociationIds,
                                   user: User): Promise<ApiBcfBuildingElement[]>
  static exportBcfBuildingElements({ projectId, floorId, scanDatasetId }: AssociationIds,
                                   deviationThreshold: number | User,
                                   user: User): Promise<ApiBcfBuildingElement[]>
  static exportBcfBuildingElements({ projectId, floorId, scanDatasetId }: AssociationIds,
                                   deviationThreshold: number | User,
                                   user?: User): Promise<ApiBcfBuildingElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/bcf-building-elements`;
    if (user == null) {
      user = deviationThreshold as User;
    } else {
      url += `?deviationThreshold=${deviationThreshold}`;
    }

    return Http.get(url, user) as unknown as Promise<ApiBcfBuildingElement[]>;
  }

}

makeErrorsPretty(ElementApi);
