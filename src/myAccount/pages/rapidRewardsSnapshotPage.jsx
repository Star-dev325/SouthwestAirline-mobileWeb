// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import {
  getRapidRewardsInfo,
  clearRapidRewardsInfo,
  getMyAccountRapidRewardsPagePlacements
} from 'src/myAccount/actions/myAccountActions';
import Container from 'src/shared/components/container';
import SubHeader from 'src/shared/components/subHeader';
import Segment from 'src/shared/components/segment';
import PtsGroup from 'src/myAccount/components/ptsGroup';
import AccountNameHeader from 'src/myAccount/components/accountNameHeader';
import ProgressBarGroup from 'src/myAccount/components/progressBarGroup';
import MyAccountPanelHeader from 'src/myAccount/components/myAccountPanelHeader';
import { changeDateFormat } from 'src/shared/helpers/dateHelper';
import { getUserAlreadyHasChaseRRVisa } from 'src/shared/selectors/chaseSelector';
import i18n from '@swa-ui/locale';

import type { RapidRewardsSnapshotPageType } from 'src/myAccount/flow-typed/myAccount.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  push: Push,
  isLoggedIn: boolean,
  rapidRewardsInfo: ?RapidRewardsSnapshotPageType,
  getRapidRewardsInfoFn: () => void,
  clearRapidRewardsInfoFn: () => void,
  getMyAccountRapidRewardsPagePlacementsFn: () => void,
  tierEndDate: ?string,
  companionPassAchieved: boolean,
  companionPassExpirationDate: ?string,
  userAlreadyHasChaseRRVisa: boolean,
  rapidRewardsPagePlacements?: {
    rrSummaryChaseCompanionQualifyingPointsInfo: DynamicPlacementResponse
  }
};

export class RapidRewardsSnapshotPage extends Component<Props> {
  componentDidMount() {
    const { isLoggedIn, getRapidRewardsInfoFn, push, getMyAccountRapidRewardsPagePlacementsFn } = this.props;

    isLoggedIn ? getRapidRewardsInfoFn() : push('/login', null, { to: '/my-account/my-rapid-rewards' });
    getMyAccountRapidRewardsPagePlacementsFn();
  }

  componentWillUnmount() {
    this.props.clearRapidRewardsInfoFn();
  }

  _renderContent = () => {
    const {
      push,
      rapidRewardsInfo,
      tierEndDate,
      companionPassAchieved,
      companionPassExpirationDate,
      userAlreadyHasChaseRRVisa,
      rapidRewardsPagePlacements
    } = this.props;

    if (!rapidRewardsInfo) return null;

    const { rrSummaryChaseCompanionQualifyingPointsInfo } = rapidRewardsPagePlacements || {};
    const { fullName, rapidRewardsNumber, ptsGroup, tier, companionPass } = rapidRewardsInfo;
    const tierEndDateFormatted = changeDateFormat(tierEndDate, 'YYYY-MM-DD', 'MM/DD/YY');
    const companionPassExpirationDateFormatted = changeDateFormat(
      companionPassExpirationDate,
      'YYYY-MM-DD',
      'MM/DD/YY'
    );

    return (
      <Container ref="container" className="my-rapid-rewards-snapshot">
        <AccountNameHeader fullName={fullName} rapidRewardsNumber={rapidRewardsNumber} />
        <Segment className="pts-group">
          <Segment>
            <PtsGroup
              onBenefitsClick={() => push('/my-account/tier-benefits-page')}
              expirationDate={tierEndDateFormatted}
              {...ptsGroup}
            />
          </Segment>
          {companionPassAchieved && companionPassExpirationDateFormatted && (
            <Segment className="segment-border-top">
              <PtsGroup
                label={i18n('MY_ACCOUNT__COMPANION_PASS')}
                expirationDate={companionPassExpirationDateFormatted}
              />
            </Segment>
          )}
        </Segment>
        <MyAccountPanelHeader showCongratulations={tier.showCongratulations} />
        <ProgressBarGroup
          themeColor="orange"
          title={tier.title}
          pointsDonutProgressBar={tier.pointsDonutProgressBar}
          flightsDonutProgressBar={tier.flightsDonutProgressBar}
          userAlreadyHasChaseRRVisa={userAlreadyHasChaseRRVisa}
          readMoreFlyoutContent={rrSummaryChaseCompanionQualifyingPointsInfo}
        />

        <MyAccountPanelHeader showCongratulations={companionPass.showCongratulations} />
        <ProgressBarGroup
          isCompanion
          themeColor="teal"
          shouldCallToAddOrChangeCompanion={companionPass.shouldCallToAddOrChangeCompanion}
          title={companionPass.title}
          pointsDonutProgressBar={companionPass.pointsDonutProgressBar}
          flightsDonutProgressBar={companionPass.flightsDonutProgressBar}
          userAlreadyHasChaseRRVisa={userAlreadyHasChaseRRVisa}
          readMoreFlyoutContent={rrSummaryChaseCompanionQualifyingPointsInfo}
        />
      </Container>
    );
  };

  render() {
    return (
      <div className="my-rapid-rewards">
        <SubHeader title="My Rapid Rewards" />
        {this._renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  rapidRewardsInfo: _.get(state, 'app.myAccountPages.rapidRewardsInfo'),
  tierEndDate: _.get(state, 'app.myAccountPages.customerAccountInfo.rapidRewardsDetails.tierInfo.tierEndDate'),
  companionPassAchieved: _.get(
    state,
    'app.myAccountPages.customerAccountInfo.rapidRewardsDetails.companionPassInfo.companionPassAchieved'
  ),
  companionPassExpirationDate: _.get(
    state,
    'app.myAccountPages.customerAccountInfo.rapidRewardsDetails.companionPassInfo.companionPassExpirationDate'
  ),
  rapidRewardsPagePlacements: _.get(state, 'app.myAccountPages.myAccountRapidRewardsPagePlacements'),
  userAlreadyHasChaseRRVisa: getUserAlreadyHasChaseRRVisa(state)
});

const mapDispatchToProps = {
  getRapidRewardsInfoFn: getRapidRewardsInfo,
  clearRapidRewardsInfoFn: clearRapidRewardsInfo,
  getMyAccountRapidRewardsPagePlacementsFn: getMyAccountRapidRewardsPagePlacements
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(RapidRewardsSnapshotPage);
