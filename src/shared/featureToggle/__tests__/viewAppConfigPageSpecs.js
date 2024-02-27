import React from 'react';
import { mount } from 'enzyme';

describe('viewAppConfigPage', () => {
  let appConfig, viewAppConfigPage;

  beforeEach(() => {
    const ViewAppConfigPage = require('src/shared/featureToggle/viewAppConfigPage').default;

    appConfig = require('src/shared/config/appConfig').default;
    appConfig.CHAPI = 'https://api-mobile-misc.dev4.southwest.com';
    viewAppConfigPage = mount(<ViewAppConfigPage />);
  });

  it('should show keys and values', () => {
    expect(viewAppConfigPage).to.contain.text('CHAPI : https://api-mobile-misc.dev4.southwest.com');
  });
});
