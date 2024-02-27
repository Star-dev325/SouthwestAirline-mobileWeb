// @flow
import cx from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Icon from 'src/shared/components/icon';

const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;

type Props = {
  className?: string,
  icon?: string,
  onCountdownFinishCallback?: () => void,
  text: string,
  time: number
};

const CountdownTimer = (props: Props) => {
  const { className, onCountdownFinishCallback, time, text } = props;
  const [minutes, setMinutes] = useState(() => {
    if (time < 60) {
      return 0;
    }

    return parseInt(time / SECONDS_PER_MINUTE, 10);
  });
  const [seconds, setSeconds] = useState(() => {
    if (time < 60) {
      return time;
    }

    return parseInt(time % SECONDS_PER_MINUTE, 10);
  });
  const deadline = dayjs().add(time, 'Second');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const leftTime = deadline.diff(now);

      if (leftTime > 0) {
        setMinutes(Math.floor((leftTime / MILLISECONDS_PER_SECOND / SECONDS_PER_MINUTE) % 60));
        setSeconds(Math.floor((leftTime / MILLISECONDS_PER_SECOND) % 60));
      } else {
        onCountdownFinishCallback && onCountdownFinishCallback();
        clearInterval(interval);
      }
    }, MILLISECONDS_PER_SECOND);

    return () => clearInterval(interval);
  }, []);

  return !time ? null : (
    <div className={cx('countdown-timer-container', className)}>
      <Icon className="xxlarge yellow" type="home-flight-status" />
      <div className="countdown-timer-container--countdown">
        {`${minutes}:`}{seconds.toString().padStart(2, '0')}
      </div>
      <p className="pl4">{text}</p>
    </div>
  );
};

export default CountdownTimer;
