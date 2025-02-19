import {addInstantGetterAndSetterToApiModel} from "../../mixins";

export class ApiFloorBackup {
  constructor({id, floorId, createdAt}: Partial<ApiFloorBackup> = {}) {
    this.id = id;
    this.floorId = floorId;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
  }

  id: number;
  floorId: number;
  createdAt: number;
}
