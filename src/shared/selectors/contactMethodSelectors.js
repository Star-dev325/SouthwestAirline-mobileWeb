import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import * as ContactMethodHelper from 'src/shared/helpers/contactMethodHelper';

export const getContactMethodContent = (contactMethodGetter) =>
  createSelector([contactMethodGetter], (contactMethodInfo) =>
    ContactMethodHelper.generateContactNavigatorLabel(contactMethodInfo)
  );
