import { storiesOf } from '@storybook/react';
import React from 'react';
import UnsuccessfulPromoBanner from 'src/carBooking/components/unsuccessfulPromoBanner';

storiesOf('components/unsuccessfulPromoBanner', module).add('default', () => {
  return <UnsuccessfulPromoBanner number={1} invalidPromoCode={'Avis, Wizard Number, B071222'} />;
});
