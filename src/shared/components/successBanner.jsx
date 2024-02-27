// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';

type Props = {
  message: ?string
};

const SuccessBanner = (props: Props) => {
  const { message } = props;

  return (
    !!message && (
      <div className="success-banner" data-qa="success-banner">
        <Icon className="icon_check-circle" type="check-circle" />
        <div className="success-banner--message" data-qa="success-banner--message">
          {message}
        </div>
      </div>
    )
  );
};

export default SuccessBanner;
