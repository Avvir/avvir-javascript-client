declare type Methods<Object, K extends keyof Object = keyof Object> = Object[K] extends Function ? K : never;
declare const addLoggingToInstanceMethods: <Instance extends {
    [key: string]: any;
}>(instance: Instance, instanceName: string, ignoredMethods?: Methods<Instance, keyof Instance>[]) => void;
export default addLoggingToInstanceMethods;
