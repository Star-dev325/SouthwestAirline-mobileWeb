import purchaseSummaryPageReducers from 'src/airBooking/reducers/purchaseSummaryPageReducers';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import { getPassengerInfos } from 'test/builders/model/passengerInfosBuilder';

describe('purchaseSummaryPageReducers', () => {
  it('should init state', () => {
    expect(purchaseSummaryPageReducers(undefined, {})).to.deep.equal({
      earlyBirdEligibility: null,
      passengers: [],
      priceTotal: {},
      reviewMessages: {},
      travelFundsAddress: null,
      tripSummary: {}
    });
  });

  context('tripSummary', () => {
    it('should set tripSummary state if it need generate the purchase summary page', () => {
      const state = purchaseSummaryPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE,
        passengerInfos,
        flightPricingPageResponse: new PricesBuilder().build()
      });

      expect(state.tripSummary).to.deep.equal({
        bounds: [
          {
            arrivalAirportCode: 'ATL',
            arrivalTime: '09:30',
            departureAirportCode: 'DAL',
            departureDate: '2017-11-01',
            departureDayOfWeek: 'Wednesday',
            departureTime: '06:30',
            stops: [
              {
                "airport": {
                  "code": "HOU",
                  "country": null,
                  "name": "Houston (Hobby)",
                  "state": "TX"
                },
                "arrivalTime": "15:35",
                "changePlanes": true,
                "departureTime": "16:25"
              }
            ]
          }
        ],
        passengerCountDescription: '1 Passenger Total',
        currency: {
          amount: '233.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      });
    });

    it('should return default state when action is undefined', () => {
      expect(purchaseSummaryPageReducers().tripSummary).to.be.empty;
    });
  });

  context('passengers', () => {
    it('should set the passenger brief info if it need generate the purchase summary page', () => {
      const state = purchaseSummaryPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE,
        passengerInfos,
        flightPricingPageResponse: new PricesBuilder().build()
      });

      expect(state.passengers).to.deep.equal([
        {
          name: 'Andrew Phillips',
          rapidRewardsNumber: '600597056'
        }
      ]);
    });

    it('should return default state when action is undefined', () => {
      expect(purchaseSummaryPageReducers().passengers).to.be.empty;
    });
  });

  context('priceTotal', () => {
    it('should set the price total info if it need generate the purchase summary page', () => {
      const flightPricingPageResponse = new PricesBuilder().build();
      const state = purchaseSummaryPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE,
        passengerInfos,
        flightPricingPageResponse
      });

      expect(state.priceTotal).to.deep.equal({
        totals: flightPricingPageResponse.flightPricingPage.totals
      });
    });

    it('should return default state when action is undefined', () => {
      expect(purchaseSummaryPageReducers().priceTotal).to.be.empty;
    });
  });

  context('earlyBirdEligibility', () => {
    it('should set earlyBirdEligibility when fetch early bird pricing info success', () => {
      const earlyBirdPriceResponse = { earlyBirdEligibility: { foo: 'bar' } };
      const state = purchaseSummaryPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
        response: earlyBirdPriceResponse
      });

      expect(state.earlyBirdEligibility).to.deep.equal({
        foo: 'bar'
      });
    });

    it('should return default state when action is undefined', () => {
      expect(purchaseSummaryPageReducers().earlyBirdEligibility).to.equal(null);
    });

    it('should reset earlyBirdEligibility when start fetch early bird pricing to avoid dirty data', () => {
      const initialState = { earlyBirdEligibility: { foo: 'bar' } };
      const state = purchaseSummaryPageReducers(initialState, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO,
        passengerInfos,
        flightPricingPageResponse: new PricesBuilder().build()
      });

      expect(state.earlyBirdEligibility).to.equal(null);
    });
  });

  context('travelFundsAddress', () => {
    it('should set the travelFundsAddress if the action is triggered', () => {
      const travelFundsAddress = { contact: 'info' };
      const state = purchaseSummaryPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SAVE_TRAVEL_FUNDS_ADDRESS,
        travelFundsAddress
      });

      expect(state.travelFundsAddress).to.deep.equal({
        contact: 'info'
      });
    });

    it('should return default state when action is undefined', () => {
      expect(purchaseSummaryPageReducers().travelFundsAddress).to.equal(null);
    });
  });

  context('review messages', () => {
    it('should set the review messages if the action is triggered', () => {
      const reviewMessages = { reviewMessages: [{ test: '1' }] };
      const flightPricingPageResponse = { flightPricingPage: reviewMessages };
      const state = purchaseSummaryPageReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__GENERATE_PURCHASE_SUMMARY_PAGE,
        flightPricingPageResponse
      });

      expect(state.reviewMessages).to.deep.equal([{ test: '1' }]);
    });

    it('should return default state when action is undefined', () => {
      expect(purchaseSummaryPageReducers().travelFundsAddress).to.equal(null);
    });
  });

  const passengerInfos = getPassengerInfos();
});
