const getSearchQuery = (search) => {
  const keys = Object.keys(search);
  const params = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(search[key])}`);

  return params.join('&');
};

export const buildNativeAppLink = (route, search) => {
  const shouldGenerateSearchQuery = typeof search === 'object' && Object.keys(search).length > 0;
  const searchQuery = shouldGenerateSearchQuery ? getSearchQuery(search) : '';
  const query = shouldGenerateSearchQuery ? `?${searchQuery}` : '';

  return `app://${route}${query}`;
};
