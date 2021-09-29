/** IMPORTANT!!
 *  Threejs Matrix4 stores matrices in column-major ordering.
 *  This means that using the `Matrix4#toArray` or looking at `Matrix4.elements`
 *  will return what appears to be a transposed version of the matrix.
 *
 *  However, the `Matrix4#set` method takes in elements in row-major order, so calling
 *  that method should look the same as in our other repositories.
 */
import { Matrix4 } from "three";
import ApiMatrix4 from "../models/api/api_matrix_4";
export default class Matrix4Converter {
    private static convertMatrixStringToArray;
    private static removeEmptyStrings;
    private static removeNonNumbers;
    private static cleanupStrings;
    private static convertStringsToNumbers;
    /** See note at top of file... */
    static fromMatrix4ToString(matrix4?: Matrix4 | null): string | null;
    static fromStringToMatrix4(matrixString: string): Matrix4 | null;
    static fromApiMatrixToMatrix4(apiMatrix: ApiMatrix4 | null): Matrix4 | null;
    /** See note at top of file... */
    static fromMatrix4ToApiMatrix(matrix4: Matrix4 | null): ApiMatrix4 | null;
}
