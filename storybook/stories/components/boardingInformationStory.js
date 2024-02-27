import { storiesOf } from '@storybook/react';
import React from 'react';
import BoardingInformation from 'src/shared/components/boardingInformation';

storiesOf('components/boardingInformation', module)
  .add('default (no boarding gate)', () => {
    return <BoardingInformation boardingGroup="A" boardingPosition="18" />;
  })
  .add('with boarding gate', () => {
    return <BoardingInformation boardingGate="12" boardingGroup="B" boardingPosition="12" />;
  })
  .add('with boarding gate provided but not available yet', () => {
    return <BoardingInformation boardingGate="---" boardingGroup="C" boardingPosition="12" />;
  });
