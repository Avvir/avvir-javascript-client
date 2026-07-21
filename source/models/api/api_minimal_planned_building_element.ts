import { ApiBuiltStatus } from "../enums";

export interface ApiMinimalPlannedBuildingElement {
  globalId: string;
  builtStatus: ApiBuiltStatus;
  trade?: string;
  uniformat?: string;
}
