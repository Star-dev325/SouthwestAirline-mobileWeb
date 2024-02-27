import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import { ChooseMobileBoardingPassesPage } from 'src/checkIn/pages/chooseMobileBoardingPassesPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const flightsWithConnection = new CheckInConfirmationBuilder()
  .withPassengersByCount(2)
  .withViewPassengerBoardingPass()
  .withFlightWithConnection()
  .build().checkInConfirmationPage.flights;

const flights = new CheckInConfirmationBuilder()
  .withPassengersByCount(2)
  .withViewPassengerBoardingPass()
  .withFlights([
    {
      boundIndex: 0,
      gate: null,
      flightNumber: '123',
      hasWifi: true,
      travelTime: '0h 50m',
      departureTime: '11:11',
      originAirportCode: 'DAL',
      destinationAirportCode: 'PHX'
    }
  ])
  .build().checkInConfirmationPage.flights;

const flightWithLapInfants = new CheckInConfirmationBuilder().withLapInfants().withViewPassengerBoardingPass().build()
  .checkInConfirmationPage.flights;

const store = createMockedFormStore();

const props = {
  push: _.noop,
  updateViewBoardingPassFn: _.noop,
  viewAllBoardingPasses: {}
};

storiesOf('pages/checkIn/chooseMobileBoardingPassesPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <ChooseMobileBoardingPassesPage {...{ flights }} {...props} />;
  })
  .add('with connection', () => {
    return <ChooseMobileBoardingPassesPage {...{ flights: flightsWithConnection }} {...props} />;
  })
  .add('with lap infants', () => {
    return <ChooseMobileBoardingPassesPage {...{ flights: flightWithLapInfants }} {...props} />;
  })
  .add('with ineligible pax', () => {
    const flightsWithIneligiblePax = new CheckInConfirmationBuilder()
      .withPassengersByCount(2)
      .withViewPassengerBoardingPass()
      .withIneligibleViewPassengerBoardingPass(1)
      .withFlightWithConnection()
      .build().checkInConfirmationPage.flights;

    return <ChooseMobileBoardingPassesPage {...{ flights: flightsWithIneligiblePax }} {...props} />;
  });
