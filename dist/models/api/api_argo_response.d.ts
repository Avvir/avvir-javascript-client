declare type ArgoMetadata = {
    name: string;
    generateName: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string;
};
export default class ApiArgoResponse {
    constructor({ name, generateName, namespace, selfLink, uid, resourceVersion, generation, creationTimestamp }?: Partial<ArgoMetadata>);
    metadata: ArgoMetadata;
}
export {};
