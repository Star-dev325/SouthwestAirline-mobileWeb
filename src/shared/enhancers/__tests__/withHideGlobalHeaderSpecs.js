import React from 'react';
import sinonModule from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import * as GlobalHeaderActions from 'src/shared/actions/globalHeaderActions';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';

const sinon = sinonModule.sandbox.create();

describe('withHideGlobalHeader HOC', () => {
  let hideGlobalHeaderStub;
  let resetGlobalHeaderStub;

  beforeEach(() => {
    hideGlobalHeaderStub = sinon.stub(GlobalHeaderActions, 'hideGlobalHeader');
    resetGlobalHeaderStub = sinon.stub(GlobalHeaderActions, 'resetGlobalHeader');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call global header action to hide the global header', () => {
    createComponent();
    expect(hideGlobalHeaderStub).to.be.called;
  });

  it('should call global header action to reset global header', () => {
    const component = createComponent();

    component.unmount();

    expect(resetGlobalHeaderStub).to.be.called;
  });

  const createComponent = (state = {}) => {
    const store = { ...mockStore(state), subscribe: () => {} };
    const WithHideGlobalHeader = withHideGlobalHeader(() => <div />);

    return mount(
      <Provider store={store}>
        <WithHideGlobalHeader />
      </Provider>
    );
  };
});
