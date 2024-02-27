/* eslint-disable no-console */
import { getBootstrapData } from '@swa-ui/bootstrap';
import { setJourneyBannerToggle } from 'src/shared/actions/sharedActions';
import { getErrorLogTimestamp, getLocationPathname, stringifyDetails } from 'src/shared/api/helpers/loggingHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';

export const branchListenerHelper = (store) => (event) => {
  if (event === 'didShowJourney') {
    store.dispatch(setJourneyBannerToggle(true));
  } else if (event === 'didCloseJourney') {
    store.dispatch(setJourneyBannerToggle(false));
  }
};

export const fetchBootstrapData = (bootstrapKey, defaultValue) => {
  let bootstrapData;

  try {
    bootstrapData = getBootstrapData(bootstrapKey);
  } catch (error) {
    handleBootstrapError(`Failed to load startup data: ${error.message}`, error);
  }

  return bootstrapData || defaultValue;
};

const handleBootstrapError = (message, error = {}) => {
  console.warn(message);

  sendErrorLog([
    {
      action: '',
      component: 'bootstrapHelper',
      count: 1,
      details: stringifyDetails(error.message),
      errorCode: null,
      httpCode: null,
      level: LOG_LEVEL.ERROR,
      location: getLocationPathname(),
      message,
      timestamp: getErrorLogTimestamp()
    }
  ]);
};
