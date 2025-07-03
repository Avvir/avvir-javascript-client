import {addInstantGetterAndSetterToApiModel} from "../../mixins";

import type {DateLike, ModifyPartial} from "type_aliases";
import {ApiBuiltStatus} from "../enums";

type ApiPartialProgressElementArgument = ModifyPartial<ApiPartialProgressElement, { builtAt: DateLike }>

export class ApiPartialProgressElement {
  constructor({
                globalId,
                builtAt,
                partialProgressPercent,
                builtStatus
              }: ApiPartialProgressElementArgument = {}) {
    addInstantGetterAndSetterToApiModel(this, "builtAt", builtAt);
    this.globalId = globalId;
    this.partialProgressPercent = partialProgressPercent;
    this.builtStatus = builtStatus;
  }

  globalId: string;
  builtAt?: number;
  partialProgressPercent?: number;
  builtStatus?: ApiBuiltStatus;
}
