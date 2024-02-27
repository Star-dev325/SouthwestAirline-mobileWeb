import GlobalHeaderActionTypes from 'src/shared/actions/globalHeaderActionTypes';

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

export const showEditButton = () => ({
  type: GLOBAL_HEADER__SHOW_EDIT_BUTTON
});

export const showCancelButton = () => ({
  type: GLOBAL_HEADER__SHOW_CANCEL_BUTTON
});

export const clickEditButton = () => ({
  type: GLOBAL_HEADER__CLICK_EDIT_BUTTON
});

export const clickCancelButton = () => ({
  type: GLOBAL_HEADER__CLICK_CANCEL_BUTTON
});

export const hideGlobalHeader = () => ({
  type: GLOBAL_HEADER__HIDE_GLOBAL_HEADER
});

export const showOnlyLogin = () => ({
  type: GLOBAL_HEADER__SHOW_ONLY_LOGIN
});

export const hideButton = () => ({
  type: GLOBAL_HEADER__HIDE_BUTTON
});

export const resetGlobalHeader = () => ({
  type: GLOBAL_HEADER__RESET_GLOBAL_HEADER
});
