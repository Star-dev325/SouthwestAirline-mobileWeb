// @flow
import { history } from 'src/appHistory';
import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';

export const clearFormDataByURL = (url: string) => ({
  type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
  url
});

export const clearFormDataById = (formId: string, exactMatch?: boolean = true) => ({
  type: FormDataActionTypes.CLEAR_FORM_DATA_BY_ID,
  formId,
  exactMatch
});

export const updateFormFieldDataValue = (formId: string, fieldName: string, value: *) => {
  const { pathname, search } = history.location;

  return {
    type: FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE,
    formId,
    fieldName,
    value,
    url: `${pathname}${search}`
  };
};

export const updateFormDataValue = (formId: string, fieldValues: *) => {
  const { pathname, search } = history.location;

  return {
    type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
    formId,
    fieldValues,
    url: `${pathname}${search}`
  };
};

export const restrictFormChangeToFieldName = (formId: string, fieldName: string) => ({
  type: FormDataActionTypes.RESTRICT_FORM_CHANGE_TO_FIELD_NAME,
  formId,
  fieldName
});

export const unrestrictFormChangeToFieldName = (formId: string) => ({
  type: FormDataActionTypes.UNRESTRICT_FORM_CHANGE_TO_FIELD_NAME,
  formId
});

export const resetFormData = () => ({
  type: FormDataActionTypes.RESET_FORM_DATA
});
