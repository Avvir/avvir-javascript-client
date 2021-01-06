import ApiFloor from "./models/api/api_floor";
import checkFetchStatus from "./check_fetch_status";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import { AssociationIds } from "type_aliases";
import { httpGetHeaders, httpPostHeaders } from "./request_headers";
import Config from "./config";

export default class FloorApi {
  static listFloorsForProject(projectId: string, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiFloor[]>;
  }

  static createFloor(projectId: string, floorNumber: string, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors`;
    return (fetch(url, {
      method: "POST",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify({ text: floorNumber })
    }).then(checkFetchStatus) as Promise<ApiFloor>)
      .catch(Config.sharedErrorHandler);
  }

  static getFloor({ projectId, floorId }: AssociationIds, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}`;
    return fetch(url, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      },
    }).then(checkFetchStatus) as Promise<ApiFloor>;
  }

  static getViewerFloor({ projectId, floorId }: AssociationIds, user: User) {
    return fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/viewer`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<any>;
  }

  static updateFloor({ projectId, floorId }: AssociationIds, apiFloor: ApiFloor, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}`;
    const patchHeaders = httpPostHeaders("application/vnd.avvir.gateway.UserFloor+json")
    return (fetch(url, {
      method: "PATCH",
      headers: {
        ...patchHeaders,
        ...getAuthorizationHeaders(user)
      },
      body: JSON.stringify(apiFloor)
    }).then(checkFetchStatus) as Promise<void>)
      .catch(Config.sharedErrorHandler);
  }

  static updateFloorOrder({ projectId, floorId }: AssociationIds, ordinal: number, user: User) {
    const url = `${WebGatewayApi.baseUrl}/projects/${projectId}/floors/${floorId}/reorder/${ordinal}`;
    return (fetch(url, {
      method: "PATCH",
      headers: {
        ...httpPostHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<void>);
  }
}
