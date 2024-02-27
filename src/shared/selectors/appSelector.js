// @flow
import _ from 'lodash';
import BrowserObject from 'src/shared/helpers/browserObject';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import SharedConstants from 'src/shared/constants/sharedConstants';

const { APP_FLOWS } = SharedConstants;
const getApp = (state) => _.get(state, 'app');

export const getNeededAppState = createSelector([getApp], (app) => {
  const omittedProperties = [
    'spinner',
    'toggles',
    'errorHeader',
    'dialog',
    'wcmContent',
    'appReady',
    'applePay.applePayAvailability',
    'uplift.upliftAvailability'
  ];

  return _.omit(app, omittedProperties);
});

export const getCurrentAppFlow = (state: *) => {
  const { location } = BrowserObject;
  const isUpgrade = _.get(getApp(state), 'airChange.changePricingPage.response._meta.isUpgrade', false);

  if (isUpgrade && location.pathname.indexOf(APP_FLOWS.AIR_CHANGE) >= 0) return APP_FLOWS.AIR_UPGRADE;

  for (const path in APP_FLOWS) {
    if (location.pathname && location.pathname.indexOf(APP_FLOWS[path]) >= 0) return APP_FLOWS[path];
  }
};
