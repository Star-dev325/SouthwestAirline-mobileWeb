import _ from 'lodash';
import { CALL_HISTORY_METHOD } from 'connected-react-router';
import { fetchEarlybirdPricing } from 'src/airBooking/actions/earlyBirdInPathActions';
import { DOLLAR } from 'src/shared/constants/moneyOrPoints';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

export default function earlyBirdPricingFetchMiddleware(store) {
  return (next) => (action) => {
    const { type, payload } = action;
    const state = store.getState();
    const earlyBirdPricing = _.get(
      state,
      'app.airBooking.flightPricingPage.response.flightPricingPage._links.earlyBirdPricing'
    );
    const earlyBirdPricingToken = _.get(state, 'app.airBooking.earlyBirdPricingToken', null);
    const passengerInfos = _.get(state, 'app.airBooking.passengerInfos');
    const pathname = _.get(state, 'router.location.pathname');

    const isBackFromPassengerEditPage = () =>
      _.get(payload, 'method') === 'goBack' && new RegExp('/air/booking/passengers/[0-9]/edit').test(pathname);

    if (
      type === CALL_HISTORY_METHOD &&
      earlyBirdPricing &&
      (_.get(payload, 'args.0') === getNormalizedRoute({ routeName: 'purchase' }) || isBackFromPassengerEditPage())
    ) {
      store
        .dispatch(fetchEarlybirdPricing(earlyBirdPricing, passengerInfos, DOLLAR.VALUE, earlyBirdPricingToken))
        .finally(() => next(action));
    } else {
      next(action);
    }
  };
}
