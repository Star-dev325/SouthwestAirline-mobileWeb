import dayjs from 'dayjs';
import { isOnOldRoute } from 'src/shared/helpers/urlHelper';

const TripTypes = {
  ROUND_TRIP: {
    keyName: 'ROUND_TRIP',
    queryParamKey: isOnOldRoute() ? 'RT' : 'roundtrip',
    value: 'roundTrip',
    label: 'Round Trip',
    departureDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    returnDate: dayjs().add(4, 'day').format('YYYY-MM-DD')
  },
  ONE_WAY: {
    keyName: 'ONE_WAY',
    queryParamKey: isOnOldRoute() ? 'OW' : 'oneway',
    value: 'oneWay',
    label: 'One Way',
    departureDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    returnDate: ''
  }
};

export default TripTypes;
