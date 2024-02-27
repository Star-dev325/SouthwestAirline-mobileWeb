const { storiesOf } = require('@storybook/react');
import React from 'react';
import ToggleSwitch from 'src/shared/components/toggleSwitch';

storiesOf('components/toggleSwitch', module)
  .add('default', () => {
    return <ToggleSwitch />;
  })
  .add('checked', () => {
    return <ToggleSwitch checked />;
  })
  .add('disabled', () => {
    return <ToggleSwitch disabled />;
  });
