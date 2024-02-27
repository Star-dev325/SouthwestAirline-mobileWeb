'use strict';
/**
 * @fileoverview Enforce dispatch prop naming conventions in JSX
 * @author Siyang Li
 */
const _ = require('lodash');

const keyNamingRegExp = /(\w+Fn$)|^onClick|^onSubmit|^onChange/;
const withConnectedReactRouterKeyNamingRegExp =
  /(\w+Fn$)|^onClick|^onSubmit|^onChange|^push$|^replace$|^go$|^goBack$|^goForward$/;
const componentsFilenameRegExp = /.+\/(components|pages|enhancers)\/(?!__tests__).+/;

const checkKeyNaming = (node, context) => {
  const regExp = context.getFilename().endsWith('withConnectedReactRouter.jsx')
    ? withConnectedReactRouterKeyNamingRegExp
    : keyNamingRegExp;
  if (!regExp.test(node.key.name)) {
    context.report({
      node,
      message: `Avoid using '{{ name }}' as the key name. The key name in mapDispatchToProps must end with 'Fn' or start with 'onClick', 'onSubmit' and 'onChange'`,
      data: {
        name: node.key.name
      }
    });
  }
};

module.exports = {
  meta: {
    schema: []
  },
  create(context) {
    if (componentsFilenameRegExp.test(context.getFilename())) {
      return {
        "VariableDeclaration > VariableDeclarator[id.name='mapDispatchToProps'] > ObjectExpression > Property":
          function (node) {
            checkKeyNaming(node, context);
          },
        "CallExpression[callee.name='connect']": function (node) {
          const secondArgument = _.get(node, 'arguments[1]');

          if (secondArgument && secondArgument.type === 'ObjectExpression') {
            _.get(secondArgument, 'properties', []).forEach((property) => checkKeyNaming(property, context));
          }
        }
      };
    }
    return {};
  }
};
