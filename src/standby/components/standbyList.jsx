// @flow

import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import Icon from 'src/shared/components/icon';

type StandbyItem = {
  displayName: string,
  isConfirmed: boolean,
  isPnrPassenger: boolean,
  number: string
};

type Props = {
  standbyList: Array<StandbyItem>,
  isEnhancedStandby?: boolean
};

const StandbyList = (props: Props) => {
  const renderStandbyItem = (passenger, index) => (
    <div className={cx('standby-list--item', { 'enhanced-standby-list--item': isEnhancedStandby })} key={index}>
      <div className="standby-list--item-left">
        {passenger.isConfirmed ? (
          <div className="standby-list--item-circle confirmed">
            <Icon type="check" className="confirm-check" />
          </div>
        ) : (
          <div className="standby-list--item-circle unconfirmed">
            <span className="standby-list--item-number">{passenger.number}</span>
          </div>
        )}
      </div>
      <div className="standby-list--item-right">
        <span className={cx('standby-list--item-name', { 'standby-list--item-name-pnr': passenger.isPnrPassenger })}>
          {passenger.displayName}
        </span>
        {passenger.isConfirmed && props.isEnhancedStandby && (
          <span className="standby-list--item-cleared">CLEARED</span>
        )}
      </div>
    </div>
  );

  const { standbyList, isEnhancedStandby } = props;

  return (
    <div className="standby-body--standby-list">
      {_.map(standbyList, (passenger, index: number) => renderStandbyItem(passenger, index))}
    </div>
  );
};

export default StandbyList;
