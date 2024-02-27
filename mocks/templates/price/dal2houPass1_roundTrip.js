module.exports = {
  flightPricingPage: {
    message: null,
    header: 'DAL - HOU (Round Trip)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-12-17',
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
      },
      {
        boundType: 'RETURNING',
        departureDate: '2020-12-20',
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
          fareRulesUrl: 'https://mobile.dev2.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '1h 0m',
        _links: { flightPricingUpsellSingleBound: null }
      }
    ],
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '673.80', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '600.00', currencyCode: 'USD', currencySymbol: '$' },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'US',
            description: 'U.S. Transportation Tax',
            fee: { amount: '45.00', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: { amount: '8.60', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '673.80', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: { moneyTotal: { amount: '673.80', currencyCode: 'USD', currencySymbol: '$' }, pointsTotal: null },
        _meta: {
          discountedFare: false,
          selectedFares: [
            { boundType: 'DEPARTING', price: { amount: '336.90', currencyCode: 'USD', currencySymbol: '$' } },
            { boundType: 'RETURNING', price: { amount: '336.90', currencyCode: 'USD', currencySymbol: '$' } }
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
      purchaseWithPoints: false,
      showRepriceNotification: false,
      newCardHasSufficientFunds: false,
      authorizeUser: false,
      internationalBooking: false,
      chase: null
    },
    _analytics: {
      'air.fareTypeb1': 'WGA',
      'air.fareTypeb2': 'WGA',
      'air.fareProductIdb1': 'WGA',
      'air.fareProductIdb2': 'WGA',
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
                totalBaseFare: { amount: '600.00', currencyCode: 'USD', currencySymbol: '$' },
                taxesAndFees: [
                  {
                    code: 'AY',
                    description: 'U.S. 9/11 Security Fee',
                    fee: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
                  },
                  {
                    code: 'US',
                    description: 'U.S. Transportation Tax',
                    fee: { amount: '45.00', currencyCode: 'USD', currencySymbol: '$' }
                  },
                  {
                    code: 'ZP',
                    description: 'U.S. Flight Segment Tax',
                    fee: { amount: '8.60', currencyCode: 'USD', currencySymbol: '$' }
                  },
                  {
                    code: 'XF',
                    description: 'U.S. Passenger Facility Chg',
                    fee: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
                  }
                ]
              },
              productIds: ['roundTrip_DAL2HOUPass1_USD', 'roundTrip_DAL2HOUPass1_USD']
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
            productIds: ['2wayreturnDollar', '2wayreturnDollar']
          }
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/calculate-funds',
        method: 'POST',
        body: {
          promoCodeToken: null,
          itineraryPricingToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..Mus6Qgn3VO2v-h9FtR9-cQ.d_XGixy4tmfbnWPfYCwf4h3ZP5Ms7UN8TZ2ed_Fr69CnczvQn4Nilu8Kr1dfAACjJX7Qa8is3BX4C3JxGLwH6QDbmpUdbpwUBmQz7dby5y7GvyTkQeQ8uuOG_MKfbaiapwWZ7y52T9Ur8dg1yA5fFy9dwQDlgFyTz8mQxLFZLxjQKPx3DcX8xEu6Tgoo8CTym-I7lmm1qDHB1SNPMD6Pzj76XkP6Rp4SAkPrnrV8CbGv0RPCuuE95ESoZ2uWCVZHHh6tCgCAWTZo-WxAk7UEMWXiFLzeBq3_35NMr2FKn5OhS5HIwpca557E261cop-LWrHXBOXbsHUqccSCSWuQz0CZs1PuZhRvY8z62HkDvUljx8w94FR5wZgc2993HC8jWyd8m_A55i_qiSWm3pOc1rO7t-LuIOCeRrKeUN8vbVJnvGP_SKQyjMTJlWf0yVAqQURkm3WySsG1CYj_O-7-UB0QuZ_K5IB1UNY-zaK3ixi_gR50F7KE96kqg0WYd4Gj0M0CJlZQfOtUTSDvcweRnTlApAE0TxsoZ9QDbIdFlCni3dYItVmMgugOB0qlUrgJaxV6jkOBaIu4MDxsDcvhQcpahPBAbG_A3Gp_BgRSOM9Xsw3tesgEmTe294RYdp-38gz_wF9ngwkYamSdBher9vnAcZPi3nH5NfCauVupwjaraPOiFTVynWMq-x3eMgUga0A6HMsFmAltiNe9m-jcj32dLjVzAcwTbICW1TTPozmE7VnnKPJJWHRhlC8nuo0cHY4eroa0Ll4RaV5anKphoR1CBqFdeOInDrXNDka-4zj3u4vLr0gH8J1xp483uNBuZ7Pu0M07V5Q7EOewxWK96L-fOcV5EYGTDCRCKxponK1_oFbjrM7ycxB5BjKCyfTrSSF5GQTTqaZ7g8dgN49ZFRLlNpkXAC4d2W6EvD9Tl59-_zKvYMT0xb5Q9w4WrvyInwqP2GWZaABpP84UVqlNCbi_NaExaQ4kmtZYFGzHiXoWaVWxkGkgFA7ggec03cgKijAPZtfGA676NT8OQ7-ENBBUbo1VLKS2tS8eLPrPB_HzzwbwdPoMmf7cMdkH8FcujpZA2g8LG3EpGajBO61E4WEehWW_Xk1RF_rd0jxpF5VsQYaqhGkRT3Ncv4pQsAgknhP1dk9fq4H3bjLLWWNYAD4-Ig_KKhcnADwmOKgqrxU4BVXWVrjItSsgJtszhRCbk3QnQ35lZX61KqvNe3OVBAPVGsYLbBd307Qm3THGSo672axKzmo2MSDKCOsDZRwwb9sgCCzE51y5_8XUjqSLX8mAZZ3l2RyCHdQBCyVVGXSxrm9Dwwh9Ra-ovs2ixzzsQK6nrbp0pL3j799p6IjsIp8__h-z83VFsXuo9LO7m58WdqrteWnYoJBqx7eqlSSLeGsOBxwrfUphqpg_Gmeqt6FkGdY1Cr4e3GmKeLQHvLuK0-07ynB3K21kJiAMZeOyz5w-IuuHLeX4sagXdDhvhHN4xxUNXr4y5RFYdW6VthIHXtyuxusGh1M3mC28SqJXFX3CaTENgh0juNQJgslUirGi_CbHiH4Ns8gFCbrRaHY_5uhYQ-3roWWzVpsWiCSsjIEWAPKBn93np6LG4mHe44pnKPn64MkqK-O7MThrsgn4xcTTzti3pwx6Oam2KBPvAFBXHHFoWuc0yaIUAT5UcRr-6F3FfdWyMpL1DQFzPrJfdMJzZck81CuePKlfvvJ1IncAgCWpUmIIWYh_kImamu2D3aJ-LuSHT7MujKfzDBZx06X0GVe2mt6tJJOvnpK3T0Pg6W7AX-V8YoQZyhZXmB24PrzVTdkt1tQy8H4I9j6JKjE67TePttXiBMiPvUKzMpM2TevSTNukeiW5iTsV5B-dOrUt_GEmSeJA1D3a9GIAGFa7P-09U3MWrQ_KAkg5cLMh3Q0jTtwRvWXHNbCcIuievi6sEk0i-lnUuEuKstnfEgmVwHr-e-5EcFgZLBbDyEqrXa7ofqjOZvYt-iUgPo-Mg-5RmIAAh3EOzFQp3fYIzsDiSDK2SfBBJZJqKKAn0PA--J1zxU7GMrWRF7QF15knDQpZp-O7yUausbK3TiD06CGffOkFyee2Gu910OESBMFTYAKIjS4EE8bOfgTaV-4PUqUyGumzvpyVlAwugN1G2Znbx4RsLJpfTmM7iV6A9tpgbguttrRGBjPj3bvOCKeYIoRAdBrHuW6MaBGWWgizeGaYh9_qXQIOo_Fp7wmqJJ7Y64ejk1roiA8XO75TW3ieMGOH_r3knCSlPBsiH_UtxeKjPtqLe4-d7bxm4cg8-LpS0AuRuoVgAMEDS5cG4dHHaMgtoI_EexHBOJ0yOl4MsJOyvjmrU34lxzRWIbzf8Hb3QlarcdUouNyGdXzOy7Jp4W7E4ZuuzVJZzR-Mmu3YWQIfCGHt-rUCuEDV-CMbjxfaEBS17ZlYDgGpz_qpCse4UclFoxRDiTgf2ilNX67EFssvBc0o1K-yoklbIbQ-OblDQs0fPjzLRBGqCqwm8RW0ygUwO5MFPxIMEWecH7Ua4XrbiHm1Qg5f45zgyU4RskyfRjhyxy6tPExfPVl5gMYVVQMN1CvvWBKDpWmwFh4.dYSZr4jPvAbhDcpaPzbffQ'
        }
      },
      flightPricingUpsellBothBounds: null
    },
    isEligibleForExpressCheckout: false
  },
  prefill: null
};
