export class Attributes {
    name: string;
}

export class ApiProjects {
    id: string;
    attributes: Attributes

    constructor({id, attributes}: Partial<ApiProjects> = {}) {
        this.id = id;
        this.attributes = attributes;
    }
}

export default ApiProjects;
