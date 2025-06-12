import {addInstantGetterAndSetterToApiModel} from "../../mixins";

export class ApiFloorBackup {
  constructor({id, floorId, createdAt, backupPurpose}: Partial<ApiFloorBackup> = {}) {
    this.id = id;
    this.floorId = floorId;
    this.backupPurpose = backupPurpose;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
  }

  id: number;
  floorId: number;
  createdAt: number;
  backupPurpose?: string;
}
