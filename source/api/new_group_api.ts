import Http from "../utilities/http";
import makeErrorsPretty from "../utilities/make_errors_pretty";

import type { ApiGroup, ApiGroupMember } from "../models";
import type { AssociationIds } from "type_aliases";
import type { User } from "../utilities/get_authorization_headers";

export default class NewGroupApi {
  static getGroup({ projectId, floorId, groupId }: AssociationIds, user: User, ): Promise<ApiGroup|null> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/groups/${groupId}`;
    return Http.get(url, user) as unknown as Promise<ApiGroup|null>;
  }

  static listGroupsForFloor({ projectId, floorId }: AssociationIds,  user: User, ): Promise<ApiGroup[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/groups`;
    return Http.get(url, user) as unknown as Promise<ApiGroup[]>;
  }

  static createElementGroup({ projectId, floorId }: AssociationIds, globalIds: string[], user: User, ): Promise<ApiGroup> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/groups/planned-building-elements`;
    return Http.post(url, user, globalIds) as unknown as Promise<ApiGroup>;
  }

  static createElementGroupMembers({projectId, floorId, groupId}: AssociationIds, globalIds: string[], user: User, ): Promise<ApiGroupMember[]> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/groups/${groupId}/planned-building-elements`;
    return Http.post(url, user, globalIds) as unknown as Promise<ApiGroupMember[]>;
  }

  static deleteGroup({ projectId, floorId, groupId }: AssociationIds, user: User, ): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/groups/${groupId}`;
    return Http.delete(url, user) as unknown as Promise<void>;
  }

  static deleteGroupMembers({ projectId, floorId }: AssociationIds, groupMemberIds: number[], user: User, ): Promise<void> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/groups/members`;
    return Http.delete(url, user, groupMemberIds) as unknown as Promise<void>;
  }
  static updateGroup({ projectId, floorId, groupId }: AssociationIds, group: ApiGroup, user: User, ): Promise<ApiGroup|null> {
    let url = `${Http.baseUrl()}/projects/${projectId}/floors/${floorId}/groups/${groupId}`;
    return Http.patch(url, user, group) as unknown as Promise<ApiGroup|null>;
  }
}

makeErrorsPretty(NewGroupApi);
