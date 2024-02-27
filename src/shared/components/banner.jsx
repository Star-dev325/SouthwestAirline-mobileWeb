// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import { flightStatusCssClassMapping } from 'src/flightStatus/constants/flightStatusCssClassMapping';

type Props = {
  text: string,
  className?: string,
  type?: string,
  boardingTime?: string
};

const Banner = ({ text, className, type, boardingTime }: Props) => {
  const bannerTypeStyle = `banner_${flightStatusCssClassMapping[type]}`;

  return (
    <div
      className={cx('banner', {
        [_.toString(bannerTypeStyle)]: !!type,
        [_.toString(className)]: !!className
      })}
    >
      <div className="banner-name">{text}</div>
      {boardingTime && <div className="boarding-time">{boardingTime}</div>}
    </div>
  );
};

export default Banner;
