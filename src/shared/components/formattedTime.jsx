// @flow

import React from 'react';
import cx from 'classnames';
import { retrieveHourAndMinutesIgnoreTimezone } from 'src/shared/helpers/dateHelper';

type Props = {
  time: string,
  tripCardClassName?: string
};

const FormattedTime = (props: Props) => {
  const { tripCardClassName, time } = props;
  const formattedDetails = retrieveHourAndMinutesIgnoreTimezone(time);

  return (
    <div className={cx('formatted-time', tripCardClassName)}>
      {formattedDetails.time}
      <span className="formatted-time--period">{formattedDetails.period}</span>
    </div>
  );
};

export default FormattedTime;
