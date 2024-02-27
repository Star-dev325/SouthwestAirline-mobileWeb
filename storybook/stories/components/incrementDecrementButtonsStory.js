import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';

import IncrementDecrementButtons from 'src/shared/components/incrementDecrementButtons/incrementDecrementButtons';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const pageProps = {
    value:1,
    isCircular:true,
    minValue: 1,
    maxValue: 8
};

const nonCircularBtnProps = {
    ...pageProps,
    isCircular:false,
};

const store = createMockedFormStore();

const createComponent = (childProps) => {
  return (
    <div className="bgwhite black pl4">
      <IncrementDecrementButtons {...childProps} />
    </div>
  );
};

storiesOf('components/incrementDecrementButtons', module)
  .addDecorator(StoryRouter())
  .add('default', () => createComponent(pageProps))
  .add('alternative-icons', () => createComponent(nonCircularBtnProps))
