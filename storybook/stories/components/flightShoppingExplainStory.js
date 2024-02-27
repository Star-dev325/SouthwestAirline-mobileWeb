const { storiesOf } = require('@storybook/react');
const React = require('react');
import FlightShoppingExplain from 'src/shared/components/flightShoppingExplain';

storiesOf('components/flightShoppingExplain', module)
  .add('with switch button', () => {
    return (
      <div className="bgpdkblue">
        <FlightShoppingExplain currencySuit="money" showCurrencySwitch />
      </div>
    );
  })
  .add('without switch button', () => {
    return (
      <div className="bgpdkblue">
        <FlightShoppingExplain currencySuit="money" showCurrencySwitch={false} />
      </div>
    );
  })
  .add('show security fee disclaimer when use points', () => {
    return (
      <div className="bgpdkblue">
        <FlightShoppingExplain
          currencySuit="points"
          securityFeeContent="Award travel is subject to payment of the government-imposed September 11th Security fee, up to $5.60 one-way, $11.20 roundtrip."
          showCurrencySwitch
        />
      </div>
    );
  });
