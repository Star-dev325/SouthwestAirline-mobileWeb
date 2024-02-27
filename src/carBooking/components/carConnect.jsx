// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';

type Props = {
  pickUp: string,
  dropOff: string
};

const CarConnect = (props: Props) => {
  const { pickUp, dropOff } = props;

  return (
    <div className="car-connect">
      <span className="pickup">{pickUp}</span>
      <Icon type="car" />
      <span className="dropoff">{dropOff}</span>
    </div>
  );
};

export default CarConnect;
