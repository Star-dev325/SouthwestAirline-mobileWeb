// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'src/shared/components/button';
import { FlightTimesAndPassengersCard } from 'src/shared/components/flightTimesAndPassengersCard/flightTimesAndPassengersCard';
import PageHeader from 'src/shared/components/pageHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';

import type { cancelConfirmationStandbyType, SameDayUpdatesType } from 'src/standby/flow-typed/standby.types';

type Props = {
  cancelStandbyListingPage: cancelConfirmationStandbyType,
  retrieveSameDayBoundInformationFn: (sameDayUpdates: ?SameDayUpdatesType) => void
};

export const CancelStandbyListConfirmationPage = ({
  cancelStandbyListingPage,
  retrieveSameDayBoundInformationFn
}: Props) => {
  const {
    _links: { sameDayUpdates },
    headerMessage,
    standbyFlight
  } = cancelStandbyListingPage;
  const { body, header } = headerMessage;

  const _listForStandbyOnAnotherFlightClick = () => {
    retrieveSameDayBoundInformationFn(sameDayUpdates);
  };

  return (
    <div className="cancel-standby-page">
      <PageHeader>
        <span className="page-title">Confirmation</span>
      </PageHeader>
      <div className="cancel-standby-page--body">
        <div className="cancel-standby-page--body-title">{header}</div>
        <div className="cancel-standby-page--body-subtitle">{body}</div>
        <div className="cancel-standby-page--body-label">{standbyFlight?.labelDescription}</div>
        <div className="cancel-standby-page--body-card">
          <FlightTimesAndPassengersCard card={standbyFlight} />;
        </div>
        {sameDayUpdates?.labelText && (
          <div className="cancel-standby-page--body-button">
            <Button
              color="blue"
              fluid
              onClick={_listForStandbyOnAnotherFlightClick}
              role="submit"
              size="larger"
              type="submit"
            >
              {sameDayUpdates?.labelText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cancelStandbyListingPage: _.get(state, 'app.standby.cancelStandbyListConfirmationPage')
});

const mapDispatchToProps = {
  retrieveSameDayBoundInformationFn: ViewReservationActions.retrieveSameDayBoundInformation
};

const enhancers = _.flowRight(
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('cancel-standby-page'),
  withConnectedReactRouter,
  withRouter
);

export default enhancers(CancelStandbyListConfirmationPage);
