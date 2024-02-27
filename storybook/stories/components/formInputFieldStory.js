import { storiesOf } from '@storybook/react';
import React from 'react';
import { FormInputField } from 'src/shared/form/fields/formInputField';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';

storiesOf('components/formInputField', module)
  .add('default', () => {
    return <FormInputField name="defaultField" placeholder="Enter Text" />;
  })
  .add('native style', () => {
    return <FormInputField name="nativeStyleField" placeholder="Enter Text" usingNativeStyle />;
  })
  .add('native style with icon', () => {
    return (
      <FormInputField
        containerClassName="search-flights--form-input"
        iconType="airplane-depart"
        name="flightNumber"
        pattern="[0-9]*"
        placeholder="Flight # (optional)"
        usingNativeStyle
        {...getMaskProps({ rule: '9', repeat: 4 })}
      />
    );
  })
  .add('native style with error', () => {
    return (
      <FormInputField
        name="flightNumber"
        placeholder="Flight # (optional)"
        iconType="airplane-depart"
        pattern="[0-9]*"
        usingNativeStyle
        error
        {...getMaskProps({ rule: '9', repeat: 4 })}
      />
    );
  });
