// @flow

import React from 'react';
import { connect } from 'react-redux';
import url from 'url';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as SharedActions from 'src/shared/actions/sharedActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { history } from 'src/appHistory';
import { ERROR_HEADER, SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import { showDialog } from 'src/shared/actions/dialogActions';
import RouterStore from 'src/shared/stores/routerStore';
import { isModalOpen, isPopupOpen } from 'src/shared/routeUtils/routeStateHelper';
import { getHocDisplayName } from 'src/shared/enhancers/hocHelper';

import type { ComponentType } from 'react';
import type { FormData, FormValidationErrors } from 'src/shared/form/flow-typed/form.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';

type Props = {
  formId: string,
  onSubmit: (*) => {},
  onValidationFailed?: (*) => {},
  initialFormData: ?FormData,
  formData: ?FormData,
  clearFormDataByIdFn: (formId: string) => void,
  updateFormFieldDataValueFn: (formId: string, fieldName: string, fieldValue: *) => void,
  asyncActionStartFn: () => void,
  asyncActionFinishFn: () => void,
  showErrorHeaderMsgFn: (string) => void,
  hideErrorHeaderMsgFn: () => void,
  restrictFormChangeToFieldNameFn: (formId: string, fieldName: string) => void,
  unrestrictFormChangeToFieldNameFn: (formId: string) => void,
  showDialogFn: (DialogOptionsType) => void
};

type State = {
  errors: FormValidationErrors,
  shouldRenderChildren: boolean
};

type Options = {
  formValidator?: (*) => (*) => *,
  defaultValues?: (*) => { [fieldName: string]: * },
  disableFormData?: boolean,
  fieldsToValidateOnChange?: Array<string>
};

const defaultOptions = {
  formValidator: () => () => {},
  defaultValues: () => ({}),
  autoClearFormData: false,
  disableFormData: false,
  fieldsToValidateOnChange: []
};

export const withFormComponent = (Component: ComponentType<*>, options: Options): ComponentType<*> => {
  const { formValidator, defaultValues, disableFormData, autoClearFormData, fieldsToValidateOnChange } = _.merge(
    {},
    defaultOptions,
    options
  );

  class WithForm extends React.Component<Props, State> {
    static childContextTypes = {
      form: PropTypes.object
    };

    constructor(props) {
      super(props);
      this.state = {
        errors: {},
        shouldRenderChildren: false
      };
      this.fields = {};
    }

    getChildContext() {
      const { errors } = this.state;

      return {
        form: {
          onChange: this._onChange,
          clearError: this._clearError,
          register: this.register,
          unregister: this.unregister,
          getDefaultValue: this._getDefaultValue,
          errors,
          formData: this._getFormData()
        }
      };
    }

    componentDidMount() {
      const { formId, clearFormDataByIdFn } = this.props;
      const {
        location: { search = '' },
        action
      } = history;

      const currentRouteState = RouterStore.getCurrentState();
      const shouldClearFormData = _.toBoolean(_.get(url.parse(search, true), 'query.clearFormData', true));
      const isModalOrPopupOpen =
        currentRouteState && (isModalOpen(currentRouteState) || isPopupOpen(currentRouteState));

      if (shouldClearFormData && !isModalOrPopupOpen && (action === 'PUSH' || action === 'REPLACE')) {
        clearFormDataByIdFn(formId);
      }
      this.setState({ shouldRenderChildren: true });
    }

    componentWillUnmount() {
      this._hideHeaderError();

      if (disableFormData) {
        this.props.clearFormDataByIdFn(this.props.formId);
      }
    }

    fields: {
      [fieldName: string]: number
    };

    register = (fieldName: string) => {
      if (_.isNumber(this.fields[fieldName])) {
        this.fields[fieldName] += 1;
      } else {
        this.fields[fieldName] = 1;
      }
    };

    unregister = (fieldName: string) => {
      this.fields[fieldName] -= 1;
    };

    _getFormData = () => {
      const { initialFormData, formData } = this.props;

      return _.merge({}, this._getDefaultValues(), initialFormData, formData);
    };

    _getDefaultValues = () => (defaultValues ? defaultValues(this.props) : {});

    _getDefaultValue = (fieldName: string) => {
      const defaultValue = this._getDefaultValues()[fieldName];

      return _.isUndefined(defaultValue) ? '' : defaultValue;
    };

    _getRegisteredFormDataWithDefaultValues = () => {
      const formData = this._getFormData();
      const formDataDefaultValues = this._getDefaultValues();

      return _.chain(this.fields)
        .pickBy((count) => count > 0)
        .mapValues((count, fieldName) =>
          (_.isUndefined(formData[fieldName]) ? formDataDefaultValues[fieldName] || '' : formData[fieldName])
        )
        .value();
    };

    _onChange = (fieldName: string, fieldValue: string) => {
      const { errors } = this.state;
      const { showErrorHeaderMsgFn, restrictFormChangeToFieldNameFn, unrestrictFormChangeToFieldNameFn, formId } =
        this.props;

      this.props.updateFormFieldDataValueFn(formId, fieldName, fieldValue);
      this.setState({
        errors: _.omit(errors, fieldName)
      });

      if (fieldsToValidateOnChange && fieldsToValidateOnChange.includes(fieldName)) {
        const validatorResults = formValidator(this.props)({ [fieldName]: fieldValue });

        if (!_.isEmpty(validatorResults)) {
          const headerError = this._getFirstErrorByType(validatorResults, ERROR_HEADER);

          this.setState({
            errors: validatorResults
          });
          restrictFormChangeToFieldNameFn(formId, fieldName);
          headerError && showErrorHeaderMsgFn(headerError.error.msg);
        } else {
          this._hideHeaderError();
          this.setState({
            errors: _.omit(validatorResults, fieldName)
          });
          unrestrictFormChangeToFieldNameFn(formId);
        }
      }
    };

    _getFirstErrorByType(errors, type: string) {
      return _.chain(errors)
        .pickBy((error) => error.type === type)
        .toPairs()
        .first()
        .thru((error) => (error ? { key: error[0], error: error[1] } : null))
        .value();
    }

    _handleValidationErrors = (formData, errors) => {
      if (!_.isEmpty(errors)) {
        const { showErrorHeaderMsgFn, onValidationFailed, showDialogFn } = this.props;
        const headerError = this._getFirstErrorByType(errors, ERROR_HEADER);
        const simplePopupError = this._getFirstErrorByType(errors, SIMPLE_ERROR_POPUP);

        if (headerError) {
          showErrorHeaderMsgFn(headerError.error.msg);
        } else if (simplePopupError) {
          showDialogFn({
            name: simplePopupError.key,
            title: simplePopupError.error.msg
          });
        }
        onValidationFailed && onValidationFailed();

        return this.setState({
          errors
        });
      }
      this.props.onSubmit(formData);
      autoClearFormData && this.props.clearFormDataByIdFn(this.props.formId);
    };

    _onSubmit = () => {
      const { asyncActionStartFn, asyncActionFinishFn } = this.props;

      this._hideHeaderError();
      const formDataWithDefaultValue = this._getRegisteredFormDataWithDefaultValues();
      const formDataWithTrimmedValue = _.mapValues(formDataWithDefaultValue, (fieldValue, fieldName) =>
        (_.isString(fieldValue) && !/.*password.*/i.test(fieldName) ? _.trim(fieldValue) : fieldValue)
      );

      const validatorResult = formValidator(this.props)(formDataWithTrimmedValue);

      if (_.isPromise(validatorResult)) {
        asyncActionStartFn();
        validatorResult
          .then((errors) => this._handleValidationErrors(formDataWithTrimmedValue, errors))
          .finally(() => {
            asyncActionFinishFn();
          });
      } else {
        this._handleValidationErrors(formDataWithTrimmedValue, validatorResult);
      }
    };

    _clearError = (fieldName: string, clearValue: boolean = true) => {
      const { errors } = this.state;
      const hasError = !_.isEmpty(errors[fieldName]);

      if (hasError) {
        if (clearValue) {
          this.props.updateFormFieldDataValueFn(this.props.formId, fieldName, this._getDefaultValue(fieldName));
        }

        this.setState({
          errors: _.omit(errors, fieldName)
        });
      }
    };

    _hideHeaderError() {
      this.props.hideErrorHeaderMsgFn();
    }

    render() {
      return (
        this.state.shouldRenderChildren && (
          <Component
            formData={this._getFormData()}
            onSubmit={this._onSubmit}
            onChange={this._onChange}
            {..._.omit(this.props, 'onSubmit', 'formData')}
          />
        )
      );
    }
  }
  WithForm.displayName = getHocDisplayName('WithForm', Component);

  return WithForm;
};

const withForm =
  (options: Options) =>
    (Component: *): ComponentType<*> => {
      const FormComponent = withFormComponent(Component, options);
      const mapStateToProps = (state, props) => {
        const { formId } = props;

        return {
          formData: _.get(state.app.formData, `${formId}.data`)
        };
      };

      const mapDispatchToProps = {
        clearFormDataByIdFn: FormDataActions.clearFormDataById,
        updateFormFieldDataValueFn: FormDataActions.updateFormFieldDataValue,
        asyncActionStartFn: SharedActions.asyncActionStart,
        asyncActionFinishFn: SharedActions.asyncActionFinish,
        showErrorHeaderMsgFn: SharedActions.showErrorHeaderMsg,
        hideErrorHeaderMsgFn: SharedActions.hideErrorHeaderMsg,
        restrictFormChangeToFieldNameFn: FormDataActions.restrictFormChangeToFieldName,
        unrestrictFormChangeToFieldNameFn: FormDataActions.unrestrictFormChangeToFieldName,
        showDialogFn: showDialog
      };

      return connect(mapStateToProps, mapDispatchToProps)(FormComponent);
    };

export default withForm;
