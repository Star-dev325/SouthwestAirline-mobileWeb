import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { history } from 'src/appHistory';

describe('formDataActions', () => {
  beforeEach(() => {
    history.location.pathname = 'mobile.southwest.com/airBooking';
    history.location.search = '?passenger=1';
  });

  it('should create action to clear form data according url', () => {
    const expectedAction = {
      type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
      url: 'mobile.southwest.com/airBooking?passenger=1'
    };

    expect(FormDataActions.clearFormDataByURL('mobile.southwest.com/airBooking?passenger=1')).to.deep.equal(
      expectedAction
    );
  });

  it('should create action to clear form data by id', () => {
    const expectedAction = {
      type: FormDataActionTypes.CLEAR_FORM_DATA_BY_ID,
      formId: 'shoppingSearchForm',
      exactMatch: true
    };

    expect(FormDataActions.clearFormDataById('shoppingSearchForm')).to.deep.equal(expectedAction);
  });

  it('should create action to update form field value', () => {
    const expectedAction = {
      type: FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE,
      formId: 'form id',
      fieldName: 'field name',
      value: 'new value',
      url: 'mobile.southwest.com/airBooking?passenger=1'
    };

    expect(FormDataActions.updateFormFieldDataValue('form id', 'field name', 'new value')).to.deep.equal(
      expectedAction
    );
  });

  it('should create action to update form values', () => {
    const expectedAction = {
      type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
      formId: 'form id',
      fieldValues: {
        field1: 'value1',
        field2: 'value2'
      },
      url: 'mobile.southwest.com/airBooking?passenger=1'
    };

    expect(FormDataActions.updateFormDataValue('form id', { field1: 'value1', field2: 'value2' })).to.deep.equal(
      expectedAction
    );
  });

  it('should create action to update disabled field in the form', () => {
    const expectedAction = {
      type: FormDataActionTypes.RESTRICT_FORM_CHANGE_TO_FIELD_NAME,
      formId: 'form id',
      fieldName: 'field name'
    };

    expect(FormDataActions.restrictFormChangeToFieldName('form id', 'field name')).to.deep.equal(expectedAction);
  });

  it('should create action to enable fields in the form', () => {
    const expectedAction = {
      type: FormDataActionTypes.UNRESTRICT_FORM_CHANGE_TO_FIELD_NAME,
      formId: 'form id'
    };

    expect(FormDataActions.unrestrictFormChangeToFieldName('form id')).to.deep.equal(expectedAction);
  });

  it('should create action to reset form data', () => {
    const expectedAction = {
      type: FormDataActionTypes.RESET_FORM_DATA
    };

    expect(FormDataActions.resetFormData()).to.deep.equal(expectedAction);
  });

  it('should create action to clear data according to the formID', () => {
    const expectedAction = {
      type: FormDataActionTypes.CLEAR_FORM_DATA_BY_ID,
      formId: 'form id',
      exactMatch: false
    };

    expect(FormDataActions.clearFormDataById('form id', false)).to.deep.equal(expectedAction);
  });
});
