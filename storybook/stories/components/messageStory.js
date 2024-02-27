import { storiesOf } from '@storybook/react';
import React from 'react';
import Message from 'src/shared/components/message';

storiesOf('components/message', module).add('default', () => {
  return (
    <div>
      <Message status="error">Some passengers are not checked in.</Message>
      <Message status="success">You're checked in!</Message>
    </div>
  );
});
