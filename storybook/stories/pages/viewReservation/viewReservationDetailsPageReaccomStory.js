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
    toggles: {}
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
const withReaccomProps = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(new ViewReservationBuilder().withReaccom().build())
});
const withReaccomAndNoCancelLink = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withReaccom().withoutCancelLink().build()
  )
});
const withDynamicWaiverAndReaccomLink = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withDynamicWaiver().withReaccom().build()
  )
});
const withReaccomDynamicWaierAndEditNameSuccessMessage = _.merge({}, defaultProps, {
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withDynamicWaiver().withReaccom().withEditNameSuccessMessage().build()
  )
});
const withDisruptedFLIXBoundMessage = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withReaccom().withDisruptedFLIXBoundMessage().build()
  )
};
const withDisruptedOPRBoundMessage = {
  ...defaultProps,
  viewReservationViewPage: transformResponseToViewReservationDetail(
    new ViewReservationBuilder().withReaccom().withDisruptedOPRBoundMessage().build()
  )
};

storiesOf('pages/viewReservation/viewReservationDetailsPageReaccom', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('withReaccom', () => {
    return <ViewReservationDetailPage {...withReaccomProps} />;
  })
  .add('withReaccomAndNoCancelLink', () => {
    return <ViewReservationDetailPage {...withReaccomAndNoCancelLink} />;
  })
  .add('withDynamicWaiverAndReaccomLink', () => {
    return <ViewReservationDetailPage {...withDynamicWaiverAndReaccomLink} />;
  })
  .add('withEditNameSuccessMessage', () => {
    return <ViewReservationDetailPage {...withReaccomDynamicWaierAndEditNameSuccessMessage} />;
  })
  .add('withDisruptedFLIXBoundMessage', () => {
    return <ViewReservationDetailPage {...withDisruptedFLIXBoundMessage} />;
  })
  .add('withDisruptedOPRBoundMessage', () => {
    return <ViewReservationDetailPage {...withDisruptedOPRBoundMessage} />;
  });
