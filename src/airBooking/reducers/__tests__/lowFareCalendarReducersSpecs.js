import _ from 'lodash';
import lowFareCalendarReducers from 'src/airBooking/reducers/lowFareCalendarReducers';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

describe('lowFareCalendarReducers', () => {
  let showLoadingPrevNextInitialState;

  beforeEach(() => {
    showLoadingPrevNextInitialState = {
      outboundPrev: false,
      outboundNext: false,
      inboundPrev: false,
      inboundNext: false
    };
  });

  it('should init state', () => {
    expect(lowFareCalendarReducers(undefined, {})).to.deep.equal({
      response: null,
      outboundPage: null,
      inboundPage: null,
      selectedDates: null,
      showLoadingPrevNext: showLoadingPrevNextInitialState
    });
  });

  context('response', () => {
    it('should set response after fetch success', () => {
      const response = { test: 'test' };
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
        response
      });

      expect(state.response).to.deep.equal(response);
    });

    it('should return default state when action is undefined', () => {
      expect(lowFareCalendarReducers().response).to.equal(null);
    });

    it('should init when fetch AIR_BOOKING__FETCH_LOW_FARE_CALENDAR is triggered', () => {
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR
      });

      expect(state.response).to.be.null;
    });

    it('should set outbound revenue analytics', () => {
      const lowFareCalendarAnalytics = {
        passengercount: '1',
        currencycode: 'REVENUE',
        triptype: 'OW',
        origindestination: 'ALBDAL',
        destinationreturn: 'none',
        lowestpriceout: '132.98',
        lowestpointsout: 'none',
        lowestpricereturn: 'none',
        lowestpointsreturn: 'none',
        datesout: '04032020|04262020',
        datesrtn: 'none'
      };

      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_OUTBOUND_ANALYTICS,
        lowFareCalendarAnalytics
      });

      const expectedState = {
        lowestpriceout: '132.98',
        lowestpointsout: 'none',
        datesout: '04032020|04262020'
      };

      expect(state.response.lowFareCalendarPage.lowFareCalendarAnalytics).to.deep.equal(expectedState);
    });

    it('should set inbound analytics', () => {
      const lowFareCalendarAnalytics = {
        passengercount: '1',
        currencycode: 'REVENUE',
        triptype: 'OW',
        origindestination: 'ALBDAL',
        destinationreturn: 'none',
        lowestpriceout: '132.98',
        lowestpointsout: 'none',
        lowestpricereturn: 'none',
        lowestpointsreturn: 'none',
        datesout: '04032020|04262020',
        datesrtn: 'none'
      };

      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__UPDATE_LOW_FARE_CALENDAR_INBOUND_ANALYTICS,
        lowFareCalendarAnalytics
      });

      const expectedState = {
        lowestpricereturn: '132.98',
        lowestpointsreturn: 'none',
        datesrtn: '04032020|04262020'
      };

      expect(state.response.lowFareCalendarPage.lowFareCalendarAnalytics).to.deep.equal(expectedState);
    });
  });

  context('outboundPage', () => {
    let response;

    beforeEach(() => {
      response = 'response';
    });

    it('should init when fetch AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS is triggered', () => {
      const boundPage = { header: 'header' };
      const lfcPage = _.set({}, 'lowFareCalendarPage.outboundPage', boundPage);
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
        response: lfcPage
      });

      expect(state.outboundPage).to.be.deep.equal(boundPage);
    });

    it('should set outboundPage after AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS is triggered', () => {
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS,
        response
      });

      expect(state.outboundPage).to.deep.equal(response);
    });

    it('should set outboundPage after AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS is triggered', () => {
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS,
        response
      });

      expect(state.outboundPage).to.deep.equal(response);
    });

    it('should return default state when action is undefined', () => {
      expect(lowFareCalendarReducers().outboundPage).to.deep.equal(null);
    });
  });

  context('inboundPage', () => {
    let response;

    beforeEach(() => {
      response = 'response';
    });

    it('should init when fetch AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS is triggered', () => {
      const boundPage = { header: 'header' };
      const lfcPage = _.set({}, 'lowFareCalendarPage.inboundPage', boundPage);
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_LOW_FARE_CALENDAR_SUCCESS,
        response: lfcPage
      });

      expect(state.inboundPage).to.be.deep.equal(boundPage);
    });

    it('should set inboundPage after AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS is triggered', () => {
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS,
        response
      });

      expect(state.inboundPage).to.deep.equal(response);
    });

    it('should set inboundPage after AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS is triggered', () => {
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS,
        response
      });

      expect(state.inboundPage).to.deep.equal(response);
    });

    it('should return default state when action is undefined', () => {
      expect(lowFareCalendarReducers().inboundPage).to.deep.equal(null);
    });
  });

  context('selectedDates', () => {
    let date;

    beforeEach(() => {
      date = '2020-02-02';
    });

    it('should set the outboundDate after AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE is triggered', () => {
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_OUTBOUND_DATE,
        date
      });

      expect(state.selectedDates.outboundDate).to.deep.equal(date);
    });

    it('should set the inboundDate after AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE is triggered', () => {
      const state = lowFareCalendarReducers(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__LOW_FARE_CALENDAR_SELECT_INBOUND_DATE,
        date
      });

      expect(state.selectedDates.inboundDate).to.deep.equal(date);
    });
  });

  context('showLoadingPrevNext', () => {
    let response;

    beforeEach(() => {
      response = 'response';
    });

    context('inbound prev', () => {
      it('should set inboundPrev to true when AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE
        });

        expect(state.showLoadingPrevNext).to.deep.equal({
          outboundPrev: false,
          outboundNext: false,
          inboundPrev: true,
          inboundNext: false
        });
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS,
          response
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });
    });

    context('inbound next', () => {
      it('should set inboundPrev to true when AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE
        });

        expect(state.showLoadingPrevNext).to.deep.equal({
          outboundPrev: false,
          outboundNext: false,
          inboundPrev: false,
          inboundNext: true
        });
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_SUCCESS,
          response
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_INBOUND_PAGE_FAILED
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });
    });

    context('outbound prev', () => {
      it('should set outboundPrev to true when AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE
        });

        expect(state.showLoadingPrevNext).to.deep.equal({
          outboundPrev: true,
          outboundNext: false,
          inboundPrev: false,
          inboundNext: false
        });
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS,
          response
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_PREV_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });
    });

    context('outbound next', () => {
      it('should set inboundPrev to true when AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE
        });

        expect(state.showLoadingPrevNext).to.deep.equal({
          outboundPrev: false,
          outboundNext: true,
          inboundPrev: false,
          inboundNext: false
        });
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_SUCCESS,
          response
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });

      it('should set inboundPrev to true when AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED is triggered', () => {
        const state = lowFareCalendarReducers(undefined, {
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_NEXT_LOW_FARE_CALENDAR_OUTBOUND_PAGE_FAILED
        });

        expect(state.showLoadingPrevNext).to.deep.equal(showLoadingPrevNextInitialState);
      });
    });
  });
});
