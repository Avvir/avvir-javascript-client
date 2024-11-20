import type { UserRole } from "../enums";

export class ApiInvitation {
  resourceName: string;
  userEmail: string;
  role: UserRole;
  token: string;
  expiry: number;
  acceptUrl: string;
}

export default ApiInvitation;
