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
  static fromMatrix4ToString(matrix4?: Matrix4 | null): string | null {
    if (matrix4?.elements) {
      const [
        x1, y1, z1, w1,
        x2, y2, z2, w2,
        x3, y3, z3, w3,
        x4, y4, z4, w4
      ] = matrix4.elements;

      return `${x1} ${x2} ${x3} ${x4}
${y1} ${y2} ${y3} ${y4}
${z1} ${z2} ${z3} ${z4}
${w1} ${w2} ${w3} ${w4}`;
    } else {
      return null;
    }
  }

  static fromStringToMatrix4(matrixString: string): Matrix4 | null {
    const stringArray = this.convertMatrixStringToArray(matrixString);
    const matrix = this.convertStringsToNumbers(this.cleanupStrings(stringArray));
    if (matrix.length === 16) {
      const [x1, x2, x3, x4,
        y1, y2, y3, y4,
        z1, z2, z3, z4,
        w1, w2, w3, w4] = matrix;
      return new Matrix4().set(x1, x2, x3, x4,
        y1, y2, y3, y4,
        z1, z2, z3, z4,
        w1, w2, w3, w4);
    } else {
      return null;
    }
  }

  static fromApiMatrixToMatrix4(apiMatrix: ApiMatrix4 | null): Matrix4 | null {
    if (apiMatrix) {
      const {
        x1, y1, z1, w1,
        x2, y2, z2, w2,
        x3, y3, z3, w3,
        x4, y4, z4, w4
      } = apiMatrix;
      return new Matrix4().set(
        x1, x2, x3, x4,
        y1, y2, y3, y4,
        z1, z2, z3, z4,
        w1, w2, w3, w4
      );
    } else {
      return null;
    }
  }

  /** See note at top of file... */
  static fromMatrix4ToApiMatrix(matrix4: Matrix4 | null): ApiMatrix4 | null {
    if (matrix4) {
      const [
        x1, y1, z1, w1,
        x2, y2, z2, w2,
        x3, y3, z3, w3,
        x4, y4, z4, w4
      ] = matrix4.toArray();
      return new ApiMatrix4({
        x1, x2, x3, x4,
        y1, y2, y3, y4,
        z1, z2, z3, z4,
        w1, w2, w3, w4
      });
    } else {
      return null;
    }
  }
}
