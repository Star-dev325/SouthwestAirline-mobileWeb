// @flow
import dayjs from 'dayjs';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';
import BrowserObject from 'src/shared/helpers/browserObject';

import type { AdapterErrorType, ErrorLevel } from 'src/shared/flow-typed/shared.types';

export const getErrorLogTimestamp = () => dayjs().unix();

export const getLocationPathname = () => {
  const { location } = BrowserObject;

  return location?.pathname || 'MWEB';
};

export const stringifyDetails = (details: *) => {
  let stringifiedDetails;

  try {
    stringifiedDetails = JSON.stringify(details) || '';
  } catch (error) {
    stringifiedDetails = JSON.stringify(error?.stack);
  }

  return stringifiedDetails;
};

const getErrorLogDetails = (
  level: ErrorLevel,
  message: string = '',
  component: string = '',
  error: AdapterErrorType = {}
) => {
  const { stack, status = null, statusText, url = '' } = error;
  const details = {
    stack,
    statusText
  };

  return {
    action: url,
    component,
    count: 1,
    details: stringifyDetails(details),
    errorCode: null,
    httpCode: status,
    level,
    location: getLocationPathname(),
    message,
    timestamp: getErrorLogTimestamp()
  };
};

export const encryptionProviderLoggerAdapter = {
  error(message: string, component: string, error: AdapterErrorType) {
    sendErrorLog([getErrorLogDetails(LOG_LEVEL.ERROR, message, component, error)]);
  },
  warn(message: string, component: string, error: AdapterErrorType) {
    sendErrorLog([getErrorLogDetails(LOG_LEVEL.WARN, message, component, error)]);
  }
};
