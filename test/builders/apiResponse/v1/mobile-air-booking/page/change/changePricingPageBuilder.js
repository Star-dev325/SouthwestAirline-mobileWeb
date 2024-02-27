// @flow
import _ from 'lodash';
import type { ChangePricingPage } from 'src/airChange/flow-typed/airChange.types';
import evenExchangeForOneWaySinglePax from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayEvenExchange';
import pointsSinglePaxOneWayDowngradeTaxDowngrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxDowngradeMixRefundable';
import pointsSinglePaxOneWayDowngradeTaxEvenExchange from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxEvenExchangeRefundable';
import pointsSinglePaxOneWayDowngradeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxUpgradeRefundable';
import pointsSinglePaxOneWayEvenExchangeTaxDowngrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayEvenExchangeTaxDowngradeMixRefundable';
import pointsSinglePaxOneWayEvenExchangeTaxEvenExchange from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayEvenExchangeTaxEvenExchange';
import pointsSinglePaxOneWayEvenExchangeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayEvenExchangeTaxUpgrade';
import pointsSinglePaxOneWayUpgradeTaxDowngrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayUpgradeTaxDowngradeMixRefundable';
import pointsSinglePaxOneWayUpgradeTaxEvenExchange from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayUpgradeTaxEvenExchange';
import pointsSinglePaxOneWayUpgradeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayUpgradeTaxUpgrade';
import splitPayPointsSinglePaxOneWayDowngradeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/splitPayPointsSinglePaxOneWayDowngradeTaxDowngradeMixRefundable';

export default class ChangePricingPageBuilder {
  changePricingPage: ChangePricingPage = _.cloneDeep(evenExchangeForOneWaySinglePax.changePricingPage);

  withUpgrade(): ChangePricingPageBuilder {
    this.changePricingPage.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '1096.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      nonRefundable: null,
      refundable: null,
      totalRefundability: null,
      newAmountDue: {
        item: 'Amount Due',
        fare: {
          amount: '530.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      }
    };

    return this;
  }

  withRefundableDowngrade(): ChangePricingPageBuilder {
    this.changePricingPage.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '66.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      nonRefundable: null,
      refundable: {
        item: 'We owe you',
        fare: {
          amount: '500.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: {
        item: 'We owe you',
        fare: {
          amount: '500.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      newAmountDue: null,
      totalDueNow: {
        item: 'Amount Due',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      }
    };

    return this;
  }

  withNonRefundableDowngrade(): ChangePricingPageBuilder {
    this.changePricingPage.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '96.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      nonRefundable: {
        item: `We'll credit you`,
        fare: {
          amount: '470.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: {
        item: `We'll credit you`,
        fare: {
          amount: '470.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      refundable: null,
      totalDueNow: null,
      newAmountDue: null
    };

    return this;
  }

  withRefundableAndNonRefundableDowngrade(): ChangePricingPageBuilder {
    this.changePricingPage.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '506.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      nonRefundable: {
        item: `We'll credit you`,
        fare: {
          amount: '30.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: {
        item: `We'll credit you`,
        fare: {
          amount: '60.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      refundable: {
        item: 'We owe you',
        fare: {
          amount: '30.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newAmountDue: null,
      totalDueNow: null
    };

    return this;
  }

  withRoundTrip(): ChangePricingPageBuilder {
    const { bounds } = this.changePricingPage;

    this.changePricingPage.header = 'ALB - AUS (Round trip)';
    const inbound = {
      boundType: 'RETURNING',
      departureDate: '2018-11-01',
      flights: [
        {
          number: '1504',
          wifiOnBoard: true
        }
      ],
      departureTime: '06:30',
      departureAirport: {
        name: 'Austin',
        state: 'TX',
        code: 'AUS',
        country: null
      },
      arrivalDate: '2018-11-01',
      arrivalTime: '09:30',
      arrivalAirport: {
        name: 'Albany',
        state: 'NY',
        code: 'ALB',
        country: null
      },
      passengers: [
        {
          type: 'ADULT',
          count: 1,
          fareType: 'Wanna Get Away',
          bookingCode: 'Q'
        }
      ],
      fareProductDetails: {
        label: 'Wanna Get Away',
        fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
      },
      stops: [
        {
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          },
          arrivalTime: '15:35',
          departureTime: '16:25',
          changePlanes: true
        }
      ],
      travelTime: '02:00',
      isNextDayArrival: false
    };

    bounds.push(inbound);

    return this;
  }

  withPaxTypePassenger(): ChangePricingPageBuilder {
    const outbound = _.set(this.changePricingPage, 'bounds.[0].passengers[0].type', 'PASSENGER');
    const { bounds } = outbound;

    this.changePricingPage.header = 'ALB - AUS (Round trip)';
    const inbound = {
      boundType: 'RETURNING',
      departureDate: '2018-11-01',
      flights: [
        {
          number: '1504',
          wifiOnBoard: true
        }
      ],
      departureTime: '06:30',
      departureAirport: {
        name: 'Austin',
        state: 'TX',
        code: 'AUS',
        country: null
      },
      arrivalDate: '2018-11-01',
      arrivalTime: '09:30',
      arrivalAirport: {
        name: 'Albany',
        state: 'NY',
        code: 'ALB',
        country: null
      },
      passengers: [
        {
          type: 'PASSENGER',
          count: 1,
          fareType: 'Wanna Get Away',
          bookingCode: 'Q'
        }
      ],
      fareProductDetails: {
        label: 'Wanna Get Away',
        fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
      },
      stops: [
        {
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          },
          arrivalTime: '15:35',
          departureTime: '16:25',
          changePlanes: true
        }
      ],
      travelTime: '02:00',
      isNextDayArrival: false
    };

    bounds.push(inbound);

    return this;
  }

  withUpgradePoints(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayUpgradeTaxEvenExchange.changePricingPage);

    return this;
  }

  withPointsEvenExchangeTaxEvenExchange(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayEvenExchangeTaxEvenExchange.changePricingPage);

    return this;
  }

  withPointsEvenExchangeTaxUpgrade(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayEvenExchangeTaxUpgrade.changePricingPage);

    return this;
  }

  withPointsEvenExchangeTaxDowngrade(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayEvenExchangeTaxDowngrade.changePricingPage);

    return this;
  }

  withPointsDowngradeTaxEvenExchange(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayDowngradeTaxEvenExchange.changePricingPage);

    return this;
  }

  withPointsDowngradeTaxUpgrade(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage);

    return this;
  }

  withPointsDowngradeTaxDowngrade(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayDowngradeTaxDowngrade.changePricingPage);

    return this;
  }

  withSplitPayPointsDowngradeTaxDowngrade(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(splitPayPointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage);

    return this;
  }

  withPointsUpgradeTaxUpgrade(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayUpgradeTaxUpgrade.changePricingPage);

    return this;
  }

  withPointsUpgradeTaxEvenExchange(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayUpgradeTaxEvenExchange.changePricingPage);

    return this;
  }

  withPointsUpgradeTaxDowngrade(): ChangePricingPageBuilder {
    this.changePricingPage = _.cloneDeep(pointsSinglePaxOneWayUpgradeTaxDowngrade.changePricingPage);

    return this;
  }

  withRepricingMessages(): ChangePricingPageBuilder {
    this.changePricingPage.messages = _.concat(this.changePricingPage.messages, {
      textColor: 'NORMAL',
      icon: 'NONE',
      header: 'Before you modify',
      body: 'We are unable to secure the price for the flight(s) you selected. The next lowest available fare(s) for the flight(s) you selected are listed below.',
      key: 'CHANGE__REPRICING_MESSAGE'
    });

    return this;
  }

  withSwaBizGhostCardMessage(): ChangePricingPageBuilder {
    this.changePricingPage.messages = _.concat(this.changePricingPage.messages, {
      key: 'CHANGE_SWABIZ_GHOST_MESSAGE',
      icon: 'none',
      textColor: 'default',
      header: 'none',
      body: 'Stored corporate credit cards (Ghost Cards) only apply to transactions made on SWABIZ.COM.'
    });

    return this;
  }

  build(): ChangePricingPage {
    return { ...this.changePricingPage };
  }
}
