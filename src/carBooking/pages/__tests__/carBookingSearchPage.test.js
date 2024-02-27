import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import { CAR_BOOKING_PICKUP_CITY_MODAL_ID, CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT } from 'src/carBooking/constants/carBookingConstants';
import { CarBookingSearchPage } from 'src/carBooking/pages/carBookingSearchPage';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import { getCarLocations } from 'test/builders/model/carLocationsBuilder';
import FakeClock from 'test/unit/helpers/fakeClock';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const noop = jest.fn();

describe('carBookingSearchPage', () => {
  let pushMock;
  let updateFormFieldDataValueMock;

  beforeEach(() => {
    FakeClock.setTimeTo('2018-03-22T11:19');
    pushMock = noop;
    updateFormFieldDataValueMock = noop;
  });

  afterEach(() => {
    jest.resetAllMocks();
    FakeClock.restore();
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      carLocations: !props.carLocations ? getCarLocations() : props.carLocations,
      carVendors: [],
      findCarsFn: jest.spyOn(CarBookingActions, 'findCars'),
      getRecentSearchesFromLocalStorageFn: jest.spyOn(CarBookingActions, 'getRecentSearchesFromLocalStorage'),
      lastBookableDate: dayjs().add(90, 'days').format('YYYY-MM-DD'),
      push: pushMock,
      retrieveCarLocationsFn: jest.spyOn(CarBookingActions, 'retrieveCarLocations'),
      retrieveCarVendorImagesFn: jest.spyOn(WcmActions, 'retrieveCarVendorImages'),
      retrieveCarVendorsFn: jest.spyOn(CarBookingActions, 'retrieveCarVendors'),
      updateFormFieldDataValueFn: updateFormFieldDataValueMock
    };

    const state = {
      app: {},
      router: {
        location: {
          search: `_modal=${CAR_BOOKING_PICKUP_CITY_MODAL_ID}`
        }
      }
    };
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <Router>
          <CarBookingSearchPage {...mergedProps} />
        </Router>
      </Provider>
    );
  };

  it('should trigger actions when component mounts', () => {
    createPageComponent();

    expect(WcmActions.retrieveCarVendorImages).toHaveBeenCalled();
    expect(CarBookingActions.getRecentSearchesFromLocalStorage).toHaveBeenCalled();
    expect(CarBookingActions.retrieveCarLocations).toHaveBeenCalled();
    expect(CarBookingActions.retrieveCarVendors).toHaveBeenCalled();
  });

  it('should render PageHeader and CarBookingSearchForm', () => {
    const { container } = createPageComponent();

    expect(container.querySelector('.page-header')).not.toBeNull();
    expect(container.querySelector('[name="car-booking-search-form"]')).not.toBeNull();
  });

  describe('submit', () => {
    beforeEach(() => {
      const instance = React.createRef();
      const { container } = createPageComponent({
        ref: instance,
        selectedSearchRequest: { pickUp: 'ATL', dropOff: 'ATL' }
      });

      fireEvent.click(container.querySelector('[data-qa="car-pick-up"]'));
      fireEvent.submit(container.querySelector('form'));
    });

    it('should trigger findCars action after user click find car button', () => {
      expect(CarBookingActions.findCars).toHaveBeenCalledWith({
        carCompany: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT'),
        discount: [
          {
            code: '',
            type: '',
            vendor: ''
          },
          {
            code: '',
            type: '',
            vendor: ''
          }
        ],
        dropOff: 'ATL',
        dropOffAirport: {
          airport: { airportName: 'Atlanta, GA - ATL', code: 'ATL' },
          city: 'Atlanta',
          state: 'GA'
        },
        dropOffDate: '2018-03-26',
        dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        pickUp: 'ATL',
        pickUpAirport: {
          airport: { airportName: 'Atlanta, GA - ATL', code: 'ATL' },
          city: 'Atlanta',
          state: 'GA'
        },
        pickUpDate: '2018-03-23',
        pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        vehicleType: i18n('CAR_BOOKING__MID_SIZE')
      });
    });

    it('should trigger updateFormFieldDataValue action 3 times after user click find car button', () => {
      expect(updateFormFieldDataValueMock).toHaveBeenCalledWith('CAR_BOOKING_SEARCH_FORM', 'pickUpTime', CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT);
      expect(updateFormFieldDataValueMock).toHaveBeenCalledWith('CAR_BOOKING_SEARCH_FORM', 'dropOffTime', CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT);
      expect(updateFormFieldDataValueMock).toHaveBeenCalledWith('CAR_BOOKING_SEARCH_FORM', 'departureAndReturnDate', {
        dropOffDate: '2018-03-26',
        isDateChanged: true,
        pickUpDate: '2018-03-23'
      });
    });

    it('should remove clean class from time selectors when form is submitted', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('[name="pickUpTime"]')).not.toHaveClass('clean');
      expect(container.querySelector('[name="dropOffTime"]')).not.toHaveClass('clean');
    });
  });
  describe('discounts', () => {
    it('should trigger findCars action with single discount if the two promos entered were same', () => {
      const instance = React.createRef();
      const { container } = createPageComponent({
        ref: instance,
        selectedSearchRequest: {
          carCode1: '',
          carCode2: '',
          carCodeType1: 'FREQUENT_RENTER',
          carCodeType2: 'FREQUENT_RENTER',
          carCodeVendor1: 'ALAMO',
          carCodeVendor2: 'ALAMO',
          dropOff: 'ATL',
          pickUp: 'ATL'
        }
      });

      fireEvent.click(container.querySelector('[data-qa="car-pick-up"]'));
      fireEvent.submit(container.querySelector('form'));

      expect(CarBookingActions.findCars).toHaveBeenCalledWith({
        carCompany: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT'),
        discount: [
          {
            code: '',
            type: 'FREQUENT_RENTER',
            vendor: 'ALAMO',
            vendorName: ''
          }
        ],
        dropOff: 'ATL',
        dropOffAirport: {
          airport: { airportName: 'Atlanta, GA - ATL', code: 'ATL' },
          city: 'Atlanta',
          state: 'GA'
        },
        dropOffDate: '2018-03-26',
        dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        pickUp: 'ATL',
        pickUpAirport: {
          airport: { airportName: 'Atlanta, GA - ATL', code: 'ATL' },
          city: 'Atlanta',
          state: 'GA'
        },
        pickUpDate: '2018-03-23',
        pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        vehicleType: i18n('CAR_BOOKING__MID_SIZE')
      });
    });

    it('should trigger findCars action with two discount if the promos entered were different', () => {
      const instance = React.createRef();
      const { container } = createPageComponent({
        ref: instance,
        selectedSearchRequest: {
          carCode1: '',
          carCode2: '',
          carCodeType1: 'FREQUENT_RENTER',
          carCodeType2: 'FREQUENT_RENTER',
          carCodeVendor1: 'ALAMO',
          carCodeVendor2: 'AVIS',
          dropOff: 'ATL',
          pickUp: 'ATL'
        }
      });

      fireEvent.submit(container.querySelector('form'));
      expect(CarBookingActions.findCars).toHaveBeenCalledWith({
        carCompany: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT'),
        discount: [
          {
            code: '',
            type: 'FREQUENT_RENTER',
            vendor: 'ALAMO',
            vendorName: ''
          },
          {
            code: '',
            type: 'FREQUENT_RENTER',
            vendor: 'AVIS',
            vendorName: ''
          }
        ],
        dropOff: 'ATL',
        dropOffAirport: {
          airport: { airportName: 'Atlanta, GA - ATL', code: 'ATL' },
          city: 'Atlanta',
          state: 'GA'
        },
        dropOffDate: '2018-03-26',
        dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        pickUp: 'ATL',
        pickUpAirport: {
          airport: { airportName: 'Atlanta, GA - ATL', code: 'ATL' },
          city: 'Atlanta',
          state: 'GA'
        },
        pickUpDate: '2018-03-23',
        pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        vehicleType: i18n('CAR_BOOKING__MID_SIZE')
      });
    });
  });

  it('should navigate to recent search page when user click RECENT button', () => {
    const { container } = createPageComponent();

    fireEvent.click(container.querySelector('.page-header--right-button'));

    expect(pushMock).toHaveBeenCalledWith(getNormalizedRoute({ routeName: 'recent' }));
  });

  describe('form search prop', () => {
    let searchRequest;

    beforeEach(() => {
      searchRequest = {
        dropOff: 'ABI',
        dropOffDate: '2020-03-15',
        dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        pickUp: 'ABR',
        pickUpDate: '2020-03-12',
        pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        vehicleType: 'Mid-size'
      };
    });

    it('should pass selected recent search to form when search is selected', () => {
      const { container } = createPageComponent({ selectedSearchRequest: searchRequest });

      expect(container.querySelector('.car-booking-form')).not.toBeNull();
    });

    it('should pass previous search to form when browser back (previous search and no selected search)', () => {
      const { container } = createPageComponent({ previousSearchRequest: searchRequest });

      expect(container.querySelector('.car-booking-form')).toMatchSnapshot();
    });

    it('should pass selected recent search to form when both recent and previous search are available', () => {
      const selectedSearchRequest = searchRequest;
      const previousSearchRequest = _.merge({}, searchRequest, {
        dropOff: 'DFW',
        pickUp: 'DFW'
      });
      const { container } = createPageComponent({
        selectedSearchRequest,
        previousSearchRequest
      });

      expect(container.querySelector('.car-booking-form')).toMatchSnapshot();
    });
  });
});
