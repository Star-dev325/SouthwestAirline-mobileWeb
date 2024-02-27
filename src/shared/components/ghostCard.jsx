// @flow
import _ from 'lodash';
import CreditCardRadioField from 'src/shared/form/fields/creditCardRadioField';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import GhostCardList from 'src/shared/components/ghostCardList';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import NavItem from 'src/shared/components/navItem';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import React from 'react';
import i18n from '@swa-ui/locale';

import type { PaymentSavedCreditCard } from 'src/shared/flow-typed/shared.types';

type Props = {
  disabled: boolean,
  ghostCards: Array<PaymentSavedCreditCard>,
  onSelectGhostCard: (creditCardId: string) => void,
  selectedCardId?: string
};

const GHOST_CARD_MODAL_ID = 'GHOST_CARD_MODAL_ID';

const GhostCard = ({ ghostCards, onSelectGhostCard, disabled, selectedCardId }: Props) => {
  const hasSelectedGhostCard = _.some(ghostCards, { savedCreditCardId: selectedCardId });
  const hasMultipleGhostCards = ghostCards && ghostCards.length > 1;
  const defaultGhostCard = { type: 'GHOST_CARD', savedCreditCardId: selectedCardId || '', isExpired: false };
  const additionalInfoMessage =
    hasSelectedGhostCard && hasMultipleGhostCards
      ? i18n('AIR_BOOKING__CORPORATE_BOOKING__TAP_TO_SELECT_A_DIFFERENT_CARD')
      : undefined;
  const ghostCardInfo = hasMultipleGhostCards
    ? _.merge({}, defaultGhostCard, {
      name: hasSelectedGhostCard ? selectedCardId : i18n('AIR_BOOKING__CORPORATE_BOOKING__SELECT_CORPORATE_CARD')
    })
    : ghostCards
      ? ghostCards[0]
      : defaultGhostCard;
  const ghostCard = (
    <CreditCardRadioField
      name="selectedCardId"
      showRadioButton={hasSelectedGhostCard || !hasMultipleGhostCards}
      additionalInfoMessage={additionalInfoMessage}
      creditCard={ghostCardInfo}
      fieldClassName="saved-credit-cards--item-field"
      disabled={disabled}
    />
  );
  const ghostCardHidden = (
    <CreditCardRadioField
      name="selectedGhostCardId"
      showRadioButton={hasSelectedGhostCard || !hasMultipleGhostCards}
      additionalInfoMessage={additionalInfoMessage}
      creditCard={ghostCardInfo}
      fieldClassName="saved-credit-cards--item-field"
      disabled
      hidden
    />
  );

  const handleGhostCardClick = () => {
    if (hasMultipleGhostCards && !disabled) {
      showFullScreenModal(GHOST_CARD_MODAL_ID);
      raiseSatelliteEvent('select corporate card');
    }
  };

  return (
    <div className="ghost-cards">
      <span className="saved-credit-cards--title">{i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__CORPORATE_CARD')}</span>
      <NavItem
        className="ghost-card-nav-item"
        onClick={handleGhostCardClick}
        noIcon={(!hasMultipleGhostCards || hasSelectedGhostCard) && !_.isEmpty(ghostCard)}
      >
        {ghostCard}
        {ghostCardHidden}
      </NavItem>
      <FullScreenModal id={GHOST_CARD_MODAL_ID}>
        <GhostCardList
          ghostCards={ghostCards}
          showSearchBar
          onCancel={() => hideFullScreenModal(GHOST_CARD_MODAL_ID)}
          onGhostCardSelect={(selectedCard) => {
            hideFullScreenModal(GHOST_CARD_MODAL_ID);
            onSelectGhostCard(selectedCard.label);
          }}
        />
      </FullScreenModal>
    </div>
  );
};

export default GhostCard;
