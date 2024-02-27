import * as DateHelper from 'src/shared/helpers/dateHelper';
import dayjs from 'dayjs';
import FakeClock from 'test/unit/helpers/fakeClock';

describe('dateHelper', () => {
  context('isInSameDayIgnoreTimezone', () => {
    it('should return true if given times within one day', () => {
      expect(DateHelper.isInSameDayIgnoreTimezone('2015-12-30T11:40:00.000-05:00', '2015-12-30T05:40:00.000-06:00')).to
        .be.true;
      expect(DateHelper.isInSameDayIgnoreTimezone('2015-12-30T11:40:00', '2015-12-30T05:40:00')).to.be.true;
      expect(DateHelper.isInSameDayIgnoreTimezone(dayjs('2015-12-30T11:40:00'), '2015-12-30T05:40:00')).to.be.true;
      expect(DateHelper.isInSameDayIgnoreTimezone(dayjs('2015-12-30T11:40:00'), dayjs('2015-12-30T05:40:00'))).to.be
        .true;
      expect(DateHelper.isInSameDayIgnoreTimezone('2015-12-30', '2015-12-30')).to.be.true;
    });

    it('should return false if given times not in one day even both without timezone', () => {
      expect(DateHelper.isInSameDayIgnoreTimezone('2015-06-17T11:00', '2015-06-16T20:20')).to.be.false;
    });

    it('should return false if given times are not in one day', () => {
      expect(DateHelper.isInSameDayIgnoreTimezone('2015-12-08T19:10:00.000-07:00', '2015-12-09T09:10:00.000-07:00')).to
        .be.false;
    });
  });

  context('isInSameDayWithActualTime', () => {
    it('should return true if give times within one day', () => {
      expect(DateHelper.isInSameDayWithActualTime('19:20:00.000', '18:20:00.000')).to.be.true;
      expect(DateHelper.isInSameDayWithActualTime('19:20:00.000', '19:10:00.000')).to.be.true;
    });

    it('should return false if give times without one day', () => {
      expect(DateHelper.isInSameDayWithActualTime('01:20:00.000', '23:20:00.000')).to.be.false;
    });
  });

  context('removeTimeZone', () => {
    it('should remove time zone', () => {
      expect(DateHelper.removeTimeZone('2015-12-08T19:10:00.000-06:00')).to.equal('2015-12-08T19:10:00');
    });

    it('should return itself when no time zone', () => {
      expect(DateHelper.removeTimeZone('2015-12-08T19:10:00')).to.equal('2015-12-08T19:10:00');
    });
  });

  context('formatDate', () => {
    it('should format date with given format', () => {
      expect(DateHelper.formatDate('2015-12-08T19:10:00.000', 'ddd, ll')).to.equal('Tue, Dec 8, 2015');
    });

    it('should return empty string when date time is invalid', () => {
      expect(DateHelper.formatDate('', 'ddd, ll')).to.equal('');
      expect(DateHelper.formatDate(null, 'ddd, ll')).to.equal('');
      expect(DateHelper.formatDate(undefined, 'ddd, ll')).to.equal('');
    });
  });

  context('changeDateFormat', () => {
    it('should format date with given format', () => {
      expect(DateHelper.changeDateFormat('12/08/2015', 'MM/DD/YYYY', 'YYYY-MM-DD')).to.equal('2015-12-08');
    });

    it('should return undefined when given date is illegal', () => {
      expect(DateHelper.changeDateFormat('25/08/2015', 'MM/DD/YYYY', 'YYYY-MM-DD')).to.be.undefined;
      expect(DateHelper.changeDateFormat(undefined, 'MM/DD/YYYY', 'YYYY-MM-DD')).to.be.undefined;
      expect(DateHelper.changeDateFormat('', 'MM/DD/YYYY', 'YYYY-MM-DD')).to.be.undefined;
    });
  });

  context('retrieveHourAndMinutesIgnoreTimezone', () => {
    it('should ignore timezone with format when input dateTimeString format like `YYYY-MM-DDTHH:mm:ss.SSSZ`', () => {
      const retrievedTime = DateHelper.retrieveHourAndMinutesIgnoreTimezone('2015-04-28T19:05:00.000-07:00');

      expect(retrievedTime.time).to.deep.equal('7:05');
      expect(retrievedTime.period).to.deep.equal('PM');
    });

    it('should return correct time and period when input dateTimeString format like `YYYY-MM-DDTHH:mm`', () => {
      const retrievedTime = DateHelper.retrieveHourAndMinutesIgnoreTimezone('2015-04-28T19:05');

      expect(retrievedTime.time).to.deep.equal('7:05');
      expect(retrievedTime.period).to.deep.equal('PM');
    });

    it('should return correct time and period when input dateTimeString format like `HH:mm:ss.SSS`', () => {
      const retrievedTime = DateHelper.retrieveHourAndMinutesIgnoreTimezone('19:05:00.000');

      expect(retrievedTime.time).to.deep.equal('7:05');
      expect(retrievedTime.period).to.deep.equal('PM');
    });

    it('should return correct time and period when input dateTimeString format like `HH:mm`', () => {
      const retrievedTime = DateHelper.retrieveHourAndMinutesIgnoreTimezone('19:05');

      expect(retrievedTime.time).to.deep.equal('7:05');
      expect(retrievedTime.period).to.deep.equal('PM');
    });

    it('should return correct time and period when input dateTimeString format like `YYYY-MM-DDTHH:mm:ss.SSS`', () => {
      const retrievedTime = DateHelper.retrieveHourAndMinutesIgnoreTimezone('2017-04-14T11:30:00.000');

      expect(retrievedTime.time).to.deep.equal('11:30');
      expect(retrievedTime.period).to.deep.equal('AM');
    });

    it('should return correct time and period when input dateTimeString format like `YYYY-MM-DDTHH:mm:ss`', () => {
      const retrievedTime = DateHelper.retrieveHourAndMinutesIgnoreTimezone('2017-04-14T11:30:00');

      expect(retrievedTime.time).to.deep.equal('11:30');
      expect(retrievedTime.period).to.deep.equal('AM');
    });

    it('should return Invalid time when input dateTimeString format is invalid', () => {
      const retrievedTime = DateHelper.retrieveHourAndMinutesIgnoreTimezone('2017/04/14T11:30:00');

      expect(retrievedTime.time).to.deep.equal('11:30');
      expect(retrievedTime.period).to.deep.equal('AM');
    });
  });

  context('daysAfter', () => {
    it('should always return the day after current Date', () => {
      const startDateString = '2015-12-08T19:10:00';

      expect(DateHelper.daysAfter(3, startDateString).date()).to.deep.equal(11);
    });
  });

  context('daysAfterWithExactTime', () => {
    it('should always return the day after current date with exact time', () => {
      const startDateString = '2015-12-08T19:10:00';
      const dateTimeString = DateHelper.daysAfterWithExactTime(3, startDateString).format('YYYY-MM-DDTHH:mm:ss');

      expect(dateTimeString).to.equal('2015-12-11T19:10:00');
    });
  });

  context('getFormattedDatePeriod', () => {
    it('should return 12/08/15 - 12/11/15 ', () => {
      const startDate = dayjs('2015-12-08T19:10:00');
      const endDate = dayjs('2015-12-11T19:10:00');

      expect(DateHelper.getFormattedDatePeriod('M/DD/YY', startDate, endDate)).to.deep.equal('12/08/15 - 12/11/15');
    });

    it('should return 12/8/15', () => {
      const startDate = dayjs('2015-12-08T19:10:00');

      expect(DateHelper.getFormattedDatePeriod('M/DD/YY', startDate)).to.deep.equal('12/08/15');
    });

    it('should return null', () => {
      expect(DateHelper.getFormattedDatePeriod('M/DD/YY', undefined, undefined)).to.not.exist;
    });
  });

  context('isWithin24Hours', () => {
    it('should be true when given dateTime is within 24 hours from now', () => {
      expect(DateHelper.isWithin24Hours(dayjs().add(23, 'hours'))).to.be.true;
    });

    it('should be false when given dateTime is 24:01 in the future', () => {
      const dayjsDateTime = dayjs().add(24, 'hours').add(1, 'minute');

      expect(DateHelper.isWithin24Hours(dayjsDateTime)).to.be.false;
    });

    it('should be false when given dateTime is in past', () => {
      const dayjsDateTime = dayjs().subtract(1, 'minute');

      expect(DateHelper.isWithin24Hours(dayjsDateTime)).to.be.false;
    });
  });

  context('getDayjsDateFromString', () => {
    const dayjsConstructor = dayjs().constructor;
    let result;

    beforeEach(() => {
      result = DateHelper.getDayjsDateFromString('2015-04-01');
    });

    it('should return a dayjs object', () => {
      expect(result instanceof dayjsConstructor).to.be.true;
    });

    it('should return a valid date', () => {
      expect(result.isValid()).to.be.true;
    });

    it('should return dayjs object with same value as passed in', () => {
      expect(result.format('YYYY-MM-DD')).to.equal('2015-04-01');
    });

    it('should also accept other format like "2015/04/01"', () => {
      result = DateHelper.getDayjsDateFromString('2015/04/01');
      expect(result.format('YYYY-MM-DD')).to.equal('2015-04-01');
    });
  });

  context('isWithinRange', () => {
    let result;
    let startDate;
    let endDate;

    beforeEach(() => {
      startDate = '2018-01-01';
      endDate = '2018-08-01';
    });

    it('should return true when date is between range', () => {
      result = DateHelper.isWithinRange(startDate, endDate, dayjs('2018-04-01'));
      expect(result).to.be.true;
    });

    it('should return false when date is before range', () => {
      result = DateHelper.isWithinRange(startDate, endDate, dayjs('2017-12-31'));
      expect(result).to.be.false;
    });

    it('should return false when date is behind range', () => {
      result = DateHelper.isWithinRange(startDate, endDate, dayjs('2018-10-31'));
      expect(result).to.be.false;
    });
  });

  context('with Fake Clock', () => {
    beforeEach(() => {
      FakeClock.setTimeTo('2018-07-04T13:15');
    });

    afterEach(() => {
      FakeClock.restore();
    });

    context('today', () => {
      it('should return today when today function is called', () => {
        expect(DateHelper.today().format('YYYY-MM-DD')).to.be.equal('2018-07-04');
      });
    });

    context('tomorrow', () => {
      it('should return tomorrow when tomorrow function is called', () => {
        expect(DateHelper.tomorrow().format('YYYY-MM-DD')).to.be.equal('2018-07-05');
      });
    });

    context('yesterday', () => {
      it('should return yesterday when yesterday function is called', () => {
        expect(DateHelper.yesterday().format('YYYY-MM-DD')).to.be.equal('2018-07-03');
      });
    });

    context('formatDayjsToYYYYMMDD', () => {
      it('should return the dayjs formatted to "YYY-MM-DD"', () => {
        expect(DateHelper.formatDayjsToYYYYMMDD(dayjs())).to.be.equal('2018-07-04');
      });
    });

    context('formatDayjsToMonthDay', () => {
      it('should return the dayjs formatted to "Month day"', () => {
        expect(DateHelper.formatDayjsToMonthDay(dayjs())).to.be.equal('Jul 04');
      });
    });
  });

  context('isPastDate', () => {
    it('should return true when 1st date is before 2nd date', () => {
      expect(DateHelper.isPastDate('2020-01-01', '2020-01-30'));
    });

    it('should return false when 1st date is before 2nd date', () => {
      expect(DateHelper.isPastDate('2020-01-30', '2020-01-01'));
    });

    it('should return false when 1st date is same as 2nd date', () => {
      expect(DateHelper.isPastDate('2020-01-01', '2020-01-01'));
    });
  });
});
