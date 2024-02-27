// @flow
import React from 'react';
import PromoCodes from 'src/shared/components/promoCodes';
import i18n from '@swa-ui/locale';
import Button from 'src/shared/components/button';

import type { PromoCodesPageType } from 'src/myAccount/flow-typed/myAccount.types';

type Props = {
  promoCodesList: PromoCodesPageType,
  onBookFlightClick: (promoCode: string, promoType: string) => void
};

const PromoCodesList = (props: Props) => {
  const { promoCodesList, onBookFlightClick } = props;

  const activePromoCodes = promoCodesList.filter(
    (promoCode) => promoCode.expired === false && promoCode.used === false
  );
  const expiredPromoCodes = promoCodesList.filter(
    (promoCode) => promoCode.expired === true && promoCode.used === false
  );
  const usedPromoCodes = promoCodesList.filter((promoCode) => promoCode.used === true);

  const renderActivePromoCodes = () =>
    activePromoCodes.map((activePromoCode) => (
      <div
        key={`activePromoCode_${activePromoCode.promoCode}`}
        data-qa="active-promo-codes"
        className="promo-codes--item"
      >
        {<PromoCodes promoCode={activePromoCode} />}
        <Button
          size="larger"
          color="blue"
          fluid
          className="promo-codes--book-flight-button"
          onClick={() => {
            onBookFlightClick(activePromoCode.promoCode, activePromoCode.promoType);
          }}
        >
          {i18n('SHARED__PROMO_CODE__BOOK_FLIGHT_TITLE')}
        </Button>
      </div>
    ));

  const renderUsedPromoCodes = () => (
    <>
      <p className="sections">{i18n('SHARED__PROMO_CODE__USED_TITLE')}</p>
      {usedPromoCodes.map((usedPromoCode) => (
        <div key={`usedPromoCode_${usedPromoCode.promoCode}`} data-qa="used-promo-codes" className="promo-codes--item">
          {<PromoCodes promoCode={usedPromoCode} />}
        </div>
      ))}
    </>
  );

  const renderExpiredPromoCodes = () => (
    <>
      <p className="sections">{i18n('SHARED__PROMO_CODE__EXPIRED_TITLE')}</p>
      {expiredPromoCodes.map((expiredPromoCode) => (
        <div
          key={`expiredPromoCode_${expiredPromoCode.promoCode}`}
          data-qa="expired-promo-codes"
          className="promo-codes--item"
        >
          {<PromoCodes promoCode={expiredPromoCode} />}
        </div>
      ))}
    </>
  );

  return (
    <div className="promo-codes-list">
      {activePromoCodes.length > 0 && renderActivePromoCodes()}
      {usedPromoCodes.length > 0 && renderUsedPromoCodes()}
      {expiredPromoCodes.length > 0 && renderExpiredPromoCodes()}
    </div>
  );
};

export default PromoCodesList;
