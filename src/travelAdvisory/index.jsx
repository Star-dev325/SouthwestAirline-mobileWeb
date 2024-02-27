import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

import TravelAdvisoryListPage from 'src/travelAdvisory/pages/travelAdvisoryListPage';
import TravelAdvisoryDetailsPage from 'src/travelAdvisory/pages/travelAdvisoryDetailsPage';

class TravelAdvisory extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="travel-advisory">
        <Route exact path={`${match.url}`} component={TravelAdvisoryListPage} />
        <Route exact path={`${match.url}/:number`} component={TravelAdvisoryDetailsPage} />
      </div>
    );
  }
}

TravelAdvisory.propTypes = {
  match: PropTypes.object
};

export default TravelAdvisory;
