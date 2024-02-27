import { storiesOf } from '@storybook/react';
import React from 'react';
import noop from 'lodash/noop';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { MyPromoCodesPage } from 'src/myAccount/pages/myPromoCodesPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import PromoCodesBuilder from 'test/builders/model/promoCodesBuilder';

const EnhancedMyPromoCodesPage = withBodyClass(['bgpdkblue'])(MyPromoCodesPage);

const store = createMockedFormStore();

const defaultProps = {
  push: noop,
  PROMO_CODE_IN_MY_ACCOUNT: false,
  clearPromoCodesFn: noop,
  getPromoCodesFn: noop,
  getPromoCodesPagePlacementsFn: noop
};

const propsWithPromoCodesList = {
  ...defaultProps,
  PROMO_CODE_IN_MY_ACCOUNT: true,
  promoCodesList: new PromoCodesBuilder().build()
};

storiesOf('pages/myAccount/myPromoCodesPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedMyPromoCodesPage {...defaultProps} />;
  })
  .add('withPromoCodesList', () => {
    return <EnhancedMyPromoCodesPage {...propsWithPromoCodesList} />;
  });
