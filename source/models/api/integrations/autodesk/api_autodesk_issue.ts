export class AutodeskIssue {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    constructor({title,description,status,priority,dueDate}: Partial<AutodeskIssue> = {}) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}

export default AutodeskIssue;


