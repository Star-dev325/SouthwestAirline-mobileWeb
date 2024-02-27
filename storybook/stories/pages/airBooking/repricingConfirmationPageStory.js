import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { RepricingConfirmationPage } from 'src/airBooking/pages/repricingConfirmationPage';
import byDollar from 'mocks/templates/price/byDollar';
import byPoints from 'mocks/templates/price/byPointsWithReprice';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const props = {
  findFlightProducts: _.noop,
  searchForFlightsFn: _.noop,
  push: _.noop
};
const corporateProps = {
  selectedCompanyName: 'Some long name to show ellipsis instead of the whole company name on the header'
};
const store = createMockedFormStore();

storiesOf('pages/airBooking/repricingConfirmation', module)
  .addDecorator(StoryReduxProvider(store))
  .add('dollar', () => {
    return (
      <RepricingConfirmationPage
        flightPricingPage={{
          response: byDollar
        }}
        searchRequest={{
          numberOfAdults: 1,
          currencyType: 'USD',
          departureDate: '2017-11-10',
          destination: 'CLT',
          isRoundTrip: true,
          origin: 'AUS',
          returnDate: '2017-11-13',
          tripType: 'roundTrip',
          promoCode: ''
        }}
        {...props}
      />
    );
  })
  .add('points', () => {
    return (
      <RepricingConfirmationPage
        flightPricingPage={{
          response: byPoints
        }}
        searchRequest={{
          numberOfAdults: 1,
          currencyType: 'PTS',
          departureDate: '2017-11-10',
          destination: 'CLT',
          isRoundTrip: true,
          origin: 'AUS',
          returnDate: '2017-11-13',
          tripType: 'roundTrip',
          promoCode: ''
        }}
        {...props}
      />
    );
  })
  .add('corporateBooking', () => {
    return (
      <RepricingConfirmationPage
        flightPricingPage={{
          response: byDollar
        }}
        searchRequest={{
          numberOfAdults: 1,
          currencyType: 'USD',
          departureDate: '2017-11-10',
          destination: 'CLT',
          isRoundTrip: true,
          origin: 'AUS',
          returnDate: '2017-11-13',
          tripType: 'roundTrip',
          promoCode: ''
        }}
        {...props}
        {...corporateProps}
      />
    );
  });
