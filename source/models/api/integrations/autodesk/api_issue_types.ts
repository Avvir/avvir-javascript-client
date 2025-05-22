export class ApiIssueTypes {
  id: string;
  title: string;
  subtypes: Subtype[];

  constructor({ id, title, subtypes }: Partial<ApiIssueTypes> = {}) {
    this.id = id;
    this.title = title;
    this.subtypes = subtypes?.map((subtype) => new Subtype(subtype)) || [];
  }
}

export class Subtype {
  id: string;
  title: string;

  constructor({ id, title }: Partial<Subtype> = {}) {
    this.id = id;
    this.title = title;
  }
}

export default ApiIssueTypes;