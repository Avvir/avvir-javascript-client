export class ReviztoIssueFields {
    projectUuid: string;
    projectId: string;
    dueDate: string;
    priority: string;
    status: string;
    title: string;
    description: string;
    assignee: string;
    reporter: string;
    notify: string[];

    constructor({
                    projectUuid,
                    projectId,
                    dueDate,
                    priority,
                    status,
                    title,
                    description,
                    assignee,
                    reporter,
                    notify,
                }: Partial<ReviztoIssueFields> = {}) {
        this.projectUuid = projectUuid;
        this.projectId = projectId;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.reporter = reporter;
        this.notify = notify || [];
    }
}