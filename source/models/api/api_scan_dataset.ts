import { Matrix4 } from "three";
import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import ApiMatrix4 from "./api_matrix_4";
import Matrix4Converter from "../../converters/matrix_4_converter";
import { DateLike, Modify } from "type_aliases";

interface ApiScanDatasetArgument extends Partial<Modify<ApiScanDataset, {
  coarseAlignmentMatrix?: ApiMatrix4 | Matrix4 | string | null
  fineAlignmentMatrix?: ApiMatrix4 | Matrix4 | string | null
  scanDate?: DateLike
}>> {}

export default class ApiScanDataset {
  constructor({
    id,
    firebaseId,
    firebaseFloorId,
    scanNumber,
    dataPresences,
    notes,
    name,
    coarseAlignmentMatrix,
    fineAlignmentMatrix,
    scanDate
  }: ApiScanDatasetArgument) {
    addInstantGetterAndSetterToApiModel(this, "scanDate");
    addReadOnlyPropertiesToModel(this, { id, firebaseId, firebaseFloorId, scanNumber });
    let coarseAlignmentMatrixVal, fineAlignmentMatrixVal;
    Object.defineProperties(this, {
      coarseAlignmentMatrix: {
        get() {
          return coarseAlignmentMatrixVal;
        },
        set(val) {
          if (typeof val === "string") {
            coarseAlignmentMatrixVal = Matrix4Converter.fromMatrix4ToApiMatrix(Matrix4Converter.fromStringToMatrix4(val));
          } else if (val instanceof Matrix4) {
            coarseAlignmentMatrixVal = Matrix4Converter.fromMatrix4ToApiMatrix(val);
          } else {
            coarseAlignmentMatrixVal = val;
          }
        },
        enumerable: true
      },
      fineAlignmentMatrix: {
        get() {
          return fineAlignmentMatrixVal;
        },
        set(val) {
          if (typeof val === "string") {
            fineAlignmentMatrixVal = Matrix4Converter.fromMatrix4ToApiMatrix(Matrix4Converter.fromStringToMatrix4(val));
          } else if (val instanceof Matrix4) {
            fineAlignmentMatrixVal = Matrix4Converter.fromMatrix4ToApiMatrix(val);
          } else {
            fineAlignmentMatrixVal = val;
          }
        },
        enumerable: true
      }
    });
    // @ts-ignore
    this.coarseAlignmentMatrix = coarseAlignmentMatrix || null;
    // @ts-ignore
    this.fineAlignmentMatrix = fineAlignmentMatrix || null;
    if (dataPresences) {
      this.dataPresences = dataPresences;
    }
    this.notes = notes || null;
    this.name = name || null;
    // @ts-ignore
    this.scanDate = scanDate;
  }

  readonly id: number;
  readonly firebaseId: string;
  readonly firebaseFloorId: string;
  readonly scanNumber: number;
  coarseAlignmentMatrix: ApiMatrix4 | null = null;
  fineAlignmentMatrix: ApiMatrix4 | null = null;
  dataPresences?: { scanAnalysis?: boolean };
  notes: string | null = null;
  name: string | null = null;
  scanDate: number | null = null;
}
