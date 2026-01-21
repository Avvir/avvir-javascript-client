
export class ApiAssignees {
  name: string;
  autodeskId: string;

  constructor({ name, autodeskId }: Partial<ApiAssignees> = {}) {
    this.name = name;
    this.autodeskId = autodeskId;
  }
}

export default ApiAssignees;
