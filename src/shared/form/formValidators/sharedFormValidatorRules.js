import _ from 'lodash';
import { ERROR_HEADER, REQUIRED_ERROR } from 'src/shared/form/constants/validationErrorTypes';
import ErrorMessages from 'src/shared/constants/errorMessages';

const { FIELD_IS_BLANK_ERROR, CORRECT_HIGHLIGHTED_ERRORS } = ErrorMessages;

export const hasSomeInputedValues = [
  {
    msg: FIELD_IS_BLANK_ERROR,
    type: ERROR_HEADER,
    validator: (formData, errors) => _.isEmpty(errors) || _.some(errors, (error) => error.type !== REQUIRED_ERROR)
  }
];

export const hasSomeFieldsNeedToCorrect = [
  {
    msg: CORRECT_HIGHLIGHTED_ERRORS,
    type: ERROR_HEADER,
    validator: (formData, errors) => _.isEmpty(errors) || _.every(errors, (error) => error.type === REQUIRED_ERROR)
  }
];
