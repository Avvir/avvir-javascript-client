export type ApiVerifiedPlannedBuildingElementArgs = Partial<ApiVerifiedPlannedBuildingElement>;

export class ApiVerifiedPlannedBuildingElement {
    constructor({ pbeId, scanId, globalId, firebaseScanDatasetId }: ApiVerifiedPlannedBuildingElementArgs = {})
    {
        this.pbeId = pbeId;
        this.scanId = scanId;
        this.globalId = globalId;
        this.firebaseScanDatasetId = firebaseScanDatasetId
    }

    pbeId?: number;
    scanId?: number;
    globalId: string;
    firebaseScanDatasetId?: string;
}
