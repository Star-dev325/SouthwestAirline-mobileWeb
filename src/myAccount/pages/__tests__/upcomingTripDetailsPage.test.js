jest.mock('@swa-ui/encryption', () => ({
  __esModule: true,
  EncryptionProvider: ({ children }) => <div className="encryption-provider">{children}</div>,
  TextEncoder: jest.fn(),
  useHref: () => ({ href: 'mock_href' })
}));

import { fireEvent } from '@testing-library/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';
import { UpcomingTripDetailsPage } from 'src/myAccount/pages/upcomingTripDetailsPage';
import { transformResponseToViewReservationDetail } from 'src/shared/transformers/reservationTransformer';
import UpcomingCarTripDetailBuilder from 'test/builders/apiResponse/upcomingCarTripDetailBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('UpcomingTripDetailsPage', () => {
  let cancelCarReservationAndTransitionToConfirmationPageFnMock;
  let clearFlightReservationFnMock;
  let getUpgradeFareReservationFnMock;
  let hideDialogFnMock;
  let prepareCarCrossSellAndTransitionToCarBookingFnMock;
  let pushMock;
  let retrieveFlightReservationFnMock;
  let saveUpgradeTypeFnMock;
  let showDialogFnMock;
  let updateViewBoardingPassFnMock;

  beforeEach(() => {
    cancelCarReservationAndTransitionToConfirmationPageFnMock = jest.fn();
    clearFlightReservationFnMock = jest.fn();
    getUpgradeFareReservationFnMock = jest.fn();
    hideDialogFnMock = jest.fn();
    prepareCarCrossSellAndTransitionToCarBookingFnMock = jest.fn();
    pushMock = jest.fn();
    retrieveFlightReservationFnMock = jest
      .fn()
      .mockResolvedValue({ _links: { viewBoardingPassIssuance: 'mock-data' } });
    saveUpgradeTypeFnMock = jest.fn();
    showDialogFnMock = jest.fn();
    updateViewBoardingPassFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render correctly', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('generally', () => {
    it('should clear flight reservation on unmount', () => {
      const { unmount } = createComponent();

      unmount();

      expect(clearFlightReservationFnMock).toHaveBeenCalled();
    });
  });

  describe('for FLIGHT Reservations', () => {
    it('should fetch flight reservation and update viewBoardingPassIssuance', async () => {
      createComponent({ tripType: 'FLIGHT' });

      expect(retrieveFlightReservationFnMock).toHaveBeenCalled();

      await retrieveFlightReservationFnMock;

      expect(updateViewBoardingPassFnMock).toHaveBeenCalled();
    });

    it('should have subHeader that has origin-destination', () => {
      const { container } = createComponent({ tripType: 'FLIGHT' });

      expect(container.querySelector('.page-header').textContent).toContain('DAL - ATL');
    });

    it('should have flight details', () => {
      const { container } = createComponent({ tripType: 'FLIGHT' });

      expect(container.querySelector('.trip-details-page')).not.toBeNull();
    });

    it('should have flight details with companionPassInfo', () => {
      const { container } = createComponent({ tripType: 'FLIGHT' });

      expect(container).toMatchSnapshot();
    });

    it('should transition to the day of travel contact page on click', () => {
      const { container } = createComponent({ tripType: 'FLIGHT' });

      fireEvent.click(container.querySelector('[data-qa="day-of-travel-wrapper"]'));

      expect(pushMock).toHaveBeenCalledWith(
        '/upcoming-trips/trip-details/contact-method',
        null,
        { clk: 'AOMupcoming' },
        {
          body: {
            contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a',
            passengerSearchToken:
              '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ'
          },
          href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
          method: 'POST'
        }
      );
    });

    it('should transition to air upgrade select bounds page when user clicks on upgrade my flight', () => {
      const instance = React.createRef();

      createComponent({ instance, tripType: 'FLIGHT' });

      instance.current._onUpgradeMyFlight();

      expect(saveUpgradeTypeFnMock).toHaveBeenCalledWith(AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS);
      expect(getUpgradeFareReservationFnMock).toHaveBeenCalledWith({
        link: {
          body: { passengerSearchToken: 'passenger-search-token' },
          href: '/v1/mobile-air-booking/page/upgrade/4O88R8',
          method: 'POST'
        }
      });
    });

    it('should not transition to air upgrade select bounds page when user clicks on upgrade my flight', () => {
      const { container } = createComponent({
        flightReservation: transformResponseToViewReservationDetail(
          new ViewReservationBuilder()
            .withCompanionInfo()
            .withBoardingPassIssuanceLink()
            .withDayOfTravelContactInfo()
            .withUpsellDetails()
            .withoutPassangerSearchToken()
            .build()
        ),
        tripType: 'FLIGHT'
      });
      const button = container.querySelector('.trip-details-page .upsell-details--content button');

      fireEvent.click(button);

      expect(getUpgradeFareReservationFnMock).not.toHaveBeenCalled();
    });
  });

  describe('for CAR Reservations', () => {
    it('should not fetch flight reservation', () => {
      createComponent({ tripType: 'CAR' });

      expect(retrieveFlightReservationFnMock).not.toHaveBeenCalled();
    });

    it(`should have 'Reservation' as sub header title`, () => {
      const { container } = createComponent({ tripType: 'CAR' });

      expect(container.querySelector('.page-header').textContent).toContain('Reservation');
    });

    it('should display the car reservation', () => {
      const { container } = createComponent({ tripType: 'CAR' });

      expect(container).toMatchSnapshot();
    });

    it('should transition to car booking page and call redux actions when user clicks Add Another Car button', () => {
      const { container } = createComponent({ tripType: 'CAR' });

      fireEvent.click(container.querySelector('button[data-qa="manageCarReservationButton"]'));
      fireEvent.click(container.querySelector('a[data-qa="add-another-car"]'));

      expect(prepareCarCrossSellAndTransitionToCarBookingFnMock).toHaveBeenCalled();
    });

    it('should play car cancel confirmation pop up when user selects to cancel car reservation', () => {
      const { container } = createComponent({ tripType: 'CAR' });

      fireEvent.click(container.querySelector('button[data-qa="manageCarReservationButton"]'));
      fireEvent.click(container.querySelector('[data-qa="cancel-car-reservation"]'));

      expect(showDialogFnMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      cancelCarReservationAndTransitionToConfirmationPageFn: cancelCarReservationAndTransitionToConfirmationPageFnMock,
      carReservation: UpcomingCarTripDetailBuilder.build(),
      clearFlightReservationFn: clearFlightReservationFnMock,
      companionFullName: 'Bob Loblaw',
      companionName: {
        firstName: 'Bob',
        lastName: 'Loblaw'
      },
      flightReservation: transformResponseToViewReservationDetail(
        new ViewReservationBuilder()
          .withCompanionInfo()
          .withBoardingPassIssuanceLink()
          .withDayOfTravelContactInfo()
          .withUpsellDetails()
          .build()
      ),
      getUpgradeFareReservationFn: getUpgradeFareReservationFnMock,
      hideDialogFn: hideDialogFnMock,
      history: { action: 'push' },
      isLoggedIn: true,
      location: { pathname: '/upcoming-trips/trip-details' },
      prepareCarCrossSellAndTransitionToCarBookingFn: prepareCarCrossSellAndTransitionToCarBookingFnMock,
      push: pushMock,
      retrieveFlightReservationFn: retrieveFlightReservationFnMock,
      saveUpgradeTypeFn: saveUpgradeTypeFnMock,
      showDialogFn: showDialogFnMock,
      tripType: 'FLIGHT',
      updateViewBoardingPassFn: updateViewBoardingPassFnMock,
      viewReservationSearchRequest: {
        body: {
          firstName: 'bob',
          lastName: 'builder',
          recordLocator: '12345s'
        }
      }
    };

    const mergedProps = { ...defaultProps, ...props };

    const state = configureMockStore()({
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return integrationRender()(state, UpcomingTripDetailsPage, mergedProps);
  };
});
