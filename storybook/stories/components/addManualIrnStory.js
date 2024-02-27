import AddManualIrnPage from 'src/airBooking/pages/addManualIrnPage';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import React from 'react';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();
const store = mockStore({
  getState: () => {},
  app: {
    toggles: {},
    airBooking: {
      irnInfo: {
        irnRequired: false
      }
    }
  }
});

const props = {
  match: {
    params: {}
  },
  location: {
    search: 'search'
  },
  goBack: _.noop,
  push: _.noop,
  irnInfo: {
    irnRequired: false,
    alternateIrnAllowed: true
  },
  updateSelectedIrnFn: _.noop
};

storiesOf('components/addManualIrn', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <AddManualIrnPage {...props} />);
