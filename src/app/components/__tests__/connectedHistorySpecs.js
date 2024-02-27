import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import proxyquire from 'proxyquire';

const sinon = sinonModule.sandbox.create();

describe('ConnectedHistory', () => {
  let pushStub;
  let replaceStub;
  let ConnectedHistory;

  beforeEach(() => {
    ({ ConnectedHistory } = proxyquire('src/app/components/connectedHistory', {
      'connected-react-router': {
        ConnectedRouter: (props) => props.children
      }
    }));
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render children components', () => {
    const Component = createComponent();

    expect(Component.find('div')).to.exist;
  });

  it('should trigger saveHistoryChange action', () => {
    const saveHistoryChangeStub = sinon.stub();

    createComponent({
      saveHistoryChangeFn: saveHistoryChangeStub
    });

    expect(saveHistoryChangeStub).to.have.been.calledOnce;
  });

  function createComponent(props = {}) {
    pushStub = sinon.stub();
    replaceStub = sinon.stub();

    const defaultProps = {
      history: {
        push: pushStub,
        replace: replaceStub
      },
      saveHistoryChangeFn: () => {},
      persistentHistory: [],
      addHistoryForceRedirectFn: () => {}
    };

    return mount(
      <ConnectedHistory {..._.merge({}, defaultProps, props)}>
        <div>children</div>
      </ConnectedHistory>
    );
  }
});
