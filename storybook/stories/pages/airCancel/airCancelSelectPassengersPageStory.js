import { storiesOf } from '@storybook/react';
import React from 'react';
import { AirCancelSelectPassengersPage } from 'src/airCancel/pages/airCancelSelectPassengersPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import StoryRouter from 'storybook-router';
import {
  getSplitPnrDetailsForAirCancel,
  getStateWithFormDataForAirCancel,
  stateWithAllSelectedIdsFormDataForAirCancel
} from 'test/builders/model/selectPassengersPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const defaultProps = {
  airCancelSplitPnrDetails: getSplitPnrDetailsForAirCancel(),
  hideErrorHeaderMsgFn: () => {},
  history: {
    push: () => {}
  },
  updateFormFieldDataValueFn: () => {}
};
const unselectedIdObj = { id1: false, id2: true };
const stateWithUnselectedId = getStateWithFormDataForAirCancel(unselectedIdObj);
const store = createMockedFormStore(stateWithAllSelectedIdsFormDataForAirCancel);
const storeWithUnselectedId = createMockedFormStore(stateWithUnselectedId);

storiesOf('pages/airCancel/AirCancelSelectPassengersPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <AirCancelSelectPassengersPage {...defaultProps} />;
  });

storiesOf('pages/airCancel/AirCancelSelectPassengersPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(storeWithUnselectedId))
  .add('with email field and texts', () => {
    return <AirCancelSelectPassengersPage {...defaultProps} formData={unselectedIdObj} />;
  });
