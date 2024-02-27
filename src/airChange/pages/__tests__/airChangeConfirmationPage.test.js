import { fireEvent } from '@testing-library/react';
import confirmationPageWithPointsDowngradeMoneyUpgrade from 'mocks/templates/air-change/confirmation/pointsDowngradeMoneyUpgrade';
import { AirChangeConfirmationPage } from 'src/airChange/pages/airChangeConfirmationPage';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import ReaccomConfirmationPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/change/reaccomConfirmationPageBuilder';
import AirChangeConfirmationPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/airChangeConfirmationPageBuilder';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testingLibraryUtils';

describe('airChangeConfirmationPage', () => {
  let defaultProps;
  let prepareCarCrossSellFromQueryAndTransitionToCarBookingStub;
  let pushStub;
  let retrieveTravelFundsStub;

  beforeEach(() => {
    prepareCarCrossSellFromQueryAndTransitionToCarBookingStub = jest.spyOn(
      CarBookingActions,
      'prepareCarCrossSellFromQueryAndTransitionToCarBooking'
    );
    pushStub = jest.fn();
    retrieveTravelFundsStub = jest.fn().mockResolvedValueOnce('promise');

    defaultProps = {
      push: pushStub,
      pageHeaderSubtitle: 'AUS - DAL',
      changeConfirmationPage: new AirChangeConfirmationPageBuilder().build().changeConfirmation,
      reaccomConfirmationPage: {},
      accountNumber: '',
      youOwe: null,
      totalDueNow: null,
      changeType: {
        evenExchange: false,
        upGrade: true,
        downGrade: false
      },
      retrieveTravelFundsFn: retrieveTravelFundsStub,
      prepareCarCrossSellFromQueryAndTransitionToCarBookingFn: prepareCarCrossSellFromQueryAndTransitionToCarBookingStub
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Air Change Confirmation', () => {
    it('should render', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should not render header when in a webview', () => {
      const { container } = createComponent({ isWebView: true });

      expect(container).toMatchSnapshot();
    });

    it('should display points refund message when points downgrade', () => {
      const { container } = createComponent({
        changeConfirmationPage: confirmationPageWithPointsDowngradeMoneyUpgrade.changeConfirmation,
        changeType: {
          evenExchange: false,
          upGrade: false,
          downGrade: true
        },
        accountNumber: '424452455'
      });

      expect(container).toMatchSnapshot();
    });

    it('should display points deduct message when points upgrade', () => {
      const { container } = createComponent({
        changeConfirmationPage: confirmationPageWithPointsDowngradeMoneyUpgrade.changeConfirmation,
        changeType: {
          evenExchange: false,
          upGrade: true,
          downGrade: false
        },
        accountNumber: '424452455'
      });

      expect(container).toMatchSnapshot();
    });

    it('should not display car booking button if _links is null', () => {
      const { container } = createComponent({
        changeConfirmationPage: {
          ...confirmationPageWithPointsDowngradeMoneyUpgrade.changeConfirmation,
          _links: null
        },
        changeType: {
          evenExchange: false,
          upGrade: true,
          downGrade: false
        },
        accountNumber: '424452455'
      });

      expect(container).toMatchSnapshot();
    });

    it('should display FundResultsList when paid with credit card', () => {
      const { container } = createComponent({
        changeConfirmationPage: new AirChangeConfirmationPageBuilder().withUpgrade().build().changeConfirmation
      });

      expect(container).toMatchSnapshot();
    });

    it('should display FundResultsList when paid with travel funds', () => {
      const { container } = createComponent({
        changeConfirmationPage: new AirChangeConfirmationPageBuilder().withUpgrade().withFundsApplied().build()
          .changeConfirmation
      });

      expect(container).toMatchSnapshot();
    });

    describe('car booking banner', () => {
      it('should display', () => {
        const { container } = createComponent();

        expect(container.querySelector('.car-cross-sell--banner')).not.toBeNull();
      });

      it('should trigger redux cross-sell action to pre-fill/navigate to car booking when clicked', () => {
        const { container } = createComponent();

        fireEvent.click(container.querySelector('.car-cross-sell--button'));

        expect(prepareCarCrossSellFromQueryAndTransitionToCarBookingStub).toHaveBeenCalledWith(
          {
            'pickup-datetime': '2017-12-18T11:30',
            'pickup-location': 'DAL',
            'return-datetime': '2017-12-20T11:30',
            'return-location': 'AUS'
          },
          undefined
        );
      });
    });

    it('should render the updated confirmation header', () => {
      const { container } = createComponent();

      expect(container.querySelector('.confirmation-trip-header')).not.toBeNull();
    });
  });

  describe('Reaccom Change Confirmation', () => {
    it('should display the same flight confirmation info as airChange', () => {
      const { container } = createComponent();

      expect(container.querySelector('.page-header .normal').textContent).toEqual('AUS - DAL');
      expect(container.querySelector('.trip-booked')).not.toBeNull();
      expect(container.querySelector('.link-bar')).not.toBeNull();
      expect(container.querySelector('.nav-item-link')).not.toBeNull();
      expect(container.querySelector('.confirmation-trip-header')).not.toBeNull();
      expect(container.querySelector('.reservation-flight-summary')).not.toBeNull();
      expect(container.querySelector('.passenger-price')).not.toBeNull();
      expect(container.querySelector('[data-qa="passenger-price-passengers--number-and-type"]').textContent).toEqual(
        '1 Adult'
      );
    });

    it('should not display the MessageWithInstructions when chapi returns null for pageHeaderMessage', () => {
      let reaccomConfirmationPage = new ReaccomConfirmationPageBuilder().build().reaccomConfirmation;

      reaccomConfirmationPage = { ...reaccomConfirmationPage, ...{ headerMessage: null } };

      const { container } = createComponent({
        changeConfirmationPage: {},
        reaccomConfirmationPage
      });

      expect(container.querySelector('.trip-booked')).toBeNull();
      expect(container.querySelector('.trip-booked--content')).toBeNull();
    });

    it('should not display any of the refund or billing information', () => {
      const { container } = createComponent({
        changeConfirmationPage: {},
        reaccomConfirmationPage: new ReaccomConfirmationPageBuilder().build().reaccomConfirmation
      });

      expect(container.querySelector('.bggray2')).toBeNull();
      expect(container.querySelector('.fund-results-list')).toBeNull();
      expect(container.querySelector('.fund-results-list--billing-info')).toBeNull();
    });

    it('should display reaccom ticket error message when return by chapi', () => {
      const { container } = createComponent({
        changeConfirmationPage: {},
        reaccomConfirmationPage: new ReaccomConfirmationPageBuilder().withTicketingFailureMessage().build()
          .reaccomConfirmation
      });

      expect(container.querySelector('.reaccom-banner')).not.toBeNull();
    });

    it('should display reaccom checkin error message when return by chapi', () => {
      const { container } = createComponent({
        changeConfirmationPage: {},
        reaccomConfirmationPage: new ReaccomConfirmationPageBuilder().withCheckinFailureMessage().build()
          .reaccomConfirmation
      });

      expect(container.querySelector('.reaccom-banner')).not.toBeNull();
    });

    it('should display `View travel funds` button when refund held for future use', () => {
      const { container } = createComponent({
        changeType: {
          evenExchange: false,
          upGrade: false,
          downGrade: true
        },
        changeConfirmationPage: new AirChangeConfirmationPageBuilder().withDowngradeReturnToTravelFunds().build()
          .changeConfirmation
      });

      expect(container.querySelector('.view-travel-funds-button')).not.toBeNull();
    });

    it('should retrieveTravelFundsFn and push to travel funds lookup page when `View travel funds` is clicked', () => {
      const { container } = createComponent({
        changeType: {
          evenExchange: false,
          upGrade: false,
          downGrade: true
        },
        changeConfirmationPage: new AirChangeConfirmationPageBuilder().withDowngradeReturnToTravelFunds().build()
          .changeConfirmation
      });
      const travelFundsButton = container.querySelector('.view-travel-funds-button');

      fireEvent.click(travelFundsButton);

      expect(retrieveTravelFundsStub).toHaveBeenCalled();
      expect(pushStub).toHaveBeenCalled();
    });

    it('should not display `View travel funds` button when refund sent to credit card', () => {
      const { container } = createComponent({
        changeType: {
          evenExchange: false,
          upGrade: false,
          downGrade: true
        },
        changeConfirmationPage: new AirChangeConfirmationPageBuilder().withDowngradeReturnToCreditCard().build()
          .changeConfirmation
      });

      expect(container.querySelector('.view-travel-funds-button')).toBeNull();
    });
  });

  const createComponent = (props = {}) => {
    const finalProps = { ...defaultProps, ...props };

    return mountWithMemoryRouterAndState(AirChangeConfirmationPage, {}, null, finalProps);
  };
});
