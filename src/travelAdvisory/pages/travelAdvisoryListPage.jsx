// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import TravelAdvisoryItem from 'src/travelAdvisory/components/travelAdvisoryItem';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import * as TravelAdvisoryActions from 'src/travelAdvisory/actions/travelAdvisoryActions';

import type { TravelAdvisoryType } from 'src/travelAdvisory/flow-typed/travelAdvisory.types';
import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  getTravelAdvisoriesFn: () => Promise<*>,
  travelAdvisories: Array<TravelAdvisoryType>,
  push: Push
};

export class TravelAdvisoryListPage extends Component<Props> {
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

  _showTravelAdvisoryDetails = (index: number) => {
    const nextPagePath = buildPathWithParamAndQuery('/travel-advisories/:number', { number: index });

    this.props.push(nextPagePath);
  };

  render() {
    const { travelAdvisories } = this.props;

    return (
      <div className="travel-advisory-list">
        {travelAdvisories && (
          <div>
            {travelAdvisories.map((advisory, index) => (
              <TravelAdvisoryItem
                key={index}
                title={advisory.advisoryTitle}
                onClick={this._showTravelAdvisoryDetails.bind(this, index)}
              />
            ))}
          </div>
        )}
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

export default enhancers(TravelAdvisoryListPage);
