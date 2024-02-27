import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import { dispatchHideDialog } from 'src/shared/helpers/dialogHelper';

const initialState = {
  active: false,
  bodyClassName: '',
  buttons: [
    {
      dataAnalytics: '',
      label: 'OK',
      onClick: dispatchHideDialog
    }
  ],
  className: '',
  headClassName: '',
  hasStickyFooterButton: false,
  message: '',
  name: '',
  onClose: dispatchHideDialog,
  title: '',
  titleClassName: '',
  verticalLinks: undefined
};

export const dialog = (state = initialState, action = {}) => {
  switch (action.type) {
    case DialogActionTypes.TOGGLE_DIALOG: {
      return action.isShowDialog ? { ...initialState, ...action.options, active: true } : initialState;
    }
    default:
      return state;
  }
};
