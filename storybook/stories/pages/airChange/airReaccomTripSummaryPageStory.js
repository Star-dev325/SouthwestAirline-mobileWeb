import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import { AirReaccomTripSummaryPage } from 'src/airChange/pages/airReaccomTripSummaryPage';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import ChangeShoppingPageReaccomResponseBuilder from 'test/builders/apiResponse/changeShoppingPageReaccomResponseBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const reaccomShoppingPageResponse = new ChangeShoppingPageReaccomResponseBuilder().withRoundTrip().build();
const state = {
  app: {
    airChange: {
      reaccomShoppingPage: {
        response: reaccomShoppingPageResponse,
        selectedProducts: {
          outbound: {
            fareProductId: 'outboundProductId',
            flightCardIndex: 0
          }
        }
      }
    }
  }
};

const props = {
  allSelectedProducts: {
    inbound: null,
    outbound: {
      fareProductId: 'outboundProductId',
      flightCardIndex: 0
    }
  },
  changeReaccomFlightFn: _.noop,
  isLoggedIn: false,
  reaccomShoppingPage: reaccomShoppingPageResponse,
  selectedBounds: {
    firstbound: true
  }
};

storiesOf('pages/airChange/AirReaccomTripSummaryPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(createMockedFormStore(state)))
  .add('default', () => {
    return <AirReaccomTripSummaryPage {...props} />;
  })
  .add('openJaw', () => {
    return (
      <AirReaccomTripSummaryPage
        {...props}
        reaccomShoppingPage={new ChangeShoppingPageReaccomResponseBuilder().withOpenJaw().build()}
      />
    );
  })
  .add('with mandatory Email', () => {
    return (
      <AirReaccomTripSummaryPage
        {...props}
        reaccomShoppingPage={new ChangeShoppingPageReaccomResponseBuilder().withMandatoryEmail().build()}
      />
    );
  });
