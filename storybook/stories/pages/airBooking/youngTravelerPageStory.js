import { storiesOf } from '@storybook/react';
import React from 'react';
import { YoungTravelerPage } from 'src/airBooking/pages/youngTravelerPage';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import { getPassengerValidationDetails } from 'test/builders/model/youngTravelerPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const defaultProps = {
  flightPricingPageBounds: new PricesBuilder().build().flightPricingPage.bounds,
  youngTravelerPageInfo: getPassengerValidationDetails().passengerValidationDetails.youngTraveler.youngTravelerPageInfo
};
const propsWithRoundTrip = {
  flightPricingPageBounds: new PricesBuilder().withRoundTrip().build().flightPricingPage.bounds,
  youngTravelerPageInfo: getPassengerValidationDetails().passengerValidationDetails.youngTraveler.youngTravelerPageInfo
};

storiesOf('pages/airBooking/youngTravelerPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <YoungTravelerPage {...defaultProps} />;
  })
  .add('with round trip', () => {
    return <YoungTravelerPage {...propsWithRoundTrip} />;
  })
  .add('with swabiz account', () => {
    return <YoungTravelerPage {...defaultProps}  selectedCompanyName='lexcorp'/>;
  });
