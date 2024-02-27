import { storiesOf } from '@storybook/react';
import React from 'react';
import { AirChangeSelectPassengersPage } from 'src/airChange/pages/airChangeSelectPassengersPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import StoryRouter from 'storybook-router';
import {
  airChangeSplitPnrDetailsWithDWMessages,
  airChangeSplitPnrDetailsWithHeaderMessage,
  airChangeSplitPnrDetailsWithPassengerTypeText,
  getSplitPnrDetails,
  getStateWithFormData,
  stateWithAllSelectedIdsFormData
} from 'test/builders/model/selectPassengersPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const defaultProps = {
  airChangeSplitPnrDetails: getSplitPnrDetails(),
  hideErrorHeaderMsgFn: () => {},
  history: {
    push: () => {}
  },
  updateFormFieldDataValueFn: () => {}
};
const propsWithDWMessages = {
  ...defaultProps,
  airChangeSplitPnrDetails: airChangeSplitPnrDetailsWithDWMessages
};
const propsWithHeaderMessage = {
  ...defaultProps,
  airChangeSplitPnrDetails: airChangeSplitPnrDetailsWithHeaderMessage
};
const propsWithPassengerTypeText = {
  ...defaultProps,
  airChangeSplitPnrDetails: airChangeSplitPnrDetailsWithPassengerTypeText
};
const unselectedIdObj = { id1: false, id2: true };
const stateWithUnselectedId = getStateWithFormData(unselectedIdObj);
const store = createMockedFormStore(stateWithAllSelectedIdsFormData);
const storeWithUnselectedId = createMockedFormStore(stateWithUnselectedId);

storiesOf('pages/airChange/AirChangeSelectPassengersPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <AirChangeSelectPassengersPage {...defaultProps} />;
  })
  .add('with disabled child passenger type', () => {
    return <AirChangeSelectPassengersPage {...propsWithPassengerTypeText} />;
  });

storiesOf('pages/airChange/AirChangeSelectPassengersPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(storeWithUnselectedId))
  .add('with email field and texts', () => {
    return <AirChangeSelectPassengersPage {...defaultProps} formData={unselectedIdObj} />;
  })
  .add('with dynamic waiver messages', () => {
    return <AirChangeSelectPassengersPage {...propsWithDWMessages} formData={unselectedIdObj} />;
  })
  .add('with header message', () => {
    return <AirChangeSelectPassengersPage {...propsWithHeaderMessage} formData={unselectedIdObj} />;
  })
  .add('with passenger type text', () => {
    return <AirChangeSelectPassengersPage {...propsWithPassengerTypeText} formData={unselectedIdObj} />;
  });
