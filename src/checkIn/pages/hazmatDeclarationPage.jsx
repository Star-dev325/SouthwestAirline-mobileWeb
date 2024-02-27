// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import Button from 'src/shared/components/button';
import HazmatIconList from 'src/shared/components/hazmatIconList';
import { sitePaths } from 'src/shared/constants/siteLinks';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { PassengerNameRecord, Replace } from 'src/shared/flow-typed/shared.types';
import type { HazmatDeclarationType } from 'src/checkIn/flow-typed/checkIn.types';

type HazmatRouterState = {
  flights: Array<HazmatDeclarationType>,
  pnr: PassengerNameRecord
};

type Props = {
  goBack: () => void,
  location: HistoryLocationWithState<HazmatRouterState>,
  replace: Replace
};

export class HazmatDeclarationPage extends React.Component<Props> {
  componentDidMount() {
    raiseSatelliteEvent('hazardous materials acknowledgement');
  }

  _acknowledgeAndContinue = () => {
    const { location, replace } = this.props;
    const { flights, pnr } = location.state;

    CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
    replace(getNormalizedRoute({ routeName: 'checkInBoardingPass' }), null, { clk: 'chkinhazyes' }, pnr);
  };

  _onAcknowledgementDisagreeClick = () => {
    raiseSatelliteEvent('hazardous materials acknowledgement declined');
    this.props.goBack();
  };

  render() {
    return (
      <div className="hazmat-declaration-page">
        <div className="hazmat-declaration-page--title">
          <img
            className="brand-bar-img"
            src="/content/mkt/images/landing_pages/brand-bar.png"
            srcSet="/content/mkt/images/landing_pages/brand-bar@2x.png 2x, /content/mkt/images/landing_pages/brand-bar@3x.png 3x"
          />
        </div>

        <div className="hazmat-declaration-page--notification">
          <div className="title">{i18n('CHECK_IN__HAZMAT__TITLE')}</div>

          <div className="hazmat-warning">{i18n('CHECK_IN__HAZMAT__WARNING')}</div>

          <HazmatIconList />

          <div className="hazmat-ack">
            {i18n('CHECK_IN__HAZMAT__ACKNOWLEDGE_PRE_LINK')}
            <a href={`${sitePaths.HazardousMaterials}?clk=chkinhazinfo`} target="_blank">
              {i18n('CHECK_IN__HAZMAT__ACKNOWLEDGE_LINK')}
            </a>
          </div>

          <Button className="continue" color="yellow" size="larger" fluid onClick={this._acknowledgeAndContinue}>
            {i18n('SHARED__BUTTON_TEXT__CONTINUE')}
          </Button>

          <div className="hazmat-disagree" onClick={this._onAcknowledgementDisagreeClick}>
            Disagree
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cards: _.get(state, 'app.checkIn.checkInViewReservationPage.cards')
});

const mapDispatchToProps = () => ({});

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(HazmatDeclarationPage);
