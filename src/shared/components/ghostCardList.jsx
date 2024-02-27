// @flow
import _ from 'lodash';
import React from 'react';
import SearchableList from 'src/shared/components/searchableList';

import type { PaymentSavedCreditCard } from 'src/shared/flow-typed/shared.types';
import i18n from '@swa-ui/locale';

type Props = {
  ghostCards: Array<PaymentSavedCreditCard>,
  onGhostCardSelect: (*) => void,
  onCancel: () => void,
  showSearchBar: boolean
};

const GhostCardList = ({ ghostCards, onGhostCardSelect, onCancel, showSearchBar }: Props) => {
  const isoGhostCardList = _.map(ghostCards, (ghostCard) => ({
    label: ghostCard.savedCreditCardId,
    code: ghostCard.savedCreditCardId,
    disabled: ghostCard.isExpired,
    disabledMessage: i18n('AIR_BOOKING__CORPORATE_BOOKING__EXPIRED_SUFFIX')
  }));

  return (
    <SearchableList
      title={i18n('AIR_BOOKING__CORPORATE_BOOKING__SELECT_CORPORATE_CARD')}
      itemList={isoGhostCardList}
      onItemSelect={onGhostCardSelect}
      onCancel={onCancel}
      codeFieldName={'ghostCardName'}
      showSearchBar={showSearchBar}
      showSectionHeaders
    />
  );
};

export default GhostCardList;
