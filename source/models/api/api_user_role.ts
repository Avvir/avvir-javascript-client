import type UserPermissionType from "../enums/user_permission_type";
import type {UserRoleType} from "../enums";

export class ApiUserRole {
  id: number;
  roleType: UserRoleType;
  scope: UserPermissionType;
  userId: number;
  firebaseOrganizationId: string;
  firebaseProjectId: string;
  workPackageId: number;

  constructor({
                id,
                roleType,
                scope,
                userId,
                firebaseOrganizationId,
                firebaseProjectId,
                workPackageId
              }: Partial<ApiUserRole>) {
    this.id = id;
    this.roleType = roleType;
    this.scope = scope;
    this.userId = userId;
    this.firebaseOrganizationId = firebaseOrganizationId;
    this.firebaseProjectId = firebaseProjectId;
    this.workPackageId = workPackageId;
  }
}
