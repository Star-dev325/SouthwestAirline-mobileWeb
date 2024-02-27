// @flow
import React, { Component } from 'react';
import Messages from 'src/homeAndNav/constants/homeAndNavMessages';

type Props = {
  isLoggedIn: boolean,
  name?: string
};

class UserPreferName extends Component<Props> {
  render() {
    const { isLoggedIn, name } = this.props;
    const welcomeMessage = [Messages.HI, name].join(', ');

    return isLoggedIn && !!name ? (
      <div className="overflow-hidden ellipsis nowrap">
        <span>{welcomeMessage}</span>
      </div>
    ) : null;
  }
}

export default UserPreferName;
