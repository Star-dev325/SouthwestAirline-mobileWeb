// @flow

import React from 'react';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';

type Props = {
  onClickContinue?: (*) => void,
  onClickCancel?: (*) => void,
  acceptanceText1?: string,
  acceptanceText2?: string
};

const RepricingNavigation = (props: Props) => {
  const { onClickContinue, onClickCancel, acceptanceText1, acceptanceText2 } = props;

  return (
    <div className="bgpblue p4">
      <p className="white mb4">
        <span className="inline-block mb1">{acceptanceText1}</span>
        <span className="inline-block">{acceptanceText2}</span>
      </p>
      <Button className="continue" data-qa="continueButton" onClick={onClickContinue} color="yellow" size="large" fluid>
        {i18n('SHARED__BUTTON_TEXT__CONTINUE')}
      </Button>
      <Button className="cancel mt4" data-qa="cancelButton" onClick={onClickCancel} color="grey" size="large" fluid>
        {i18n('SHARED__BUTTON_TEXT__CANCEL')}
      </Button>
    </div>
  );
};

export default RepricingNavigation;
