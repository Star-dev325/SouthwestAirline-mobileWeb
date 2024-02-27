import _ from 'lodash';
import sinonModule from 'sinon';
import * as flightShoppingPageHelper from 'src/airBooking/helpers/flightShoppingPageHelper';
import flightShoppingPageReducers from 'src/airBooking/reducers/flightShoppingPageReducers';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import MultiSelectGroupBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/multiSelectGroupBuilder';

const sinon = sinonModule.sandbox.create();

describe('flightShoppingPageReducers', () => {
  let generateFlightShoppingPagesStub;

  beforeEach(() => {
    generateFlightShoppingPagesStub = sinon.stub(flightShoppingPageHelper, 'generateFlightShoppingPages');
    generateFlightShoppingPagesStub.returns('pages');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should init state', () => {
    expect(flightShoppingPageReducers(undefined, {})).to.deep.equal({
      multiSelectGroup: {},
      pages: [],
      response: {},
      sortBy: {
        adult: {
          inbound: 'departureTime',
          outbound: 'departureTime'
        }
      }
    });
  });

  it('should resume flightShoppingPage when come/back from chase page', () => {
    const airBookingDataToResume = {
      searchRequest: 'searchRequest',
      selectedProducts: 'selectedProducts',
      flightShoppingPage: 'flightShoppingPage'
    };

    const state = flightShoppingPageReducers(undefined, {
      type: AirBookingActionTypes.AIR_BOOKING__RESUME_AIR_BOOKING_FLOW_DATA,
      airBookingDataToResume
    });

    expect(state).to.deep.equal(airBookingDataToResume.flightShoppingPage);
  });

  describe('pages', () => {
    it('should use helper function generateFlightShoppingPages generate the pages from response', () => {
      const response = new ProductsBuilder().withInboundPage().build();
      const state = flightShoppingPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
        response
      });

      expect(generateFlightShoppingPagesStub).have.been.calledWith(response);
      expect(state.pages).to.be.equal('pages');
    });

    it('should return default state when action is undefined', () => {
      expect(flightShoppingPageReducers().pages).to.be.empty;
    });

    describe('sort flights', () => {
      it('should not include unavailable flights when sorting with price', () => {
        const givenState = generateInitStateForSortingFlights('adult', 'inbound');
        const state = flightShoppingPageReducers(givenState, {
          type: AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
          paxType: 'adult',
          direction: 'inbound',
          sortBy: 'startingFromAmount'
        });
        const expectedCardIds = ['SFO:DAL:3:2018-01-07', 'SFO:DAL:2:2018-01-07', 'SFO:DAL:1:2018-01-07'];
        const actualCardIds = _.map(state.pages[0].cards, '_meta.cardId');

        expect(actualCardIds).to.deep.equal(expectedCardIds);
      });

      it('should include unavailable flights when sorting with stop', () => {
        const givenState = generateInitStateForSortingFlights('adult', 'inbound');
        const state = flightShoppingPageReducers(givenState, {
          type: AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
          paxType: 'adult',
          direction: 'inbound',
          sortBy: 'numberOfStops'
        });
        const expectedCardIds = ['SFO:DAL:2:2018-01-07', 'SFO:DAL:1:2018-01-07', 'SFO:DAL:3:2018-01-07'];
        const actualCardIds = _.map(state.pages[0].cards, '_meta.cardId');

        expect(actualCardIds).to.deep.equal(expectedCardIds);
      });

      it('should include unavailable flights when sorting with durationMinutes', () => {
        const givenState = generateInitStateForSortingFlights('adult', 'inbound');
        const state = flightShoppingPageReducers(givenState, {
          type: AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
          paxType: 'adult',
          direction: 'inbound',
          sortBy: 'durationMinutes'
        });
        const expectedCardIds = ['SFO:DAL:3:2018-01-07', 'SFO:DAL:2:2018-01-07', 'SFO:DAL:1:2018-01-07'];
        const actualCardIds = _.map(state.pages[0].cards, '_meta.cardId');

        expect(actualCardIds).to.deep.equal(expectedCardIds);
      });

      const generateInitStateForSortingFlights = (paxType, direction) => ({
        pages: [
          {
            paxType,
            direction,
            header: {},
            cards: [
              {
                reasonIfUnavailable: 'Unavailable',
                _meta: {
                  cardId: 'SFO:DAL:1:2018-01-07',
                  departureTime: '1545',
                  durationMinutes: 295,
                  numberOfStops: 1,
                  startingFromAmount: 0
                }
              },
              {
                reasonIfUnavailable: null,
                _meta: {
                  cardId: 'SFO:DAL:2:2018-01-07',
                  departureTime: '1145',
                  durationMinutes: 285,
                  numberOfStops: 1,
                  startingFromAmount: 227
                }
              },
              {
                reasonIfUnavailable: null,
                _meta: {
                  cardId: 'SFO:DAL:3:2018-01-07',
                  departureTime: '1745',
                  durationMinutes: 265,
                  numberOfStops: 2,
                  startingFromAmount: 127
                }
              }
            ]
          }
        ]
      });
    });
  });

  describe('sortBy', () => {
    it('should sort the page cards when user change the sort strategy', () => {
      const state = flightShoppingPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
        direction: 'outbound',
        paxType: 'adult',
        sortBy: 'durationMinutes'
      });

      expect(state.sortBy.adult.outbound).to.be.equal('durationMinutes');
    });

    it('should reset the sortBy to init state when click continue button on flight search form', () => {
      const givenState = {
        pages: [],
        response: {},
        sortBy: {
          adult: {
            inbound: 'durationMinutes',
            outbound: 'departureTime'
          }
        }
      };
      const state = flightShoppingPageReducers(givenState, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE,
        isFetching: true,
        request: {}
      });

      expect(state.sortBy.adult.inbound).to.be.equal('departureTime');
    });
  });

  describe('response', () => {
    it('should set response after fetch success', () => {
      const response = new ProductsBuilder().withInboundPage().build();
      const state = flightShoppingPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SET_FLIGHT_SHOPPING_PAGE,
        response
      });

      expect(state.response).to.not.undefined;
    });

    it('should return default state when action is undefined', () => {
      expect(flightShoppingPageReducers().response).to.be.empty;
    });

    it('should clear analytics in shopping response when AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE is triggered', () => {
      const currentState = { ...new ProductsBuilder().withInboundPage().build() };
      const newState = flightShoppingPageReducers(currentState, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE
      });

      expect(newState.response.flightShoppingPage._analytics).to.be.null;
    });

    it('should clear response when AIR_BOOKING__RESET_FLIGHT_PRICING_PAGE_RESPONSE is triggered', () => {
      const currentState = { ...new ProductsBuilder().withInboundPage().build() };

      const newState = flightShoppingPageReducers(currentState, {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_FLIGHT_PRICING_PAGE_RESPONSE
      });

      expect(newState.response).to.deep.equal({});
    });
  });

  describe('multiSelectGroup', () => {
    it('should clear selectedBound after clearing multi select bounds', () => {
      const emptyMultiSelectAirportBounds = {
        destinationBoundAirport: '',
        originBoundAirport: ''
      };
      const response = new MultiSelectGroupBuilder().build().multipleAirportsData;
      const state = flightShoppingPageReducers({}, {
        type: AirBookingActionTypes.AIR_BOOKING__CLEAR_MULTI_SELECT_BOUND,
        response
      });

      expect(state.multiSelectGroup.selectedBound).to.deep.equal(emptyMultiSelectAirportBounds);
    });

    it('should set response after fetch success', () => {
      const response = new MultiSelectGroupBuilder().build();
      const state = flightShoppingPageReducers({}, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_MULTI_SELECT_PAGE_SUCCESS,
        response
      });

      expect(state.response).to.not.be.undefined;
    });

    it('should return default state when action is undefined', () => {
      expect(flightShoppingPageReducers().response).to.be.empty;
    });

    it('should set selectedBound after bound selection', () => {
      const response = new MultiSelectGroupBuilder().build().multipleAirportsData;
      const multiSelectAirportBounds = {
        destinationBoundAirport: 'BOS',
        originBoundAirport: 'MDW'
      };
      const state = flightShoppingPageReducers({}, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_MULTI_SELECT_BOUND,
        response,
        multiSelectAirportBounds
      });

      expect(state.multiSelectGroup.selectedBound).to.deep.equal(multiSelectAirportBounds);
    });
  });
});
