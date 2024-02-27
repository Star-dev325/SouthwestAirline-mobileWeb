import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from 'src/shared/components/button';

storiesOf('components/buttonWithColor', module).add('default', () => {
  return (
    <div>
      <Button color="yellow" size="large" fluid>
        {' '}
        Button{' '}
      </Button>
      <br />
      <Button color="white" size="large" fluid>
        {' '}
        Button{' '}
      </Button>
      <br />
      <Button color="grey" size="large" fluid>
        {' '}
        Button{' '}
      </Button>
    </div>
  );
});
