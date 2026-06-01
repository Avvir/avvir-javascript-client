export class ApiCssEligibleUser {
  id: number;
  email: string;
  name: string;

  constructor({ id, email, name }: Partial<ApiCssEligibleUser> = {}) {
    this.id = id;
    this.email = email;
    this.name = name;
  }
}

export default ApiCssEligibleUser;
