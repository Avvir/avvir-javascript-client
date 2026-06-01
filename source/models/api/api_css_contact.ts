import { addInstantGetterAndSetterToApiModel } from "../../mixins";
import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiCssContactArgument = ModifyPartial<ApiCssContact, {
  createdAt: DateLike
}>

export class ApiCssContact {
  id: number;
  userId?: number;
  email: string;
  name: string;
  organizationId?: number;
  createdBy?: number;
  createdAt: number;

  constructor({
    id,
    userId,
    email,
    name,
    organizationId,
    createdBy,
    createdAt
  }: ApiCssContactArgument = {}) {
    this.id = id;
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.organizationId = organizationId;
    this.createdBy = createdBy;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
  }
}

export default ApiCssContact;
