// @flow

export type ReLoginModalOptionsType = {
  hasCancelButton?: boolean,
  shouldRedirectToHomePage?: boolean,
  isAccountNumberEditable?: boolean
};

export type ReLoginCallbackFunctionsType = {
  continueAsGuestFn?: ?(boolean) => void,
  postLoginCallbackFn?: () => *
};
