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
  private static convertMatrixStringToArray(matrixString: string): string[] {
    return matrixString.split("\n").join(" ").split(" ");
  }

  private static removeEmptyStrings(matrix: string[]): string[] {
    return matrix.filter(string => string !== "");
  }

  private static removeNonNumbers(matrix: string[]): string[] {
    return matrix.filter(string => parseFloat(string).toString(10) === string);
  }

  private static cleanupStrings(matrix) {
    return this.removeNonNumbers(this.removeEmptyStrings(matrix));
  }

  private static convertStringsToNumbers(stringValues: string[]): number[] {
    return stringValues.map(stringValue => parseFloat(stringValue));
  }

  /** See note at top of file... */
  static fromMatrix3ToString(matrix3?: Matrix3 | null): string | null {
    if (matrix3?.elements) {
      const [
        x1, y1, z1,
        x2, y2, z2,
        x3, y3, z3,
      ] = matrix3.elements;

      return `${x1} ${x2} ${x3}
${y1} ${y2} ${y3}
${z1} ${z2} ${z3}`;
    } else {
      return null;
    }
  }

  static fromStringToMatrix3(matrixString: string): Matrix3 | null {
    const stringArray = this.convertMatrixStringToArray(matrixString);
    const matrix = this.convertStringsToNumbers(this.cleanupStrings(stringArray));
    if (matrix.length === 9) {
      const [x1, x2, x3,
        y1, y2, y3,
        z1, z2, z3] = matrix;
      return new Matrix3().set(x1, x2, x3,
        y1, y2, y3,
        z1, z2, z3);
    } else {
      return null;
    }
  }

  static fromApiMatrix3ToMatrix3(apiMatrix: ApiMatrix3 | null): Matrix3 | null {
    if (apiMatrix) {
      const {
        x1, y1, z1,
        x2, y2, z2,
        x3, y3, z3
      } = apiMatrix;
      return new Matrix3().set(
        x1, x2, x3,
        y1, y2, y3,
        z1, z2, z3
      );
    } else {
      return null;
    }
  }

  /** See note at top of file... */
  static fromMatrix3ToApiMatrix3(matrix3: Matrix3 | null): ApiMatrix3 | null {
    if (matrix3) {
      const [
        x1, y1, z1,
        x2, y2, z2,
        x3, y3, z3,
      ] = matrix3.toArray();
      return new ApiMatrix3({
        x1, x2, x3,
        y1, y2, y3,
        z1, z2, z3
      });
    } else {
      return null;
    }
  }
}
