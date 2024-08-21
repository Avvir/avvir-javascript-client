export default class ApiTrade {
  constructor({ code, parentCode, title, workPackageId, childCodes }: Partial<ApiTrade> = {}) {
    this.code = code;
    if (parentCode) {
      this.parentCode = parentCode;
    }
    this.title = title;
    this.workPackageId = workPackageId;
    this.childCodes = childCodes || [];
  }

  readonly code: string;
  parentCode: string;
  title: string;
  workPackageId: number;
  childCodes: string[];
}
