// @flow
import _ from 'lodash';
import ReactDOM from 'react-dom';

import type { HeaderRefsType } from 'src/shared/flow-typed/shared.types';

export const scrollToHeader = (headerReferences: HeaderRefsType) => (header: string) => {
  const element = _.get(headerReferences, header);

  const node = _.isElement(element) && ReactDOM.findDOMNode(element);

  node instanceof HTMLElement && node.scrollIntoView();
};

export const getAlphabet = (headers: Array<string>) => {
  const fullAlphabet = [...'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

  return _.chain(headers)
    .filter((header) => fullAlphabet.includes(header))
    .uniq()
    .value();
};
