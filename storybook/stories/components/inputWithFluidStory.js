import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from 'src/shared/components/input';

storiesOf('components/inputWithFluid', module).add('default', () => {
  return (
    <div>
      <Input size="mini" fluid />
      <Input size="tiny" fluid />
      <Input fluid />
      <Input size="large" fluid />
      <Input size="big" fluid />
      <Input size="huge" fluid />
      <Input size="massive" fluid />
    </div>
  );
});
