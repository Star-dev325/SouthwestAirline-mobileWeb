// @flow

export const getCeptorConfigParams = () => ({
  ceptorConfigParams: {
    uatpHostUrl: 'uatpHostUrl',
    uatpAirlineIdentifier: 'uatpAirlineIdentifier'
  }
});

export const getCeptorConfig = () => ({
  ceptorConfigParams: {
    uatpHostUrl: 'uatpHostUrl',
    uatpAirlineIdentifier: 'uatpAirlineIdentifier'
  },
  requestedAFPParams: {
    language: 'language',
    paymentMethodConfigParams: [{
      paymentMethod: 'paymentMethod',
      provider: 'provider',
      config: {
        clientId: 1234,
        hostUrl: 'hostUrl',
        countryId: 1,
        accountId: 1234,
        storeCard: false,
        transactionTypeId: 1,
        applePayCardTypeId: 1
      }
    }]
  },
  responseCodes: [{
    code: 1,
    message: 'message'
  }],
  validationFn: () => {}
});

export const getCeptorConfigWithAmount = (amount: number) => ({
  ...getCeptorConfig(),
  requestedAFPParams: {
    amount,
    currency: 'USD',
    language: 'language',
    paymentMethodConfigParams: [{
      paymentMethod: 'paymentMethod',
      provider: 'provider',
      config: {
        clientId: 1234,
        hostUrl: 'hostUrl',
        countryId: 1,
        accountId: 1234,
        storeCard: false,
        transactionTypeId: 1,
        applePayCardTypeId: 1
      }
    }]
  }
});

export const getCeptorConfigWithMultiplePaymentMethods = (amount: number) => ({
  ...getCeptorConfig(),
  requestedAFPParams: {
    language: 'language',
    amount,
    paymentMethodConfigParams: [{
      paymentMethod: 'paymentMethod1',
      provider: 'provider1',
      config: {
        clientId: 1234,
        hostUrl: 'hostUrl',
        countryId: 1,
        accountId: 1234,
        storeCard: false,
        transactionTypeId: 1,
        applePayCardTypeId: 1
      }
    }, {
      paymentMethod: 'paymentMethod2',
      provider: 'provider2',
      config: {
        clientId: 1234,
        hostUrl: 'hostUrl',
        countryId: 1,
        accountId: 1234,
        storeCard: false,
        transactionTypeId: 1,
        applePayCardTypeId: 1
      }
    }]
  }
});

export const getCeptorConfigWithPaymentMethodName = (paymentMethod: string) => ({
  ...getCeptorConfig(),
  requestedAFPParams: {
    language: 'language',
    paymentMethodConfigParams: [{
      paymentMethod,
      provider: 'provider1',
      config: {
        clientId: 1234,
        hostUrl: 'hostUrl',
        countryId: 1,
        accountId: 1234,
        storeCard: false,
        transactionTypeId: 1,
        applePayCardTypeId: 1
      }
    }]
  }
});

export const getCeptorConfigWithEmptyUpliftConfig = () => ({
  ...getCeptorConfig(),
  requestedAFPParams: {
    language: 'language',
    currency: 'USD',
    paymentMethodConfigParams: [{
      paymentMethod: 'PayMonthly',
      provider: 'UPLIFT',
      config: {
        checkout: true,
        container: '#iframe-container',
        shortTTT: false,
        persistenceIdentifier: 'uuid',
        tripInfo: {
          air_reservations: [{}],
          travelers: [{}],
          order_lines: []
        },
        prices: {
          'up-early-bird-check-in': {
            model: 'per_person',
            type: 'addon_option',
            value: 0
          },
          'up-trip-total': {
            model: 'total',
            type: 'total',
            value: 0
          }
        }
      }
    }]
  }
});

export const getCeptorAfpResponse = () => ([{
  AFPCode: 200,
  AFPErrorMessages: [],
  AFPStatusMessage: 'OK',
  methodAvailable: true,
  parameters: {},
  paymentMethod: 'paymentMethod',
  provider: 'provider'
}]);

export const getCeptorAfpResponseWithMultiplePaymentMethods = () => (
  [{
    AFPCode: 200,
    AFPErrorMessages: [],
    AFPStatusMessage: 'OK',
    methodAvailable: true,
    parameters: {},
    paymentMethod: 'paymentMethod1',
    provider: 'provider1'
  }, {
    AFPCode: 200,
    AFPErrorMessages: [],
    AFPStatusMessage: 'OK',
    methodAvailable: true,
    parameters: {},
    paymentMethod: 'paymentMethod2',
    provider: 'provider2'
  }]
);

export const getCeptorAfpResponseWithParameters = () => ([{
  AFPCode: 200,
  AFPErrorMessages: [],
  AFPStatusMessage: 'OK',
  methodAvailable: true,
  parameters: {
    offers: {}
  },
  paymentMethod: 'paymentMethod',
  provider: 'provider'
}]);

export const getCeptorAfpResponseWithPayMonthlyError = () => ([{
  AFPCode: '811',
  AFPErrorMessages: [],
  AFPStatusMessage: 'Uplift offer is not available',
  methodAvailable: false,
  parameters: {},
  paymentMethod: 'PayMonthly',
  provider: 'UPLIFT'
}]);

export const getCeptorCallbackResponse = () => ({
  code: '',
  statusMessage: '',
  providerResponse: {
    code: '',
    statusMessage: ''
  },
  paymentData: {
    cardNumber: '1234',
    expiryMonth: '05',
    expiryYear: '2020',
    lastFourDigits: 'Visa 1234',
    billingInfo: {
      addressLines: [
        '1234 Test Ln',
        'Apt 123'
      ],
      countryCode: 'US',
      administrativeArea: 'TX',
      postalCode: '1234',
      locality: 'Dallas',
      givenName: 'First',
      familyName: 'Last'
    }
  }
});

export const getEmptyCeptorCallbackResponse = () => ({
  code: '',
  statusMessage: '',
  paymentMethod: '',
  providerResponse: {
    code: '',
    statusMessage: ''
  }
});

export const getCeptorValidationResponse = () => ({
  paymentMethod: 'paymentMethod',
  provider: 'provider',
  validationPossible: true,
  paymentParameters: {
    addressLines: [
      '1234 Test Ln',
      'Apt 123'
    ],
    administrativeArea: 'TX',
    postalCode: '12345',
    locality: 'Dallas',
    givenName: 'First',
    familyName: 'Last',
    countryCode: 'US',
    country: 'united states'
  }
});

export const getRetrieveParamsResponseWithPaymentMethod = (paymentMethod: string) => ({
  code: 200,
  data: {
    ErrorMessages: null,
    InitialRequest: `{"AirlineIdentifier":"WN","Environment":"dev","Amount":10000.0,"Currency":"USD","CustomerEmail":null,"CustomerMobile":null,"CustomerRef":null,"Language":"us","PaymentMethodConfigParams":[{"PaymentMethod":"${paymentMethod}","Provider":"provider","Config":{"ClientId":1234,"HostUrl":"hostUrl","CountryId":1,"AccountId":1234,"StoreCard":false,"TypeId":1,"ApplePayCardTypeId":1,"Platform":"HTML","Version":1.0},"TransactionId":null}],"TransactionId":null,"TransactionOrderNo":"99999999","RequestType":"CreatePayment","UatpClientId":1,"Application":"application","Channel":"mweb","Site":"site","Country":null}`,
    Status: 'OK',
    StatusCode: 200
  },
  status: 'Received Payment Methods'
});

export const getRetrieveParamsResponseWithUplift = () => ({
  code: 200,
  data: {
    ErrorMessages: null,
    InitialRequest: '{"AirlineIdentifier":"WN","Environment":"dev","Amount":10000.0,"Currency":"USD","CustomerEmail":null,"CustomerMobile":null,"CustomerRef":null,"Language":"us","PaymentMethodConfigParams":[{"PaymentMethod":"PayMonthly","Provider":"UPLIFT","Config":{"PersistenceIdentifier":"uuid","Checkout":true,"ShortTTT":false,"TripInfo":{"travelers":[{"id":0,"first_name":"Test","last_name":"Pax"}],"air_reservations":[{"price":10000,"trip_type":"oneway","origin":"DAL","destination":"AUS","itinerary":[{"departure_apc":"DAL","departure_time":"20210315","departure_city":"Dallas","arrival_apc":"AUS","arrival_time":"20210315","arrival_city":"Austin","carrier_code":"WN","fare_class":"C"}]}],"order_lines":[]},"Prices":{"up-early-bird-check-in":{"model":"per_person","type":"addon_option","value":2000},"up-trip-total":{"model":"total","type":"total","value":10000}},"Container":"#container"},"TransactionId":null}],"TransactionId":null,"TransactionOrderNo":"99999999","RequestType":"CreatePayment","UatpClientId":1,"Application":"application","Channel":"mweb","Site":"site","Country":null}',
    Status: 'OK',
    StatusCode: 200
  },
  status: 'Received Payment Methods'
});
