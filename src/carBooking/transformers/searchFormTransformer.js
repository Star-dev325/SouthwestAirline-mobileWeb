import dayjs from 'dayjs';
import _ from 'lodash';
import { CAR_VENDOR } from 'src/carBooking/constants/carBookingMessages';
import i18n from '@swa-ui/locale';

const { SHOP_NONE_VALUE } = CAR_VENDOR;

const _getApiFormattedDateTime = (date, time) =>
  dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mmA').format('YYYY-MM-DDTHH:mm');

const _getCarCompany = (carCompany) =>
  (carCompany === i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT') || carCompany === SHOP_NONE_VALUE ? [] : carCompany);

export default (data) => {
  const { pickUp, dropOff, pickUpDate, dropOffDate, pickUpTime, dropOffTime, carCompany, discount } = data;
  const vendors = _getCarCompany(carCompany);
  const enteredDiscount = _.filter(discount, (discountInfo) => {
    const { code, type, vendor } = discountInfo;

    return !(_.isEmpty(code) || _.isEmpty(type) || _.isEmpty(vendor));
  }).map((discountInfo) => {
    const { code, type, vendorName } = discountInfo;

    return {
      code,
      type,
      vendor: vendorName
    };
  });

  const searchRequest = {
    'pickup-location': pickUp,
    'return-location': dropOff,
    'pickup-datetime': _getApiFormattedDateTime(pickUpDate, pickUpTime),
    'return-datetime': _getApiFormattedDateTime(dropOffDate, dropOffTime)
  };

  if (!_.isEmpty(vendors)) {
    _.merge(searchRequest, { vendor: _.map(vendors, 'vendorName') });
  }

  if (!_.isEmpty(enteredDiscount)) {
    _.merge(searchRequest, { discount: enteredDiscount });
  }

  return searchRequest;
};
