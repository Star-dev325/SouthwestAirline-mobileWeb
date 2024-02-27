// @flow

import React from 'react';
import { FIELD_ERROR_MESSAGE } from 'src/shared/form/constants/validationErrorTypes';

import type { FormValidationError } from 'src/shared/form/flow-typed/form.types';

type Props = {
  error: FormValidationError
};

const FieldErrorMessage = (props: Props) => {
  const { error } = props;

  if (error.type !== FIELD_ERROR_MESSAGE) {
    return null;
  }

  return <span className="field--error-msg" dangerouslySetInnerHTML={{ __html: error.msg }} />;
};

export default FieldErrorMessage;
