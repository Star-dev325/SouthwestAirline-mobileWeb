// @flow

import { HttpRequestError } from 'src/shared/errors/httpRequestError';

export type FormValidationError = {
  type: string,
  msg?: string | HttpRequestError
};

export type FormValidationErrors = {
  [errorKey: string]: FormValidationError
};

export type FormData = {[fieldName: string]: *};

export type ValidationRule = {
  validator?: (fieldValue: *, fieldErrors?: FormValidationErrors) => boolean | Promise<*>,
  type?: string,
  msg?: string,
  isRequired?: boolean
};

export type FieldValidationRules = {
  [fieldName: string]: ValidationRule[]
};

export type FormValidationRules = {
  [errorKey: string]: ValidationRule[]
};

export type FieldProps = {
  onFocus?: (*) => void,
  onChange: (*) => void,
  clearError: () => void,
  value: *,
  name: string,
  error?: FormValidationError,
  backgroundColorSelection?: boolean
};
