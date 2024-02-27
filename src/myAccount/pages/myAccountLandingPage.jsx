// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAccountInfoForLandingPage, setTripTypeForDetailsPage } from 'src/myAccount/actions/myAccountActions';
import AccountNameHeader from 'src/myAccount/components/accountNameHeader';
import MyAccountPanel from 'src/myAccount/components/myAccountPanel';
import MyPromoCodesPanel from 'src/myAccount/components/myPromoCodesPanel';
import MyTripsPanel from 'src/myAccount/components/myTripsPanel';
import RapidRewardsPanelEnrolled from 'src/myAccount/components/rapidRewardsPanelEnrolled';
import RapidRewardsPanelNotEnrolled from 'src/myAccount/components/rapidRewardsPanelNotEnrolled';
import UnusedFundsPanel from 'src/myAccount/components/unusedFundsPanel';
import { CAR, FLIGHT } from 'src/myAccount/constants/upcomingTripType';
import {
  getCarRetrieveReservationInfoFromTrip,
  getRetrieveReservationInfoFromTrip
} from 'src/myAccount/helpers/upcomingTripsHelper';
import Container from 'src/shared/components/container';
import SubHeader from 'src/shared/components/subHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { clearFlightReservation, retrieveCarReservation } from 'src/viewReservation/actions/viewReservationActions';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';
import type {
  ExclusivePromotionPageType,
  UnusedFundsContentType,
  PromoCodesContentType
} from 'src/myAccount/flow-typed/myAccount.types';
import type {
  CustomerInfoType,
  Push,
  RapidRewardsDetailsType,
  UpcomingTripPage
} from 'src/shared/flow-typed/shared.types';
import type {
  CarReservationType,
  RetrieveReservationRequestType
} from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  accountPagePlacements?: {
    banner01: DynamicPlacementResponse,
    promoCodeContentModule?: PromoCodesContentType,
    unusedFundsContentModule: ?UnusedFundsContentType
  },
  clearFlightReservationFn: () => void,
  customerInfo: CustomerInfoType,
  exclusivePromotions: ?ExclusivePromotionPageType,
  getAccountInfoForLandingPageFn: () => void,
  IsExclusivePromotionsHidden: boolean,
  isLoggedIn: boolean,
  isTierStatusPending: boolean,
  PROMO_CODE_IN_MY_ACCOUNT: boolean,
  push: Push,
  rapidRewardsDetails: ?RapidRewardsDetailsType,
  retrieveCarReservationFn: (retrieveReservationRequest: RetrieveReservationRequestType) => Promise<CarReservationType>,
  setTripTypeForDetailsPageFn: (string) => void,
  upcomingTrips: Array<UpcomingTripPage>,
  UNUSED_FUNDS: boolean
};

export class MyAccountLandingPage extends Component<Props> {
  componentDidMount() {
    const { getAccountInfoForLandingPageFn, isLoggedIn, push } = this.props;

    isLoggedIn ? getAccountInfoForLandingPageFn() : push('/login', null, { to: '/my-account' });
  }

  _getAccountNumberHeaderPros = () => {
    const { customerInfo, rapidRewardsDetails } = this.props;

    return {
      fullName: `${_.capitalize(customerInfo.name.firstName)} ${_.capitalize(customerInfo.name.lastName)}`,
      rapidRewardsNumber: rapidRewardsDetails?.isEnrolledInRapidRewards ? customerInfo.accountNumber : null
    };
  };

  _getEndOfYearInfo = () => {
    const { isTierStatusPending } = this.props;

    return {
      endOfYearFlag: isTierStatusPending,
      endOfYearContent: i18n('MY_ACCOUNT__PENDING_STATUS_TIER_TEXT')
    };
  };

  _gotoNextTrip = (nextTrip: UpcomingTripPage) => {
    const query = getRetrieveReservationInfoFromTrip(nextTrip);
    const name = _.pick(query, ['firstName', 'lastName']);
    const recordLocator = _.pick(query, 'recordLocator');

    this.props.push(
      buildPathWithParamAndQuery('/my-account/upcoming-trip-details/:tripIndex', { tripIndex: 0 }, recordLocator),
      null,
      null,
      name
    );
  };

  _onViewFundsBtnClick = () => {
    this.props.push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'travelFundsIndex' }), null, {
        clearFormData: false,
        clk: 'myaccounttravelfunds'
      })
    );
  };

  _onViewPromoCodesBtnClick = () => {
    this.props.push('/my-account/promo-codes');
  };

  _transitionToUpcomingTripDetailsPage = () => {
    const { clearFlightReservationFn, retrieveCarReservationFn, setTripTypeForDetailsPageFn, upcomingTrips } =
      this.props;
    const trip = _.first(upcomingTrips);

    setTripTypeForDetailsPageFn(trip.tripType);

    if (trip.tripType === FLIGHT) {
      clearFlightReservationFn();
      this._gotoNextTrip(trip);
    } else if (trip.tripType === CAR) {
      const request = getCarRetrieveReservationInfoFromTrip(trip);

      retrieveCarReservationFn(request).then(() => {
        this._gotoNextTrip(trip);
      });
    }
  };

  _renderContent = () => {
    const {
      accountPagePlacements,
      customerInfo,
      exclusivePromotions,
      IsExclusivePromotionsHidden,
      PROMO_CODE_IN_MY_ACCOUNT,
      push,
      rapidRewardsDetails,
      UNUSED_FUNDS,
      upcomingTrips
    } = this.props;

    if (!customerInfo || Object.keys(customerInfo).length === 0) return null;

    const { banner01, promoCodeContentModule, unusedFundsContentModule } = accountPagePlacements || {};
    const isEnrolledInRapidRewards = rapidRewardsDetails?.isEnrolledInRapidRewards || false;
    const promotionCount = exclusivePromotions
      ? _.add(exclusivePromotions.numberOfEligiblePromotions, exclusivePromotions.numberOfRegisteredPromotions)
      : 0;

    return (
      <Container ref="container">
        <AccountNameHeader {...this._getAccountNumberHeaderPros()} />
        {banner01 && (
          <MyAccountPanel>
            <DynamicPlacement {...banner01} data-qa="banner01" />
          </MyAccountPanel>
        )}
        {isEnrolledInRapidRewards ? (
          <RapidRewardsPanelEnrolled
            endOfYearInfo={this._getEndOfYearInfo()}
            IsExclusivePromotionsHidden={IsExclusivePromotionsHidden}
            onBenefitLinkClick={() => push('/my-account/tier-benefits-page')}
            onExclusivePromptClick={() => push('/my-account/my-rapid-rewards/promotions')}
            onRapidRewardsPanelClick={() => push('/my-account/my-rapid-rewards')}
            promotionsAvailable={promotionCount}
            rapidRewardsDetails={rapidRewardsDetails}
          />
        ) : (
          <RapidRewardsPanelNotEnrolled
            onEnrollClick={() => push('/my-account/enroll-rapid-rewards')}
            onGetDetailsClick={() => push('/about-rapid-rewards')}
          />
        )}
        <MyTripsPanel
          nextTrip={upcomingTrips[0]}
          numberOfUpcomingTrips={upcomingTrips.length}
          onClickBookATrip={() => push(getNormalizedRoute({ routeName: 'airBookingIndex' }))}
          onClickFindATrip={() => push('/view-reservation')}
          onClickPastFlights={() => push('/my-account/past-flights')}
          onClickNextTrip={this._transitionToUpcomingTripDetailsPage}
          onClickSavedFlights={() => push('/my-account/saved-flights')}
          onClickUpcomingTripCount={() => push('/my-account/upcoming-trips')}
          upcomingTripsApiResponseWasReceived={!_.isEmpty(upcomingTrips)}
        />
        {unusedFundsContentModule && (
          <UnusedFundsPanel
            onViewFundsBtnClick={this._onViewFundsBtnClick}
            UNUSED_FUNDS={UNUSED_FUNDS}
            unusedFundsContent={unusedFundsContentModule}
          />
        )}
        {PROMO_CODE_IN_MY_ACCOUNT && promoCodeContentModule && (
          <MyPromoCodesPanel
            onClick={this._onViewPromoCodesBtnClick}
            PROMO_CODE_IN_MY_ACCOUNT={PROMO_CODE_IN_MY_ACCOUNT}
            promoCodesContent={promoCodeContentModule}
          />
        )}
      </Container>
    );
  };

  render() {
    return (
      <div>
        <SubHeader title={i18n('MY_ACCOUNT__PAGE_HEADER_TITLE')} />
        {this._renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accountPagePlacements: _.get(state, 'app.myAccountPages.accountPagePlacements'),
  customerInfo: _.get(state, 'app.myAccountPages.customerAccountInfo.customerInfo'),
  exclusivePromotions: _.get(state, 'app.myAccountPages.exclusivePromotions', {}),
  IsExclusivePromotionsHidden: _.get(state, 'app.toggles.IsExclusivePromotionsHidden'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  isTierStatusPending: _.get(state, 'app.myAccountPages.customerAccountInfo.isTierStatusPending', false),
  PROMO_CODE_IN_MY_ACCOUNT: _.get(state, 'app.toggles.PROMO_CODE_IN_MY_ACCOUNT'),
  rapidRewardsDetails: _.get(state, 'app.myAccountPages.customerAccountInfo.rapidRewardsDetails'),
  upcomingTrips: _.get(state, 'app.upcomingTrips.upcomingTripsPage', []),
  UNUSED_FUNDS: _.get(state, 'app.toggles.UNUSED_FUNDS')
});

const mapDispatchToProps = {
  clearFlightReservationFn: clearFlightReservation,
  getAccountInfoForLandingPageFn: getAccountInfoForLandingPage,
  retrieveCarReservationFn: retrieveCarReservation,
  setTripTypeForDetailsPageFn: setTripTypeForDetailsPage
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(MyAccountLandingPage);
