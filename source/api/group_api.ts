import {User} from "../utilities/get_authorization_headers";
import Http from "../utilities/http";
import {ApiGroup} from "../models/api/api_groups";
import {AssociationIds} from "../models";
import makeErrorsPretty from "../utilities/make_errors_pretty";

export default class GroupApi {
  static getGroup({ projectId, groupId }: AssociationIds, user: User, ): Promise<ApiGroup|null> {
    let url = `${Http.baseUrl()}/projects/${projectId}/groups/${groupId}`;
    return Http.get(url, user) as unknown as Promise<ApiGroup|null>;
  }

  static getGroups({ projectId, floorId }: AssociationIds,  user: User, ): Promise<ApiGroup[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/groups/?floorId=${floorId}`;
    return Http.get(url, user) as unknown as Promise<ApiGroup[]>;
  }

  static createElementGroup({ projectId, floorId }: AssociationIds, globalIds: string[], user: User, ): Promise<ApiGroup> {
    let url = `${Http.baseUrl()}/projects/${projectId}/groups/floor/${floorId}/planned-building-elements`;
    return Http.post(url, user, globalIds) as unknown as Promise<ApiGroup>;
  }
}

makeErrorsPretty(GroupApi);