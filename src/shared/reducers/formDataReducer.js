import _ from 'lodash';
import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';

const _isSameUrlPath = (originalUrl, newUrl) => _.split(originalUrl, '?')[0] !== _.split(newUrl, '?')[0];

const formDataReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case FormDataActionTypes.CLEAR_FORM_DATA_BY_URL: {
      const { url } = action;

      return _.pickBy(state, (cachedItem) => _isSameUrlPath(cachedItem.url, url));
    }
    case FormDataActionTypes.CLEAR_FORM_DATA_BY_ID: {
      const { formId, exactMatch } = action;

      return exactMatch
        ? _.pickBy(state, (cachedItem, id) => id !== formId)
        : _.pickBy(state, (cachedItem, id) => !_.includes(id, formId));
    }
    case FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE: {
      const { formId, url, fieldName, value } = action;
      const newState = _.cloneDeep(state);
      const formDataUrl = _.get(newState, `${formId}.url`);

      if (!formDataUrl) {
        _.set(newState, `${formId}.url`, url);
      }
      _.set(newState, `${formId}.data.${fieldName}`, value);

      return newState;
    }
    case FormDataActionTypes.UPDATE_FORM_DATA_VALUE: {
      const { formId, url, fieldValues } = action;

      return _.merge({}, state, {
        [formId]: {
          url,
          data: fieldValues
        }
      });
    }
    case FormDataActionTypes.RESTRICT_FORM_CHANGE_TO_FIELD_NAME: {
      const { formId, fieldName } = action;
      const newState = _.cloneDeep(state);

      _.set(newState, `${formId}.fieldNameEnabledForChange`, fieldName);

      return newState;
    }
    case FormDataActionTypes.UNRESTRICT_FORM_CHANGE_TO_FIELD_NAME: {
      const { formId } = action;
      const newState = _.cloneDeep(state);

      _.set(newState, `${formId}.fieldNameEnabledForChange`, undefined);

      return newState;
    }
    case FormDataActionTypes.RESET_FORM_DATA: {
      return {};
    }
    default:
      return state;
  }
};

export default formDataReducer;
