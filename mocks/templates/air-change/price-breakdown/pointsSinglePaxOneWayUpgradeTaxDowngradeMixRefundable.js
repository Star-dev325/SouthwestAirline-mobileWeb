module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: false,
    hasNonRefundable: false,
    recordLocator: 'KVPY2V',
    emailReceiptTo: 'testemail@wnco.com',
    header: 'AUS - LGA',
    accountNumber: '601143782',
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-05-31',
        flights: [
          { number: '337', wifiOnBoard: true },
          { number: '5838', wifiOnBoard: true }
        ],
        departureTime: '05:35',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '11:40',
        arrivalAirport: { name: 'New York (LaGuardia)', state: 'NY', code: 'LGA', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: 'Y' }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: { name: 'St. Louis', state: 'MO', code: 'STL', country: null },
            arrivalTime: '07:35',
            departureTime: '08:15',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '5h 5m'
      }
    ],
    passengers: [{ displayName: 'JOHN WANG', firstName: 'John', lastName: 'Wang' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '2,613', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '10.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '41,633', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '4.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      tax: null,
      nonRefundable: {
        item: 'Credit',
        fare: null,
        tax: { amount: '4.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      refundable: {
        item: 'Credit',
        fare: null,
        tax: { amount: '2.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      totalRefundability: {
        item: 'Credit',
        fare: null,
        tax: { amount: '6.40', currencyCode: 'USD', currencySymbol: '$' }
      },
      newAmountDue: {
        item: 'Amount due',
        fare: { amount: '39,020', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      }
    },
    totals: {
      pointsTotal: { amount: '41,633', currencyCode: 'PTS', currencySymbol: null },
      moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '41,633', currencyCode: 'PTS', currencySymbol: null },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: { amount: '41,633', currencyCode: 'PTS', currencySymbol: null },
          money: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: { amount: '41,633', currencyCode: 'PTS', currencySymbol: null }
        }
      },
      seniorFare: null
    },
    isRepriceNotification: false,
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    _meta: { purchaseWithPoints: true, newCardHasSufficientFunds: false },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..iNrwF19-WtUFy-s7vzqp-w.J6nIcQTtnaF-qBuCsKbwbW5vOValtcnahTqEOAllnTvMxf3C3w4hqeG3xJ6gAm14zyErNkauEn7wSq9gqlFen3Q_4L2_LJCM1Y3IYAfyyVco5Ctxo9lLs4MlkNVXbnOad_zQkpafyTWy77h66S9pRMMHCihOASwgBQFAAfR_N1NShrqHbmkX8IRQwTqQjo0bJySucvDCQ7X8ne2D7UiAnws2XXRHhPPmbq2KO9837mM5ggpGyJlctKBuF7OOQ6l37ujMbaUhxCpZ3MMGyHZUMIKS-sRBHM9XZHw5KVZtqF5zY-p8M7BQbCOGwuubLuPthlg-bm1nAPOQ16KwSAi2OqiyyZScGLy7PlhicSovlRdAyhZwe6Q--av_b-VOO6Aoeypxvh4ikp8D4T-fO_3ORMHOQ3qv04Hn3A5_tl9HH9zUU3g2LDghUN1vbxG-ix3oDNghsxC8Hm1gqzZz-Y45X3X42iNMtIdnK7kMoKVyVD3BWnkhXLyAvWHsGyEyr9h1_Bcy9rUPwnLioYsnya7i5d6O-zyVGQLOSv0x263zJz-m7qs6rB2COzNddXnBTSVtI8bnB-v-Ctj8Ih1s_vBwAN0Qn-2b_c6K9lL_-xH97tbo9wqgNdWK7LNaqLY1r69ilI4H_g8jc2BuhC5svnn4tUzCA7nhXrxtfs-VkTy_MCA71xL1VwjpCwT5PTDfafopX8I0IMh6mBVbqpJNOLBtV0V7VwBUdRpgD-DOZ70ygEd3EX_n4eTj7Xu8WsO7e9kaIPGaPhOvJDkU7qPkmGXemv-O8kNTlJe99EDGWVXp4HLosoWN5KkiQw2oaNTeSN1ix_3L4v8TsK05iPbQmG-lxnI8U6BvU_HRciunH7pcW2KxZ_sDlIWcIBGkECxx1V7t2R2ypAl51nHLhcpnT2v6e9aZJFL12IUeRMOyS0psREbDxVjHXDgO5FWJiUeVUSqXF0e9tFI5arV47pv75JOG_9uAefJLyPpTzYsZo9dOW5A9lVsdF_9g8hG6pbvBweD-RhdyC5ik119bFxamsb1IX8MXVBfR4FMzi0A5CT69jG0jWMJQ7x6a6ZQB9wicUuJ3YsfcHFsoKuefl4KM3fxGXAxKQMgBWH6BlRZ5XQEN-Jcu4w0Lgi_wwEFrFW6cluPXf4IgC586EjxbrhxTOmmD89iuka_vkpjrGnU_QsXM1NlF2gXT6N_7bM8_OFbbaBPfwAJst0Fvaixio0kWyLN7XJ_k6sWNXD3ti3-WQPvqLKXU9N-WqDDFzC_7GwsxOtz5bPU1ryfz3TeT_qK57EuYxiHoZdwy4Lc-p4zhwk3ShqxIUr3v2Uw-PIg9X4-iKS_fsI_CFBG7WB4LQAZjfXP13gsZErKv3HcMDTGuX83IKG1G-TFty5SkwXe7Oa8pA6PZg-_441Tfo15UZbtXjzF52zlt_uOOc3N9M5ficsQrAnvc3u1teK9hQv-f56FNgrwzmaw4oX4D7X36pWa9y0Nsh8-UtBp9IinHOgW8cI1J0GGh8H7yqta1LApx8ErxwugzaN18zG4AukPt10Davphvi7UFW6c7ZwtVwB0Q9gMMU98nV-tqKJSacovt5Oab3wQMcBZpQd6DSXSsFW7Nj9aLAqBezNZA-kRU21tfqBfCbJ89wqxUHiBDXXjLvATsqxynblnL9vFFXFGY2dHGnFq6rTAhgbuWLS-FqEdghTH2lS1i6o_H3fRiygyTL3R_OtyowKiVSYJ0pOCMiu25rwb3tEAH89ZgWM8zw_SrnWplSAsk7vPPpUtEqqsN5DddN6LA2TrqfWqluLkjyBpI3eg0PwdzO2p7tggDdAb-xnEgR4lbmPwuwH4ED_qLLQJSBX2kEIb9X_VaNjiiS7j7PM1_GxRvDezOClazo0-O1PbbsbZflwj_jMPUXSPiVk7uPOyb4NBJJQvOZYN8ipAhqHnEWSw7Zn2ExhUkXu5mjXaTp8WgOtdSaOk5y8AZ9o1x1QJSBidYKnJO1wfq8D4FPaIExbrqI2-bWrWHWlJalE4JGawGA1TxYiio-pKko30B-YsSDRXS7PDSov2a_KWZxSOpr68Yn6Qv13i7bC2SE1MAW0d9jrbitPGbHbRBGAQTfvDSAaBqjdex1TGYgU_K3yRuezH3EpbnphKUdr0_Dma3nnsLoHWf5SrlLzYB-ABER7Crd9Rn7lqF9HIXIO-Py12mGtLiUDLtNnoICPjScXgun1XljKLSzz1weQkYQXHETLGscSWD_AxpDIXfc9CD2KeBbi_L8q_r2j6XAIoercF9qUb3TnURDc_l1ovwVcGFqzasTH4oT-hdfzcixsXdZ05VddmAtcFCWCSnmDOiDAt5amHDuYRipHMSUxAOUbWYyvD3erhUYch0MqbbgRj8JKjXPV5hHxWw17v6mftoF6IVqlxoG1Ow7OWI__Nm_O9EkzaPJInRHFcGCLIlzVQDlvAdd1XBppli_svCoAaskTySlE4fbW7nw4Wcyfu8URjxpd_eDjbWuOvSAM8NxC0f4l8jTBUdnkN-iF1FOXL-KOLwPzq20gG6JsQ5TXkg-6iAXCdMJxZtpbI7XSjvEF1jfHjxXl3W0v3InyGvDjW3JoRKhBA._0Cy45Lvf4kXi8nH9ugU2w'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJBTllSRUR8RkZQfFlGRixZLEFVUyxTVEwsMjAxOC0wNS0zMVQwNTozNS0wNTowMCwyMDE4LTA1LTMxVDA3OjM1LTA1OjAwLFdOLFdOLDMzNyw3M1d8WUZGLFksU1RMLExHQSwyMDE4LTA1LTMxVDA4OjE1LTA1OjAwLDIwMTgtMDUtMzFUMTE6NDAtMDQ6MDAsV04sV04sNTgzOCw3M1ciLCJxdW90ZWRQcmljZSI6IjQxNjMzIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiQU5ZUkVEIn0='
          },
          newFlightToken:
            'eyJwYXltZW50UmVxdWlyZWQiOnRydWUsInJlZnVuZFJlcXVpcmVkIjpmYWxzZSwiaGFzTm9uUmVmdW5kYWJsZSI6ZmFsc2UsImJvdW5kcyI6W3siZGVwYXJ0dXJlVGltZSI6IjA1OjM1IiwiZGVwYXJ0dXJlRGF0ZSI6IjIwMTgtMDUtMzEiLCJmcm9tQWlycG9ydENvZGUiOiJBVVMiLCJ0b0FpcnBvcnRDb2RlIjoiTEdBIiwiZmxpZ2h0IjoiMzM3In0sbnVsbF0sIml0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiZmFyZVByaWNpbmdUeXBlIjoiUE9JTlRTIiwiYmFzZUZhcmUiOiI0MSw2MzMiLCJmYXJlVGF4ZXNBbmRGZWVzIjpbeyJjb2RlIjoiQVkiLCJhbW91bnQiOiI1LjYwIn1dLCJ0b3RhbFRheGVzQW5kRmVlIjoiNS42MCIsInRvdGFsRmFyZSI6IjUuNjAiLCJ0b3RhbEZhcmVQb2ludHMiOiI0MSw2MzMiLCJwYXhUeXBlVG90YWwiOiI1LjYwIiwicGF4VHlwZVBvaW50c1RvdGFsIjoiNDEsNjMzIiwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCIsImNoYW5nZVR5cGUiOiJSRUlTU1VFX0RPQ1VNRU5UUyIsIml0aW5lcmFyeVByaWNlUmVmZXJlbmNlIjoiMSJ9LCJkaWZmZXJlbmNlSXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJiYXNlRmFyZSI6IjM5MDIwIiwidG90YWxUYXhlc0FuZEZlZXMiOiIwLjAwIiwidG90YWxGYXJlIjoiMC4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifX0='
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/change/calculate-funds',
        method: 'POST',
        body: {
          fundsAppliedToken: null,
          itineraryPricingToken: 'asdf1234'
        }
      }
    }
  }
};
