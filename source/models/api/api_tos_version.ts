import {DateLike} from "type_aliases";

export class ApiTosVersion {
    id: number
    createdAt: DateLike
    content: string

    constructor({ id, createdAt, content }: Partial<ApiTosVersion> = {}) {
        this.id = id;
        this.createdAt = createdAt;
        this.content = content;
    }
}
