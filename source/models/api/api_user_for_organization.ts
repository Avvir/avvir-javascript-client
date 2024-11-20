import { addInstantGetterAndSetterToApiModel } from "../../mixins";

import type UserRole from "../enums/user_role";
import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiUserForOrganizationArgument = ModifyPartial<ApiUserForOrganization, {
  latestInvitationExpiry: DateLike
  accountCreationTime: DateLike
  accountAcceptedTime: DateLike
}>

export class ApiUserForOrganization {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  projects: string[];
  accessType: string;
  inviteStatus: string;
  masterformatCodes: string[];
  latestInvitationExpiry: number;
  accountCreationTime: number;
  accountAcceptedTime: number;

  constructor({
                id,
                name,
                email,
                role,
                projects,
                accessType,
                inviteStatus,
                masterformatCodes,
                latestInvitationExpiry,
                accountCreationTime,
                accountAcceptedTime
              }: ApiUserForOrganizationArgument = {})
  {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.projects = projects;
    this.accessType = accessType;
    this.inviteStatus = inviteStatus;
    this.masterformatCodes = masterformatCodes;
    addInstantGetterAndSetterToApiModel(this, "latestInvitationExpiry", latestInvitationExpiry);
    addInstantGetterAndSetterToApiModel(this, "accountCreationTime", accountCreationTime);
    addInstantGetterAndSetterToApiModel(this, "accountAcceptedTime", accountAcceptedTime);
  }
}

export default ApiUserForOrganization;
