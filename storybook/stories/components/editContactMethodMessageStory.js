import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import EditContactMethodMessage from 'src/shared/components/editContactMethodMessage';

const bodyText =
  'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.';
const linkText = 'Edit contact method';
const onClick = _.noop;

storiesOf('components/editContactMethodMessage', module).add('default', () => {
  return (
    <div>
      <EditContactMethodMessage body={bodyText} linkText={linkText} onClick={onClick} />
    </div>
  );
});
