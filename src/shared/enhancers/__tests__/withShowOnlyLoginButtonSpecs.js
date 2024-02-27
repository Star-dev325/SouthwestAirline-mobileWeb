import React from 'react';
import sinonModule from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import * as GlobalHeaderActions from 'src/shared/actions/globalHeaderActions';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

const sinon = sinonModule.sandbox.create();

describe('withShowOnlyLoginButton HOC', () => {
  let showOnlyLoginStub;
  let resetGlobalHeaderStub;

  beforeEach(() => {
    showOnlyLoginStub = sinon.stub(GlobalHeaderActions, 'showOnlyLogin');
    resetGlobalHeaderStub = sinon.stub(GlobalHeaderActions, 'resetGlobalHeader');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call global header action to show only login button', () => {
    createComponent();
    expect(showOnlyLoginStub).to.be.called;
  });

  it('should call global header action to reset global header', () => {
    const component = createComponent();

    component.unmount();

    expect(resetGlobalHeaderStub).to.be.called;
  });

  const createComponent = (state = {}) => {
    const store = { ...mockStore(state), subscribe: () => {} };
    const WithShowOnlyLoginButton = withShowOnlyLoginButton(() => <div />);

    return mount(
      <Provider store={store}>
        <WithShowOnlyLoginButton />
      </Provider>
    );
  };
});
