import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from 'src/shared/components/input';
import Button from 'src/shared/components/button';

storiesOf('components/inputWithAddons', module).add('default', () => {
  return (
    <div>
      <Input fluid icon="check" label="http://" labelLeft />
      <Input fluid icon="check" iconLeft label="http://" />
      <Input fluid icon="check" />
      <Input fluid icon="check" iconLeft />
      <Input fluid label="http://" />
      <Input fluid label="http://" labelLeft />
      <Input fluid action={<Button icon="check" />} />
      <Input fluid action={<Button icon="check" />} actionLeft />
    </div>
  );
});
