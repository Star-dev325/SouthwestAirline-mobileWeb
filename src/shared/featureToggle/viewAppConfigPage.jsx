import React from 'react';
import _ from 'lodash';
import appConfig from 'src/shared/config/appConfig';

const ViewAppConfigPage = () => (
  <div className="large">
    {_.map(appConfig, (apiURL, apiName) =>
      (typeof apiURL !== 'function' && typeof apiName !== 'function' ? (
        <div className="bgwhite px4 py6 mb2" key={apiName}>
          <span className="bold">{apiName}</span>
          {' : '}
          <span>{apiURL}</span>
        </div>
      ) : null)
    )}
  </div>
);

export default ViewAppConfigPage;
