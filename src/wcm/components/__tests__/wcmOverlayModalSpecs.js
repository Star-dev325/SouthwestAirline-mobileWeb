import _ from 'lodash';
import WcmOverlayModal from 'src/wcm/components/wcmOverlayModal';
import { mount } from 'enzyme';
import React from 'react';
import { sandbox } from 'sinon';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { Provider } from 'react-redux';

describe('WcmOverlayModal', () => {
  const sinon = sandbox.create();
  const TITLE = 'Learn more about SWABIZ';
  let onDoneStub;
  let component;

  beforeEach(() => {
    onDoneStub = sinon.stub();
    component = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when performing modal actions', () => {
    it('should call done callback function', () => {
      click(component.find('.wcm-overlay-modal .action-bar-buttons .button'));
      expect(onDoneStub).to.have.been.called;
    });

    it('should not load page header if isWebView is true', () => {
      component = createComponent({ isWebView: true });
      expect(component.find('PageHeaderWithButtons')).to.have.props({ hidden: true });
    });

    it('should load page header if isWebView is false', () => {
      expect(component.find('PageHeaderWithButtons')).to.have.props({ hidden: false });
    });
  });

  function createComponent(props = {}) {
    const defaultProps = {
      isWebView: false,
      onDone: onDoneStub,
      overlay: {
        title: TITLE,
        body: []
      },
      doneLabel: 'Done'
    };

    return mount(
      <Provider store={createMockedFormStore()}>
        <WcmOverlayModal {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  }
});
