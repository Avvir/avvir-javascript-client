import {ApiDetailedElement} from "./api_detailed_element";
import {ApiBcfIssue} from "./api_bcf_issue";

export type ApiBcfBuildingElementArgs = Partial<ApiBcfBuildingElement>;

export class ApiBcfBuildingElement {
  constructor({bcfIssue, detailedElement}: ApiBcfBuildingElementArgs = {}) {
    this.detailedElement = detailedElement;
    this.bcfIssue = bcfIssue;
  }

  detailedElement: ApiDetailedElement;
  bcfIssue: ApiBcfIssue;
}
