// @flow
import _ from 'lodash';
import type { FlightPricingBound } from 'src/shared/flow-typed/shared.types';
import { getConfirmationPageContent } from 'src/shared/selectors/alternativeFormsOfPaymentSelector';

export const getPageHeaderSubtitle = (bounds: Array<FlightPricingBound>) => {
  const isOneWay = bounds.length === 1;
  const isRoundTrip = bounds.length === 2;

  if (isOneWay) {
    const { departureAirport, arrivalAirport } = bounds[0];

    return `${departureAirport.code} - ${arrivalAirport.code}`;
  }

  if (isRoundTrip) {
    const { departureAirport, arrivalAirport } = bounds[0];

    return `${departureAirport.code} - ${arrivalAirport.code} (Round Trip)`;
  }

  return '';
};

const changeConfirmationResponse = (state) => _.get(state, 'app.airChange.changeConfirmationPage.response');

export const getChangeConfirmationPageResponse = getConfirmationPageContent(changeConfirmationResponse);
