// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import TravelAdvisoryDetails from 'src/travelAdvisory/components/travelAdvisoryDetails';
import i18n from '@swa-ui/locale';
import NavItem from 'src/shared/components/navItem';
import * as TravelAdvisoryActions from 'src/travelAdvisory/actions/travelAdvisoryActions';

import type { TravelAdvisoryType } from 'src/travelAdvisory/flow-typed/travelAdvisory.types';
import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  params: {
    number: string
  },
  getTravelAdvisoriesFn: () => Promise<*>,
  travelAdvisories?: Array<TravelAdvisoryType>,
  push: Push
};

export class TravelAdvisoryDetailsPage extends Component<Props> {
  static defaultProps = {
    travelAdvisories: [
      {
        id: '',
        advisoryTitle: '',
        advisoryInfo: '',
        stationInfo: []
      }
    ]
  };

  componentDidMount() {
    const { getTravelAdvisoriesFn } = this.props;

    getTravelAdvisoriesFn();
  }

  _showFlightStatus = () => {
    this.props.push('/flight-status');
  };

  _showMyTrips = () => {
    this.props.push('/my-account/upcoming-trips');
  };

  render() {
    const {
      params: { number },
      travelAdvisories
    } = this.props;
    const advisoryDetail = travelAdvisories ? travelAdvisories[parseInt(number)] : false;

    return (
      <div>
        {advisoryDetail && <TravelAdvisoryDetails travelAdvisory={advisoryDetail} />}
        <div>
          <NavItem className="travel-advisory-detail--route-item" onClick={this._showFlightStatus}>
            <span className="travel-advisory-detail--flight-status">
              {i18n('TRAVEL_ADVISORY__FLIGHT_STATUS_TITLE')}
            </span>
          </NavItem>
          <NavItem className="travel-advisory-detail--route-item" onClick={this._showMyTrips}>
            <span className="travel-advisory-detail--my-trips">{i18n('TRAVEL_ADVISORY__MY_TRIPS_TITLE')}</span>
          </NavItem>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  travelAdvisories: state.app.travelAdvisory.messageTravelAdvisory
});

const mapDispatchToProps = {
  getTravelAdvisoriesFn: TravelAdvisoryActions.getTravelAdvisories
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(TravelAdvisoryDetailsPage);
