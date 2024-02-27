import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';

import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('PageHeaderWithButtons', () => {
  let wrapper;

  beforeEach(() => {
    mockErrorHeaderContainer(sinon);

    wrapper = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render title by props.title', () => {
    wrapper = createComponent({
      title: <span className="test-title">title</span>
    });

    expect(wrapper.find('span.test-title')).to.be.lengthOf(1);
  });

  it('should render data-qa by props.dataQa', () => {
    wrapper = createComponent({
      title: 'Test Title',
      dataQa: 'testDataQa'
    });

    expect(wrapper.find('.action-bar--main-title')).to.have.attr('data-qa', 'testDataQa');
  });

  it('should render subTitle by props.subTitle', () => {
    wrapper = createComponent({
      subTitle: <span className="test-sub-title">subTitle</span>
    });

    expect(wrapper.find('.test-sub-title')).to.have.lengthOf(1);
  });

  it('should render rightButtons by props.rightButtons', () => {
    wrapper = createComponent({
      rightButtons: [
        {
          name: 'Done',
          className: 'test-done-btn'
        },
        {
          name: 'Cancel',
          className: 'test-cancel-btn'
        }
      ]
    });

    const rightButtonsContainer = wrapper.find('.action-bar--right-buttons');

    expect(rightButtonsContainer.find('button.test-done-btn')).to.have.lengthOf(1);
    expect(rightButtonsContainer.find('button.test-cancel-btn')).to.have.lengthOf(1);
  });

  it('should render leftButtons by props.leftButtons', () => {
    wrapper = createComponent({
      leftButtons: [
        {
          name: 'Edit',
          className: 'test-edit-btn'
        },
        {
          name: 'Cancel',
          className: 'test-cancel-btn'
        }
      ]
    });

    const leftButtonsContainer = wrapper.find('.action-bar--left-buttons');

    expect(leftButtonsContainer.find('button.test-edit-btn')).to.have.lengthOf(1);
    expect(leftButtonsContainer.find('button.test-cancel-btn')).to.have.lengthOf(1);
  });

  context('title in center', () => {
    it('should show title in center when have props of showBackButton', () => {
      wrapper = createComponent({
        showBackButton: true,
        title: 'title'
      });

      expect(wrapper.find('.action-bar--title')).to.have.className('action-bar--title-align-center');
    });

    it('should show title in center when have props of leftButtons', () => {
      wrapper = createComponent({
        leftButtons: [
          {
            name: 'Edit',
            className: 'test-edit-btn'
          }
        ],
        title: 'title'
      });

      expect(wrapper.find('.action-bar--title')).to.have.className('action-bar--title-align-center');
    });

    it('should show title in center when titleInCenter property is true', () => {
      wrapper = createComponent({
        titleInCenter: true,
        title: 'title'
      });

      expect(wrapper.find('.action-bar--title')).to.have.className('action-bar--title-align-center');
    });
  });

  const createComponent = (props) => {
    const finalProps = _.merge(
      {},
      {
        rightButtons: [
          {
            name: 'Done'
          }
        ]
      },
      props
    );

    return mount(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <PageHeaderWithButtons {...finalProps} />
      </Provider>
    );
  };
});
