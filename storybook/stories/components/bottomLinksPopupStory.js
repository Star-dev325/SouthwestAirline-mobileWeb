import BottomLinksPopup from 'src/shared/components/popups/bottomLinksPopup';
import createMockStore from 'test/unit/helpers/createMockStore';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import React from 'react';

const mockStore = createMockStore();
const store = mockStore({});

const onClick = () => {};

const labelOne = {
  label: 'Label One',
  handler: onClick
};
const labelTwo = {
  label: 'Label Two',
  handler: onClick
};

const defaultProps = {
  active: true,
  bottom: true,
  closeLabel: 'Cancel',
  links: [labelOne, labelTwo],
  onClose: onClick
};

const withSubtitleProps = {
  ...defaultProps,
  subtitle: 'Test subtitle'
};

storiesOf('components/bottomLinksPopup', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <BottomLinksPopup {...defaultProps} />);

storiesOf('components/bottomLinksPopup', module)
  .addDecorator(StoryReduxProvider(store))
  .add('with subtitle', () => <BottomLinksPopup {...withSubtitleProps} />);
