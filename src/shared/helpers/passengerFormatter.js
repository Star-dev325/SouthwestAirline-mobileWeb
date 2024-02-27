import _ from 'lodash';
import pluralize from 'pluralize';

const PassengerFormatter = {
  formatPassengerName(model, fieldArray) {
    return _.chain(model)
      .pick(fieldArray)
      .values()
      .compact()
      .map((x) => _.capitalize(x.toLowerCase()))
      .join(' ')
      .value();
  },
  formatPassengerType(count, type) {
    return count ? `${count} ${pluralize(type, count)}` : '';
  }
};

export default PassengerFormatter;
