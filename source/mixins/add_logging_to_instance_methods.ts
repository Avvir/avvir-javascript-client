import _ from "underscore";

type Methods<Object, K extends keyof Object = keyof Object> = Object[K] extends Function ? K : never
const addLoggingToInstanceMethods = <Instance extends { [key: string]: ((_: any) => any) | any }>(instance: Instance, instanceName: string, ignoredMethods?: Methods<Instance>[]) => {
  let instanceMethods = _.methods(instance);
  if (ignoredMethods) {
    instanceMethods = _(instanceMethods).without(...ignoredMethods);
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
};

export default addLoggingToInstanceMethods;
