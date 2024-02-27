import dayjs from 'dayjs';
import { splitNameOnCard } from 'src/shared/helpers/creditCardHelper';

export function transformToUpdateCreditCardFormDataForChapi(savedCreditCard) {
  const {
    type,
    lastFourDigits,
    nameOnCard,
    expiryMonth,
    expiryYear,
    billingAddress: { isoCountryCode, addressLine1, addressLine2, zipOrPostalCode, city, stateProvinceRegion }
  } = savedCreditCard;

  const expirationDate = dayjs()
    .year(expiryYear)
    .month(expiryMonth - 1);

  return {
    lastFourDigitsOfCreditCard: lastFourDigits,
    creditCardType: type,
    nameOnCard,
    expiration: expirationDate.format('YYYY-MM'),
    addressLine1,
    addressLine2,
    city,
    isoCountryCode,
    stateProvinceRegion,
    zipOrPostalCode
  };
}

export function transformToUpdateCreditCardApiRequestForChapi(creditCard) {
  const {
    addressLine1,
    addressLine2,
    city,
    expiration,
    isoCountryCode,
    cardDescription,
    creditCardType,
    nameOnCard,
    savedCreditCardId,
    stateProvinceRegion,
    zipOrPostalCode
  } = creditCard;

  const { firstNameOnCard, lastNameOnCard } = splitNameOnCard(nameOnCard);

  return {
    creditCardPayment: {
      creditCardType,
      expiration,
      savedCreditCardId,
      cardDescription
    },
    billingContactInfo: {
      firstName: firstNameOnCard,
      lastName: lastNameOnCard,
      address: {
        addressLine1,
        addressLine2,
        city,
        stateProvinceRegion,
        zipOrPostalCode,
        isoCountryCode
      }
    }
  };
}
