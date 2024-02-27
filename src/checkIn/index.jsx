import _ from 'lodash';
import React from 'react';
import { Route, withRouter } from 'react-router';
import PropTypes from 'prop-types';

import CheckInLandingPage from 'src/checkIn/pages/checkInLandingPage';
import CheckInConfirmationPage from 'src/checkIn/pages/checkInConfirmationPage';
import BoardingPositionsPage from 'src/checkIn/pages/boardingPositionsPage';
import MobileBoardingPassPage from 'src/checkIn/pages/mobileBoardingPassPage';
import CheckInPassportPage from 'src/checkIn/pages/checkInPassportPage';
import AdditionalPassportInfoPage from 'src/checkIn/pages/additionalPassportInfoPage';
import CheckInAPISPermanentResidentCardPage from 'src/checkIn/pages/checkInAPISPermanentResidentCardPage';
import CheckInAPISVisaPage from 'src/checkIn/pages/checkInAPISVisaPage';
import CheckInAPISDestinationPage from 'src/checkIn/pages/checkInAPISDestinationPage';
import ChooseMobileBoardingPassesPage from 'src/checkIn/pages/chooseMobileBoardingPassesPage';
import withFlowStatus from 'src/shared/enhancers/withFlowStatus';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import DayOfTravelContactMethodPage from 'src/shared/pages/dayOfTravelContactMethodPage';
import HazmatDeclarationPage from 'src/checkIn/pages/hazmatDeclarationPage';

class CheckIn extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="check-in">
        <Route
          exact
          path={`${match.url}/`}
          component={withFlowStatus({
            action: {
              setFlowStatus: _.partial(FlowStatusActions.setFlowStatus, 'checkIn')
            }
          })(CheckInLandingPage)}
        />
        <Route
          exact
          path={`${match.url}/:paxNumber/passportPage`}
          component={CheckInPassportPage}
        />
        <Route
          exact
          path={`${match.url}/:paxNumber/required-info.html`}
          component={CheckInPassportPage}
        />
        <Route
          exact
          path={`${match.url}/:paxNumber/additional-passport-info`}
          component={AdditionalPassportInfoPage}
        />
        <Route
          exact
          path={`${match.url}/:paxNumber/additional-required-info.html`}
          component={AdditionalPassportInfoPage}
        />
        <Route
          exact
          path={`${match.url}/:paxNumber/additional-passport-info/green-card`}
          component={CheckInAPISPermanentResidentCardPage}
        />
        <Route
          exact
          path={`${match.url}/:paxNumber/additional-required-info/green-card.html`}
          component={CheckInAPISPermanentResidentCardPage}
        />
        <Route exact path={`${match.url}/:paxNumber/additional-passport-info/visa`} component={CheckInAPISVisaPage} />
        <Route exact path={`${match.url}/:paxNumber/additional-required-info/visa.html`} component={CheckInAPISVisaPage} />
        <Route
          exact
          path={`${match.url}/:paxNumber/additional-passport-info/destination`}
          component={CheckInAPISDestinationPage}
        />
        <Route
          exact
          path={`${match.url}/:paxNumber/additional-required-info/destination.html`}
          component={CheckInAPISDestinationPage}
        />
        <Route exact path={`${match.url}/confirmation`} component={CheckInConfirmationPage} />
        <Route exact path={`${match.url}/confirmation.html`} component={CheckInConfirmationPage} />
        <Route exact path={`${match.url}/boarding-positions`} component={BoardingPositionsPage} />
        <Route exact path={`${match.url}/boarding-positions.html`} component={BoardingPositionsPage} />
        <Route exact path={`${match.url}/choose-boarding-passes`} component={ChooseMobileBoardingPassesPage} />
        <Route exact path={`${match.url}/choose-boarding-passes.html`} component={ChooseMobileBoardingPassesPage} />
        <Route exact path={`${match.url}/boarding-pass`} component={MobileBoardingPassPage} />
        <Route exact path={`${match.url}/documents.html`} component={MobileBoardingPassPage} />
        <Route exact path={`${match.url}/confirmation/:pnr/contact-method`} component={DayOfTravelContactMethodPage} />
        <Route exact path={`${match.url}/confirmation/contact-method/:pnr`} component={DayOfTravelContactMethodPage} />
        <Route exact path={`${match.url}/hazmat-declaration`} component={HazmatDeclarationPage} />
        <Route exact path={`${match.url}/hazmat-declaration.html`} component={HazmatDeclarationPage} />
      </div>
    );
  }
}

CheckIn.propTypes = {
  match: PropTypes.object
};

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(CheckIn);
