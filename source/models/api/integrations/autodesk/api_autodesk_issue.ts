export class AutodeskIssue {
    title: string;
    question: string;
    status: string;
    priority: string;
    dueDate: string;
    constructor({title,question,status,priority,dueDate}: Partial<AutodeskIssue> = {}) {
        this.title = title;
        this.question = question;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}

export default AutodeskIssue;


