import { Matrix4 } from "three";
import addInstantGetterAndSetterToApiModel from "../../mixins/add_instant_getter_and_setter_to_api_model";
import addReadOnlyPropertiesToModel from "../../mixins/add_read_only_properties_to_model";
import ApiMatrix4 from "./api_matrix_4";
import Matrix4Converter from "../../converters/matrix_4_converter";
import { DateLike, ModifyPartial } from "type_aliases";

export type ApiScanDatasetArgument = ModifyPartial<ApiScanDataset, {
  coarseAlignmentMatrix?: ApiMatrix4 | Matrix4 | string | null
  fineAlignmentMatrix?: ApiMatrix4 | Matrix4 | string | null
  scanDate?: DateLike,
  qaStarted?: DateLike,
  qaComplete?: DateLike,
  analysisCompleted?: DateLike,
  manualAnalysisSkipped?: DateLike,
  scanDateString?: string,
}>

export enum ApiScanDatasetQaState {
  NO_DATA = "NO_DATA",
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
}

export class ApiScanDataset {
  constructor({
                id,
                firebaseId,
                firebaseFloorId,
                scanNumber,
                dataPresences,
                analysisCompleted,
                manualAnalysisSkipped,
                notes,
                name,
                coarseAlignmentMatrix,
                fineAlignmentMatrix,
                scanDate,
                scanDateString,
                qaStarted,
                qaComplete,
                qaState,
                hasScanFile
              }: ApiScanDatasetArgument)
  {
    addInstantGetterAndSetterToApiModel(this, "scanDate", scanDate);
    addInstantGetterAndSetterToApiModel(this, "qaStarted", qaStarted);
    addInstantGetterAndSetterToApiModel(this, "qaComplete", qaComplete);
    addInstantGetterAndSetterToApiModel(this, "analysisCompleted", analysisCompleted);
    addInstantGetterAndSetterToApiModel(this, "manualAnalysisSkipped", manualAnalysisSkipped);
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
    this.notes = notes;
    this.name = name;
    this.scanDateString = scanDateString;
    this.qaState = qaState;
    this.hasScanFile = hasScanFile;
  }

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
  scanDate: number | null = null;
  /**
   * Date that the dataset was captured.
   */
  scanDateString: string | null = null;

  readonly analysisCompleted: number | null;
  readonly manualAnalysisSkipped: number | null;
  coarseAlignmentMatrix: ApiMatrix4 | null = null;
  fineAlignmentMatrix: ApiMatrix4 | null = null;
  dataPresences?: { scanAnalysis?: boolean };
  notes: string | null = null;
  name: string | null = null;
  readonly qaStarted: number | null = null;
  readonly qaComplete: number | null = null;
  /**
   * current QA/QC state based on qaStarted/qaComplete, calculated by the
   * gateway so the frontend doesn't need to replicate business logic
   */
  readonly qaState: ApiScanDatasetQaState = null;
  readonly hasScanFile?: boolean;
}

export default ApiScanDataset;
