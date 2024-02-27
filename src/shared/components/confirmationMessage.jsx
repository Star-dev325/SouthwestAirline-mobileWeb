// @flow

import React from 'react';

import Message from 'src/shared/components/message';
import { possibleIconStates } from 'src/checkIn/constants/possibleIconStates';

type IconType = possibleIconStates.WARNING | possibleIconStates.SUCCESS;
type Props = {
  icon: IconType,
  body: string
};

const ConfirmationMessage = ({ icon, body }: Props) => {
  const getStatusFromIconState = (iconState) => (iconState === possibleIconStates.WARNING ? 'error' : 'success');

  return <Message status={getStatusFromIconState(icon)}>{body}</Message>;
};

export default ConfirmationMessage;
