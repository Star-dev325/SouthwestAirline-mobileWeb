import _ from 'lodash';

const conf = global.mwebAppConfig;

const appConfig = {
  ...conf,
  userCanChangeToggles() {
    return _.get(conf, 'USER_CAN_CHANGE_TOGGLES', false);
  }
};

export default appConfig;
