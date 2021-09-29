// @ts-nocheck
import { AssociationIds } from "type_aliases";
import { User } from "../utilities/get_authorization_headers";
import ApiPlannedElement from "../models/api/api_planned_element";
import Http from "../utilities/http";
import DeviationStatus from "../models/enums/deviation_status";
import DetailedElement from "../models/domain/detailed_element";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import {RunningProcess} from "../models/domain/running_process";

export default class ElementApi {
  static getPlannedBuildingElements({ projectId, floorId }: AssociationIds, user: User): Promise<ApiPlannedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.get(url, user);
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
    return Http.patch(url, user, deviation);
  }

  static getDetailedElement({ projectId, floorId, scanDatasetId }: AssociationIds,
                            elementGlobalId: string,
                            user: User): Promise<DetailedElement> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/element/${elementGlobalId}`;
    return Http.get(url, user);
  }

  static getDetailedElements({ projectId, floorId, scanDatasetId }: AssociationIds,
                             user: User,
                             viewerIds?: string[]): Promise<DetailedElement[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/building-elements`;
    if (viewerIds) {
      url += `?viewerIds=${viewerIds.join(",")}`;
    }
    return Http.get(url, user);
  }

  static updateElement({ projectId, floorId, scanDatasetId, globalId }: AssociationIds,
                       element: DetailedElement,
                       user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/elements/${globalId}`;
    return Http.patch(url, user, element);
  }

  static updateManyElements({ projectId, floorId, scanDatasetId }: AssociationIds,
                            elements: DetailedElement<any>[],
                            user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/scan-datasets/${scanDatasetId}/detailed-elements`;
    return Http.patch(url, user, elements);
  }

  static createElements({ projectId, floorId }: AssociationIds,
                        elements: DetailedElement<any>[],
                        user: User): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`;
    return Http.post(url, user, elements);
  }

  static matchPlannedBuildingElements({ projectId, floorId }: AssociationIds,
                                      matches: { [v1Id: string]: string },
                                      newElements: ApiPlannedElement[],
                                      user: User): Promise<RunningProcess> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements/match`;
    return Http.post(url, user, { matches, newElements });
  }


  static updatePlannedBuildingElements({ projectId, floorId }: AssociationIds, elements: ApiPlannedElement[], user: User) {
    return Http.patch(`${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements`,
      user,
      elements
    )
  }
}

makeErrorsPretty(ElementApi);
