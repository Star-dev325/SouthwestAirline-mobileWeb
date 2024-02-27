import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import dayjs from 'dayjs';
import store2 from 'store2';
import StorageKeys from 'src/shared/helpers/storageKeys';

const getSearchRequest = (state) => _.get(state, 'app.airBooking.searchRequest');
const getPromoCodeApplied = (state) =>
  _.get(state, 'app.airBooking.flightShoppingPage.response.flightShoppingPage._meta.isPromoCodeApplied');
const getAirportInfo = (state) => _.get(state, 'app.airportInfo');
const getCorporateName = (state) => _.get(state, 'app.account.corporateInfo.selectedCompany.companyName', '');
const getCompanyId = (state) => _.get(state, 'app.account.corporateInfo.selectedCompany.companyId', '');

import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';

const { SHOPPING_SEARCH_HISTORY_STORE_KEY } = StorageKeys;

export const getSearch = createSelector(
  [getSearchRequest, getPromoCodeApplied, getAirportInfo, getCorporateName, getCompanyId],
  (searchRequest, isPromoCodeApplied, airportInfo, corporateName, companyId) => {
    const isSelectedOriginAirportCurrentLocation = !!_.get(airportInfo, 'originAirport.isCurrentLocation');
    const isSelectedDestinationAirportCurrentLocation = !!_.get(airportInfo, 'destinationAirport.isCurrentLocation');
    const {
      origin,
      destination,
      tripType,
      departureDate,
      returnDate,
      numberOfAdults,
      currencyType,
      promoCode,
      isInitialSearch
    } = searchRequest;
    let dateChange, departSign, departureDiff, returnDiff, returnSign;

    const localStorageRequests = store2.get(SHOPPING_SEARCH_HISTORY_STORE_KEY) || [];
    const prevDepartureDate = _.get(localStorageRequests[0], 'departureDate', '');
    const prevReturnDate = _.get(localStorageRequests[0], 'returnDate', '');
    const source = corporateName ? 'corporate_sales' : 'mobile_sales';
    const swabizUserRole = corporateName ? 'TRAVELER' : 'default';
    const getDepartureDiff = () => {
      if (prevDepartureDate) {
        departureDiff = dayjs(departureDate).diff(dayjs(prevDepartureDate), 'days');
        departSign = Math.sign(departureDiff) === 1 ? '+' : '';

        return `OUT ${departSign}${departureDiff}`;
      }
    };

    const getReturnDiff = () => {
      if (prevReturnDate) {
        returnDiff = dayjs(returnDate).diff(dayjs(prevReturnDate), 'days');
        returnSign = Math.sign(returnDiff) === 1 ? '+' : '';

        return `RTN ${returnSign}${returnDiff}`;
      }
    };

    if (isInitialSearch) {
      dateChange = 'initial search';
    } else if (departureDate && returnDate) {
      dateChange = `${getDepartureDiff()},${getReturnDiff()}`;
    } else {
      dateChange = getDepartureDiff();
    }

    window.setTimeout(() => {
      raiseSatelliteEvent('select flight calendar strip');
    });

    return {
      origin,
      destination,
      tripType,
      departureDate,
      returnDate,
      adults: numberOfAdults,
      currencyCode: currencyType,
      promoCode,
      promoCodeIsValid: isPromoCodeApplied,
      currentLocationUsed: isSelectedOriginAirportCurrentLocation || isSelectedDestinationAirportCurrentLocation,
      dateChange,
      companyId,
      swabizUserRole,
      source
    };
  }
);
