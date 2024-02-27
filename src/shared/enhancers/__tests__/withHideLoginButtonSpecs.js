import React from 'react';
import sinonModule from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import * as GlobalHeaderActions from 'src/shared/actions/globalHeaderActions';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

const sinon = sinonModule.sandbox.create();

describe('withHideLoginButton HOC', () => {
  let hideButtonStub;
  let resetGlobalHeaderStub;

  beforeEach(() => {
    hideButtonStub = sinon.stub(GlobalHeaderActions, 'hideButton');
    resetGlobalHeaderStub = sinon.stub(GlobalHeaderActions, 'resetGlobalHeader');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call global header action to hide the login button', () => {
    createComponent();
    expect(hideButtonStub).to.be.called;
  });

  it('should call global header action to reset global header', () => {
    const component = createComponent();

    component.unmount();

    expect(resetGlobalHeaderStub).to.be.called;
  });

  const createComponent = (state = {}) => {
    const store = { ...mockStore(state), subscribe: () => {} };
    const WithHideLoginButton = withHideLoginButton(() => <div />);

    return mount(
      <Provider store={store}>
        <WithHideLoginButton />
      </Provider>
    );
  };
});
