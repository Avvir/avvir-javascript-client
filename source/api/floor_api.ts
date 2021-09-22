// @ts-nocheck
import ApiFloor from "../models/api/api_floor";
import { User } from "../utilities/get_authorization_headers";
import { AssociationIds } from "type_aliases";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

export default class FloorApi {
  static listFloorsForProject(projectId: string, user: User) : Promise<ApiFloor[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors`;
    return Http.get(url, user);
  }

  static createFloor(projectId: string, floorNumber: string, user: User): Promise<ApiFloor[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors`;
    return Http.post(url, user, {text: floorNumber});
  }

  static getFloor({ projectId, floorId }: AssociationIds, user: User) : Promise<ApiFloor[]> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}`;
    return Http.get(url, user);
  }

  static updateFloor({ projectId, floorId }: AssociationIds, floor: ApiFloor, user: User): Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}`;
    return Http.patch(url, user, floor);
  }

  static updateFloorOrder({ projectId, floorId }: AssociationIds, ordinal: number, user: User):Promise<void> {
    const url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/reorder/${ordinal}`;
    return Http.patch(url, user, null);
  }
}

makeErrorsPretty(FloorApi);