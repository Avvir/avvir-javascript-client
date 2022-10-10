import {UserPermissionType} from "../enums/user_permission_type";
import {UserPermissionAction} from "../enums/user_permission_action"

export class ApiUserPermission {
  id: number
  userId: number
  projectFirebaseId: string
  organizationFirebaseId: string
  masterformatCode: string
  permissionType: UserPermissionType
  permissionAction: UserPermissionAction

  constructor({id, userId, projectFirebaseId, organizationFirebaseId, masterformatCode, permissionType, permissionAction}: Partial<ApiUserPermission>) {
    this.id = id;
    this.userId = userId;
    this.projectFirebaseId = projectFirebaseId;
    this.organizationFirebaseId = organizationFirebaseId;
    this.masterformatCode = masterformatCode;
    this.permissionType = permissionType;
    this.permissionAction = permissionAction;
  }
}

export default ApiUserPermission;
