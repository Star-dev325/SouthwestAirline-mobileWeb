// @flow
import _ from 'lodash';
import React from 'react';

import 'intersection-observer';

import type { ElementRef } from 'src/shared/flow-typed/shared.types';
import { getQueryObject } from 'src/shared/helpers/urlHelper';

type Props = {
  viewPortThreshold: number,
  shouldObserveViewPort: boolean,
  observerCallback?: (additionalParams: {}) => void,
  pageId?: string,
  target?: string
};

const withViewPortObserver = (Component: *) => (props: Props) => {
  const [state, setState] = React.useState({ hasLoaded: false, hasSetObserver: false });

  const getFirmOfferAdditionalParams = () => {
    const { pageId = '', target = '' } = props;
    const additionalParams = { pageId, ...getQueryObject(target) };

    return additionalParams;
  };

  const _callback = (target: Array<IntersectionObserverEntry>) => {
    const { viewPortThreshold, observerCallback = _.noop, shouldObserveViewPort } = props;
    const { hasLoaded } = state;
    const entity = _.head(target) || {};
    const { isIntersecting, intersectionRatio = 0.0 } = entity;
    const hasBeenViewed = isIntersecting || intersectionRatio > viewPortThreshold;

    if (hasLoaded && shouldObserveViewPort && hasBeenViewed) {
      const additionalParams = getFirmOfferAdditionalParams();

      observerCallback(additionalParams);
    }
  };

  const _setObserver = (ref: ElementRef) => {
    const { viewPortThreshold } = props;
    const { hasLoaded, hasSetObserver } = state;

    if (ref && hasLoaded && !hasSetObserver) {
      const observer = new IntersectionObserver(_callback, { threshold: viewPortThreshold });

      observer.observe(ref);
      setState({ ...state, hasSetObserver: true });
    }
  };

  const _onLoad = () => {
    setState({ ...state, hasLoaded: true });
  };

  const restProps = _.omit(props, ['observerCallback', 'data-qa']);

  return (
    <div data-qa="observed-viewport" ref={_setObserver} onLoad={_onLoad}>
      <Component {...restProps} />
    </div>
  );
};

export default withViewPortObserver;
