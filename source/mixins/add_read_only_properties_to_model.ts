export function addReadOnlyPropertiesToModel(modelInstance: Object, properties: {[key: string]: any}) {
  Object.getOwnPropertyNames(properties).forEach((propertyName) => {
    Object.defineProperty(modelInstance, propertyName, {
      value: properties[propertyName],
      writable: false,
      enumerable: true,
      configurable: false
    });
  });
}

export default addReadOnlyPropertiesToModel;
