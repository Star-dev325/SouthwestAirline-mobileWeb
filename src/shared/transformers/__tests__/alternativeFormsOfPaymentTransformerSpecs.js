import _ from 'lodash';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';
import * as LoggingHelper from 'src/shared/api/helpers/loggingHelper';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import {
  getCeptorAfpResponse,
  getCeptorAfpResponseWithMultiplePaymentMethods,
  getCeptorAfpResponseWithParameters,
  getCeptorAfpResponseWithPayMonthlyError,
  getCeptorConfig,
  getCeptorConfigWithAmount,
  getCeptorConfigWithMultiplePaymentMethods,
  getCeptorValidationResponse,
  getRetrieveParamsResponseWithPaymentMethod,
  getRetrieveParamsResponseWithUplift
} from 'test/builders/model/ceptorBuilder';

const sinon = sandbox.create();

describe('alternativeFormsOfPaymentTransformer', () => {
  const mockLocation = '/mock/location/pathname';
  const mockTimestamp = 1234567890;
  let AlternativeFormsOfPaymentTransformer;
  let getAmountFromTotalStub;
  let getErrorLogTimestampStub;
  let getLocationPathnameStub;
  let setExtensionStub;
  let stringifyDetailsStub;

  beforeEach(() => {
    getAmountFromTotalStub = sinon.stub();
    getErrorLogTimestampStub = sinon.stub().returns(mockTimestamp);
    getLocationPathnameStub = sinon.stub().returns(mockLocation);
    setExtensionStub = sinon.stub();
    stringifyDetailsStub = sinon.spy(LoggingHelper, 'stringifyDetails');

    AlternativeFormsOfPaymentTransformer = proxyquire('src/shared/transformers/alternativeFormsOfPaymentTransformer', {
      'src/shared/api/helpers/loggingHelper': {
        getErrorLogTimestamp: getErrorLogTimestampStub,
        getLocationPathname: getLocationPathnameStub,
        stringifyDetails: stringifyDetailsStub
      },
      'src/shared/helpers/alternativeFormsOfPaymentHelper': { getAmountFromTotal: getAmountFromTotalStub },
      'src/shared/helpers/ceptorWrapper': { default: { setExtension: setExtensionStub } }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('toUpdateRequest', () => {
    it('should format the update request for a payment option', () => {
      const amount = 10000;
      const ceptorConfig = getCeptorConfigWithAmount(amount);

      const result = AlternativeFormsOfPaymentTransformer.toUpdateRequest(ceptorConfig);

      expect(result).to.deep.equal({
        paymentOptions: ceptorConfig.requestedAFPParams.paymentMethodConfigParams,
        configuration: {
          amount: 10000
        }
      });
    });

    it('should format the update request for multiple payment options', () => {
      const amount = 10000;
      const ceptorConfig = getCeptorConfigWithMultiplePaymentMethods(amount);

      const result = AlternativeFormsOfPaymentTransformer.toUpdateRequest(ceptorConfig);

      expect(result).to.deep.equal({
        paymentOptions: ceptorConfig.requestedAFPParams.paymentMethodConfigParams,
        configuration: {
          amount: 10000
        }
      });
    });

    it('should not throw an exception when config is undefined', () => {
      const result = AlternativeFormsOfPaymentTransformer.toUpdateRequest();

      expect(result.configuration.amount).to.be.undefined;
      expect(result.paymentOptions).to.be.undefined;
    });
    it('should not throw an exception when amount or paymentOptions are undefined', () => {
      const config = {
        requestedAFPParams: {}
      };
      const result = AlternativeFormsOfPaymentTransformer.toUpdateRequest(config);

      expect(result.configuration.amount).to.be.undefined;
      expect(result.paymentOptions).to.be.undefined;
    });
  });

  describe('toGetUatpCardRequest', () => {
    it('should format the getUatpCard request for a payment option', () => {
      const ceptorConfig = getCeptorConfig();
      const paymentMethod = 'paymentMethod';
      const provider = 'provider';
      const finalAmount = 10000;

      const result = AlternativeFormsOfPaymentTransformer.toGetUatpCardRequest(
        ceptorConfig,
        paymentMethod,
        finalAmount
      );

      expect(result).to.deep.equal({
        paymentMethod,
        provider,
        finalAmount
      });
    });

    it('should format the getUatpCard request when there are multiple payment options', () => {
      const ceptorConfig = getCeptorConfigWithMultiplePaymentMethods();
      const paymentMethod = 'paymentMethod2';
      const provider = 'provider2';
      const finalAmount = 10000;

      const result = AlternativeFormsOfPaymentTransformer.toGetUatpCardRequest(
        ceptorConfig,
        paymentMethod,
        finalAmount
      );

      expect(result).to.deep.equal({
        paymentMethod,
        provider,
        finalAmount
      });
    });
  });

  describe('toAfpAvailabilities', () => {
    const defaultErrorCodes = ['400'];

    it('should return afpAvailabilities for one payment method', () => {
      const ceptorAfpResponse = getCeptorAfpResponse();

      const result = AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, defaultErrorCodes);

      expect(result).to.eql([
        {
          paymentMethod: 'paymentMethod',
          isAvailable: true,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: true
        }
      ]);
    });

    it('should return afpAvailabilities for multiple payment methods', () => {
      const ceptorAfpResponse = getCeptorAfpResponseWithMultiplePaymentMethods();

      const result = AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, defaultErrorCodes);

      expect(result).to.eql([
        {
          paymentMethod: 'paymentMethod1',
          isAvailable: true,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: true
        },
        {
          paymentMethod: 'paymentMethod2',
          isAvailable: true,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: true
        }
      ]);
    });

    it('should return afpAvailabilities with initial availability when paymentMethod and provider not found', () => {
      const ceptorAfpResponse = [{ obj1: '' }, { obj2: '' }];

      const result = AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, defaultErrorCodes);

      expect(result).to.eql([
        {
          paymentMethod: '',
          isAvailable: false,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: false
        },
        {
          paymentMethod: '',
          isAvailable: false,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: false
        }
      ]);
    });

    it('should return afpAvailabilities with parameters', () => {
      const ceptorAfpResponse = getCeptorAfpResponseWithParameters();

      const result = AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, defaultErrorCodes);

      expect(result).to.eql([
        {
          paymentMethod: 'paymentMethod',
          isAvailable: true,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {
            offers: {}
          },
          shouldDisplay: true
        }
      ]);
    });

    it('should return afpAvailabilities with shouldDisplay as true if paymentMethod is PayMonthly and error code list is passed in', () => {
      const ceptorAfpResponse = getCeptorAfpResponseWithPayMonthlyError();

      const result = AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, ['811']);

      expect(result).to.eql([
        {
          paymentMethod: 'PayMonthly',
          isAvailable: false,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: true
        }
      ]);
    });

    it('should return afpAvailabilities with shouldDisplay as true if paymentMethod is PayMonthly and error code list is not passed in', () => {
      const ceptorAfpResponse = getCeptorAfpResponseWithPayMonthlyError();

      const result = AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse);

      expect(result).to.eql([
        {
          paymentMethod: 'PayMonthly',
          isAvailable: false,
          isActive: false,
          hasError: false,
          lastUpdateFailed: false,
          parameters: {},
          shouldDisplay: true
        }
      ]);
    });

    it('should set CeptorWrapper extension if paymentMethod is PayMonthly', () => {
      const ceptorAfpResponse = getCeptorAfpResponseWithParameters();
      const extension = { addInfo: _.noop };

      _.set(ceptorAfpResponse[0], 'parameters.extension', extension);
      _.set(ceptorAfpResponse[0], 'paymentMethod', 'PayMonthly');

      AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, defaultErrorCodes);

      expect(setExtensionStub).to.have.been.calledWith(extension);
    });

    it('should not set CeptorWrapper extension if paymentMethod is not PayMonthly', () => {
      const ceptorAfpResponse = getCeptorAfpResponse();
      const extension = { addInfo: _.noop };

      _.set(ceptorAfpResponse[0], 'parameters.extension', extension);

      AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, defaultErrorCodes);

      expect(setExtensionStub).to.not.have.been.called;
    });

    it('should set CeptorWrapper extension to empty object if extension undefined', () => {
      const ceptorAfpResponse = getCeptorAfpResponse();

      _.set(ceptorAfpResponse[0], 'paymentMethod', 'PayMonthly');

      AlternativeFormsOfPaymentTransformer.toAfpAvailabilities(ceptorAfpResponse, defaultErrorCodes);

      expect(setExtensionStub).to.have.been.calledWith({});
    });
  });

  describe('toPersonalInfoFormData', () => {
    let paymentParameters;

    beforeEach(() => {
      ({ paymentParameters } = getCeptorValidationResponse());
    });

    it('should return personal info form data from Ceptor paymentParameters', () => {
      const result = AlternativeFormsOfPaymentTransformer.toPersonalInfoFormData(paymentParameters);

      expect(result).to.eql({
        firstName: 'First',
        lastName: 'Last'
      });
    });

    it('should return personal info form data with undefined values for missing fields in Ceptor paymentParameters', () => {
      paymentParameters = {
        noPersonalInfo: true
      };

      const result = AlternativeFormsOfPaymentTransformer.toPersonalInfoFormData(paymentParameters);

      expect(result).to.eql({
        firstName: undefined,
        lastName: undefined
      });
    });
  });

  describe('toBillingInfoFormData', () => {
    let paymentParameters;

    beforeEach(() => {
      ({ paymentParameters } = getCeptorValidationResponse());
    });

    it('should return billing address form data from Ceptor paymentParameters', () => {
      const result = AlternativeFormsOfPaymentTransformer.toBillingInfoFormData(paymentParameters);

      expect(result).to.eql({
        addressLine1: '1234 Test Ln',
        addressLine2: 'Apt 123',
        city: 'Dallas',
        stateProvinceRegion: 'TX',
        zipOrPostalCode: '12345',
        isoCountryCode: 'US'
      });
    });

    it('should return billing address form data with undefined values for missing fields in Ceptor paymentParameters', () => {
      paymentParameters = {
        noBillingInfo: true
      };

      const result = AlternativeFormsOfPaymentTransformer.toBillingInfoFormData(paymentParameters);

      expect(result).to.eql({
        addressLine1: undefined,
        addressLine2: undefined,
        city: undefined,
        stateProvinceRegion: undefined,
        zipOrPostalCode: undefined,
        isoCountryCode: ''
      });
    });
  });

  describe('removeStateAndZipRequirementForInternationalCountries', () => {
    let billingAddressErrors;
    let isInternational;

    beforeEach(() => {
      billingAddressErrors = {
        stateProvinceRegion: {
          type: 'REQUIRED_ERROR'
        },
        zipOrPostalCode: {
          type: 'REQUIRED_ERROR'
        },
        addressLine1: {
          type: 'VALIDATION_ERROR'
        }
      };

      isInternational = true;
    });

    it('should return the initial billing address errors object if isInternational = false', () => {
      isInternational = false;
      const result = AlternativeFormsOfPaymentTransformer.removeStateAndZipRequirementForInternationalCountries(
        isInternational,
        billingAddressErrors
      );

      expect(result).to.deep.eql(billingAddressErrors);
    });

    it('should remove required errors for state and zip if isInternational = true', () => {
      const result = AlternativeFormsOfPaymentTransformer.removeStateAndZipRequirementForInternationalCountries(
        isInternational,
        billingAddressErrors
      );

      expect(result).to.deep.eql({
        addressLine1: {
          type: 'VALIDATION_ERROR'
        }
      });
    });

    it('should keep state and zip errors that are not requirement errors if isInternational = true', () => {
      billingAddressErrors = {
        stateProvinceRegion: {
          type: 'NOT_REQUIRED_ERROR'
        },
        zipOrPostalCode: {
          type: 'NOT_REQUIRED_ERROR'
        },
        addressLine1: {
          type: 'VALIDATION_ERROR'
        }
      };

      const result = AlternativeFormsOfPaymentTransformer.removeStateAndZipRequirementForInternationalCountries(
        isInternational,
        billingAddressErrors
      );

      expect(result).to.deep.eql(billingAddressErrors);
    });
  });

  describe('toCeptorValidationErrorArray', () => {
    let validationErrors;

    beforeEach(() => {
      validationErrors = {
        firstName: {
          type: 'REQUIRED_ERROR'
        },
        addressLine1: {
          type: 'Error',
          msg: 'Address line 1 validation error'
        }
      };
    });

    it('should return empty array if there are no validation errors', () => {
      validationErrors = {};
      const result = AlternativeFormsOfPaymentTransformer.toCeptorValidationErrorArray(validationErrors);

      expect(result).to.have.length(0);
    });

    it('should transform validation errors to valid array for Ceptor validation function', () => {
      const result = AlternativeFormsOfPaymentTransformer.toCeptorValidationErrorArray(validationErrors);

      expect(result).to.have.length(2);
      expect(result).to.eql([
        {
          parameter: 'givenName',
          error: 'Enter a valid first name with no special characters or numbers (spaces allowed).'
        },
        {
          parameter: 'addressLines',
          error: 'Address line 1 validation error'
        }
      ]);
    });
  });

  describe('toCeptorErrorLog', () => {
    const globalWindow = global.window;
    let ceptorCallbackResponse;
    let errorLog;

    beforeEach(() => {
      ceptorCallbackResponse = {
        code: '450',
        paymentData: {},
        paymentMethod: 'ApplePay',
        provider: 'CPD',
        providerResponse: {},
        statusMessage: 'Trying to start an Apple Pay session from an insecure document.',
        transactionOrderNo: '9334056562'
      };
      errorLog = [
        {
          action: '',
          component: 'ApplePay',
          count: 1,
          details: '{"ceptorJsError":"450","ceptorJsMessage":"Trying to start an Apple Pay session from an insecure document.","transactionOrderNo":"9334056562"}',
          errorCode: null,
          httpCode: 400,
          level: LOG_LEVEL.ERROR,
          location: mockLocation,
          message: 'CeptorJS Error',
          timestamp: mockTimestamp
        }
      ];

      global.window = {
        location: {
          pathname: mockLocation
        }
      };
    });

    afterEach(() => {
      global.window = globalWindow;
    });

    it('should format the CeptorCallbackResponse to be sent to error logs', () => {
      const result = AlternativeFormsOfPaymentTransformer.toCeptorErrorLog(
        ceptorCallbackResponse,
        PAYMENT_METHODS.APPLE_PAY
      );

      expect(result).to.be.eql(errorLog);
    });
  });

  describe('toChapiErrorLog', () => {
    const globalWindow = global.window;
    let apiError;
    let errorLog;

    beforeEach(() => {
      apiError = {
        responseJSON: {
          code: 123456789,
          message: 'chapi message',
          messageKey: 'CHAPI_MESSAGE_KEY',
          requestId: 'request id'
        },
        status: 450
      };
      errorLog = [
        {
          action: '',
          component: 'ApplePay',
          count: 1,
          details: '{"message":"chapi message","messageKey":"CHAPI_MESSAGE_KEY","requestId":"request id"}',
          errorCode: 123456789,
          httpCode: 450,
          level: LOG_LEVEL.ERROR,
          location: mockLocation,
          message: 'CHAPI Error',
          timestamp: mockTimestamp
        }
      ];

      global.window = {
        location: {
          pathname: mockLocation
        }
      };
    });

    afterEach(() => {
      global.window = globalWindow;
    });

    it('should format the CeptorCallbackResponse to be sent to error logs', () => {
      const result = AlternativeFormsOfPaymentTransformer.toChapiAfpErrorLog(apiError, PAYMENT_METHODS.APPLE_PAY);

      expect(result).to.be.eql(errorLog);
    });
  });

  describe('toRequestedAFPParams', () => {
    describe('when object does not have InitialRequest data', () => {
      it('should return undefined', () => {
        const response = {
          data: {}
        };
        const result = AlternativeFormsOfPaymentTransformer.toRequestedAFPParams(response);

        expect(result).to.eq(undefined);
      });
    });

    describe('when object does not have data', () => {
      it('should return undefined', () => {
        const response = {
          code: 500
        };
        const result = AlternativeFormsOfPaymentTransformer.toRequestedAFPParams(response);

        expect(result).to.eq(undefined);
      });
    });

    describe('with single paymentMethodConfigParam', () => {
      it('should return correct requestedAfpParams when Apple Pay', () => {
        const expectedResult = _.merge({}, getCeptorConfig().requestedAFPParams, {
          amount: 10000,
          application: 'application',
          channel: 'mweb',
          currency: 'USD',
          environment: 'dev',
          language: 'us',
          site: 'site',
          transactionOrderNo: '99999999'
        });

        _.set(expectedResult, 'paymentMethodConfigParams[0].transactionId', null);
        _.set(expectedResult, 'paymentMethodConfigParams[0].paymentMethod', PAYMENT_METHODS.APPLE_PAY);
        _.unset(expectedResult, 'paymentMethodConfigParams[0].config.storeCard');
        _.set(expectedResult, 'paymentMethodConfigParams[0].config.platform', 'HTML');
        _.set(expectedResult, 'paymentMethodConfigParams[0].config.version', 1.0);
        const result = AlternativeFormsOfPaymentTransformer.toRequestedAFPParams(
          getRetrieveParamsResponseWithPaymentMethod(PAYMENT_METHODS.APPLE_PAY)
        );

        expect(result).to.deep.eq(expectedResult);
      });

      it('should return empty object when payment method unmatched', () => {
        const result = AlternativeFormsOfPaymentTransformer.toRequestedAFPParams(
          getRetrieveParamsResponseWithPaymentMethod('randompaymentmethod')
        );

        expect(result.paymentMethodConfigParams[0]).to.deep.eq({});
      });
    });

    describe('with Uplift in paymentMethodConfigParams', () => {
      it('should return requestedAfpParams with correct uplift keys', () => {
        const expectedResult = {
          environment: 'dev',
          amount: 10000.0,
          currency: 'USD',
          language: 'us',
          paymentMethodConfigParams: [
            {
              paymentMethod: 'PayMonthly',
              provider: 'UPLIFT',
              config: {
                persistenceIdentifier: 'uuid',
                checkout: true,
                shortTTT: false,
                tripInfo: {
                  travelers: [
                    {
                      id: 0,
                      first_name: 'Test',
                      last_name: 'Pax'
                    }
                  ],
                  air_reservations: [
                    {
                      price: 10000,
                      trip_type: 'oneway',
                      origin: 'DAL',
                      destination: 'AUS',
                      itinerary: [
                        {
                          departure_apc: 'DAL',
                          departure_time: '20210315',
                          departure_city: 'Dallas',
                          arrival_apc: 'AUS',
                          arrival_time: '20210315',
                          arrival_city: 'Austin',
                          carrier_code: 'WN',
                          fare_class: 'C'
                        }
                      ]
                    }
                  ],
                  order_lines: []
                },
                prices: {
                  'up-early-bird-check-in': {
                    model: 'per_person',
                    type: 'addon_option',
                    value: 2000
                  },
                  'up-trip-total': {
                    model: 'total',
                    type: 'total',
                    value: 10000
                  }
                },
                container: '#container'
              }
            }
          ],
          transactionOrderNo: '99999999',
          application: 'application',
          channel: 'mweb',
          site: 'site'
        };
        const result = AlternativeFormsOfPaymentTransformer.toRequestedAFPParams(getRetrieveParamsResponseWithUplift());

        expect(result).to.deep.eq(expectedResult);
      });
    });
  });

  describe('toInfoLog', () => {
    const globalWindow = global.window;
    let infoData;
    let infoLog;

    beforeEach(() => {
      infoData = {
        amount: 10000,
        applicationType: 'air/booking',
        isApplePayErrorCode: true,
        paymentMethod: 'ApplePay'
      };
      infoLog = [
        {
          action: '',
          component: 'ApplePay',
          count: 1,
          details: '{"amount":10000,"applicationType":"air/booking","isApplePayErrorCode":true,"paymentMethod":"ApplePay"}',
          errorCode: null,
          httpCode: 200,
          level: LOG_LEVEL.INFO,
          location: mockLocation,
          message: 'INFO',
          timestamp: mockTimestamp
        }
      ];

      global.window = {
        location: {
          pathname: mockLocation
        }
      };
    });

    afterEach(() => {
      global.window = globalWindow;
    });

    it('should format the info log calls to be sent to the log file', () => {
      const result = AlternativeFormsOfPaymentTransformer.toInfoLog(infoData);

      expect(result).to.be.eql(infoLog);
    });
  });
});
