// @flow
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';

import type { FlightBoundPage } from 'src/airChange/flow-typed/airChange.types';
import type { FlightProductCard } from 'src/shared/flow-typed/shared.types';

class FlightBoundPageBuilder {
  data: FlightBoundPage;

  constructor() {
    this.data = {
      header: {
        airportInfo: 'DAL - AUS',
        selectedDate: '2018-05-24',
        originAirport: 'DAL',
        destinationAirport: 'AUS'
      },
      cards: [
        new FlightProductBuilder(0).build(),
        new FlightProductBuilder(1).withLowestFlight().build()
      ]
    };
  }

  withFareDifferenceInUSD() {
    const card1 = {
      amount: '5',
      currencyCode: 'USD',
      currencySymbol: '$',
      sign: '-'
    };

    const card2 = {
      amount: '0',
      currencyCode: 'USD',
      currencySymbol: '$',
      sign: null
    };

    const card3 = {
      amount: '10',
      currencyCode: 'USD',
      currencySymbol: '$',
      sign: '+'
    };

    this.data.cards = [
      new FlightProductBuilder(0).withFareDifference(card1).withLowestFlight().build(),
      new FlightProductBuilder(1).withFareDifference(card2).build(),
      new FlightProductBuilder(1).withFareDifference(card3).build()
    ];

    return this;
  }

  withFareDifferenceInPts() {
    const card1 = {
      amount: '100',
      currencyCode: 'PTS',
      currencySymbol: null,
      sign: '-'
    };

    const card2 = {
      amount: '0',
      currencyCode: 'PTS',
      currencySymbol: null,
      sign: null
    };

    const card3 = {
      amount: '20,599',
      currencyCode: 'PTS',
      currencySymbol: null,
      sign: '+'
    };

    this.data.cards = [
      new FlightProductBuilder(0).withPoints(0).withFareDifference(card1).withLowestFlight().build(),
      new FlightProductBuilder(1).withPoints(1).withFareDifference(card2).build(),
      new FlightProductBuilder(1).withPoints(2).withFareDifference(card3).build()
    ];

    return this;
  }

  addProductCard(productCard: FlightProductCard) {
    this.data.cards.push(productCard);

    return this;
  }

  withAirportInfo(airportInfo: string, originAirport: string, destinationAirport: string) {
    this.data.header.airportInfo = airportInfo;
    this.data.header.originAirport = originAirport;
    this.data.header.destinationAirport = destinationAirport;

    return this;
  }

  withSelectedDate(date: string) {
    this.data.header.selectedDate = date;

    return this;
  }

  withDynamicWaiver() {
    this.data.cards = [
      new FlightProductBuilder(0).withDynamicWaiver().build(),
      new FlightProductBuilder(1).withDynamicWaiver('Business Select Available').build(),
      new FlightProductBuilder(1).withDynamicWaiver().build()
    ];

    return this;
  }

  withNextDay() {
    this.data.cards = [
      new FlightProductBuilder(0).withNextDayArrival().build(),
      new FlightProductBuilder(1).withNextDayArrival().build()
    ];

    return this;
  }

  withOvernight() {
    this.data.cards = [
      new FlightProductBuilder(0).withOvernight().build(),
      new FlightProductBuilder(1).withOvernight().build()
    ];

    return this;
  }

  build(): FlightBoundPage {
    return { ...this.data };
  }
}

export default FlightBoundPageBuilder;
