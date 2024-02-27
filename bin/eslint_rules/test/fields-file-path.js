const rule = require('../lib/fields-file-path');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parser: '@babel/eslint-parser' });

ruleTester.run('fields-file-path', rule, {
  valid: [
    {
      code: `export default withField()(SomeInput);`,
      filename: '/path/src/shared/form/fields/someField.jsx'
    },
    {
      code: `export default withFields(SomeInput);`,
      filename: '/path/src/shared/form/fields/someFields.jsx'
    },
    {
      code: `export default withFields(SomeInput);`,
      filename: '/path/src/shared/form/fields/someFieldSpces.jsx'
    }
  ],

  invalid: [
    {
      code: `export default withField()(SomeInput);`,
      filename: '/path/ruletests/components/someField.jsx',
      errors: [{ message: `All the form field and fields should be placed in src/shared/form/fields folder` }]
    },
    {
      code: `export default withFields(SomeInput);`,
      filename: '/path/ruletests/components/someFields.jsx',
      errors: [{ message: `All the form field and fields should be placed in src/shared/form/fields folder` }]
    }
  ]
});
