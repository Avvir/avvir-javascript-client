import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import { DateLike, Modify } from "type_aliases";

export interface ApiProjectCostAnalysisProgressArgument extends Partial<Modify<ApiProjectCostAnalysisProgress, {
  analysisDate?: DateLike
}>> {}

export class ApiProjectCostAnalysisProgress {
  constructor({
    masterformatCode,
    sequence,
    name,
    description,
    unitOfMeasure,
    unitCost,
    quantity,
    totalCost,
    bimQuantity,
    reportedInstalled,
    installedQuantity,
    installedCost,
    analysisDate
  }: ApiProjectCostAnalysisProgressArgument) {
    addInstantGetterAndSetterToApiModel(this, "analysisDate");
    this.masterformatCode = masterformatCode;
    this.sequence = sequence;
    this.name = name;
    this.description = description;
    this.unitOfMeasure = unitOfMeasure;
    this.unitCost = unitCost;
    this.quantity = quantity;
    this.totalCost = totalCost;
    this.bimQuantity = bimQuantity;
    this.reportedInstalled = reportedInstalled;
    this.installedQuantity = installedQuantity;
    this.installedCost = installedCost;
    // @ts-ignore
    this.analysisDate = analysisDate;
  }

  masterformatCode: string | null = null;
  sequence: string | null = null;
  name: string | null = null;
  description: string | null = null;
  unitOfMeasure: string | null = null;
  unitCost: number | null = null;
  quantity: number | null = null;
  totalCost: number | null = null;
  bimQuantity: number | null = null;
  reportedInstalled: number | null = null;
  installedQuantity: number | null = null;
  installedCost: number | null = null;
  analysisDate: number | null = null;
}

export default ApiProjectCostAnalysisProgress;
