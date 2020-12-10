import { AssociationIds } from "type_aliases";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import { httpGetHeaders } from "./request_headers";
import checkFetchStatus from "./check_fetch_status";
import ApiPhotoArea from "./models/api/api_photo_area";
import ApiPhotoLocation from "./models/api/api_photo_location";
import ApiPhotoSession from "./models/api/api_photo_session";
import Config from "./config";

export default class PhotoAreaApi {
  static listPhotoAreasForProject({ projectId }: AssociationIds, user: User) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/photo-areas`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPhotoArea[]>)
      .catch(Config.sharedErrorHandler);
  }

  static listPhotoLocations({ projectId, photoAreaId, photoSessionId }: AssociationIds, user: User) {
    let url = `${WebGatewayApi.baseUrl}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
    if (photoSessionId) {
      url += `?photoSessionId=${photoSessionId}`;
    }
    return (fetch(url, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPhotoLocation[]>)
      .catch(Config.sharedErrorHandler);
  }

  static listPhotoSessionsForPhotoArea({ projectId, photoAreaId }: AssociationIds, user) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/photo-areas/${photoAreaId}/sessions`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPhotoSession[]>)
      .catch(Config.sharedErrorHandler);
  }
}
