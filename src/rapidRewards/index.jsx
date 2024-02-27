import React from 'react';
import { Route } from 'react-router';

import RapidRewardsLandingPage from 'src/rapidRewards/pages/rapidRewardsLandingPage';
import { AboutRapidRewardsPage } from 'src/wcm/pages/styledPages';

class RapidRewards extends React.Component {
  render() {
    return (
      <div className="rapidRewards">
        <Route exact path="/rapid-rewards" component={RapidRewardsLandingPage} />
        <Route exact path="/about-rapid-rewards" component={AboutRapidRewardsPage} />
      </div>
    );
  }
}

export default RapidRewards;
