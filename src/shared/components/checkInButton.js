// @flow

import React from 'react';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';

type Props = {
  onClick: () => void
};

const CheckInButton = (props: Props) => (
  <Button size="larger" color="yellow" fluid {...props} onClick={props.onClick}>
    {i18n('SHARED__BUTTON_TEXT__CHECK_IN')}
  </Button>
);

export default CheckInButton;
