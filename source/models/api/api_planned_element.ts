import { UniformatId } from "uniformat";
import ApiElementDeviation from "./api_element_deviation";
import { addInstantGetterAndSetterToApiModel } from "../../mixins";
import { DateLike, ModifyPartial } from "type_aliases";

type ApiPlannedElementArgument = ModifyPartial<ApiPlannedElement, { builtAt: DateLike, fixedAt: DateLike }>

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
                unitCost,
                navisworksGuid,
                issueId,
                excludeFromAnalysis,
                builtAt,
                deviation,
                fixedAt,
                fixedDeviation,
                duplicateOf,
              }: ApiPlannedElementArgument = {})
  {
    addInstantGetterAndSetterToApiModel(this, "builtAt", builtAt);
    addInstantGetterAndSetterToApiModel(this, "fixedAt", fixedAt);
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
    this.unitCost = unitCost
    this.navisworksGuid = navisworksGuid;
    this.issueId = issueId;
    this.excludeFromAnalysis = excludeFromAnalysis;
    this.deviation = deviation;
    this.fixedDeviation = fixedDeviation;
    this.duplicateOf = duplicateOf;
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
  unitCost?: number
  navisworksGuid?: string;
  issueId?: number;
  excludeFromAnalysis?: boolean;
  builtAt?: number;
  deviation?: ApiElementDeviation;
  fixedAt?: number;
  fixedDeviation?: ApiElementDeviation;
  duplicateOf?: string;
}

export default ApiPlannedElement;
