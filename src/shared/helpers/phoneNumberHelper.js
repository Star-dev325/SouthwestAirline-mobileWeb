import _ from 'lodash';

export const parsePhoneNumber = (phone) => {
  const splitPhoneNumber = phone.split('-');

  return {
    phoneAreaCode: splitPhoneNumber[0],
    phoneExchangeNumber: splitPhoneNumber[1],
    phoneLineNumber: splitPhoneNumber[2]
  };
};

export const addHyphensToPhoneNumber = (phone) => {
  const spreadPhoneNumber = _.split(phone, '');

  spreadPhoneNumber.splice(6, 0, '-');
  spreadPhoneNumber.splice(3, 0, '-');

  return spreadPhoneNumber.join('');
};
