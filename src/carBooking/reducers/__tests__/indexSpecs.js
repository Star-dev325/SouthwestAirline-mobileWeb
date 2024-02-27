import _ from 'lodash';
import carBookingReducers from 'src/carBooking/reducers';

describe('carBookingReducers', () => {
  let locations;
  let vendors;
  let expectedInitialState;

  beforeEach(() => {
    locations = [
      {
        airport: { code: 'DAL', airportName: 'Dallas' }
      },
      {
        airport: { code: 'HOU', airportName: 'Houston' }
      }
    ];

    vendors = [
      { name: 'Alamo', vendorId: 'ALM' },
      { name: 'Avis', vendorId: 'AVS' },
      { name: 'Budget', vendorId: 'BDG' }
    ];

    expectedInitialState = {
      carLocations: [],
      carVendors: [],
      carShoppingResultsPage: {
        response: {},
        searchRequest: null,
        carResults: null
      },
      carPricingPage: {
        response: {},
        selectedCar: {},
        carReservation: {},
        selectedExtras: []
      },
      selectedSearchRequest: null,
      recentSearchRequests: [],
      userInfo: {
        driverInfo: null,
        contactInfo: null
      },
      carBookingConfirmationPage: {},
      carVendorTermsAndConditions: []
    };
  });

  it('should return default state when action is undefined', () => {
    expect(carBookingReducers()).to.deep.equal(expectedInitialState);
  });

  it('should populate default values for carBooking redux node when INIT action is triggered', () => {
    const results = carBookingReducers(undefined, {
      type: 'INIT'
    });

    expect(results).to.deep.equal(expectedInitialState);
  });

  it('should populate carLocations when action CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS is triggered', () => {
    const results = carBookingReducers(undefined, {
      type: 'CAR_BOOKING__FETCH_CAR_LOCATIONS_SUCCESS',
      response: { locations }
    });

    const expectedState = _.merge({}, expectedInitialState, { carLocations: locations });

    expect(results).to.deep.equal(expectedState);
  });

  it('should populate carVendors when action CAR_BOOKING__FETCH_CAR_VENDORS_SUCCESS is triggered', () => {
    const results = carBookingReducers(undefined, {
      type: 'CAR_BOOKING__FETCH_CAR_VENDORS_SUCCESS',
      response: { vendors }
    });

    const expectedState = _.merge({}, expectedInitialState, { carVendors: vendors });

    expect(results).to.deep.equal(expectedState);
  });

  it('should populate carBookingConfirmationPage when action CAR_BOOKING__BOOK_CAR_SUCCESS is triggered', () => {
    const results = carBookingReducers(undefined, {
      type: 'CAR_BOOKING__BOOK_CAR_SUCCESS',
      response: 'response'
    });

    const expectedState = _.merge({}, expectedInitialState, { carBookingConfirmationPage: { response: 'response' } });

    expect(results).to.deep.equal(expectedState);
  });

  it('should reset carBooking state to default state when action CAR_BOOKING__RESET_FLOW_DATA is triggered', () => {
    const recentSearchRequests = ['someSearch'];
    const populatedState = {
      carLocations: [{ carLocation: 'DAL' }],
      carVendors: [{ vendor: 'Avis' }],
      carShoppingResultsPage: {
        response: 'response',
        searchRequest: 'searchRequest'
      },
      carPricingPage: {
        response: 'response',
        selectedCar: 'selectedCar',
        carReservation: 'reservation',
        selectedExtras: [{ type: 'ski rack' }]
      },
      selectedSearchRequest: null,
      recentSearchRequests,
      userInfo: {
        driverInfo: { firstName: 'Fred' },
        contactInfo: { phoneNumber: '123-456-7890' }
      },
      carBookingConfirmationPage: 'carBookingConfirmationPage'
    };

    _.set(expectedInitialState, 'recentSearchRequests', recentSearchRequests);
    const results = carBookingReducers(populatedState, {
      type: 'CAR_BOOKING__RESET_FLOW_DATA'
    });

    expect(results).to.deep.equal(expectedInitialState);
  });

  it('should populate carVendorTermsAndConditions when action is CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS_SUCCESS', () => {
    const results = carBookingReducers(undefined, {
      type: 'CAR_BOOKING__FETCH_VENDOR_TERMS_AND_CONDITIONS_SUCCESS',
      response: ['response']
    });

    const expectedState = _.merge({}, expectedInitialState, { carVendorTermsAndConditions: ['response'] });

    expect(results).to.deep.equal(expectedState);
  });
});
