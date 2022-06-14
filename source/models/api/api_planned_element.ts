import {UniformatId} from "uniformat";

export class ApiPlannedElement {
  constructor({
                globalId,
                name,
                ifcType,
                uniformat,
                masterformat,
                revitCategory,
                revitFamily,
                revitType,
                itemId,
                discipline,
                primaryUnitOfMeasurement,
                primaryMeasurement,
                navisworksGuid,
                issueId,
                excludeFromAnalysis,
                bcfGuid
              }: Partial<ApiPlannedElement> = {}) {
    this.globalId = globalId;
    this.name = name;
    this.ifcType = ifcType;
    this.uniformat = uniformat;
    this.masterformat = masterformat;
    this.revitCategory = revitCategory;
    this.revitFamily = revitFamily;
    this.revitType = revitType;
    this.itemId = itemId;
    this.discipline = discipline;
    this.primaryUnitOfMeasurement = primaryUnitOfMeasurement;
    this.primaryMeasurement = primaryMeasurement;
    this.navisworksGuid = navisworksGuid;
    this.issueId = issueId;
    this.excludeFromAnalysis = excludeFromAnalysis;
    this.bcfGuid = bcfGuid;
  }

  name?: string;
  globalId: string;
  itemId?: string | null;
  ifcType?: string;
  discipline?: string;
  uniformat?: UniformatId;
  masterformat?: string;
  revitFamily?: string;
  revitType?: string;
  revitCategory?: string;
  primaryUnitOfMeasurement?: string;
  primaryMeasurement?: number;
  navisworksGuid?: string;
  issueId?: number;
  excludeFromAnalysis?: boolean;
  bcfGuid?: string;
}

export default ApiPlannedElement;
