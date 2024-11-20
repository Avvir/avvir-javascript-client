import type { Vector3 } from "three";

export class ApiInspectReportEntryElement {
  constructor({ masterformatCode, builtStatus, deviationVectorMeters, globalId, name }: Partial<ApiInspectReportEntryElement> = {}) {
    this.masterformatCode = masterformatCode;
    this.builtStatus = builtStatus;
    this.deviationVectorMeters = deviationVectorMeters;
    this.globalId = globalId;
    this.name = name;
  }

  masterformatCode: string;
  builtStatus: string;
  deviationVectorMeters: Vector3;
  globalId: string;
  name: string;

  static plannedBuildingElementToApiInspectReportEntry(element, level1Masterformat): ApiInspectReportEntryElement {
    return new ApiInspectReportEntryElement({
      masterformatCode: level1Masterformat,
      globalId: element.globalId,
      deviationVectorMeters: element.deviationVectorMeters,
      builtStatus: element.builtStatus,
      name: element.name
    });
  }
}

export default ApiInspectReportEntryElement;
