export class IntegrationAssociationIds {
    firebaseProjectId: string;
    firebaseFloorId: string;
    scanDatasetId: string;
    globalId: string;
    constructor({
                    firebaseProjectId,
                    firebaseFloorId,
                    scanDatasetId,
                    globalId}: Partial<IntegrationAssociationIds> = {}) {
        this.firebaseProjectId = firebaseProjectId!;
        this.firebaseFloorId = firebaseFloorId!;
        this.scanDatasetId = scanDatasetId!;
        this.globalId = globalId!;
    }
}