import _ from 'lodash';
import { AIR_CHANGE_ARD_CODE } from 'src/airChange/constants/airChangeConstants';
import ArdErrorMessages from 'src/airChange/constants/ardErrorMessages';

const { TITLE, MESSAGE } = ArdErrorMessages;

export default {
  isARD(errorResponse) {
    return _.get(errorResponse, 'responseJSON.code') === AIR_CHANGE_ARD_CODE;
  },
  transformARDError(errorResponse) {
    return _.merge(errorResponse, {
      responseJSON: {
        title: TITLE,
        message: MESSAGE
      }
    });
  }
};
