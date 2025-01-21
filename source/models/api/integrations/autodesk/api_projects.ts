export class attributes {
    name: string;
}

export class ApiProjects {
    id: string;
    name: attributes
    constructor({id, name}: Partial<ApiProjects> = {}) {
        this.id = id;
        this.name = name;
    }
}

export default ApiProjects;
