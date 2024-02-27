// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

type Props = {
  min?: number,
  now: number,
  max?: number,
  isChild?: boolean,
  label?: string,
  bsClass?: string,
  srOnly?: boolean,
  className?: string
};

const ProgressBar = (props: Props) => {
  const { min = 0, now, max = 100, isChild, label, bsClass = 'progress-bar', srOnly, className } = props;
  const restProps = _.omit(props, ['now', 'bsClass', 'srOnly']);

  const _getPercentage = (value: number, minimum: number, maximum: number) =>
    Math.ceil(((value - minimum) / (maximum - minimum)) * 100);

  const _renderScreenReaderOnlyLabel = (value: ?string) => <span className="sr-only">{value}</span>;

  const _renderProgressBar = () => {
    const percentage = _getPercentage(now, min, max);

    return (
      <div
        {...restProps}
        className={cx(className, bsClass)}
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={now}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {srOnly ? _renderScreenReaderOnlyLabel(label) : label}
      </div>
    );
  };

  if (!isChild) {
    return (
      <div {...restProps} className={cx(className, { progress: true })}>
        {_renderProgressBar()}
      </div>
    );
  } else {
    return _renderProgressBar();
  }
};

export default ProgressBar;
