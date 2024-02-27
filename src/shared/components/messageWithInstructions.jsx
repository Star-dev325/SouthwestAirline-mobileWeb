// @flow

import React from 'react';
import cx from 'classnames';
import Message from 'src/shared/components/message';
import Container from 'src/shared/components/container';

import type { MessageStatusType } from 'src/shared/flow-typed/shared.types';

type Props = {
  title: ?string,
  status: MessageStatusType,
  className?: string,
  mainInstruction?: string,
  subInstruction?: string
};

const MessageWithInstructions = (props: Props) => {
  const { className, title, mainInstruction, subInstruction, status } = props;

  return (
    <Container className={cx('trip-booked', className)} inverted>
      <div className="trip-booked--content">
        <Message status={status} className="p0 small">
          <h3 className="xxlarge bold white inline-block">{title}</h3>
        </Message>
        <div className="mt4">
          <p className="larger white">{mainInstruction}</p>
          <p className="medium white mt2">{subInstruction}</p>
        </div>
      </div>
    </Container>
  );
};

MessageWithInstructions.defaultProps = {
  status: 'success'
};

export default MessageWithInstructions;
