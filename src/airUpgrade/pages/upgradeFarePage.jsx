// @flow
import i18n from '@swa-ui/locale';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as AirUpgradeActions from 'src/airUpgrade/actions/airUpgradeActions';
import { UPGRADE_TYPE_QUERY_PARAM } from 'src/airUpgrade/constants/airUpgradeConstants';
import PageHeader from 'src/shared/components/pageHeader';
import { UPGRADE_FARE_RETRIEVE_RESERVATION_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import ReservationRetrievalForm from 'src/shared/form/components/reservationRetrievalForm';
import { flowRight, get } from 'src/shared/helpers/jsUtils';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { AIR_UPGRADE_INDEX_PAGE_ID } from 'src/wcm/constants/wcmConstants';

import type { Location } from 'react-router';
import type { PassengerNameRecordToken } from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  getUpgradeFareReservationFn: (upgradeFareReservationData: PassengerNameRecordToken) => void,
  isWebView: boolean,
  loadUpgradeFarePagePlacementsFn: (upgradeType: string, pageId: string) => void,
  loadUpgradeIndexFn: () => void,
  location: Location,
  saveUpgradeTypeFn: (upgradeType: string | null) => void,
  upgradeFarePagePlacement: { promoTop01: ?DynamicPlacementResponse },
  upgradeType: string
};

export const UpgradeFarePage = ({
  getUpgradeFareReservationFn,
  isWebView,
  loadUpgradeFarePagePlacementsFn,
  loadUpgradeIndexFn,
  location,
  saveUpgradeTypeFn,
  upgradeFarePagePlacement: { promoTop01 },
  upgradeType
}: Props) => {
  const _onSubmit = (pnr) => {
    getUpgradeFareReservationFn(pnr);
  };

  useEffect(() => {
    const upgradeTypeQueryParam = new URLSearchParams(location.search).get(UPGRADE_TYPE_QUERY_PARAM);

    saveUpgradeTypeFn(upgradeTypeQueryParam);
    loadUpgradeIndexFn();

    return () => saveUpgradeTypeFn('');
  }, [location.search]);

  useEffect(() => {
    upgradeType && loadUpgradeFarePagePlacementsFn(upgradeType, AIR_UPGRADE_INDEX_PAGE_ID);
  }, [upgradeType]);

  return (
    <div className="upgrade-fare--content">
      <PageHeader hidden={isWebView}>{i18n('UPGRADE_FARE_PAGE_TITLE')}</PageHeader>
      {promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" />}
      <ReservationRetrievalForm formId={UPGRADE_FARE_RETRIEVE_RESERVATION_FORM} onSubmit={_onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: *) => ({
  isWebView: get(state, 'app.webView.isWebView'),
  upgradeFarePagePlacement: get(state, 'app.airUpgrade.upgradeFarePagePlacement'),
  upgradeType: get(state, 'app.airUpgrade.airUpgradeReducer.upgradeType')
});

const mapDispatchToProps = {
  getUpgradeFareReservationFn: AirUpgradeActions.getUpgradeFareReservation,
  loadUpgradeFarePagePlacementsFn: AirUpgradeActions.loadUpgradeFarePagePlacements,
  saveUpgradeTypeFn: AirUpgradeActions.saveUpgradeType,
  loadUpgradeIndexFn: AirUpgradeActions.loadUpgradeIndex
};

const enhancers = flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('upgrade-fare-page')
);

export default enhancers(UpgradeFarePage);
