import React from 'react';
import { storiesOf } from '@storybook/react';
import AirChangePriceTotal from 'src/airChange/components/airChangePriceTotal';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';

storiesOf('components/airChangePriceTotal', module)
  .add('even exchange', () => {
    const priceTotals = new PriceTotalBuilder().withEvenExchange().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('upgrade', () => {
    const priceTotals = new PriceTotalBuilder().withUpgrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('non refundable downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withNonRefundableDowngrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('refundable downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withRefundableDowngrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('split pay downgrade with tax downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withSplitPayDowngrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points even exchange with tax even exchange', () => {
    const priceTotals = new PriceTotalBuilder().withPointEvenExchange().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points even exchange with tax upgrade', () => {
    const priceTotals = new PriceTotalBuilder().withPointEvenExchange().withTaxUpgrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points even exchange with tax downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withPointEvenExchange().withTaxDowngrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points upgrade with tax even exchange', () => {
    const priceTotals = new PriceTotalBuilder().withPointUpgrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points upgrade with tax upgrade', () => {
    const priceTotals = new PriceTotalBuilder().withPointUpgrade().withTaxUpgrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points upgrade with tax downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withPointUpgrade().withTaxDowngrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points downgrade with tax even exchange', () => {
    const priceTotals = new PriceTotalBuilder().withPointDowngrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points downgrade with tax upgrade', () => {
    const priceTotals = new PriceTotalBuilder().withPointDowngrade().withTaxUpgrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  })
  .add('points downgrade with tax downgrade', () => {
    const priceTotals = new PriceTotalBuilder().withPointDowngrade().withTaxDowngrade().build();
    return <AirChangePriceTotal {...priceTotals} />;
  });
