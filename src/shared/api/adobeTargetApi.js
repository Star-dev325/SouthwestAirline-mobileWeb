// @flow
import _ from 'lodash';
import { getErrorLogTimestamp, getLocationPathname, stringifyDetails } from 'src/shared/api/helpers/loggingHelper';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { LOG_LEVEL } from 'src/shared/constants/logLevelConstants';

import type { AdobeTargetConfig, AdobeTargetParams, AdobeTargetResponse } from 'src/shared/flow-typed/shared.types';

declare var adobe: {
  target: {
    getOffer: ({
      mbox: string,
      params: AdobeTargetParams,
      success: (AdobeTargetResponse) => void,
      error: (string, string) => void,
      timeout: number
    }) => void,
    getOffers: ({
      request: {
        execute: {
          mboxes: Array<{
            index: number,
            name: string,
            params?: AdobeTargetParams
          }>
        }
      },
      timeout: number
    }) => *
  }
};

export const getOffer = (
  mbox: string,
  params: AdobeTargetParams,
  timeout: number = 5000
): Promise<AdobeTargetResponse> =>
  new Promise((resolve, reject) => {
    if (typeof adobe === 'undefined') {
      reject({});
    }

    adobe.target.getOffer({
      mbox,
      params,
      timeout,
      success: (response) => resolve(response),
      error: (status, error) => {
        sendErrorLog([
          {
            action: '',
            component: 'getOffer',
            count: 1,
            details: stringifyDetails(error),
            errorCode: null,
            httpCode: null,
            level: LOG_LEVEL.ERROR,
            location: getLocationPathname(),
            message: `Failed to get offer for ${mbox} with a status of ${status}`,
            timestamp: getErrorLogTimestamp()
          }
        ]);
        reject({ status, error });
      }
    });
  });

export const getOffers = (options: AdobeTargetConfig, timeout: number = 5000): Promise<AdobeTargetResponse> =>
  new Promise((resolve, reject) => {
    if (typeof adobe === 'undefined') {
      reject({});
    }

    const mboxes = _.map(options, (option, index: number) => ({
      index,
      name: option.mbox,
      parameters: option.params || {}
    }));

    adobe.target
      .getOffers({
        request: {
          execute: {
            mboxes
          }
        },
        timeout
      })
      .then((response) => resolve(response))
      .catch((status: string) => {
        sendErrorLog([
          {
            action: '',
            component: 'getOffers',
            count: 1,
            details: stringifyDetails(status),
            errorCode: null,
            httpCode: null,
            level: LOG_LEVEL.ERROR,
            location: getLocationPathname(),
            message: `Failed to get offers for ${mboxes
              .map((item) => item.name)
              .join(', ')} with a status of ${status}`,
            timestamp: getErrorLogTimestamp()
          }
        ]);
        reject({ status });
      });
  });
