// @flow
import React from 'react';
import cx from 'classnames';
import i18n from '@swa-ui/locale';

type Props = {
  dark?: boolean
};

const AircraftTypeFooter = (props: Props) => {
  const { dark } = props;

  return (
    <div
      className={cx('aircraft-type-footer', {
        'aircraft-type-footer': !dark,
        'aircraft-footer-dark': dark
      })}
    >
      <span>{i18n('SHARED__AIRCRAFT_TYPE_FOOTER__DESCRIPTION')}</span>
    </div>
  );
};

export default AircraftTypeFooter;
