import { storiesOf } from '@storybook/react';
import React from 'react';

import { BoardingPositionsPage } from 'src/checkIn/pages/boardingPositionsPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { upgradedBoarding } from 'mocks/flexPlacement/checkinConfirmationPagePlacements';
import checkInConfirmationPage from 'mocks/templates/checkIn/checkinPassenger';
import FooterWithLinksBuilder from 'test/builders/model/footerWithLinksBuilder';

const EnhancedBoardingPositionsPage = withBodyClass(['hide-header', 'checkin-confirmation-bg'])(BoardingPositionsPage);
const flights = new CheckInConfirmationBuilder()
  .withDepartureTime('18:12')
  .withCheckInIneligibilityReason('MBP_UNAVAILABLE_INTL')
  .build().checkInConfirmationPage.flights;
const { footerWithLinks } = new FooterWithLinksBuilder().withMultipleLinks().build();

const props = {
  checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: null },
  flights,
  footerWithLinks,
  viewAllBoardingPassesLink: null,
  viewReservationSearchRequest: {
    firstName: 'bob',
    lastName: 'builder',
    recordLocator: '12345s'
  }
};

const store = configureMockStore()({});

const {
  checkInConfirmationPage: { contactInformationMessage }
} = checkInConfirmationPage;

const checkInConfirmationPagePlacementsMock = { checkInConfirmationPromoTop01: upgradedBoarding };

storiesOf('pages/checkIn/boardingPositionsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedBoardingPositionsPage {...props} />;
  })
  .add('view all boarding passes button', () => {
    const flights = new CheckInConfirmationBuilder()
      .withFlights([
        {
          boundIndex: 0,
          gate: null,
          passengers: null,
          flightNumber: '123',
          hasWifi: true,
          travelTime: '0h 50m'
        }
      ])
      .withDepartureTime('18:12')
      .withPassengersByCount(3)
      .withViewPassengerBoardingPass()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights,
      viewAllBoardingPassesLink: { some: 'value' },
      checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01: null }
    };
    return <EnhancedBoardingPositionsPage {...props} {...newProps} />;
  })
  .add('view edit contact method message link', () => {
    const newProps = {
      contactInformationMessage
    };
    return <EnhancedBoardingPositionsPage {...props} {...newProps} />;
  })
  .add('with upgrading boarding placement', () => {
    const newProps = {
      viewUpgradedBoarding: true,
      checkInConfirmationPagePlacements: checkInConfirmationPagePlacementsMock
    };
    return <EnhancedBoardingPositionsPage {...props} {...newProps} />;
  })
  .add('without upgrading boarding placement', () => {
    const newProps = {
      viewUpgradedBoarding: false,
      checkInConfirmationPagePlacements: checkInConfirmationPagePlacementsMock
    };
    return <EnhancedBoardingPositionsPage {...props} {...newProps} />;
  })
  .add('with contact information message', () => {
    const newProps = {
      flights,
      viewAllBoardingPassesLink: { some: 'value' },
      contactInformationMessage,
      viewUpgradedBoarding: true,
      checkInConfirmationPagePlacements: checkInConfirmationPagePlacementsMock
    };
    return <EnhancedBoardingPositionsPage {...props} {...newProps} />;
  })
  .add('with check baggage button', () => {
    const newProps = {
      viewModifyCheckedBags: {
        labelText: 'Check Standard Bags Now',
        url: 'mockUrl'
      }
    };
    return <EnhancedBoardingPositionsPage {...props} {...newProps} />;
  })
  .add('with track check bags', () => {
    const newProps = {
      trackCheckedBags: {
        labelText: 'Track checked bags',
        url: 'mockUrl'
      }
    };
    return <EnhancedBoardingPositionsPage {...props} {...newProps} />;
  });
