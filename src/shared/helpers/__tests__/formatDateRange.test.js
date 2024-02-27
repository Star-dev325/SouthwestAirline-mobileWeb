import dayjs from 'dayjs';

describe('formatDateRange', () => {
  let formatDateRange;

  beforeEach(() => {
    formatDateRange = require('src/shared/helpers/formatDateRange').default;
  });

  describe('when there is only a start date', () => {
    it('should format that date', () => {
      const startDate = dayjs('2015-11-08');

      expect(formatDateRange(startDate)).toEqual('Nov 8');
    });
  });

  describe('when we pass string', () => {
    it('should use the given format when parsing the date', () => {
      const format = 'DD/MM/YYYY';
      const startDate = '28/04/2022';
      const endDate = '30/04/2022';

      expect(formatDateRange(startDate, endDate, format)).toEqual('Apr 28 - 30');
    });

    it('should format the string correctly', () => {
      const startDateAsString = '2015-11-08';
      const endDateAsString = '2015-11-09';

      expect(formatDateRange(startDateAsString, endDateAsString)).toEqual('Nov 8 - 9');
    });

    it('should format start date when end date is an empty string', () => {
      const startDate = '2015-11-08';
      const endDate = '';

      expect(formatDateRange(startDate, endDate)).toEqual('Nov 8');
    });

    it('should format start date when end date is null', () => {
      const startDate = '2015-11-08';
      const endDate = null;

      expect(formatDateRange(startDate, endDate)).toEqual('Nov 8');
    });
  });

  describe('when there is both a start and end date', () => {
    it('should return date range without repeating the month if the dates are in the same month', () => {
      const startDate = dayjs('2015-04-08');
      const endDate = dayjs('2015-04-10');

      expect(formatDateRange(startDate, endDate)).toEqual('Apr 8 - 10');
    });

    it('should format start date when start date is same as end date', () => {
      const startDate = dayjs('2015-11-08');
      const endDate = dayjs('2015-11-08');

      expect(formatDateRange(startDate, endDate)).toEqual('Nov 8');
    });

    it('should give one day when dates are on same day but different time zones', () => {
      const startDate = dayjs.parseZone('2016-05-02T18:15:00.000-04:00');
      const endDate = dayjs.parseZone('2016-05-02T23:35:00.000-05:00');

      expect(formatDateRange(startDate, endDate)).toEqual('May 2');
    });

    it('should give both abbreviated months if the dates are in different months', () => {
      const startDate = dayjs('2015-04-08');
      const endDate = dayjs('2015-05-10');

      expect(formatDateRange(startDate, endDate)).toEqual('Apr 8 - May 10');
    });
  });
});
