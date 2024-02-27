import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import * as fullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { FullScreenModal } from 'src/shared/components/fullScreenModal/fullScreenModal';
import RouterStore from 'src/shared/stores/routerStore';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

describe('fullScreenModal', () => {
  let backFullScreenModalFnStub;
  let activateFullScreenModalFnStub;

  beforeEach(() => {
    sinon.stub(fullScreenModalHelper, 'hideFullScreenModal');
    backFullScreenModalFnStub = sinon.stub();
    activateFullScreenModalFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should show the fullScreen modal when active', () => {
    const fullScreenModal = createComponent({
      id: 'fullScreenModalId',
      activeId: 'fullScreenModalId',
      activeIdInURL: '?_modal=fullScreenModalId'
    });

    expect(fullScreenModal.find('Modal')).to.have.prop('isOpen', true);
  });

  it('should not show the fullScreen modal when not active', () => {
    const fullScreenModal = createComponent({
      id: 'fullScreenModalId',
      activeId: 'AnotherFullScreenModalId',
      activeIdInURL: ''
    });

    expect(fullScreenModal.find('Modal')).to.not.exist;
  });

  it('should not hide full screen modal when forbidReopen is true but is not browser back or forward', () => {
    sinon.stub(RouterStore, 'getCurrentState').returns({ action: 'push' });
    const fullScreenModal = createComponent({
      id: 'fullScreenModalId',
      activeId: 'AnotherFullScreenModalId',
      activeIdInURL: 'whatever_modal=fullScreenModalId'
    });

    fullScreenModal.setProps({ forbidReopen: true });

    expect(fullScreenModalHelper.hideFullScreenModal).to.have.not.been.called;
  });

  it('should hide full screen modal when forbidReopen is true and is browser back or forward', () => {
    sinon.stub(RouterStore, 'getCurrentState').returns({ action: 'pop' });
    const fullScreenModal = createComponent({
      id: 'fullScreenModalId',
      activeId: 'AnotherFullScreenModalId',
      activeIdInURL: 'whatever_modal=fullScreenModalId'
    });

    fullScreenModal.setProps({ forbidReopen: true });

    expect(fullScreenModalHelper.hideFullScreenModal).to.have.been.calledWith('fullScreenModalId');
  });

  const createComponent = (props) => {
    const defaultProps = {
      id: 'id',
      activeId: 'activeId',
      activeIdInURL: '?_modal=activeId',
      children: <div>childElement</div>,
      backFullScreenModalFn: backFullScreenModalFnStub,
      activateFullScreenModalFn: activateFullScreenModalFnStub
    };

    const finalProps = _.merge({}, defaultProps, props);

    return mount(<FullScreenModal {...finalProps} />);
  };
});
