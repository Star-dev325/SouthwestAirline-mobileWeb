import createMockStore from 'test/unit/helpers/createMockStore';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import React from 'react';
import VerticalLinksPopup from 'src/shared/components/popups/verticalLinksPopup';

import { DEFAULT, DESTRUCTIVE, PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';

const mockStore = createMockStore();
const store = mockStore({});

const message = 'Here is a description of the popup and guidance on how to proceed.';
const onClick = () => {};

const labelOne = {
  href: 'https://southwest.com/',
  isExternal: true,
  label: 'Label One',
  onClick,
  style: DEFAULT
};
const labelTwo = {
  href: '/',
  isExternal: false,
  label: 'Label Two',
  onClick,
  style: DEFAULT
};
const labelThree = {
  label: 'Label Three',
  onClick,
  style: DEFAULT
};

const sharedProps = {
  active: true,
  hideCloseButton: true,
  title: 'Vertical Links Title'
};
const defaultProps = {
  ...sharedProps,
  links: [labelOne, labelTwo, labelThree]
};
const hideCloseButtonFalseProps = {
  ...sharedProps,
  hideCloseButton: false,
  links: [labelOne]
};
const defaultStyleLinkProps = {
  ...sharedProps,
  links: [
    {
      ...labelOne,
      style: DEFAULT
    }
  ]
};
const primaryStyleLinkProps = {
  ...sharedProps,
  links: [
    {
      ...labelOne,
      style: PRIMARY
    }
  ]
};
const destructiveStyleLinkProps = {
  ...sharedProps,
  links: [
    {
      ...labelOne,
      style: DESTRUCTIVE
    }
  ]
};

storiesOf('components/verticalLinksPopup', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => (
    <VerticalLinksPopup {...defaultProps}>
      <p>{message}</p>
    </VerticalLinksPopup>
  ))
  .add('hide close button false', () => (
    <VerticalLinksPopup {...hideCloseButtonFalseProps}>
      <p>{message}</p>
    </VerticalLinksPopup>
  ))
  .add('default style link', () => (
    <VerticalLinksPopup {...defaultStyleLinkProps}>
      <p>{message}</p>
    </VerticalLinksPopup>
  ))
  .add('primary style link', () => (
    <VerticalLinksPopup {...primaryStyleLinkProps}>
      <p>{message}</p>
    </VerticalLinksPopup>
  ))
  .add('destructive style link', () => (
    <VerticalLinksPopup {...destructiveStyleLinkProps}>
      <p>{message}</p>
    </VerticalLinksPopup>
  ));
