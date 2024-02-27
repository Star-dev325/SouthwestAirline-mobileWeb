import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import changeSearchResponse from 'mocks/templates/air-change/changeReservationForOpenJawFlow';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { AirChangeShoppingSearchPage } from 'src/airChange/pages/airChangeShoppingSearchPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { getFlightSearchMessage } from 'test/builders/model/airChangeShoppingSearchPageBuilder';

const EnhancedAirChangeShoppingSearchPage = withBodyClass('air-change-search-flight')(AirChangeShoppingSearchPage);

const defaultProps = {
  isOpenJawReservation: false,
  searchOptions: {
    departureBoundDisabled: false,
    returnBoundDisabled: false,
    tripType: 'roundTrip',
    lastBookableDate: undefined,
    earliestBookableDate: undefined
  },
  selectedBounds: { firstbound: true, secondbound: true },
  defaultLastBookableDate: '',
  initFormData: {
    departureAndReturnDate: {
      departureDate: '2018-05-06',
      returnDate: '2018-05-10'
    }
  },
  changeFlightPageResponse: changeSearchResponse.changeFlightPage,
  searchForFlightsFn: _.noop,
  clearSelectedProductsFn: _.noop,
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  loadAirportsFn: _.noop,
  loadRecentlySearchedFn: _.noop,
  toggles: {}
};
const store = configureMockStore()({
  app: {
    wcmContent: {
      applicationProperties: {}
    }
  },
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});
const reaccomCoterminalProps = {
  ...defaultProps,
  isReaccom: true,
  reaccomFlightPageResponse: {
    boundSelections: [
      {
        alternateReaccomOriginationAirportCodes: ['HOU','IAH'],
        multiSelectShoppingDates: {
          beginShoppingDate: '2019-11-11',
          endShoppingDate: '2019-11-26'
        }
      }
    ]
  }
};
const reaccomARNKPnrsLayoutProps = {
  ...defaultProps,
  isReaccom: true,
  reaccomFlightPageResponse: {
    _meta: { allowARNKPnrs: true },
    flightSearchMessage: getFlightSearchMessage()
  }
};

storiesOf('pages/airChange/airChangeShoppingSearchPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <EnhancedAirChangeShoppingSearchPage {...defaultProps} />;
  })
  .add('reaccom co-terminal', () => {
    return <EnhancedAirChangeShoppingSearchPage {...reaccomCoterminalProps} />;
  })
  .add('reaccom ARNK layout', () => {
    return <EnhancedAirChangeShoppingSearchPage {...reaccomARNKPnrsLayoutProps} />;
  });
