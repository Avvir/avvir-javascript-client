import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import { DateLike, Modify } from "type_aliases";

export type ApiProjectCostAnalysisProgressArgument = Partial<Modify<ApiProjectCostAnalysisProgress, {
  analysisDate?: DateLike
}>>

export class ApiProjectCostAnalysisProgress {
  constructor({
    id,
    masterformatCode,
    sequence,
    name,
    componentDescription,
    unitOfMeasure,
    plannedUnitCost,
    plannedQuantity,
    plannedTotalCost,
    modeledQuantityProject,
    modeledQuantity,
    modeledTotalCost,
    reportedQuantity,
    scannedQuantityProject,
    scannedQuantity,
    scannedTotalCost,
    analysisDate
  }: ApiProjectCostAnalysisProgressArgument) {
    addReadOnlyPropertiesToModel(this, { id });
    addInstantGetterAndSetterToApiModel(this, "analysisDate");
    this.masterformatCode = masterformatCode;
    this.sequence = sequence;
    this.name = name;
    this.componentDescription = componentDescription;
    this.unitOfMeasure = unitOfMeasure;
    this.plannedUnitCost = plannedUnitCost;
    this.plannedQuantity = plannedQuantity;
    this.plannedTotalCost = plannedTotalCost;
    this.modeledQuantityProject = modeledQuantityProject;
    this.modeledQuantity = modeledQuantity;
    this.modeledTotalCost = modeledTotalCost;
    this.reportedQuantity = reportedQuantity;
    this.scannedQuantityProject = scannedQuantityProject;
    this.scannedQuantity = scannedQuantity;
    this.scannedTotalCost = scannedTotalCost;
    // @ts-ignore
    this.analysisDate = analysisDate;
  }

  id: number | null = null;
  masterformatCode: string | null = null;
  sequence: string | null = null;
  name: string | null = null;
  componentDescription: string | null = null;
  unitOfMeasure: string | null = null;
  plannedUnitCost: number | null = null;
  plannedQuantity: number | null = null;
  plannedTotalCost: number | null = null;
  modeledQuantityProject: number | null = null;
  modeledQuantity: number | null = null;
  modeledTotalCost: number | null = null;
  reportedQuantity: number | null = null;
  scannedQuantityProject: number | null = null;
  scannedQuantity: number | null = null;
  scannedTotalCost: number | null = null;
  analysisDate: number | null = null;
}

export default ApiProjectCostAnalysisProgress;
