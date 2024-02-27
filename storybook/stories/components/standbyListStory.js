import React from 'react';
import { storiesOf } from '@storybook/react';
import StandbyList from 'src/standby/components/standbyList';
import { standbyListPage } from 'mocks/templates/standby/success';

storiesOf('components/standbyList', module).add('default', () => {
  return (
    <div>
      <StandbyList standbyList={standbyListPage.standbyList} />
    </div>
  );
});
