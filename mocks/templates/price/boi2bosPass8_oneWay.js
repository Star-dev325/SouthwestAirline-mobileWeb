module.exports = {
  flightPricingPage: {
    message: null,
    header: 'BOI - BOS (One Way)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-12-18',
        flights: [
          { number: '463', wifiOnBoard: true },
          { number: '128', wifiOnBoard: true }
        ],
        departureTime: '06:55',
        departureAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
        arrivalTime: '19:00',
        arrivalAirport: { name: 'Boston Logan', state: 'MA', code: 'BOS', country: null },
        passengers: [{ type: 'Passengers', count: 8, fareType: 'Wanna Get Away', bookingCode: 'W' }],
        stops: [
          {
            arrivalTime: '08:55',
            departureTime: '10:50',
            changePlanes: true,
            airport: { name: 'Phoenix', state: 'AZ', code: 'PHX', country: null }
          },
          {
            arrivalTime: null,
            departureTime: null,
            changePlanes: false,
            airport: { name: 'Chicago (Midway)', state: 'IL', code: 'MDW', country: null }
          }
        ],
        upsellBoundDetails: null,
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.dev2.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '10h 5m',
        _links: { flightPricingUpsellSingleBound: null }
      }
    ],
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '2,872.08', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '308.38', currencyCode: 'USD', currencySymbol: '$' },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'US',
            description: 'U.S. Transportation Tax',
            fee: { amount: '23.13', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: { amount: '12.90', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '359.01', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 8
        },
        paxTypeTotal: {
          moneyTotal: { amount: '2,872.08', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: null
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            { boundType: 'DEPARTING', price: { amount: '2,872.08', currencyCode: 'USD', currencySymbol: '$' } }
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
    _analytics: { 'air.fareTypeb1': 'WGA', 'air.fareProductIdb1': 'WGA', 'air.fareClassb1': 'W' },
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
                totalBaseFare: { amount: '308.38', currencyCode: 'USD', currencySymbol: '$' },
                taxesAndFees: [
                  {
                    code: 'AY',
                    description: 'U.S. 9/11 Security Fee',
                    fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
                  },
                  {
                    code: 'US',
                    description: 'U.S. Transportation Tax',
                    fee: { amount: '23.13', currencyCode: 'USD', currencySymbol: '$' }
                  },
                  {
                    code: 'ZP',
                    description: 'U.S. Flight Segment Tax',
                    fee: { amount: '12.90', currencyCode: 'USD', currencySymbol: '$' }
                  },
                  {
                    code: 'XF',
                    description: 'U.S. Passenger Facility Chg',
                    fee: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
                  }
                ]
              },
              productIds: ['oneWay_BOI2BOSPass8_USD']
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
            productIds: ['oneWay_BOI2BOSPass8_USD']
          }
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/calculate-funds',
        method: 'POST',
        body: {
          promoCodeToken: null,
          itineraryPricingToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..CsWFWig2_60p23XxsLZd3Q.bJRi9fLVNiaIH4emH9mh-A59v6C13E0cVWXEoV52Y_PI_nEHP3KcXHAMIwsEL0eYEJBavjoc9tyudWqagWaT-5pNO6yqKaukDwTfbPP4_xllCwc0YFK4y6s4tMnRrnRaCxeXARSf-7mvA2H44R6Buist_wRxuPuvcdsbPW--RoLWPZJYw4YLVgtxpou0YcU7Xp_1HEPp04YknzzaXAb3MMMkG4Ktdk0HDgptbdb1BYdRUJhZtUYEjRomcuOWeScce7Ymrb58E-Ew2AF7lpX_g8AVC_qgwwNpE6KVVIRxPR2UixjSww7c4qsOJwIhzWJH1LZDLXdDMIshqBBBA01KM_FGUFRSSHgSd5C4Cw3BpmbRA2OUxrYI3OZrhFwi7_y0r-ei68KMTey6S4AHi_jUucL_DOuOeBTJN1_4-RSBtqQIaGikW_Y4JakUkv6k_UXWU8YGz_-d2WSbZg9D4z8ArNdVywf9iUVFh9s2oHandXPZIgSHX8d1BUFynTiXLXTaNrjOcMmaDLPO3RMNhyfLXcqF_o6fK17KIOXJ2Ojjdlxk2E-rHADJc1e09_ruRHb9bl2KQXq61_wOV18icy37M7NuSdKKirSerMVD58pFM3rwPg58k1v8ggvFSle3CtWdQZtlOA9EeoF_96YNpGEORQeZ5d2rb9Afwij7O9jO-P7BGF-p5X5GVsk1VjhjSoNc28aYwE7KyHucloEMDSdgJi2GkOli0RrdohZuQ0-4j8rN0GK4e9V70sNlUmn9XEWfG6k8IrXzRwSevkua--0HCyuoUZELkagVDZ7459dUyr2YIGposDZTbJctHp71ftBd_sJxu74wPAVijjzo1obB4mtf3JhKaP_gUW9oSxm-WDVgI8mm-B2My8YQmVv_gBqBivdKtrsdbVMTN0RAdmVvkrvMBCLI9asD_JmCYh5hMI9g3jWKnAFAbye7UXyMMN8YO1GNQ7Ua2_qOanwIGqG0RI5D2hN8O3e3Id1hSaRx-wiwMrn7XdUzyvRyMwDOYc5vsIy1kWv9HIOPyJ7_tbkok2LOs3sFmUNYwV3wT_sYxNHqpyyjaBhx6jmR3nPCaemMpJXLP34G1zerEfeNH4J1X1UQE3Rb10fjrKtimBK0cBVnIQTXq3L2fcBHe3cM5ogbhluUuC2L1ZzwEQIbrgsjE5C-A2KQe9oU6Jf8l5HPFzf-bAMYQjfoK91JXvbDfh4EHnJUZmwt_aL9nJB7U-8MsU4BjdbwKPYlz_-LkqDnTG69Bray6Y217E8_dFyRxjZClWzW-bdwRcZCHqsdGRPTM2v9iKccptofJO_k7exSK71EZ6pdkOH_p41_XFcAoucP620Wc3KHGc4A2L_2wrVosQ2vpsea1kIkkJkDbT1xXRCtGdcUmUMddMrFjZOXnyAj24HPJ01UXv18Lcbf5toUaIyCLW0EBOl1DnvInLuiHicSIFR1-aVCzHLmZR5szgKgHQjSoMcLaNtXBdLEe8wv-btysfVN-pqjJiJRMiU1mtVb05XaSCDnnwXCHrpMqkiAmWW2DsdhcAiVt7-ilZXCMXNnVEzrMPdG_a9yPzbYJaYli21LaFckaeoIiEnIQJQl0FE4CVQw_w3o2M4O-kMPwDGJz_YSp7LmHUmFxXG6yLFYTMhyO6TiUhZDv2uSQ9E1WQcykDxR82qvMjj5YpLV7GrkRInFWgYkIDmRnwxvodPnSb6AaB6ZZ3KWMhDnkFceU9Mde4ep_VPlfNniMXV1zYAA66ff85gFJJdNWK4qLpWlO7VLREgQJzTD-My8zStBaMQ635jJo78F2BIM8e8ItuM7mUe_VFuATGwwdn2c2fv12QqEJWIhfo38vlnz2GboRn-tX_mZW-3uew0RI4HoECFGeUejJHMpebeaJOfWXVwZoTRkCdKQeom8-looMTv_rFsFukxerLydRU49nXSx1-sxybB83vWdpv09DhqbmdsxNUPbSkm6ZXmiO_25XcN5dRY1Q_2N63VF7fKG_vNRx9tvncgUAGI8zSUBsC11AfwAWSnar1wAOAk6FkkerYG5u_vV3smg8KbzCBREj1Jw8-O1SV6tM1D4Q9mjCLCXZnyAcRgKqRInMUBN8OQ0vcwAqQJK7yDBh9RrFXFxjZ1hgGzmy_BQZ8cMfz_wW_lzg0UYOkuQjXL9KKpP3hvYz0Tz3uLwtA0YjosGk4BoCESWafHAyZNARUHbp0sqNn0e_3fvgYutZLUE2-RE7TgIXPXlHEL9VlNU-0IaKgjeDPwp5DIdkubempKpdKHJasGND5ltwh_fv-augjf02sKDR-4gpHcYw17WnoKC_srXT9epShf8r67tDJugeh_ytXMbXfpsXituHdm3KzsfQ6fbV3gqURJFurucu7CPnUGzixTmpTXSIbAtF6Q11sV6xJNt3yLyiDVNYdY6ObBqGb41fsGgVZx03l9gXuM281CrEqlsRRXbq8EmVA1Q0QvKHKsPUG1BbN956gpi2BcfzVPDFVzoOUPqc6DPCbcVHh0ksyM6nRH75zkq4i98pIotzGGII3Ep1bho8VW7kM3sJM3Dxi0qe5XUF7XkQgx9-vX8DWklBw.q9Cc53bBQrS3jsRWLmRkkQ'
        }
      },
      flightPricingUpsellBothBounds: null
    },
    isEligibleForExpressCheckout: false
  },
  prefill: null
};
