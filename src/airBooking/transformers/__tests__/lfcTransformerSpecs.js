import {
  mergeAndRemoveDuplicateDates,
  transformToPrevBoundPage,
  transformToNextBoundPage
} from 'src/airBooking/transformers/lfcTransformer';

describe('', () => {
  let lfcDays;
  let newBound;
  let currentBound;

  beforeEach(() => {
    lfcDays = [
      {
        date: '2020-01-17',
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
    newBound = {
      date: 'new bound date',
      lowFareCalendarDays: [lfcDays[0]],
      _links: {
        previousLowFareCalendarPage: 'newbound - pevLowFareCalendarPage',
        nextLowFareCalendarPage: 'newbound - nextLowFareCalendarPage'
      }
    };
    currentBound = {
      date: 'current bound date',
      lowFareCalendarDays: [lfcDays[1]],
      _links: {
        previousLowFareCalendarPage: 'current - pevLowFareCalendarPage',
        nextLowFareCalendarPage: 'current - nextLowFareCalendarPage'
      }
    };
  });

  context('mergeAndRemoveDuplicateDates from lowFareCalendarDays', () => {
    it('should merge 2 arrays and return no duplicates from 2nd list when duplicates exist', () => {
      const lfcDaysWithDuplicate = [
        {
          date: '2020-01-18',
          lowestPrice: {
            price: {
              amount: '-100.',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-19',
          lowestPrice: {
            price: {
              amount: '-100.',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ];
      const expectedArray = [...lfcDays, lfcDaysWithDuplicate[1]];

      const actualArray = mergeAndRemoveDuplicateDates(lfcDays, lfcDaysWithDuplicate);

      expect(actualArray, expectedArray).to.deep.equal;
    });

    it('should merge 2 arrays when no duplicates exist', () => {
      const lfcDaysWithDuplicate = [
        {
          date: '2020-01-18',
          lowestPrice: {
            price: {
              amount: '-100.',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        },
        {
          date: '2020-01-19',
          lowestPrice: {
            price: {
              amount: '-100.',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            pricePointsTax: null
          }
        }
      ];
      const expectedArray = [...lfcDays, lfcDaysWithDuplicate[1]];

      const actualArray = mergeAndRemoveDuplicateDates(lfcDays, lfcDaysWithDuplicate);

      expect(actualArray, expectedArray).to.deep.equal;
    });
  });

  context('transformToPrevBoundPage', () => {
    let result;

    beforeEach(() => {
      result = transformToPrevBoundPage(newBound, currentBound);
    });

    it('should return header from newBound', () => {
      expect(result.header).to.deep.equal(newBound.header);
    });

    it('should return _links previousLowFareCalendarPage from newBound', () => {
      expect(result._links.previousLowFareCalendarPage).to.deep.equal(newBound._links.previousLowFareCalendarPage);
    });

    it('should return _links nextLowFareCalendarPage from currentBound', () => {
      expect(result._links.nextLowFareCalendarPage).to.deep.equal(currentBound._links.nextLowFareCalendarPage);
    });

    it('should merge lfc days with newBound days before currentBound days', () => {
      expect(result.lowFareCalendarDays).to.deep.equal([
        ...newBound.lowFareCalendarDays,
        ...currentBound.lowFareCalendarDays
      ]);
    });
  });

  context('transformToNextBoundPage', () => {
    let result;

    beforeEach(() => {
      result = transformToNextBoundPage(newBound, currentBound);
    });

    it('should return header from newBound', () => {
      expect(result.header).to.deep.equal(newBound.header);
    });

    it('should return _links previousLowFareCalendarPage from newBound', () => {
      expect(result._links.previousLowFareCalendarPage).to.deep.equal(currentBound._links.previousLowFareCalendarPage);
    });

    it('should return _links nextLowFareCalendarPage from currentBound', () => {
      expect(result._links.nextLowFareCalendarPage).to.deep.equal(newBound._links.nextLowFareCalendarPage);
    });

    it('should merge lfc days with currentBound days before newBound days', () => {
      expect(result.lowFareCalendarDays).to.deep.equal([
        ...currentBound.lowFareCalendarDays,
        ...newBound.lowFareCalendarDays
      ]);
    });
  });
});
