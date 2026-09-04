export class ApiCssContactSummary {
  name: string;
  email: string;

  constructor({ name, email }: Partial<ApiCssContactSummary> = {}) {
    this.name = name;
    this.email = email;
  }
}

export default ApiCssContactSummary;