import { getLowFareCalendarRequest, getLfcBoundData } from 'src/airBooking/analytics/lowFareCalendarSelector';
import LowFareCalenderBuilder from 'test/builders/model/lowFareCalendarBuilder';

describe('lowFareCalencarSelector', () => {
  it('should generate analytics data for price based lfc', () => {
    const state = {
      app: {
        airBooking: {
          lowFareCalendar: new LowFareCalenderBuilder().withRoundTripUSD()
        }
      }
    };

    const results = getLowFareCalendarRequest(state);

    expect(results).to.deep.equal({
      currencycode: 'REVENUE',
      datesout: '03022020|03252020',
      datesrtn: '03022020|03252020',
      destinationreturn: 'DALALB',
      lowestpointsout: 'none',
      lowestpointsreturn: 'none',
      lowestpriceout: '185.98',
      lowestpricereturn: '185.98',
      origindestination: 'ALBDAL',
      passengercount: '1',
      pointsoutselected: 'none',
      pointsreturnselected: 'none',
      priceoutselected: '1572.78',
      pricereturnselected: '394.98',
      triptype: 'RT'
    });
  });

  it('should generate analytics data for points based lfc', () => {
    const state = {
      app: {
        airBooking: {
          lowFareCalendar: new LowFareCalenderBuilder().withRoundTripPoints()
        }
      }
    };

    const results = getLowFareCalendarRequest(state);

    expect(results).to.deep.equal({
      currencycode: 'POINTS',
      datesout: '03022020|03252020',
      datesrtn: '03022020|03252020',
      destinationreturn: 'DALALB',
      lowestpointsout: '18598',
      lowestpointsreturn: '18598',
      lowestpriceout: 'none',
      lowestpricereturn: 'none',
      origindestination: 'ALBDAL',
      passengercount: '1',
      pointsoutselected: '157278',
      pointsreturnselected: '39498',
      priceoutselected: 'none',
      pricereturnselected: 'none',
      triptype: 'RT'
    });
  });

  it('should generate analytics data for price based lfc for a one way trip', () => {
    const state = {
      app: {
        airBooking: {
          lowFareCalendar: new LowFareCalenderBuilder().withOneWayTripUSD()
        }
      }
    };

    const results = getLowFareCalendarRequest(state);

    expect(results).to.deep.equal({
      currencycode: 'REVENUE',
      datesout: '03022020|03252020',
      datesrtn: 'none',
      destinationreturn: 'none',
      lowestpointsout: 'none',
      lowestpointsreturn: 'none',
      lowestpriceout: '185.98',
      lowestpricereturn: 'none',
      origindestination: 'ALBDAL',
      passengercount: '1',
      pointsoutselected: 'none',
      pointsreturnselected: 'none',
      priceoutselected: '1572.78',
      pricereturnselected: 'none',
      triptype: 'OW'
    });
  });

  it('should generate analytics data for points based lfc for a one way trip', () => {
    const state = {
      app: {
        airBooking: {
          lowFareCalendar: new LowFareCalenderBuilder().withOneWayTripPoints()
        }
      }
    };

    const results = getLowFareCalendarRequest(state);

    expect(results).to.deep.equal({
      currencycode: 'POINTS',
      datesout: '03022020|03252020',
      datesrtn: 'none',
      destinationreturn: 'none',
      lowestpointsout: '18598',
      lowestpointsreturn: 'none',
      lowestpriceout: 'none',
      lowestpricereturn: 'none',
      origindestination: 'ALBDAL',
      passengercount: '1',
      pointsoutselected: '157278',
      pointsreturnselected: 'none',
      priceoutselected: 'none',
      pricereturnselected: 'none',
      triptype: 'OW'
    });
  });

  it('should generate analytics data but with no selected routes if there are no selections', () => {
    const state = {
      app: {
        airBooking: {
          lowFareCalendar: new LowFareCalenderBuilder().withRoundTripPoints().withDatesSelected(null, null)
        }
      }
    };

    const results = getLowFareCalendarRequest(state);

    expect(results).to.deep.equal({
      currencycode: 'POINTS',
      datesout: '03022020|03252020',
      datesrtn: '03022020|03252020',
      destinationreturn: 'DALALB',
      lowestpointsout: '18598',
      lowestpointsreturn: '18598',
      lowestpriceout: 'none',
      lowestpricereturn: 'none',
      origindestination: 'ALBDAL',
      passengercount: '1',
      pointsoutselected: 'none',
      pointsreturnselected: 'none',
      priceoutselected: 'none',
      pricereturnselected: 'none',
      triptype: 'RT'
    });
  });

  it('should not generate any analytics when the user is not in LFC flow', () => {
    const state = {
      app: {
        airBooking: {
          lowFareCalendar: null
        }
      }
    };

    const results = getLowFareCalendarRequest(state);

    expect(results).to.deep.equal({});
  });

  context('getLfcBoundData', () => {
    it('should return correctly generated lfcMktgData with given currency and "none" for points', () => {
      const lowFareCalendarData = {
        priceoutselected: '123',
        pricereturnselected: '89',
        pointsoutselected: 'none',
        pointsreturnselected: 'none'
      };
      const result = getLfcBoundData(lowFareCalendarData);
      const expectedResult = {
        lfc_bound1_selectedcurrency: '123',
        lfc_bound2_selectedcurrency: '89',
        lfc_bound1_selectedpoints: 'none',
        lfc_bound2_selectedpoints: 'none'
      };

      expect(result).to.eql(expectedResult);
    });

    it('should return correctly generated lfcMktgData with given points and "none" for currency', () => {
      const lowFareCalendarData = {
        priceoutselected: 'none',
        pricereturnselected: 'none',
        pointsoutselected: '2310',
        pointsreturnselected: '1234'
      };
      const result = getLfcBoundData(lowFareCalendarData);
      const expectedResult = {
        lfc_bound1_selectedcurrency: 'none',
        lfc_bound2_selectedcurrency: 'none',
        lfc_bound1_selectedpoints: '2310',
        lfc_bound2_selectedpoints: '1234'
      };

      expect(result).to.eql(expectedResult);
    });

    it('should return lfcMktgData with properties set to "none" when lowFareCalendarData is undefined', () => {
      const lowFareCalendarData = undefined;
      const result = getLfcBoundData(lowFareCalendarData);
      const expectedResult = {
        lfc_bound1_selectedcurrency: 'none',
        lfc_bound2_selectedcurrency: 'none',
        lfc_bound1_selectedpoints: 'none',
        lfc_bound2_selectedpoints: 'none'
      };

      expect(result).to.eql(expectedResult);
    });
  });
});
