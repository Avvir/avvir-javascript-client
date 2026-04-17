import type {UserRoleType} from "../enums";

export class ApiUserProject {
  projectId: number;
  projectName: string;
  role: UserRoleType;
  organizationFirebaseId: string;
  projectFirebaseId: string;

  constructor({
                projectId,
                projectName,
                role,
                organizationFirebaseId,
                projectFirebaseId
              }: Partial<ApiUserProject> = {}) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.role = role;
    this.organizationFirebaseId = organizationFirebaseId;
    this.projectFirebaseId = projectFirebaseId;
  }
}

export default ApiUserProject;
