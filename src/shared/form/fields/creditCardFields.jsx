// @flow

import React from 'react';
import _ from 'lodash';
import {
  NEW_CREDIT_CARD_ID,
  APPLE_PAY_CARD_ID,
  PAY_PAL_CARD_ID,
  UPLIFT_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import withFields from 'src/shared/form/enhancers/withFields';
import CreditCardRadioField from 'src/shared/form/fields/creditCardRadioField';
import ChaseInstantCreditCardFields from 'src/shared/form/fields/chaseInstantCreditCardFields';
import SavedCreditCardRadioInput from 'src/shared/components/savedCreditCardRadioInput';
import GhostCard from 'src/shared/components/ghostCard';
import { APPLE_PAY, PAYPAL, UPLIFT } from 'src/shared/constants/creditCardTypes';
import { PAYMENT_OPTION_TYPES, PAYMENT_OPTION_ORDER } from 'src/shared/constants/paymentOptionTypes';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import i18n from '@swa-ui/locale';

import type { PaymentSavedCreditCards, PaymentInfo } from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  editMode: boolean,
  hideGhostCards: boolean,
  onChange: (fieldName: string, fieldValue: *) => void,
  onClickApplePayButton?: (paymentInfo: PaymentInfo) => void,
  onClickPayPalButton?: (paymentInfo: PaymentInfo) => void,
  onClickUpliftButton?: (paymentInfo: PaymentInfo) => void,
  onSelectCreditCardCheckBox: (creditCardId: string) => void,
  onSelectGhostCard?: (creditCardId: string) => void,
  onUseNewCreditCardChange: () => void,
  savedCreditCards?: PaymentSavedCreditCards,
  selectedCreditCardId?: string,
  selectedCreditCardStatuses: string[],
  shouldDisableUplift: boolean,
  shouldShowApplePay: boolean,
  shouldShowChaseInstantCreditCard: boolean,
  shouldShowUplift: boolean,
  upliftAdditionalInfoLink?: string,
  upliftAdditionalMessaging?: string,
  upliftDisabledPlacement?: DynamicPlacementResponse
};

const newCreditCard = {
  savedCreditCardId: NEW_CREDIT_CARD_ID,
  type: 'NEW',
  name: i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__NEW_CREDIT_DEBIT_CARD')
};

const newCreditCardDisabled = {
  savedCreditCardId: NEW_CREDIT_CARD_ID,
  type: 'NEW_DISABLED',
  name: i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__NEW_CREDIT_DEBIT_CARD')
};

const payPalCard = {
  name: PAYPAL.name,
  type: PAYPAL.key,
  savedCreditCardId: PAY_PAL_CARD_ID
};

const applePayCard = {
  name: APPLE_PAY.name,
  type: APPLE_PAY.key,
  savedCreditCardId: APPLE_PAY_CARD_ID
};

const upliftCard = {
  name: UPLIFT.name,
  type: UPLIFT.key,
  savedCreditCardId: UPLIFT_CARD_ID
};

function CreditCardFields(props: Props) {
  const {
    editMode,
    hideGhostCards,
    onClickApplePayButton,
    onClickPayPalButton,
    onClickUpliftButton,
    onSelectCreditCardCheckBox,
    onSelectGhostCard,
    onUseNewCreditCardChange,
    savedCreditCards: { ghostCardRequired, ghostCards, primaryCard, otherCards } = {},
    selectedCreditCardId,
    selectedCreditCardStatuses,
    shouldDisableUplift,
    shouldShowApplePay,
    shouldShowChaseInstantCreditCard,
    shouldShowUplift,
    upliftAdditionalInfoLink,
    upliftAdditionalMessaging,
    upliftDisabledPlacement
  } = props;

  const ghostCardProps = { ghostCards, hideGhostCards: false, onSelectGhostCard, disabled: editMode, selectedCardId: selectedCreditCardId };
  const handleUpliftClick = (selectedCardId) => onClickUpliftButton && onClickUpliftButton({ selectedCardId });

  return (
    <div className="saved-credit-cards">
      {!_.isEmpty(ghostCards) && !hideGhostCards && <GhostCard {...ghostCardProps} />}
      {!ghostCardRequired && (
        <div>
          <div className="chase-instant-card">
            {shouldShowChaseInstantCreditCard && (
              <ChaseInstantCreditCardFields
                names={['selectedCardId', 'chasePhoneNumber', 'chasePhoneCountryCode']}
                editMode={editMode}
                justAdded
              />
            )}
          </div>
          {primaryCard && (
            <div className="primary-saved-credit-cards">
              <span className="saved-credit-cards--title">{i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__PRIMARY')}</span>
              <CreditCardRadioField
                name="selectedCardId"
                isChecked={_.includes(selectedCreditCardStatuses, primaryCard.savedCreditCardId)}
                editMode={editMode}
                onCheck={onSelectCreditCardCheckBox}
                creditCard={primaryCard}
                fieldClassName="saved-credit-cards--item-field"
              />
            </div>
          )}
          <div className="other-saved-credit-cards">
            <span className="saved-credit-cards--title">
              {i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__PAYMENT_OPTIONS')}
            </span>
            {PAYMENT_OPTION_ORDER &&
              _.map(PAYMENT_OPTION_ORDER, (paymentType) => {
                switch (paymentType) {
                  case PAYMENT_OPTION_TYPES.PAYPAL:
                    return (
                      <SavedCreditCardRadioInput
                        key={paymentType}
                        showRadioButton={false}
                        onClick={(selectedCardId) => onClickPayPalButton && onClickPayPalButton({ selectedCardId })}
                        selected={false}
                        creditCardInfo={payPalCard}
                        disabled={editMode}
                      />
                    );
                  case PAYMENT_OPTION_TYPES.SAVED_CREDIT_CARD:
                    return (
                      otherCards &&
                      !_.isEmpty(otherCards) &&
                      _.map(otherCards, (savedCreditCard, index: number) => (
                        <CreditCardRadioField
                          key={index}
                          name="selectedCardId"
                          isChecked={_.includes(selectedCreditCardStatuses, savedCreditCard.savedCreditCardId)}
                          editMode={editMode}
                          onCheck={onSelectCreditCardCheckBox}
                          creditCard={savedCreditCard}
                          fieldClassName="saved-credit-cards--item-field"
                        />
                      ))
                    );
                  case PAYMENT_OPTION_TYPES.APPLE_PAY:
                    return (
                      shouldShowApplePay && (
                        <SavedCreditCardRadioInput
                          key={paymentType}
                          showRadioButton={false}
                          onClick={(selectedCardId) =>
                            onClickApplePayButton && onClickApplePayButton({ selectedCardId })
                          }
                          selected={false}
                          creditCardInfo={applePayCard}
                          disabled={editMode}
                        />
                      )
                    );
                  case PAYMENT_OPTION_TYPES.UPLIFT:
                    return (
                      shouldShowUplift && (
                        <div key={paymentType}>
                          <SavedCreditCardRadioInput
                            showRadioButton={false}
                            onClick={shouldDisableUplift ? _.noop : handleUpliftClick}
                            selected={false}
                            creditCardInfo={upliftCard}
                            disabled={editMode || shouldDisableUplift}
                            additionalInfoMessage={shouldDisableUplift ? undefined : upliftAdditionalMessaging}
                            additionalInfoLink={shouldDisableUplift ? undefined : upliftAdditionalInfoLink}
                          />
                          {shouldDisableUplift && (
                            <DynamicPlacement
                              {...upliftDisabledPlacement}
                              className="uplift-dynamic-placement-container"
                            />
                          )}
                        </div>
                      )
                    );
                  case PAYMENT_OPTION_TYPES.CHASE_INSTANT_RR_VISA:
                  default:
                    break;
                }
              })}
          </div>
          <div className="new-credit-card">
            <CreditCardRadioField
              name="selectedCardId"
              disabled={editMode}
              onCheck={onSelectCreditCardCheckBox}
              onChange={onUseNewCreditCardChange}
              creditCard={editMode ? newCreditCardDisabled : newCreditCard}
              fieldClassName="saved-credit-cards--item-field"
            />
          </div>
        </div>
      )}
    </div>
  );
}

CreditCardFields.defaultProps = {
  editMode: false,
  shouldShowChaseInstantCreditCard: false,
  onClickPayPalButton: () => {},
  onClickApplePayButton: _.noop,
  shouldShowApplePay: false,
  shouldShowUplift: false,
  shouldDisableUplift: false
};

export default withFields(CreditCardFields);
