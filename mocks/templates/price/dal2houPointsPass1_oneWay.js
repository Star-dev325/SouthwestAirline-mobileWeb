module.exports = {
  flightPricingPage: {
    message: null,
    header: 'DAL - HOU (One Way)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-12-19',
        flights: [{ number: '1628', wifiOnBoard: true }],
        departureTime: '06:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '07:10',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengers: [{ type: 'Passenger', count: 1, fareType: 'Wanna Get Away', bookingCode: 'V' }],
        stops: [],
        upsellBoundDetails: null,
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.dev2.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '1h 10m',
        _links: { flightPricingUpsellSingleBound: null }
      }
    ],
    totals: {
      pointsTotal: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
      moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          money: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null }
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            { boundType: 'DEPARTING', price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null } }
          ]
        }
      }
    },
    chaseBanner: null,
    upsellDetails: null,
    upsellSuccessMessage: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    billingAddress: null,
    _meta: {
      purchaseWithPoints: true,
      showRepriceNotification: false,
      newCardHasSufficientFunds: false,
      authorizeUser: true,
      internationalBooking: false,
      chase: null
    },
    _analytics: { 'air.fareTypeb1': 'WGA', 'air.fareProductIdb1': 'WGARED', 'air.fareClassb1': 'V' },
    _links: {
      flightConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/purchase',
        method: 'POST',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        xphref: '/v1/mobile-air-booking/page/flights/express-purchase',
        body: {
          promoCodeToken: null,
          reservationGroups: [
            {
              passengerType: 'Adult',
              amountApplied: {
                totalBaseFare: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
                taxesAndFees: [
                  {
                    code: 'AY',
                    description: 'U.S. 9/11 Security Fee',
                    fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
                  }
                ]
              },
              productIds: ['oneWay_DAL2HOUPass1_PTS']
            }
          ]
        }
      },
      loggedInPassengerInformation: null,
      savedCreditCards: null,
      earlyBirdPricing: {
        href: '/v1/mobile-air-booking/feature/earlybird/prices',
        method: 'POST',
        body: {
          adultPassengers: {
            productIds: ['oneWay_DAL2HOUPass1_PTS']
          }
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/calculate-funds',
        method: 'POST',
        body: {
          promoCodeToken: null,
          itineraryPricingToken:
            'dal2houPointsPass1_oneWayJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..45LcTZqZYQ08UWeraPMo3Q.2FN3tyIFCRX9k165IkyP6H1cu4gPgB0kt1VQelzNn92Ne_2LhbG-SuIBjfliZ3Wo_StC1asYXXqM6-oWR7pzv96A7J6vZUXLYdqMastwdzWEBH_5b6nvPVP3RmMOHjMsiJcV11NSiwnauW-JOsg_1Yp0g-fCO5-ALNwk4nk7JDTsh2QMEUDbAQEZFtSF94-F-GnU9LdoIlBEboHRbXag88gKJ4JvJAcjLNnYzYYP2zC67xleWaCfCRb95vagUG3c3h-cOEm1F7pCnlvG95J-bVE1e3AxCO2qfMctKsAsppJddZQHmghbaQRteO-XIMRcrs66O7xs-QE2TFIRPGMKqTosZVIdSrQ7K6fxVgJOWBoFNh-kZajzsb1ssyrzm-DpqvCOiyN51hCjmj0RdrXudDf5fJ0ylzcAzJ-6FEpehpJQs34qxcEG2L6FQhPHVzPiBq4HMwoA1sECPIbYELHkNm82Wru7OngRq8JdAgQX-RlWbswFPO_1tc60soBGB8J_kcbEziIBd0jTOUhKIPFiW1JUTmT-qAJ-xq2j2bK4E62sO3AD9oqUoyopLMn9WqeACEORNbz7Lka3wHTLZxWOmT-ELtmQ1guiarLCdlXPNLM2X2vrElIkNB3IZb7XhECsFVuyFkMr8GS-dft1uzBRSbf5UCMZkzvpnm1_JQR9yoiedjA3gSbNcw5FHthoriNY8AYvIzY3OiOjrju-jX9_qawoeWwk1Khl807vRapSTKLitJYjaLzovQYxNbTh9VJQ56QRMSPsWAAfUw9Yw1E_WxLDxvpj1QMh9KC_47lYa96ZjzE4VWLRhUe6eKv6ydv3sCdj7BBjtXyASRinkH5QnDMwwUYD-BovWt6lsNWPqQONvmC2mbJPZcU9lPjfn2GS8nw2_XKbvuahvgyHkKAESRAqt7Ljb7bRjicucAYnD1aSQaVMQKQzanMpPD_q12BpcXwUg0U_KdeTn0abfEtg0y7UfRAZpxgbAoDhoNnB7fnxW1G1mmiNMUQWOBuaNCTYvHia5ozaHZwxPVWikqigFcLfDUT_XlemcI7lKhIY9zcocfWNGJAineYycu770eJk33UlIs3VRSbIU-_wDY9PeApkGQlSfnbxBoxtvMtOPAV1CK-7sVJtJwoYipqKS9Qdm9SuUsxA53POk-E17l-7l0hOJ_R2fIvACGDgiGUurfyqDWrrgpND0EOlyIL-Af0GUUigXyARSnIx9OVmAuq2VYVjxy1I7AppEtxPC3ANaFVehmcpbsVln550H6Z3ReWFjY_rOYzOxSc4bCJzNHYpw46G9lxKf4g9IS_b8MvwQLnrYjAC-I4D1Scg8Uz3exvgyYKBDM3cIrggCZ5DtF2YtZ-YDwhAenljckcHiRvt3kdoNDYNjaZojqyq52L2Rjd5Z8fD-oumZZdWaLLerzHrf90-Qy-TSxvpj54mEZR7eNrKUR_nYIWeRXN11eC0oCPnjvP4t8jsj4VV8xtzb2YLrA.YaGhc01bvhMzstbWY0hl9w'
        }
      },
      flightPricingUpsellBothBounds: null
    },
    isEligibleForExpressCheckout: false
  },
  prefill: null
};
