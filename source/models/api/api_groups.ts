import { addInstantGetterAndSetterToApiModel } from "../../mixins";

export class ApiGroup {
  id: number;
  name: string;
  createdAt: number;
  createdBy: number;
  members: ApiGroupMember[];
  floorId: string;

  constructor({ id, name, createdAt, createdBy, members, floorId }: Partial<ApiGroup>) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.members = members;
    this.floorId = floorId;
    addInstantGetterAndSetterToApiModel(this, "createdAt", createdAt);
  }
}


export class ApiGroupMember {
  id: number;
  groupId: number;
  memberType: string;
  elementId: string;

  constructor({ id, groupId, memberType, elementId }: Partial<ApiGroupMember>) {
    this.id = id;
    this.groupId = groupId;
    this.elementId = elementId;
    this.memberType = memberType;
  }

}
