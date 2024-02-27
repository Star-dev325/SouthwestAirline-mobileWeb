import _ from 'lodash';

export const DOMESTIC_OPTIONS = {
  TEXT: 'Text',
  CALL: 'Call',
  EMAIL: 'Email'
};

export const INTERNATIONAL_OPTIONS = _.omit(DOMESTIC_OPTIONS, 'CALL');

export const LANGUAGES = {
  EN: 'English',
  ES: 'Spanish'
};

export const CONTACT_METHODS = {
  TEXT: 'TEXT',
  CALL: 'CALL',
  MAIL: 'MAIL',
  EMAIL: 'EMAIL'
};

export const TRAVEL_MANAGER_OPTIONS = {
  CALL_ME: 'Phone',
  EMAIL_ME: 'Email'
};
