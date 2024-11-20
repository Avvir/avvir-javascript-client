import type { ApiBcfIssue } from "./api_bcf_issue";
import type { ApiDetailedElement } from "./api_detailed_element";

export type ApiBcfBuildingElementArgument = Partial<ApiBcfBuildingElement>;

export class ApiBcfBuildingElement {
  constructor({ bcfIssue, detailedElement }: ApiBcfBuildingElementArgument = {}) {
    this.detailedElement = detailedElement;
    this.bcfIssue = bcfIssue;
  }

  detailedElement: ApiDetailedElement;
  bcfIssue: ApiBcfIssue;
}
