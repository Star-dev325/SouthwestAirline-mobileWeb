import airBookingReducers from 'src/airBooking/reducers/index';
import _ from 'lodash';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';

describe('indexSpecs', () => {
  let defaultState;
  let previousState;

  before(() => {
    defaultState = airBookingReducers(undefined, { type: '@@INIT' });
    previousState = _.merge({}, defaultState, { status: 'init' });
  });

  it('should return previousState when action type is not exist', () => {
    const updatedState = airBookingReducers(previousState, { type: 'type is not exist in airBookingTypes' });

    expect(updatedState).to.deep.equal(previousState);
  });

  it('should reset air booking flow data except search request, recent search pages, corporate switch info, and lfc enabled when action type is RESET_AIR_BOOKING_FLOW_DATA', () => {
    const searchRequest = {
      tripType: 'roundTrip',
      isRoundTrip: true,
      origin: 'DAL',
      destination: 'MDW',
      departureDate: '2017-10-10',
      returnDate: '2017-11-10',
      numberOfAdults: 3,
      promoCode: '',
      currencyType: 'USD'
    };
    const corporateBookingSwitchInfo = {
      label: 'Book With SWABIZ',
      learnMoreUrl: 'learn/more/url',
      nonCorporateLearnMoreUrl: 'non/corporate/learn/more/url'
    };
    const modifiedState = _.merge(
      {},
      defaultState,
      { searchRequest },
      { paymentInfo: { test: 'test' }, recentSearchesPage: { searches: ['123'] } },
      { corporateBookingSwitchInfo }
    );

    const updatedState = airBookingReducers(modifiedState, {
      type: AirBookingActionTypes.AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA
    });

    const expectedDefaultStateWithNonDefaultSearchRequest = _.merge(
      {},
      defaultState,
      { searchRequest },
      { recentSearchesPage: { searches: ['123'] } },
      { corporateBookingSwitchInfo }
    );

    expect(updatedState).to.deep.equal(expectedDefaultStateWithNonDefaultSearchRequest);
  });

  it('should return empty object paymentInfo when action type is FETCH_SAVED_CREDIT_CARDS_SUCCESS', () => {
    const updatedState = airBookingReducers(defaultState, {
      type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS
    });

    expect(updatedState.paymentInfo).to.deep.equal({});
  });

  it('should return empty object paymentInfo when action type is SET_SAVED_CREDIT_CARDS', () => {
    const updatedState = airBookingReducers(defaultState, {
      type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS
    });

    expect(updatedState.paymentInfo).to.deep.equal({});
  });
});
