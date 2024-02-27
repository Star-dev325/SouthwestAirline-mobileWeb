// @flow
import React from 'react';
import { sitePaths } from 'src/shared/constants/siteLinks';
import TermsAndPrivacyLinks from 'src/shared/components/termsAndPrivacyLinks';
import i18n from '@swa-ui/locale';

import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  productId: string,
  isWebView?: boolean,
  push: Push
};

const CarPricingFooter = (props: Props) => {
  const { productId } = props;
  const termsHref = `${sitePaths.carVendorTermsAndConditions}?productId=${productId}`;

  const _renderFooterLink = (text, link) => {
    const { isWebView, push } = props;

    if (isWebView) {
      return (
        <a className="pblue" onClick={() => push(link)}>
          {text}
        </a>
      );
    } else {
      return (
        <a target="_blank" className="pblue" href={link}>
          {text}
        </a>
      );
    }
  };

  return (
    <div>
      <div className="bdb py5 bdgray3">
        {_renderFooterLink(i18n('CAR_BOOKING__PRICING__VENDOR_TERMS_AND_CONDITIONS'), termsHref)}
      </div>
      <div className="bdb py5 bdgray3">
        {_renderFooterLink(i18n('CAR_BOOKING__PRICING__LIMIT_OF_LIABILITY'), sitePaths.carLimitOfLiability)}
      </div>
      <TermsAndPrivacyLinks className="sblue pt5 pb2" />
    </div>
  );
};

export default CarPricingFooter;
