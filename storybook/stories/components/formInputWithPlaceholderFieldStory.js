import { storiesOf } from '@storybook/react';
import React from 'react';
import { FormInputWithPlaceholderField } from 'src/shared/form/fields/formInputWithPlaceholderField';

storiesOf('components/formInputWithPlaceholderField', module)
  .add('default', () => {
    return <FormInputWithPlaceholderField name="RapidRewardsNumber" placeholder="Rapid Rewards / Acct#" />;
  })
  .add('field has value', () => {
    return (
      <FormInputWithPlaceholderField name="RapidRewardsNumber" placeholder="Rapid Rewards / Acct#" value="601006545" />
    );
  });
