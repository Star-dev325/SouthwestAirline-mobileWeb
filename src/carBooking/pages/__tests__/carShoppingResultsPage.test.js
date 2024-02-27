import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import { CarShoppingResultsPage } from 'src/carBooking/pages/carShoppingResultsPage';
import { transformShoppingResponse } from 'src/shared/api/transformers/carBookingApiTransformers';
import CarVendorsCommonBuilder from 'test/builders/apiResponse/content/generated/data/carVendorsCommonBuilder';
import Locations from 'test/builders/apiResponse/v1/car-reservations/locations';
import CarShoppingSearchBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/cars/products/carShoppingSearchBuilder';
import * as CarResultsBuilder from 'test/builders/model/carResultsBuilder';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarShoppingResultsPage', () => {
  const searchRequestObj = {
    carCompany: [
      {
        acceptedDiscounts: {
          corporateRate: { name: 'Avis Worldwide Discount (AWD)' },
          frequentRenterNumber: { name: 'Wizard Number' },
          promotionalCode: { name: 'Coupon Number' }
        },
        isRapidRewardsPartner: true,
        name: 'AVIS',
        vendorId: 'AVIS'
      },
      {
        acceptedDiscounts: {
          corporateRate: { name: 'Corporate Discount (CD Number)' },
          frequentRenterNumber: { name: 'Express ID' },
          promotionalCode: { name: 'Promotion Code' }
        },
        isRapidRewardsPartner: true,
        name: 'DOLLAR',
        vendorId: 'DOLLAR'
      }
    ],
    dropOff: 'BTV',
    dropOffAirport: {
      airport: {
        airportName: 'Burlington, VT - BTV',
        code: 'BTV'
      },
      city: 'Burlington',
      state: 'VT'
    },
    dropOffDate: '2024-01-23',
    dropOffTime: '11:00AM',
    pickUp: 'ABI',
    pickUpAirport: {
      airport: {
        airportName: 'Abilene, TX - ABI',
        code: 'ABI'
      },
      city: 'Abilene',
      state: 'TX'
    },
    pickUpDate: '2024-01-20',
    pickUpTime: '11:00AM',
    vehicleType: 'MIDSIZE'
  };
  const findCarResponseObj = [
    {
      additionalCharges: {
        dropOffChargeCents: 0,
        mileage: {
          cents: 0,
          freeMileage: 'Unlimited',
          per: ''
        },
        noShowFeeCents: 0
      },
      appliedDiscounts: [],
      name: 'Group E - Toyota Camry or similar',
      price: {
        dailyRateCents: 12345,
        dailyRateWithCurrencyCode: {
          amount: '100.90',
          currencyCode: 'USD'
        },
        rates: [
          {
            cents: 12345,
            quantity: 3,
            per: 'DAY'
          }
        ],
        totalCents: 12345,
        totalCentsWithTaxes: 1234,
        totalWithCurrencyCode: {
          amount: '200.90',
          currencyCode: 'USD'
        },
        totalWithTaxesAndCurrencyCode: {
          amount: '220.90',
          currencyCode: 'USD'
        }
      },
      productId: 'abcd',
      vendor: 'AVIS',
      vehicleType: 'MIDSIZE'
    }
  ];

  let carResults;
  let chapiResponse;
  let findCarResponse;

  beforeEach(() => {
    carResults = CarResultsBuilder.build();
    chapiResponse = transformShoppingResponse(new CarShoppingSearchBuilder().build());
    findCarResponse = chapiResponse.carProducts;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('not render', () => {
    it('should not render when prop CarResults is null', () => {
      const { container } = createPageComponent({ carResults: null });

      expect(container).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should display the page header', () => {
      const { container } = createPageComponent();

      expect(container).toMatchSnapshot();
    });

    it('should display the page header if the isWebView prop is true', () => {
      const { container } = createPageComponent({ isWebView: true });

      expect(container).toMatchSnapshot();
    });
  });

  describe('click car type ribbon', () => {
    it('should call saveCarSearchRequest action when car ribbon car type is clicked', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelectorAll('.car-type-strip--item')[0]);

      expect(CarBookingActions.saveFindCarSearchRequest).toHaveBeenCalledWith({
        carCompany: 'CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT',
        discount: [],
        dropOff: 'ABI',
        dropOffDate: '2018-03-26',
        dropOffTime: '11:30AM',
        pickUp: 'ABI',
        pickUpDate: '2018-03-23',
        pickUpTime: '11:30AM',
        vehicleType: 'Compact'
      });
    });
  });

  describe('click car results', () => {
    it('should call retrieveCarPricing action when available car result is clicked', () => {
      const { container } = createPageComponent();
      const expectedCarResults = {
        appliedDiscount: undefined,
        dailyRateWithCurrencyCode: {
          amount: '36.93',
          currencyCode: 'USD'
        },
        imageUrl: '/content/mkt/images/car_vendors/Hertz_Logo_results.png',
        incentiveText: 'Earn up to 600 points',
        isRapidRewardsPartner: true,
        isUnavailable: false,
        pricePerDayCents: 3693,
        productId: 'eyIwIjoiMjAxOS0wNS0xN1QxMTozMCIsIjEiOiJBQkkiLCIyIjoiMjAxOS0wNS0yMFQxMTozMCIsIjMiOiJBQkkiLCI0IjoiSEVSVFoiLCI1IjoiTUlEU0laRSIsIjYiOiJJQ0FSIiwiNyI6Ik4ySjhWVzU5MFcyNDAzNy0yNTAzIiwiOCI6IlJDVUQzIiwiOSI6IkMgTUFaREEgMyA0IERPT1IgT1IgU0lNSUxBUiIsIjEwIjp7IjAiOnsidiI6IjM2LjkzIn0sIjEiOnsidiI6Ijc1LjI0In0sIjIiOnsidiI6IjExMC43OSJ9LCIzIjpbeyIwIjp7InYiOiIyNS4wOCJ9LCIxIjoiREFZIiwiMiI6M31dLCI0IjpbeyIwIjoiVGF4IiwiMSI6eyJ2IjoiMTAuMDcifX0seyIwIjoiQUlSUE9SVCBDT05DRVNTSU9OIFJFQ09WRVJZOiIsIjEiOnsidiI6IjkuMTcifX0seyIwIjoiQ1VTVE9NRVIgRkFDSUxJVFkgQ0hBUkdFOiIsIjEiOnsidiI6IjkuMDAifX0seyIwIjoiUFJPUEVSVFkgVEFYLCBUSVRMRS9MSUNFTlNFIFJFSU1CVVJTRU1FTlQ6IiwiMSI6eyJ2IjoiNS44MiJ9fSx7IjAiOiJFTkVSR1kgU1VSQ0hBUkdFOiIsIjEiOnsidiI6IjEuNDkifX1dfSwiMTEiOnsibSI6eyJhIjp7InYiOiIwLjAwIn0sInAiOiJNaWxlIiwiZk0iOiJVbmxpbWl0ZWQifSwickMiOnsidiI6IjAuMDAifSwiblNGIjp7InYiOiIwLjAwIn19LCIxMiI6IlVTRCJ9',
        promoCodeApplied: false,
        totalCentsWithTaxes: 11079,
        totalWithTaxesAndCurrencyCode: {
          amount: '110.79',
          currencyCode: 'USD'
        },
        vendorName: 'Hertz'
      };

      const expectedSearchRequest = {
        carCompany: 'CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT',
        discount: [],
        dropOff: 'ABI',
        dropOffDate: '2018-03-26',
        dropOffTime: '11:30AM',
        pickUp: 'ABI',
        pickUpDate: '2018-03-23',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      fireEvent.click(container.querySelectorAll('.car-result')[0]);

      expect(CarBookingActions.retrieveCarPricing).toHaveBeenCalledWith(expectedCarResults, expectedSearchRequest);
    });

    it('should call when available car result is clicked', () => {
      const { container } = createPageComponent();
      
      fireEvent.click(container.querySelectorAll('[data-qa="car-result-unavailable"]')[0]);

      expect(CarBookingActions.retrieveCarPricing).not.toHaveBeenCalled();
    });
  });

  describe('deeplinking query', () => {
    it('should render the page if the query params for car booking search are present and the Redux store for Car Booking is empty and the discount code is multiple', () => {
      const props = {
        findCarResponse: {},
        query: {
          carCode: ['1234', '3456'],
          carCodeType: ['PROMOTIONAL_CODE', 'FREQUENT_RENTER'],
          carCodeVendor: ['DOLLAR', 'AVIS'],
          pickUpTime: '11:30',
          pickUpLocation: 'AUS',
          returnLocation: 'AUS',
          returnTime: '11:30',
          vendors: ['AVIS', 'ALAMO', 'DOLLAR']
        },
        searchRequest: {}
      };

      const rerenderProps = {
        findCarResponse: findCarResponseObj,
        searchRequest: searchRequestObj
      };
      
      const { rerender } = createPageComponent(props);

      rerender(
        <Provider store={createMockedFormStore({ app: {} })}>
          <Router>
            <CarShoppingResultsPage { ...getDefaultProps(rerenderProps) } />
          </Router>
        </Provider>
      );
      expect(CarBookingActions.startNewSessionFlow).toHaveBeenCalled();
    });

    it('should render the page if the query params for car booking search are present and the Redux store for Car Booking is empty and the discount code is singular', () => {
      const props = {
        findCarResponse: {},
        query: {
          carCode: '1234',
          carCodeType: 'PROMOTIONAL_CODE',
          carCodeVendor: 'DOLLAR',
          pickUpTime: '11:30',
          pickUpLocation: 'AUS',
          returnLocation: 'AUS',
          returnTime: '11:30',
          vendors: ['AVIS', 'ALAMO', 'DOLLAR']
        },
        searchRequest: {}
      };

      const rerenderProps = {
        findCarResponse: findCarResponseObj,
        searchRequest: searchRequestObj
      };
      
      const { rerender } = createPageComponent(props);

      rerender(
        <Provider store={createMockedFormStore({ app: {} })}>
          <Router>
            <CarShoppingResultsPage { ...getDefaultProps(rerenderProps) } />
          </Router>
        </Provider>
      );
      expect(CarBookingActions.startNewSessionFlow).toHaveBeenCalled();
    });

    it('should render the page if the query params for car booking search are present, the searchRequest state prop is not empty, and the Redux store for Car Booking is empty', () => {
      const props = {
        findCarResponse: {},
        query: {
          carCode: '1234',
          carCodeType: 'PROMOTIONAL_CODE',
          carCodeVendor: 'DOLLAR',
          pickUpTime: '11:30',
          pickUpLocation: 'AUS',
          returnLocation: 'AUS',
          returnTime: '11:30',
          vendors: ['AVIS', 'ALAMO', 'DOLLAR']
        },
        searchRequest: searchRequestObj
      };

      const rerenderProps = {
        findCarResponse: findCarResponseObj,
        searchRequest: searchRequestObj
      };
      
      const { rerender } = createPageComponent(props);

      rerender(
        <Provider store={createMockedFormStore({ app: {} })}>
          <Router>
            <CarShoppingResultsPage { ...getDefaultProps(rerenderProps) } />
          </Router>
        </Provider>
      );
      expect(CarBookingActions.startNewSessionFlow).toHaveBeenCalled();
    });

    it('should render the page if the query params without discount code for car booking search are present and the Redux store for Car Booking is empty', () => {
      const props = {
        findCarResponse: {},
        query: {
          pickUpTime: '11:30',
          pickUpLocation: 'AUS',
          returnLocation: 'AUS',
          returnTime: '11:30',
          vendors: ['AVIS', 'ALAMO', 'DOLLAR']
        },
        searchRequest: {}
      };

      const rerenderProps = {
        findCarResponse: findCarResponseObj,
        searchRequest: searchRequestObj
      };
      
      const { rerender } = createPageComponent(props);

      rerender(
        <Provider store={createMockedFormStore({ app: {} })}>
          <Router>
            <CarShoppingResultsPage { ...getDefaultProps(rerenderProps) } />
          </Router>
        </Provider>
      );
      expect(CarBookingActions.startNewSessionFlow).toHaveBeenCalled();
    });

    it('should render the page if the query params for car booking search are present and the Redux store for Car Booking is empty all of the vendors are listed', () => {
      const props = {
        findCarResponse: {},
        query: {
          carCode: ['1234', '3456'],
          carCodeType: ['PROMOTIONAL_CODE', 'FREQUENT_RENTER'],
          carCodeVendor: ['DOLLAR', 'AVIS'],
          pickUpTime: '11:30',
          pickUpLocation: 'AUS',
          returnLocation: 'AUS',
          returnTime: '11:30',
          vendors: ['AVIS', 'ALAMO', 'DOLLAR', 'BUDGET', 'HERTZ', 'THRIFTY', 'ZL', 'ZA', 'FX', 'ET', 'EZ', 'AD']
        },
        searchRequest: {}
      };
      
      createPageComponent(props);

      expect(CarBookingActions.startNewSessionFlow).toHaveBeenCalled();
    });

    it('should render the page if the query params for car booking search are present and the Redux store for Car Booking is empty and query params vendors do not match vendor list', () => {
      const props = {
        findCarResponse: {},
        query: {
          carCode: ['1234', '3456'],
          carCodeType: ['PROMOTIONAL_CODE', 'FREQUENT_RENTER'],
          carCodeVendor: ['DOLLAR', 'AVIS'],
          pickUpTime: '11:30',
          pickUpLocation: 'AUS',
          returnLocation: 'AUS',
          returnTime: '11:30',
          vendors: ['ABS', 'CDE', 'JIK']
        },
        searchRequest: {}
      };
      
      createPageComponent(props);

      expect(CarBookingActions.startNewSessionFlow).toHaveBeenCalled();
    });

    it('should render the page if the query params for car booking search are present and the Redux store for Car Booking is empty and missing query params will use their default values', () => {
      const props = {
        findCarResponse: {},
        query: {
          carCode: ['1234', '3456'],
          carCodeType: ['PROMOTIONAL_CODE', 'FREQUENT_RENTER'],
          carCodeVendor: ['DOLLAR', 'AVIS'],
          pickUpLocation: 'AUS',
          returnLocation: 'AUS'
        },
        searchRequest: {}
      };
      
      createPageComponent(props);

      expect(CarBookingActions.startNewSessionFlow).toHaveBeenCalled();
    });
  });

  const createPageComponent = (props = {}) => {
    const state = {
      app: {}
    };

    const mergedProps = { ...getDefaultProps(props), ...props };

    return render((
      <Provider store={createMockedFormStore(state)}>
        <Router>
          <CarShoppingResultsPage {...mergedProps} />
        </Router>
      </Provider>
    ));
  };

  const getDefaultProps = (props) => ({
    carLocations: new Locations().build().locations,
    carResults: props.carResults ?? carResults,
    carVendorImages: new CarVendorsCommonBuilder().build().car_vendors,
    carVendors: CarVendorsBuilder.build(),
    findCarsFn: jest.spyOn(CarBookingActions, 'findCars'),
    findCarResponse: props.findCarResponse ?? findCarResponse,
    promoCodesResponse: [],
    query: props.query ?? {},
    retrieveCarPricingFn: jest.spyOn(CarBookingActions, 'retrieveCarPricing'),
    saveCarResultsFn: jest.spyOn(CarBookingActions, 'saveCarResults'),
    saveFindCarSearchRequestFn: jest.spyOn(CarBookingActions, 'saveFindCarSearchRequest'),
    searchRequest: props.searchRequest ?? {
      carCompany: i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT'),
      discount: [],
      dropOff: 'ABI',
      dropOffDate: '2018-03-26',
      dropOffTime: '11:30AM',
      pickUp: 'ABI',
      pickUpDate: '2018-03-23',
      pickUpTime: '11:30AM',
      vehicleType: 'Mid-size'
    },
    startNewSessionFlowFn: jest.spyOn(CarBookingActions, 'startNewSessionFlow')
  });
});
