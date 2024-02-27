import React from 'react';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';

const RegisteredMark = () => (
  <span className="registered-mark">
    <Icon type="check-circle" />
    <span className="registered-mark--text">{i18n('MY_ACCOUNT__REGISTERED_MARK__REGISTERED')}</span>
  </span>
);

export default RegisteredMark;
