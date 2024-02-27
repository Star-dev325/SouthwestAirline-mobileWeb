import React from 'react';
import { getAppVersion } from 'src/shared/config/environmentConfig';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

class BlankPage extends React.Component<*> {
  render() {
    return (
      <div className="blank-page-footer">
        <p className="footer-details">Version: {getAppVersion()}</p>
      </div>
    );
  }
}

export default withBodyClass('bgpdkblue')(BlankPage);
