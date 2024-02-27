const _ = require('lodash');
const path = require('path');

const fileNameRegex = /.*src\/shared\/form\/fields\/\w*\.\w*$/;

module.exports = {
  meta: {
    schema: []
  },
  create(context) {
    const filename = context.getFilename();
    const filenameWithoutPath = _.chain(filename).split(path.sep).last().split('.').first().value();
    let isField = false;
    let isFields = false;
    if (fileNameRegex.test(filename)) {
      return {
        'CallExpression[callee.name=withField]': (node) => {
          if (!_.endsWith(filenameWithoutPath, 'Field')) {
            context.report({
              node,
              message: `The file name should end with Field for a form field component.`
            });
          }
          isField = true;
        },
        'CallExpression[callee.name=withFields]': (node) => {
          if (!_.endsWith(filenameWithoutPath, 'Fields')) {
            context.report({
              node,
              message: `The file name should end with Fields for a form fields component.`
            });
          }
          isFields = true;
        },
        'Program:exit': (node) => {
          if (!isField && !isFields) {
            context.report({
              node,
              message: `The field or fields should always wrapped with HOC withField or withFields.`
            });
          }
          isField = false;
          isFields = false;
        }
      };
    }
    return {};
  }
};
