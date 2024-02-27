import { storiesOf } from '@storybook/react';
import React from 'react';

import { LowFareCalendarPage } from 'src/airBooking/pages/lowFareCalendarPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';
import response from 'mocks/templates/airReservation/lowFareCalendarPageRoundTrip';
import responseOneway from 'mocks/templates/airReservation/lowFareCalendarPageOneWay';
import responsePoints from 'mocks/templates/airReservation/lowFareCalendarPageRoundTripPoints';
import responseOnewayPoints from 'mocks/templates/airReservation/lowFareCalendarPageOneWayPoints';
import responseOnewayPointsIntl from 'mocks/templates/airReservation/lowFareCalendarPageOneWayPointsIntl';
import responseRoundtripPointsIntl from 'mocks/templates/airReservation/lowFareCalendarPageRoundTripPointsIntl';
import responseRoundTripBothPrevNextLinks from 'mocks/templates/airReservation/lowFareCalendarPageRoundTripWithPrevNextData';
import generatedData3 from 'mocks/templates/airReservation/lowFareCalendarPageGenerated';
import generatedData500 from 'mocks/templates/airReservation/lowFareCalendarPageGenerated500';
import generatedData50to1000 from 'mocks/templates/airReservation/lowFareCalendarPageGenerated50to1000';
import generatedData500to100 from 'mocks/templates/airReservation/lowFareCalendarPageGenerated500to100';

const store = createMockedFormStore();

const dollarSearchRequest = {
  currencyType: 'USD',
  origin: 'ALB',
  destination: 'AUS'
};

const pointsSearchRequest = {
  currencyType: 'PTS'
};

storiesOf('pages/airBooking/lowFareCalendarPage', module)
  .addDecorator(withFakeClock('2020-01-15'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    const props = {
      outboundPage: response.lowFareCalendarPage.outboundPage,
      inboundPage: response.lowFareCalendarPage.inboundPage,
      searchRequest: dollarSearchRequest,
      disclaimerWithLinks: response.lowFareCalendarPage.disclaimerWithLinks,
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-15',
        inboundDate: '2020-01-17'
      }
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('points roundtrip (domestic)', () => {
    const props = {
      outboundPage: responsePoints.lowFareCalendarPage.outboundPage,
      inboundPage: responsePoints.lowFareCalendarPage.inboundPage,
      searchRequest: pointsSearchRequest,
      disclaimerWithLinks: responsePoints.lowFareCalendarPage.disclaimerWithLinks,
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-17',
        inboundDate: '2020-01-20'
      }
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('dollars oneway trip', () => {
    const props = {
      outboundPage: responseOneway.lowFareCalendarPage.outboundPage,
      searchRequest: dollarSearchRequest,
      disclaimerWithLinks: responseOneway.lowFareCalendarPage.disclaimerWithLinks
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('points oneway trip (domestic)', () => {
    const props = {
      outboundPage: _.cloneDeep(responseOnewayPoints.lowFareCalendarPage.outboundPage),
      searchRequest: pointsSearchRequest,
      disclaimerWithLinks: responseOnewayPoints.lowFareCalendarPage.disclaimerWithLinks
    };
    props.outboundPage.lowFareCalendarDays.splice(0, 12);
    return <LowFareCalendarPage {...props} />;
  })
  .add('not available dollar fare (past date)', () => {
    const props = {
      outboundPage: _.cloneDeep(responseOneway.lowFareCalendarPage.outboundPage),
      searchRequest: dollarSearchRequest,
      disclaimerWithLinks: responseOneway.lowFareCalendarPage.disclaimerWithLinks
    };
    props.outboundPage.lowFareCalendarDays = [
      {
        date: '2020-01-14',
        lowestPrice: {
          price: {
            amount: '900.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      ...responseOneway.lowFareCalendarPage.outboundPage.lowFareCalendarDays
    ];
    return <LowFareCalendarPage {...props} />;
  })
  .add('not available points fare (past date)', () => {
    const props = {
      outboundPage: _.cloneDeep(responseOnewayPoints.lowFareCalendarPage.outboundPage),
      searchRequest: pointsSearchRequest,
      disclaimerWithLinks: responseOnewayPoints.lowFareCalendarPage.disclaimerWithLinks
    };
    props.outboundPage.lowFareCalendarDays = [
      {
        date: '2020-01-13',
        lowestPrice: {
          price: {
            amount: '9,009',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-14',
        lowestPrice: {
          price: {
            amount: '99,009',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-15',
        lowestPrice: {
          price: {
            amount: '10,009',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-16',
        lowestPrice: {
          price: {
            amount: '9,009',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          pricePointsTax: null
        }
      },
      ...responseOnewayPoints.lowFareCalendarPage.outboundPage.lowFareCalendarDays
    ];
    return <LowFareCalendarPage {...props} />;
  })
  .add('lowestPrice is null (no fare available)', () => {
    const props = {
      outboundPage: _.cloneDeep(responseOnewayPoints.lowFareCalendarPage.outboundPage),
      searchRequest: pointsSearchRequest,
      disclaimerWithLinks: responseOnewayPoints.lowFareCalendarPage.disclaimerWithLinks
    };
    props.outboundPage.lowFareCalendarDays = [
      {
        date: '2020-01-16',
        lowestPrice: null
      },
      ...responseOnewayPoints.lowFareCalendarPage.outboundPage.lowFareCalendarDays
    ];
    return <LowFareCalendarPage {...props} />;
  })
  .add('points roundtrip (intl)', () => {
    const props = {
      outboundPage: responseRoundtripPointsIntl.lowFareCalendarPage.outboundPage,
      inboundPage: responseRoundtripPointsIntl.lowFareCalendarPage.inboundPage,
      searchRequest: pointsSearchRequest,
      disclaimerWithLinks: responseRoundtripPointsIntl.lowFareCalendarPage.disclaimerWithLinks,
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-17',
        inboundDate: '2020-01-20'
      }
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('points oneway trip (intl)', () => {
    const props = {
      outboundPage: responseOnewayPointsIntl.lowFareCalendarPage.outboundPage,
      disclaimerWithLinks: responseOnewayPointsIntl.lowFareCalendarPage.disclaimerWithLinks,
      searchRequest: {
        ...pointsSearchRequest,
        departureDate: '2020-01-19'
      },
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-19'
      }
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('dollars roundtrip fetch prev/next avail', () => {
    const props = {
      outboundPage: responseRoundTripBothPrevNextLinks.lowFareCalendarPage.outboundPage,
      inboundPage: responseRoundTripBothPrevNextLinks.lowFareCalendarPage.inboundPage,
      disclaimerWithLinks: responseRoundTripBothPrevNextLinks.lowFareCalendarPage.disclaimerWithLinks,
      searchRequest: {
        ...dollarSearchRequest,
        departureDate: '2020-01-16',
        returnDate: '2020-01-18'
      },
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-16',
        inboundDate: '2020-01-18'
      }
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('roundtrip with not available and unselectable dates greyed', () => {
    const props = {
      outboundPage: _.cloneDeep(response.lowFareCalendarPage.outboundPage),
      inboundPage: _.cloneDeep(response.lowFareCalendarPage.inboundPage),
      searchRequest: dollarSearchRequest,
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-18',
        inboundDate: '2020-01-20'
      },
      disclaimerWithLinks: response.lowFareCalendarPage.disclaimerWithLinks
    };
    props.outboundPage.lowFareCalendarDays = [
      {
        date: '2020-01-17',
        lowestPrice: {
          price: {
            amount: '385.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-18',
        lowestPrice: {
          price: {
            amount: '410.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-19',
        lowestPrice: {
          price: {
            amount: '318.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-20',
        lowestPrice: null
      },
      {
        date: '2020-01-21',
        lowestPrice: {
          price: {
            amount: '218.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-22',
        lowestPrice: {
          price: {
            amount: '418.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      }
    ];

    props.inboundPage.lowFareCalendarDays = [
      {
        date: '2020-01-17',
        lowestPrice: {
          price: {
            amount: '335.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-18',
        lowestPrice: null
      },
      {
        date: '2020-01-19',
        lowestPrice: {
          price: {
            amount: '435.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-20',
        lowestPrice: {
          price: {
            amount: '500.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      },
      {
        date: '2020-01-21',
        lowestPrice: {
          price: {
            amount: '300.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pricePointsTax: null
        }
      }
    ];

    return <LowFareCalendarPage {...props} />;
  })
  .add('flight date selections', () => {
    const props = {
      outboundPage: responseRoundTripBothPrevNextLinks.lowFareCalendarPage.outboundPage,
      inboundPage: responseRoundTripBothPrevNextLinks.lowFareCalendarPage.inboundPage,
      searchRequest: dollarSearchRequest,
      disclaimerWithLinks: responseRoundTripBothPrevNextLinks.lowFareCalendarPage.disclaimerWithLinks,
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-16',
        inboundDate: '2020-01-18'
      }
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('generated $3 increments', () => {
    const props = {
      outboundPage: generatedData3.lowFareCalendarPage.outboundPage,
      searchRequest: dollarSearchRequest
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('generated $1 increments', () => {
    const props = {
      outboundPage: generatedData500.lowFareCalendarPage.outboundPage,
      searchRequest: dollarSearchRequest
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('generated $100 increments', () => {
    const props = {
      outboundPage: generatedData500to100.lowFareCalendarPage.outboundPage,
      searchRequest: dollarSearchRequest
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('generated $50 increments', () => {
    const props = {
      outboundPage: generatedData50to1000.lowFareCalendarPage.outboundPage,
      searchRequest: dollarSearchRequest
    };
    return <LowFareCalendarPage {...props} />;
  })
  .add('without money/points switch when with lap child', () => {
    const props = {
      outboundPage: generatedData50to1000.lowFareCalendarPage.outboundPage,
      searchRequest: { ...dollarSearchRequest, numberOfLapInfants: 1 }
    };
    return <LowFareCalendarPage {...props} />;
  });
