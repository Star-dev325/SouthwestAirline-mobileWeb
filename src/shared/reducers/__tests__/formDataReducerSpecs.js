import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';
import formDataReducer from 'src/shared/reducers/formDataReducer';

describe('formDataReducer', () => {
  it('should init state', () => {
    const state = formDataReducer(undefined, {});

    expect(state).to.deep.equal({});
  });

  context('clear form data by URL', () => {
    it('should clear all forms cache according to the url', () => {
      const state = formDataReducer(
        {
          FORM_ID_X: {
            url: 's.com/airbooking',
            data: {
              foo: 'foo'
            }
          },
          FORM_ID_Y: {
            url: 's.com/aircancel',
            data: {
              bar: 'bar'
            }
          }
        },
        {
          type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
          url: 's.com/airbooking'
        }
      );

      expect(state).to.deep.equal({
        FORM_ID_Y: {
          url: 's.com/aircancel',
          data: {
            bar: 'bar'
          }
        }
      });
    });

    it('should clear all forms data according to the url when there are query', () => {
      const state = formDataReducer(
        {
          FORM_ID_X: {
            url: 's.com/airbooking?cleanFlow=true',
            data: {
              foo: 'foo'
            }
          },
          FORM_ID_Y: {
            url: 's.com/aircancel',
            data: {
              bar: 'bar'
            }
          }
        },
        {
          type: FormDataActionTypes.CLEAR_FORM_DATA_BY_URL,
          url: 's.com/airbooking?cleanFlow=false'
        }
      );

      expect(state).to.deep.equal({
        FORM_ID_Y: {
          url: 's.com/aircancel',
          data: {
            bar: 'bar'
          }
        }
      });
    });

    it('should return default state when action is undefined', () => {
      expect(formDataReducer()).to.deep.equal({});
    });
  });

  context('clear form data by formId', () => {
    it('should clear all forms data according to formId', () => {
      const state = formDataReducer(
        {
          FORM_ID_X: {
            url: 's.com/airbooking',
            data: {
              foo: 'foo'
            }
          },
          FORM_ID_Y: {
            url: 's.com/aircancel',
            data: {
              bar: 'bar'
            }
          }
        },
        {
          type: FormDataActionTypes.CLEAR_FORM_DATA_BY_ID,
          formId: 'FORM_ID_Y'
        }
      );

      expect(state).to.deep.equal({
        FORM_ID_X: {
          url: 's.com/airbooking',
          data: {
            foo: 'foo'
          }
        }
      });
    });
  });

  context('update form field data value', () => {
    it('should update form data when the form data already exist and not change url', () => {
      const state = formDataReducer(
        {
          FORM_ID_X: {
            url: 's.com/airbooking',
            data: {
              foo: 'foo'
            }
          }
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE,
          formId: 'FORM_ID_X',
          url: 's.com/airChange',
          fieldName: 'firstName',
          value: 'Fisher'
        }
      );

      expect(state).to.deep.equal({
        FORM_ID_X: {
          url: 's.com/airbooking',
          data: {
            foo: 'foo',
            firstName: 'Fisher'
          }
        }
      });
    });

    it('should update form data when the form data already exist and the fieldName is a path', () => {
      const state = formDataReducer(
        {
          FORM_ID_X: {
            url: 's.com/airbooking',
            data: {
              foo: 'foo'
            }
          }
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE,
          formId: 'FORM_ID_X',
          url: 's.com/airbooking',
          fieldName: 'name.firstName',
          value: 'Fisher'
        }
      );

      expect(state).to.deep.equal({
        FORM_ID_X: {
          url: 's.com/airbooking',
          data: {
            foo: 'foo',
            name: {
              firstName: 'Fisher'
            }
          }
        }
      });
    });

    it('should initialize the data structure and update form data when the form data not exist', () => {
      const state = formDataReducer(
        {},
        {
          type: FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE,
          formId: 'FORM_ID_X',
          url: 's.com/airbooking',
          fieldName: 'firstName',
          value: 'Fisher'
        }
      );

      expect(state).to.deep.equal({
        FORM_ID_X: {
          url: 's.com/airbooking',
          data: {
            firstName: 'Fisher'
          }
        }
      });
    });
  });

  context('update form data for all fields', () => {
    it('should update data if it does not exist', () => {
      const state = formDataReducer(
        {},
        {
          type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
          formId: 'FORM_ID_X',
          url: 'url',
          fieldValues: {
            field1: 'field1',
            field2: 'new value'
          }
        }
      );

      expect(state).to.be.deep.equal({
        FORM_ID_X: {
          url: 'url',
          data: {
            field1: 'field1',
            field2: 'new value'
          }
        }
      });
    });

    it('should merge data values with new values and keeping other values unchanged', () => {
      const originalState = {
        FORM_ID_X: {
          url: 'url',
          data: {
            field1: 'field1',
            field2: 'original value',
            field3: 'field3'
          }
        }
      };
      const state = formDataReducer(originalState, {
        type: FormDataActionTypes.UPDATE_FORM_DATA_VALUE,
        formId: 'FORM_ID_X',
        url: 'url',
        fieldValues: {
          field1: 'field1',
          field2: 'new value'
        }
      });

      expect(state).to.be.deep.equal({
        FORM_ID_X: {
          url: 'url',
          data: {
            field1: 'field1',
            field2: 'new value',
            field3: 'field3'
          }
        }
      });
    });
  });
  context('disable form field by id', () => {
    it('should add the doNotDisable field to the state for a passed in fieldName', () => {
      const state = formDataReducer(
        { FORM_ID: {} },
        {
          type: FormDataActionTypes.RESTRICT_FORM_CHANGE_TO_FIELD_NAME,
          formId: 'FORM_ID',
          fieldName: 'fieldName'
        }
      );

      expect(state).to.be.deep.equal({
        FORM_ID: {
          fieldNameEnabledForChange: 'fieldName'
        }
      });
    });
  });
  context('enable fields by form id', () => {
    it('should set doNotDisable field to undefined when the enable action is called', () => {
      const state = formDataReducer(
        { FORM_ID: { fieldNameEnabledForChange: 'fieldName' } },
        {
          type: FormDataActionTypes.UNRESTRICT_FORM_CHANGE_TO_FIELD_NAME,
          formId: 'FORM_ID'
        }
      );

      expect(state).to.be.deep.equal({
        FORM_ID: {
          fieldNameEnabledForChange: undefined
        }
      });
    });

    it('should return default state when action is undefined', () => {
      expect(formDataReducer().fieldNameEnabledForChange).to.deep.equal(undefined);
    });
  });

  context('clears the form ', () => {
    it('should clear the form when the RESET_FORM_DATA action is called', () => {
      const state = formDataReducer(
        { FORM_ID: { fieldNameEnabledForChange: 'fieldName' } },
        {
          type: FormDataActionTypes.RESET_FORM_DATA
        }
      );

      expect(state).to.be.deep.equal({});
    });

    it('should clear the form when CLEAR_FORM_DATA_BY_ID is called', () => {
      const state = formDataReducer(
        { FORM_ID: { fieldNameEnabledForChange: 'fieldName' }, FORM_ID_2: { fieldNameEnabledForChange: 'fieldName' } },
        {
          type: FormDataActionTypes.CLEAR_FORM_DATA_BY_ID,
          formId: 'FORM_ID_2',
          exactMatch: false
        }
      );

      expect(state).to.be.deep.equal({ FORM_ID: { fieldNameEnabledForChange: 'fieldName' } });
    });
  });
});
