export default {
  APPLY_FUNDS: 'Apply Funds',
  APPLY_FUNDS_CANCEL_DIALOG: {
    message: 'All funds will be removed.',
    name: 'APPLY_FUNDS_CANCEL_DIALOG',
    title: 'Are you sure?'
  },
  APPLY_GIFT_CARD_FORM_ID: 'APPLY_GIFT_CARD_FORM_ID',
  APPLY_GIFT_CARD: 'Apply Gift Card',
  APPLY_LUV_VOUCHER_FORM_ID: 'APPLY_LUV_VOUCHER_FORM_ID',
  APPLY_TRAVEL_FUNDS_FORM_ID: 'APPLY_TRAVEL_FUNDS_FORM_ID',
  APPLY_TRAVEL_FUNDS: 'Apply Travel Funds',
  APPLY_VOUCHER: 'Apply Voucher',
  ASSOCIATE_FUNDS_TYPE: 'ASSOCIATE',
  CHECK_TRAVEL_FUNDS: 'Check Travel Funds',
  FUND_TYPES_FORMATTED: ['travel-funds', 'luv-voucher', 'gift-card'],
  FUND_TYPES: ['Flight Credit', 'LUV Voucher', 'Gift Card'],
  FUNDS_FROM_YOUR_ACCOUNT: 'FUNDS FROM YOUR ACCOUNT',
  GIFT_CARD_FORM_FIELDS: [
    {
      fieldName: 'cardNumber',
      maxLength: 20,
      pattern: '[0-9]*',
      placeholder: 'Card number',
      type: 'tel'
    },
    {
      fieldName: 'securityCode',
      maxLength: 5,
      pattern: '[0-9]*',
      placeholder: 'Security code',
      type: 'tel'
    }
  ],
  LOOK_UP_FUNDS: 'Look up funds',
  LOOK_UP_GIFT_CARD_FORM_ID: 'LOOK_UP_GIFT_CARD_FORM_ID',
  LOOK_UP_GIFT_CARD: 'Look up gift card',
  LOOK_UP_LUV_VOUCHER_FORM_ID: 'LOOK_UP_LUV_VOUCHER_FORM_ID',
  LOOK_UP_TRAVEL_FUNDS_FORM_ID: 'LOOK_UP_TRAVEL_FUNDS_FORM_ID',
  LOOK_UP_VOUCHER: 'Look up voucher',
  LUV_VOUCHER_FORM_FIELDS: [
    {
      fieldName: 'voucherNumber',
      maxLength: 20,
      pattern: '[0-9]*',
      placeholder: 'Voucher number',
      type: 'tel'
    },
    {
      fieldName: 'securityCode',
      maxLength: 5,
      pattern: '[0-9]*',
      placeholder: 'Security code',
      type: 'tel'
    }
  ],
  LUV_VOUCHER_SPEND_NOTE:
    'Note: Southwest LUV Voucher will not be applied as payment toward government-imposed charges and fees.',
  SEARCH_TOKEN_QUERY: 'searchToken=',
  SPLIT_PAYMENT: 'SPLIT_PAYMENT',
  TOTAL_DUE_NOW: 'TOTAL DUE NOW',
  TRANSFER_FUNDS_PATH_URL: '/travel-funds/transfer-funds',
  TRANSFER_FUNDS_TYPE: 'TRANSFER',
  TRANSFER_PARTIAL_CONFIRMATION_MESSAGE: 'TRANSFER_PARTIAL_CONFIRMATION',
  TRAVEL_FUNDS_APPLIED: 'TRAVEL FUNDS APPLIED',
  TRAVEL_FUNDS_FAQS: 'Travel Funds FAQs',
  TRAVEL_FUNDS_FORM_FIELDS: [
    {
      fieldName: 'confirmationNumber',
      placeholder: 'Confirmation number',
      type: 'text'
    },
    {
      fieldName: 'passengerFirstName',
      placeholder: 'Passenger first name',
      type: 'text'
    },
    {
      fieldName: 'passengerLastName',
      placeholder: 'Passenger last name',
      type: 'text'
    }
  ],
  TRAVEL_FUNDS_LANDING_PAGE_URL: '/travel-funds/look-up',
  TRAVEL_FUNDS_TERMS_AND_CONDITIONS: 'Travel Funds Terms and Conditions',
  TRAVEL_FUNDS_VALIDATE_API_HREF: '/v1/mobile-air-booking/page/validate-transfer'
};
