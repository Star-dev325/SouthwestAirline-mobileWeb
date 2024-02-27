import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';

import ContentLink from 'src/shared/components/contentLink';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const EnhancedComponent = withBodyClass('content-link')(ContentLink);

const label = 'This is a link';

const defaultProps = {
  className: 'pblue',
  href: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
};

const store = createMockedFormStore();

storiesOf('components/contentLink', module)
  .addDecorator(StoryRouter())
  .addDecorator(withFakeClock('2018-01-01'))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <EnhancedComponent {...defaultProps}>{label}</EnhancedComponent>);
