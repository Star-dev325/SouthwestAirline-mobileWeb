import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('webView');

/*
  Actions with the 'HANDLE_' prefix are dispatched when receiving messages from the native apps
  Actions with the 'SEND_' prefix are dispatched when sending messages to the native apps
  Actions with the 'SET_' prefix are dispatched to set redux state
*/
const types = {
  sync: [
    'HANDLE_APPLE_PAY',
    'HANDLE_AUTH_EVENT',
    'HANDLE_DEEP_LINK_CONTINUE',
    'HANDLE_EXTERNAL_PAYMENT_AUTHORIZED',
    'HANDLE_OAUTH',
    'HANDLE_PAYPAL_AUTH',
    'HANDLE_ROUTE_CHANGE',
    'SEND_CHASE_SESSION',
    'SEND_DISPLAY_APP_REVIEW',
    'SEND_DISPLAY_LOGIN',
    'SEND_ENABLE_NAVIGATION_CONTROLS',
    'SEND_EXIT',
    'SEND_SHARE_FLIGHT_STATUS_DETAILS',
    'SET_ADOBE_ID',
    'SET_IS_NOT_WEB_VIEW',
    'SET_IS_WEB_VIEW',
    'SET_DEVICE_TYPE',
    'SET_SHARE_FLIGHT_STATUS',
    'SET_UPGRADE_TYPE',
    'SET_WEB_VIEW_CHANNEL'
  ],
  async: ['UPDATE_ACCOUNT']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);
