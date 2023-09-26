import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";

export class ApiProjectWorkPackageCost{
    constructor({id, name, captured, planned, modeled}) {
        addReadOnlyPropertiesToModel(this, {id});
        this.name = name;
        this.captured = captured;
        this.planned = planned;
        this.modeled = modeled;
    }
    id: number;
    name: string;
    captured: number;
    planned: number;
    modeled: number;
}

export default ApiProjectWorkPackageCost;