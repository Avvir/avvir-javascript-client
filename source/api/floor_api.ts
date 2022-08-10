// @ts-nocheck
import ApiFloor from "../models/api/api_floor";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import { AssociationIds } from "../models";
import { User } from "../utilities/get_authorization_headers";
import {ApiPlannedElement} from "../models";

export default class FloorApi {
  static listFloorsForProject(projectId: string, user: User): Promise<ApiFloor[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors`;
    return Http.get(url, user);
  }

  static createFloor(projectId: string, floorNumber: string, user: User): Promise<ApiFloor> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors`;
    return Http.post(url, user, { text: floorNumber });
  }

  static getFloor({ projectId, floorId }: AssociationIds, user: User): Promise<ApiFloor> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}`;
    return Http.get(url, user);
  }

  static updateFloor({ projectId, floorId }: AssociationIds, floor: ApiFloor, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}`;
    return Http.patch(url, user, floor);
  }

  static updateFloorOrder({ projectId, floorId }: AssociationIds, ordinal: number, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/reorder/${ordinal}`;
    return Http.patch(url, user, null);
  }

  static reorderFloors({ projectId }: AssociationIds, floorIds: string[], user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/reorder-floors`;
    return Http.post(url, user, floorIds);
  }

  static deleteFloor({ projectId, floorId }, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}`;
    return Http.delete(url, user);
  }

  static updatePlannedBuildingElements({ projectId, floorId }: AssociationIds, elements: ApiPlannedElement[], user: User, validate?: boolean) {
    return Http.patch(`${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/planned-building-elements?validate=${!!validate}`, user, elements)
  }

}

makeErrorsPretty(FloorApi);
