import _ from 'lodash';
import qs from 'qs';
import { param } from 'src/shared/helpers/urlHelper';

export const isFullUrl = (url) => /^https?:\/\//.test(url);

export const buildPathWithParamAndQuery = (path, params, query) => {
  const replaceParams = (halfPath) => (_.startsWith(halfPath, ':') ? params[halfPath.slice(1)] : halfPath);
  const search = param(query);

  if (!path) return path;

  const newRoutePath = _.chain(path).split('/').map(replaceParams).join('/').value();

  const hasQuestionMark = _.includes(newRoutePath, '?');

  if (_.isEmpty(search)) {
    return newRoutePath;
  } else if (hasQuestionMark) {
    return `${newRoutePath}&${search}`;
  } else {
    return `${newRoutePath}?${search}`;
  }
};

export const buildPathWithParamAndUniqueQuery = (path, params, query) => {
  params = (typeof params === 'object' && params !== null) ? params : {};
  query = (typeof query === 'object' && query !== null) ? query : {};

  const pathParamNames =
    path.includes(':')
      ? path.split('/').filter((part) => part.startsWith(':')).map((part) => part.slice(1))
      : [];

  const filteredQuery = Object.entries(query)
    .filter(([key]) => !pathParamNames.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});

  return buildPathWithParamAndQuery(path, params, filteredQuery);
};

export const transformSearchToQuery = (search) => {
  const queryString = _.startsWith(search, '?') ? search.slice(1) : search;

  return qs.parse(queryString);
};

export const buildPathWithQuery = (path, additionalQuery) => {
  const splitPath = _.split(path, '?');
  const basePath = _.head(splitPath);
  const search = _.nth(splitPath, 1);

  const existingQuery = transformSearchToQuery(search);
  const query = { ...existingQuery, ...additionalQuery };

  return buildPathWithParamAndQuery(basePath, null, query);
};

export const buildLocation = (url, params, query, state) => {
  const fullUrl = buildPathWithParamAndQuery(url, params, query);
  const splitUrl = _.split(fullUrl, '?');

  const pathname = _.head(splitUrl);
  const search =
    _.chain(splitUrl)
      .tail()
      .map((queryParams) => `?${queryParams}`)
      .head()
      .value() || '';

  return { pathname, search, state };
};
