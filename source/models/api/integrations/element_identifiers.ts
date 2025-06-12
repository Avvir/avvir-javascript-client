export class ElementIdentifiers {
    pbeProjectId: number;
    firebaseFloorId: string;
    globalId: string;
    constructor({
                    pbeProjectId,
                    firebaseFloorId,
                    globalId}: Partial<ElementIdentifiers> = {}) {
        this.pbeProjectId = pbeProjectId!;
        this.firebaseFloorId = firebaseFloorId!;
        this.globalId = globalId!;
    }
}