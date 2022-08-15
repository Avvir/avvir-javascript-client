import {UniformatId} from "uniformat";
import ApiElementDeviation from "./api_element_deviation";

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
                builtAt,
                deviation,
                fixedAt,
                fixedAtDeviation
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
    this.builtAt = builtAt;
    this.fixedAt = fixedAt;
    this.deviation = deviation;
    this.fixedAtDeviation = fixedAtDeviation;
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
  builtAt?: number;
  deviation?: ApiElementDeviation;
  fixedAt?: number;
  fixedAtDeviation?: ApiElementDeviation;
}

export default ApiPlannedElement;
