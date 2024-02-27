import _ from 'lodash';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import standbyRedirectFlowInterceptor from 'src/shared/interceptors/standbyRedirectFlowInterceptor';

const config = {
  name: 'standby',
  path: '/standby'
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([
    cleanFlowInterceptor,
    standbyRedirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
