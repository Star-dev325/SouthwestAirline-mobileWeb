import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from 'src/shared/form/components/form';
import Fields from 'src/shared/components/fields';
import Field from 'src/shared/components/field';
import Input from 'src/shared/components/input';

storiesOf('components/field', module).add('default', () => {
  return (
    <Form formId="FORM-ID">
      <Fields type="grouped">
        <Field label="First name">
          <Input />
        </Field>
        <Field label="Last name">
          <Input />
        </Field>
      </Fields>

      <Fields>
        <Field wide={6} label="First name">
          <Input />
        </Field>
        <Field wide={6} label="Last name">
          <Input />
        </Field>
        <Field wide={4} label="age">
          <Input />
        </Field>
      </Fields>
      <Fields>
        <Field wide={16} label="First name">
          <Input />
        </Field>
      </Fields>
      <Fields>
        <Field wide={12} label="Last name">
          <Input />
        </Field>
        <Field wide={4} label="age">
          <Input />
        </Field>
      </Fields>
    </Form>
  );
});
