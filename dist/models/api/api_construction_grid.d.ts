import ApiGridLine from "./api_grid_line";
export default class ApiConstructionGrid {
    constructor({ id, globalId, axisULines, axisVLines, firebaseFloorId }: Partial<ApiConstructionGrid>);
    readonly id: number | null;
    readonly globalId: string | null;
    axisULines: Array<ApiGridLine>;
    axisVLines: Array<ApiGridLine>;
    readonly firebaseFloorId: string | null;
}
