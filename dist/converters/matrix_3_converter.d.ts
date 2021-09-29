/** IMPORTANT!!
 *  Threejs Matrix3 stores matrices in column-major ordering.
 *  This means that using the `Matrix3#toArray` or looking at `Matrix3.elements`
 *  will return what appears to be a transposed version of the matrix.
 *
 *  However, the `Matrix3#set` method takes in elements in row-major order, so calling
 *  that method should look the same as in our other repositories.
 */
import { Matrix3 } from "three";
import ApiMatrix3 from "../models/api/api_matrix_3";
export default class Matrix3Converter {
    private static convertMatrixStringToArray;
    private static removeEmptyStrings;
    private static removeNonNumbers;
    private static cleanupStrings;
    private static convertStringsToNumbers;
    /** See note at top of file... */
    static fromMatrix3ToString(matrix3?: Matrix3 | null): string | null;
    static fromStringToMatrix3(matrixString: string): Matrix3 | null;
    static fromApiMatrix3ToMatrix3(apiMatrix: ApiMatrix3 | null): Matrix3 | null;
    /** See note at top of file... */
    static fromMatrix3ToApiMatrix3(matrix3: Matrix3 | null): ApiMatrix3 | null;
}
