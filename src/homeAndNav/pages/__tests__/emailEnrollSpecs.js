import React from 'react';
import proxyquire from 'proxyquire';
import sinonModule from 'sinon';
import { mount } from 'enzyme';

import { mockErrorHeaderContainer } from 'test/unit/helpers/testUtils';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

const sinon = sinonModule.sandbox.create();

describe('#clickSave', () => {
  let clickSave;

  beforeEach(() => {
    mockErrorHeaderContainer(sinon);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('components', () => {
    it('should render header message', () => {
      clickSave = createComponent();
      const subHeader = clickSave.find('.email-enroll--sub-header');

      expect(subHeader).toMatchSnapshot();
    });

    it('should have footer contain link to privacy policy', () => {
      clickSave = createComponent();

      const footer = clickSave.find('.email-enroll--footer');

      expect(footer).to.be.present();
      expect(footer).to.contain.text('We will never sell or otherwise make available our mailing list to anyone.');
      expect(footer).to.contain.text('View privacy policy');
    });

    it('should render iframe use prop clickNSaveSignUpUrl', () => {
      clickSave = createComponent();

      const iframe = clickSave.find('iframe');

      expect(iframe).to.be.present();
      expect(iframe).to.have.attr('src', 'clickNSaveSignUpIframeUrl');
    });
  });

  const createComponent = (props = {}) => {
    const { EmailEnroll } = proxyquire('src/homeAndNav/pages/emailEnroll', {
      'src/shared/bootstrap/urls': {
        default: {
          clickNSaveSignUpIframeUrl: 'clickNSaveSignUpIframeUrl'
        }
      }
    });

    return mount(
      <Provider store={createMockStoreWithRouterMiddleware()()}>
        <EmailEnroll {...props} />
      </Provider>
    );
  };
});
