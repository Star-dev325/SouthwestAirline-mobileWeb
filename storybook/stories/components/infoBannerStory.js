import { storiesOf } from '@storybook/react';
import React from 'react';

import InfoBanner from 'src/shared/components/infoBanner';

const bodyText =
  'Certain fruits, vegetables, plants, and flowers are prohibited in carry-on items when traveling between Hawaiian islands.';
const headerText = 'Interisland Carryon Restrictions';
const learnMoreUrl = 'https://www.southwest.com/html/air/newservicehawaii.html';

storiesOf('components/infoBanner', module).add('default', () => {
  return (
    <div>
      <InfoBanner body={bodyText} header={headerText} learnMoreUrl={learnMoreUrl} />
    </div>
  );
});
