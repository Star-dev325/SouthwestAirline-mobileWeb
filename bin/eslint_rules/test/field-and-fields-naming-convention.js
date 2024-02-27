const rule = require('../lib/field-and-fields-naming-convention');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parser: '@babel/eslint-parser' });

ruleTester.run('field-and-fields-naming-convention', rule, {
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
      filename: '/path/src/shared/form/fields/__test__/someFieldSpces.jsx'
    }
  ],

  invalid: [
    {
      code: `export default withField()(SomeInput);`,
      filename: '/path/src/shared/form/fields/someInput.jsx',
      errors: [{ message: `The file name should end with Field for a form field component.` }]
    },
    {
      code: `export default withFields(SomeInput);`,
      filename: '/path/src/shared/form/fields/someButtons.jsx',
      errors: [{ message: `The file name should end with Fields for a form fields component.` }]
    },
    {
      code: `export default SomeInput;`,
      filename: '/path/src/shared/form/fields/someFields.jsx',
      errors: [{ message: `The field or fields should always wrapped with HOC withField or withFields.` }]
    }
  ]
});
