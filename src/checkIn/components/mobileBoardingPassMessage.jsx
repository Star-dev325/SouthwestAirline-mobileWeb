// @flow

import React from 'react';

import type { GreyBoxMessage } from 'src/shared/flow-typed/shared.types';

type Props = {
  greyBoxMessage: ?GreyBoxMessage
};

const MobileBoardingPassMessage = (props: Props) => {
  const { greyBoxMessage } = props;
  const { title, header, body } = greyBoxMessage ? greyBoxMessage : {};

  return (
    <div data-qa="passenger-kiosk-message" className="center bggray2 mt4 px4 py5 gray5">
      {title && (
        <div>
          <strong>{title}</strong>
          <br />
        </div>
      )}
      {header && (
        <div>
          <strong>{header}</strong>
          <br />
        </div>
      )}
      {body}
    </div>
  );
};

export default MobileBoardingPassMessage;
