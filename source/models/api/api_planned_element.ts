import { UniformatId } from "uniformat";

export class ApiPlannedElement {
  constructor({ globalId, name, ifcType, uniformat, masterformat, itemId, discipline, primaryUnitOfMeasurement, primaryMeasurement, navisworksGuid, floorSpan, subcontractorId }: Partial<ApiPlannedElement> = {}) {
    this.globalId = globalId;
    this.name = name;
    this.ifcType = ifcType;
    this.uniformat = uniformat;
    this.masterformat = masterformat;
    this.itemId = itemId;
    this.discipline = discipline;
    this.primaryUnitOfMeasurement = primaryUnitOfMeasurement;
    this.primaryMeasurement = primaryMeasurement;
    this.navisworksGuid = navisworksGuid;
    this.floorSpan = floorSpan;
    this.subcontractorId = subcontractorId;
  }

  globalId: string;
  name?: string;
  ifcType?: string;
  uniformat?: UniformatId;
  masterformat?: string;
  itemId?: string | null;
  discipline?: string;
  primaryUnitOfMeasurement?: string;
  primaryMeasurement?: number;
  navisworksGuid?: string;
  floorSpan?: number;
  subcontractorId?: number;
}

export default ApiPlannedElement;
