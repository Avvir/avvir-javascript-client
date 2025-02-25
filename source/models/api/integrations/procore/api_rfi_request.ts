export class ApiRfiRequest {
    assignee_id: number;
    subject: string;
    due_date: string;
    question: RfiQuestion;
    draft: boolean;
    personal: boolean;
    constructor({
                    assignee_id,
                    subject,
                    due_date,
                    question,
                    personal,
                    draft}: Partial<ApiRfiRequest> = {}) {
        this.assignee_id = assignee_id!;
        this.subject = subject!;
        this.due_date = due_date!;
        this.question = question!;
        this.personal = personal!;
        this.draft = draft!;
    }
}

class RfiQuestion {
    body: string;
}