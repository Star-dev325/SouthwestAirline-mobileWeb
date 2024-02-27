// @flow
import React from 'react';
import dayjs from 'dayjs';

import LabelContainer from 'src/shared/components/labelContainer';

type Props = {
  dateTime: string
};

const FlightDate = ({ dateTime }: Props) => {
  const t = dayjs(dateTime);
  const formattedTripDate = t.format('MMM D');
  const dayOfWeek = t.format('dddd');

  return (
    <LabelContainer labelText="DATE" className="pdkblue">
      <div className="mt5 bold xxlarge">{formattedTripDate}</div>
      <div className="mt2">{dayOfWeek}</div>
    </LabelContainer>
  );
};

export default FlightDate;
