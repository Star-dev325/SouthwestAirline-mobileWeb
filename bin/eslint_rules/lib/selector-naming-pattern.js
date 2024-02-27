const selectorRegExp = /^(?:(get)|(is)|(should)|(has))/;
const fileNameRegExp = /.*Selectors?.js$/;

const checkSelectorName = (node, context) => {
  const nodeCode = context.getSourceCode().getText(node);
  if (!selectorRegExp.test(nodeCode)) {
    context.report({
      node,
      messageId: 'invalidName',
      data: {
        name: node.name
      }
    });
  }
};

module.exports = {
  meta: {
    schema: [],
    messages: {
      invalidName: `Avoid using variables named '{{ name }}', use 'get, is, should, has' to name a selector`
    }
  },
  create(context) {
    if (!fileNameRegExp.test(context.getFilename())) return {};
    return {
      'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier': (node) => {
        checkSelectorName(node, context);
      },
      'ExportDefaultDeclaration > Identifier': (node) => {
        checkSelectorName(node, context);
      }
    };
  }
};
