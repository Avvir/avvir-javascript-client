import { addInstantGetterAndSetterToApiModel } from "../../mixins";

import type UserRole from "../enums/user_role";
import type { DateLike, ModifyPartial } from "type_aliases";
import { ApiInvitation } from "./api_invitation";
import { ApiUserRole } from "./api_user_role";

export type ApiOrganizationMemberArgument = ModifyPartial<ApiOrganizationMember, {
  accountCreatedAt: DateLike
  accountAcceptedAt: DateLike
}>

export class ApiOrganizationMember {
  id: number;
  name: string;
  email: string;
  legacyRole: UserRole;
  accountCreatedAt: number;
  accountAcceptedAt: number;
  invitations: ApiInvitation[];
  userRoles: ApiUserRole[];

  constructor({
                id,
                name,
                email,
                legacyRole,
                accountCreatedAt,
                accountAcceptedAt,
                invitations,
                userRoles
              }: ApiOrganizationMemberArgument = {})
  {
    this.id = id;
    this.name = name;
    this.email = email;
    this.legacyRole = legacyRole;
    addInstantGetterAndSetterToApiModel(this, "accountCreatedAt", accountCreatedAt);
    addInstantGetterAndSetterToApiModel(this, "accountAcceptedAt", accountAcceptedAt);
    this.invitations = invitations;
    this.userRoles = userRoles;
  }
}
