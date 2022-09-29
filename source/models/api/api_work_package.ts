export class ApiWorkPackage {
    id?: number
    name: string

    constructor({id, name} : Partial<ApiWorkPackage> = {}) {
        this.id = id;
        this.name = name;
    }
}