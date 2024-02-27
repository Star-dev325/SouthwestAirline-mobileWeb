// @flow

import React from 'react';
import cx from 'classnames';

type LowFarePointerProps = {
  isInbound?: boolean
};

const LowFarePointer = ({ isInbound }: LowFarePointerProps) => {
  const leftLineClass = cx({
    'low-fare-pointer--left-line-returning': isInbound,
    'low-fare-pointer--left-line': !isInbound
  });
  const pointerLineClass = cx({
    'low-fare-pointer--center-line-returning': isInbound,
    'low-fare-pointer--center-line': !isInbound
  });

  return (
    <div className="low-fare-pointer">
      <div className="low-fare-pointer--lines">
        <div className={leftLineClass} />
      </div>
      <div className={pointerLineClass} />
    </div>
  );
};

export default LowFarePointer;
