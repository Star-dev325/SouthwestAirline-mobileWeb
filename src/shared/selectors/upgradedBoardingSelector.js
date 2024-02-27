// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const isApplePayEnabled = (state: *) => state?.app?.toggles?.APPLE_PAY_FOR_UPGRADED_BOARDING;
const getApplePayAvailability = (state: *) => state?.app?.applePay?.applePayAvailability?.isAvailable;

export const getShouldShowApplePay = createSelector(
  [isApplePayEnabled, getApplePayAvailability],
  (applePayForUpgradedBoarding: boolean, applePayAvailability: boolean) =>
    applePayForUpgradedBoarding && applePayAvailability
);
