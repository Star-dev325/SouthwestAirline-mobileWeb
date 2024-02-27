import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { sandbox } from 'sinon';

import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import SubHeader from 'src/shared/components/subHeader';

const sinon = sandbox.create();

describe('SubHeader', () => {
  let wrapper;

  beforeEach(() => {
    mockErrorHeaderContainer(sinon);

    wrapper = mount(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <SubHeader title="test" />
      </Provider>
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should render page header', () => {
      expect(wrapper.find('PageHeader')).to.be.exist;
    });

    it('should render title test', () => {
      expect(wrapper.find('PageHeader')).to.have.text('test');
    });
  });
});
