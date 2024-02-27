import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('chase');

const types = {
  sync: [
    'SAVE_CHASE_CUSTOMER_INFO',
    'UPDATE_CHASE_FLOW_COMPLETED',
    'SET_CHASE_BANNER_SHOWN',
    'SET_CHASE_CREDIT_STATUS',
    'SET_CHASE_EXISTING_CARD_MEMBER',
    'SET_SHOULD_RETRY_INSTANT_CREDITS_CALL',
    'RESET_CHASE_TEMPORARY_CARD',
    'RESET_CHASE_APPLICATION_INFO'
  ],
  async: ['CREATE_SESSION_FOR_CHASE', 'GET_APPLICATION_INFO', 'FETCH_APPLICATION_STATUS']
};

export const apiActionCreator = createApiActions;
export default createTypes(types);
