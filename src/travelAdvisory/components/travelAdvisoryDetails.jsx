// @flow
import React, { Component } from 'react';
import Icon from 'src/shared/components/icon';

import type { TravelAdvisoryType } from 'src/travelAdvisory/flow-typed/travelAdvisory.types';

type Props = {
  travelAdvisory: TravelAdvisoryType
};

class TravelAdvisoryDetails extends Component<Props> {
  static defaultProps = {
    travelAdvisory: {
      id: '',
      advisoryTitle: '',
      advisoryInfo: '',
      stationInfo: []
    }
  };

  _stationsInfo = () => {
    const { stationInfo } = this.props.travelAdvisory;

    return stationInfo ? stationInfo : [];
  };

  render() {
    const { advisoryTitle, advisoryInfo } = this.props.travelAdvisory;

    return (
      <div className="travel-advisory-detail">
        <h2 className="travel-advisory-detail--title">
          <Icon type="exclamation-circle" className="travel-advisory-detail--title-icon" />
          <span className="travel-advisory-detail--title-text">{advisoryTitle}</span>
        </h2>

        <div className="travel-advisory-detail--info" dangerouslySetInnerHTML={{ __html: advisoryInfo }} />
        <div>
          {this._stationsInfo().map((station, index) => (
            <div key={index}>
              <h2 className="travel-advisory-detail--station-title">{station.station}</h2>

              <div
                className="travel-advisory-detail--station-info"
                dangerouslySetInnerHTML={{ __html: station.stationDetails }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TravelAdvisoryDetails;
