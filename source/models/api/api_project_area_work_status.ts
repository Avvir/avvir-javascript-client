export class ApiProjectAreaWorkStatus {
    readonly id: number;
    readonly workPackageName: string;
    readonly status: string;

    constructor({id, workPackageName, status}: Partial<ApiProjectAreaWorkStatus> = {}) {
        this.id = id || null;
        this.workPackageName = workPackageName || null;
        this.status = status || null;
    }
}