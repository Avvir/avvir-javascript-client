import addDateGetterAndSetterToDomainModel from "../../../mixins/add_date_getter_and_setter_to_domain_model";
import { DateLike, Modify } from "type_aliases";

interface ProjectCostAnalysisProgressArgument extends Partial<Modify<ProjectCostAnalysisProgress, {
  analysisDate?: DateLike
}>> {}

export default class ProjectCostAnalysisProgress {
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
  }: ProjectCostAnalysisProgressArgument = {}) {
    addDateGetterAndSetterToDomainModel(this, "analysisDate");
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
  analysisDate: Date | null = null;
}
