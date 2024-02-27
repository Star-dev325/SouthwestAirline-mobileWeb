import createMockStore from 'test/unit/helpers/createMockStore';
import { InternalReferenceNumberSelect as InternalReferenceNumberSelectClass } from 'src/airBooking/pages/internalReferenceNumberSelect';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import React from 'react';
import configureMockStore from 'redux-mock-store';

const mockStore = createMockStore();
const store = mockStore({
  app: {
    toggles: {},
    app: {},
    router: {
      location: {
        search: 'search'
      }
    },
    params: {}
  }
});

const irnInfo = {
  irnRequired: true,
  alternateIrnAllowed: false,
  preselectedInternalReferenceNumber: {
    name: 'IrnName',
    description: 'IrnDescription'
  },
  companyInternalReferenceNumbers: [
    {
      name: 'IrnName',
      description: 'IrnDescription'
    },
    {
      name: 'Companyirn123',
      description: 'companyirndescription'
    }
  ],
  travelerInternalReferenceNumbers: [
    {
      name: '253376',
      description: 'Legal Department'
    }
  ]
};
const irnInfoWithAlternateIrnAllowed = {
  irnRequired: false,
  alternateIrnAllowed: true,
  preselectedInternalReferenceNumber: {
    name: 'IrnName',
    description: 'IrnDescription'
  },
  companyInternalReferenceNumbers: [
    {
      name: 'IrnName',
      description: 'IrnDescription'
    },
    {
      name: 'Companyirn123',
      description: 'companyirndescription'
    }
  ],
  travelerInternalReferenceNumbers: [
    {
      name: '253376',
      description: 'Legal Department'
    }
  ]
};

const props = {
  irnInfo,
  updateSelectedIrnFn: () => {},
  goBack: () => {}
};

const propsWithAlternateIrnAllowed = {
  irnInfo: irnInfoWithAlternateIrnAllowed,
  updateSelectedIrnFn: () => {},
  goBack: () => {}
};

storiesOf('pages/airBooking/internalReferenceNumberSelect', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(store)))
  .add('alternateIrnAllowed', () => <InternalReferenceNumberSelectClass {...propsWithAlternateIrnAllowed} />)
  .add('default', () => <InternalReferenceNumberSelectClass {...props} />);
