import { ApiFailureEvent } from "../../events/notifications/failures/api_failure";
import { AssociationIds, Dispatch } from "type_aliases";
import getAuthorizationHeaders, { User } from "./get_authorization_headers";
import WebGatewayApi from "./web_gateway_api";
import { httpGetHeaders } from "./request_headers";
import checkFetchStatus from "./check_fetch_status";
import ApiPhotoArea from "../../models/api/api_photo_area";
import getErrorCallback from "./get_error_callback";
import ApiPhotoLocation from "../../models/api/api_photo_location";
import ApiPhotoSession from "../../models/api/api_photo_session";

export default class PhotoAreaApi {
  static listPhotoAreasForProject({ projectId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/photo-areas`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPhotoArea[]>)
      .catch(getErrorCallback(dispatch));
  }

  static listPhotoLocations({ projectId, photoAreaId, photoSessionId }: AssociationIds, user: User, dispatch: Dispatch<ApiFailureEvent>) {
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
      .catch(getErrorCallback(dispatch));
  }

  static listPhotoSessionsForPhotoArea({ projectId, photoAreaId }: AssociationIds, user, dispatch: Dispatch<ApiFailureEvent>) {
    return (fetch(`${WebGatewayApi.baseUrl}/projects/${projectId}/photo-areas/${photoAreaId}/sessions`, {
      headers: {
        ...httpGetHeaders,
        ...getAuthorizationHeaders(user)
      }
    }).then(checkFetchStatus) as Promise<ApiPhotoSession[]>)
      .catch(getErrorCallback(dispatch));
  }
}
