// @flow

import _ from 'lodash';
import React from 'react';
import { Route, withRouter } from 'react-router';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';

import LoginPage from 'src/login/pages/loginPage';

import type { Match } from 'react-router';

type Props = {
  match: Match
};

class Login extends React.Component<Props> {
  render() {
    const { match } = this.props;

    return (
      <div className="login">
        <Route exact path={`${match.url}`} component={LoginPage} />
      </div>
    );
  }
}

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(Login);
