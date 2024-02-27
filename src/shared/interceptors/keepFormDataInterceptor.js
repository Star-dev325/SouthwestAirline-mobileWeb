// @flow
import _ from 'lodash';

import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import { buildPathWithParamAndQuery, transformSearchToQuery } from 'src/shared/helpers/pathUtils';

const keepFormDataInterceptor = (interceptorContext: InterceptorContext): InterceptorContext => {
  const { action, history, store } = interceptorContext;
  const currentState = _.get(action, 'payload.location');
  const currentStateQuery = transformSearchToQuery(_.get(currentState, 'search'));
  const { persistentHistory } = store.getState();
  const previousState = getCurrentRouteState(persistentHistory);
  const currentPathname = _.get(currentState, 'pathname');
  const previousPathname = _.get(previousState, 'pathname');

  const isComingFromHamburgerMenu =
    _.get(history, 'action') === 'PUSH' && _.get(currentStateQuery, 'cleanFlow') === 'true';
  const isPagePathNotChanged = currentPathname === previousPathname;

  if (_.get(currentStateQuery, 'clearFormData') !== 'false' && isComingFromHamburgerMenu && isPagePathNotChanged) {
    return {
      interceptor() {
        history.replace(
          buildPathWithParamAndQuery(currentPathname, null, {
            ...currentStateQuery,
            clearFormData: false
          })
        );
      },
      ...interceptorContext
    };
  }

  return interceptorContext;
};

export default keepFormDataInterceptor;
