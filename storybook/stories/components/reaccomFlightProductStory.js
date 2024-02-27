import React from 'react';
import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import ReaccomFlightProduct from 'src/shared/components/reaccomFlightProduct';
import ReaccomFlightProductBuilder from 'test/builders/model/reaccomFlightProductBuilder';

const reaccomFlightProduct = new ReaccomFlightProductBuilder().build();

storiesOf('components/reaccomFlightProduct', module).add('default', () => {
  return (
    <ReaccomFlightProduct flightProductCard={reaccomFlightProduct} onSelected={_.noop} onProductSelected={_.noop} />
  );
});
