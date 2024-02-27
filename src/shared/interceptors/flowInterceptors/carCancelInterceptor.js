import _ from 'lodash';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';

const config = {
  name: 'carCancel',
  path: '/car/cancel'
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([cleanFlowInterceptor, redirectFlowInterceptor])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
