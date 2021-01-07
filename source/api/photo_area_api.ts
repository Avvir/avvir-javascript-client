import {AssociationIds} from "type_aliases";
import {User} from "../utilities/get_authorization_headers";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import Http from "../utilities/http";

export default class PhotoAreaApi {
  static listPhotoAreasForProject({ projectId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/photo-areas`;
    return Http.get(url, user);
  }

  static listPhotoLocations({ projectId, photoAreaId, photoSessionId }: AssociationIds, user: User) {
    let url = `${Http.baseUrl}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
    if (photoSessionId) {
      url += `?photoSessionId=${photoSessionId}`;
    }
    return Http.get(url, user);
  }

  static listPhotoSessionsForPhotoArea({ projectId, photoAreaId }: AssociationIds, user) {
    let url = `${Http.baseUrl}/projects/${projectId}/photo-areas/${photoAreaId}/sessions`;
    return Http.get(url, user);
  }
}
makeErrorsPretty(PhotoAreaApi);