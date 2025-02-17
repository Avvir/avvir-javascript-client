import { ApiAutodeskAttritributes } from "./api_autodesk_attriibutes";

export class ApiHubs {
  id: string;
  attributes: ApiAutodeskAttritributes;

  constructor({ id, attributes }: Partial<ApiHubs> = {}) {
    this.id = id;
    this.attributes = attributes;
  }
}

export default ApiHubs;
