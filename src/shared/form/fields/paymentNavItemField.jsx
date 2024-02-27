// @flow

import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React from 'react';
import NavItemLink from 'src/shared/components/navItemLink';
import SavedCreditCardRadioInput from 'src/shared/components/savedCreditCardRadioInput';
import { RAPID_REWARDS_VISA_ID } from 'src/shared/constants/creditCardConstants';
import type { PaymentSavedCreditCards } from 'src/shared/flow-typed/shared.types';
import withField from 'src/shared/form/enhancers/withField';
import type { FieldProps } from 'src/shared/form/flow-typed/form.types';
import { formatCreditCardPresentInfo } from 'src/shared/helpers/creditCardInfoFormatter';
import { noop } from 'src/shared/helpers/jsUtils';

type Props = FieldProps & {
  additionalInfoMessage?: string,
  additionalInfoLink?: string,
  navItemFieldClassName?: string | null,
  onNavItemClick: () => void,
  savedCreditCards: PaymentSavedCreditCards,
  showPaymentInfoOnFile?: boolean
};

const PaymentNavItemField = (props: Props) => {
  const {
    additionalInfoLink,
    additionalInfoMessage,
    error,
    navItemFieldClassName,
    onNavItemClick,
    savedCreditCards,
    showPaymentInfoOnFile,
    value
  } = props;
  const selectedPaymentInfo = formatCreditCardPresentInfo(value, savedCreditCards);
  const isInstantRapidRewardsCredit = selectedPaymentInfo.savedCreditCardId === RAPID_REWARDS_VISA_ID;
  const { ghostCards } = savedCreditCards;
  const paymentOnfileInfo = {
    isExpired: ghostCards?.[0]?.isExpired || false,
    name: i18n('AIR_BOOKING__CORPORATE_BOOKING__PAYMENT_INFORMATION_ON_FILE'),
    savedCreditCardId: ghostCards?.[0]?.savedCreditCardId || '',
    type: 'GHOST_CARD'
  };

  const _renderPaymentInfo = (creditCardInfoValue) => (
    <div className="primary-saved-credit-cards" data-qa="review-form--payment-card">
      <SavedCreditCardRadioInput
        additionalInfoLink={additionalInfoLink}
        additionalInfoMessage={additionalInfoMessage}
        creditCardInfo={creditCardInfoValue}
        justAdded={isInstantRapidRewardsCredit}
        onClick={noop}
        selected
        showRadioButton={false}
      />
    </div>
  );

  const noSelectedCreditCard = _.isEmpty(selectedPaymentInfo);

  return (
    <div className={cx('payment-nav-item-field', navItemFieldClassName)} data-qa="review-form--payment-method-nav-item">
      {!noSelectedCreditCard && !showPaymentInfoOnFile && (
        <NavItemLink
          className={cx({ error: !_.isEmpty(error) }, 'no-padding')}
          icon={'keyboard-arrow-right'}
          iconClassName={'nav-item-link--icon'}
          onClick={onNavItemClick}
        >
          {_renderPaymentInfo(selectedPaymentInfo)}
        </NavItemLink>
      )}
      {noSelectedCreditCard && !showPaymentInfoOnFile && (
        <NavItemLink
          className={cx({ error: !_.isEmpty(error) })}
          icon={'exclamation-circle warning'}
          iconClassName={'nav-item-link--bang-icon'}
          onClick={onNavItemClick}
        >
          {<span>{i18n('AIR_CHANGE__PRICE_DIFFERENCE__ADD_CREDIT_CARD')}</span>}
        </NavItemLink>
      )}
      {showPaymentInfoOnFile && (
        <NavItemLink
          className={cx({ error: !_.isEmpty(error) }, 'no-padding')}
          icon={''}
          onClick={noop}
        >
          {_renderPaymentInfo(paymentOnfileInfo)}
        </NavItemLink>
      )}
    </div>
  );
};

export default withField()(PaymentNavItemField);
