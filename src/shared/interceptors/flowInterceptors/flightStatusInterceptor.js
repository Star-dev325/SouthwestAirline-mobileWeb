import _ from 'lodash';
import { isPagePath } from 'src/shared/helpers/interceptorHelpers';
import recentSearchRefreshInterceptor from 'src/shared/interceptors/recentSearchRefreshInterceptor';
import restartFlightStatusInterceptor from 'src/shared/interceptors/restartFlightStatusInterceptor';

const config = {
  name: 'flightStatus',
  path: '/flight-status',
  pages: {
    flightStatusLandingPage: '/flight-status',
    flightStatusRecentPage: '/flight-status/recent'
  }
};

const interceptor = (interceptorContext) =>
  _.cond([
    [isPagePath(config.pages.flightStatusLandingPage), restartFlightStatusInterceptor],
    [isPagePath(config.pages.flightStatusRecentPage), recentSearchRefreshInterceptor]
  ])(interceptorContext);

export default {
  ...config,
  interceptor
};
