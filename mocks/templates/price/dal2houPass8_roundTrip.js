module.exports = {
  flightPricingPage: {
    message: null,
    header: 'DAL - HOU (Round Trip)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-12-19',
        flights: [{ number: '1628', wifiOnBoard: true }],
        departureTime: '06:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '07:10',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengers: [{ type: 'Passengers', count: 8, fareType: 'Wanna Get Away', bookingCode: 'V' }],
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
        departureDate: '2020-12-22',
        flights: [{ number: '1636', wifiOnBoard: true }],
        departureTime: '06:00',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '07:00',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Passengers', count: 8, fareType: 'Wanna Get Away', bookingCode: 'V' }],
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
      moneyTotal: { amount: '5,390.40', currencyCode: 'USD', currencySymbol: '$' },
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
          passengerCount: 8
        },
        paxTypeTotal: {
          moneyTotal: { amount: '5,390.40', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: null
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            { boundType: 'DEPARTING', price: { amount: '2,695.20', currencyCode: 'USD', currencySymbol: '$' } },
            { boundType: 'RETURNING', price: { amount: '2,695.20', currencyCode: 'USD', currencySymbol: '$' } }
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
              productIds: ['roundTrip_DAL2HOUPass8_USD', 'roundTrip_DAL2HOUPass8_USD']
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
            productIds: ['roundTrip_DAL2HOUPass8_USD', 'roundTrip_DAL2HOUPass8_USD']
          }
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/calculate-funds',
        method: 'POST',
        body: {
          promoCodeToken: null,
          itineraryPricingToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..pvB5q3Su7nRzaz-2qPP6Ug.Aal2yMrdxC4eveUPlPlf95vYt0LIYkjFhOx3dpVWk7a0HtGIgXlAlzjCgLxt-BwEDS96CBCh80RMVphG0qKToYFEGcjwrBIIekfiEI4aN42OqVdfQ3yBIUqbkNfe9k3DuoI5ZDMiez5j363cOOZhlGWwqHKdzrOmmWuXteAfmezp_gs1upSw7MwTiSRMAnXuZYwMxUMKU-NdngHUM-qBVr_kcQMDJos0QuvNo25Wery9LsrKeMNTcdm5UwxszAQ2GsOyIA-etULNBvsTfyFdFJW5zspIFk_zL7pluBGlg--BRIDjzsf9JXKjFo4_LBh2hPyspIfCRp6I8wtx9xLi9aYVD5gn1CyG7NAxv0y4D2kH0ooGRCViFweo0TyZBWHan2CABxIJAOS7nRz9uByu05TIOqggssUKpeCHzYP02GxS8uxt3xskiGE6CVAehD03AU0f3CoT46snMwJ1zHfBMNURFZclSNTTJH_6UuK78uE8e2oRrChTOuCXmYdoIwe8cuPRQ77IPMtPs1r43n2C4157w6D-jb4WLmVrAWIb6shtaBltubZSZhGQKjYlBdS5YZHOtDVob1kXZeIQGelaaeFICLNdkMtw0_eXOLd0qYFPlOMeB8NczwprexG6B0W2bC6-WXimZGwaDKgUsK_OzykdCj_-somqTUjX1xrx7ZdnZ-ab7E5CxoK3lOj2iigQGQmB8ryBuCebPYDbsLDYlbkfGSceG9Ilb47s7oSEvGiMn3uFUfwazwHbFvMyYMtfzCR_RU80-Un0s6IT5jxWY9XWjrvJ_-m8TD3JjtOnThBho8ZMeYw9uasCdv6mM9_Ra5f8U-UBehXkA0vZqOoHTw66gGNbLdFNklpsy-qdYUhKt9kaEoL_cKETlnDWR-viiBiL0xHB4vBhFw4HvPlYQ-VZjpJDIf8OckjF3DtsTtXUKx6DRviGxh1zLhZtA7AsLJb-RIllEIm1ygEeVpOXGOFubvsoxiLlH64ZRM0hYV-MBWeN21C8i5d-Th_QUEhmjM9O6iSuIVx21wlzsiP9G9PY1uIcSUSeKdFnXs7Ngyh73GVwTlFN85DX2u1tRA2hAtTpqSg36Ks1gfodQyu3n2YAJ5iv1JiOrQ0LFEJKk7--nIDFPglo4eFUhWWbGOr7lwsoOPUQaDX6Ureyh0nQw0bwJarZTuT61PcA9QN1RZURxn_gZg0pu68_ed-keriBhKvgTkhblcso94RStjESUhI1BMUf53Bs3F2Sqo390wgj19gM-srxkH6AbHs4TVQj_AtfD_njUrUvh1yMCDf6VfYkj0iox4hcaTqKxbwPGG-klOkEtQYU705O38aVLdqnLby9WGH9eg0if9slZhbUGSxHunUh6U_LbW3903aC5TFYclKk1FcEkcPVM6WUnsFyPhedLGCW0qA3c7VrcQCD8_n5p8sSRAN0cBeCzqaYuuedwKA_IurilgsTR6cmZ2e9noKno5yb0-amsRC2yYz8HVFuHzqAkSncy3NBOqRiw-er38JadhWUbN7zQ6SzfS5UowgiZU91hZF1X_rySm3JP-Es0ZcJkbI-W1KAAVPgbX5usvlJLy1N3KneXLd8VcB71gBkGOms6aRNv0Zb5Z2CyKF7m7StKbMYtEsZRhart42AtT6Mg3u-_DgmzanQG1b4noUhUW8MY3zEIjEQiQ8sH2GznXwYFUJ-raqO6XLzIWhKxdSVf2Zj2s0d1GgRtN0jcjOde5J3TNhML_vTtoFOniqgTJ8HbM51tbG3xrBr2bBK470UE_Yx1yNJzLTQotjBsRDgJG9S_w2OioV-Xv3dbq_-Tn8CHvzXFJbF83B_aiTuAIdMTWgAJzdVAfbMmdI3UChFwtTfQCOBXYbN16rr8hTr5_Ou4XMDQwbipvHXftXSsuzGFtThEd2rg7s77ezOq7OYS0867gqBMw2lIulL-y9HOzJv_fXLuFLSWQZl_-8OPCRG3zGAYYN1aJaXLNukp3WcUvmSAElOCLH_sCB7M6Ik19TMfid5_dhCWpHJw4DUZ4qLYZRoKN_l-zEqdv0V_OFk1m8OYfjLpm8VNs4NjY_VAnHMz5sNFf8G4LCWe4cZAqrtpxlPcJ5tzZ5cGhhblu-CyleX0j0XXO-WbDg9NBufuSTTkius916eAJBqp4uhVcFod8SxpoA_VrH1QDdAFJd2umyHRH_F4iChsozLv5oIrrE3f3H5zPzns2a--4KTlA9g2j1vCdBdzYoc67Cfm6Zvoo2JfD7NwLU5oBBOj3kqEEIZpQoPXv6tFV3PgbO26sTAedp-PAdM3F6pcjurMEomxao0zIZ_xfFtMEpg1N9PBAnPF2cEXWRXZRIV6N10FsS2PA8eUF01-aOgBayaYiacKoEiFdphLomQXfjNTN4auhjXqbC7-rAs3HSQg-emT3gu__AdgqJ2M26bkBELZaWIyZsqCHTFGJJz4Pf6odnstWov2__CEkqIGKg_KA0UtmzQ6LInmRnDUs2vTSIJEJcMh13N2vplyuuVEhaSAbPIP49HcNI1Bhv6RcasReZ9xx2UZ3x2JywQo5nFWam-oRPqs0uXWx9WIQ8Tx3S78-QnV5E1Rp9-g1Ef8MHNaPQ.45d8m627ddm1Ygg0fzBjng'
        }
      },
      flightPricingUpsellBothBounds: null
    },
    isEligibleForExpressCheckout: false
  },
  prefill: null
};
