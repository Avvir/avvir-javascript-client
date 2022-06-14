import {AssociationIds} from "type_aliases";
import {User} from "../utilities/get_authorization_headers";
import {ApiPlannedElement} from "../models/api/api_planned_element";
import Http from "../utilities/http";
import DeviationStatus from "../models/enums/deviation_status";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {ApiDetailedElement, ApiQueryResource, ApiRunningProcess, ApiUserAction} from "../models";

export default class ElementApi {
  static getPlannedBuildingElements({projectId, floorId}: AssociationIds, user: User): Promise<ApiPlannedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

  static updateDeviationStatus({projectId, floorId, scanDatasetId}: AssociationIds,
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
  static getDetailedElement = ElementApi.getElementDetails

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

  static getManyElementsDetails({projectId, floorId, scanDatasetId}: AssociationIds,
                                user: User,
                                viewerIds?: string[]): Promise<ApiDetailedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/building-elements`;
    if (viewerIds) {
      url += `?viewerIds=${viewerIds.join(",")}`;
    }
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

  /** @deprecated See updateManyElements */
  static updateElement({projectId, floorId, scanDatasetId, globalId}: AssociationIds,
                       element: ApiDetailedElement,
                       user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/elements/${globalId}`;
    return Http.patch(url, user, element) as unknown as Promise<void>;
  }

  static updateManyElements({projectId, floorId, scanDatasetId}: AssociationIds,
                            elements: ApiDetailedElement[],
                            user: User): Promise<{ [scanDatasetId: string]: ApiDetailedElement[] }> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements`;
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

  /** @deprecated */
  static createElements({projectId, floorId}: AssociationIds,
                        elements: ApiDetailedElement[],
                        user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.post(url, user, elements) as unknown as Promise<void>;
  }

  static matchPlannedBuildingElements({projectId, floorId}: AssociationIds,
                                      matches: { [v1Id: string]: string },
                                      newElements: ApiPlannedElement[],
                                      user: User): Promise<ApiRunningProcess> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/match`;
    return Http.post(url, user, {matches, newElements}) as unknown as Promise<ApiRunningProcess>;
  }

  static updatePlannedBuildingElements({projectId, floorId}: AssociationIds,
                                       elements: ApiPlannedElement[],
                                       user: User): Promise<ApiRunningProcess> {
    return Http.patch(`${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`,
      user,
      elements
    ) as unknown as Promise<ApiRunningProcess>;
  }

  static getUserActionsForElement({projectId, floorId, globalId}: AssociationIds, user: User): Promise<ApiUserAction[]> {
    let url = `${Http.baseUrl()}/user-actions/projects/${projectId}/floors/${floorId}/element-history/${globalId}`;
    return Http.get(url, user) as unknown as Promise<ApiUserAction[]>;
  }

  static exportBcfDeviatedElements({projectId, floorId, scanDatasetId}: AssociationIds, user: User): Promise<ApiDetailedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/bcf-deviations`;
    return Http.get(url, user) as unknown as Promise<ApiDetailedElement[]>;
  }

}

makeErrorsPretty(ElementApi);
