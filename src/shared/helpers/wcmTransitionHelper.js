import _ from 'lodash';
import browser from 'src/shared/helpers/browserObject';
import { history } from 'src/appHistory';
import wcmAppLinks from 'src/shared/constants/wcmAppLinks';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { appendParamsIfChaseUrl } from 'src/airBooking/helpers/amcvCookieHelper';

const { APP, WEB_VIEW, BROWSER } = WcmLinkTypes;

const getWCMAppLinks = (appTarget) => {
  const [transitionKey, transitionKeySubPath] = appTarget.split('/');
  // MOB-116922: Clean up URL support for appTarget
  const route = _.startsWith(appTarget, '/') ? appTarget : wcmAppLinks[transitionKey];
  const routeObjectOrString = _.isFunction(route) ? route(transitionKeySubPath) : route;

  if (_.isPlainObject(routeObjectOrString)) {
    return buildPathWithParamAndQuery(routeObjectOrString.target, routeObjectOrString.param, routeObjectOrString.query);
  }

  return routeObjectOrString;
};

const transitionToApp = (appTarget) => {
  const route = getWCMAppLinks(appTarget);

  history.push(route);
};

const navigateTo = (target, newWindow) => {
  const url = appendParamsIfChaseUrl(target);

  if (newWindow) {
    browser.window.open(url, '_blank');
  } else {
    browser.window.location.href = url;
  }
};

export default (transitionData = {}) => {
  const { target, link_type, linkType, useWebViewLinkType } = transitionData;

  if (!target) {
    return;
  }

  switch (link_type || linkType) {
    case APP:
      transitionToApp(target);
      break;
    case WEB_VIEW:
      navigateTo(target);
      break;
    case BROWSER:
      navigateTo(target, !useWebViewLinkType);
      break;
  }
};
