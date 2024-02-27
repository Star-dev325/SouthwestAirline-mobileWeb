// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import SubHeader from 'src/shared/components/subHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import * as StandbyActions from 'src/standby/actions/standbyActions';
import SearchFlightsSummaryHeader from 'src/shared/components/searchFlightsSummaryHeader';
import FlightTimes from 'src/shared/components/flightTimes';
import LabelContainer from 'src/shared/components/labelContainer';
import FlightNumber from 'src/shared/components/flightNumber';
import StandbyList from 'src/standby/components/standbyList';
import Container from 'src/shared/components/container';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import i18n from '@swa-ui/locale';

import type { StandbyListPageType, StandbyHeaderType } from 'src/standby/flow-typed/standby.types';

type Props = {
  checkEnhancedStandbyNearAirportFn: (*, boolean, boolean) => void,
  checkStandbyNearAirportFn: (*, boolean, boolean) => void,
  isEnhancedStandbyList: boolean,
  location: HistoryLocationWithState<*>,
  standbyListPage: StandbyListPageType
};

export class StandbyPage extends React.Component<Props> {
  componentDidMount() {
    const {
      standbyListPage,
      isEnhancedStandbyList,
      checkStandbyNearAirportFn,
      checkEnhancedStandbyNearAirportFn,
      location
    } = this.props;

    if (_.isEmpty(standbyListPage)) {
      isEnhancedStandbyList
        ? checkEnhancedStandbyNearAirportFn(transformSearchToQuery(location.search), false, false)
        : checkStandbyNearAirportFn(transformSearchToQuery(location.search), false, false);
    }
  }

  _renderStandbyFlightInfo = (header: StandbyHeaderType) => {
    const { flightNumber, departureTime, arrivalTime } = header;

    return (
      <div className="standby-body--flight-info">
        <LabelContainer className="standby-body--flight-info-label" labelText="Flight">
          <FlightNumber className="standby-body--flight-info-flight-number" flightNumber={flightNumber} />
        </LabelContainer>
        <FlightTimes departureTime={departureTime} arrivalTime={arrivalTime} isNextDay={false} />
      </div>
    );
  };

  render() {
    if (_.isEmpty(this.props.standbyListPage)) {
      return null;
    }

    const { standbyListPage } = this.props;
    const header = _.get(standbyListPage, 'header');
    const standbyList = _.get(standbyListPage, 'standbyList');
    const disclaimerText = _.get(standbyListPage, 'disclaimerText');
    const lastUpdateTime = `Last Updated ${dayjs().format('MM/DD/YY HH:mm:ss')}`;

    return (
      <div className="standby">
        <SubHeader title={i18n('STANDBY__TITLE')} />
        {!_.isEmpty(header) && (
          <div className="standby">
            <SearchFlightsSummaryHeader date={header.date} from={header.from} to={header.to} />
            <Container>
              <div className="standby-container">
                {this._renderStandbyFlightInfo(header)}
                <div className="standby-container--last-update-time">{lastUpdateTime}</div>
                <StandbyList standbyList={standbyList} />
              </div>
            </Container>
            <div className="standby-disclaimer" data-qa="standby-disclaimer">
              {disclaimerText}
            </div>
            <div className="standby-wcm">
              <a href="standby-policies" target="_blank">
                {i18n('STANDBY__POLICIES_LINK_TEXT')}
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  standbyListPage: _.get(state, 'app.standby.standbyPage.response.standbyListPage'),
  isEnhancedStandbyList: _.get(state, 'app.toggles.ENHANCED_STANDBY_LIST')
});

const mapDispatchToProps = {
  checkStandbyNearAirportFn: StandbyActions.checkStandbyNearAirport,
  checkEnhancedStandbyNearAirportFn: StandbyActions.checkEnhancedStandbyNearAirport
};

const enhancers = _.flowRight(
  withBodyClass('standby-list-page'),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(StandbyPage);
