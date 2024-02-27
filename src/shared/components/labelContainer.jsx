// @flow
import React from 'react';
import cx from 'classnames';

import type { Node } from 'react';

type Props = {
  children?: Node,
  className?: string,
  labelText?: string,
  hideLabelText?: boolean,
  elementClasses?: {
    label?: string,
    content: string
  }
};

const LabelContainer = (props: Props) => {
  const { labelText, hideLabelText, children, className, elementClasses = { label: '', content: '' } } = props;

  return (
    <div className={cx('label-container', className)}>
      {!hideLabelText && <div className={cx('label-container--label', elementClasses.label)}>{labelText}</div>}
      <div className={cx('label-container--content', elementClasses.content)}>{children}</div>
    </div>
  );
};

export default LabelContainer;
