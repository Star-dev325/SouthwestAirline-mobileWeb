import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('alternativeFormsOfPayment');

const types = {
  sync: ['SAVE_FORM_DATA', 'INTEGRATION_FAILED', 'RESET_AVAILABILITY'],
  async: [
    'FETCH_AVAILABILITY',
    'UPDATE_AVAILABILITY',
    'INITIATE_PAYMENT',
    'RETRIEVE_PARAMS',
    'RELOAD_AND_SUBMIT',
    'CONFIRM',
    'SEND_ERROR'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);
