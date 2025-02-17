import { ApiAutodeskAttritributes } from "./api_autodesk_attriibutes";

export class ApiProjects {
  id: string;
  attributes: ApiAutodeskAttritributes;

  constructor({ id, attributes }: Partial<ApiProjects> = {}) {
    this.id = id;
    this.attributes = attributes;
  }
}

export default ApiProjects;
