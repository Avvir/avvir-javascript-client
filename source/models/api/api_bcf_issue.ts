export type ApiBcfIssueArgs = Partial<ApiBcfIssue>;

export class ApiBcfIssue {
  constructor({plannedBuildingElementId, commentGuid, viewpointGuid, topicGuid}: ApiBcfIssueArgs = {}) {
    this.plannedBuildingElementId = plannedBuildingElementId;
    this.commentGuid = commentGuid;
    this.topicGuid = topicGuid;
    this.viewpointGuid = viewpointGuid;
  }

  plannedBuildingElementId: number;
  topicGuid: string;
  commentGuid: string;
  viewpointGuid: string;
}
