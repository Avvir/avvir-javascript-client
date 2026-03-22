export class ProcoreToolsPermissionsResponse {
    tools: ProcorePermissionTool[];
}

class ProcorePermissionTool {
    id: number;
    name: string;
    available_for_user: boolean;
    user_access_level: ProcorePermissionUserAccessLevel;
    permitted_actions: ProcorePermissionAction[];
}

class ProcorePermissionAction {
    id: number;
    action_name: string;
}

class ProcorePermissionUserAccessLevel {
    id: number;
    name: string;
}