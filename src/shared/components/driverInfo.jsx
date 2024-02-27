// @flow
import React from 'react';
import cx from 'classnames';
import LabelContainer from 'src/shared/components/labelContainer';
import i18n from '@swa-ui/locale';

const CONFIRMATION_NUMBER = i18n('CAR_BOOKING__CAR_RESERVATION__CONFIRMATION_NUMBER');
const DRIVER = i18n('CAR_BOOKING__CAR_RESERVATION__DRIVER');

export type DriverProps = {
  confirmationNumber: string,
  driver: {
    firstName: string,
    lastName: string
  }
};

type Props = {
  className?: string
} & DriverProps;

const DriverInfo = (props: Props) => {
  const { className, driver, confirmationNumber } = props;

  return (
    <div className={cx('py4', className)}>
      <div className="my4">
        <LabelContainer elementClasses={{ content: 'm0' }} className="large" labelText={DRIVER}>
          <span data-qa="driverName" className="xlarge">
            {`${driver.firstName} ${driver.lastName}`}
          </span>
        </LabelContainer>
      </div>
      <div className="my4">
        <LabelContainer elementClasses={{ content: 'm0' }} className="large" labelText={CONFIRMATION_NUMBER}>
          <span data-qa="confirmationNumber" className="xlarge">
            {confirmationNumber}
          </span>
        </LabelContainer>
      </div>
    </div>
  );
};

export default DriverInfo;
