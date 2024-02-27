import {
  RAPID_REWARDS_VISA_ID,
  PAY_PAL_CARD_ID,
  APPLE_PAY_CARD_ID,
  UPLIFT_CARD_ID,
  NEW_CREDIT_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import { INSTANT_CREDIT_RAPID_REWARDS_VISA } from 'src/shared/constants/creditCardTypes';

export const getPaymentInfoForWAPI = () => ({
  cardNumber: '4123456789012',
  lastFourDigitsOfCreditCard: '9012',
  nameOnCard: 'adfds gfd',
  expiration: '2029-10',
  isoCountryCode: 'US',
  addressLine1: 'asdfafa',
  addressLine2: '',
  city: 'afdasfa',
  stateProvinceRegion: 'AS',
  zipOrPostalCode: '12312',
  phoneNumber: '555-555-5555',
  phoneCountryCode: 'AS',
  creditCardType: 'VISA',
  securityCode: '123'
});

export const getBillingAddressInfoForUseNewCreditCard = () => ({
  address: {
    isoCountryCode: 'US',
    stateProvinceRegion: 'AS',
    zipOrPostalCode: '12312',
    addressLine1: 'asdfafa',
    addressLine2: '',
    city: 'Brooklyn'
  },
  emailAddress: 'abc@gmail.com',
  phone: {
    countryCode: '+1',
    number: '1231231234',
    phoneType: 'MOBILE'
  }
});

export const getPaymentFormDataBlank = () => ({
  isoCountryCode: 'US',
  stateProvinceRegion: '',
  zipOrPostalCode: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  phoneCountryCode: 'US',
  phoneNumber: '',
  selectedCardId: 'NEW_CREDIT_CARD_ID',
  chasePhoneCountryCode: 'US'
});

export const getPaymentFormTouched = () => ({
  isoCountryCode: 'US',
  stateProvinceRegion: 'AS',
  zipOrPostalCode: '12312',
  addressLine1: '',
  addressLine2: '',
  city: 'Brooklyn',
  phoneCountryCode: 'US',
  phoneNumber: '123-123-1234',
  selectedCardId: 'NEW_CREDIT_CARD_ID',
  chasePhoneCountryCode: 'US '
});

export const getPaymentInfoForUseNewCreditCard = () => ({
  cardNumber: '4123456789012',
  nameOnCard: 'adfds gfd',
  expiration: '2029-10',
  isoCountryCode: 'US',
  addressLine1: 'asdfafa',
  addressLine2: '',
  city: 'Brooklyn',
  stateProvinceRegion: 'AS',
  zipOrPostalCode: '12312',
  phoneCountryCode: 'AS',
  phoneNumber: '555-555-5555',
  securityCode: '123',
  selectedCardId: NEW_CREDIT_CARD_ID,
  intentToStore: false,
  isPrimary: false
});

export const getPaymentInfoForRapidRewardCard = () => ({
  chasePhoneCountryCode: 'US',
  chasePhoneNumber: '222-333-4444',
  selectedCardId: RAPID_REWARDS_VISA_ID
});

export const getPaymentInfoForPayPalCard = () => ({
  selectedCardId: PAY_PAL_CARD_ID
});

export const getPaymentInfoForApplePayCard = () => ({
  selectedCardId: APPLE_PAY_CARD_ID
});

export const getPaymentInfoForUpliftCard = () => ({
  selectedCardId: UPLIFT_CARD_ID
});

export const getPaymentInfoForUseSavedCreditCard = () => ({
  selectedCardId: '1-4BGFWY'
});

export const getPaymentInfoForGhostCard = () => ({
  selectedCardId: 'ghost card name',
  selectedGhostCardId: 'ghost card name'
});

export const getMismatchedPaymentInfoForGhostCard = () => ({
  selectedCardId: '1-4BGFWY',
  selectedGhostCardId: 'ghost card name'
});

export const getCompanionPaymentInfo = () => ({
  selectedCardId: '1-GBGFWY',
  lastFourDigitsOfCreditCard: '1111',
  creditCardType: 'VISA',
  nameOnCard: 'QIAN WANG',
  addressLine1: 'CHENGDU',
  addressLine2: 'CUIT',
  city: 'Dallas',
  stateProvinceRegion: 'TX',
  zipOrPostalCode: '12345',
  addressType: 'HOME',
  isoCountryCode: 'US',
  intentToStore: true,
  isPrimary: false,
  companyName: null
});

export const getChaseInstantCreditCard = () => ({
  selectedCardId: NEW_CREDIT_CARD_ID,
  lastFourDigitsOfCreditCard: '1111',
  creditCardType: INSTANT_CREDIT_RAPID_REWARDS_VISA.key,
  nameOnCard: 'QIAN WANG',
  addressLine1: 'CHENGDU',
  addressLine2: 'CUIT',
  city: 'Dallas',
  stateProvinceRegion: 'TX',
  zipOrPostalCode: '12345',
  addressType: 'HOME',
  isoCountryCode: 'US',
  companyName: null
});

export const withCardNumberAndSecurityCode = (cardNumber, securityCode = '') => ({
  cardNumber,
  lastFourDigitsOfCreditCard: '9012',
  nameOnCard: 'adfds gfd',
  expiration: '2029-10',
  isoCountryCode: 'US',
  addressLine1: 'asdfafa',
  addressLine2: '',
  city: 'afdasfa',
  stateProvinceRegion: 'AS',
  zipOrPostalCode: '12312',
  phoneNumber: '555-555-5555',
  phoneCountryCode: 'AS',
  securityCode
});

export const getSavedCreditCards = () => [
  {
    cardDescription: 'VISA 1111',
    creditCardType: 'VISA',
    lastFourDigitsOfCreditCard: '1111',
    expirationMonth: 4,
    expirationYear: 2023,
    isPrimary: true,
    savedCreditCardId: '1-GBGFWY',
    cardHolder: {
      firstName: 'QIAN',
      lastName: 'WANG'
    },
    billingAddress: {
      addressLine1: 'CHENGDU',
      addressLine2: 'CUIT',
      city: 'Dallas',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '12345',
      addressType: 'HOME',
      isoCountryCode: 'US',
      companyName: null
    }
  },
  {
    cardDescription: 'VISA 1111',
    creditCardType: 'VISA',
    lastFourDigitsOfCreditCard: '1111',
    expirationMonth: 1,
    expirationYear: 2017,
    isPrimary: false,
    savedCreditCardId: '1-GC1S94',
    cardHolder: {
      firstName: 'Vi',
      lastName: 'Chang'
    },
    billingAddress: {
      addressLine1: '123',
      addressLine2: '',
      city: 'Dallas',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '75204',
      addressType: 'HOME',
      isoCountryCode: 'US',
      companyName: null
    }
  }
];

export const getApplePayCard = () => ({
  token: {
    digitalTransactionId: '123456',
    expirationMonth: '01',
    expirationYear: '2020',
    lastFourDigits: '1234',
    number: '123456'
  },
  billingAddress: {
    isoCountryCode: 'US',
    stateProvinceRegion: 'TX',
    zipOrPostalCode: '12312',
    addressLine1: '1234 Test Ln',
    addressLine2: '',
    city: 'Dallas',
    firstName: 'First',
    lastName: 'Last'
  },
  formData: {
    receiptEmail: 'test@wnco.com'
  },
  isNativeApplePay: false
});

export const getNativeApplePayCard = () => ({
  purchaseRequest: {
    newCreditCard: {
      ...module.exports.getPaymentInfoForUseNewCreditCard()
    }
  },
  formData: {
    receiptEmail: 'test@wnco.com',
    paymentInfo: {
      ...module.exports.getPaymentInfoForApplePayCard()
    }
  },
  isNativeApplePay: true
});

export const getUpliftCard = () => ({
  token: {
    number: '123456',
    expirationMonth: '01',
    expirationYear: '2020'
  },
  billingAddress: {
    isoCountryCode: 'US',
    stateProvinceRegion: 'TX',
    zipOrPostalCode: '12312',
    addressLine1: '1234 Test Ln',
    addressLine2: '',
    city: 'Dallas',
    firstName: 'First',
    lastName: 'Last'
  },
  formData: {
    key: 'value'
  }
});

export const getApplePayErrorCodes = () => ({
  applePayErrorCodes: {
    "400310564": "ERR_GENDER_IS_MISSING",
    "400310588": "ERR_INVALID_STATE_CODE",
    "400310631": "ERR_INVALID_KTN_FORMAT ",
    "400310654": "ERR_BOUND_REFERENCE_TIMEOUT_IN_CHANGEFLOW_TRYING_TO_CONFIRM",
    "400310709": "ERR_ALL_PASSENGERS_ARE_CONSIDERED_YT",
    "400310710": "ERR_ALL_PASSENGERS_ARE_CONSIDERED_UM",
    "400310764": "ERR_ALL_PASSENGERS_ARE_UNDER_5YEARS_OLD",
    "400310793": "ERR_INVALID_CONTACT_PHONENUMBER_IS_PROVIDED",
    "400310830": "ERR_PAYMENT_SOLUTION_ERRORS"
  }
});

export const getApplePayErrorCodesKeys = () => ([
  400310564,
  400310588,
  400310631,
  400310654,
  400310709,
  400310710,
  400310764,
  400310793,
  400310830
]);
