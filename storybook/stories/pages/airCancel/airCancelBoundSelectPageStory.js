import { storiesOf } from '@storybook/react';
import React from 'react';
import { AirCancelBoundSelectPage } from 'src/airCancel/pages/airCancelBoundSelectPage';
import SharedConstants from 'src/shared/constants/sharedConstants';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import AirCancelBoundSelectPageMockResponseBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/airCancelBoundSelectPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const { cancelMessage } = SharedConstants;

const rtProps = {
  cancelBoundPage: {
    recordLocator: 'TIEOQX',
    boundSelections: [
      {
        productId: 'abcd',
        flightType: 'Departure',
        originalDate: '2020-06-03',
        fromAirport: 'Albany, NY - ALB',
        fromAirportCode: 'ALB',
        toAirport: 'Dallas (Love Field), TX - DAL',
        toAirportCode: 'DAL',
        flight: '1471/634',
        timeDeparts: '05:30',
        timeArrives: '10:25',
        isSelectable: true
      },
      {
        productId: 'zyxw',
        flightType: 'Return',
        originalDate: '2020-06-04',
        fromAirport: 'Dallas (Love Field), TX - DAL',
        fromAirportCode: 'DAL',
        toAirport: 'Albany, NY - ALB',
        toAirportCode: 'ALB',
        flight: '1941/551',
        timeDeparts: '06:00',
        timeArrives: '12:25',
        isSelectable: true
      }
    ],
    _meta: {
      showBoundSelection: true
    },
    _links: {
      refundQuote: {
        href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/TIEOQX',
        method: 'POST',
        body: {
          cancelToken: 'cancel-token',
          passengerSearchToken: 'passenger-search-token'
        }
      }
    },
  },
  selectBoundAnalyticsFn: () => {}
};

const owProps = {
  cancelBoundPage: {
    recordLocator: 'TIEOQX',
    boundSelections: [
      {
        productId: 'abcd',
        flightType: 'Departure',
        originalDate: '2020-06-03',
        fromAirport: 'Albany, NY - ALB',
        fromAirportCode: 'ALB',
        toAirport: 'Dallas (Love Field), TX - DAL',
        toAirportCode: 'DAL',
        flight: '1471/634',
        timeDeparts: '05:30',
        timeArrives: '10:25',
        isSelectable: true
      }
    ],
    _meta: {
      showBoundSelection: true
    },
    _links: {
      refundQuote: {
        href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/TIEOQX',
        method: 'POST',
        body: {
          cancelToken: 'cancel-token',
          passengerSearchToken: 'passenger-search-token'
        }
      }
    },
    cancelMessage
  },
  selectBoundAnalyticsFn: () => {}
};

const pfProps = {
  cancelBoundPage: {
    recordLocator: 'TIEOQX',
    boundSelections: [
      {
        productId: 'abcd',
        flightType: 'Departure',
        originalDate: '2020-06-03',
        fromAirport: 'Albany, NY - ALB',
        fromAirportCode: 'ALB',
        toAirport: 'Dallas (Love Field), TX - DAL',
        toAirportCode: 'DAL',
        flight: '1471/634',
        timeDeparts: '05:30',
        timeArrives: '10:25',
        isSelectable: false
      },
      {
        productId: 'zyxw',
        flightType: 'Return',
        originalDate: '2020-06-04',
        fromAirport: 'Dallas (Love Field), TX - DAL',
        fromAirportCode: 'DAL',
        toAirport: 'Albany, NY - ALB',
        toAirportCode: 'ALB',
        flight: '1941/551',
        timeDeparts: '06:00',
        timeArrives: '12:25',
        isSelectable: true
      }
    ],
    _meta: {
      showBoundSelection: true
    },
    _links: {
      refundQuote: {
        href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/TIEOQX',
        method: 'POST',
        body: {
          cancelToken: 'cancel-token',
          passengerSearchToken: 'passenger-search-token'
        }
      }
    },
    cancelMessage,
  },
  selectBoundAnalyticsFn: () => {}
};

const store = createMockedFormStore();

storiesOf('pages/airCancel/airCancelBoundSelectPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('Round Trip without Legal Text', () => {
    return <AirCancelBoundSelectPage {...rtProps} />;
  })
  .add('Round Trip', () => {
    const rtPropsWithCancelMessage = { ...rtProps, cancelBoundPage: { ...rtProps.cancelBoundPage, cancelMessage } };

    return <AirCancelBoundSelectPage {...rtPropsWithCancelMessage} />;
  })
  .add('One Way', () => {
    return <AirCancelBoundSelectPage {...owProps} />;
  })
  .add('Partially Flown', () => {
    return <AirCancelBoundSelectPage {...pfProps} />;
  })
  .add('With split pnr confirmation message', () => {
    const { cancelBoundPage } = new AirCancelBoundSelectPageMockResponseBuilder().withSplitPnrConfirmationMessage().build();
    const withSplitPnrConfirmationMessageProps = {
      cancelBoundPage: { ...rtProps.cancelBoundPage, messages: cancelBoundPage.messages },
      selectBoundAnalyticsFn: () => {}
    };

    return <AirCancelBoundSelectPage {...withSplitPnrConfirmationMessageProps} />;
  });
