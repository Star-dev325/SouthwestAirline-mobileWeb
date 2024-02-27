import _ from 'lodash';
import { getContactMethodContent } from 'src/shared/selectors/contactMethodSelectors';

const getAirChangeContactMethodInfo = (state) => _.get(state, 'app.airChange.contactMethodInfo');

export const getAirChangeContactMethodContent = getContactMethodContent(getAirChangeContactMethodInfo);

export const getSearchRequest = (state) =>
  (_.get(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false)
    ? _.get(state, 'app.airUpgrade.upgradeSelectBoundsPage.searchRequest')
    : _.get(state, 'app.airChange.changeShoppingPage.searchRequest'));