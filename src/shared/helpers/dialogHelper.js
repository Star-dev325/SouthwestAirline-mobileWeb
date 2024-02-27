// @flow
import { store } from 'src/shared/redux/createStore';
import { hideDialog } from 'src/shared/actions/dialogActions';

export const dispatchHideDialog = () => store.dispatch(hideDialog());
