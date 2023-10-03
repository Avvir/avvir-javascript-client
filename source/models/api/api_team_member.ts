import {ApiWorkPackage} from "./api_work_package";

export class ApiTeamMember {
  id?: number
  name: string
  userOrganization: string
  email: string
  role: string
  masterformats?: string[]
  vendor?: ApiWorkPackage;

  constructor({ id, name, userOrganization, email, role, masterformats, vendor }: Partial<ApiTeamMember> = {}) {
    this.id = id;
    this.name = name;
    this.userOrganization = userOrganization;
    this.email = email;
    this.role = role;
    this.masterformats = masterformats;
    this.vendor = vendor;
  }
}
