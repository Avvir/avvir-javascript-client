import {Vector3} from "three";

export class ApiInspectReportEntryElement {
    constructor({masterformatCode, builtStatus, deviationVectorMeters, globalId}) {
        this.masterformatCode = masterformatCode;
        this.builtStatus = builtStatus;
        this.deviationVectorMeters = deviationVectorMeters
        this.globalId = globalId;
    }
    masterformatCode: string;
    builtStatus: string;
    deviationVectorMeters: Vector3;
    globalId: string;

    static plannedBuildingElementToApiInspectReportEntry(element, level1Masterformat): ApiInspectReportEntryElement {
        return new ApiInspectReportEntryElement({
            masterformatCode: level1Masterformat,
            globalId: element.globalId,
            deviationVectorMeters: element.deviationVectorMeters,
            builtStatus: element.builtStatus
        })
    }
}