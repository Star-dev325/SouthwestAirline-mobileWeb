import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from 'src/shared/components/input';

storiesOf('components/input', module).add('default', () => {
  return (
    <div>
      <Input type="text" placeholder="text" />
    </div>
  );
});
