// @flow
import _ from 'lodash';
import validator from 'src/shared/form/formValidators/validator';
import {
  REQUIRED_ERROR,
  DEFAULT_ERROR_TYPE,
  FIELD_ERROR_MESSAGE
} from 'src/shared/form/constants/validationErrorTypes';
import type {
  FormData,
  ValidationRule,
  FormValidationRules,
  FieldValidationRules,
  FormValidationErrors
} from 'src/shared/form/flow-typed/form.types';

function executeRules(rules, ...args) {
  return _.reduce(
    rules,
    (result, { validator: ruleValidator, type = DEFAULT_ERROR_TYPE, msg }) => {
      if (_.isNull(result)) {
        const isValid = ruleValidator && ruleValidator(...args);

        if (_.isPromise(isValid)) {
          const promise = isValid;

          return { promise, type, msg };
        }

        return isValid ? null : { type, msg };
      }

      return result;
    },
    null
  );
}

export function getErrorMsgForField(fieldName: string, fieldValue: *, fieldRules: ValidationRule[]) {
  const { true: requiredRules, false: otherRules } = _.groupBy(fieldRules, (rule) => !!rule.isRequired);
  const isRequiredField = !_.isEmpty(requiredRules);

  if (isRequiredField && !validator.isRequired(fieldValue)) {
    const { msg } = requiredRules[0];

    if (msg) {
      return {
        msg,
        type: FIELD_ERROR_MESSAGE
      };
    } else {
      return {
        type: REQUIRED_ERROR
      };
    }
  }

  if (!isRequiredField && _.isEmpty(fieldValue)) {
    return null;
  }

  return executeRules(otherRules, fieldValue);
}

function hasAnyAsycValidation(errors) {
  return _.some(errors, (error) => _.isPromise(error.promise));
}

function waitAsyncValidationResolvedAndMergeResult(errors) {
  const errorsWithPromise = _.chain(errors)
    .pickBy((error) => _.isPromise(error.promise))
    .entries()
    .value();
  const asyncErrorKeys = _.map(errorsWithPromise, '[0]');
  const asyncErrorContents = _.map(errorsWithPromise, '[1]');

  return Promise.all(_.map(asyncErrorContents, 'promise')).then((asyncErrorValues) => {
    const asyncErrorContentWithValidationResult = _.map(asyncErrorValues, (asyncErrorValue, index: number) => {
      if (!_.isEmpty(asyncErrorValue)) {
        const { type } = asyncErrorContents[index];

        return { type, msg: asyncErrorValue };
      }

      return null;
    });
    const asyncErrors = _.zipObject(asyncErrorKeys, asyncErrorContentWithValidationResult);

    return _.chain(errors).assign(asyncErrors).pickBy(_.negate(_.isEmpty)).value();
  });
}

export function executeValidators(
  formData: FormData,
  formRules: FormValidationRules = {},
  fieldRules: FieldValidationRules = {}
): FormValidationErrors | Promise<FormValidationErrors> {
  const fieldErrors = _.chain(formData)
    .mapValues((fieldValue, fieldName) => getErrorMsgForField(fieldName, fieldValue, fieldRules[fieldName]))
    .pickBy(_.negate(_.isNull))
    .value();

  let errors = fieldErrors;

  if (!_.isEmpty(formRules)) {
    const formErrors = _.chain(formRules)
      .mapValues((rules) => executeRules(rules, formData, fieldErrors))
      .pickBy(_.negate(_.isNull))
      .value();

    errors = _.merge(errors, formErrors);
  }

  if (!hasAnyAsycValidation(errors)) {
    return errors;
  }

  return waitAsyncValidationResolvedAndMergeResult(errors);
}
