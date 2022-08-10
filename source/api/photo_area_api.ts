import {isArray} from "underscore";
import {ApiPhotoArea, ApiPhotoLocation, ApiPhotoSession, ApiPhotoLocation3d, AssociationIds} from "../models";
import {User} from "../utilities/get_authorization_headers";
import makeErrorsPretty from "../utilities/make_errors_pretty";
import Http from "../utilities/http";

export default class PhotoAreaApi {

  static createPhotoLocations({ projectId, photoAreaId, photoSessionId}: AssociationIds,
                              locations: ApiPhotoLocation[],
                              user: User): Promise<ApiPhotoLocation[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
    if (photoSessionId) {
      url += `?photoSessionId=${photoSessionId}`
    }
    return Http.post(url, user, locations) as unknown as Promise<ApiPhotoLocation[]>;
  }

  static listPhotoAreasForProject({ projectId, integrationProjectId }: AssociationIds, user: User): Promise<ApiPhotoArea[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas`;
    if (integrationProjectId != null) {
      url += `?integrationProjectId=${integrationProjectId}`;
    }
    return Http.get(url, user) as unknown as Promise<ApiPhotoArea[]>;
  }

  static listPhotoLocations({ projectId, photoAreaId, photoSessionId }: AssociationIds, user: User): Promise<ApiPhotoLocation[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
    if (photoSessionId) {
      if (isArray(photoSessionId)) {
        url += `?photoSessionId=${photoSessionId.join(",")}`;
      } else {
        url += `?photoSessionId=${photoSessionId}`;
      }
    }
    return Http.get(url, user) as unknown as Promise<ApiPhotoLocation[]>;
  }

  static listPhotoSessionsForPhotoArea({ projectId, photoAreaId }: AssociationIds, user: User): Promise<ApiPhotoSession[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/sessions`;
    return Http.get(url, user) as unknown as Promise<ApiPhotoSession[]>;
  }

  static updatePhotoLocationPositionAndOrientation({ projectId, floorId, photoLocationId }: AssociationIds,
                                                   coordinates: ApiPhotoLocation3d,
                                                   user: User): Promise<ApiPhotoLocation> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/photo-locations/${photoLocationId}/bim`;
    return Http.patch(url, user, coordinates) as unknown as Promise<ApiPhotoLocation>;
  }

  static updatePhotoLocations({ projectId, photoAreaId }: AssociationIds,
                              locations: ApiPhotoLocation[],
                              user: User): Promise<ApiPhotoLocation[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
    return Http.put(url, user, locations) as unknown as Promise<ApiPhotoLocation[]>;
  }

  static deletePhotoLocations({ projectId, photoAreaId }: AssociationIds,
                              locationIds: number[],
                              user: User): Promise<ApiPhotoLocation[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
    return Http.delete(url, user, locationIds) as unknown as Promise<ApiPhotoLocation[]>;
  }

}

makeErrorsPretty(PhotoAreaApi);
