export class Trade {
    id: number;
    name: string
    active: boolean;

    constructor({
                    id,
                    name,
                    active
                }: Partial<Trade> = {}) {
        this.id = id!;
        this.name = name!;
        this.active = active!;
    }
}