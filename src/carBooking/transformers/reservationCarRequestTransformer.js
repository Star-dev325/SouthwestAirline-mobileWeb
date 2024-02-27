import _ from 'lodash';
import countryCode from 'src/shared/constants/countryCode';
import { removeSeparator } from 'src/shared/helpers/separatorHelper';

export default (reserveCarRequest, selectedCarResult, selectedExtras = []) => {
  const {
    accountNumber,
    confirmationEmail,
    firstName,
    lastName,
    purposeOfTravel,
    driverPhoneNumber,
    driverIsoCountryCode
  } = reserveCarRequest;

  const { productId, appliedDiscount } = selectedCarResult;
  const discounts = _getDiscounts(appliedDiscount);

  return {
    driver: {
      firstName,
      lastName,
      accountNumber: accountNumber ? accountNumber : '',
      flightNumber: null,
      phone: {
        number: removeSeparator(driverPhoneNumber),
        countryCode: countryCode[driverIsoCountryCode]
      }
    },
    product: {
      productId
    },
    receiptEmail: confirmationEmail,
    purposeOfTravel: purposeOfTravel ? purposeOfTravel.toUpperCase() : null,
    extras: _.map(selectedExtras, (extra) => ({ type: extra })),
    discounts
  };
};

const _getDiscounts = (appliedDiscount) => (_.isEmpty(appliedDiscount) ? [] : [appliedDiscount]);
