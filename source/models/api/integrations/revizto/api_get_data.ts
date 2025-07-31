export class ApiReviztoData {
    userEmail: string;
    hubs: Hub[];

    constructor({ userEmail, hubs }: Partial<ApiReviztoData> = {}) {
        this.userEmail = userEmail;
        this.hubs = hubs?.map((hub) => new Hub(hub)) || [];
    }
}

export class Hub {
    hubId: string;
    hubName: string;
    hubUuid: string;
    projects: Project[];

    constructor({ hubId, hubName, hubUuid, projects }: Partial<Hub> = {}) {
        this.hubId = hubId;
        this.hubName = hubName;
        this.hubUuid = hubUuid;
        this.projects = projects?.map((project) => new Project(project)) || [];
    }
}

export class Project {
    projectTitle: string;
    projectUuid: string;
    projectId: string;
    statuses: Status[];
    types: Type[];
    assignees: Assignee[];

    constructor({ projectTitle, projectUuid, projectId, statuses, types, assignees }: Partial<Project> = {}) {
        this.projectTitle = projectTitle;
        this.projectUuid = projectUuid;
        this.projectId = projectId;
        this.statuses = statuses?.map((status) => new Status(status)) || [];
        this.types = types?.map((type) => new Type(type)) || [];
        this.assignees = assignees?.map((assignee) => new Assignee(assignee)) || [];
    }
}

export class Status {
    statusName: string;
    statusUuid: string;

    constructor({ statusName, statusUuid }: Partial<Status> = {}) {
        this.statusName = statusName;
        this.statusUuid = statusUuid;
    }
}

export class Type {
    typeName: string;
    typeUuid: string;

    constructor({ typeName, typeUuid }: Partial<Type> = {}) {
        this.typeName = typeName;
        this.typeUuid = typeUuid;
    }
}

export class Assignee {
    assigneeEmail: string;
    asigneeUuid: string;

    constructor({ assigneeEmail, asigneeUuid }: Partial<Assignee> = {}) {
        this.assigneeEmail = assigneeEmail;
        this.asigneeUuid = asigneeUuid;
    }
}

export default ApiReviztoData;