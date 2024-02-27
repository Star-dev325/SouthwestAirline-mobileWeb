import { sandbox } from 'sinon';
import _ from 'lodash';
import { initializeChatBot, initESW } from 'src/homeAndNav/helpers/salesforceChatHelper';

const sinon = sandbox.create();

describe('SalesforceChatHelper', () => {
  afterEach(() => {
    sinon.restore();

    const bodyTags = window.document.getElementsByTagName('body');
    const scriptTags = window.document.getElementsByTagName('script');

    if (scriptTags.length > 0) _.forEach(scriptTags, (script) => bodyTags[0].removeChild(script));
  });

  context('if window.embedded_svc exists', () => {
    it('should not append extra salesforce script to the body', () => {
      window.embedded_svc = {
        settings: {},
        init: () => {}
      };
      initializeChatBot();

      const scriptTags = window.document.getElementsByTagName('script');

      expect(scriptTags).to.have.lengthOf(0);
    });

    it('should set window.embedded_svc.settings correctly', () => {
      initESW('mock');

      expect(window.embedded_svc.settings).to.deep.equal({
        chatbotAvatarImgURL: 'https://www.southwest.com/swa-resources/images/logos/chatbotlogo.png',
        avatarImgURL: 'https://www.southwest.com/swa-resources/images/logos/chatbotlogo.png',
        displayHelpButton: false,
        language: '',
        enabledFeatures: ['LiveAgent'],
        entryFeature: 'LiveAgent'
      });
    });

    it('should initialize the chat bot', () => {
      const initStub = sinon.stub(window.embedded_svc, 'init');

      initializeChatBot();

      expect(initStub).to.be.called;
    });
  });
  context('if window.embedded_svc is falsy', () => {
    it('should append extra salesforce script to the body', () => {
      window.embedded_svc = null;
      initializeChatBot();

      const scriptTags = window.document.getElementsByTagName('script');

      expect(scriptTags).to.have.lengthOf(1);
    });
  });
});
