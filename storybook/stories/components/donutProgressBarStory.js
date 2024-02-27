import { storiesOf } from '@storybook/react';
import React from 'react';
import DonutProgressBar from 'src/shared/components/donutProgressBar';

const styles = {
  position: 'relative',
  width: '200px',
  height: '200px'
};

storiesOf('components/donutProgressBar', module).add('default', () => {
  return (
    <div>
      <DonutProgressBar width={100} height={100} percentage={80} offsetAngle={60} />

      <div style={styles}>
        <DonutProgressBar percentage={80} offsetAngle={60} autoFill />
      </div>
    </div>
  );
});
