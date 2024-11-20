export type ApiBcfIssueArgument = Partial<ApiBcfIssue>;

export class ApiBcfIssue {
  constructor({plannedBuildingElementId, commentGuid, viewpointGuid, topicGuid}: ApiBcfIssueArgument = {}) {
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
