import type { ImportErrorCategory } from "./import_error_category";
import type { ImportErrorCode } from "./import_error_code";

export type ApiImportError = {
  category: ImportErrorCategory
  code: ImportErrorCode
  field: string | null
  value: string | null
  message: string
  rows: number[]
}

export type ApiImportProjectDataErrorResponse = {
  message: string
  totalErrors: number
  rowsAffected: number
  errors: ApiImportError[]
}

export function isImportProjectDataError(value: unknown): value is ApiImportProjectDataErrorResponse {
  if (value == null || typeof value !== "object") {
    return false;
  }
  const candidate = value as Partial<ApiImportProjectDataErrorResponse>;
  return typeof candidate.totalErrors === "number"
    && typeof candidate.rowsAffected === "number"
    && Array.isArray(candidate.errors);
}
