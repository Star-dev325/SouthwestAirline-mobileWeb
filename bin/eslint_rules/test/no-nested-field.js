const rule = require('../lib/no-nested-field');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parser: '@babel/eslint-parser' });

ruleTester.run('no-nested-field', rule, {
  valid: [
    {
      code: `const Component = require('src/shared/components/component');export default withField()(Component);`,
      filename: '/path/src/shared/form/fields/someField.jsx'
    },
    {
      code: `import Component from 'src/shared/components/component';export default withField()(Component);`,
      filename: '/path/src/shared/form/fields/someField.jsx'
    }
  ],

  invalid: [
    {
      code: `import OneField from 'src/shared/form/fields/oneField';const SomeInput = () => <OneField/>;export default withField()(SomeInput);`,
      filename: '/path/src/shared/form/fields/someOtherField.jsx',
      errors: [{ message: `Nested field is not allowed.` }]
    },
    {
      code: `import OneFields from 'src/shared/form/fields/oneFields';const SomeInput = () => <OneFields/>;export default SomeInput;`,
      filename: '/path/src/shared/form/fields/someOtherField.jsx',
      errors: [{ message: `The fields can only be used in a form or a fields.` }]
    },
    {
      code: `import OneField from 'src/shared/form/fields/oneField';const SomeInput = () => <OneField/>;export default withField()(SomeInput);`,
      filename: '/path/src/shared/form/fields/someOtherField.jsx',
      errors: [{ message: `Nested field is not allowed.` }]
    }
  ]
});
