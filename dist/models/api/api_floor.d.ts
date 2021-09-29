import ApiConstructionGrid from "./api_construction_grid";
import { DateLike, Matrix3Like, Modify, Vector2Like } from "type_aliases";
import ApiMatrix3 from "./api_matrix_3";
interface ApiFloorArgument extends Partial<Modify<ApiFloor, {
    scanDate?: DateLike;
    photoAreaMinimapPixelToBimMinimapPixel?: Matrix3Like;
    bimMinimapToWorld?: Matrix3Like;
}>> {
}
export default class ApiFloor {
    constructor({ id, firebaseId, ordinal, floorNumber, defaultFirebaseScanDatasetId, firebaseProjectId, firebaseScanDatasetIds, constructionGrid, plannedElementCount, scanDate, photoAreaId, offset, photoAreaMinimapPixelToBimMinimapPixel, bimMinimapToWorld, floorElevation }?: ApiFloorArgument);
    /**
     * Internal identifier, not used in URLs.
     */
    readonly id: number;
    /**
     * External identifier, suitable for use in URLs.
     */
    readonly firebaseId: string;
    /**
     * External identifier of the project that this area belongs to.
     */
    readonly firebaseProjectId: string;
    /**
     * Ordinal number to sort this area by when showing all of the areas in a project.
     */
    ordinal: number;
    /**
     * The name or title of this area.
     */
    floorNumber: string;
    /**
     * External identifier of the default capture dataset associated with this area.
     */
    defaultFirebaseScanDatasetId: string;
    /**
     * An array of external identifiers of the capture datasets associated with this area.
     */
    firebaseScanDatasetIds: Array<string>;
    constructionGrid: ApiConstructionGrid | null;
    plannedElementCount: number | null;
    scanDate: number | null;
    readonly offset: Vector2Like;
    photoAreaId: number | null;
    photoAreaMinimapPixelToBimMinimapPixel: ApiMatrix3 | null;
    bimMinimapToWorld: ApiMatrix3 | null;
    floorElevation: number | null;
}
export {};
