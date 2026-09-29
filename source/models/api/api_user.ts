import type UserRole from "../enums/user_role";
import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import {DateLike} from "type_aliases";

export class ApiUser {
  name: string;
  userOrganization: string;
  email: string;
  role: UserRole;
  projectId: string;
  userId: number;
  createdAt: DateLike;

  constructor({
    name,
    userOrganization,
    email,
    role,
    projectId,
    userId,
    createdAt,
  }: Partial<ApiUser> = {}) {
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
    this.name = name;
    this.userOrganization = userOrganization;
    this.email = email;
    this.role = role;
    this.projectId = projectId;
    this.userId = userId;
  }
}

export default ApiUser;
