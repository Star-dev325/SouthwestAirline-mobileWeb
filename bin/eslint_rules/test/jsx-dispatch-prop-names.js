const rule = require('../lib/jsx-dispatch-prop-names');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('jsx-dispatch-prop-names', rule, {
  valid: [
    {
      code: 'var mapDispatchToProps = {checkPassengerNameFn: Actions.check};',
      filename: 'ruletests/components/testComponent.jsx'
    },
    {
      code: 'var mapDispatchToProps = {onSubmitForm: Actions.submitForm};',
      filename: 'ruletests/components/testComponent.jsx'
    },
    {
      code: 'connect(mapStateToProps, {retrieveFn: Actions.retrieve})',
      filename: 'ruletests/components/testComponent.jsx'
    },
    {
      code: 'connect(mapStateToProps, {goBack: history.goBack})',
      filename: 'ruletests/enhancers/withConnectedReactRouter.jsx'
    }
  ],

  invalid: [
    {
      code: 'var mapDispatchToProps = {getAccountInfo: Actions.getAccount};',
      filename: 'ruletests/components/testComponent.jsx',
      errors: [
        {
          message:
            "Avoid to use 'getAccountInfo' as key name, the key name in mapDispatchToProps can only be endWith 'Fn' or start with 'onClick', 'onSubmit' and 'onChange'"
        }
      ]
    },
    {
      code: 'connect(mapStateToProps, {retrieve: Actions.retrieve})',
      filename: 'ruletests/components/testComponent.jsx',
      errors: [
        {
          message:
            "Avoid to use 'retrieve' as key name, the key name in mapDispatchToProps can only be endWith 'Fn' or start with 'onClick', 'onSubmit' and 'onChange'"
        }
      ]
    }
  ]
});
