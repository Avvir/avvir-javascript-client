import { addInstantGetterAndSetterToApiModel } from "../../mixins";
import type { DateLike, ModifyPartial } from "type_aliases";

export type ApiSupportRequestArgument = ModifyPartial<ApiSupportRequest, {
  createdAt: DateLike
}>

export class ApiSupportRequest {
  id: number;
  createdAt: number;

  constructor({
    id,
    createdAt
  }: ApiSupportRequestArgument = {}) {
    this.id = id;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
  }
}

export default ApiSupportRequest;