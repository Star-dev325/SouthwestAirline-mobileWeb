// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { retrieveEarlyBirdBanner } from 'src/wcm/actions/wcmActions';
import SubHeader from 'src/shared/components/subHeader';
import ReservationRetrievalForm from 'src/shared/form/components/reservationRetrievalForm';
import EarlyBirdCheckInBanner from 'src/earlyBird/components/earlyBirdCheckInBanner';
import { getEarlyBirdBanner } from 'src/earlyBird/selectors/earlyBirdCheckInPageSelectors';
import { EARLY_BIRD_CHECK_IN_FORM } from 'src/shared/constants/formIds';
import { getViewEarlyBirdReservationLink } from 'src/earlyBird/transformers/earlyBirdCheckInTransformer';

import type { PassengerNameRecord } from 'src/shared/flow-typed/shared.types';
import type { EarlyBirdBannerType } from 'src/earlyBird/flow-typed/earlyBird.types';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  getEarlyBirdReservationFn: (Link, string, boolean) => void,
  retrieveEarlyBirdBannerFn: () => void,
  fetchEarlyBirdPlacementsFn: () => void,
  banner: EarlyBirdBannerType,
  isLoggedIn: boolean,
  ENABLE_TARGET_CONFIG: boolean,
  promoBannerConfig: {
    promoTop01?: DynamicPlacementResponse
  }
};

export class EarlyBirdCheckInPage extends React.Component<Props> {
  componentDidMount() {
    const { banner, retrieveEarlyBirdBannerFn, fetchEarlyBirdPlacementsFn, ENABLE_TARGET_CONFIG } = this.props;

    !ENABLE_TARGET_CONFIG && _.isEmpty(banner) && retrieveEarlyBirdBannerFn();
    ENABLE_TARGET_CONFIG && fetchEarlyBirdPlacementsFn();
  }

  _onSubmit = (pnr: PassengerNameRecord) => {
    const { getEarlyBirdReservationFn, isLoggedIn } = this.props;
    const link = getViewEarlyBirdReservationLink(pnr);

    getEarlyBirdReservationFn(link, pnr.recordLocator, isLoggedIn);
  };

  render() {
    const { promoBannerConfig, ENABLE_TARGET_CONFIG } = this.props;
    const { promoTop01 } = promoBannerConfig;

    return (
      <div className="early-bird-check-in">
        <SubHeader title="EarlyBird Check-In®" />
        {ENABLE_TARGET_CONFIG && promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" />}
        {!ENABLE_TARGET_CONFIG && <EarlyBirdCheckInBanner banner={this.props.banner} />}
        <ReservationRetrievalForm
          formId={EARLY_BIRD_CHECK_IN_FORM}
          initialFormData={{}}
          onSubmit={this._onSubmit}
          className="early-bird-check-in--form"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  banner: getEarlyBirdBanner(state),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  ENABLE_TARGET_CONFIG: _.get(state, 'app.toggles.ENABLE_TARGET_CONFIG', false),
  promoBannerConfig: _.get(state, 'app.earlyBird.earlyBirdBanner', {})
});

const mapDispatchToProps = {
  getEarlyBirdReservationFn: EarlyBirdActions.getEarlyBirdReservation,
  fetchEarlyBirdPlacementsFn: EarlyBirdActions.fetchEarlyBirdPlacements,
  retrieveEarlyBirdBannerFn: retrieveEarlyBirdBanner
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(EarlyBirdCheckInPage);
