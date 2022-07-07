export class ApiTeamMember {
  id?: number
  name: string
  userOrganization: string
  email: string
  role: string
  masterformats?: string[]

  constructor({ id, name, userOrganization, email, role, masterformats }: Partial<ApiTeamMember> = {}) {
    this.id = id;
    this.name = name;
    this.userOrganization = userOrganization;
    this.email = email;
    this.role = role;
    this.masterformats = masterformats;
  }
}
