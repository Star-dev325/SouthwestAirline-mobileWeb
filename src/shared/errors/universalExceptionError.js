import { getErrorLogTimestamp, getLocationPathname, stringifyDetails } from 'src/shared/api/helpers/loggingHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';

export const handleError = (event) => {
  const details = stringifyDetails(event?.error?.stack);

  sendErrorLog([
    {
      action: '',
      component: 'UniversalExceptionResolver',
      count: 1,
      details,
      errorCode: 900000000,
      httpCode: null,
      level: LOG_LEVEL.ERROR,
      location: getLocationPathname(),
      message: event?.message || '',
      timestamp: getErrorLogTimestamp()
    }
  ]);
};

export const addUniversalErrorListener = () => {
  if (window && window.addEventListener) {
    window.addEventListener('error', handleError);
  }
};
