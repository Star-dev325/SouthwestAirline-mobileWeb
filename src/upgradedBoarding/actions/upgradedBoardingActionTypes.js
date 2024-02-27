import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('upgradedBoarding');

const types = {
  sync: [
    'RESET_COUNTDOWN_TIMESTAMP',
    'RESET_PAYMENT_INFO',
    'RESET_UPGRADED_BOARDING_FLOW_DATA',
    'SAVE_COUNTDOWN_TIMESTAMP',
    'SAVE_MONEY_TOTAL',
    'SAVE_PAYMENT_INFO'
  ],
  async: [
    'FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS',
    'FETCH_PURCHASE_PAGE_PLACEMENTS',
    'FETCH_RESERVATION',
    'CANCEL_RESERVATION',
    'FETCH_PURCHASE',
    'UPGRADED_BOARDING__CANCEL_RESERVATION'
  ]
};

export const apiActionCreator = createApiActions;
export default createTypes(types);
