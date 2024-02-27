// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { transformSearchToQuery, buildLocation } from 'src/shared/helpers/pathUtils';
import { push, replace, go, goBack, goForward } from 'connected-react-router';
import type { Push, Replace } from 'src/shared/flow-typed/shared.types';

type Props = {
  match: HistoryMatch & { params: * },
  location: HistoryLocation,
  push: Push,
  replace: Replace
};

const withConnectedReactRouter = (Comp: *) => {
  function _getDirectionParam(direction) {
    if (direction === 'depart') {
      return 'outbound';
    } else if (direction === 'return') {
      return 'inbound';
    } else {
      return direction;
    }
  }

  function _withConnectedReactRouter(props: Props) {
    const { match, push: pushFn, replace: replaceFn, ...restProps } = props;
    const { location } = props;
    let { params } = match ?? {};
    const query = transformSearchToQuery(location?.search);

    const directionParam = params?.direction;

    if (directionParam) {
      params = {
        ...params,
        direction: _getDirectionParam(directionParam)
      };
    }

    return (
      <Comp
        params={params}
        query={query}
        push={(...args) => pushFn(buildLocation(...args))}
        replace={(...args) => replaceFn(buildLocation(...args))}
        {...restProps}
      />
    );
  }

  return _.flowRight(
    connect(() => ({}), {
      push,
      replace,
      go,
      goBack,
      goForward
    })
  )(_withConnectedReactRouter);
};

export default withConnectedReactRouter;
