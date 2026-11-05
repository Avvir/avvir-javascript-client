
// A node in an Autodesk project's Location Breakdown Structure, used to populate the building area
// picker. The gateway leaves out the root node, which Autodesk will not accept as a location.
export class ApiLocationNode {
  id: string;
  parentId: string | null;
  type: string;
  name: string;

  constructor({ id, parentId, type, name }: Partial<ApiLocationNode> = {}) {
    this.id = id;
    this.parentId = parentId;
    this.type = type;
    this.name = name;
  }
}

export default ApiLocationNode;
