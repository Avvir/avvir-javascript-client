export class Location {
    id: number;
    node_name: string;
    parent_id?: number;

    constructor({
                    id,
                    node_name,
                    parent_id
                }: Partial<Location> = {}) {
        this.id = id!;
        this.node_name = node_name!;
        this.parent_id = parent_id;
    }
}