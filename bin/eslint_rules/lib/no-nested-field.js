const _ = require('lodash');

const fileNameRegex = /.*src\/shared\/form\/fields\/.*$/;

module.exports = {
  meta: {
    schema: []
  },
  create(context) {
    const filename = context.getFilename();
    let isField = false;
    let isFields = false;
    let isForm = false;
    const declaredFieldComps = [];
    const usedFieldComps = [];
    if (fileNameRegex.test(filename)) {
      return {
        'CallExpression[callee.name=withField]': () => {
          isField = true;
        },
        'CallExpression[callee.name=withFields]': () => {
          isFields = true;
        },
        'CallExpression[callee.name=withForm]': () => {
          isForm = true;
        },
        'VariableDeclarator > CallExpression[callee.name=require]': (node) => {
          const requiredFilePath = node.arguments[0].value;
          if (fileNameRegex.test(requiredFilePath)) {
            declaredFieldComps.push(node.parent.id.name);
          }
        },
        ImportDeclaration: (node) => {
          const requiredFilePath = node.source.value;
          if (fileNameRegex.test(requiredFilePath)) {
            const compsName = _.get(node, 'specifiers.0.local.name');
            compsName && declaredFieldComps.push(compsName);
          }
        },
        'JSXIdentifier[name=/^.*Fields?$/]': (node) => {
          usedFieldComps.push(node.name);
        },
        'Program:exit': (node) => {
          const comps = _.intersection(declaredFieldComps, usedFieldComps);
          const field = _.filter(comps, (val) => _.endsWith(val, 'Field'));
          if (!_.isEmpty(comps) && !isField && !isFields && !isForm) {
            if (!_.isEmpty(field)) {
              context.report({
                node,
                message: `The field can only be used in a form or a fields.`
              });
            } else {
              context.report({
                node,
                message: `The fields can only be used in a form or a fields.`
              });
            }
          } else if (!_.isEmpty(comps) && isField) {
            context.report({
              node,
              message: `Nested field is not allowed.`
            });
          }
        }
      };
    }
    return {};
  }
};
