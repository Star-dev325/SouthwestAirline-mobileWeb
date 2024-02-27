import _ from 'lodash';
import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';

import { MobileBoardingPassPage } from 'src/checkIn/pages/mobileBoardingPassPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

import CheckInRetrieveBoardingPassBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder';

const props = {
  shouldShowShareLink: true,
  messages: [
    {
      body: 'This is only a test.'
    }
  ],
  boardingPassesLink: 'link',
  resetBoardingPassFn: _.noop,
  setCheckInFlowStatusFn: _.noop,
  retrieveBoardingPassFn: _.noop,
  clearBoardingPassFn: _.noop,
  clearBoardingPassURLsFn: _.noop,
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  push: _.noop,
  replace: _.noop,
  location: {
    state: {
      recordLocator: 'AF89LF',
      firstName: 'Shelton',
      lastName: 'Suen'
    }
  },
  mobileBoardingPasses: new CheckInRetrieveBoardingPassBuilder().build().checkInRetrieveBoardingPassPage
    .mobileBoardingPassViewPage.mobileBoardingPassView
};

const store = createMockedFormStore();

storiesOf('pages/checkIn/mobileBoardingPassPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <MobileBoardingPassPage {...props} />;
  })
  .add('multiple boarding passes', () => {
    const newProps = {
      mobileBoardingPasses: new CheckInRetrieveBoardingPassBuilder().withMultipleBoardingPasses().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView
    };
    return <MobileBoardingPassPage {...props} {...newProps} />;
  })
  .add('security document', () => {
    const newProps = {
      mobileBoardingPasses: new CheckInRetrieveBoardingPassBuilder().withSecurityDocument().build()
        .checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView
    };
    return <MobileBoardingPassPage {...props} {...newProps} />;
  })
  .add('drink coupon', () => {
    props.mobileBoardingPasses = new CheckInRetrieveBoardingPassBuilder()
    .setDrinkCouponHeaderInfo("You have 2 Drink Coupons", "Just show your screen to one of your flight attendants. Cheers!")
    .build().checkInRetrieveBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView;

    return <MobileBoardingPassPage {...props}  />;
  });
