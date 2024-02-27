const rule = require('../lib/selector-naming-pattern');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parser: '@babel/eslint-parser' });
const EXPECTED_ERROR_MESSAGE =
  "Avoid using variables named 'CompanionInfo', use 'get, is, should, has' to name a selector";

ruleTester.run('selector-naming-pattern', rule, {
  valid: [
    {
      code: 'export default getPaymentInfo',
      filename: 'testSelectors.js',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }]
    },
    {
      code: 'export default getEBInPath',
      filename: 'testSelectors.js',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }]
    }
  ],
  invalid: [
    {
      code: 'export default CompanionInfo',
      filename: 'testSelectors.js',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }]
    },
    {
      code: `export const CompanionInfo = '123'`,
      filename: 'testSelectors.js',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }]
    }
  ]
});
