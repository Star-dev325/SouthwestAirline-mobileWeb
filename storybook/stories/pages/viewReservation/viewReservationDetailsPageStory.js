import React from 'react';
import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { ViewReservationDetailPage } from 'src/viewReservation/pages/viewReservationDetailPage';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import { transformResponseToViewReservationDetail } from 'src/shared/transformers/reservationTransformer';

const store = configureMockStore()({
  app: {
    account: {
      isLoggedIn: true
    },
    toggles: { AIRCRAFT_TYPE_VIEWRES: false }
  }
});
const storeWithAircraftTypeViewResToggleOn = configureMockStore()({
  app: {
    account: {
      isLoggedIn: true
    },
    toggles: { AIRCRAFT_TYPE_VIEWRES: true }
  }
});
const defaultProps = {
  viewReservationViewPage: transformResponseToViewReservationDetail(new ViewReservationBuilder().build()),
  companionName: {},
  companionFullName: '',
  history: {
    location: {
      pathname: ''
    }
  },
  query: {
    firstName: '',
    lastName: ''
  },
  retrieveFlightReservationFn: _.noop,
  clearFlightReservationFn: _.noop,
  getAirBookingSeniorVisibilityFn: _.noop,
  blockSeniorFareShopping: true,
  firstName: ''
};
const withCompanionProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withCompanionInfo().build()
  ),
  companionName: {
    firstName: 'Companion',
    lastName: 'Wang'
  },
  companionFullName: 'Companion Wang'
});
const withEarlyBirdProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withEarlyBird().build()
  )
});
const withEarlyBirdAndCOSProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withEarlyBird().withCOS().build()
  )
});
const withInternationalProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withInternationalFlight().build()
  )
});
const withDelayedFlightProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withDelayedFlight().build()
  )
});
const withDelayedStopsProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withDeplayedStops().build()
  )
});
const within24HourOnTimeFlightsProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().with24HourOnTimeFlight().build()
  )
});
const withDynamicWaiverAndChangeLink = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withDynamicWaiver().build()
  )
});
const withDynamicWaiverNoChangeNoReaccomLinks = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withDynamicWaiver().withoutChangeLink().build()
  )
});
const withEditNameSuccessMessage = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withEditNameSuccessMessage().build()
  )
});

const withUpsellDetails = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withUpsellDetails().build()
  )
});

const withLapChild = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withLapChild().build()
  )
};

const withSameDayStandBy = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withSameDayStandBy().build()
  )
};

const withOvernightIndicator = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withOvernightIndicator().build()
  )
};

const withOptionsAndNextSteps = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withOptionsAndNextSteps().build()
  )
};

const withGreyBoxMessage = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withGreyBoxMessage().build()
  )
};

const withEarlyBirdPurchased = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withEarlyBirdPurchased().build()
  )
};

storiesOf('pages/viewReservation/viewReservationDetailsPage', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return <ViewReservationDetailPage {...defaultProps} />;
  })
  .add('withEarlyBird', () => {
    return <ViewReservationDetailPage {...withEarlyBirdProps} />;
  })
  .add('withEarlyBirdAndCOS', () => {
    return <ViewReservationDetailPage {...withEarlyBirdAndCOSProps} />;
  })
  .add('withDelayedTimes', () => {
    return <ViewReservationDetailPage {...withDelayedFlightProps} />;
  })
  .add('withIn24HoursOnTime', () => {
    return <ViewReservationDetailPage {...within24HourOnTimeFlightsProps} />;
  })
  .add('withDelayedStops', () => {
    return <ViewReservationDetailPage {...withDelayedStopsProps} />;
  })
  .add('withCompanion', () => {
    return <ViewReservationDetailPage {...withCompanionProps} />;
  })
  .add('withInternational', () => {
    return <ViewReservationDetailPage {...withInternationalProps} />;
  })
  .add('withDynamicWaiverAndChangeLink', () => {
    return <ViewReservationDetailPage {...withDynamicWaiverAndChangeLink} />;
  })
  .add('withDynamicWaiverNoChangeNoReaccomLinks', () => {
    return <ViewReservationDetailPage {...withDynamicWaiverNoChangeNoReaccomLinks} />;
  })
  .add('withEditNameSuccessMessage', () => {
    return <ViewReservationDetailPage {...withEditNameSuccessMessage} />;
  })
  .add('withUpsellDetails', () => <ViewReservationDetailPage {...withUpsellDetails} />)
  .add('withLapChild', () => <ViewReservationDetailPage {...withLapChild} />)
  .add('withSameDayStandBy', () => <ViewReservationDetailPage {...withSameDayStandBy} />)
  .add('withOvernightIndicator', () => <ViewReservationDetailPage {...withOvernightIndicator} />)
  .add('withOptionsAndNextSteps', () => <ViewReservationDetailPage {...withOptionsAndNextSteps} />)
  .add('withGreyBoxMessage', () => <ViewReservationDetailPage {...withGreyBoxMessage} />)
  .add('withEarlyBirdPurchased', () => <ViewReservationDetailPage {...withEarlyBirdPurchased} />);

storiesOf('pages/viewReservation/viewReservationDetailsPage', module)
  .addDecorator(StoryReduxProvider(storeWithAircraftTypeViewResToggleOn))
  .addDecorator(StoryRouter())
  .add('withEarlyBirdPurchasedWithAircraftTypeViewResToggleOn', () => (
    <ViewReservationDetailPage {...withEarlyBirdPurchased} />
  ));
