// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import cx from 'classnames';

import type { MessageStatusType } from 'src/shared/flow-typed/shared.types';
import type { Node } from 'react';

const iconMap = {
  success: 'check',
  error: 'exclamation',
  information: 'ic-info'
};

type Props = {
  status?: MessageStatusType,
  className?: string,
  size?: string,
  children?: Node
};

const Message = (props: Props) => {
  const { className, status, size, children } = props;
  const classes = {};

  className && (classes[className] = true);
  status && (classes[status] = true);
  size && (classes[size] = size);

  return (
    <div className={cx('swa-message', classes)}>
      <span className="icon-container">{status && <Icon type={iconMap[status]} />}</span>
      <span className="message--text">{children}</span>
    </div>
  );
};

export default Message;
