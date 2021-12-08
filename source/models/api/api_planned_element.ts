import { UniformatId } from "uniformat";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

export class ApiPlannedElement {
  constructor({ globalId, name, ifcType, uniformat, itemId, discipline, primaryUnitOfMeasurement, primaryMeasurement }: Partial<ApiPlannedElement> = {}) {
    addReadOnlyPropertiesToModel(this, { globalId });
    this.name = name;
    this.ifcType = ifcType;
    this.uniformat = uniformat;
    this.itemId = itemId;
    this.discipline = discipline;
    this.primaryUnitOfMeasurement = primaryUnitOfMeasurement;
    this.primaryMeasurement = primaryMeasurement;
  }

  readonly globalId: string;
  name: string;
  ifcType?: string;
  uniformat?: UniformatId;
  itemId?: string;
  discipline?: string;
  primaryUnitOfMeasurement?: string;
  primaryMeasurement?: number;
}

export default ApiPlannedElement;
