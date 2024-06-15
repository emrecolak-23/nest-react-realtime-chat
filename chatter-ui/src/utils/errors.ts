const extractErrorMessage = (err: any) => {
  const errorMessage =
    err.graphQLErrors?.[0]?.extensions.originalError.message || err.message;
  if (!errorMessage) return;
  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage.join(", "));
  }

  return formatErrorMessage(errorMessage);
};

const formatErrorMessage = (errorMessage: string) => {
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

export { extractErrorMessage };
