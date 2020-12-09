const addReadOnlyPropertiesToModel = (modelInstance, properties) => {
  Object.getOwnPropertyNames(properties).forEach((propertyName) => {
    Object.defineProperty(modelInstance, propertyName, {
      value: properties[propertyName],
      writable: false,
      enumerable: true,
      configurable: false
    });
  });
};

export default addReadOnlyPropertiesToModel;
