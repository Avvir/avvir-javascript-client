import { DateLike, Modify } from "type_aliases";
interface ApiProjectCostAnalysisProgressArgument extends Partial<Modify<ApiProjectCostAnalysisProgress, {
    analysisDate?: DateLike;
}>> {
}
export default class ApiProjectCostAnalysisProgress {
    constructor({ masterformatCode, sequence, name, description, unitOfMeasure, unitCost, quantity, totalCost, bimQuantity, reportedInstalled, installedQuantity, installedCost, analysisDate }: ApiProjectCostAnalysisProgressArgument);
    masterformatCode: string | null;
    sequence: string | null;
    name: string | null;
    description: string | null;
    unitOfMeasure: string | null;
    unitCost: number | null;
    quantity: number | null;
    totalCost: number | null;
    bimQuantity: number | null;
    reportedInstalled: number | null;
    installedQuantity: number | null;
    installedCost: number | null;
    analysisDate: number | null;
}
export {};
