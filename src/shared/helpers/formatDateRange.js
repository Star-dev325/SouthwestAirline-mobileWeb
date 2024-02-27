import dayjs from 'dayjs';
import _ from 'lodash';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';

function formatDateRange(startDate, endDate, format = MEDIUM_DATE_FORMAT) {
  startDate = _transformStringDateToDayjs(startDate, format);
  endDate = _transformStringDateToDayjs(endDate, format);

  let result = startDate.format('MMM D');

  if (endDate && !endDate.isSame(startDate, 'day')) {
    if (datesAreInSameMonth(startDate, endDate)) {
      result = `${result} - ${endDate.format('D')}`;
    } else {
      result = `${result} - ${endDate.format('MMM D')}`;
    }
  }

  return result;
}

function _transformStringDateToDayjs(element, format) {
  if (_.isString(element)) {
    return _.isEmpty(element) ? null : dayjs(element, format);
  }

  return element;
}

function datesAreInSameMonth(outboundDate, inboundDate) {
  return outboundDate.month() === inboundDate.month();
}

export default formatDateRange;
