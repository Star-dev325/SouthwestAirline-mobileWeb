import i18n from '@swa-ui/locale';
import * as SharedActions from 'src/shared/actions/sharedActions';
import airChangeTypes from 'src/airChange/actions/airChangeActionTypes';
import sameDayTypes from 'src/sameDay/actions/sameDayActionTypes';
import sharedActionTypes from 'src/shared/actions/sharedActionTypes';

const { SHARED__ASYNC_CHAIN_START, SHARED__ASYNC_CHAIN_FINISH } = sharedActionTypes;

const actionsAndMessages = [
  { actionType: airChangeTypes.AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE, message: i18n('SPINNER_MESSAGE__HANG_TIGHT') },
  { actionType: sameDayTypes.SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION, message: i18n('SPINNER_MESSAGE__HANG_TIGHT') },
  { actionType: sameDayTypes.SAME_DAY__UPDATE_SAME_DAY_CONFIRMATION_REFUND, message: i18n('SPINNER_MESSAGE__HANG_TIGHT') }
];

const getMessage = (actionType) =>
  actionsAndMessages.find(item => actionType === item.actionType)?.message;

const queueAsyncChainContinue = (dispatch, getState) =>
  setTimeout(() => {
    const asyncChain = getState().app.spinner.asyncChain;

    if (asyncChain) {
      const nextAsyncChainTimerID = queueAsyncChainContinue(dispatch, getState);

      dispatch(SharedActions.asyncChainContinue(nextAsyncChainTimerID));
    }
  }, getState().app.spinner.chainMessageDuration);

export default function spinnerMiddleware({ dispatch, getState }) {
  return (next) => (action) => {
    if (action.type === SHARED__ASYNC_CHAIN_START) {
      const timerId = queueAsyncChainContinue(dispatch, getState);

      dispatch(SharedActions.asyncChainInitTimer(timerId));
    } else if (action.type === SHARED__ASYNC_CHAIN_FINISH) {
      const { asyncChainTimerID } = getState().app.spinner;     

      clearTimeout(asyncChainTimerID);
    } else if (action.isFetching === true) {
      dispatch(SharedActions.asyncActionStart(getMessage(action.type)));
    } else if (action.isFetching === false) {
      dispatch(SharedActions.asyncActionFinish());
    }

    return next(action);
  };
}
