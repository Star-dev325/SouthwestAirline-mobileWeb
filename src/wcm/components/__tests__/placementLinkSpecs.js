import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import PlacementLink from 'src/wcm/components/placementLink';

const sinon = sandbox.create();

context('PlacementLink', () => {
  let onClickStub;
  let handlePlacementLinkFnStub;

  beforeEach(() => {
    onClickStub = sinon.stub();
    handlePlacementLinkFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render PlacementLink with children', () => {
    const wrapper = createComponent({
      children: <div />
    });
    const placementLinkProps = wrapper.find('PlacementLink').props();

    expect(_.omit(placementLinkProps, 'onClick', 'handlePlacementLinkFn', 'children')).to.deep.equal({
      target: 'default',
      linkType: 'none',
      isChaseCombo: false,
      isChasePlacement: false,
      referrer: '',
      contentBlockId: '',
      shouldRaiseSatelliteEvent: false,
      className: null,
      actionToDispatch: undefined,
      actionParams: undefined,
      pageId: undefined
    });
    expect(placementLinkProps.children).to.not.be.null;
  });

  context('onClick', () => {
    it('should call onClick prop', () => {
      const wrapper = createComponent();

      wrapper.find('[data-qa="placement-link"]').simulate('click');

      expect(onClickStub).to.have.been.called;
      expect(handlePlacementLinkFnStub).to.have.been.calledWith({
        target: 'default',
        linkType: 'none',
        isChaseCombo: false,
        isChasePlacement: false,
        referrer: '',
        contentBlockId: '',
        shouldRaiseSatelliteEvent: false,
        actionToDispatch: undefined,
        actionParams: undefined,
        pageId: undefined
      });
    });

    context('target', () => {
      it('should use target when available', () => {
        const wrapper = createComponent({
          target: 'target'
        });

        wrapper.find('[data-qa="placement-link"]').simulate('click');

        expect(onClickStub).to.have.been.called;
        expect(handlePlacementLinkFnStub).to.have.been.calledWith({
          target: 'target',
          linkType: 'none',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          contentBlockId: '',
          shouldRaiseSatelliteEvent: false,
          actionToDispatch: undefined,
          actionParams: undefined,
          pageId: undefined
        });
      });

      it('should use href when target unavailable', () => {
        const wrapper = createComponent({
          target: '',
          href: 'href'
        });

        wrapper.find('[data-qa="placement-link"]').simulate('click');

        expect(onClickStub).to.have.been.called;
        expect(handlePlacementLinkFnStub).to.have.been.calledWith({
          target: 'href',
          linkType: 'none',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          contentBlockId: '',
          shouldRaiseSatelliteEvent: false,
          actionToDispatch: undefined,
          actionParams: undefined,
          pageId: undefined
        });
      });

      it('should use default value when target and href unavailable', () => {
        const wrapper = createComponent({
          target: '',
          href: ''
        });

        wrapper.find('[data-qa="placement-link"]').simulate('click');

        expect(onClickStub).to.have.been.called;
        expect(handlePlacementLinkFnStub).to.have.been.calledWith({
          target: '',
          linkType: 'none',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          contentBlockId: '',
          shouldRaiseSatelliteEvent: false,
          actionToDispatch: undefined,
          actionParams: undefined,
          pageId: undefined
        });
      });
    });

    context('linkType', () => {
      it('should use linkType when available', () => {
        const wrapper = createComponent({
          linkType: 'none'
        });

        wrapper.find('[data-qa="placement-link"]').simulate('click');

        expect(onClickStub).to.have.been.called;
        expect(handlePlacementLinkFnStub).to.have.been.calledWith({
          target: 'default',
          linkType: 'none',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          contentBlockId: '',
          shouldRaiseSatelliteEvent: false,
          actionToDispatch: undefined,
          actionParams: undefined,
          pageId: undefined
        });
      });

      it('should use placementData linkType when linkType unavailable', () => {
        const wrapper = createComponent({
          linkType: null,
          placementData: {
            linkType: 'webview'
          }
        });

        wrapper.find('[data-qa="placement-link"]').simulate('click');

        expect(onClickStub).to.have.been.called;
        expect(handlePlacementLinkFnStub).to.have.been.calledWith({
          target: 'default',
          linkType: 'webview',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          contentBlockId: '',
          shouldRaiseSatelliteEvent: false,
          actionToDispatch: undefined,
          actionParams: undefined,
          pageId: undefined
        });
      });

      it('should use default value when linkType and placementData linkType unavailable', () => {
        const wrapper = createComponent({
          linkType: null,
          placementData: {
            linkType: null
          }
        });

        wrapper.find('[data-qa="placement-link"]').simulate('click');

        expect(onClickStub).to.have.been.called;
        expect(handlePlacementLinkFnStub).to.have.been.calledWith({
          target: 'default',
          linkType: 'none',
          isChaseCombo: false,
          isChasePlacement: false,
          referrer: '',
          contentBlockId: '',
          shouldRaiseSatelliteEvent: false,
          actionToDispatch: undefined,
          actionParams: undefined,
          pageId: undefined
        });
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      children: null,
      className: null,
      target: 'default',
      linkType: 'none',
      isChaseCombo: false,
      isChasePlacement: false,
      referrer: '',
      onClick: onClickStub,
      handlePlacementLinkFn: handlePlacementLinkFnStub,
      contentBlockId: '',
      shouldRaiseSatelliteEvent: false,
      actionToDispatch: undefined,
      actionParams: undefined,
      pageId: undefined
    };
    const finalProps = _.merge({}, defaultProps, props);
    const store = createMockStoreWithRouterMiddleware()();

    return mount(
      <Provider store={store}>
        <PlacementLink {...finalProps} />
      </Provider>
    );
  };
});
