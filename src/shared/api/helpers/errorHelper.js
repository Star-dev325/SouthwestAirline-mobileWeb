export const splitRequestIdIntoTokens = (requestId) => {
  let tokens = [];

  if (requestId) {
    tokens = requestId.split(':');
  }

  return tokens;
};
