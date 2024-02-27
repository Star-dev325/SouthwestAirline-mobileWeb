/* globals
HttpMethod,
Link */
// Required because of https://github.com/gajus/eslint-plugin-flowtype/issues/84

declare type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

declare type Link = {
  href: string,
  xhref?: string,
  xphref?: string,
  method: HttpMethod,
  labelText?: string,
  query?: *,
  body?: *
};

export type Links = { [key: String]: Link };

declare type HistoryMatch = {
  params: ?*,
  isExact: boolean,
  path: string,
  url: string
};

declare type HistoryLocation = {
  pathname: string,
  search: string
};

declare type HistoryLocationWithState<T> = HistoryLocation & {
  state: T
};

declare type RouterHistoryObject = {
  push: (string, *) => void,
  replace: (string) => void,
  goBack: (string) => void
};

declare type Language = 'en';

declare type InterceptorContext = {
  store: *,
  next: *,
  action: *,
  history: *,
  interceptor?: (*) => *,
  flowConfig?: {
    name: string,
    entry: *,
    exit?: string,
    flowStatusGetter?: (*) => *,
    flowCleaner?: (*) => *
  }
};
