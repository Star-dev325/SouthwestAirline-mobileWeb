import { storiesOf } from '@storybook/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import Dialog from 'src/shared/components/dialog';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import EnhancedStandbyPage from 'src/standby/pages/enhancedStandbyPage';
import { StandbyPage } from 'src/standby/pages/standbyPage';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import StandbyResponseBuilder from 'test/builders/apiResponse/standbyBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

const StandbyComponent = withBodyClass('standby-list-page')(StandbyPage);

const props = {
  standbyListPage: new StandbyResponseBuilder().build()
};
const standbyListPageWithOutSeatsAvailableText = {
  standbyListPage: new StandbyResponseBuilder().withOutSeatsAvailableText().build()
};
const defaultProps = {
  location: {
    search: 'search',
    state: { hasEditedName: false, passengerSearchToken: 'some-token' },
    href: '#'
  },
  match: { params: '' }
};
const defaultState = {
  app: {
    errorHeader: {
      errorMessage: null,
      hasError: false
    },
    standby: { standbyPage: { response: { standbyListPage: props.standbyListPage } } },
    toggles: { ENHANCED_STANDBY_LIST: true },
    viewReservation: props.viewReservation?.viewReservationViewPage
  },
  router: {
    location: {
      href: '#',
      search: 'search',
      state: { hasEditedName: false, passengerSearchToken: 'some-token' }
    }
  }
};
const seatsUnavailableTextState = {
  app: {
    ...defaultState.app,
    standby: {
      standbyPage: { response: { standbyListPage: standbyListPageWithOutSeatsAvailableText.standbyListPage } }
    }
  },
  ...defaultState.router
};
const store = createMockStoreWithRouterMiddleware()({ ...defaultState });
const store1 = createMockStoreWithRouterMiddleware()({ ...seatsUnavailableTextState });

const history = createMemoryHistory({
  initialEntries: [{ ...defaultProps.location }]
});

const _router = (story) => <Router history={history}><div><Dialog />{story()}</div></Router>;

storiesOf('pages/standby/standbyPage', module)
  .addDecorator(withFakeClock('2017-09-07 05:55:22'))
  .addDecorator((story) => _router(story))
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <StandbyComponent {...props} />;
  })
  .add('Enhanced Standby Page', () => {
    return <EnhancedStandbyPage {...defaultProps} />;
  });

storiesOf('pages/standby/standbyPage', module)
  .addDecorator(withFakeClock('2017-09-07 05:55:22'))
  .addDecorator((story) => _router(story))
  .addDecorator(StoryReduxProvider(store1))
  .add('with out seats available text', () => {
    return <EnhancedStandbyPage {...defaultProps} />;
  });
