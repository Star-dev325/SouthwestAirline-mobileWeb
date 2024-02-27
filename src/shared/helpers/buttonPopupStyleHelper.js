// @flow

import { DEFAULT, DESTRUCTIVE, PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';

export const buttonPopupStyleTypeClass = (style: ?string) => {
  let buttonPopupClassName = `button-popup_${DEFAULT}`;

  if (style === PRIMARY) {
    buttonPopupClassName = `button-popup_${PRIMARY}`;
  } else if (style === DESTRUCTIVE) {
    buttonPopupClassName = `button-popup_${DESTRUCTIVE}`;
  }

  return buttonPopupClassName;
};
