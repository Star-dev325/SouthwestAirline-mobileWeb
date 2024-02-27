// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getFlightDetails = (state) => state?.app?.sameDay?.sameDayShoppingPage?.sameDayFlightDetails;
const getMktgData = createMktgDataSelector('app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data');
const getShoppingPageCards = (state) => state?.app?.sameDay?.sameDayShoppingPage?.sameDayShoppingInformation?.cards;

export const sameDayFlightDetailsMktgSelector = createSelector(
  [getMktgData, getShoppingPageCards, getFlightDetails],
  (mktgData, cards, flightDetails) => {
    const flightIdentifierKeys = flightDetails && Object.keys(flightDetails);    
    const currentFlightIdentifier = flightIdentifierKeys && flightIdentifierKeys[flightIdentifierKeys.length-1];
    const currencyType = mktgData?.currency_type;
    const { confirmed_seats_left = '', standby_currentlistedseatcount = '' } =
      (flightDetails && flightDetails[currentFlightIdentifier]?.mktg_data) || {};
    const selectedFlight =
      cards && cards.find((card) => card?._links?.sameDayFlightDetails?.body?.flightIdentifier === currentFlightIdentifier);
    const { confirmed_message, standby_message } = selectedFlight?.mktg_data ?? {};

    return [
      {
        ...ANALYTICS.SHOPPING_PAGE,
        ...mktgData,
        ...selectedFlight?.mktg_data
      },
      'squid',
      {
        ...ANALYTICS.FLIGHT_DETAILS,
        ...selectedFlight?.mktg_data,
        sdcsb_parameters: `${currencyType}|${standby_message}|${standby_currentlistedseatcount}|${confirmed_message}|${confirmed_seats_left}`
      }
    ];
  }
);
