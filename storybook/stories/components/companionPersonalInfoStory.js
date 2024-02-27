import { storiesOf } from '@storybook/react';
import React from 'react';

import CompanionPersonalInfo from 'src/companion/components/companionPersonalInfo';

const companionInfo = {
  birthDate: '1989-02-25',
  gender: 'Male',
  name: {
    firstName: 'James',
    lastName: 'Merson'
  }
};

storiesOf('components/companionPersonalInfo', module)
  .add('default', () => {
    return <CompanionPersonalInfo companionInfo={companionInfo} />;
  })
  .add('with name suffix', () => {
    const companionInfoWithSuffix = {
      birthDate: '1989-02-25',
      gender: 'Male',
      name: 'James Merson',
      suffix: 'SR'
    };

    return <CompanionPersonalInfo companionInfo={companionInfoWithSuffix} />;
  });
