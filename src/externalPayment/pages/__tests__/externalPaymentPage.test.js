jest.mock('react', () => ({
  ...jest.requireActual('react'),
  createRef: jest.fn(() => ({ current: {} }))
}));
jest.mock('src/shared/helpers/wcmTransitionHelper', () => jest.fn());
jest.mock('src/shared/helpers/pathUtils', () => ({
  buildPathWithParamAndQuery: jest.fn(),
  transformSearchToQuery: jest.fn(() => ({}))
}));
jest.mock('src/shared/api/loggingApi', () => ({ sendErrorLog: jest.fn() }));
jest.mock('src/shared/transformers/alternativeFormsOfPaymentTransformer', () => ({
  toCeptorErrorLog: jest.fn(() => ({ error: 'error' }))
}));
jest.mock('src/externalPayment/helpers/externalPaymentPageHelper', () => ({
  hasValidExternalPaymentRedirectUrl: jest.fn(),
  toExternalPaymentPageError: jest.fn()
}));
jest.mock('src/shared/routeUtils/routeStateHelper', () => ({ getPrevRouteState: jest.fn() }));
jest.mock('src/shared/bootstrap/urls', () => ({
  externalPaymentDeepLinkUrl: '/deepLinkUrl',
  externalPaymentIOSCustomSchemePrefix: 'customSchemePrefix://',
  externalPaymentAndroidCustomSchemePrefix: 'customschemeprefix://'
}));

import React from 'react';
import _ from 'lodash';
import { fireEvent, render } from '@testing-library/react';
import { ExternalPaymentPage } from 'src/externalPayment/pages/externalPaymentPage';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { buildPathWithParamAndQuery, transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import {
  hasValidExternalPaymentRedirectUrl,
  toExternalPaymentPageError
} from 'src/externalPayment/helpers/externalPaymentPageHelper';
import { getPrevRouteState } from 'src/shared/routeUtils/routeStateHelper';
import {
  getCeptorConfig,
  getCeptorConfigWithEmptyUpliftConfig,
  getEmptyCeptorCallbackResponse
} from 'test/builders/model/ceptorBuilder';
import { INITIAL_AVAILABILITY, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';

describe('ExternalPaymentPage', () => {
  const errorLog = { error: 'error' };
  let completeExternalPaymentFnStub;
  let goBackStub;
  let hideDialogFnStub;
  let initiateExternalPaymentMethodFnStub;
  let setDisplayButtonStub;
  let setUpExternalPaymentPageFnStub;
  let showDialogFnStub;

  const ceptorConfig = getCeptorConfig();

  beforeEach(() => {
    completeExternalPaymentFnStub = jest.fn();
    goBackStub = jest.fn();
    hideDialogFnStub = jest.fn(() => Promise.resolve('FAKE-ACTION'));
    initiateExternalPaymentMethodFnStub = jest.fn();
    setDisplayButtonStub = jest.fn();
    setUpExternalPaymentPageFnStub = jest.fn();
    showDialogFnStub = jest.fn(() => 'FAKE-ACTION');
    transformSearchToQuery.mockImplementation(() => ({}));

    jest.clearAllMocks();
  });

  describe('componentDidMount', () => {
    it('should call setUpExternalPaymentPageFn', () => {
      transformSearchToQuery.mockImplementation(() => ({
        provider: 'provider',
        paymentMethod: 'paymentMethod',
        persistenceIdentifier: 'uuid'
      }));

      createComponent({
        location: {
          search: '?persistenceIdentifier=uuid&paymentMethod=paymentMethod&provider=provider'
        }
      });

      expect(setUpExternalPaymentPageFnStub).toHaveBeenCalledWith(
        ceptorConfig,
        [INITIAL_AVAILABILITY],
        'provider',
        'paymentMethod',
        'uuid',
        expect.anything()
      );
    });
  });

  describe('componentDidUpdate', () => {
    it('should call setUpExternalPaymentPageFn if newly available and requestedAFPParams defined', () => {
      const availability = { ...INITIAL_AVAILABILITY, paymentMethod: 'paymentMethod' };
      const updatedProps = {
        ...getDefaultProps(),
        paymentMethodAvailabilities: [{ ...availability, isAvailable: true }]
      };
      const { rerender } = createComponent({
        location: {
          search: '?persistenceIdentifier=uuid&paymentMethod=paymentMethod&provider=provider'
        },
        paymentMethodAvailabilities: [availability]
      });

      transformSearchToQuery.mockImplementation(() => ({ provider: 'provider', paymentMethod: 'paymentMethod' }));

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(initiateExternalPaymentMethodFnStub).toHaveBeenCalledWith(
        ceptorConfig,
        ceptorConfig.requestedAFPParams,
        'provider',
        'paymentMethod'
      );
    });

    it('should not call setUpExternalPaymentPageFn if not available', () => {
      const { rerender } = createComponent({
        location: {
          search: '?persistenceIdentifier=uuid&paymentMethod=paymentMethod&provider=provider'
        }
      });
      const updatedProps = {
        ...getDefaultProps(),
        paymentMethodAvailabilities: [{ ...INITIAL_AVAILABILITY, paymentMethod: 'paymentMethod' }]
      };

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(initiateExternalPaymentMethodFnStub).not.toHaveBeenCalled();
    });

    it('should not call setUpExternalPaymentPageFn if paymentMethod not in list', () => {
      const { rerender } = createComponent({
        location: {
          search: '?persistenceIdentifier=uuid&paymentMethod=paymentMethod&provider=provider'
        }
      });
      const updatedProps = {
        ...getDefaultProps(),
        paymentMethodAvailabilities: [
          {
            ...INITIAL_AVAILABILITY,
            isAvailable: true,
            paymentMethod: 'badPaymentMethod'
          }
        ]
      };

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(initiateExternalPaymentMethodFnStub).not.toHaveBeenCalled();
    });

    it('should not call setUpExternalPaymentPageFn if requestedAFPParams undefined', () => {
      const { rerender } = createComponent({
        location: {
          search: '?persistenceIdentifier=uuid&paymentMethod=paymentMethod&provider=provider'
        }
      });
      const updatedProps = {
        ...getDefaultProps(),
        paymentMethodAvailabilities: [
          {
            ...INITIAL_AVAILABILITY,
            isAvailable: true,
            paymentMethod: 'paymentMethod'
          }
        ],
        requestedAFPParams: undefined
      };

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(initiateExternalPaymentMethodFnStub).not.toHaveBeenCalled();
    });

    it('should not call setUpExternalPaymentPageFn if previously available', () => {
      const { rerender } = createComponent({
        location: {
          search: '?persistenceIdentifier=uuid&paymentMethod=paymentMethod&provider=provider'
        },
        paymentMethodAvailabilities: [
          {
            ...INITIAL_AVAILABILITY,
            isAvailable: true
          }
        ]
      });
      const updatedProps = {
        ...getDefaultProps(),
        paymentMethodAvailabilities: [
          {
            ...INITIAL_AVAILABILITY,
            isAvailable: true,
            paymentMethod: 'paymentMethod'
          }
        ],
        requestedAFPParams: undefined
      };

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(initiateExternalPaymentMethodFnStub).not.toHaveBeenCalled();
    });

    it('should call setDisplayButtonFn if displayButton is false and availability is unavailable but has payment method', () => {
      const { rerender } = createComponent({ displayButton: false });
      const updatedProps = {
        ...getDefaultProps(),
        displayButton: false,
        paymentMethodAvailabilities: [
          {
            ...INITIAL_AVAILABILITY,
            paymentMethod: 'paymentMethod'
          }
        ]
      };

      transformSearchToQuery.mockImplementation(() => ({ provider: 'provider', paymentMethod: 'paymentMethod' }));

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(setDisplayButtonStub).toHaveBeenCalledWith(true);
    });

    it('should not call setDisplayButtonFn if displayButton is true', () => {
      const { rerender } = createComponent({ displayButton: false });
      const updatedProps = { ...getDefaultProps(), displayButton: true };

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(setDisplayButtonStub).not.toHaveBeenCalled();
    });

    it('should not call setDisplayButtonFn if availability is available', () => {
      const { rerender } = createComponent({ displayButton: false });
      const updatedProps = {
        ...getDefaultProps(),
        paymentMethodAvailabilities: [
          {
            ...INITIAL_AVAILABILITY,
            isAvailable: true,
            paymentMethod: 'paymentMethod'
          }
        ]
      };

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(setDisplayButtonStub).not.toHaveBeenCalled();
    });

    it('should not call setDisplayButtonFn if availability paymentMethod is empty', () => {
      const { rerender } = createComponent({ displayButton: false });
      const updatedProps = { ...getDefaultProps(), paymentMethodAvailabilities: [INITIAL_AVAILABILITY] };

      rerender(<ExternalPaymentPage {...updatedProps} />);

      expect(setDisplayButtonStub).not.toHaveBeenCalled();
    });
  });

  describe('snapshots', () => {
    it('should render correct button text when token unavailable', () => {
      expect(createComponent()).toMatchSnapshot();
    });

    it('should render correct button text when token available', () => {
      expect(
        createComponent({
          tokenAvailability: {
            isAvailable: true
          }
        })
      ).toMatchSnapshot();
    });

    it('should render correct div id when paymentMethodConfigParams present for paymentMethod', () => {
      transformSearchToQuery.mockImplementation(() => ({ provider: 'UPLIFT', paymentMethod: 'PayMonthly' }));

      expect(
        createComponent({
          ceptorConfig: getCeptorConfigWithEmptyUpliftConfig(),
          location: {
            search: '?persistenceIdentifier=uuid&paymentMethod=PayMonthly&provider=UPLIFT'
          }
        })
      ).toMatchSnapshot();
    });

    it('should render empty div id when paymentMethodConfigParams present for paymentMethod', () => {
      expect(
        createComponent({
          tokenAvailability: {
            isAvailable: true
          }
        })
      ).toMatchSnapshot();
    });

    it('should render button if iframe loaded', () => {
      React.createRef.mockImplementationOnce(() => ({ current: { children: ['children'] } }));

      expect(
        createComponent({
          displayButton: false
        })
      ).toMatchSnapshot();
    });

    it('should not render button if iframe not loaded and display button is false', () => {
      React.createRef.mockImplementationOnce(() => ({ current: { children: [] } }));
      expect(
        createComponent({
          displayButton: false
        })
      ).toMatchSnapshot();
    });

    it('should not render button if iframe not loaded and display button is false and ref is undefined', () => {
      React.createRef.mockImplementationOnce(() => undefined);
      expect(
        createComponent({
          displayButton: false
        })
      ).toMatchSnapshot();
    });
  });

  describe('_callbackFn', () => {
    it('should call completeExternalPaymentFn when payment method is uplift and successful response', () => {
      const response = _.merge({}, getEmptyCeptorCallbackResponse(), {
        paymentMethod: PAYMENT_METHODS.UPLIFT,
        code: '201'
      });

      createComponent();

      const callbackFn = setUpExternalPaymentPageFnStub.mock.calls[0][5];

      callbackFn(response);

      expect(completeExternalPaymentFnStub).toHaveBeenCalled;
    });

    it('should call setDisplayButton when payment method is uplift and has error', () => {
      const response = _.merge({}, getEmptyCeptorCallbackResponse(), {
        paymentMethod: PAYMENT_METHODS.UPLIFT,
        code: '450'
      });

      createComponent();

      executeCallbackFn(response);

      expect(sendErrorLog).toHaveBeenCalledWith(errorLog);
      expect(completeExternalPaymentFnStub).not.toHaveBeenCalled();
      expect(setDisplayButtonStub).toHaveBeenCalledWith(true);
    });

    it('should call setDisplayButton when payment method is unmatched and has error', () => {
      const response = _.merge({}, getEmptyCeptorCallbackResponse(), {
        code: '450'
      });

      createComponent();

      executeCallbackFn(response);

      expect(sendErrorLog).toHaveBeenCalledWith(errorLog);
      expect(completeExternalPaymentFnStub).not.toHaveBeenCalled();
      expect(setDisplayButtonStub).toHaveBeenCalledWith(true);
    });

    it('should call logging api when there is an error and any payment method', () => {
      const response = _.merge({}, getEmptyCeptorCallbackResponse(), {
        paymentMethod: 'FAKE_PAYMENT_METHOD',
        code: '450'
      });

      createComponent();

      executeCallbackFn(response);

      expect(sendErrorLog).toHaveBeenCalledWith(errorLog);
      expect(completeExternalPaymentFnStub).not.toHaveBeenCalled();
    });

    it('should not call completeExternalPayment or setDisplayButton when payment method is Apple Pay and there is an error', () => {
      const response = _.merge({}, getEmptyCeptorCallbackResponse(), {
        paymentMethod: PAYMENT_METHODS.APPLE_PAY,
        code: '450'
      });

      createComponent();

      executeCallbackFn(response);

      expect(sendErrorLog).toHaveBeenCalledWith(errorLog);
      expect(completeExternalPaymentFnStub).not.toHaveBeenCalled();
      expect(setDisplayButtonStub).not.toHaveBeenCalled();
    });
  });

  describe('_handleCompleteButtonClick', () => {
    it('should call transformSearchToQuery with search', () => {
      const { container } = createComponent();

      hasValidExternalPaymentRedirectUrl.mockImplementationOnce(() => true);

      clickExternalPaymentButton(container);

      expect(transformSearchToQuery).toHaveBeenCalledWith('search');
    });

    it('should call wcmTransitionTo with correct params', () => {
      const { container } = createComponent();

      hasValidExternalPaymentRedirectUrl.mockImplementationOnce(() => true);
      transformSearchToQuery.mockImplementationOnce(() => ({
        paymentMethod: 'paymentMethod',
        redirectUrl: 'redirectUrl'
      }));
      buildPathWithParamAndQuery.mockImplementationOnce(() => 'target');

      clickExternalPaymentButton(container);

      expect(hasValidExternalPaymentRedirectUrl).toHaveBeenCalledWith('redirectUrl', []);
      expect(buildPathWithParamAndQuery).toHaveBeenCalledWith('redirectUrl', null, {
        tokenAvailable: false,
        paymentMethod: 'paymentMethod'
      });
      expect(wcmTransitionTo).toHaveBeenCalledWith({
        linkType: WcmLinkTypes.BROWSER,
        target: 'target',
        useWebViewLinkType: true
      });
    });

    it('should call wcmTransitionTo with correct params and deep link url when webView and channel is not ios', () => {
      const updatedAFPParams = { ...ceptorConfig.requestedAFPParams, channel: 'android' };
      const { container } = createComponent({ requestedAFPParams: updatedAFPParams, isWebView: true });

      transformSearchToQuery.mockImplementationOnce(() => ({
        paymentMethod: 'paymentMethod',
        redirectUrl: 'redirectUrl'
      }));
      buildPathWithParamAndQuery.mockImplementationOnce(() => 'target');

      clickExternalPaymentButton(container);

      expect(hasValidExternalPaymentRedirectUrl).toNotHaveBeenCalled;
      expect(buildPathWithParamAndQuery).toHaveBeenCalledWith('customschemeprefix://deepLinkUrl', null, {
        tokenAvailable: false,
        paymentMethod: 'paymentMethod'
      });
      expect(wcmTransitionTo).toHaveBeenCalledWith({
        linkType: WcmLinkTypes.BROWSER,
        target: 'target',
        useWebViewLinkType: true
      });
    });

    it('should call wcmTransitionTo with correct params and deep link url when webView and channel is ios', () => {
      const updatedAFPParams = { ...ceptorConfig.requestedAFPParams, channel: 'ios' };
      const { container } = createComponent({ requestedAFPParams: updatedAFPParams, isWebView: true });

      transformSearchToQuery.mockImplementationOnce(() => ({
        paymentMethod: 'paymentMethod',
        redirectUrl: 'redirectUrl'
      }));
      buildPathWithParamAndQuery.mockImplementationOnce(() => 'target');

      clickExternalPaymentButton(container);

      expect(buildPathWithParamAndQuery).toHaveBeenCalledWith('customSchemePrefix://deepLinkUrl', null, {
        tokenAvailable: false,
        paymentMethod: 'paymentMethod'
      });
      expect(wcmTransitionTo).toHaveBeenCalledWith({
        linkType: WcmLinkTypes.BROWSER,
        target: 'target',
        useWebViewLinkType: true
      });
    });

    it('should call wcmTransitionTo with correct params and deep link url when webView and channel is unmatched', () => {
      const updatedAFPParams = { ...ceptorConfig.requestedAFPParams, channel: 'mweb' };
      const { container } = createComponent({
        requestedAFPParams: updatedAFPParams,
        isWebView: true
      });

      transformSearchToQuery.mockImplementationOnce(() => ({
        paymentMethod: 'paymentMethod',
        redirectUrl: 'redirectUrl'
      }));
      buildPathWithParamAndQuery.mockImplementationOnce(() => 'target');

      clickExternalPaymentButton(container);

      expect(buildPathWithParamAndQuery).toHaveBeenCalledWith('/deepLinkUrl', null, {
        tokenAvailable: false,
        paymentMethod: 'paymentMethod'
      });
      expect(wcmTransitionTo).toHaveBeenCalledWith({
        linkType: WcmLinkTypes.BROWSER,
        target: 'target',
        useWebViewLinkType: true
      });
    });

    it('should call wcmTransitionTo with correct params when tokenAvailable', () => {
      const { container } = createComponent({ tokenAvailability: { isAvailable: true } });

      hasValidExternalPaymentRedirectUrl.mockImplementationOnce(() => true);
      transformSearchToQuery.mockImplementationOnce(() => ({
        paymentMethod: 'paymentMethod',
        redirectUrl: 'redirectUrl'
      }));
      buildPathWithParamAndQuery.mockImplementationOnce(() => 'target');

      clickExternalPaymentButton(container);

      expect(buildPathWithParamAndQuery).toHaveBeenCalledWith('redirectUrl', null, {
        tokenAvailable: true,
        paymentMethod: 'paymentMethod'
      });
      expect(wcmTransitionTo).toHaveBeenCalledWith({
        linkType: WcmLinkTypes.BROWSER,
        target: 'target',
        useWebViewLinkType: true
      });
    });

    it('should call sendErrorLog and showDialogFn when redirectUrl is invalid and not in webView', () => {
      const { container } = createComponent({});

      toExternalPaymentPageError.mockImplementationOnce(() => 'errorLog');
      hasValidExternalPaymentRedirectUrl.mockImplementationOnce(() => false);
      transformSearchToQuery.mockImplementationOnce(() => ({
        paymentMethod: 'paymentMethod',
        redirectUrl: 'redirectUrl'
      }));
      buildPathWithParamAndQuery.mockImplementationOnce(() => 'target');

      clickExternalPaymentButton(container);

      expect(toExternalPaymentPageError).toHaveBeenCalledWith('redirectUrl');
      expect(sendErrorLog).toHaveBeenCalledWith('errorLog');
      expect(showDialogFnStub).toHaveBeenCalledWith({
        name: 'external-payment-redirect-error',
        title: 'REDIRECT_ERROR_POPUP',
        verticalLinks: {
          links: [
            {
              label: 'REDIRECT_ERROR_BUTTON_TEXT',
              dataQa: 'return-to-southwest-button',
              onClick: expect.anything()
            }
          ]
        }
      });
      expect(buildPathWithParamAndQuery).not.toHaveBeenCalled();
      expect(wcmTransitionTo).not.toHaveBeenCalled();
    });

    it('should trigger redirect when pop up link is clicked', async () => {
      const { container } = createComponent({});

      toExternalPaymentPageError.mockImplementationOnce(() => 'errorLog');
      hasValidExternalPaymentRedirectUrl.mockImplementationOnce(() => false);
      transformSearchToQuery.mockImplementationOnce(() => ({
        paymentMethod: 'paymentMethod',
        redirectUrl: 'redirectUrl'
      }));
      buildPathWithParamAndQuery.mockImplementationOnce(() => 'target');
      getPrevRouteState.mockImplementationOnce(() => ({ pathname: 'prevRoute' }));

      clickExternalPaymentButton(container);

      await showDialogFnStub.mock.calls[0][0].verticalLinks.links[0].onClick();

      expect(hideDialogFnStub).toHaveBeenCalled();
      expect(goBackStub).toHaveBeenCalled();
    });
  });

  const getDefaultProps = () => ({
    afpAvailability: INITIAL_AVAILABILITY,
    ceptorConfig,
    completeExternalPaymentFn: completeExternalPaymentFnStub,
    displayButton: true,
    externalPaymentRedirectUrlWhitelist: [],
    goBack: goBackStub,
    hideDialogFn: hideDialogFnStub,
    initiateExternalPaymentMethodFn: initiateExternalPaymentMethodFnStub,
    isWebView: false,
    location: {
      search: 'search'
    },
    paymentMethodAvailabilities: [INITIAL_AVAILABILITY],
    requestedAFPParams: ceptorConfig.requestedAFPParams,
    setDisplayButtonFn: setDisplayButtonStub,
    setUpExternalPaymentPageFn: setUpExternalPaymentPageFnStub,
    showDialogFn: showDialogFnStub,
    tokenAvailability: {
      isAvailable: false
    }
  });

  const createComponent = (props = {}) => {
    const defaultProps = getDefaultProps();

    return render(<ExternalPaymentPage {..._.merge({}, defaultProps, props)} />);
  };

  const executeCallbackFn = (response) => {
    const callbackFn = setUpExternalPaymentPageFnStub.mock.calls[0][5];

    callbackFn(response);
  };

  const clickExternalPaymentButton = (container) => {
    const button = container.querySelector('.external-payment-btn');

    fireEvent.click(button);
  };
});
