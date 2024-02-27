import _ from 'lodash';

import propsEvent from 'src/shared/helpers/dom-whitelist/propsEvent';
import propsHtml from 'src/shared/helpers/dom-whitelist/propsHtml';

const ARIA_EXPRESSION = /^aria-[A-Za-z]+$/;

const isAriaProp = (name) => ARIA_EXPRESSION.test(name);
const isReactProp = (name) => name === 'key';
const isMaskedInputProp = (name) => name === 'mask' || name === 'maskChar' || name === 'formatChars';

export const filterDOMPropsWithMask = (props) =>
  _.omit(
    _.pickBy(
      props,
      (value, name) =>
        propsHtml[name] || propsEvent[name] || isAriaProp(name) || isReactProp(name) || isMaskedInputProp(name)
    ),
    'maxLength'
  );

export default (props) =>
  _.pickBy(props, (value, name) => propsHtml[name] || propsEvent[name] || isAriaProp(name) || isReactProp(name));
