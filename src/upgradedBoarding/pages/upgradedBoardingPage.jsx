// @flow
import i18n from '@swa-ui/locale';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import PageHeader from 'src/shared/components/pageHeader';
import { UPGRADED_BOARDING_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import ReservationRetrievalForm from 'src/shared/form/components/reservationRetrievalForm';
import { flowRight, get } from 'src/shared/helpers/jsUtils';
import * as UpgradedBoardingActions from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import { getUpgradedBoardingReservationLink } from 'src/upgradedBoarding/helpers/upgradedBoardingHelper';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { PassengerNameRecord } from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  getUpgradedBoardingReservationFn: (link: Link) => void,
  isWebView: boolean,
  loadUpgradedBoardingPagePlacementsFn: () => void,
  upgradedBoardingPagePlacements: {
    promoTop01?: DynamicPlacementResponse,
    contentModule1?: DynamicPlacementResponse,
    promoBottom01?: DynamicPlacementResponse
  }
};

export const UpgradedBoardingPage = ({
  isWebView,
  getUpgradedBoardingReservationFn,
  loadUpgradedBoardingPagePlacementsFn,
  upgradedBoardingPagePlacements: { promoTop01, contentModule1, promoBottom01 }
}: Props) => {
  useEffect(() => {
    raiseSatelliteEvent('Upgraded Boarding Index');
    loadUpgradedBoardingPagePlacementsFn();
  }, []);

  const _onSubmit = (pnr: PassengerNameRecord) => {
    getUpgradedBoardingReservationFn(getUpgradedBoardingReservationLink(pnr));
  };

  return (
    <div className="upgraded-boarding--content">
      <PageHeader hidden={isWebView}>{i18n('UB_PAGE_TITLE')}</PageHeader>
      {promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" />}
      <ReservationRetrievalForm formId={UPGRADED_BOARDING_FORM} onSubmit={_onSubmit} />
      {contentModule1 && <DynamicPlacement {...contentModule1} data-qa="contentModule1" />}
      {promoBottom01 && <DynamicPlacement {...promoBottom01} data-qa="promoBottom01" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isWebView: get(state, 'app.webView.isWebView'),
  upgradedBoardingPagePlacements: get(
    state,
    'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingPagePlacements',
    {}
  )
});

const mapDispatchToProps = {
  getUpgradedBoardingReservationFn: UpgradedBoardingActions.getUpgradedBoardingReservation,
  loadUpgradedBoardingPagePlacementsFn: UpgradedBoardingActions.loadUpgradedBoardingPagePlacements
};

const enhancers = flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('upgraded-boarding-page')
);

export default enhancers(UpgradedBoardingPage);
