// @flow
import React from 'react';
import { isEmpty } from 'src/shared/helpers/jsUtils';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { HOME_PAGE_ID } from 'src/wcm/constants/wcmConstants';

type Props = {
  handleFirmOfferOfCreditFn: () => void,
  homeBanners: Array<*>
};

const HomeBanner = ({ homeBanners, handleFirmOfferOfCreditFn }: Props) => {
  if (isEmpty(homeBanners)) {
    return null;
  }

  return (
    <div className="home-banner">
      {homeBanners.map((content, index) => (
        <DynamicPlacement
          data-qa="home-banner-item"
          key={index}
          observerCallback={handleFirmOfferOfCreditFn}
          pageId={HOME_PAGE_ID}
          {...content}
        />
      ))}
    </div>
  );
};

export default HomeBanner;
