import React, { Component } from 'react';
import { Route } from 'react-router';

import Homepage from 'src/homeAndNav/pages/homepage';
import EmailEnroll from 'src/homeAndNav/pages/emailEnroll';

class HomeAndNav extends Component {
  render() {
    return (
      <div className="home-and-nav">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/email-enroll" component={EmailEnroll} />
      </div>
    );
  }
}

export default HomeAndNav;
