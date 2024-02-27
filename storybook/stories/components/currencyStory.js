const { storiesOf } = require('@storybook/react');
const React = require('react');
import Currency from 'src/shared/components/currency';

storiesOf('components/currency', module)
  .add('us dollar', () => {
    return <Currency amount="12.98" currencyCode="USD" currencySymbol="$" />;
  })
  .add('non-us currency', () => {
    return <Currency amount="12.98" currencyCode="CNY" currencySymbol="¥" />;
  })
  .add('points', () => {
    return <Currency amount="13,498" currencyCode="PTS" />;
  })
  .add('points with PTS suffix', () => {
    return <Currency amount="13,498" currencyCode="PTS" showPts />;
  })
  .add('strike-through dollar', () => {
    return <Currency amount="12.98" currencyCode="USD" currencySymbol="$" strikeThrough />;
  })
  .add('strike-through points', () => {
    return <Currency amount="13,498" strikeThrough />;
  });
