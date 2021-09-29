import { Matrix4 } from "three";
import ApiMatrix4 from "./api_matrix_4";
import { DateLike, Modify } from "type_aliases";
interface ApiScanDatasetArgument extends Partial<Modify<ApiScanDataset, {
    coarseAlignmentMatrix?: ApiMatrix4 | Matrix4 | string | null;
    fineAlignmentMatrix?: ApiMatrix4 | Matrix4 | string | null;
    scanDate?: DateLike;
}>> {
}
export default class ApiScanDataset {
    constructor({ id, firebaseId, firebaseFloorId, scanNumber, dataPresences, notes, name, coarseAlignmentMatrix, fineAlignmentMatrix, scanDate }: ApiScanDatasetArgument);
    /**
     * Internal identifier, not used in URLs.
     */
    readonly id: number;
    /**
     * External identifier, suitable for use in URLs.
     */
    readonly firebaseId: string;
    /**
     * External identifier of the area that this Capture Dataset belongs to.
     */
    readonly firebaseFloorId: string;
    /**
     * Ordinal number for sorting datasets when showing a list of datasets associated with an area.
     */
    readonly scanNumber: number;
    /**
     * Date that the dataset was captured.
     */
    scanDate: number | null;
    coarseAlignmentMatrix: ApiMatrix4 | null;
    fineAlignmentMatrix: ApiMatrix4 | null;
    dataPresences?: {
        scanAnalysis?: boolean;
    };
    notes: string | null;
    name: string | null;
}
export {};
