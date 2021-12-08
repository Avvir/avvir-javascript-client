export type ArgoMetadata = {
  name: string
  generateName: string
  namespace: string
  selfLink: string
  uid: string
  resourceVersion: string
  generation: number
  creationTimestamp: string
}

export class ApiArgoResponse {
  constructor({ name, generateName, namespace, selfLink, uid, resourceVersion, generation, creationTimestamp }: Partial<ArgoMetadata> = {}) {
    this.metadata = {
      name,
      generateName,
      namespace,
      selfLink,
      uid,
      resourceVersion,
      generation,
      creationTimestamp
    };
  }

  metadata: ArgoMetadata;
}

export default ApiArgoResponse;
