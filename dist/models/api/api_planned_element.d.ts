import { UniformatId } from "uniformat";
export default class ApiPlannedElement {
    constructor({ globalId, name, ifcType, uniformat, itemId, discipline, primaryUnitOfMeasurement, primaryMeasurement }?: Partial<ApiPlannedElement>);
    readonly globalId: string;
    name: string;
    ifcType?: string;
    uniformat?: UniformatId;
    itemId?: string;
    discipline?: string;
    primaryUnitOfMeasurement?: string;
    primaryMeasurement?: number;
}
