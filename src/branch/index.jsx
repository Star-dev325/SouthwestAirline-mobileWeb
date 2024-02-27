import React from 'react';
import { Route } from 'react-router';
import BranchRedirectPage from 'src/branch/pages/branchRedirectPage';
import ChaseOfferEmailPage from 'src/branch/pages/chaseOfferEmailPage';

class Branch extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/redirect-branch" component={BranchRedirectPage} />
        <Route exact path="/chase/offer/email" component={ChaseOfferEmailPage} />
      </React.Fragment>
    );
  }
}

export default Branch;
