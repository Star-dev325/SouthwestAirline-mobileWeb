import { fireEvent } from '@testing-library/react';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import { CompanionConfirmationPage } from 'src/companion/pages/companionConfirmationPage';
import FlightsPurchasePageBuilder from 'test/builders/apiResponse/flightsPurchasePageBuilder';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testingLibraryUtils';

describe('CompanionConfirmationPage', () => {
  let defaultProps;
  let prepareCarCrossSellFromQueryAndTransitionToCarBookingMock;
  let pushMock;

  beforeEach(() => {
    prepareCarCrossSellFromQueryAndTransitionToCarBookingMock = jest.spyOn(
      CarBookingActions,
      'prepareCarCrossSellFromQueryAndTransitionToCarBooking'
    );
    pushMock = jest.fn();

    defaultProps = {
      ...response,
      prepareCarCrossSellFromQueryAndTransitionToCarBookingFn:
        prepareCarCrossSellFromQueryAndTransitionToCarBookingMock,
      push: pushMock,
      match: { params: { url: 'test' } },
      location: { search: 'search' }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should have confirmation page components with FundResultsList', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render if header message is empty', () => {
      const responseWithoutHeaderMessage = new FlightsPurchasePageBuilder()
        .withoutHeaderMessage()
        .build().flightConfirmationPage;
      const { container } = createComponent({ ...responseWithoutHeaderMessage });

      expect(container.querySelector('.companion-confirmation')).toMatchSnapshot();
    });

    it('should show check email messaging when bounds is null', () => {
      const { container } = createComponent({ bounds: null });

      expect(container.querySelector('.purchase-confirmation--trip-booked').textContent).toEqual(
        'Your trip is booked!Check in up to 24 hours in advance. The earlier you check in, the better your seat selection.'
      );
    });
  });

  describe('passenger price', () => {
    it('should render the updated confirmation header', () => {
      const { container } = createComponent();

      expect(container.querySelector('.confirmation--early-bird-button')).toBeNull();
    });
  });

  describe('car cross sell', () => {
    describe('render', () => {
      it('render should show car cross sell button', () => {
        const { container } = createComponent();

        expect(container.querySelector('.car-cross-sell--banner')).not.toBeNull();
      });
    });

    describe('on click of car cross sell button', () => {
      it('should send a redux action to prefill the car search form when', () => {
        const { container } = createComponent();

        fireEvent.click(container.querySelector('.car-cross-sell--button'));

        expect(prepareCarCrossSellFromQueryAndTransitionToCarBookingMock).toHaveBeenCalledWith({
          'pickup-datetime': '2017-12-18T11:30',
          'pickup-location': 'DAL',
          'return-datetime': '2017-12-20T11:30',
          'return-location': 'AUS'
        });
      });
    });
  });

  const response = new FlightsPurchasePageBuilder().build().flightConfirmationPage;

  const createComponent = (props = {}) => {
    const finalProps = { ...defaultProps, ...props };

    return mountWithMemoryRouterAndState(CompanionConfirmationPage, {}, null, finalProps);
  };
});
