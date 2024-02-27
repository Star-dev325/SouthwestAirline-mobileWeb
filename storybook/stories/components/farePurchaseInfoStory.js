import { storiesOf } from '@storybook/react';
import React from 'react';
import FarePurchaseInfo from 'src/shared/components/farePurchaseInfo';
import FareProductBuilder from 'test/builders/model/fareProductForChapiBuilder';

storiesOf('components/farePurchaseInfo', module)
  .add('default', () => {
    const fareProduct = new FareProductBuilder().build();
    return <FarePurchaseInfo fareProduct={fareProduct} promoCodeApplied={false} canBeSelected />;
  })
  .add('sold out', () => {
    const fareProduct = new FareProductBuilder().withReasonIfUnavailable('Sold Out').build();
    return <FarePurchaseInfo fareProduct={fareProduct} promoCodeApplied={false} canBeSelected={false} />;
  })
  .add('invalid with depart time', () => {
    const fareProduct = new FareProductBuilder().withReasonIfUnavailable('Invalid w/ depart date').build();
    return <FarePurchaseInfo fareProduct={fareProduct} promoCodeApplied={false} canBeSelected={false} />;
  })
  .add('invalid with return time', () => {
    const fareProduct = new FareProductBuilder().withReasonIfUnavailable('Invalid w/ return date').build();
    return <FarePurchaseInfo fareProduct={fareProduct} promoCodeApplied={false} canBeSelected={false} />;
  })
  .add('with limited seats', () => {
    const fareProduct = new FareProductBuilder().withLimitedSeats('3 left').build();
    return <FarePurchaseInfo fareProduct={fareProduct} promoCodeApplied={false} canBeSelected />;
  });
