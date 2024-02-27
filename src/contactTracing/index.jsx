import React from 'react';
import { Route, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ContactTracingPage from 'src/contactTracing/pages/contactTracingPage';

export class ContactTracing extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="contact-tracing">
        <Route exact path={`${match.url}`} component={ContactTracingPage} />
      </div>
    );
  }
}

ContactTracing.propTypes = {
  match: PropTypes.object
};

export default withRouter(ContactTracing);
