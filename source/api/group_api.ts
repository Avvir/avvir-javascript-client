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

  static deleteGroup({ projectId, groupId }: AssociationIds, user: User, ): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/groups/${groupId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static deleteGroupMembers({ projectId }: AssociationIds, groupMemberIds: number[], user: User, ): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/groups/members`;
    return Http.delete(url, user, groupMemberIds) as unknown as Promise<void>;
  }
  static updateGroup({ projectId, groupId }: AssociationIds, group: ApiGroup, user: User, ): Promise<ApiGroup|null> {
    let url = `${Http.baseUrl()}/projects/${projectId}/groups/${groupId}`;
    return Http.patch(url, user, group) as unknown as Promise<ApiGroup|null>;
  }
}

makeErrorsPretty(GroupApi);