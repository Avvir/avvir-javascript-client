import { ApiAutodeskAttributes } from "./api_autodesk_attributes";

export class ApiProjects {
  id: string;
  attributes: ApiAutodeskAttributes;

  constructor({ id, attributes }: Partial<ApiProjects> = {}) {
    this.id = id;
    this.attributes = attributes;
  }
}

export default ApiProjects;
