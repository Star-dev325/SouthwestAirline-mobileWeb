// @flow

import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import CreditCardRadioInput from 'src/shared/components/creditCardRadioInput';
import type { PaymentSavedCreditCard } from 'src/shared/flow-typed/shared.types';
import {
  RAPID_REWARDS_VISA_ID,
  PAY_PAL_CARD_ID,
  APPLE_PAY_CARD_ID,
  UPLIFT_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import CeptorWrapper from 'src/shared/helpers/ceptorWrapper';
import { PRICE_TYPES } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import i18n from '@swa-ui/locale';

type Props = {
  creditCardInfo: PaymentSavedCreditCard,
  onClick: (string) => void,
  selected: boolean,
  showRadioButton?: boolean,
  additionalInfoMessage?: string,
  additionalInfoLink?: string,
  disabled?: boolean,
  justAdded?: boolean
};

const SavedCreditCardRadioInput = (props: Props) => {
  const {
    creditCardInfo,
    selected,
    onClick,
    showRadioButton,
    additionalInfoMessage,
    disabled,
    justAdded,
    additionalInfoLink
  } = props;
  const { savedCreditCardId, isExpired, name, lastFourDigits, type } = creditCardInfo;
  const isAdditionalInfoNeeded =
    savedCreditCardId !== RAPID_REWARDS_VISA_ID &&
    savedCreditCardId !== PAY_PAL_CARD_ID &&
    savedCreditCardId !== APPLE_PAY_CARD_ID &&
    savedCreditCardId !== UPLIFT_CARD_ID &&
    type !== 'NEW' &&
    type !== 'NEW_DISABLED' &&
    type !== 'GHOST_CARD';

  const additionalInfoRef = useRef();

  useEffect(() => {
    if (type === 'UPLIFT' && additionalInfoRef.current) {
      const addInfo = _.get(CeptorWrapper.getExtension(), 'addInfo');

      addInfo && addInfo(additionalInfoRef.current, PRICE_TYPES.UP_TRIP_TOTAL);
    }
  });

  return (
    <CreditCardRadioInput
      showRadioButton={showRadioButton}
      name={name}
      type={type}
      savedCreditCardId={savedCreditCardId}
      selected={selected}
      onClick={onClick}
      disabled={disabled}
    >
      {isAdditionalInfoNeeded && (
        <div className="flex gray5 additional-info-container">
          <div className="mr1">{i18n('AIR_BOOKING__SUMMARY_PAYMENT__SHORT_CARD_NUMBER_MESSAGE')}</div>
          <div className="bold">{lastFourDigits}</div>
          {isExpired && (
            <div className="red bold pl2" data-qa="expired-credit-card">
              {i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__EXPIRED')}
            </div>
          )}
        </div>
      )}
      {additionalInfoMessage && (
        <div className="flex additional-info-container gray5">
          <div className="mr1">{additionalInfoMessage}</div>
        </div>
      )}
      {additionalInfoLink && (
        <div className="flex medium pblue">
          <span ref={additionalInfoRef}>{additionalInfoLink}</span>
        </div>
      )}
      {justAdded && type !== 'GHOST_CARD' && (
        <div>
          <div className="small green bold mt2">{i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__JUST_ADDED')}</div>
        </div>
      )}
      {type === 'GHOST_CARD' && isExpired && (
        <div className="flex gray5 additional-info-container">
          <div className="red bold" data-qa="expired-credit-card">
            {i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__EXPIRED')}
          </div>
        </div>
      )}
      {type === 'PAYPAL' && (
        <div className="flex gray5 additional-info-container">
          <div className="mr1">{i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__BUY_NOW_OR_PAY_LATER')}</div>
        </div>
      )}
    </CreditCardRadioInput>
  );
};

export default SavedCreditCardRadioInput;
