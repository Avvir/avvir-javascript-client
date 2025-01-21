export class ApiObservationRequest {
  type_id: number;
  name: string;
  due_date: string;
  description: string;
  personal: string;
  priority: string;
  status: string;

  constructor({
                type_id,
                name,
                due_date,
                description,
                personal,
                priority,
                status
              }: Partial<ApiObservationRequest> = {}) {
    this.type_id = type_id!;
    this.name = name!;
    this.due_date = due_date!;
    this.description = description!;
    this.personal = personal!;
    this.priority = priority!;
    this.status = status!;
  }
}