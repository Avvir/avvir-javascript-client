import {expect} from "chai";

import {
  ApiImportProjectDataErrorResponse,
  isImportProjectDataError
} from "../../../source/models/api/api_import_project_data_error_response";
import { ImportErrorCategory } from "../../../source/models/api/import_error_category";
import { ImportErrorCode } from "../../../source/models/api/import_error_code";

describe("isImportProjectDataError", () => {
  it("returns true for a structured import-error body", () => {
    const body: ApiImportProjectDataErrorResponse = {
      message: "Import blocked",
      totalErrors: 2,
      rowsAffected: 2,
      errors: [{
        category: ImportErrorCategory.OBJECT,
        code: ImportErrorCode.OBJECT_NOT_FOUND,
        field: null,
        value: "OBJ-1",
        message: "No element exists with global id: OBJ-1",
        rows: [2, 3]
      }]
    };

    expect(isImportProjectDataError(body)).to.eq(true);
  });

  it("returns false for a plain { message } error body", () => {
    expect(isImportProjectDataError({ message: "some floor-level error" })).to.eq(false);
  });

  it("returns false for null or a non-object", () => {
    expect(isImportProjectDataError(null)).to.eq(false);
    expect(isImportProjectDataError("nope")).to.eq(false);
  });
});
