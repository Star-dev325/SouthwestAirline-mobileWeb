// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

const UnavailableCarVendor = () => (
  <div className="bggray2 rdr2 flex4 p4 flex flex-main-center flex-cross-center">
    <div className="gray5">{i18n('CAR_BOOKING__RESULT__UNAVAILABLE')}</div>
  </div>
);

module.exports = UnavailableCarVendor;
