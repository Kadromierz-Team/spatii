export const bindClassFunctions = classInstance => {
  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(classInstance))) {
    if (typeof classInstance[key] === 'function') {
      classInstance[key] = classInstance[key].bind(classInstance);
    }
  }
};
