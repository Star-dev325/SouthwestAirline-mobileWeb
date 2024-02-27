// @flow
import React from 'react';
import _ from 'lodash';
import { Route, withRouter } from 'react-router';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import CarCancelConfirmationPage from 'src/carCancel/pages/carCancelConfirmationPage';

import type { Match } from 'react-router';

type Props = {
  match: Match
};

class CarCancel extends React.Component<Props> {
  render() {
    const { match } = this.props;

    return (
      <div className="car-cancel">
        <Route exact path={`${match.url}/confirmation`} component={CarCancelConfirmationPage} />
        <Route exact path={`${match.url}/summary.html`} component={CarCancelConfirmationPage} />
      </div>
    );
  }
}

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(CarCancel);
