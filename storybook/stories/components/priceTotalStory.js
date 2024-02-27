import React from 'react';
import { storiesOf } from '@storybook/react';
import PriceTotal from 'src/shared/components/priceTotal';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';

storiesOf('components/priceTotal', module)
  .add('default', () => {
    const priceTotals = new PriceTotalBuilder().build();
    return <PriceTotal isReprice {...priceTotals} />;
  })
  .add('even exchange', () => {
    const priceTotals = new PriceTotalBuilder().withEvenExchange().build();
    return <PriceTotal {...priceTotals} />;
  })
  .add('upgrade', () => {
    const priceTotals = new PriceTotalBuilder().withUpgrade().build();
    return <PriceTotal {...priceTotals} />;
  })
  .add('non refundable downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withNonRefundableDowngrade().build();
    return <PriceTotal {...priceTotals} />;
  })
  .add('refundable downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withRefundableDowngrade().build();
    return <PriceTotal {...priceTotals} />;
  })
  .add('even exchange with point', () => {
    const priceTotals = new PriceTotalBuilder().withPointEvenExchange().build();
    return <PriceTotal {...priceTotals} />;
  })
  .add('upgrade with point', () => {
    const priceTotals = new PriceTotalBuilder().withPointUpgrade().build();
    return <PriceTotal {...priceTotals} />;
  })
  .add('downgrade with point', () => {
    const priceTotals = new PriceTotalBuilder().withPointDowngrade().build();
    return <PriceTotal {...priceTotals} />;
  });
