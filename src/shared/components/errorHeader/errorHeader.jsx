// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';

type Props = {
  show?: boolean,
  errorMessage: string
};

const ErrorHeader = (props: Props) => (
  <div className="error-header">
    <Icon type="exclamation-circle" />
    {props.errorMessage}
  </div>
);

export default ErrorHeader;
