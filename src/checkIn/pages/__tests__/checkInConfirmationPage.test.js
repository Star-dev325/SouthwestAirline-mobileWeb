jest.mock('@swa-ui/encryption', () => ({
  __esModule: true,
  EncryptionProvider: ({ children }) => <div className="encryption-provider">{children}</div>,
  TextEncoder: jest.fn(),
  useHref: () => ({ href: 'mock_href' })
}));
jest.mock('src/checkIn/components/mobileBoardingPassMessage', () => () => <div />);
jest.mock('src/shared/actions/dialogActions', () => ({
  hideDialog: jest.fn().mockReturnValue({ type: 'HIDE_DIALOG' }),
  showDialog: jest.fn().mockReturnValue({ type: 'SHOW_DIALOG' })
}));
jest.mock('src/shared/api/helpers/loggingHelper', () => ({
  encryptionProviderLoggerAdapter: jest.fn()
}));
jest.mock('src/shared/components/errorHeader/errorHeaderContainer', () => () => <div />);
jest.mock('src/shared/helpers/browserObject', () => ({
  location: {
    pathname: '/check-in',
    reload: jest.fn()
  },
  navigator: {
    geolocation: {
      getCurrentPosition: jest.fn().mockImplementation(() => Promise.resolve('true'))
    },
    onLine: true
  },
  window: { navigator: { onLine: true } }
}));
jest.mock('src/shared/helpers/loginSessionHelper');

import i18n from '@swa-ui/locale';
import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { CheckInConfirmationPage } from 'src/checkIn/pages/checkInConfirmationPage';
import * as CheckInConfirmationPageSelectors from 'src/checkIn/selectors/checkInConfirmationPageSelectors';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import {
  clearHasSeenNonsequentialMessage,
  saveHasSeenNonsequentialMessage
} from 'src/shared/helpers/nonsequentialBoardingHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import FooterWithLinksBuilder from 'test/builders/model/footerWithLinksBuilder';
import ImagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testingLibraryUtils';

describe('CheckInConfirmation', () => {
  const { footerWithLinks } = new FooterWithLinksBuilder().build();
  let checkInFnMock,
    cleanUpEndOfSessionFnMock,
    clearConfirmationPageFnMock,
    defaultProps,
    getReserveCheckInReservationWithSearchTokenFnMock,
    getUpgradedBoardingReservationFnMock,
    goBackMock,
    goDirectlyToBoardingPassesFnMock,
    hasCorporateTokenMock,
    hasSessionExpiredMock,
    hideDialogFnMock,
    pushMock,
    showDialogFnMock,
    showShareLinkFnMock;

  beforeEach(() => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('check-in');
    checkInFnMock = jest.fn();
    cleanUpEndOfSessionFnMock = jest.fn();
    clearConfirmationPageFnMock = jest.fn();
    getReserveCheckInReservationWithSearchTokenFnMock = jest.fn(() => Promise.resolve());
    getUpgradedBoardingReservationFnMock = jest.fn();
    goBackMock = jest.fn();
    goDirectlyToBoardingPassesFnMock = jest.fn();
    hasCorporateTokenMock = jest.fn();
    hasSessionExpiredMock = jest.fn();
    hideDialogFnMock = jest.fn(() => Promise.resolve());
    jest.spyOn(LoginSessionHelper, 'hasCorporateToken').mockImplementation(hasCorporateTokenMock);
    jest.spyOn(LoginSessionHelper, 'hasSessionExpired').mockImplementation(hasSessionExpiredMock);
    pushMock = jest.fn();
    showDialogFnMock = jest.fn();
    showShareLinkFnMock = jest.fn();

    defaultProps = {
      checkInConfirmationPage: null,
      checkInFn: checkInFnMock.mockResolvedValue(),
      checkInRequest: {
        body: {
          checkInSessionToken: 'token',
          firstName: 'Shelton',
          lastName: 'Suen',
          recordLocator: 'X53XFM'
        },
        href: '/v1/mobile-air-operations/page/check-in',
        isLoggedIn: false,
        method: 'POST'
      },
      cleanUpEndOfSessionFn: cleanUpEndOfSessionFnMock,
      clearConfirmationPageFn: clearConfirmationPageFnMock,
      contactInformationMessage: null,
      flights: [],
      getReserveCheckInReservationWithSearchTokenFn: getReserveCheckInReservationWithSearchTokenFnMock,
      getUpgradedBoardingReservationFn: getUpgradedBoardingReservationFnMock,
      getUpgradeFareReservationFn: () => {},
      goBack: goBackMock,
      goDirectlyToBoardingPassesFn: goDirectlyToBoardingPassesFnMock,
      hideDialogFn: hideDialogFnMock,
      isLoggedIn: false,
      messages: [],
      nonSequentialMessage: '',
      pageSubMessage: 'Logged in passengers can see their own boarding passes.',
      pageSubTitle: {
        status: 'success',
        title: "You're checked in!"
      },
      push: pushMock,
      recordLocator: 'X53XFM',
      showDialogFn: showDialogFnMock,
      showShareLinkFn: showShareLinkFnMock,
      UPGRADED_BOARDING: false,
      viewAllBoardingPassesLink: {
        body: {
          firstName: 'Michael',
          lastName: 'Joseph',
          travelerID: ['0000000000000001', '0000000000000002']
        },
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
        labelText: null,
        method: 'POST',
        nonSequentialPositionsMessage: null
      },
      viewModifyCheckedBags: null
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should display a passenger check in document with flight duration', () => {
      const { flights } = new CheckInConfirmationBuilder()
        .withDepartureTime('18:12')
        .withFlightNumber('123')
        .build().checkInConfirmationPage;

      const { container, getByText } = createComponent({
        flights,
        checkInConfirmationPage: new CheckInConfirmationBuilder()
          .withTitle({
            body: "You're checked in!",
            icon: 'SUCCESS',
            key: 'CHECKIN__YOURE_CHECKEDIN',
            textColor: 'NORMAL'
          })
          .build().checkInConfirmationPage
      });

      expect(container.querySelector('.segment-checkin-documents')).not.toBeNull();
      expect(getByText('6:12')).not.toBeNull();
    });

    it('should display an InfoBanner if messages has contents', () => {
      const messages = [
        {
          body: 'Message Body',
          header: 'Message Header',
          key: 'INTER_ISLAND__MESSAGE',
          learnMoreUrl: 'Message URL'
        }
      ];

      const { container, getByText } = createComponent({ messages });

      expect(container.querySelector('.info-banner')).not.toBeNull();
      expect(getByText('Message Header')).not.toBeNull();
      expect(getByText('Message Body')).not.toBeNull();
      expect(container.querySelector(`[href="Message URL"]`));
    });

    it('should not display an InfoBanner if messages does not have contents', () => {
      const messages = [];

      const { container } = createComponent({ messages });

      expect(container.querySelector('.info-banner')).toBeNull();
    });

    it('should display an EditContactMethodMessage if contactInformationMessage has contents', () => {
      const contactInformationMessage = {
        body: 'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.',
        header: null,
        icon: 'NONE',
        key: 'VERIFY_CONTACT_METHOD',
        linkText: 'Edit contact method',
        textColor: 'DEFAULT'
      };

      const { container, getByText } = createComponent({ contactInformationMessage });

      expect(container.querySelector('.contact-info-messages')).not.toBeNull();
      expect(getByText(contactInformationMessage.linkText)).not.toBeNull();
      expect(getByText(contactInformationMessage.body)).not.toBeNull();
    });

    it('should not display an EditContactMethodMessage if contactInformationMessage does not have contents', () => {
      const { container } = createComponent();

      expect(container.querySelector('.contact-info-messages')).toBeNull();
    });

    it('should call check in api', () => {
      const { flights } = new CheckInConfirmationBuilder()
        .withDepartureTime('18:12')
        .withFlightNumber('123')
        .build().checkInConfirmationPage;

      createComponent({ flights });

      expect(checkInFnMock).toHaveBeenCalledWith({
        body: {
          checkInSessionToken: 'token',
          firstName: 'Shelton',
          lastName: 'Suen',
          recordLocator: 'X53XFM'
        },
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        isLoggedIn: false
      });
    });

    it('should not call check in api when request is null', () => {
      createComponent({ checkInRequest: null });

      expect(checkInFnMock).not.toBeCalled();
    });

    it('should clear check in confirmation page when the page did mount', () => {
      createComponent();

      expect(clearConfirmationPageFnMock).toHaveBeenCalled();
    });

    it('should show footer HTML when footerWithLinks is present from CHAPI', () => {
      const { container } = createComponent({ footerWithLinks });

      expect(container.querySelector('.link-details')).toMatchSnapshot();
    });

    it('should not show footer HTML when footerWithLinks is not coming from CHAPI', () => {
      const { container } = createComponent();

      expect(container.querySelector('.link-details')).toMatchSnapshot();
    });

    describe('Page placements', () => {
      const baseCheckInConfirmationPage = new CheckInConfirmationBuilder()
        .withTitle({
          body: "You're checked in!",
          icon: 'SUCCESS',
          key: 'CHECKIN__YOURE_CHECKEDIN',
          textColor: 'NORMAL'
        })
        .build().checkInConfirmationPage;

      it('should render checkInConfirmationPromoTop01 with correct props when checkInConfirmationPage is defined', () => {
        const imagePlacement = new ImagePlacementBuilder().build();
        const checkInConfirmationPagePlacements = { checkInConfirmationPromoTop01: imagePlacement };
        const { container } = createComponent(
          {
            checkInConfirmationPagePlacements,
            checkInConfirmationPage: baseCheckInConfirmationPage
          },
          true
        );

        expect(container.querySelector('[placementKey="checkInConfirmationPromoTop01"]')).toMatchSnapshot();
      });

      it('should render checkInConfirmationPromoTop01 with getUpgradedBoardingReservationFn as actionToDispatch and viewUpgradedBoarding as actionParams if viewUpgradedBoarding exists', () => {
        const imagePlacement = new ImagePlacementBuilder().build();
        const checkInConfirmationPagePlacements = { checkInConfirmationPromoTop01: imagePlacement };
        const viewUpgradedBoarding = {
          body: { passengerSearchToken: 'testToken' },
          href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
          labelText: 'Upgrade boarding position to A1 - A15',
          method: 'POST'
        };
        const { container } = createComponent(
          {
            checkInConfirmationPagePlacements,
            viewUpgradedBoarding,
            checkInConfirmationPage: baseCheckInConfirmationPage
          },
          true
        );

        expect(container.querySelector('[placementKey="checkInConfirmationPromoTop01"]')).toMatchSnapshot();
      });

      it('should render checkInConfirmationPromoTop01 with getUpgradeFareReservationFn as actionToDispatch and viewPremiumProductUpgrade as actionParams if viewPremiumProductUpgrade exists', () => {
        const imagePlacement = new ImagePlacementBuilder().build();
        const checkInConfirmationPagePlacements = { checkInConfirmationPromoTop01: imagePlacement };
        const viewPremiumProductUpgrade = {
          href: 'v1/mobile-air-booking/page/upgrade/4NWG2V',
          body: { passengerSearchToken: 'testToken' },
          labelText: 'PP Upgrade test label',
          method: 'POST'
        };
        const { container } = createComponent(
          {
            checkInConfirmationPagePlacements,
            viewPremiumProductUpgrade,
            checkInConfirmationPage: baseCheckInConfirmationPage
          },
          true
        );

        expect(container.querySelector('[placementKey="checkInConfirmationPromoTop01"]')).toMatchSnapshot();
      });

      it('should not render checkInConfirmationPromoTop01 data when undefined', () => {
        const { container } = createComponent(
          {
            checkInConfirmationPage: baseCheckInConfirmationPage
          },
          true
        );

        expect(container.querySelector('[placementKey="checkInConfirmationPromoTop01"]')).toMatchSnapshot();
      });
    });
  });

  describe('boarding pass', () => {
    describe('boarding pass available', () => {
      let checkInConfirmationPage;
      let flights;

      it('should navigate to boarding pass page when you click `Boarding pass` button', () => {
        ({
          checkInConfirmationPage: { flights }
        } = new CheckInConfirmationBuilder()
          .withRecordLocator('XYZABC')
          .withPassengerName({
            firstName: 'Bruce',
            lastName: 'Wayne'
          })
          .withTitle({
            body: "You're checked in!",
            icon: 'SUCCESS',
            key: 'CHECKIN__YOURE_CHECKEDIN',
            textColor: 'NORMAL'
          })
          .withViewPassengerBoardingPass()
          .withBoardingPassIssuanceLink()
          .build());

        const { getByText } = createComponent({ flights, checkInConfirmationPage });

        fireEvent.click(getByText('Boarding pass'));

        expect(showShareLinkFnMock).toHaveBeenCalled();
        expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'XYZABC',
          viewBoardingPassesLink: {
            body: { firstName: undefined, lastName: undefined, travelerID: ['0000000000000001'] },
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/XYZABC',
            labelText: 'Boarding pass',
            method: 'POST'
          },
          queryParams: null
        });
      });

      it('should navigate to boarding pass page when you click `Security document` button', () => {
        ({
          checkInConfirmationPage: { flights }
        } = new CheckInConfirmationBuilder()
          .withRecordLocator('XYZABC')
          .withPassengerName({
            firstName: 'Bruce',
            lastName: 'Wayne'
          })
          .withTitle({
            body: "You're checked in!",
            icon: 'SUCCESS',
            key: 'CHECKIN__YOURE_CHECKEDIN',
            textColor: 'NORMAL'
          })
          .withViewPassengerBoardingPass('Security document')
          .withBoardingPassIssuanceLink()
          .build());

        const { getByText } = createComponent({ flights, checkInConfirmationPage });

        fireEvent.click(getByText('Security document'));

        expect(showShareLinkFnMock).toHaveBeenCalled();
        expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
          firstName: 'Bruce',
          lastName: 'Wayne',
          recordLocator: 'XYZABC',
          viewBoardingPassesLink: {
            body: { firstName: undefined, lastName: undefined, travelerID: ['0000000000000001'] },
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/XYZABC',
            labelText: 'Security document',
            method: 'POST'
          },
          queryParams: { clk: 'secdoc_confirm' }
        });
      });
    });
  });

  describe('single passenger', () => {
    describe('and check-in was successful for a domestic flight', () => {
      let flights;

      beforeEach(() => {
        flights = new CheckInConfirmationBuilder().withMultipleFlights().build().checkInConfirmationPage.flights;
      });

      it('should display check-in documents for one passenger', () => {
        const { container } = createComponent({ flights });

        expect(container.querySelectorAll('.segment-checkin-documents').length).toBe(2);
      });

      it('should not show any message to visit the kiosk', () => {
        const { container } = createComponent({ flights });

        const passengerCardWrapper = container.querySelectorAll('.passenger-card');

        expect(passengerCardWrapper.length).toBe(2);
        expect(passengerCardWrapper[0].querySelector('[data-qa="passenger-kiosk-message"]')).toBeNull();
        expect(passengerCardWrapper[1].querySelector('[data-qa="passenger-kiosk-message"]')).toBeNull();
      });
    });
  });

  describe('multiple passengers with one way', () => {
    let flights;

    beforeEach(() => {
      flights = new CheckInConfirmationBuilder()
        .withFlights([
          {
            boundIndex: 0,
            departureTime: '11:11',
            flightNumber: '123',
            gate: null,
            hasWifi: true,
            passengers: null,
            travelTime: '0h 50m'
          },
          {
            boundIndex: 0,
            departureTime: '11:12',
            flightNumber: '321',
            gate: null,
            hasWifi: true,
            passengers: null,
            travelTime: '2h 0m'
          }
        ])
        .withPassengers([
          {
            boardingGroup: 'A',
            boardingPosition: '16',
            checkedIn: true,
            confirmationNumber: 'SLNTCC',
            hasPrecheck: false,
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
            name: 'Michael Joseph'
          },
          {
            boardingGroup: 'A',
            boardingPosition: '16',
            checkedIn: true,
            confirmationNumber: 'SLNTCC',
            hasPrecheck: false,
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
            name: 'Jane Joseph'
          }
        ])
        .build().checkInConfirmationPage.flights;
    });

    it('should display two passenger check in documents', () => {
      const { container } = createComponent({ flights });

      expect(container.querySelectorAll('.segment-checkin-documents').length).toBe(2);
    });

    it('should show the correct departure time for each flight', () => {
      const { getByText } = createComponent({ flights });

      expect(getByText('11:11')).not.toBeNull();
      expect(getByText('11:12')).not.toBeNull();
    });
  });

  describe('multiple passengers with round trip', () => {
    let flights;

    beforeEach(() => {
      flights = new CheckInConfirmationBuilder()
        .withFlights([
          {
            boundIndex: 0,
            flightNumber: '123',
            gate: null,
            hasWifi: true,
            passengers: null,
            travelTime: '0h 50m'
          },
          {
            boundIndex: 1,
            flightNumber: '321',
            gate: null,
            hasWifi: true,
            passengers: null,
            travelTime: '2h 0m'
          }
        ])
        .withPassengers([
          {
            boardingGroup: 'A',
            boardingPosition: '16',
            checkedIn: true,
            confirmationNumber: 'SLNTCC',
            hasPrecheck: false,
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
            name: 'Michael Joseph'
          },
          {
            boardingGroup: 'A',
            boardingPosition: '16',
            checkedIn: true,
            confirmationNumber: 'SLNTCC',
            hasPrecheck: false,
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
            name: 'Jane Joseph'
          }
        ])
        .build().checkInConfirmationPage.flights;
    });

    it('should display boarding documents for all passengers on all flights', () => {
      const { container } = createComponent({ flights });

      expect(container.querySelectorAll('.segment-checkin-documents').length).toBe(2);
    });
  });

  describe('international check in', () => {
    describe('single pax ineligible', () => {
      let component;

      beforeEach(() => {
        const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
          .withoutBoardingPassLink()
          .withCheckInIneligibilityReason('MBP_UNAVAILABLE_INTL')
          .withFlights([
            {
              boundIndex: 0,
              departureTime: '11:11',
              flightNumber: '321',
              gate: null,
              hasWifi: true,
              travelTime: '2h 15m'
            }
          ])
          .withPassengers([
            {
              boardingGroup: 'A',
              boardingPosition: '30',
              checkedIn: true,
              confirmationNumber: 'SLNTCC',
              hasPrecheck: false,
              mobileBoardingPassEligible: false,
              mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_INTL',
              name: 'Michael Joseph'
            }
          ])
          .withTitle({
            body: "You're checked in!",
            icon: 'SUCCESS',
            key: 'CHECKIN__YOURE_CHECKEDIN',
            textColor: 'NORMAL'
          })
          .build();

        const { flights } = checkInConfirmationPage;

        component = createComponent({
          flights,
          checkInConfirmationPage
        });
      });

      it('should have boarding group and position', () => {
        const { getByText } = component;

        expect(getByText('SHARED__BOARDING_INFORMATION__POSITION')).not.toBeNull();
        expect(getByText('30')).not.toBeNull();
      });

      it('should say you are checked in', () => {
        const { getByText } = component;

        expect(getByText(`You're checked in!`)).not.toBeNull();
      });

      it('should have flight departure time', () => {
        const { getByText } = component;

        expect(getByText(`11:11`)).not.toBeNull();
      });

      it('should not show a view boarding pass button', () => {
        const { container } = component;

        expect(container.querySelector('.view-boarding-pass-btn')).toBeNull();
      });
    });
  });

  describe('check in api call failed', () => {
    describe('checkin session expired', () => {
      let checkInFnMock;

      beforeEach(() => {
        checkInFnMock = jest.fn().mockRejectedValue({
          $customized: true,
          responseJSON: {
            code: 400511157,
            message: 'message',
            requestId: 'request id'
          }
        });
        hideDialogFnMock.mockResolvedValue();
        hasSessionExpiredMock.mockReturnValue(true);
      });

      it('should show error pop up with session token expired when checkin passenger', async () => {
        await createComponent({ checkInFn: checkInFnMock, isLoggedIn: true });

        const showArgs = showDialogFnMock.mock.calls[0][0];

        expect(showArgs.name).toBe('check-in-reservation-details-session-token-expired');
        expect(showArgs.title).toBe('CHECK_IN__ERRORS__SESSION_TOKEN_EXPIRED');
        expect(showArgs.buttons[0].label).toBe('SHARED__BUTTON_TEXT__OK');
      });

      it('should refresh app when user click ok button on error popup', async () => {
        await createComponent({ checkInFn: checkInFnMock, isLoggedIn: true });

        showDialogFnMock.mock.calls[0][0].buttons[0].onClick();

        await waitFor(() => {
          expect(BrowserObject.location.reload).toBeCalled();
        });
      });

      it('should call logout action when user clicks OK on session expired popup', async () => {
        await createComponent({ checkInFn: checkInFnMock, isLoggedIn: true });

        showDialogFnMock.mock.calls[0][0].buttons[0].onClick();

        expect(cleanUpEndOfSessionFnMock).toBeCalled();
      });
    });

    describe('no pax eligible for check in', () => {
      let checkInFnMock;

      beforeEach(async () => {
        checkInFnMock = jest.fn().mockRejectedValue({
          $customized: true,
          responseJSON: {
            code: 400511206,
            message: 'message',
            requestId: 'request id'
          }
        });
        hideDialogFnMock.mockResolvedValue();
      });

      it('should show No Pax Eligible CheckIn Popup ', async () => {
        await createComponent({ checkInFn: checkInFnMock, isLoggedIn: true });

        const showArgs = showDialogFnMock.mock.calls[0][0];

        expect(showArgs.name).toBe('no-pax-eligible-check-in');
        expect(showArgs.buttons[0].label).toBe('SHARED__BUTTON_TEXT__OK');
      });

      it('should redirect to previous page when user click ok button on error popup', async () => {
        await createComponent({ checkInFn: checkInFnMock, isLoggedIn: true });

        showDialogFnMock.mock.calls[0][0].buttons[0].onClick();

        await waitFor(() => {
          expect(goBackMock).toBeCalled();
        });
      });
    });
  });

  describe('check standard bags now button', () => {
    describe('when viewModifyCheckedBags has value', () => {
      const viewModifyCheckedBags = {
        labelText: 'Check standard bags now',
        url: 'mockUrl'
      };

      it('should render check standard bags now button', () => {
        const { container } = createComponent({ viewModifyCheckedBags }, true);

        expect(container.querySelector('[data-qa="check-baggage-button"]')).toMatchSnapshot();
      });
    });

    describe('when viewModifyCheckedBags is null', () => {
      it('should not render check standard bags now button', () => {
        const { container } = createComponent({ viewModifyCheckedBags: null });

        expect(container.querySelector('[data-qa="check-baggage-button"]')).toMatchSnapshot();
      });
    });
  });

  describe('multipax MBP', () => {
    it('should not display page sub message', () => {
      const { container } = createComponent();

      expect(container.querySelector('.page-sub-message')).toBeNull();
    });

    describe('viewAllBoardingPassesLink is null', () => {
      it('should not display the View all boarding passes button', () => {
        const { container } = createComponent({ viewAllBoardingPassesLink: null });

        expect(container.querySelector('[data-qa="view-all-boarding-passes-button"]')).toBeNull();
      });
    });

    describe('labelText has value', () => {
      let viewAllBoardingPassesButton;
      let flights;
      let viewAllBoardingPassesLink;

      beforeEach(() => {
        const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
          .withPassengersByCount(3)
          .withViewPassengerBoardingPass()
          .withViewAllBoardingPassesLink('override')
          .build();

        ({
          flights,
          _links: { viewAllBoardingPasses: viewAllBoardingPassesLink }
        } = checkInConfirmationPage);
        const { container } = createComponent({ flights, viewAllBoardingPassesLink });

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');
      });

      it('should have overridden text on button', () => {
        expect(viewAllBoardingPassesButton).not.toBeNull();
        expect(viewAllBoardingPassesButton.textContent).toBe('override');
      });
    });

    describe('viewAllBoardingPassesLink has value', () => {
      let viewAllBoardingPassesButton;
      let flights;

      beforeEach(() => {
        ({ flights } = new CheckInConfirmationBuilder()
          .withPassengersByCount(3)
          .withViewPassengerBoardingPass()
          .build().checkInConfirmationPage);
      });

      describe('with exactly 2 pax with nonstop flight', () => {
        let viewAllBoardingPassesLink;
        let flights;

        it('should go directly to boarding passes and show default button text', () => {
          ({ flights } = new CheckInConfirmationBuilder()
            .withPassengersByCount(2)
            .withViewPassengerBoardingPass()
            .build().checkInConfirmationPage);

          viewAllBoardingPassesLink = {
            body: {
              firstName: 'Michael',
              lastName: 'Joseph',
              travelerID: ['0000000000000001', '0000000000000002']
            },
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
            method: 'POST',
            nonSequentialPositionsMessage: null
          };

          const { container } = createComponent({ flights });

          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          fireEvent.click(viewAllBoardingPassesButton);

          expect(viewAllBoardingPassesButton.textContent).toBe('SHARED__BUTTON_TEXT__VIEW_ALL_BOARDING_PASSES');
          expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
            recordLocator: 'X53XFM',
            viewBoardingPassesLink: {
              body: {
                firstName: 'Michael',
                lastName: 'Joseph',
                travelerID: ['0000000000000001', '0000000000000002']
              },
              href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
              method: 'POST',
              labelText: null,
              nonSequentialPositionsMessage: null
            },
            queryParams: null
          });
        });

        it('should go directly to boarding passes and show custom "View All Boarding Passes" labelText', () => {
          ({ flights } = new CheckInConfirmationBuilder()
            .withPassengersByCount(2)
            .withViewPassengerBoardingPass()
            .build().checkInConfirmationPage);

          viewAllBoardingPassesLink = {
            body: {
              firstName: 'Michael',
              lastName: 'Joseph',
              travelerID: ['0000000000000001', '0000000000000002']
            },
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
            method: 'POST',
            nonSequentialPositionsMessage: null,
            labelText: 'View All Boarding Passes'
          };

          const { container } = createComponent({ flights, viewAllBoardingPassesLink });

          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          fireEvent.click(viewAllBoardingPassesButton);

          expect(viewAllBoardingPassesButton.textContent).toBe('View All Boarding Passes');
          expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
            recordLocator: 'X53XFM',
            viewBoardingPassesLink: {
              body: {
                firstName: 'Michael',
                lastName: 'Joseph',
                travelerID: ['0000000000000001', '0000000000000002']
              },
              href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
              method: 'POST',
              labelText: 'View All Boarding Passes',
              nonSequentialPositionsMessage: null
            },
            queryParams: null
          });
        });

        it('should go directly to security documents and show custom "View all security documents" labelText', () => {
          ({ flights } = new CheckInConfirmationBuilder()
            .withPassengersByCount(2)
            .withViewPassengerBoardingPass()
            .build().checkInConfirmationPage);

          viewAllBoardingPassesLink = {
            body: {
              firstName: 'Michael',
              lastName: 'Joseph',
              travelerID: ['0000000000000001', '0000000000000002']
            },
            href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
            method: 'POST',
            nonSequentialPositionsMessage: null,
            labelText: 'View all security documents'
          };

          const { container } = createComponent({ flights, viewAllBoardingPassesLink });

          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          fireEvent.click(viewAllBoardingPassesButton);

          expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
            recordLocator: 'X53XFM',
            viewBoardingPassesLink: {
              body: {
                firstName: 'Michael',
                lastName: 'Joseph',
                travelerID: ['0000000000000001', '0000000000000002']
              },
              href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
              method: 'POST',
              labelText: 'View all security documents',
              nonSequentialPositionsMessage: null
            },
            queryParams: { clk: 'secdoc_confirm' }
          });
        });
      });

      describe('nonSequentialPositionsMessage popup', () => {
        afterEach(() => {
          clearHasSeenNonsequentialMessage();
        });

        it('should not display nonSequential popup if the message is not present', () => {
          const { container } = createComponent();

          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          fireEvent.click(viewAllBoardingPassesButton);

          expect(showDialogFnMock).not.toHaveBeenCalled();
        });

        it('should display nonSequential popup if the message is present and it is the first time this PNR has seen it', () => {
          const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
            .withTitle({
              body: "You're checked in!",
              icon: 'SUCCESS',
              key: 'CHECKIN__YOURE_CHECKEDIN',
              textColor: 'NORMAL'
            })
            .build();
          const { flights } = checkInConfirmationPage;

          const { container } = createComponent({
            flights,
            checkInConfirmationPage,
            nonSequentialMessage: "You're not in line together"
          });

          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          fireEvent.click(viewAllBoardingPassesButton);

          expect(showDialogFnMock).toHaveBeenCalled();
        });

        it('should not display nonSequential popup if the message is present and it is not the first time this PNR has seen it', () => {
          const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
            .withTitle({
              body: "You're checked in!",
              icon: 'SUCCESS',
              key: 'CHECKIN__YOURE_CHECKEDIN',
              textColor: 'NORMAL'
            })
            .build();
          const { flights } = checkInConfirmationPage;
          const recordLocator = 'ABC123';

          const { container } = createComponent({
            flights,
            recordLocator,
            checkInConfirmationPage,
            nonSequentialMessage: "You're not in line together",
            hasSeenNonSequentialMessage: true
          });

          saveHasSeenNonsequentialMessage(recordLocator);
          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          fireEvent.click(viewAllBoardingPassesButton);

          expect(showDialogFnMock).not.toHaveBeenCalled();
        });

        it('should display nonSequential popup if the message is present and it is the first time this PNR has seen it and exactly 2 pax with nonstop', async () => {
          const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
            .withTitle({
              body: "You're checked in!",
              icon: 'SUCCESS',
              key: 'CHECKIN__YOURE_CHECKEDIN',
              textColor: 'NORMAL'
            })
            .withPassengersByCount(2)
            .build();
          const { flights } = checkInConfirmationPage;

          const { container } = createComponent({
            flights,
            checkInConfirmationPage,
            nonSequentialMessage: "You're not in line together"
          });

          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          fireEvent.click(viewAllBoardingPassesButton);

          expect(showDialogFnMock).toHaveBeenCalled();

          await clickDialogButton(0);

          expect(hideDialogFnMock).toHaveBeenCalled();
          expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
            recordLocator: 'X53XFM',
            viewBoardingPassesLink: {
              body: {
                firstName: 'Michael',
                lastName: 'Joseph',
                travelerID: ['0000000000000001', '0000000000000002']
              },
              href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
              method: 'POST',
              labelText: null,
              nonSequentialPositionsMessage: null
            },
            queryParams: null
          });
        });

        it('should display nonSequential popup if the message is present and it is the first time this PNR has seen it and 1 pax with nonstop', async () => {
          const { checkInConfirmationPage } = new CheckInConfirmationBuilder()
            .withTitle({
              body: "You're checked in!",
              icon: 'SUCCESS',
              key: 'CHECKIN__YOURE_CHECKEDIN',
              textColor: 'NORMAL'
            })
            .build();
          const { flights } = checkInConfirmationPage;
  
          const { container } = createComponent({
            flights,
            checkInConfirmationPage,
            nonSequentialMessage: "You're not in line together"
          });
  
          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');
  
          fireEvent.click(viewAllBoardingPassesButton);
  
          expect(showDialogFnMock).toHaveBeenCalled();
  
          await clickDialogButton(0);
  
          expect(hideDialogFnMock).toHaveBeenCalled();
          expect(pushMock).toHaveBeenCalledWith('/check-in/choose-boarding-passes');
        });
      });

      it('should display the View all boarding passes button', () => {
        const { container } = createComponent({
          flights
        });

        viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

        expect(viewAllBoardingPassesButton).not.toBeNull();
      });

      describe('when user clicks on View all boarding passes button', () => {
        it('should navigate to /check-in/choose-boarding-passes', async () => {
          const { container } = createComponent({
            flights
          });

          viewAllBoardingPassesButton = container.querySelector('.view-all-boarding-passes-button button');

          expect(viewAllBoardingPassesButton).not.toBeNull();

          fireEvent.click(viewAllBoardingPassesButton);

          await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/check-in/choose-boarding-passes');
          });
        });
      });

      describe('3 passengers are eligible to view boarding pass', () => {
        it('should display three individual View Boarding Pass buttons', async () => {
          const { container } = createComponent({
            flights
          });

          await waitFor(() => {
            expect(container.querySelectorAll('.view-boarding-pass-btn').length).toBe(3);
          });
        });

        describe('when user clicks on 1st View Boarding Pass button', () => {
          beforeEach(() => {
            const { container } = createComponent({
              flights
            });

            fireEvent.click(container.querySelectorAll('.view-boarding-pass-btn button')[0]);
          });

          it("should call updateViewBoardingPass with 1st passenger's travelerID", async () => {
            await waitFor(() => {
              expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
                viewBoardingPassesLink: {
                  href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
                  method: 'POST',
                  body: {
                    firstName: 'Michael',
                    lastName: 'Joseph',
                    travelerID: ['0000000000000001']
                  },
                  labelText: 'Boarding pass'
                },
                recordLocator: 'SLNTCC',
                firstName: 'Michael',
                lastName: 'Joseph',
                queryParams: null
              });
            });
          });
        });

        describe('when user clicks on 2nd View Boarding Pass button', () => {
          beforeEach(() => {
            const { container } = createComponent({
              flights
            });

            fireEvent.click(container.querySelectorAll('.view-boarding-pass-btn button')[1]);
          });

          it("should call updateViewBoardingPass with 2nd passenger's travelerID", async () => {
            await waitFor(() => {
              expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
                viewBoardingPassesLink: {
                  href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
                  method: 'POST',
                  body: {
                    firstName: 'Jackie',
                    lastName: 'Robinson',
                    travelerID: ['0000000000000002']
                  },
                  labelText: 'Boarding pass'
                },
                recordLocator: 'SLNTCC',
                firstName: 'Michael',
                lastName: 'Joseph',
                queryParams: null
              });
            });
          });
        });

        describe('when user clicks on 3rd individual View Boarding Pass button', () => {
          beforeEach(() => {
            const { container } = createComponent({
              flights
            });

            fireEvent.click(container.querySelectorAll('.view-boarding-pass-btn button')[2]);
          });

          it("should call updateViewBoardingPass with 3rd passenger's travelerID", async () => {
            await waitFor(() => {
              expect(goDirectlyToBoardingPassesFnMock).toHaveBeenCalledWith({
                viewBoardingPassesLink: {
                  href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/SLNTCC',
                  method: 'POST',
                  body: {
                    firstName: 'Bob',
                    lastName: 'Bobster',
                    travelerID: ['0000000000000003']
                  },
                  labelText: 'Boarding pass'
                },
                recordLocator: 'SLNTCC',
                firstName: 'Michael',
                lastName: 'Joseph',
                queryParams: null
              });
            });
          });
        });
      });
    });
  });

  describe('day of travel contact method', () => {
    it('should navigate to contact method page when you click `Edit contact method` link', () => {
      const contactInformationMessage = {
        key: 'VERIFY_CONTACT_METHOD',
        header: null,
        body: 'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.',
        linkText: 'Edit contact method',
        icon: 'NONE',
        textColor: 'DEFAULT'
      };

      const checkInConfirmationPage = {
        _links: {
          contactInformation: {
            href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
            method: 'GET',
            query: {
              'passenger-search-token':
                'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
            }
          }
        },
        title: {
          body: "You're checked in!",
          icon: 'SUCCESS',
          key: 'CHECKIN__YOURE_CHECKEDIN',
          textColor: 'NORMAL'
        }
      };

      const { container } = createComponent({ contactInformationMessage, checkInConfirmationPage, GDS_AOM: true });
      const editContactInfoLink = container.querySelector('.contact-info-messages--link a');

      fireEvent.click(editContactInfoLink);
      expect(pushMock).toHaveBeenCalledWith(
        '/check-in/confirmation/X53XFM/contact-method',
        null,
        { clk: 'AOMcheck' },
        {
          firstName: '',
          lastName: '',
          href: '/v1/mobile-air-booking/page/view-reservation/contact-info/M74H4J',
          method: 'GET',
          query: {
            'passenger-search-token':
              'ShL5ZTcquYJUP1k9tD_utMdlATJVun6HKSVa7UUxdPT1CfUytc4KQXjgW3M4a0OID9lLp_nGqB2ljpAsO4QjYmrjId8m36Ie5mNJi1q5gLD7OmjXH8GqaKJBXocvM7jq8onB986M34zVH6ZurQ=='
          }
        }
      );
    });
  });

  describe('Upgraded Boarding button', () => {
    it('should call getUpgradedBoardingReservationFn with correct link object when user clicks Upgraded Boarding button', () => {
      const { flights } = new CheckInConfirmationBuilder()
        .withBoardingPassAndPassengerName('Bruce', 'Wayne')
        .withViewUpgradedBoarding()
        .build().checkInConfirmationPage;

      const { container } = createComponent({ flights, UPGRADED_BOARDING: true });
      const upgradedBoardingButton = container.querySelectorAll('.passenger-card--upgraded-boarding-btn')[0];

      fireEvent.click(upgradedBoardingButton);

      expect(getUpgradedBoardingReservationFnMock).toHaveBeenCalledWith({
        body: { passengerSearchToken: 'testToken' },
        href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
        labelText: 'Upgrade boarding position to A1 - A15',
        method: 'POST'
      });
    });
  });

  describe('multiDayIndicator indicator', () => {
    it('should render isOvernight when isOvernight is true', () => {
      const checkInConfirmationPage = new CheckInConfirmationBuilder()
        .withTitle({
          body: "You're checked in!",
          icon: 'SUCCESS',
          key: 'CHECKIN__YOURE_CHECKED IN',
          textColor: 'NORMAL'
        })
        .withOvernight()
        .build().checkInConfirmationPage;
      const { flights } = checkInConfirmationPage;

      const { container } = createComponent({
        flights,
        checkInConfirmationPage
      });

      expect(container.querySelector('[data-qa="overnight-indicator"]').textContent).toEqual(
        i18n('AIR_BOOKING__SHOPPING__OVERNIGHT')
      );
    });

    it('should not render multiDayIndicator when isOvernight is false', () => {
      const checkInConfirmationPage = new CheckInConfirmationBuilder()
        .withTitle({
          body: "You're checked in!",
          icon: 'SUCCESS',
          key: 'CHECKIN__YOURE_CHECKED IN',
          textColor: 'NORMAL'
        })
        .build().checkInConfirmationPage;
      const { flights } = checkInConfirmationPage;

      const { container } = createComponent({
        flights,
        checkInConfirmationPage
      });

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toBeNull();
    });
  });

  describe('searchToken', () => {
    it('should render the page if the searchToken is present', async () => {
      jest.spyOn(CheckInConfirmationPageSelectors, 'getCheckInRequest').mockReturnValue({
        body: {
          checkInSessionToken: 'SESSION_TOKEN',
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          passengerSearchToken: 'PASSENGER_SEARCH_TOKEN',
          recordLocator: 'RECLOC'
        },
        href: '/v1/mobile-air-operations/page/check-in',
        isLoggedIn: true,
        method: 'POST'
      });

      const props = {
        checkInRequest: {},
        query: {
          searchToken: 'abc123'
        }
      };

      const { rerender } = await createComponent(props);

      const modifiedProps = {
        checkInFn: checkInFnMock.mockResolvedValue(),
        query: {
          searchToken: 'abc123'
        }
      };
      const mergedProps = { ...defaultProps, ...modifiedProps };
      const store = {
        app: {
          isLoggedIn: true
        }
      };

      rerender(
        <MemoryRouter {...store}>
          <Provider store={createMockStoreWithRouterMiddleware()()}>
            <CheckInConfirmationPage {...mergedProps} />  
          </Provider>
        </MemoryRouter>
      );

      expect(rerender).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => (mountWithMemoryRouterAndState(CheckInConfirmationPage, {}, null, { ...defaultProps, ...props }));

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
