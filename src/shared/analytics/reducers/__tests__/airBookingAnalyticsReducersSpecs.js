import airBookingAnalyticsReducers from 'src/shared/analytics/reducers/airBookingAnalyticsReducers';
import ChaseAndPromoBannerContent from 'test/builders/apiResponse/v1/content-delivery/query/placements';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';

const { CHASE__UPDATE_CHASE_FLOW_COMPLETED } = ChaseActionTypes;
const { AIR_BOOKING__CALENDAR_STRIP, AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS, AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED } =
  AirBookingActionTypes;

describe('airBooking', () => {
  context('sortBy', () => {
    it('should update sortBy according to the direction of action', () => {
      const newState = airBookingAnalyticsReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY,
        direction: 'inbound',
        paxType: 'adult',
        sortBy: 'startingFromAmount'
      });

      const expectedResults = {
        outbound: 'departureTime',
        inbound: 'startingFromAmount'
      };

      expect(newState.sortBy).to.deep.equal(expectedResults);
    });
    it('should reset sortBy according to the reset action', () => {
      const newState = airBookingAnalyticsReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_AIR_BOOKING_FLOW_DATA
      });

      const expectedResults = {
        outbound: 'departureTime',
        inbound: 'departureTime'
      };

      expect(newState.sortBy).to.deep.equal(expectedResults);
    });
    it('should reset sortBy according to the change the date by date strip', () => {
      const newState = airBookingAnalyticsReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_FLIGHT_SHOPPING_PAGE
      });

      const expectedResults = {
        outbound: 'departureTime',
        inbound: 'departureTime'
      };

      expect(newState.sortBy).to.deep.equal(expectedResults);
    });
  });

  context('chaseBannerConfig', () => {
    it('should set isBannerShown to true if chase banner config is fetched successfully', () => {
      const chaseAndPromoBannerResponse = new ChaseAndPromoBannerContent().build();
      const newState = airBookingAnalyticsReducers(undefined, {
        type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
        response: {
          ...chaseAndPromoBannerResponse,
          isEligibleForDisplayingChaseBanner: true
        }
      });

      expect(newState.isChaseBannerShown).to.equal(true);
    });

    it('should set isBannerShown to false if chase banner config is fetched unsuccessfully', () => {
      const chaseAndPromoBannerResponse = new ChaseAndPromoBannerContent().build();
      const newState = airBookingAnalyticsReducers(undefined, {
        type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
        response: chaseAndPromoBannerResponse
      });

      expect(newState.isChaseBannerShown).to.equal(false);
    });

    it('should return false if chase banner config is fetched successfully but isEligibleForDisplayingChaseBanner is false', () => {
      const chaseAndPromoBannerResponse = new ChaseAndPromoBannerContent().build();
      const newState = airBookingAnalyticsReducers(undefined, {
        type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
        response: {
          ...chaseAndPromoBannerResponse,
          isEligibleForDisplayingChaseBanner: false
        }
      });

      expect(newState.isChaseBannerShown).to.equal(false);
    });

    it('should return default state when action is undefined', () => {
      expect(airBookingAnalyticsReducers().isChaseBannerShown).to.deep.equal(false);
    });
  });

  context('update chase flow completed', () => {
    it('should set chase flow completed to true when chase flow completed is true', () => {
      const newState = airBookingAnalyticsReducers(undefined, {
        type: CHASE__UPDATE_CHASE_FLOW_COMPLETED,
        isChaseFlowCompleted: true
      });

      expect(newState.isChaseFlowCompleted).to.equal(true);
    });

    it('should return default state when action is undefined', () => {
      expect(airBookingAnalyticsReducers().isChaseFlowCompleted).to.deep.equal(false);
    });
  });

  context('update iscalendarstrip', () => {
    it('should set iscalendarstrip to true when user searched through calendar strip', () => {
      const newState = airBookingAnalyticsReducers(undefined, {
        type: AIR_BOOKING__CALENDAR_STRIP,
        isCalendarStrip: true
      });

      expect(newState.isCalendarStrip).to.equal(true);
    });

    it('should return default state when action is undefined', () => {
      expect(airBookingAnalyticsReducers().isCalendarStrip).to.deep.equal(false);
    });
  });
});
