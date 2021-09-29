import { Vector2Like } from "type_aliases";
export default class ApiGridLine {
    constructor({ name, point1, point2 }: Partial<ApiGridLine>);
    name: string | null;
    point1: Vector2Like | null;
    point2: Vector2Like | null;
}
