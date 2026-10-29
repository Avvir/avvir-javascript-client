import { isArray } from "underscore";

import checkFetchStatus from "../utilities/check_fetch_status";
import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

import type { ApiPhotoArea, ApiPhotoLocation, ApiPhotoLocation3d, ApiPhotoSession, User } from "../models";
import type { AssociationIds } from "type_aliases";

export type PhotoLocationPage = { items: ApiPhotoLocation[], nextCursor: number | null };

const PHOTO_LOCATION_PAGE_SIZE = 1000;

const photoLocationsUrl = ({ projectId, photoAreaId, photoSessionId }: AssociationIds): string => {
  let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
  if (photoSessionId) {
    if (isArray(photoSessionId)) {
      url += `?photoSessionId=${photoSessionId.join(",")}`;
    } else {
      url += `?photoSessionId=${photoSessionId}`;
    }
  }
  return url;
};

// Not a static on PhotoAreaApi, so makeErrorsPretty only wraps the public method that calls it
const readPhotoLocationPage = (url: string, user: User, limit?: number, after?: number): Promise<PhotoLocationPage> => {
  const params = [];
  if (limit != null) {
    params.push(`limit=${limit}`);
  }
  if (after != null) {
    params.push(`after=${after}`);
  }
  if (params.length) {
    url += `${url.includes("?") ? "&" : "?"}${params.join("&")}`;
  }
  return Http.get(url, user).then((response) => {
    return checkFetchStatus<ApiPhotoLocation[]>(response).then((items) => {
      const nextCursor = response.headers.get("X-Next-Cursor");
      return { items, nextCursor: nextCursor == null ? null : Number(nextCursor) };
    });
  });
};

const readAllPhotoLocationPages = (url: string, user: User, after?: number, locations: ApiPhotoLocation[] = []): Promise<ApiPhotoLocation[]> => {
  return readPhotoLocationPage(url, user, PHOTO_LOCATION_PAGE_SIZE, after).then(({ items, nextCursor }) => {
    const allLocations = locations.concat(items);
    if (nextCursor == null) {
      return allLocations;
    }
    return readAllPhotoLocationPages(url, user, nextCursor, allLocations);
  });
};

export default class PhotoAreaApi {

  static createPhotoLocations({ projectId, photoAreaId, photoSessionId }: AssociationIds,
                              locations: ApiPhotoLocation[],
                              user: User): Promise<ApiPhotoLocation[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/locations`;
    if (photoSessionId) {
      url += `?photoSessionId=${photoSessionId}`;
    }
    return Http.post(url, user, locations) as unknown as Promise<ApiPhotoLocation[]>;
  }

  static listPhotoAreasForProject({ projectId, integrationProjectId }: AssociationIds,
                                  user: User): Promise<ApiPhotoArea[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas`;
    if (integrationProjectId != null) {
      url += `?integrationProjectId=${integrationProjectId}`;
    }
    return Http.get(url, user) as unknown as Promise<ApiPhotoArea[]>;
  }

  /**
   * Reads every photo location in the area. Walks the gateway's pages internally (see
   * {@link listPhotoLocationsPage}) so one huge area never has to come back as a single response.
   */
  static listPhotoLocations({ projectId, photoAreaId, photoSessionId }: AssociationIds,
                            user: User): Promise<ApiPhotoLocation[]> {
    const url = photoLocationsUrl({ projectId, photoAreaId, photoSessionId });
    return readAllPhotoLocationPages(url, user);
  }

  /**
   * Reads one page of photo locations, ordered by id. Pass the returned nextCursor as `after` to read
   * the next page; it is null on the last page.
   */
  static listPhotoLocationsPage({ projectId, photoAreaId, photoSessionId, limit, after }: AssociationIds & { limit?: number, after?: number },
                                user: User): Promise<PhotoLocationPage> {
    const url = photoLocationsUrl({ projectId, photoAreaId, photoSessionId });
    return readPhotoLocationPage(url, user, limit, after);
  }

  static listPhotoSessionsForPhotoArea({ projectId, photoAreaId }: AssociationIds,
                                       user: User): Promise<ApiPhotoSession[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/sessions`;
    return Http.get(url, user) as unknown as Promise<ApiPhotoSession[]>;
  }

  static updatePhotoLocationPositionAndOrientation({ projectId, floorId, photoLocationId }: AssociationIds,
                                                   coordinates: ApiPhotoLocation3d,
                                                   user: User): Promise<ApiPhotoLocation> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/photo-locations/${photoLocationId}/bim`;
    return Http.patch(url, user, coordinates) as unknown as Promise<ApiPhotoLocation>;
  }

  static updatePhotoLocation({ projectId, photoAreaId }: AssociationIds,
                              location: ApiPhotoLocation,
                              user: User): Promise<ApiPhotoLocation> {
    let url = `${Http.baseUrl()}/projects/${projectId}/photo-areas/${photoAreaId}/locations/${location.id}`;
    return Http.patch(url, user, location) as unknown as Promise<ApiPhotoLocation>;
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
