// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { hasEnoughPointsForFare } from 'src/airChange/helpers/airChangeHelper';
import * as AirUpgradeActions from 'src/airUpgrade/actions/airUpgradeActions';
import AirUpgradeSelectBoundsForm from 'src/airUpgrade/components/airUpgradeFareSelectBoundsForm';
import { UPGRADE_TYPE_QUERY_PARAM } from 'src/airUpgrade/constants/airUpgradeConstants';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import InfoBanner from 'src/shared/components/infoBanner';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { AIR_UPGRADE_SELECT_BOUNDS_FORM } from 'src/shared/constants/formIds';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as PriceSelectors from 'src/shared/selectors/priceSelectors';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { AIR_UPGRADE_SELECT_BOUNDS_PAGE_ID } from 'src/wcm/constants/wcmConstants';

import type { Location } from 'react-router';
import type { CheckedInNoticeType } from 'src/airChange/flow-typed/airChange.types.js';
import type { PricingDataType, ViewUpgradeReservationPageType } from 'src/airUpgrade/flow-typed/airUpgrade.types';
import type { NativeAppLoginOptions, Push } from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  viewUpgradeReservationPage: ViewUpgradeReservationPageType,
  changeSelectedBoundFn: ({ productId: string, isSelected: boolean }) => void,
  goToAirChangePricingReviewFn: (
    changePricingPage: Link,
    selectedBounds: Array<PricingDataType>,
    isLoggedIn: boolean
  ) => void,
  resumeAfterLoginFn: (boolean) => void,
  loadUpgradeFarePagePlacementsFn: (upgradeType: string, pageId: string) => void,
  saveUpgradeTypeFn: (upgradeType: string) => void,
  upgradeFarePagePlacement: { promoTop01: ?DynamicPlacementResponse },
  showNativeAppLoginFn: (options: NativeAppLoginOptions) => void,
  shouldResumeAfterLogin: boolean,
  accountRedeemablePoints: number,
  showDialogFn: (*) => void,
  location: Location,
  hideDialogFn: () => Promise<*>,
  pointsBooking: boolean,
  isLoggedIn: boolean,
  push: Push,
  isWebView: boolean,
  upgradeType: string,
  checkedInNotice: CheckedInNoticeType
};

export const UpgradeFareSelectBoundsPage = ({
  changeSelectedBoundFn,
  upgradeFarePagePlacement: { promoTop01 } = {},
  loadUpgradeFarePagePlacementsFn,
  saveUpgradeTypeFn,
  goToAirChangePricingReviewFn,
  viewUpgradeReservationPage: {
    _links: { changePricingPage = {} } = {},
    boundSelectionDataList,
    boundSelectionMessage,
    dates,
    checkedInNotice,
    destinationDescription,
    fareRulesMessageWithLinks,
    originationDestinationDescription,
    pricingDataList,
    promoCodeMessage,
    recordLocator
  },
  shouldResumeAfterLogin,
  resumeAfterLoginFn,
  accountRedeemablePoints,
  showNativeAppLoginFn,
  hideDialogFn,
  showDialogFn,
  pointsBooking,
  isLoggedIn,
  location = {},
  push,
  isWebView,
  upgradeType
}: Props) => {
  useEffect(() => {
    if (isLoggedIn && shouldResumeAfterLogin) {
      _handleLoggedInUsers();
      resumeAfterLoginFn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const upgradeTypeToSave = new URLSearchParams(location.search).get(UPGRADE_TYPE_QUERY_PARAM) || upgradeType;

    saveUpgradeTypeFn(upgradeTypeToSave);

    return () => saveUpgradeTypeFn('');
  }, [location.search]);

  useEffect(() => {
    upgradeType && loadUpgradeFarePagePlacementsFn(upgradeType, AIR_UPGRADE_SELECT_BOUNDS_PAGE_ID);
  }, [upgradeType]);

  const upgrade = () => {
    pointsBooking ? _checkPointsAndLoginStatus() : _goToAirChangePricingReview();
  };

  const _handleSubmit = () => {
    if (checkedInNotice && checkedInNotice.title) {
      showDialogFn({
        title: checkedInNotice.title,
        message: checkedInNotice.message,
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => hideDialogFn().then(upgrade)
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: hideDialogFn
          }
        ]
      });
    } else {
      upgrade();
    }
  };

  const _checkPointsAndLoginStatus = () => {
    isLoggedIn ? _handleLoggedInUsers() : _showPointsLogin();
  };

  const _handleLoggedInUsers = () => {
    const amount = _.get(pricingDataList, '[0].upgradeTotalPrice.amount', '0');

    hasEnoughPointsForFare(amount, accountRedeemablePoints)
      ? _goToAirChangePricingReview()
      : _showNotEnoughPointsPopup();
  };

  const _showNotEnoughPointsPopup = () => {
    showDialogFn({
      name: 'flight-upgrade-not-enough-points',
      title: i18n('SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__TITLE'),
      message: i18n('AIR_UPGRADE__INSUFFICIENT_POINTS__MESSAGE'),
      className: 'not-enough-points-dialog',
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: () => hideDialogFn()
        }
      ]
    });
  };

  const _goToAirChangePricingReview = () => {
    goToAirChangePricingReviewFn(changePricingPage, pricingDataList, isLoggedIn);
  };

  const _showPointsLogin = () => {
    isWebView
      ? showNativeAppLoginFn({ loginType: LOGIN_TYPES.POINTS })
      : push('/login', null, { to: getNormalizedRoute({ routeName: 'airUpgradeSelectBound' }), simpleLogin: true, withPoints: true });

    resumeAfterLoginFn(true);
  };

  return (
    <div className="air-upgrade-select-bounds--content">
      <PageHeaderWithButtons hidden={isWebView} title={i18n('AIR_UPGRADE_SELECT_BOUNDS_PAGE_TITLE')} />
      {promoCodeMessage && (
        <InfoBanner
          className="air-upgrade-select-bounds-promo-message"
          header={promoCodeMessage.header}
          iconType="check-circle"
        />
      )}
      {promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" />}
      {recordLocator && (
        <AirUpgradeSelectBoundsForm
          boundSelectionDataList={boundSelectionDataList}
          pricingDataList={pricingDataList}
          destinationDescription={destinationDescription}
          dates={dates}
          recordLocator={recordLocator}
          originationDestinationDescription={originationDestinationDescription}
          boundSelectionMessage={boundSelectionMessage}
          fareRulesMessageWithLinks={fareRulesMessageWithLinks}
          formId={AIR_UPGRADE_SELECT_BOUNDS_FORM}
          onBoundSelectionChange={changeSelectedBoundFn}
          onSubmit={_handleSubmit}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  upgradeType: _.get(state, 'app.airUpgrade.airUpgradeReducer.upgradeType'),
  viewUpgradeReservationPage: _.get(state, 'app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage', {}),
  isLoggedIn: state.app.account.isLoggedIn,
  pointsBooking: PriceSelectors.isPointsBooking(state),
  shouldResumeAfterLogin: state.app.airUpgrade.upgradeSelectBoundsPage.resumeAfterLogin,
  upgradeFarePagePlacement: _.get(state, 'app.airUpgrade.upgradeFarePagePlacement'),
  accountRedeemablePoints: _.get(state.app, 'account.accountInfo.rapidRewardsDetails.redeemablePoints', 0),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  resumeAfterLoginFn: AirUpgradeActions.resumeAfterLogin,
  changeSelectedBoundFn: AirUpgradeActions.changeSelectedBound,
  showNativeAppLoginFn: WebViewActions.showNativeAppLogin,
  goToAirChangePricingReviewFn: AirUpgradeActions.goToAirChangePricingReview,
  loadUpgradeFarePagePlacementsFn: AirUpgradeActions.loadUpgradeFarePagePlacements,
  saveUpgradeTypeFn: AirUpgradeActions.saveUpgradeType,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('air-upgrade-select-bounds')
);

export default enhancers(UpgradeFareSelectBoundsPage);
