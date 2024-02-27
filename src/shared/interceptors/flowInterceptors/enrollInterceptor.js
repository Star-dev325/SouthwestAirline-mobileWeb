import _ from 'lodash';
import routeFlowConfigGetter from 'src/shared/interceptors/routeFlowConfigGetter';
import cleanFlowInterceptor from 'src/shared/interceptors/cleanFlowInterceptor';
import redirectFlowInterceptor from 'src/shared/interceptors/redirectFlowInterceptor';
import enrollConfirmationPageRefreshInterceptor from 'src/shared/interceptors/enrollConfirmationPageRefreshInterceptor';

const config = {
  name: 'enroll',
  path: '/enroll',
  normalizedPath: '/account/enroll',
  page: {
    enrollConfirmationPage: '/enroll/confirmation'
  }
};

const interceptor = (interceptorContext) => {
  const { store } = interceptorContext;
  const flowConfig = _.get(routeFlowConfigGetter(store), `${config.name}.flowConfig`, {});

  return _.someExecute([
    enrollConfirmationPageRefreshInterceptor(config.page.enrollConfirmationPage),
    cleanFlowInterceptor,
    redirectFlowInterceptor
  ])({ ...interceptorContext, flowConfig });
};

export default {
  ...config,
  interceptor
};
