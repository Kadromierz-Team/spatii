export const formatCompactDescription = (resourceDescription) => {
  const kind = resourceDescription.kind;
  const { env, resources } = resourceDescription.spec.containers[0];
  return {
    kind,
    env,
    resources,
  }
};
