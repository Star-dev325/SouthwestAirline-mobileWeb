// @flow
import React from 'react';

import i18n from '@swa-ui/locale';
import CreditCardImage from 'src/shared/components/creditCardImage';
import ContentLink from 'src/shared/components/contentLink';
import cx from 'classnames';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

import type { PromoCodesType } from 'src/myAccount/flow-typed/myAccount.types';

type Props = {
  promoCode: PromoCodesType
};

const PROMO_CODES_MODAL_ID = 'PROMO_CODES_MODAL_ID';

const PromoCodes = (props: Props) => {
  const { promoCode } = props;

  const isPromoCodeActive = promoCode.used === false && promoCode.expired === false;

  const termsAndConditionsModalId = `${PROMO_CODES_MODAL_ID}_${promoCode.promoCode}`;

  const renderTermsAndConditions = (activePromoCode) => (
    <>
      <ContentLink className="promo-codes-terms-link" onClick={() => showFullScreenModal(termsAndConditionsModalId)}>
        {i18n('SHARED__PROMO_CODES__TERMS_AND_CONDITIONS')}
      </ContentLink>
      <FullScreenModal id={termsAndConditionsModalId}>
        <PageHeaderWithButtons
          title={i18n('SHARED__PROMO_CODES__TERMS_AND_CONDITIONS')}
          className="large"
          rightButtons={[
            {
              name: i18n('SHARED__BUTTON_TEXT__CANCEL'),
              className: 'cancel',
              onClick: () => {
                hideFullScreenModal(termsAndConditionsModalId);
              }
            }
          ]}
        />
        <div className="promo-codes--modal" dangerouslySetInnerHTML={{ __html: activePromoCode.termsAndConditions }} />
      </FullScreenModal>
    </>
  );

  const renderInfoContainer = () => (
    <>
      <div className="additional-info-container">{promoCode.expirationDateString}</div>
      <div className="promo-code-description">{promoCode.description}</div>
      {renderTermsAndConditions(promoCode)}
    </>
  );

  const renderUsedAndExpiredDates = () => (
    <div className="row promo-code-expired">
      {promoCode.used === true && i18n('SHARED__PROMO_CODE__USED')}
      {promoCode.expired === true && (
        <div className="date-section">
          {i18n('SHARED__PROMO_CODE__EXPIRED')} {promoCode.expirationDateString}
        </div>
      )}
    </div>
  );

  const promoCodesClassName = cx({
    'promo-codes--title': true,
    'row--col': true,
    'active-promo-code': isPromoCodeActive,
    'used-promo-code': !isPromoCodeActive
  });

  const promoCodesPromotion = cx({
    'promo-codes--discount': true,
    'row--col': true,
    'active-discount': isPromoCodeActive,
    'used-expired-discount': !isPromoCodeActive
  });

  const cardType = `${promoCode.promoType.toUpperCase()}${isPromoCodeActive ? '' : '_INACTIVE'}`;

  return (
    <div className="promo-codes--outer-container">
      <CreditCardImage cardType={cardType} />
      <div className="promo-codes-item--info-container">
        <div className="promo-codes--text">
          <div className="row">
            <div className={promoCodesClassName}>{promoCode.promoCode}</div>
            <div className={promoCodesPromotion}>{promoCode.promotion}</div>
          </div>
          {isPromoCodeActive && renderInfoContainer()}
          {renderUsedAndExpiredDates()}
        </div>
      </div>
    </div>
  );
};

export default PromoCodes;
