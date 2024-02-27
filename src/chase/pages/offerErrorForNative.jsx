// @flow

import _ from 'lodash';
import React from 'react';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import i18n from '@swa-ui/locale';

export const OfferErrorForNative = () => (
  <div className="mt7">
    <MessageWithInstructions
      status="error"
      title={i18n('CHASE_NATIVE_ERROR_TITLE')}
      mainInstruction={i18n('CHASE_NATIVE_ERROR_INSTRUCTION_MAIN')}
    />
  </div>
);

const enhancers = _.flowRight(withBodyClass('bgpdkblue'), withHideLoginButton);

export default enhancers(OfferErrorForNative);
