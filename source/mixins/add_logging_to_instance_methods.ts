import {methods, without} from "underscore";

type Methods<Object, K extends keyof Object = keyof Object> = Object[K] extends Function ? K : never
export function addLoggingToInstanceMethods<Instance extends { [key: string]: ((_: any) => any) | any }>(instance: Instance, instanceName: string, ignoredMethods?: Methods<Instance>[]) {
  let instanceMethods = methods(instance);
  if (ignoredMethods) {
    instanceMethods = without(instanceMethods, ...ignoredMethods);
  }
  instanceMethods.forEach((methodName) => {
    if (!ignoredMethods.includes(methodName)) {
      const descriptor = Object.getOwnPropertyDescriptor(instance, methodName);
      if (!descriptor || descriptor.configurable) {
        const originalMethod: Function = instance[methodName];
        Object.defineProperty(instance, methodName, {
          value: (...args) => {
            console.log(`calling ${instanceName}.${methodName}(${args})`);
            return originalMethod.call(instance, ...args);
          },
          enumerable: true,
          configurable: false
        });
      }
    }
  });
}
