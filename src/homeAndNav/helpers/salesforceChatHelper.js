import conf from 'src/shared/config/appConfig';

/* eslint-disable-next-line no-var */
export var initESW = function (gslbBaseURL) {
  const {
    CHATBOT_BASE_LIVE_AGENT_CONTENT_URL,
    CHATBOT_BASE_LIVE_AGENT_URL,
    CHATBOT_BUTTON_ID,
    CHATBOT_DEPLOYMENT_ID,
    CHATBOT_ESW_LIVE_AGENT_DEV_NAME,
    CHATBOT_ORG_ENDPOINT,
    CHATBOT_ORG_ID,
    CHATBOT_ORG_URL
  } = conf;
  const { embedded_svc } = window;

  embedded_svc.settings.displayHelpButton = false;
  embedded_svc.settings.language = '';
  embedded_svc.settings.chatbotAvatarImgURL = 'https://www.southwest.com/swa-resources/images/logos/chatbotlogo.png';
  embedded_svc.settings.avatarImgURL = 'https://www.southwest.com/swa-resources/images/logos/chatbotlogo.png';
  embedded_svc.settings.enabledFeatures = ['LiveAgent'];
  embedded_svc.settings.entryFeature = 'LiveAgent';

  embedded_svc.init(CHATBOT_ORG_URL, CHATBOT_ORG_ENDPOINT, gslbBaseURL, CHATBOT_ORG_ID, 'Mobile_Web', {
    baseLiveAgentContentURL: CHATBOT_BASE_LIVE_AGENT_CONTENT_URL,
    deploymentId: CHATBOT_DEPLOYMENT_ID,
    buttonId: CHATBOT_BUTTON_ID,
    baseLiveAgentURL: CHATBOT_BASE_LIVE_AGENT_URL,
    eswLiveAgentDevName: CHATBOT_ESW_LIVE_AGENT_DEV_NAME,
    isOfflineSupportEnabled: false
  });
};
/* eslint-disable-next-line no-var */
export var initializeChatBot = function () {
  if (!window.embedded_svc) {
    /* eslint-disable-next-line */
    var s = document.createElement('script');

    s.setAttribute('src', conf.CHATBOT_EMBEDDED_WINDOW_URL);
    s.onload = function () {
      initESW(null);
    };
    document.body && document.body.appendChild(s);
  } else {
    initESW('https://service.force.com');
  }
};
