import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import FormSelectField from 'src/shared/form/fields/formSelectField';

const store = createMockedFormStore();
const MockedForm = createMockedForm(createMockedFormStore());
const defaultOptions = [
  { label: 'option1', value: '1' },
  { label: 'option2', value: '2' }
];

storiesOf('components/formSelectField', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <FormSelectField name="select" placeholder="Select" options={defaultOptions} onChange={_.noop} />
      </MockedForm>
    );
  })
  .add('native style', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <FormSelectField
          name="select"
          placeholder="Select"
          options={defaultOptions}
          onChange={_.noop}
          usingNativeStyle
        />
      </MockedForm>
    );
  })
  .add('native style with icon', () => {
    return (
      <MockedForm formId={'formId'} onSubmit={_.noop}>
        <FormSelectField
          name="select"
          iconType="calender"
          placeholder="Select"
          options={defaultOptions}
          onChange={_.noop}
          usingNativeStyle
        />
      </MockedForm>
    );
  });
