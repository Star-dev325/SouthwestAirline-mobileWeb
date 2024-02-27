const _ = require('lodash');

const findExpectCall = (node) => {
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'expect') {
    return node;
  }

  if (node.type === 'MemberExpression') {
    return findExpectCall(node.object);
  }
};

module.exports = {
  meta: {
    schema: [],
    fixable: 'code'
  },
  create: (context) => {
    return {
      ExpressionStatement: (node) => {
        const expression = node.expression;
        if (!expression) {
          return;
        }
        const expectStatement = findExpectCall(expression);

        if (!expectStatement) {
          return;
        }

        const expectArguments = expectStatement.arguments;

        if (expectArguments.length === 0) {
          return;
        }

        const expectFunctionFirstArgument = expectArguments[0];
        let nodePotentiallyContainingCalled = expectFunctionFirstArgument;
        if (expectFunctionFirstArgument.type === 'CallExpression') {
          nodePotentiallyContainingCalled = expectFunctionFirstArgument.callee;
        }

        if (
          nodePotentiallyContainingCalled.type === 'MemberExpression' &&
          nodePotentiallyContainingCalled.property.type === 'Identifier' &&
          nodePotentiallyContainingCalled.property.name.includes('called')
        ) {
          context.report({
            node: expectFunctionFirstArgument,
            message:
              '.called (or variants) used inside expect() -- try expect(object).to.have.been.called (or variant) instead',
            fix: (fixer) => {
              if (expression.property && expression.property.name !== 'true' && expression.property.name !== 'false') {
                return;
              }

              const Source = context.getSourceCode();

              let endOfLine = `${
                expression.property && expression.property.name === 'false' ? '.not' : ''
              }.to.have.been.${Source.getText(nodePotentiallyContainingCalled.property)}`;
              if (expectFunctionFirstArgument.type === 'CallExpression') {
                const argumentString = _.map(expectFunctionFirstArgument.arguments, (argument) =>
                  Source.getText(argument)
                ).join(',');
                endOfLine += `(${argumentString})`;
              }

              return [
                fixer.replaceText(expectFunctionFirstArgument, Source.getText(nodePotentiallyContainingCalled.object)),
                fixer.replaceTextRange([expectStatement.end, expression.end], endOfLine)
              ];
            }
          });
        }
      }
    };
  }
};
