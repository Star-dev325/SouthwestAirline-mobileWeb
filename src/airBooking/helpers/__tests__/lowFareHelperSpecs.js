import _ from 'lodash';
import { sandbox } from 'sinon';
import {
  hasPricePoints,
  getMinPrice,
  getMaxPrice,
  getBarHeight,
  getLowFareDaysByMonth,
  calculateLfcSelectedDates,
  calendarScrollFunctions,
  calculateCalendarScrollableBounds,
  MIN_BAR_HEIGHT,
  MAX_BAR_HEIGHT,
  MIN_BAR_HEIGHT_WITH_TAXES
} from 'src/airBooking/helpers/lowFareHelper';
import FakeClock from 'test/unit/helpers/fakeClock';
import waitFor from 'test/unit/helpers/waitFor';
import lowFareCalendarPageRoundTripResponse from 'mocks/templates/airReservation/lowFareCalendarPageRoundTrip';
import lowFareCalendarPageOneWayResponse from 'mocks/templates/airReservation/lowFareCalendarPageOneWay';

const sinon = sandbox.create();
const MAX_BAR_HEIGHT_WITH_REM = `${MAX_BAR_HEIGHT}rem`;
const MIN_BAR_HEIGHT_WITH_REM = `${MIN_BAR_HEIGHT}rem`;
const MIN_BAR_HEIGHT_WITH_TAXES_REM = `${MIN_BAR_HEIGHT_WITH_TAXES}rem`;
const TODAY = '2020-01-17';
const YESTERDAY = '2020-01-16';
const lowFareCalendarDaysOneMonth = [
  {
    date: TODAY,
    lowestPrice: {
      price: {
        amount: '418.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pricePointsTax: null
    }
  },
  {
    date: '2020-01-18',
    lowestPrice: {
      price: {
        amount: '420.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pricePointsTax: null
    }
  }
];
const lowFareCalendarDaysTwoMonths = [
  {
    date: TODAY,
    lowestPrice: {
      price: {
        amount: '418.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pricePointsTax: null
    }
  },
  {
    date: '2020-02-18',
    lowestPrice: {
      price: {
        amount: '420.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pricePointsTax: null
    }
  }
];

describe('LowFareHelper', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('hasPricePoints', () => {
    describe('fares with points tax', () => {
      it('should return true when fare array has all fares with points tax', () => {
        const lowFareCalendarDays = [
          {
            date: '2020-01-17',
            lowestPrice: {
              price: {
                amount: '28,356',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              pricePointsTax: {
                amount: '11.39',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          },
          {
            date: '2020-01-18',
            lowestPrice: {
              price: {
                amount: '27,356',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              pricePointsTax: {
                amount: '11.39',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          }
        ];

        expect(hasPricePoints(lowFareCalendarDays)).to.be.true;
      });
      it('should return true when fare array has at least one fare with points tax', () => {
        const lowFareCalendarDays = [
          {
            date: '2020-01-17',
            lowestPrice: {
              price: {
                amount: '28,356',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              pricePointsTax: {
                amount: '11.39',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          },
          {
            date: '2020-01-18',
            lowestPrice: {
              price: {
                amount: '27,356',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              pricePointsTax: null
            }
          }
        ];

        expect(hasPricePoints(lowFareCalendarDays)).to.be.true;
      });
    });

    describe('fares without points tax', () => {
      it('should return false when fare array is null', () => {
        expect(hasPricePoints(null)).to.be.false;
      });
      it('should return false when fare array is undefined', () => {
        expect(hasPricePoints(undefined)).to.be.false;
      });
      it('should return false when fare array is empty', () => {
        expect(hasPricePoints([])).to.be.false;
      });
      it('should return false when fare array has fares without points tax', () => {
        const lowFareCalendarDays = [
          {
            date: '2020-01-17',
            lowestPrice: {
              price: {
                amount: '28,356',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              pricePointsTax: null
            }
          },
          {
            date: '2020-01-18',
            lowestPrice: {
              price: {
                amount: '27,356',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              pricePointsTax: null
            }
          }
        ];

        expect(hasPricePoints(lowFareCalendarDays)).to.be.false;
      });
      it('should return false when fare array has fares without points tax', () => {
        const lowFareCalendarDays = [
          {
            date: '2020-01-17',
            lowestPrice: {
              price: {
                amount: '28,356',
                currencyCode: '$',
                currencySymbol: null
              },
              pricePointsTax: null
            }
          }
        ];

        expect(hasPricePoints(lowFareCalendarDays)).to.be.false;
      });
    });
  });

  describe('getMinPrice', () => {
    beforeEach(() => {
      FakeClock.setTimeTo(TODAY);
    });

    afterEach(() => {
      FakeClock.restore();
    });

    it('should return zero for a undefined list', () => {
      expect(getMinPrice(undefined, TODAY)).to.equal(0);
    });

    it('should return zero for a empty list', () => {
      expect(getMinPrice([], TODAY)).to.equal(0);
    });

    it('should return minimum lowestPrice when list is not empty', () => {
      const list = [
        _.set({}, 'lowestPrice.price.amount', '100.03'),
        _.set({}, 'lowestPrice.price.amount', '100.00'),
        _.set({}, 'lowestPrice.price.amount', '100.02'),
        _.set({}, 'lowestPrice.price.amount', '100.01')
      ];

      expect(getMinPrice(list, TODAY)).to.equal(100.0);
    });

    it('should return minimum price when list contains a lowestPrice of null', () => {
      const list = [{ lowestPrice: null }, _.set({}, 'lowestPrice.price.amount', '100.03')];

      expect(getMinPrice(list, TODAY)).to.equal(100.03);
    });

    it('should return minimum price when prices contain commas (points prices)', () => {
      const list = [
        _.set({}, 'lowestPrice.price.amount', '10,001'),
        _.set({}, 'lowestPrice.price.amount', '10,003'),
        _.set({}, 'lowestPrice.price.amount', '10,002'),
        _.set({}, 'lowestPrice.price.amount', '10,000')
      ];

      expect(getMinPrice(list, TODAY)).to.equal(10000);
    });

    it('should return minimum price when all prices are the same', () => {
      const list = [
        _.set({}, 'lowestPrice.price.amount', '100.01'),
        _.set({}, 'lowestPrice.price.amount', '100.01'),
        _.set({}, 'lowestPrice.price.amount', '100.01')
      ];

      expect(getMinPrice(list, TODAY)).to.equal(100.01);
    });

    describe('past date fares', () => {
      it('should return minimum lowestPrice excluding pastDate fares when pastDate fare not the lowest price', () => {
        const pastDateFareWithHighestPrice = {
          date: YESTERDAY,
          lowestPrice: {
            price: {
              amount: '100.02',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        };
        const list = [
          pastDateFareWithHighestPrice,
          _.set({}, 'lowestPrice.price.amount', '100.01'),
          _.set({}, 'lowestPrice.price.amount', '100.03'),
          _.set({}, 'lowestPrice.price.amount', '100.02'),
          _.set({}, 'lowestPrice.price.amount', '100.00')
        ];

        expect(getMinPrice(list, TODAY)).to.equal(100.0);
      });

      it('should return minimum lowestPrice excluding pastDate fares when pastDate fare is the lowest price', () => {
        const pastDateFareWithHighestPrice = {
          date: YESTERDAY,
          lowestPrice: {
            price: {
              amount: '99.99',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        };
        const list = [
          pastDateFareWithHighestPrice,
          _.set({}, 'lowestPrice.price.amount', '100.01'),
          _.set({}, 'lowestPrice.price.amount', '100.03'),
          _.set({}, 'lowestPrice.price.amount', '100.02'),
          _.set({}, 'lowestPrice.price.amount', '100.00')
        ];

        expect(getMinPrice(list, TODAY)).to.equal(100.0);
      });
    });
  });

  describe('getMaxPrice', () => {
    beforeEach(() => {
      FakeClock.setTimeTo(TODAY);
    });

    afterEach(() => {
      FakeClock.restore();
    });

    it('should return zero for a undefined list', () => {
      expect(getMaxPrice(undefined, TODAY)).to.equal(0);
    });

    it('should return zero for a empty list', () => {
      expect(getMaxPrice([], TODAY)).to.equal(0);
    });

    it('should return maximum lowestPrice when list is not empty', () => {
      const list = [
        _.set({}, 'lowestPrice.price.amount', '100.01'),
        _.set({}, 'lowestPrice.price.amount', '100.03'),
        _.set({}, 'lowestPrice.price.amount', '100.02'),
        _.set({}, 'lowestPrice.price.amount', '100.00')
      ];

      expect(getMaxPrice(list, TODAY)).to.equal(100.03);
    });

    it('should return maximum price when list contains a lowestPrice of null', () => {
      const list = [{ lowestPrice: null }, _.set({}, 'lowestPrice.price.amount', '100.03')];

      expect(getMaxPrice(list, TODAY)).to.equal(100.03);
    });

    it('should return maximum price when prices contain commas (points prices)', () => {
      const list = [
        _.set({}, 'lowestPrice.price.amount', '10,001'),
        _.set({}, 'lowestPrice.price.amount', '10,003'),
        _.set({}, 'lowestPrice.price.amount', '10,002'),
        _.set({}, 'lowestPrice.price.amount', '10,000')
      ];

      expect(getMaxPrice(list, TODAY)).to.equal(10003);
    });

    describe('past date fares', () => {
      it('should return maximum lowestPrice excluding pastDate fares when pastDate fare not the highest price', () => {
        const pastDateFareWithHighestPrice = {
          date: YESTERDAY,
          lowestPrice: {
            price: {
              amount: '100.02',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        };
        const list = [
          pastDateFareWithHighestPrice,
          _.set({}, 'lowestPrice.price.amount', '100.01'),
          _.set({}, 'lowestPrice.price.amount', '100.03'),
          _.set({}, 'lowestPrice.price.amount', '100.02'),
          _.set({}, 'lowestPrice.price.amount', '100.00')
        ];

        expect(getMaxPrice(list, TODAY)).to.equal(100.03);
      });

      it('should return maximum lowestPrice excluding pastDate fares when pastDate fare is the highest price', () => {
        const pastDateFareWithHighestPrice = {
          date: YESTERDAY,
          lowestPrice: {
            price: {
              amount: '999.99',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        };
        const list = [
          pastDateFareWithHighestPrice,
          _.set({}, 'lowestPrice.price.amount', '100.01'),
          _.set({}, 'lowestPrice.price.amount', '100.03'),
          _.set({}, 'lowestPrice.price.amount', '100.02'),
          _.set({}, 'lowestPrice.price.amount', '100.00')
        ];

        expect(getMaxPrice(list, TODAY)).to.equal(100.03);
      });
    });
  });

  describe('getBarHeight', () => {
    describe('low fares without points tax', () => {
      const showPointsTax = true;

      it('should return Max Bar Height when maxPrice param is undefined or null', () => {
        expect(getBarHeight('50.00', '50.00', undefined, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_TAXES_REM);
        expect(getBarHeight('50.00', '50.00', null, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_TAXES_REM);
      });

      it('should return minimum height default when farePrice param is zero', () => {
        expect(getBarHeight(0, 10, 100, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_TAXES_REM);
      });

      it('should return Max Bar Height as default min height when farePrice param is undefined or null', () => {
        expect(getBarHeight(undefined, 10, 100, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_TAXES_REM);
        expect(getBarHeight(null, 10, 100, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_TAXES_REM);
      });

      it('should return the calculated bar height ratio for farePrice and maxPrice', () => {
        expect(getBarHeight(50, 10, 100, showPointsTax)).to.equal('10.944444444444445rem');
        expect(getBarHeight(25, 10, 50, showPointsTax)).to.equal('9.9375rem');
        expect(getBarHeight(33, 10, 50, showPointsTax)).to.equal('12.837499999999999rem');
        expect(getBarHeight(30, 10, 30, showPointsTax)).to.equal(MAX_BAR_HEIGHT_WITH_REM);
      });
    });

    describe('low fares without points tax', () => {
      const showPointsTax = false;

      it('should return Max Bar Height when maxPrice param is undefined or null', () => {
        expect(getBarHeight('50.00', undefined, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_REM);
        expect(getBarHeight('50.00', null, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_REM);
      });

      it('should return minimum height when farePrice param is zero', () => {
        expect(getBarHeight(0, 100, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_REM);
      });

      it('should return Max Bar Height as default min height when farePrice param is undefined or null', () => {
        expect(getBarHeight(undefined, 100, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_REM);
        expect(getBarHeight(null, 100, showPointsTax)).to.equal(MIN_BAR_HEIGHT_WITH_REM);
      });

      it('should return the calculated bar height ratio for farePrice and maxPrice', () => {
        expect(getBarHeight(50, 10, 100, showPointsTax)).to.equal('10.5rem');
        expect(getBarHeight(25, 10, 50, showPointsTax)).to.equal('9.4375rem');
        expect(getBarHeight(33, 10, 50, showPointsTax)).to.equal('12.497499999999999rem');
        expect(getBarHeight(30, 10, 30, showPointsTax)).to.equal(MAX_BAR_HEIGHT_WITH_REM);
      });
    });
  });

  describe('getLowFareDaysByMonth', () => {
    it('should return empty arrays when boundFares param is undefined', () => {
      const actualArrays = getLowFareDaysByMonth(undefined);

      expect(actualArrays).to.deep.equal([]);
    });

    it('should return empty map when boundFares param is null', () => {
      const actualArrays = getLowFareDaysByMonth(null);

      expect(actualArrays).to.deep.equal([]);
    });

    it('should create lowFareDaysMonthMap when fares are all in same month', () => {
      const actualArrays = getLowFareDaysByMonth(lowFareCalendarDaysOneMonth);
      const expectedArrays = [lowFareCalendarDaysOneMonth];

      expect(actualArrays).to.deep.equal(expectedArrays);
    });

    it('should create lowFareDaysMonthMap when fares are in different months', () => {
      const actualArrays = getLowFareDaysByMonth(lowFareCalendarDaysTwoMonths);
      const expectedArrays = [[lowFareCalendarDaysTwoMonths[0]], [lowFareCalendarDaysTwoMonths[1]]];

      expect(actualArrays).to.deep.equal(expectedArrays);
    });

    it('should create correctly ordered lowFareDaysMonthMap for days in different years - Dec Jan', () => {
      const daysOverTwoYears = [
        {
          date: '2020-11-30',
          lowestPrice: {
            price: {
              amount: '327',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-12-30',
          lowestPrice: {
            price: {
              amount: '328',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-12-31',
          lowestPrice: {
            price: {
              amount: '329',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2021-01-01',
          lowestPrice: {
            price: {
              amount: '330',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2021-01-02',
          lowestPrice: {
            price: {
              amount: '331',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ];
      const actualArrays = getLowFareDaysByMonth(daysOverTwoYears);
      const expectedArrays = [
        [daysOverTwoYears[0]],
        [daysOverTwoYears[1], daysOverTwoYears[2]],
        [daysOverTwoYears[3], daysOverTwoYears[4]]
      ];

      expect(actualArrays).to.deep.equal(expectedArrays);
    });
  });

  describe('calculateLfcSelectedDates', () => {
    it('should return selected inbound and outbound dates when a round trip with prices on selected dates', () => {
      expect(
        calculateLfcSelectedDates(
          { departureDate: '2020-01-25', returnDate: '2020-01-28' },
          lowFareCalendarPageRoundTripResponse
        )
      ).to.deep.equal({
        selectedDepartureDate: '2020-01-25',
        selectedReturnDate: '2020-01-28'
      });
    });

    it('should return selected outbound date when a oneway trip with prices on selected dates', () => {
      expect(
        calculateLfcSelectedDates({ departureDate: '2020-01-15' }, lowFareCalendarPageOneWayResponse)
      ).to.deep.equal({
        selectedDepartureDate: '2020-01-15',
        selectedReturnDate: undefined
      });
    });

    it('should return selected inbound and outbound dates as undefined when a round trip without prices on selected dates', () => {
      const roundTrip = _.clone(lowFareCalendarPageRoundTripResponse);

      _.set(roundTrip, 'lowFareCalendarPage.outboundPage.lowFareCalendarDays.0.lowestPrice', null);
      _.set(roundTrip, 'lowFareCalendarPage.inboundPage.lowFareCalendarDays.0.lowestPrice', null);
      expect(
        calculateLfcSelectedDates(
          { departureDate: '2020-01-15', returnDate: '2020-01-17' },
          lowFareCalendarPageRoundTripResponse
        )
      ).to.deep.equal({
        selectedDepartureDate: undefined,
        selectedReturnDate: undefined
      });
    });
  });

  describe('calendarScrollFunctions', () => {
    let lfcCalendar, priceBar;
    const MIDPOINT = 95;

    beforeEach(() => {
      lfcCalendar = createElementStub(() => ({ width: 150, height: 10, top: 0, left: 0, bottom: 0, right: 0 }), {
        scrollLeft: 0
      });
      priceBar = createElementStub(() => ({ width: 40, height: 10, top: 0, left: 150, bottom: 0, right: 0 }));

      sinon.spy(calendarScrollFunctions, 'scrollToPriceBar');
    });

    it('should scroll the calendar without animation so the selected price bar is centered', () => {
      FakeClock.setTimeTo(`${TODAY}T12:00:00.000-00:00`);

      calendarScrollFunctions.focusOnPriceBar(lfcCalendar, priceBar, true);
      FakeClock.restore();

      expect(calendarScrollFunctions.scrollToPriceBar).to.have.been.calledWith(
        true,
        lfcCalendar,
        MIDPOINT,
        1579262400000,
        0
      );
      expect(lfcCalendar.scrollLeft).to.equal(MIDPOINT);
    });

    it('should have proper padding on each side of the calendar', () => {
      const calendarStub = createElementStub(() => ({ left: 0, width: 375 }), {
        scrollWidth: 428,
        getElementsByClassName: () => [
          createElementStub(() => ({ width: 80 }), { offsetLeft: 54 }),
          createElementStub(() => ({ width: 80 }), { offsetLeft: 134 }),
          createElementStub(() => ({ width: 80 }), { offsetLeft: 214 }),
          createElementStub(() => ({ width: 80 }), { offsetLeft: 294 })
        ]
      });

      const leftSpacerStub = createElementStub(undefined, { style: { paddingLeft: '0rem' } });
      const rightSpacerStub = createElementStub(undefined, { style: { paddingRight: '0rem' } });

      calculateCalendarScrollableBounds(calendarStub, leftSpacerStub, rightSpacerStub);

      expect(leftSpacerStub.style['paddingLeft']).to.equal('9.4rem');
      expect(rightSpacerStub.style['paddingRight']).to.equal('9.4rem');
    });

    it.skip('should scroll the calendar with animation so the selected price bar is centered', (done) => {
      window.requestAnimationFrame = (cb) => cb();
      calendarScrollFunctions.focusOnPriceBar(lfcCalendar, priceBar, false);

      waitFor.untilAssertPass(() => {
        expect(lfcCalendar.scrollLeft).to.equal(MIDPOINT);
      }, done);
    });
  });
});

const createElementStub = (getBoundingClientRectStub = () => {}, otherProps = {}) => ({
  getBoundingClientRect: getBoundingClientRectStub,
  ...otherProps
});
