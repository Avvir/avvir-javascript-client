export class ApiProjectArea {
    readonly id: number;
    readonly name: string;

    constructor({id, name}: Partial<ApiProjectArea> = {}) {
        this.id = id;
        this.name = name;
    }
}