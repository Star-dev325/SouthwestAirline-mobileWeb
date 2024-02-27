import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import { getAwayPlacement, upgradeToBusinessSelect, upgradedBoarding } from 'mocks/flexPlacement/checkinConfirmationPagePlacements';
import Q from 'q';
import React from 'react';
import { CheckInConfirmationPage } from 'src/checkIn/pages/checkInConfirmationPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import FooterWithLinksBuilder from 'test/builders/model/footerWithLinksBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
  .withMultipleFlights()
  .withDepartureTime('18:12')
  .withDepartureTime('20:13', 1)
  .withFlightNumber('123')
  .withViewPassengerBoardingPass()
  .withTitle({
    key: 'CHECKIN__YOURE_CHECKEDIN',
    body: "You're checked in!",
    icon: 'SUCCESS',
    textColor: 'NORMAL'
  })
  .build();
const contactInformationMessage = {
  body: 'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.',
  header: null,
  icon: 'NONE',
  key: 'VERIFY_CONTACT_METHOD',
  linkText: 'Edit contact method',
  textColor: 'DEFAULT'
};
const defaultWithFlights = {
  boundIndex: 0,
  flightNumber: '123',
  gate: null,
  hasWifi: true,
  passengers: null,
  travelTime: '0h 50m'
};
const EnhancedCheckInConfirmationPage = withBodyClass('checkin-confirmation-bg')(CheckInConfirmationPage);
const { flights } = checkInConfirmationPage;
const { footerWithLinks } = new FooterWithLinksBuilder().withMultipleLinks().build();
const props = {
  checkInConfirmationPage,
  checkInFn: () => Q(),
  checkInRequest: {},
  cleanUpEndOfSessionFn: _.noop,
  clearConfirmationPageFn: _.noop,
  contactInformationMessage: null,
  flights,
  footerWithLinks,
  getUpgradedBoardingReservationFn: _.noop,
  getUpgradeFareReservationFn: _.noop,
  goBack: _.noop,
  goDirectlyToBoardingPassesFn: _.noop,
  hideDialogFn: _.noop,
  isLoggedIn: false,
  messages: [],
  nonSequentialMessage: '',
  pageSubMessage: 'Logged in passengers can see their own boarding passes.',
  pageSubTitle: { status: 'success', title: "You're checked in!" },
  push: _.noop,
  recordLocator: 'X78UI8',
  showDialogFn: _.noop,
  showShareLinkFn: _.noop,
  UPGRADED_BOARDING: false,
  viewAllBoardingPassesLink: false,
  viewModifyCheckedBags: false
};
const store = createMockedFormStore();
const viewAllBoardingPassesLink = { some: 'value' };
const viewModifyCheckedBags = {
  labelText: 'Check standard bags now',
  url: 'mockUrl'
};

storiesOf('pages/checkIn/checkInConfirmationPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedCheckInConfirmationPage {...props} />;
  })
  .add('view all boarding passes button', () => {
    const flights = new CheckInConfirmationBuilder()
      .withFlights([defaultWithFlights])
      .withDepartureTime('18:12')
      .withPassengersByCount(3)
      .withViewPassengerBoardingPass()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights,
      viewAllBoardingPassesLink
    };
    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('view edit contact method message link', () => {
    const flights = new CheckInConfirmationBuilder()
      .withFlights([defaultWithFlights])
      .withDepartureTime('18:12')
      .withPassengersByCount(3)
      .withViewPassengerBoardingPass()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      contactInformationMessage,
      flights,
      viewAllBoardingPassesLink
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('view health documents', () => {
    const flights = new CheckInConfirmationBuilder()
      .withMultipleFlights()
      .withDepartureTime('18:12')
      .withDepartureTime('20:13', 1)
      .withFlightNumber('123')
      .withHealthDocument()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('view upgraded boarding button', () => {
    const flights = new CheckInConfirmationBuilder()
      .withMultipleFlights()
      .withDepartureTime('18:12')
      .withDepartureTime('20:13', 1)
      .withFlightNumber('123')
      .withViewPassengerBoardingPass()
      .withViewUpgradedBoarding()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights,
      UPGRADED_BOARDING: true
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('view upgraded boarding button and health documents', () => {
    const flights = new CheckInConfirmationBuilder()
      .withMultipleFlights()
      .withDepartureTime('18:12')
      .withDepartureTime('20:13', 1)
      .withFlightNumber('123')
      .withHealthDocument()
      .withViewUpgradedBoarding()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights,
      UPGRADED_BOARDING: true
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('view upgraded boarding button and ineligible boarding pass', () => {
    const flights = new CheckInConfirmationBuilder()
      .withMultipleFlights()
      .withDepartureTime('18:12')
      .withDepartureTime('20:13', 1)
      .withFlightNumber('123')
      .withViewUpgradedBoarding()
      .withIneligibleBoardingPass()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights,
      UPGRADED_BOARDING: true
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('with upgrade to business select placement', () => {
    const newProps = {
      checkInConfirmationPagePlacements: {
        checkInConfirmationPromoTop01: upgradeToBusinessSelect
      }
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })

  .add('with getaway placement', () => {
    const newProps = {
      checkInConfirmationPagePlacements: {
        topBanner01: getAwayPlacement
      }
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('with upgraded boarding placement', () => {
    const newProps = {
      checkInConfirmationPagePlacements: {
        checkInConfirmationPromoTop01: upgradedBoarding
      }
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('with check standard bags now button', () => {
    const newProps = {
      viewModifyCheckedBags
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('with view boarding pass and check bags buttons', () => {
    const flights = new CheckInConfirmationBuilder()
      .withMultipleFlights()
      .withDepartureTime('18:12')
      .withDepartureTime('20:13', 1)
      .withFlightNumber('123')
      .withViewPassengerBoardingPass()
      .withViewUpgradedBoarding()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights,
      viewAllBoardingPassesLink,
      viewModifyCheckedBags
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('with edit contact information, view boarding pass, and check bags buttons', () => {
    const newProps = {
      contactInformationMessage,
      viewAllBoardingPassesLink,
      viewModifyCheckedBags
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('with edit contact information and check bags button', () => {
    const newProps = {
      contactInformationMessage,
      viewModifyCheckedBags
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps} />;
  })
  .add('with overnight indicator', () => {
    const flights = new CheckInConfirmationBuilder()
      .withOvernight()
      .withViewPassengerBoardingPass()
      .build().checkInConfirmationPage.flights;

    const newProps = {
      flights
    };

    return <EnhancedCheckInConfirmationPage {...props} {...newProps}/>;
  })
