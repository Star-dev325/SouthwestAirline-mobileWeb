import dayjs from 'dayjs';
import _ from 'lodash';
import formatDateRange from 'src/shared/helpers/formatDateRange';

function formatFlightDateRange(originationDestinations) {
  const firstBound = _.head(originationDestinations);
  const lastBound = _.last(originationDestinations);
  const firstSegment = _.head(firstBound.segments);
  const lastSegment = _.last(lastBound.segments);

  return formatDateRange(_asDayjs(firstSegment.departureDateTime), _asDayjs(lastSegment.arrivalDateTime));
}

function _asDayjs(dateString) {
  return dayjs.parseZone(dateString);
}

export default formatFlightDateRange;
