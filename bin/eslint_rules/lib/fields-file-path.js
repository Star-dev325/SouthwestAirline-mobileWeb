const _ = require('lodash');

const fileNameRegex = /.*src\/shared\/form\/fields\/\w*\.\w*$/;
const excludeFiles = [/^.*src\/.*\/__tests__\/\w+Specs\.(js|jsx)$/];
const checkFileName = function (node, context) {
  if (!fileNameRegex.test(context.getFilename())) {
    context.report({
      node,
      message: `All the form field and fields should be placed in src/shared/form/fields folder`
    });
  }
};

module.exports = {
  meta: {
    schema: []
  },
  create(context) {
    if (_.some(excludeFiles, (regex) => regex.test(context.getFilename()))) {
      return {};
    }
    return {
      'CallExpression[callee.name=withField]': (node) => checkFileName(node, context),
      'CallExpression[callee.name=withFields]': (node) => checkFileName(node, context)
    };
  }
};
