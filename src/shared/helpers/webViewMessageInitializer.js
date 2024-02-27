import { getErrorLogTimestamp, getLocationPathname } from 'src/shared/api/helpers/loggingHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';

const handleInterfaceNotReady = (messageName) => {
  sendErrorLog([
    {
      action: '',
      component: 'webViewMessageInitializer',
      count: 1,
      details: '',
      errorCode: null,
      httpCode: null,
      level: LOG_LEVEL.ERROR,
      location: getLocationPathname(),
      message: `Attempted to call ${messageName} before it's interface has been established.`,
      timestamp: getErrorLogTimestamp()
    }
  ]);
};

export default () => {
  window.api = window.api || {};
  window.api.message = handleInterfaceNotReady.bind(this, 'window.api.message');
  window.swa = window.swa || {};
  window.swa.webViewMessage = handleInterfaceNotReady.bind(this, 'window.swa.webViewMessage');
};
