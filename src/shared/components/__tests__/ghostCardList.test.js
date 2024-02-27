import i18n from '@swa-ui/locale';
import React from 'react';
import GhostCardList from 'src/shared/components/ghostCardList';
import SearchableList from 'src/shared/components/searchableList';

describe('GhostCardList', () => {
  it('should return correct component', () => {
    const onSelectGhostCardStub = jest.fn();
    const onCancelStub = jest.fn();
    const ghostCards = [
      {
        savedCreditCardId: 'First Ghost Card',
        type: 'GHOST_CARD',
        name: 'First Ghost Card',
        isExpired: false
      },
      {
        savedCreditCardId: 'Second Ghost Card',
        type: 'GHOST_CARD',
        name: 'Second Ghost Card',
        isExpired: true
      }
    ];
    const isoGhostCardList = [
      {
        code: 'First Ghost Card',
        label: 'First Ghost Card',
        disabled: false,
        disabledMessage: i18n('AIR_BOOKING__CORPORATE_BOOKING__EXPIRED_SUFFIX')
      },
      {
        code: 'Second Ghost Card',
        label: 'Second Ghost Card',
        disabled: true,
        disabledMessage: i18n('AIR_BOOKING__CORPORATE_BOOKING__EXPIRED_SUFFIX')
      }
    ];
    const ghostCardListProps = {
      ghostCards,
      onGhostCardSelect: onSelectGhostCardStub,
      onCancel: onCancelStub,
      showSearchBar: true
    };

    expect(GhostCardList(ghostCardListProps)).toEqual(
      <SearchableList
        title={i18n('AIR_BOOKING__CORPORATE_BOOKING__SELECT_CORPORATE_CARD')}
        itemList={isoGhostCardList}
        onItemSelect={onSelectGhostCardStub}
        onCancel={onCancelStub}
        codeFieldName={'ghostCardName'}
        showSearchBar
        showSectionHeaders
      />
    );
  });
});
