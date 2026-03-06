export class ApiCoordinationIssueRequest {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    due_date?: string;
    assignee_id?: number;
    trade_id?: number;
    location_id?: number;
    issue_type?: string;

    constructor({
                    title,
                    description,
                    status,
                    priority,
                    due_date,
                    assignee_id,
                    trade_id,
                    location_id,
                    issue_type
                }: Partial<ApiCoordinationIssueRequest> = {}) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.due_date = due_date;
        this.assignee_id = assignee_id;
        this.trade_id = trade_id;
        this.location_id = location_id;
        this.issue_type = issue_type;
    }
}