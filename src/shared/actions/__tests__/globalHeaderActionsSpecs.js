import GlobalHeaderActionTypes from 'src/shared/actions/globalHeaderActionTypes';
import * as GlobalHeaderActions from 'src/shared/actions/globalHeaderActions';

const {
  GLOBAL_HEADER__SHOW_EDIT_BUTTON,
  GLOBAL_HEADER__SHOW_CANCEL_BUTTON,
  GLOBAL_HEADER__CLICK_EDIT_BUTTON,
  GLOBAL_HEADER__CLICK_CANCEL_BUTTON,
  GLOBAL_HEADER__HIDE_GLOBAL_HEADER,
  GLOBAL_HEADER__SHOW_ONLY_LOGIN,
  GLOBAL_HEADER__HIDE_BUTTON,
  GLOBAL_HEADER__RESET_GLOBAL_HEADER
} = GlobalHeaderActionTypes;

describe('GlobalHeaderActions', () => {
  it('should create action to show edit button', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__SHOW_EDIT_BUTTON
    };

    expect(GlobalHeaderActions.showEditButton()).to.deep.equal(expectedAction);
  });

  it('should create action to show cancel button', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__SHOW_CANCEL_BUTTON
    };

    expect(GlobalHeaderActions.showCancelButton()).to.deep.equal(expectedAction);
  });

  it('should create action when click edit button', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__CLICK_EDIT_BUTTON
    };

    expect(GlobalHeaderActions.clickEditButton()).to.deep.equal(expectedAction);
  });

  it('should create action when click cancel button', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__CLICK_CANCEL_BUTTON
    };

    expect(GlobalHeaderActions.clickCancelButton()).to.deep.equal(expectedAction);
  });

  it('should create action to hide global header', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__HIDE_GLOBAL_HEADER
    };

    expect(GlobalHeaderActions.hideGlobalHeader()).to.deep.equal(expectedAction);
  });

  it('should create action to only show login button', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__SHOW_ONLY_LOGIN
    };

    expect(GlobalHeaderActions.showOnlyLogin()).to.deep.equal(expectedAction);
  });

  it('should create action to hide button', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__HIDE_BUTTON
    };

    expect(GlobalHeaderActions.hideButton()).to.deep.equal(expectedAction);
  });

  it('should create action to reset global header', () => {
    const expectedAction = {
      type: GLOBAL_HEADER__RESET_GLOBAL_HEADER
    };

    expect(GlobalHeaderActions.resetGlobalHeader()).to.deep.equal(expectedAction);
  });
});
