// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';

type Props = {
  from: ?string,
  to: ?string
};

const FlightsConnect = (props: Props) => {
  const { from, to } = props;

  return (
    <div className="flights-connect">
      <span className="origin">{from}</span>
      <Icon type="airplane" />
      <span className="destination">{to}</span>
    </div>
  );
};

export default FlightsConnect;
