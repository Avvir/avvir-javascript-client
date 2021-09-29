export default class ApiPhotoArea {
    constructor({ name, id, firebaseProjectId, structionsiteProjectUrl }: Partial<ApiPhotoArea>);
    readonly id: number;
    readonly firebaseProjectId: string;
    name: string;
    structionsiteProjectUrl: string;
}
