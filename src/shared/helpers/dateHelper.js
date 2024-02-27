import dayjs from 'dayjs';
import _ from 'lodash';

function _convertToDateTimeString(date) {
  return date instanceof dayjs().constructor ? date.format() : date;
}

export const isInSameDayIgnoreTimezone = (...args) =>
  _.reduce(
    args,
    (result, date, index) => {
      if (index === 0) {
        return true;
      }
      const previousDate = removeTimeZone(_convertToDateTimeString(args[index - 1]));
      const currentDate = removeTimeZone(_convertToDateTimeString(date));
      const isSameDay = dayjs(currentDate).startOf('day').diff(dayjs(previousDate).startOf('day'), 'days') === 0;

      return result && isSameDay;
    },
    true
  );

export const isInSameDayWithActualTime = (arrivalActualTime, departureActualTime) => {
  const arrivalTime = dayjs(arrivalActualTime, 'HH:mm:ss.SSS');
  const departureTime = dayjs(departureActualTime, 'HH:mm:ss.SSS');

  return arrivalTime.isAfter(departureTime);
};

export const removeTimeZone = (str) => {
  const offset = dayjs.parseZone(str).utcOffset() * 60 * 1000;

  return dayjs.utc(new dayjs.utc(str) + offset).format('YYYY-MM-DDTHH:mm:ss');
};

export const formatDate = (dateTimeString, format = 'YYYY-MM-DD', ignoreTimezone = false) => {
  const dateTime = dayjs(ignoreTimezone ? removeTimeZone(dateTimeString) : dateTimeString);

  if (dateTimeString !== undefined && dateTime.isValid()) {
    return dateTime.format(format);
  }

  return '';
};

export const changeDateFormat = (dateTimeString, fromFormat, toFormat) => {
  const dateTime = dayjs(dateTimeString, fromFormat, true);

  if (dateTimeString !== undefined && dateTime.isValid()) {
    return dateTime.format(toFormat);
  }

  return undefined;
};

const FORMATS = [
  'YYYY-MM-DDTHH:mm:ss.SSSZ',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm',
  'HH:mm:ss.SSS',
  'HH:mm'
];

const _parseDataTimeAsDayjsIgnoreTimezone = (dateTimeString) => {
  const dateTimeValidWithFormat = (dateTime, format) => {
    const parseFormatWithZone = dayjs.parseZone(dateTime).format(format, true);

    return dayjs(dateTime, format, true).isValid() || dayjs(parseFormatWithZone).isValid();
  };

  const validDateTimeFormat = _.find(FORMATS, (format) => dateTimeValidWithFormat(dateTimeString, format));

  if (validDateTimeFormat === undefined) return;

  return validDateTimeFormat === 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    ? dayjs(removeTimeZone(dateTimeString))
    : dayjs(dateTimeString, validDateTimeFormat);
};

export const retrieveHourAndMinutesIgnoreTimezone = (dateTimeString) => {
  const dataTime = _parseDataTimeAsDayjsIgnoreTimezone(dateTimeString);

  return dataTime
    ? {
      time: dataTime.format('h:mm'),
      period: dataTime.format('A')
    }
    : {
      time: 'Invalid Time',
      period: 'N/A'
    };
};

export const isDateTimeInTheFuture = (dateTime) => dayjs(dateTime).isAfter(dayjs());

export const today = () => daysAfter(0);

export const tomorrow = () => daysAfter(1);

export const yesterday = () => daysAfter(-1);

export const daysAfter = (days, date) => dayjs(date).startOf('day').add(days, 'days');

export const daysAfterWithExactTime = (days, date) => dayjs(date).add(days, 'days');

export const getFormattedDatePeriod = (dateFormat, startDate, endDate) => {
  if (!startDate && !endDate) {
    return null;
  }

  let formattedTravelPeriod = startDate.format(dateFormat);

  if (endDate) {
    formattedTravelPeriod = `${formattedTravelPeriod} - ${endDate.format(dateFormat)}`;
  }

  return formattedTravelPeriod;
};

const isWithinNumberOfHoursFromNow = (dayjsDateTime, hours) => {
  const now = dayjs();
  const numberOfHoursFromNow = dayjs(now).add(hours, 'hours');

  return dayjs(dayjsDateTime).isBetween(now, numberOfHoursFromNow);
};

export const isWithin24Hours = (dayjsDateTime) => isWithinNumberOfHoursFromNow(dayjsDateTime, 24);

export const isWithin48Hours = (dayjsDateTime) => isWithinNumberOfHoursFromNow(dayjsDateTime, 48);

export const getDayjsDateFromString = (string) => dayjs(string, 'YYYY-MM-DD');

export const isWithinRange = (startDate, endDate, date) =>
  !!startDate && !!endDate && dayjs(date).isBetween(startDate, endDate, 'day', '[]');

export const formatDayjsToYYYYMMDD = (theDayjs) => theDayjs.format('YYYY-MM-DD');

export const formatDayjsToMonthDay = (theDayjs) => theDayjs.format('MMM DD');

export const isPastDate = (firstDateString, secondDateString) => dayjs(firstDateString).isBefore(secondDateString);
