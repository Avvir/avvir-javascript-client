import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import { DateLike, Modify } from "./type_aliases";

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
                    plannedQuantityProject,
                    reportedQuantity,
                    scannedQuantityProject,
                    scannedQuantity,
                    scannedTotalCost,
                    analysisDate,
                    plannedTotalCostProject,
                    modeledTotalCostProject,
                    scannedTotalCostProject,
                    reportedTotalCostProject,
                    reportedQuantityProject,
                    modeledQuantityArea,
                    scannedQuantityArea,
                    modeledTotalCostArea,
                    scannedTotalCostArea,
                    vendor
                }: ApiProjectCostAnalysisProgressArgument) {
        addReadOnlyPropertiesToModel(this, {id});
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

        this.plannedQuantityProject = plannedQuantityProject;
        this.plannedTotalCostProject = plannedTotalCostProject;
        this.modeledTotalCostProject = modeledTotalCostProject;
        this.scannedTotalCostProject = scannedTotalCostProject;
        this.reportedTotalCostProject = reportedTotalCostProject;
        this.reportedQuantityProject = reportedQuantityProject;
        this.modeledQuantityArea = modeledQuantityArea;
        this.scannedQuantityArea = scannedQuantityArea;
        this.modeledTotalCostArea = modeledTotalCostArea;
        this.scannedTotalCostArea = scannedTotalCostArea;

        this.vendor = vendor;
    }

    id: number | null = null;
    masterformatCode: string | null = null;
    sequence: number | null = null;
    name: string | null = null;
    componentDescription: string | null = null;
    analysisDate: number | null = null;

    unitOfMeasure: string | null = null;
    plannedUnitCost: number | null = null;

    plannedQuantityProject: number | null = null;
    reportedQuantityProject: number | null = null;
    modeledQuantityProject: number | null = null;
    scannedQuantityProject: number | null = null;

    plannedTotalCostProject: number | null = null;
    modeledTotalCostProject: number | null = null;
    scannedTotalCostProject: number | null = null;
    reportedTotalCostProject: number | null = null;

    modeledQuantityArea: number | null = null;
    scannedQuantityArea: number | null = null;

    modeledTotalCostArea: number | null = null;
    scannedTotalCostArea: number | null = null;

    vendor: string | null = null;

    /** @deprecated */
    plannedQuantity: number | null = null;
    /** @deprecated */
    plannedTotalCost: number | null = null;
    /** @deprecated */
    modeledQuantity: number | null = null;
    /** @deprecated */
    modeledTotalCost: number | null = null;
    /** @deprecated */
    reportedQuantity: number | null = null;
    /** @deprecated */
    scannedQuantity: number | null = null;
    /** @deprecated */
    scannedTotalCost: number | null = null;
}

export default ApiProjectCostAnalysisProgress;
