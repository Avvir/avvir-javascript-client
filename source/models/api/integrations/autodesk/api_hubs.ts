export class attributes {
    name: string;
}

export class ApiHubs {
    id: string;
    name: attributes
    constructor({id, name}: Partial<ApiHubs> = {}) {
        this.id = id;
        this.name = name;
    }
}

export default ApiHubs;
