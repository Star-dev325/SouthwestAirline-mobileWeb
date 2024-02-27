const rule = require('../lib/no-called-in-expect');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

const EXPECTED_ERROR_MESSAGE =
  '.called (or variants) used inside expect() -- try expect(object).to.have.been.called (or variant) instead';

ruleTester.run('no-called-in-expect', rule, {
  valid: [
    {
      code: 'expect(foo).to.have.been.called;'
    },
    {
      code: 'expect(foo).to.have.been.calledTwice;'
    },
    {
      code: 'expect(foo).to.have.been.calledOnce;'
    },
    {
      code: 'expect(foo).to.have.been.calledWith(bar);'
    },
    {
      code: 'expect(foo.bar.baz).to.have.been.called;'
    }
  ],

  invalid: [
    {
      code: 'expect(foo.called).to.have.been.true;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo).to.have.been.called;'
    },
    {
      code: 'expect(foo.called).to.have.been.false;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo).not.to.have.been.called;'
    },
    {
      code: 'expect(foo.calledOnce).to.have.been.true;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo).to.have.been.calledOnce;'
    },
    {
      code: 'expect(foo.calledTwice).to.have.been.true;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo).to.have.been.calledTwice;'
    },
    {
      code: 'expect(foo.calledWith(bar)).to.have.been.true;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo).to.have.been.calledWith(bar);'
    },
    {
      code: 'expect(foo.bar.baz.called).to.have.been.true;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo.bar.baz).to.have.been.called;'
    },
    {
      code: 'expect(foo.calledWith(mock(test(nested)))).to.have.been.true;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo).to.have.been.calledWith(mock(test(nested)));'
    },
    {
      code: 'expect(foo.calledWith(bar));',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo).to.have.been.calledWith(bar);'
    },
    {
      code: 'expect(foo.called).to.be.undefined;',
      errors: [{ message: EXPECTED_ERROR_MESSAGE }],
      output: 'expect(foo.called).to.be.undefined;'
    }
  ]
});
