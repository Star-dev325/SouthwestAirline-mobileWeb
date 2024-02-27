import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

import webViewReducer from 'src/shared/reducers/webViewReducer';

import { LOGIN_STATES } from 'src/shared/constants/webViewConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';

const { DATA_CHANNEL } = SharedConstants;

describe('WebViewReducer', () => {
  context('isWebView', () => {
    it('should set isWebView to true', () => {
      const action = { type: WebViewActionTypes.WEB_VIEW__SET_IS_WEB_VIEW };

      const state = webViewReducer(undefined, action);

      expect(state.isWebView).to.be.true;
    });

    it('should set isWebView to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.isWebView).to.be.false;
    });

    it('should set isWebView to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.isWebView).to.be.false;
    });
  });

  context('isReRoute', () => {
    it('should set isReRoute to true', () => {
      const action = {
        type: WebViewActionTypes.WEB_VIEW__SEND_EXIT,
        route: 'route'
      };

      const state = webViewReducer(undefined, action);

      expect(state.isReRoute).to.be.true;
    });

    it('should set isReRoute to false when no route is passed in', () => {
      const action = { type: WebViewActionTypes.WEB_VIEW__SEND_EXIT };

      const state = webViewReducer(undefined, action);

      expect(state.isReRoute).to.be.false;
    });

    it('should set isReRoute to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.isReRoute).to.be.false;
    });

    it('should set isReRoute to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.isReRoute).to.be.false;
    });
  });

  context('deviceType', () => {
    it('should set deviceType to passed in value', () => {
      const value = 'deviceType';
      const action = { type: WebViewActionTypes.WEB_VIEW__SET_DEVICE_TYPE, value };

      const state = webViewReducer(undefined, action);

      expect(state.deviceType).to.equal(value);
    });

    it('should set deviceType to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.deviceType).to.equal(DATA_CHANNEL);
    });

    it('should set deviceType to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.deviceType).to.equal(DATA_CHANNEL);
    });
  });

  context('webViewChannel', () => {
    it('should set webViewChannel to passed in value', () => {
      const value = 'channel';
      const action = { type: WebViewActionTypes.WEB_VIEW__SET_WEB_VIEW_CHANNEL, value };

      const state = webViewReducer(undefined, action);

      expect(state.webViewChannel).to.equal(value);
    });

    it('should set webViewChannel to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.webViewChannel).to.equal(null);
    });

    it('should set webViewChannel to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.webViewChannel).to.equal(null);
    });
  });

  context('adobeId', () => {
    it('should set adobeId to passed in value', () => {
      const value = 'adobeId';
      const action = { type: WebViewActionTypes.WEB_VIEW__SET_ADOBE_ID, value };

      const state = webViewReducer(undefined, action);

      expect(state.adobeId).to.equal(value);
    });

    it('should set adobeId to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.adobeId).to.equal(null);
    });

    it('should set deviceType to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.adobeId).to.equal(null);
    });
  });

  context('webViewLoginStatus', () => {
    it(`should set webViewLoginStatus to ${LOGIN_STATES.PENDING} for WEB_VIEW__SEND_DISPLAY_LOGIN`, () => {
      const action = { type: WebViewActionTypes.WEB_VIEW__SEND_DISPLAY_LOGIN };

      const state = webViewReducer(undefined, action);

      expect(state.webViewLoginStatus).to.equal(LOGIN_STATES.PENDING);
    });

    it('should set webViewLoginStatus to action response for WEB_VIEW__UPDATE_ACCOUNT_SUCCESS', () => {
      const response = 'response';
      const action = { type: WebViewActionTypes.WEB_VIEW__UPDATE_ACCOUNT_SUCCESS, response };

      const state = webViewReducer(undefined, action);

      expect(state.webViewLoginStatus).to.equal(response);
    });

    it('should set webViewLoginStatus to empty string for SHARED__ROUTE_CHANGED', () => {
      const action = { type: SharedActionTypes.SHARED__ROUTE_CHANGED };

      const state = webViewReducer(undefined, action);

      expect(state.webViewLoginStatus).to.equal('');
    });

    it('should set webViewLoginStatus to existing state for invalid action', () => {
      const existingState = { webViewLoginStatus: 'existingStatus' };
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(existingState, action);

      expect(state.webViewLoginStatus).to.equal(existingState.webViewLoginStatus);
    });

    it('should set webViewLoginStatus to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.webViewLoginStatus).to.equal('');
    });
  });

  context('shareFlightStatus', () => {
    it('should set shareFlightStatus to true when passed true', () => {
      const action = {
        type: WebViewActionTypes.WEB_VIEW__SET_SHARE_FLIGHT_STATUS,
        value: true
      };

      const state = webViewReducer(undefined, action);

      expect(state.shareFlightStatus).to.be.true;
    });

    it('should set shareFlightStatus to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.shareFlightStatus).to.be.false;
    });

    it('should set shareFlightStatus to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.shareFlightStatus).to.be.false;
    });
  });

  context('upgradeType', () => {
    it('should set upgradeType to passed in value', () => {
      const value = 'upgradeType';
      const action = { type: WebViewActionTypes.WEB_VIEW__SET_UPGRADE_TYPE, value };

      const state = webViewReducer(undefined, action);

      expect(state.upgradeType).to.equal(value);
    });

    it('should set upgradeType to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };
      const state = webViewReducer(undefined, action);

      expect(state.upgradeType).to.equal('');
    });

    it('should set upgradeType to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.upgradeType).to.equal('');
    });
  });

  context('webViewPayPalAuthorizedToken', () => {
    it('should set webViewPayPalAuthorizedToken to passed in token', () => {
      const token = 'token';
      const action = { type: WebViewActionTypes.WEB_VIEW__HANDLE_PAYPAL_AUTH, token };

      const state = webViewReducer(undefined, action);

      expect(state.webViewPayPalAuthorizedToken).to.equal(token);
    });

    it('should set webViewPayPalAuthorizedToken to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.webViewPayPalAuthorizedToken).to.equal('');
    });

    it('should set webViewPayPalAuthorizedToken to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.webViewPayPalAuthorizedToken).to.equal('');
    });
  });

  context('webViewPayPalAuthorizedToken', () => {
    it('should set webViewDeepLinkContinue to passed in value', () => {
      const value = true;
      const action = { type: WebViewActionTypes.WEB_VIEW__HANDLE_DEEP_LINK_CONTINUE, value };

      const state = webViewReducer(undefined, action);

      expect(state.webViewDeepLinkContinue).to.equal(value);
    });

    it('should set webViewDeepLinkContinue to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.webViewDeepLinkContinue).to.equal(false);
    });

    it('should set webViewDeepLinkContinue to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.webViewDeepLinkContinue).to.equal(false);
    });
  });

  context('webViewExternalPaymentAuthorizedSearchString', () => {
    it('should set webViewExternalPaymentAuthorizedSearchString to passed in value', () => {
      const value = 'queryString';
      const action = { type: WebViewActionTypes.WEB_VIEW__HANDLE_EXTERNAL_PAYMENT_AUTHORIZED, value };

      const state = webViewReducer(undefined, action);

      expect(state.webViewExternalPaymentAuthorizedSearchString).to.equal(value);
    });

    it('should set webViewExternalPaymentAuthorizedSearchString to default case for invalid action', () => {
      const action = { type: 'INVALID_ACTION' };

      const state = webViewReducer(undefined, action);

      expect(state.webViewExternalPaymentAuthorizedSearchString).to.equal(null);
    });

    it('should set webViewExternalPaymentAuthorizedSearchString to default case for undefined action', () => {
      const state = webViewReducer(undefined, undefined);

      expect(state.webViewExternalPaymentAuthorizedSearchString).to.equal(null);
    });
  });
});
