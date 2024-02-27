// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'src/shared/components/icon';
import DonutProgressBar from 'src/shared/components/donutProgressBar';

type Props = {
  centerIconType?: string,
  percentage: number,
  label?: string,
  desc: *,
  completed?: boolean
};

const TierStatus = (props: Props) => {
  const { completed, percentage, centerIconType, label, desc } = props;

  return (
    <div className={cx('tier-status', { 'tier-status--completed': completed })}>
      <div className="tier-status--graph">
        <DonutProgressBar percentage={percentage} offsetAngle={45} strokeWidth={10} autoFill animateFill />
        <Icon type={centerIconType ? centerIconType : 'pts'} />
      </div>
      <div className="tier-status--text">
        {label && <label className="label">{label}</label>}
        {desc && <p className="desc">{desc}</p>}
      </div>
    </div>
  );
};

export default TierStatus;
