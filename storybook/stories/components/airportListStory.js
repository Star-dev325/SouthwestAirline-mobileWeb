import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import createMockStore from 'test/unit/helpers/createMockStore';
import AirportList from 'src/airports/components/airportList';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

const mockStore = createMockStore();
const store = mockStore({
  app: {  
    formData: { MULTI_SELECT_GROUP_FORM_ORIGIN: { url: '', data: { BOT: true, BOS: true, BDL:true, MHT: true, PVD: true  } } }
  }
});

const AIRPORT_LIST = [
  {
    code: 'DEN',
    airportName: 'Denver',
    displayName: 'Denver',
    cityName: 'Denver',
    shortDisplayName: 'Denver',
    cityState: 'CO',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '39.8617',
    longitude: '-104.673',
    airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing'
  },
  {
    code: 'CAK',
    airportName: 'Akron-Canton',
    displayName: 'Akron-Canton',
    cityName: 'Akron',
    shortDisplayName: 'Akron',
    cityState: 'OH',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '40.9161',
    longitude: '-81.4422',
    airportSearchName: 'Ohio'
  },
  {
    code: 'ALB',
    airportName: 'Albany',
    displayName: 'Albany',
    cityName: 'Albany',
    shortDisplayName: 'Albany',
    cityState: 'NY',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '42.7483',
    longitude: '-73.8017',
    airportSearchName: 'New York'
  }
];

const props = {
  allAirports: AIRPORT_LIST,
  recentlySearched: [],
  title: 'Airport List',
  modalId: 'MODAL_AIRPORT_LIST',
  onAirportSelect: _.noop,
  onCancel: _.noop,
  updateRecentAirportSearchFn: _.noop,
  deleteFromRecentAirportSearchFn: _.noop,
  showDialogFn: _.noop,
  isWebView: false
};

storiesOf('components/airportList', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <AirportList {...props} />;
  })
  .add('with back button', () => {
    return <AirportList {...props} showBackButton={true} />;
  })
  .add('empty allAirports list', () => {
    return <AirportList {...props} allAirports={[]} />;
  })
  .add('with done button', () => {
    return (
      <AirportList
        {...props}
        isMultiSelectGroupEnabled
        allAirports={getMultiSelectGroup()['Boston Area Airports']}
        airportGroupData={['BOS', 'BDL', 'MHT', 'PVD']}
        searchString={'BOS'}
        modalId= {'from'}
      />
    );
  });
