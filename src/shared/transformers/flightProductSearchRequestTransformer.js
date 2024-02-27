// @flow
import _ from 'lodash';
import { formatDate } from 'src/shared/helpers/dateHelper';
import TripTypes from 'src/shared/constants/tripTypes';
import { dispatchHideDialog } from 'src/shared/helpers/dialogHelper';

import i18n from '@swa-ui/locale';
import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';

import type {
  FlightProductSearchRequest,
  ChapiFlightProductSearchRequest,
  AirBookingShoppingSearchFormDataType
} from 'src/airBooking/flow-typed/airBooking.types';

type ErrorType = {
  responseJSON: {
    code: number,
    message: string
  }
};
type SearchRequest = { origin: string, destination: string, departureDate: string };

export const transformFromFormDataToSearchRequest = (formData: AirBookingShoppingSearchFormDataType): * => {
  const { departureAndReturnDate, tripType, ...restFormData } = formData;

  return {
    ...restFormData,
    ...departureAndReturnDate,
    tripType,
    isRoundTrip: tripType === TripTypes.ROUND_TRIP.value
  };
};

export const transformToAPIRequest = (searchRequestData: FlightProductSearchRequest): Link => {
  let departureDate = '';
  let returnDate = '';

  if (searchRequestData.departureDate && searchRequestData.returnDate) {
    departureDate = formatDate(searchRequestData.departureDate, 'YYYY-MM-DD');
    returnDate = formatDate(searchRequestData.returnDate, 'YYYY-MM-DD');
  } else if (searchRequestData.departureDate) {
    departureDate = formatDate(searchRequestData.departureDate, 'YYYY-MM-DD');
  } else if (searchRequestData.returnDate) {
    departureDate = formatDate(searchRequestData.returnDate, 'YYYY-MM-DD');
  }

  const apiRequest: ChapiFlightProductSearchRequest = {
    'origination-airport': searchRequestData.origin ? searchRequestData.origin : '',
    'destination-airport': searchRequestData.destination ? searchRequestData.destination : '',
    'departure-date': departureDate,
    'number-adult-passengers': searchRequestData.numberOfAdults ? searchRequestData.numberOfAdults : 0,
    currency: searchRequestData.currencyType
  };

  if (searchRequestData.promoCode) {
    apiRequest['promo-code'] = searchRequestData.promoCode;
  }

  if (returnDate) {
    apiRequest['return-date'] = returnDate;
  }

  if (searchRequestData.numberOfLapInfants) {
    apiRequest['number-lap-infant-passengers'] = searchRequestData.numberOfLapInfants;
  }

  return {
    href: '',
    method: 'GET',
    query: apiRequest
  };
};

const getNonHawaiiIncludedOptions = (
  searchRequest: SearchRequest,
  nonHawaiiNoRoutesErrorMessages: *,
  afterDialogHandler?: () => void
) => {
  const { origin, destination, departureDate } = searchRequest;
  const learnMoreLink = {
    label: i18n('SHARED__BUTTON_TEXT__LEARN_MORE'),
    href: `https://www.southwest.com/air/flight-schedules/?destinationAirportCode=${destination}&originationAirportCode=${origin}&departureDate=${departureDate}`,
    isExternal: true,
    onClick: () => dispatchHideDialog().then(afterDialogHandler)
  };

  return {
    title: _.get(nonHawaiiNoRoutesErrorMessages, 'title', i18n('AIR_BOOKING__NO_ROUTES__POPUP_TITLE')),
    message: _.get(nonHawaiiNoRoutesErrorMessages, 'message', i18n('AIR_BOOKING__NO_ROUTES__POPUP_MESSAGE')),
    name: 'no-routes-non-hawaii-error',
    verticalLinks: {
      links: [learnMoreLink]
    }
  };
};

export const transformToNoRoutesErrorDialogOptions = (
  error: ErrorType,
  searchRequest: SearchRequest,
  nonHawaiiNoRoutesErrorMessages?: *,
  okHandlerFn?: (resp: *) => *,
  afterDialogHandler?: () => void
) => {
  const commonOptions = {
    active: true,
    closeLabel: i18n('SHARED__BUTTON_TEXT__OK'),
    closeLabelStyle: PRIMARY,
    error,
    onClose: () =>
      dispatchHideDialog().then((resp) => {
        okHandlerFn && okHandlerFn(resp);
        afterDialogHandler && afterDialogHandler();
      })
  };

  return _.merge(
    commonOptions,
    getNonHawaiiIncludedOptions(searchRequest, nonHawaiiNoRoutesErrorMessages, afterDialogHandler)
  );
};
