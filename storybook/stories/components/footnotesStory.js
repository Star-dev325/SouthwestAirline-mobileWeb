import React from 'react';
import { storiesOf } from '@storybook/react';
import Footnotes from 'src/shared/components/footnotes';

import { disclaimers } from 'mocks/templates/productDefinitions';

storiesOf('components/footnotes', module).add('default', () => (
  <div className={'bgpdkblue white'}>
    <Footnotes footnotes={disclaimers} />
  </div>
));
