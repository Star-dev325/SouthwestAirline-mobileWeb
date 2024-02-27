module.exports = {
  flightPricingPage: {
    message: null,
    header: 'DAL - HOU (Round Trip)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-12-22',
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
          fareRulesUrl: 'https://mobile.dev5.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '1h 10m',
        _links: { flightPricingUpsellSingleBound: null }
      },
      {
        boundType: 'RETURNING',
        departureDate: '2020-12-25',
        flights: [{ number: '1636', wifiOnBoard: true }],
        departureTime: '06:00',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '07:00',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Passenger', count: 1, fareType: 'Wanna Get Away', bookingCode: 'V' }],
        stops: [],
        upsellBoundDetails: null,
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.dev5.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '1h 0m',
        _links: { flightPricingUpsellSingleBound: null }
      }
    ],
    totals: {
      pointsTotal: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
      moneyTotal: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
          money: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null }
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            { boundType: 'DEPARTING', price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null } },
            { boundType: 'RETURNING', price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null } }
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
      authorizeUser: false,
      internationalBooking: false,
      chase: null
    },
    _analytics: {
      'air.fareTypeb1': 'WGA',
      'air.fareTypeb2': 'WGA',
      'air.fareProductIdb1': 'WGARED',
      'air.fareProductIdb2': 'WGARED',
      'air.fareClassb1': 'V',
      'air.fareClassb2': 'V'
    },
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
                totalBaseFare: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
                taxesAndFees: [
                  {
                    code: 'AY',
                    description: 'Sept 11 Security Fee',
                    fee: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
                  }
                ]
              },
              productIds: ['roundTrip_DAL2HOUPass1_PTS', 'roundTrip_DAL2HOUPass1_PTS']
            }
          ]
        }
      },
      loggedInPassengerInformation: { href: '/v1/mobile-misc/page/air-booking/passenger-information', method: 'GET' },
      savedCreditCards: { href: '/v1/mobile-misc/feature/my-account/credit-cards', method: 'GET' },
      earlyBirdPricing: {
        href: '/v1/mobile-air-booking/feature/earlybird/prices',
        method: 'POST',
        body: {
          adultPassengers: {
            productIds: ['roundTrip_DAL2HOUPass1_PTS', 'roundTrip_DAL2HOUPass1_PTS']
          }
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/calculate-funds',
        method: 'POST',
        body: {
          promoCodeToken: null,
          itineraryPricingToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..UkaycEVLU-iEThnXoJQ3bA.MXxP19DqvTAkhIKByWl_WEIE9LcuV0xwdNNIgxTs_OR3vKSCX_rwLVIzyndRjiJJyS8xUcwHOmEUM0Vpvgrc_MYiCUkIghVGbmkkWVCh5pwm0Cc_URvg52Y0-79FjqYipAyUmOoFs9QWhoeiD01OcKQP9352PkrdH_zsU-wTVgwzJEOVdECGHb8LtPQKT6VWorHO0Js1ujnmcluUPIgUIUen8AeGJkLlJKmY47GUCJU-zryh4-_Gcwq3Yn9-mhTDbErFFJb-kMLoAs5X3TQWxXxRGE9FnLQ1Zb8XO1dAbZvSWJpoBltT8quRvfsN0mTIruUCkrzR5lBUWVYoH8ds41Vr86fNvjif6y61o20qJnKswPRX2eeWTrSxJIQKnsAQIyHS_e3mnDU44ZGE8BIG0uc1uiiG9ryaGplPCJvNvgyOwUPzOkCp3x3Q4no6f0UMdsRga2b3oVI_QKbTy1zhEReH2wQoKk95E6g1T0MIt4pumOT_5Rq6lmPOLdIvzGOmT9YBANjeAB9bbG2tC9xGrx6JrvQpZpMfEpqyiEz4MiPW4yVnQq5e0M9Vv42utmaEUYLm_aV37Gajl_0Ts42nve2DfxJV_agQdcjjXRucYH6fNpOgmhMju9lyh3GsAGhDufNEIiOvnjnttfz99fWQz-5sx3UrygyNWkOmow9bJn_mmGsYeT-utS5kRyRKtw1KDm5N0hshI6l0dVgSdGRC8BWk_apYh-WRoISC7dPGQY7wzwKRVaRUkDGKL4NATmiLD5PYAep3_nnlyxbNBmTOw7LoIcwVE2cpEY8PHZqR_sh4_3RVxc3MU-aFBRCixcKq4KEfJf394_09BoicoIgW25mDogaWqeotTlLOrtRDwczqXUCiuXgshd_gH6rglQBiBoy5tFc3aZEE_arAGyakI54mu8ycGZHJq8Dq6A_JZi6O7scDgpC1YA9A-4YAMQ-B2baD2xEfhwqus9w25_nfkdbnMpYfI4xiYs1jfsRoXWLqZv94G5BuJtIe6XSZ-fK3hY3bbdVUfPZWHIdZo9FG11iJHW3ioeCW6dHgapis1Es5qvruYtFaVAVx2ge5ztHKtHbKRtTBWb8PZC1NYwCPeJ8AiJYQ5k-YB9ziJRaNIt-AzpblucfaLgyQ0rSEiBTsACxiXWaR0B7gpnE7PrjPD9iykF2eUcv2BOi7ZZxatV31ZjZtdNk9pzw7AK2KKBgI4aZG2RLW9NlcuLSSyNuh0ikigKH6i17v9jkG56zPg9yNh2ryuTFq7Rxf0q4F0QutvBzv88-P4Z2vGK4pXZW3m4Qad_F6Jpywf8IVTMSFt1RbF273xfH_I9gnMDccnDQC6IW86aWPulyFJDszUmd7wOLAlVF_WfByn3hbStVgAqXP5KImhXyN89AYhlU-iWQ7buAWnmdmNU9qhmeqLEhb9J2IiwZuYETkKfW_abQe5Y46o55COV61uhnAaoW3IqLNA7FfoEckiE-MVN7Um6BW5m6JzyR_wiwVZxUdfFlH6nM-ZASLLvdcemULC8K4ZlbXcweX4LkZFI8DxGVcjur-cTN9DFwYS3SmCaYsgXHm3GBGvVGA7q6SU6eHlqjTcACuZvd-hAZAKzhNgORVGOgNVBxqO9hPptnssQLRR7HiWEU.xjoV1qQoHP6RTJm7cA1qXg'
        }
      },
      flightPricingUpsellBothBounds: null
    },
    isEligibleForExpressCheckout: false
  },
  prefill: null
};
