import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';

import FeaturesList from 'src/shared/components/featuresList';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import productDefinitions from 'mocks/templates/productDefinitions';

const EnhancedFeaturesList = withBodyClass('features-list')(FeaturesList);

const pageProps = {
  features: productDefinitions.products[1].features
};

const alternateIconsProps = {
  features: productDefinitions.products[0].features.map((item) => ({ ...item, icon: 'check' }))
};

const noIconProps = {
  productId: 'PLU',
  id: 'PLU',
  label: 'Wanna Get Away Plus',
  stylizedLabel: [
    {
      label: 'Wanna Get Away',
      primaryLabelColor: 'primary-dark-blue',
      inverseLabelColor: 'neutral-white'
    },
    {
      label: ' plus',
      font: 'Fairwater Script',
      primaryLabelColor: 'primary-red',
      inverseLabelColor: 'neutral-white'
    }
  ],
  inverseThemeColor: 'neutral-white',
  primaryThemeColor: 'primary-red',
  rowOrder: 2,
  features: [
    {
      icon: 'wrong',
      label: 'All the benefits of Wanna Get Away, plus:'
    },
    {
      icon: 'plus',
      label: 'Same-day change',
      suffix: '3'
    },
    {
      icon: 'plus',
      label: 'Same-day standby',
      suffix: '3'
    },
    {
      icon: 'plus',
      label: 'Transferable Funds',
      suffix: '4'
    }
  ]
};

const store = createMockedFormStore();

const createComponent = (childProps) => {
  return (
    <div className="bgwhite black pl4">
      <EnhancedFeaturesList {...childProps} />
    </div>
  );
};

storiesOf('components/featuresList', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => createComponent(pageProps))
  .add('alternative-icon', () => createComponent(alternateIconsProps))
  .add('no-icon', () => createComponent(noIconProps));
