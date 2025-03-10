import { ApiAutodeskAttributes } from "./api_autodesk_attributes";

export class ApiHubs {
  id: string;
  attributes: ApiAutodeskAttributes;

  constructor({ id, attributes }: Partial<ApiHubs> = {}) {
    this.id = id;
    this.attributes = attributes;
  }
}

export default ApiHubs;
