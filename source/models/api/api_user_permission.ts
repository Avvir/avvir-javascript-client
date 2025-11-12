import type UserPermissionAction from "../enums/user_permission_action";
import type UserPermissionType from "../enums/user_permission_type";

export class ApiUserPermission {
  id: number;
  userId: number;
  firebaseProjectId: string;
  firebaseOrganizationId: string;
  masterformatCode: string;
  permissionType: UserPermissionType;
  permissionAction: UserPermissionAction;
  organizationName: string;
  projectName: string;
  workPackageId: number;

  constructor({
                id,
                userId,
                firebaseProjectId,
                firebaseOrganizationId,
                masterformatCode,
                permissionType,
                permissionAction,
                organizationName,
                projectName,
                workPackageId
              }: Partial<ApiUserPermission>)
  {
    this.id = id;
    this.userId = userId;
    this.firebaseProjectId = firebaseProjectId;
    this.firebaseOrganizationId = firebaseOrganizationId;
    this.masterformatCode = masterformatCode;
    this.permissionType = permissionType;
    this.permissionAction = permissionAction;
    this.organizationName = organizationName;
    this.projectName = projectName;
    this.workPackageId = workPackageId;
  }
}

export default ApiUserPermission;
