const fieldAndFieldsNamingConvention = require('./lib/field-and-fields-naming-convention');
const fieldsFilePath = require('./lib/fields-file-path');
const jsxDispatchPropNames = require('./lib/jsx-dispatch-prop-names');
const noCalledInExpect = require('./lib/no-called-in-expect');
const noNestedField = require('./lib/no-nested-field');
const selectorNamingPattern = require('./lib/selector-naming-pattern');

module.exports = {
  rules: {
    'field-and-fields-naming-convention': fieldAndFieldsNamingConvention,
    'fields-file-path': fieldsFilePath,
    'jsx-dispatch-prop-names': jsxDispatchPropNames,
    'no-called-in-expect': noCalledInExpect,
    'no-nested-field': noNestedField,
    'selector-naming-pattern': selectorNamingPattern
  }
};
