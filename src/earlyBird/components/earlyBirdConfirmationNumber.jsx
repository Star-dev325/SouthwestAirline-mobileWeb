// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  recordLocator: string
};

const EarlyBirdConfirmationNumber = ({ recordLocator }: Props) => (
  <div className="early-bird-receipt-info">
    <div className="early-bird-receipt-info--confirmation">
      <h4 className="early-bird-receipt-info--title">{i18n('EARLY_BIRD_CONFIRMATION_TITLE')}</h4>
      <label className="early-bird-receipt-info--number">{recordLocator}</label>
    </div>
  </div>
);

export default EarlyBirdConfirmationNumber;
