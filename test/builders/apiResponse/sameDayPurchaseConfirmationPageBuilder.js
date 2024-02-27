// @flow
import type { SameDayConfirmationResponse } from 'src/sameDay/flow-typed/sameDay.types';

class SameDayPurchaseConfirmationBuilder {
  sameDayConfirmationPage: SameDayConfirmationResponse;

  constructor() {
    this.sameDayConfirmationPage = {
      bounds: [
        {
          arrivalAirport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
          arrivalTime: '18:30',
          boundType: 'DEPARTING',
          departureAirport: { name: 'Phoenix', state: 'AZ', code: 'PHX', country: null },
          departureDate: '2022-11-07',
          departureTime: '15:30',
          flights: [{ number: '1234' }],
          isNextDayArrival: true,
          stops: null,
          travelTime: '3h'
        }
      ],
      contactInfo: { details: 'test123@wnco.com', method: 'EMAIL' },
      fareSummary: {
        taxesAndFeesWithLinks: 'You will not be charged until you board new standby flight',
        total: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$', item: 'Total Paid' }
      },
      headerMessage: {
        backgroundColor: 'DEFAULT',
        body: 'If a seat for the flight becomes available, we will send you a notification via email to sammy.travels@gmail.com<br>Passengers flying standby can be cleared up to 10 minutes before departure time. Keep your eye on the standby list!',
        key: 'SAME_DAY_CONFIRMATION_STANDBY_HEADER_MESSAGE',
        header: 'You have been listed on the flight below',
        icon: 'POSITIVE',
        textColor: 'DEFAULT'
      },
      _links: {
        enhancedStandbyList: {
          body: { standbyToken: 'standbyToken' },
          href: '/v1/mobile-air-operations/page/standby/ABC123',
          labelText: 'see standby list',
          method: 'POST'
        },
        viewBoardingPositions: null
      },
      sameDayLabelDescription: 'STANDBY FLIGHT'
    };
  }

  withPointsNoTaxAmountDue() {
    this.sameDayConfirmationPage = {
      _links: {
        enhancedStandbyList: {
          body: { standbyToken: 'standbyToken' },
          href: '/v1/mobile-air-operations/page/standby/ABC123',
          labelText: 'see standby list',
          method: 'POST'
        },
        viewBoardingPositions: null
      },
      bounds: [
        {
          arrivalAirport: {
            name: 'Milwaukee, WI - MKE',
            state: 'WI',
            code: 'MKE',
            country: 'US'
          },
          arrivalTime: '01:35',
          boundType: 'DEPARTING',
          departureAirport: {
            name: 'Orange County/Santa Ana, CA - SNA',
            state: 'CA',
            code: 'SNA',
            country: 'US'
          },
          departureDate: '2023-05-31',
          departureTime: '18:15',
          flights: [
            {
              number: '1591'
            },
            {
              number: '968'
            }
          ],
          isNextDayArrival: true,
          stops: [
            {
              airport: {
                code: 'PHX',
                country: 'US',
                name: 'Phoenix, AZ - PHX',
                state: 'AZ'
              },
              arrivalTime: '19:35',
              changePlanes: true,
              departureTime: '20:20',
              missingAirportDetails: false
            }
          ],
          travelTime: '5h 20m'
        }
      ],
      contactInfo: {
        details: 'X234@GMAIL.COM',
        method: 'EMAIL'
      },
      fareSummary: {
        taxesAndFeesWithLinks: 'You will not be charged until you board new standby flight',
        total: { amount: '3,400', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' }
      },
      headerMessage: {
        backgroundColor: 'DEFAULT',
        body: 'Check in up to 24 hours in advance.\nThe earlier you check in, the better your seat selection.',
        header: 'Your trip is booked!',
        icon: 'POSITIVE',
        key: 'SAME_DAY_CONFIRMATION_CHANGE_HEADER_MESSAGE',
        textColor: 'DEFAULT'
      }
    };

    return this;
  }

  withPointsAmountDue() {
    this.sameDayConfirmationPage = {
      _links: {
        enhancedStandbyList: {
          body: { standbyToken: 'standbyToken' },
          href: '/v1/mobile-air-operations/page/standby/ABC123',
          labelText: 'see standby list',
          method: 'POST'
        },
        viewBoardingPositions: null
      },
      bounds: [
        {
          arrivalAirport: {
            name: 'Milwaukee, WI - MKE',
            state: 'WI',
            code: 'MKE',
            country: 'US'
          },
          arrivalTime: '01:35',
          boundType: 'DEPARTING',
          departureAirport: {
            name: 'Orange County/Santa Ana, CA - SNA',
            state: 'CA',
            code: 'SNA',
            country: 'US'
          },
          departureDate: '2023-05-31',
          departureTime: '18:15',
          flights: [
            {
              number: '1591'
            },
            {
              number: '968'
            }
          ],
          isNextDayArrival: true,
          stops: [
            {
              airport: {
                code: 'PHX',
                country: 'US',
                name: 'Phoenix, AZ - PHX',
                state: 'AZ'
              },
              arrivalTime: '19:35',
              changePlanes: true,
              departureTime: '20:20',
              missingAirportDetails: false
            }
          ],
          travelTime: '5h 20m'
        }
      ],
      contactInfo: {
        details: 'X234@GMAIL.COM',
        method: 'EMAIL'
      },
      fareSummary: {
        taxesAndFeesWithLinks: 'You will not be charged until you board new standby flight',
        total: { amount: '3,400', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' },
        totalPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Paid' }
      },
      headerMessage: {
        backgroundColor: 'DEFAULT',
        body: 'Check in up to 24 hours in advance.\nThe earlier you check in, the better your seat selection.',
        header: 'Your trip is booked!',
        icon: 'POSITIVE',
        key: 'SAME_DAY_CONFIRMATION_CHANGE_HEADER_MESSAGE',
        textColor: 'DEFAULT'
      }
    };

    return this;
  }

  withPointsTotalCreditDue() {
    this.sameDayConfirmationPage = {
      _links: {
        enhancedStandbyList: null,
        viewBoardingPositions: {
          body: {
            firstName: 'Bobby',
            lastName: 'Blaine',
            passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
            recordLocator: '3NSCML'
          },
          href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
          labelText: 'Boarding details',
          method: 'POST'
        }
      },
      bounds: [
        {
          arrivalAirport: {
            name: 'Milwaukee, WI - MKE',
            state: 'WI',
            code: 'MKE',
            country: 'US'
          },
          arrivalTime: '01:35',
          boundType: 'DEPARTING',
          departureAirport: {
            name: 'Orange County/Santa Ana, CA - SNA',
            state: 'CA',
            code: 'SNA',
            country: 'US'
          },
          departureDate: '2023-05-31',
          departureTime: '18:15',
          flights: [
            {
              number: '1591'
            },
            {
              number: '968'
            }
          ],
          isNextDayArrival: true,
          stops: [
            {
              airport: {
                code: 'PHX',
                country: 'US',
                name: 'Phoenix, AZ - PHX',
                state: 'AZ'
              },
              arrivalTime: '19:35',
              changePlanes: true,
              departureTime: '20:20',
              missingAirportDetails: false
            }
          ],
          travelTime: '5h 20m'
        }
      ],
      contactInfo: {
        details: 'X234@GMAIL.COM',
        method: 'EMAIL'
      },
      fareSummary: {
        taxesAndFeesWithLinks: 'You will not be charged until you board new standby flight',
        totalCredit: { amount: '3,400', currencyCode: 'PTS', item: 'Total Credit' },
        totalPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Paid' }
      },
      headerMessage: {
        backgroundColor: 'DEFAULT',
        body: 'Check in up to 24 hours in advance.\nThe earlier you check in, the better your seat selection.',
        header: 'Your trip is booked!',
        icon: 'POSITIVE',
        key: 'SAME_DAY_CONFIRMATION_CHANGE_HEADER_MESSAGE',
        textColor: 'DEFAULT'
      }
    };

    return this;
  }

  withTotalCreditDue() {
    this.sameDayConfirmationPage = {
      _links: {
        enhancedStandbyList: null,
        viewBoardingPositions: {
          body: {
            firstName: 'Bobby',
            lastName: 'Blaine',
            passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
            recordLocator: '3NSCML'
          },
          href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
          labelText: 'Boarding details',
          method: 'POST'
        }
      },
      bounds: [
        {
          arrivalAirport: {
            name: 'Milwaukee, WI - MKE',
            state: 'WI',
            code: 'MKE',
            country: 'US'
          },
          arrivalTime: '01:35',
          boundType: 'DEPARTING',
          departureAirport: {
            name: 'Orange County/Santa Ana, CA - SNA',
            state: 'CA',
            code: 'SNA',
            country: 'US'
          },
          departureDate: '2023-05-31',
          departureTime: '18:15',
          flights: [
            {
              number: '1591'
            },
            {
              number: '968'
            }
          ],
          isNextDayArrival: true,
          stops: [
            {
              airport: {
                code: 'PHX',
                country: 'US',
                name: 'Phoenix, AZ - PHX',
                state: 'AZ'
              },
              arrivalTime: '19:35',
              changePlanes: true,
              departureTime: '20:20',
              missingAirportDetails: false
            }
          ],
          travelTime: '5h 20m'
        }
      ],
      contactInfo: {
        details: 'X234@GMAIL.COM',
        method: 'EMAIL'
      },
      fareSummary: {
        refundMessage: 'Refunded to credit card',
        taxesAndFeesWithLinks: 'Includes taxes and fees',
        totalCredit: { amount: '20.00', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
      },
      headerMessage: {
        backgroundColor: 'DEFAULT',
        body: 'Check in up to 24 hours in advance.\nThe earlier you check in, the better your seat selection.',
        header: 'Your trip is booked!',
        icon: 'POSITIVE',
        key: 'SAME_DAY_CONFIRMATION_CHANGE_HEADER_MESSAGE',
        textColor: 'DEFAULT'
      }
    };

    return this;
  }

  withPointsAndTaxDue() {
    this.sameDayConfirmationPage.fareSummary = {
      refundMessage: null,
      taxesAndFeesWithLinks: 'Included taxes and fees',
      total: { amount: '3,400', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' },
      totalPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withEvenExchangeAndTaxDue() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      taxesAndFeesWithLinks: 'You will not be charged until you board new standby flight',
      total: { amount: '0', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' },
      totalPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withEvenExchangeAndTaxCreditDue() {
    this.sameDayConfirmationPage.fareSummary = {
      refundMessage: 'Refunded to credit card',
      taxesAndFeesWithLinks: 'You will not be refunded until you board and your new flight is closed.',
      total: { amount: '0', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' },
      totalCreditPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withEvenExchangeAndTaxCreditDueStandby() {
    this.sameDayConfirmationPage.fareSummary = {
      refundMessage: 'Refunded to credit card',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      total: { amount: '0', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' },
      totalCreditPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: {
        body: { standbyToken: 'standbyToken' },
        href: '/v1/mobile-air-operations/page/standby/ABC123',
        labelText: 'see standby list',
        method: 'POST'
      },
      viewBoardingPositions: null
    };

    return this;
  }
  
  withPointsAndTaxCredit() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      refundMessage: 'Refunded to credit card',
      taxesAndFeesWithLinks: 'Included taxes and fees',
      totalCredit: { amount: '11,897', currencyCode: 'PTS', item: 'Total Credit' },
      totalCreditPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withNoPointsDueAndTaxCredit() {
    this.sameDayConfirmationPage.fareSummary = {
      refundMessage: 'Refunded to credit card',
      taxesAndFeesWithLinks: 'You will not be refunded until you board and your new flight is closed.',
      total: { amount: '0', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' },
      totalCreditPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }
  
  withPointsCreditAndTaxDue() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: '',
      taxesAndFeesWithLinks: 'Included taxes and fees',
      totalCredit: { amount: '3,400', currencyCode: 'PTS', item: 'Total Credit' },
      totalPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withPointsDueAndTaxCredit() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      refundMessage: 'Held for future use',
      taxesAndFeesWithLinks: 'Included taxes and fees',
      total: { amount: '11,897', currencyCode: 'PTS', item: 'Total Due' },
      totalCreditPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withPointsDueAndNoTaxDue() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      taxesAndFeesWithLinks: null,
      total: { amount: '54', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withOnlyPointsDue() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      taxesAndFeesWithLinks: 'Included taxes and fees',
      total: { amount: '3,400', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withOnlyAmountDue() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      taxesAndFeesWithLinks: 'Included taxes and fees',
      total: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withOnlyEvenExchange() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      refundMessage: null,
      taxesAndFeesWithLinks: null,
      total: { amount: '0', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withOnlyEvenExchangeStandby() {
    this.sameDayConfirmationPage.fareSummary = {
      creditInfoMessage: null,
      refundMessage: null,
      taxesAndFeesWithLinks: null,
      total: { amount: '0', currencyCode: 'PTS', currencySymbol: null, item: 'Total Paid' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: {
        body: { standbyToken: 'standbyToken' },
        href: '/v1/mobile-air-operations/page/standby/ABC123',
        labelText: 'see standby list',
        method: 'POST'
      },
      viewBoardingPositions: null
    };

    return this;
  }

  withOnlyPointsCredit() {
    this.sameDayConfirmationPage.fareSummary = {
      refundMessage: 'Held for future use',
      taxesAndFeesWithLinks: 'Included taxes and fees',
      totalCredit: { amount: '3,400', currencyCode: 'PTS', item: 'Total Credit' }
    };
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: null,
      viewBoardingPositions: {
        body: {
          firstName: 'Bobby',
          lastName: 'Blaine',
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMhV3Km1',
          recordLocator: '3NSCML'
        },
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        labelText: 'Boarding details',
        method: 'POST'
      }
    };

    return this;
  }

  withTotalCreditDueStandBy() {
    this.sameDayConfirmationPage = {
      _links: {
        enhancedStandbyList: {
          body: { standbyToken: 'standbyToken' },
          href: '/v1/mobile-air-operations/page/standby/ABC123',
          labelText: 'see standby list',
          method: 'POST'
        },
        viewBoardingPositions: null
      },
      bounds: [
        {
          arrivalAirport: {
            name: 'Milwaukee, WI - MKE',
            state: 'WI',
            code: 'MKE',
            country: 'US'
          },
          arrivalTime: '01:35',
          boundType: 'DEPARTING',
          departureAirport: {
            name: 'Orange County/Santa Ana, CA - SNA',
            state: 'CA',
            code: 'SNA',
            country: 'US'
          },
          departureDate: '2023-05-31',
          departureTime: '18:15',
          flights: [
            {
              number: '1591'
            },
            {
              number: '968'
            }
          ],
          isNextDayArrival: true,
          stops: [
            {
              airport: {
                code: 'PHX',
                country: 'US',
                name: 'Phoenix, AZ - PHX',
                state: 'AZ'
              },
              arrivalTime: '19:35',
              changePlanes: true,
              departureTime: '20:20',
              missingAirportDetails: false
            }
          ],
          travelTime: '5h 20m'
        }
      ],
      contactInfo: {
        details: 'X234@GMAIL.COM',
        method: 'EMAIL'
      },
      fareSummary: {
        refundMessage: 'Refunded to credit card',
        taxesAndFeesWithLinks: 'You will not be refunded until you board, and new flight is closed.',
        totalCredit: { amount: '340.00', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
      },
      headerMessage: {
        backgroundColor: 'DEFAULT',
        body: 'Check in up to 24 hours in advance.\nThe earlier you check in, the better your seat selection.',
        header: 'Your trip is booked!',
        icon: 'POSITIVE',
        key: 'SAME_DAY_CONFIRMATION_CHANGE_HEADER_MESSAGE',
        textColor: 'DEFAULT'
      }
    };
  
    return this;
  }

  withTaxCreditDueStandBy() {
    this.sameDayConfirmationPage._links = {
      enhancedStandbyList: {
        body: { standbyToken: 'standbyToken' },
        href: '/v1/mobile-air-operations/page/standby/ABC123',
        labelText: 'see standby list',
        method: 'POST'
      },
      viewBoardingPositions: null
    };

    this.sameDayConfirmationPage.fareSummary = {
      refundMessage: 'Refunded to credit card',
      taxesAndFeesWithLinks: 'You will not be refunded until you board, and new flight is closed.',
      totalCreditPointsTax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$', item: 'Total Credit' }
    };
  
    return this;
  }

  build() {
    return { sameDayConfirmationPage: this.sameDayConfirmationPage };
  }
}

export default SameDayPurchaseConfirmationBuilder;
