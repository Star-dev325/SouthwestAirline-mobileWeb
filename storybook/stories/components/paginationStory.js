import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';

import Pagination from 'src/shared/components/pagination';

storiesOf('components/pagination', module).add('default', () => {
  return <Pagination selected={0} totalPageCount={2} clickCallback={_.noop} />;
});
