// @flow
import _ from 'lodash';
import { getErrorLogTimestamp, getLocationPathname, stringifyDetails } from 'src/shared/api/helpers/loggingHelper';
import {
  DEFAULT_ERROR_AFP_CODES_TO_DISPLAY,
  INITIAL_AVAILABILITY,
  PAYMENT_METHODS,
  validationTransformer
} from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import StatusErrorText from 'src/shared/constants/errStatusText';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import { REQUIRED_ERROR } from 'src/shared/form/constants/validationErrorTypes';
import CeptorWrapper from 'src/shared/helpers/ceptorWrapper';

import type {
  ApiErrorType,
  CeptorAfpResponse,
  CeptorBillingInfo,
  CeptorCallbackResponse,
  CeptorConfigWithAmount,
  CeptorRetrieveParamsResponse
} from 'src/shared/flow-typed/shared.types';

const { CEPTORJS_ERROR, CHAPI_ERROR } = StatusErrorText;

export const toUpdateRequest = (config: CeptorConfigWithAmount) => {
  const ceptorConfigObj = _.cloneDeep(config);
  const { requestedAFPParams: { amount, paymentMethodConfigParams } = {} } = ceptorConfigObj || {};
  const configuration = { amount };

  return { paymentOptions: paymentMethodConfigParams, configuration };
};

export const toGetUatpCardRequest = (config: CeptorConfigWithAmount, paymentMethod: string, finalAmount: number) => {
  const { requestedAFPParams } = config || {};
  const { paymentMethodConfigParams } = requestedAFPParams || {};

  const requestedMethod = _.find(paymentMethodConfigParams, (param) => param.paymentMethod === paymentMethod);

  return { ..._.pick(requestedMethod, ['paymentMethod', 'provider']), finalAmount };
};

export const toAfpAvailabilities = (
  response: CeptorAfpResponse,
  errorAfpCodesToDisplay: Array<*> = DEFAULT_ERROR_AFP_CODES_TO_DISPLAY
) =>
  _.map(response, (method) => {
    const paymentMethod = _.get(method, 'paymentMethod', INITIAL_AVAILABILITY.paymentMethod);
    const methodAvailable = _.get(method, 'methodAvailable', INITIAL_AVAILABILITY.isAvailable);
    const shouldDisplay =
      paymentMethod === PAYMENT_METHODS.UPLIFT
        ? methodAvailable || errorAfpCodesToDisplay.includes(method.AFPCode)
        : methodAvailable;

    const parameters = _.get(method, 'parameters', INITIAL_AVAILABILITY.parameters);

    if (paymentMethod === PAYMENT_METHODS.UPLIFT) {
      CeptorWrapper.setExtension(_.get(parameters, 'extension', {}));
    }

    return {
      paymentMethod,
      isAvailable: methodAvailable,
      isActive: INITIAL_AVAILABILITY.isActive,
      hasError: INITIAL_AVAILABILITY.hasError,
      lastUpdateFailed: INITIAL_AVAILABILITY.lastUpdateFailed,
      parameters,
      shouldDisplay
    };
  });

export const toPersonalInfoFormData = (response: CeptorBillingInfo) => ({
  firstName: getValueFromCeptorResponse(response, 'firstName'),
  lastName: getValueFromCeptorResponse(response, 'lastName')
});

export const toBillingInfoFormData = (response: CeptorBillingInfo) => ({
  addressLine1: _.get(response, 'addressLines[0]'),
  addressLine2: _.get(response, 'addressLines[1]'),
  city: getValueFromCeptorResponse(response, 'city'),
  stateProvinceRegion: getValueFromCeptorResponse(response, 'stateProvinceRegion'),
  zipOrPostalCode: getValueFromCeptorResponse(response, 'zipOrPostalCode'),
  isoCountryCode: _.toUpper(getValueFromCeptorResponse(response, 'isoCountryCode'))
});

const getValueFromCeptorResponse = (response: CeptorBillingInfo, parameter: string) => {
  const ceptorParam = _.get(validationTransformer, `${parameter}.ceptorParam`);

  return _.get(response, ceptorParam);
};

export const toCeptorValidationErrorArray = (validationErrors: *) => {
  const errors = _.map(validationErrors, (error: *, param: string) => {
    const { type, msg } = error || {};
    const { ceptorParam, requiredErrorMessage } = _.get(validationTransformer, `${param}`, {});

    return ceptorParam
      ? {
        parameter: ceptorParam,
        error: type === REQUIRED_ERROR ? requiredErrorMessage : msg
      }
      : null;
  });

  return _.compact(errors);
};

export const removeStateAndZipRequirementForInternationalCountries = (
  isInternational: boolean,
  billingAddressErrors: *
) => {
  if (!isInternational) {
    return billingAddressErrors;
  }

  return _.omitBy(billingAddressErrors, (error: *, param: string) => {
    const { type } = error || {};
    const isRequiredError = type === REQUIRED_ERROR;
    const isStateOrZip = param === 'stateProvinceRegion' || param === 'zipOrPostalCode';

    return isRequiredError && isStateOrZip;
  });
};

export const toCeptorErrorLog = (error: CeptorCallbackResponse, paymentMethod: string) => {
  const details = {
    ceptorJsError: _.toString(_.get(error, 'code')),
    ceptorJsMessage: _.get(error, 'statusMessage'),
    transactionOrderNo: _.get(error, 'transactionOrderNo')
  };
  const httpCode = 400;

  return toAfpLog(CEPTORJS_ERROR, stringifyDetails(details), httpCode, paymentMethod, null, LOG_LEVEL.ERROR);
};

export const toChapiAfpErrorLog = (error: ApiErrorType, paymentMethod: string) => {
  const details = {
    message: _.get(error, 'responseJSON.message'),
    messageKey: _.get(error, 'responseJSON.messageKey'),
    requestId: _.get(error, 'responseJSON.requestId')
  };
  const errorCode = _.get(error, 'responseJSON.code');
  const httpCode = _.get(error, 'status', 400);

  return toAfpLog(CHAPI_ERROR, stringifyDetails(details), httpCode, paymentMethod, errorCode, LOG_LEVEL.ERROR);
};

export const toInfoLog = (info: Object) => 
  toAfpLog(LOG_LEVEL.INFO, stringifyDetails(info), 200, info?.paymentMethod, null, LOG_LEVEL.INFO);

const toAfpLog = (
  message: string,
  details: string,
  httpCode: number,
  paymentMethod: string | '',
  errorCode: number | null,
  level: string
) => [{
  action: '',
  component: paymentMethod,
  count: 1,
  details,
  errorCode: errorCode || null,
  httpCode: httpCode || null,
  level,
  location: getLocationPathname(),
  message,
  timestamp: getErrorLogTimestamp()
}];

export const toRequestedAFPParams = (response: CeptorRetrieveParamsResponse) => {
  const initialRequestString = _.get(response, 'data.InitialRequest');

  if (!initialRequestString) {
    return;
  }
  const initialRequest = JSON.parse(initialRequestString);

  return {
    amount: initialRequest.Amount,
    application: initialRequest.Application,
    channel: initialRequest.Channel,
    currency: initialRequest.Currency,
    environment: initialRequest.Environment,
    language: initialRequest.Language,
    site: initialRequest.Site,
    transactionOrderNo: initialRequest.TransactionOrderNo,
    paymentMethodConfigParams: _.map(initialRequest.PaymentMethodConfigParams, (param) => {
      const config = _.get(param, 'Config', {});

      switch (param.PaymentMethod) {
        case PAYMENT_METHODS.UPLIFT: {
          return {
            paymentMethod: param.PaymentMethod,
            provider: param.Provider,
            config: {
              checkout: config.Checkout,
              container: config.Container,
              persistenceIdentifier: config.PersistenceIdentifier,
              prices: config.Prices,
              shortTTT: config.ShortTTT,
              tripInfo: config.TripInfo
            }
          };
        }
        case PAYMENT_METHODS.APPLE_PAY: {
          return {
            paymentMethod: param.PaymentMethod,
            provider: param.Provider,
            config: {
              clientId: config.ClientId,
              hostUrl: config.HostUrl,
              countryId: config.CountryId,
              accountId: config.AccountId,
              transactionTypeId: config.TypeId,
              applePayCardTypeId: config.ApplePayCardTypeId,
              platform: config.Platform,
              version: config.Version
            },
            transactionId: param.TransactionId
          };
        }
        default:
          return {};
      }
    })
  };
};
