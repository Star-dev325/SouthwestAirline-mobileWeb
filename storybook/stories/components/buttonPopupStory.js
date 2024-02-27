import ButtonPopup from 'src/shared/components/popups/buttonPopup';
import createMockStore from 'test/unit/helpers/createMockStore';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import React from 'react';

import { DEFAULT, DESTRUCTIVE, PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';

const mockStore = createMockStore();
const store = mockStore({});

const message = 'Here is a description of the popup and guidance on how to proceed.';

const onClick = () => {};

const buttonOne = {
  label: 'Button One',
  onClick
};
const buttonTwo = {
  label: 'Button Two',
  onClick
};

const sharedProps = {
  active: true,
  title: 'Button Popup Title'
};
const defaultProps = {
  ...sharedProps,
  buttons: [buttonOne]
};
const twoButtonProps = {
  ...sharedProps,
  buttons: [buttonOne, buttonTwo]
};
const defaultStyleProps = {
  ...sharedProps,
  buttons: [
    buttonOne,
    {
      ...buttonTwo,
      style: DEFAULT
    }
  ]
};
const primaryStyleProps = {
  ...sharedProps,
  buttons: [
    buttonOne,
    {
      ...buttonTwo,
      style: PRIMARY
    }
  ]
};
const destructiveStyleProps = {
  ...sharedProps,
  buttons: [
    buttonOne,
    {
      ...buttonTwo,
      style: DESTRUCTIVE
    }
  ]
};

storiesOf('components/buttonPopup', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => (
    <ButtonPopup {...defaultProps}>
      <p>{message}</p>
    </ButtonPopup>
  ))
  .add('two buttons', () => (
    <ButtonPopup {...twoButtonProps}>
      <p>{message}</p>
    </ButtonPopup>
  ))
  .add('default style button', () => (
    <ButtonPopup {...defaultStyleProps}>
      <p>{message}</p>
    </ButtonPopup>
  ))
  .add('primary style button', () => (
    <ButtonPopup {...primaryStyleProps}>
      <p>{message}</p>
    </ButtonPopup>
  ))
  .add('destructive style button', () => (
    <ButtonPopup {...destructiveStyleProps}>
      <p>{message}</p>
    </ButtonPopup>
  ));
