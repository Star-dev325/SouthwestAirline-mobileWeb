import React from 'react';
import { Route } from 'react-router';

import WhereWeFlyPage from 'src/whereWeFly/pages/whereWeFlyPage';

class WhereWeFly extends React.Component {
  render() {
    return (
      <div className="where-we-fly">
        <Route exact path="/where-we-fly" component={WhereWeFlyPage} />
      </div>
    );
  }
}

export default WhereWeFly;
