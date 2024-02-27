jest.mock('src/shared/helpers/dialogHelper');

import DialogActionTypes from 'src/shared/actions/dialogActionTypes';
import * as DialogHelper from 'src/shared/helpers/dialogHelper';
import { dialog } from 'src/shared/reducers/dialogReducer';

const DialogHelperMock = jest.mocked(DialogHelper);

describe('dialog', () => {
  let dispatchHideDialogMock;

  beforeEach(() => {
    dispatchHideDialogMock = DialogHelperMock.dispatchHideDialog.mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set the dialog state to initial state when toggled off', () => {
    const action = {
      type: DialogActionTypes.TOGGLE_DIALOG,
      isShowDialog: false
    };
    const expectedState = {
      active: false,
      bodyClassName: '',
      buttons: [
        {
          dataAnalytics: '',
          label: 'OK',
          onClick: dispatchHideDialogMock
        }
      ],
      className: '',
      headClassName: '',
      hasStickyFooterButton: false,
      message: '',
      name: '',
      onClose: dispatchHideDialogMock,
      title: '',
      titleClassName: '',
      verticalLinks: undefined
    };

    expect(dialog({}, action)).toEqual(expectedState);
  });

  it('should return default state when action is undefined', () => {
    const initialState = {
      active: false,
      bodyClassName: '',
      buttons: [
        {
          dataAnalytics: '',
          label: 'OK',
          onClick: dispatchHideDialogMock
        }
      ],
      className: '',
      headClassName: '',
      hasStickyFooterButton: false,
      message: '',
      name: '',
      onClose: dispatchHideDialogMock,
      title: '',
      titleClassName: '',
      verticalLinks: undefined
    };

    expect(dialog()).toEqual(initialState);
  });

  it('should set the dialog state to be shown', () => {
    const options = {
      name: 'some name',
      title: 'some title'
    };

    const action = {
      type: DialogActionTypes.TOGGLE_DIALOG,
      isShowDialog: true,
      options
    };

    expect(dialog({}, action)).toMatchObject(options);
    expect(dialog({}, action)).toMatchObject({ active: true });
  });

  it('should not retain initial state members that are not overridden', () => {
    const initialState = {
      defaultTitle: 'default'
    };
    const options = {
      name: 'some name',
      title: 'some title'
    };

    const action = {
      type: DialogActionTypes.TOGGLE_DIALOG,
      isShowDialog: true,
      options
    };

    expect(dialog(initialState, action)).not.toMatchObject(initialState);
  });
});
