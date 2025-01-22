export class Attributes {
    name: string;
}

export class ApiHubs {
    id: string;
    attributes: Attributes

    constructor({id, attributes}: Partial<ApiHubs> = {}) {
        this.id = id;
        this.attributes = attributes;
    }
}

export default ApiHubs;
