// @flow
import React from 'react';
import type { Node } from 'react';
import _ from 'lodash';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { HOME_PAGE_ID } from 'src/wcm/constants/wcmConstants';

type Props = {
  heroContents: Array<*>,
  handleFirmOfferOfCreditFn: () => void
};

const HomeHero = ({ heroContents, handleFirmOfferOfCreditFn }: Props): Node => {
  if (_.isEmpty(heroContents)) {
    return null;
  }

  return heroContents.map((content, index) => (
    <DynamicPlacement
      data-qa="home-hero-item"
      key={index}
      observerCallback={handleFirmOfferOfCreditFn}
      pageId={HOME_PAGE_ID}
      {...content} />
  ));
};

export default HomeHero;
