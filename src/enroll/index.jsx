// @flow

import _ from 'lodash';
import React from 'react';
import { Route, withRouter } from 'react-router';
import EnrollConfirmationPage from 'src/enroll/pages/enrollConfirmationPage';
import EnrollContactInfoPage from 'src/enroll/pages/enrollContactInfoPage';
import EnrollPersonalInfoPage from 'src/enroll/pages/enrollPersonalInfoPage';
import EnrollSecurityInfoPage from 'src/enroll/pages/enrollSecurityInfoPage';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';

import type { Match } from 'react-router';

type Props = {
  match: Match
};

class Enroll extends React.Component<Props> {
  render() {
    const { match } = this.props;

    return (
      <div className="enroll">
        <Route exact path={`${match.url}`} component={EnrollPersonalInfoPage} />
        <Route exact path={`${match.url}/contact-info`} component={EnrollContactInfoPage} />
        <Route exact path={`${match.url}/security-info`} component={EnrollSecurityInfoPage} />
        <Route exact path={`${match.url}/confirmation`} component={EnrollConfirmationPage} />

        <Route exact path={`${match.url}/enroll-member`} component={EnrollPersonalInfoPage} />
        <Route exact path={`${match.url}/confirm-member`} component={EnrollConfirmationPage} />
      </div>
    );
  }
}

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(Enroll);
