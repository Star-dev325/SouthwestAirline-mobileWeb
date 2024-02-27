import { storiesOf } from '@storybook/react';
import React from 'react';
import PromoCodeBanner from 'src/carBooking/components/promoCodeBanner';

storiesOf('components/promoCodeBanner', module).add('default', () => {
  return (
    <div>
      <PromoCodeBanner promoCodes={{ numberOfAppliedPromoCodes: 2 }} />
      <PromoCodeBanner promoCodes={{ numberOfAppliedPromoCodes: 1 }} />
      <PromoCodeBanner
        promoCodes={{ numberOfAppliedPromoCodes: 1, notAppliedPromoCodes: ['Avis, Wizard Number, 1321321'] }}
      />
      <PromoCodeBanner
        promoCodes={{
          numberOfAppliedPromoCodes: 0,
          notAppliedPromoCodes: ['Avis, Wizard Number, 1321321', 'Avis, Wizard Number, 321321']
        }}
      />
    </div>
  );
});
