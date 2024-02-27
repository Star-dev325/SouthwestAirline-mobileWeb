// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadOffersPagePlacements, saveOffersPagePlacements } from 'src/homeAndNav/actions/offersPageActions';
import { handleFirmOfferOfCredit } from 'src/chase/actions/chaseActions';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import { OFFERS_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import i18n from '@swa-ui/locale';

import type { DynamicPlacementResponse, WcmContentResponse, TemplateDataType } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  placements: Array<DynamicPlacementResponse>,
  templateData: TemplateDataType,
  loadOffersPagePlacementsFn: () => Promise<*>,
  saveOffersPagePlacementsFn: (response: WcmContentResponse) => void,
  handleFirmOfferOfCreditFn: () => void
};

export const OffersPage = ({
  placements,
  templateData,
  handleFirmOfferOfCreditFn,
  loadOffersPagePlacementsFn,
  saveOffersPagePlacementsFn
}: Props) => {
  useEffect(() => {
    loadOffersPagePlacementsFn()
      .catch(_.noop)
      .finally(() => raiseSatelliteEvent('SPCL:SWA:offers'));

    return () => saveOffersPagePlacementsFn({});
  }, []);

  const _renderOffers = () =>
    placements.map((placement, index) => (
      <DynamicPlacement
        {...placement}
        key={index}
        additionalTemplateData={templateData}
        data-qa="offers-page-placement"
        observerCallback={handleFirmOfferOfCreditFn}
        pageId={OFFERS_PAGE_ID}
      />
    ));

  const _renderNoOffers = () => (
    <React.Fragment>
      <p className="offers--no-offer-message offers--no-offer-text">{i18n('HOME_AND_NAV__NO_OFFER_MESSAGE')}</p>
      <p className="offers--no-offer-text">{i18n('HOME_AND_NAV__NO_OFFER_INSTRUCTION')}</p>
    </React.Fragment>
  );

  return <div className="offers">{_.isEmpty(placements) ? _renderNoOffers() : _renderOffers()}</div>;
};

const mapStateToProps = (state) => ({
  placements: _.get(state, 'app.homeAndNav.offersPage.placements') || [],
  templateData: _.get(state, 'app.homeAndNav.offersPage.templateData') || {}
});

const mapDispatchToProps = {
  loadOffersPagePlacementsFn: loadOffersPagePlacements,
  saveOffersPagePlacementsFn: saveOffersPagePlacements,
  handleFirmOfferOfCreditFn: handleFirmOfferOfCredit
};

const enhancers = _.flowRight(connect(mapStateToProps, mapDispatchToProps), withBodyClass('offers-page'));

export default enhancers(OffersPage);
