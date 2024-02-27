// @flow
import CurrentReservationBuilder from 'test/builders/model/currentReservationBuilder';
import FlightBoundPageBuilder from 'test/builders/model/flightBoundPageBuilder';

import type { ChangeShoppingPage } from 'src/airChange/flow-typed/airChange.types';

class ChangeShoppingPageResponseBuilder {
  data: ChangeShoppingPage;

  constructor() {
    this.data = {
      currentReservation: {
        outbound: new CurrentReservationBuilder().build(),
        inbound: new CurrentReservationBuilder().withDate('2018-05-25').build()
      },
      flights: {
        outboundPage: new FlightBoundPageBuilder().build(),
        inboundPage: new FlightBoundPageBuilder()
          .withSelectedDate('2018-05-28')
          .withAirportInfo('AUS - DAL', 'AUS', 'DAL')
          .build()
      },
      _links: {
        changePricingPage: {
          href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
          method: 'POST',
          body: {
            boundReference: ['tested-bound-reference']
          }
        }
      },
      _meta: {
        purchaseWithPoints: false,
        isPromoCodeApplied: false,
        isCheckedIn: false
      },
      shoppingMessages: [],
      showSgaMessage: false,
      promoCodeNotice: 'Prices reflect previously applied promo code',
      checkedInNotice: {
        title: 'Before you modify',
        message:
          "You'll have to delete the boarding passes and check in again for all flights. Don't worry, your boarding positions for any unchanged flights will remain the same."
      },
      disclaimerWithLinks: null
    };
  }

  withOneWay() {
    this.data.flights = {
      outboundPage: new FlightBoundPageBuilder().build()
    };

    return this;
  }

  withFareDifferenceInUSD() {
    this.data.flights = {
      outboundPage: new FlightBoundPageBuilder().withFareDifferenceInUSD().build(),
      inboundPage: new FlightBoundPageBuilder()
        .withFareDifferenceInUSD()
        .withSelectedDate('2018-05-28')
        .withAirportInfo('AUS - DAL', 'AUS', 'DAL')
        .build()
    };

    return this;
  }

  withFareDifferenceInPts() {
    this.data.flights = {
      outboundPage: new FlightBoundPageBuilder().withFareDifferenceInPts().build(),
      inboundPage: new FlightBoundPageBuilder()
        .withFareDifferenceInPts()
        .withSelectedDate('2018-05-28')
        .withAirportInfo('AUS - DAL', 'AUS', 'DAL')
        .build()
    };

    return this;
  }

  withSGAMessage() {
    this.data.shoppingMessages.push({
      key: 'MESSAGE_GOVERNMENT_APPROVAL',
      icon: 'WARNING',
      textColor: 'DEFAULT',
      header: 'Subject to Government Approval',
      body: 'Southwest is currently awaiting government approval for this route. We anticipate approval to be granted shortly with no impact to your travel plans.'
    });
    this.data.showSgaMessage = true;

    return this;
  }

  withValidPromoCode() {
    this.data._meta = {
      purchaseWithPoints: false,
      isPromoCodeApplied: true,
      isCheckedIn: false
    };

    this.data.promoCodeNotice = 'Promo code MWEBTESTPR applied!';

    return this;
  }

  withInvalidPromoCode() {
    this.data._meta = {
      purchaseWithPoints: false,
      isPromoCodeApplied: false,
      isCheckedIn: false
    };

    this.data.promoCodeNotice = 'Oops! The promotion code entered was not recognized.';

    return this;
  }

  withDynamicWaiver() {
    this.data.flights = {
      outboundPage: new FlightBoundPageBuilder().withDynamicWaiver().build(),
      inboundPage: new FlightBoundPageBuilder()
        .withDynamicWaiver()
        .withSelectedDate('2018-05-28')
        .withAirportInfo('AUS - DAL', 'AUS', 'DAL')
        .build()
    };

    return this;
  }

  withDynamicWaiverMessage() {
    this.data.shoppingMessages.push({
      key: 'FORFEIT_PREMIUM_FARE_BENEFITS,',
      body: 'You may select an Anytime Fare if Business Select is unavailable. Please note that by changing to an Anytime Fare, you will forfeit the benefits of Business Select (i.e. extra Rapid Rewards travel credit, priority boarding and a complimentary premium beverage.)',
      header: 'Please select a new flight below.',
      icon: 'WARNING'
    });

    return this;
  }

  withNextDay() {
    this.data.currentReservation.outbound = new CurrentReservationBuilder().withNextDay().build();
    this.data.flights = {
      outboundPage: new FlightBoundPageBuilder().withNextDay().build(),
      inboundPage: new FlightBoundPageBuilder()
        .withNextDay()
        .withSelectedDate('2018-05-28')
        .withAirportInfo('AUS - DAL', 'AUS', 'DAL')
        .build()
    };

    return this;
  }

  withOvernight() {
    this.data.currentReservation.outbound = new CurrentReservationBuilder().withOvernight().build();
    this.data.flights = {
      outboundPage: new FlightBoundPageBuilder().withOvernight().build(),
      inboundPage: new FlightBoundPageBuilder()
        .withOvernight()
        .withSelectedDate('2018-05-28')
        .withAirportInfo('AUS - DAL', 'AUS', 'DAL')
        .build()
    };

    return this;
  }

  widthDoubleConnects() {
    this.data.currentReservation.outbound = {
      arrivesTime: '17:40',
      date: '2023-09-28',
      departsTime: '06:00',
      flight: '3672/403/1725',
      flightTime: '9h 40m',
      isNextDayArrival: false,
      isOvernight: false,
      shortStopDescription: '2 Stops',
      stopCity: 'DEN, BNA',
      stopDescription: '2 Stops, DEN, BNA'
    };

    this.data.flights.outboundPage = new FlightBoundPageBuilder()
      .withSelectedDate('2023-09-28')
      .withAirportInfo('BOI - SAV', 'BOI', 'SAV')
      .build();

    return this;
  }

  build(): ChangeShoppingPage {
    return { ...this.data };
  }
}

export default ChangeShoppingPageResponseBuilder;
