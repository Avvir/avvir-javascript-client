import ApiFloor from "../models/api/api_floor";
import checkFetchStatus from "../utilities/check_fetch_status";
import getAuthorizationHeaders, { User } from "../utilities/get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import { AssociationIds } from "type_aliases";
import { httpGetHeaders, httpPostHeaders } from "../utilities/request_headers";
import Config from "../utilities/config";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

export default class FloorApi {
  static listFloorsForProject(projectId: string, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors`;
    return Http.get(url, user);
  }

  static createFloor(projectId: string, floorNumber: string, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors`;
    return Http.post(url, user, {text: floorNumber});
  }

  static getFloor({ projectId, floorId }: AssociationIds, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}`;
    return Http.get(url, user);
  }

  static getViewerFloor({ projectId, floorId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/viewer`;
    return Http.get(url, user);
  }

  static updateFloor({ projectId, floorId }: AssociationIds, floor: ApiFloor, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}`;
    return Http.patch(url, user, floor);
  }

  static updateFloorOrder({ projectId, floorId }: AssociationIds, ordinal: number, user: User) {
    const url = `${Http.baseUrl}/projects/${projectId}/floors/${floorId}/reorder/${ordinal}`;
    return Http.patch(url, user, null);
  }
}

makeErrorsPretty(FloorApi);