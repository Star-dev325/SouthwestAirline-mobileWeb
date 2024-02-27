// @flow
import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';
import SharedConstants from 'src/shared/constants/sharedConstants';

import type { LogType } from 'src/shared/flow-typed/shared.types';

const { apiErrorLogUrl, apiInfoLogUrl } = SharedConstants;

export const sendErrorLog = (errorLogInfo: Array<LogType>) => {
  try {
    return restClient
      .ajax({
        url: url.resolve(environment.logging, apiErrorLogUrl),
        body: { messages: errorLogInfo },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json'
      });
  } catch (error) {
    // Swallowing Error
  }
};

export const sendInfoLog = (infoLogData: Array<LogType>) => {
  try {
    return restClient
      .ajax({
        url: url.resolve(environment.logging, apiInfoLogUrl),
        body: { messages: infoLogData },
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json'
      });
  } catch (error) {
    // Swallowing Error
  }
};
