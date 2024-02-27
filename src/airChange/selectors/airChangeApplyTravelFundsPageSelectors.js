import _ from 'lodash';

export const isUpgradeFlow = (state) => _.get(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false);

export const getChangePricingPageLink = (state) => {
  const isUpgrade = isUpgradeFlow(state);

  return isUpgrade
    ? _.get(state, 'app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage._links.changePricingPage')
    : _.get(state, 'app.airChange.changeShoppingPage.response._links.changePricingPage');
};
