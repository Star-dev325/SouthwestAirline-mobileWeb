// @flow
import React from 'react';
import cx from 'classnames';

type Props = {
  title: string,
  companionComponent?: ?boolean
};

const CancellationTitle = ({ title, companionComponent }: Props) => (
  <div
    className={cx('gray5 bold large pt5', {
      px5: !companionComponent
    })}
  >
    <label>{title}</label>
  </div>
);

export default CancellationTitle;
