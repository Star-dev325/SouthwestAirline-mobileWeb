// @flow

import ExtendableError from 'src/shared/errors/extendableError';
import i18n from '@swa-ui/locale';

import type { AfpErrorHandler } from 'src/shared/flow-typed/shared.types';

export default class AlternativeFormsOfPaymentError extends ExtendableError {
  constructor(errorHandler: AfpErrorHandler) {
    super(i18n('SHARED__ERROR_MESSAGES__AFP_ERROR_MESSAGE'));

    this.errorHandler = errorHandler;
  }
}
