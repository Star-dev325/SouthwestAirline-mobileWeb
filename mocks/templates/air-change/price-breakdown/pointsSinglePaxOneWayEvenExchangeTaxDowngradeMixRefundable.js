module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: false,
    hasNonRefundable: false,
    recordLocator: 'Q5RM4G',
    emailReceiptTo: 'testemail@wnco.com',
    header: 'ATL - HOU',
    accountNumber: '601141461',
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-06-26',
        flights: [
          { number: '147', wifiOnBoard: true },
          { number: '7', wifiOnBoard: true }
        ],
        departureTime: '06:35',
        departureAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        arrivalTime: '09:35',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: 'P' }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [
          {
            airport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
            arrivalTime: '07:40',
            departureTime: '08:30',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 0m'
      }
    ],
    passengers: [{ displayName: 'QIANQIAN WANG', firstName: 'Qianqian', lastName: 'Wang' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '33.00', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '4.00', currencyCode: 'USD', currencySymbol: '$' }
      },
      nonRefundable: {
        item: 'Credit',
        fare: null,
        tax: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
      },
      refundable: {
        item: 'Credit',
        fare: null,
        tax: { amount: '20.00', currencyCode: 'USD', currencySymbol: '$' }
      },
      newAmountDue: {
        item: 'Amount due',
        fare: { amount: '0', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      totalRefundability: {
        item: 'Credit',
        fare: null,
        tax: { amount: '29.00', currencyCode: 'USD', currencySymbol: '$' }
      },
      travelFunds: null
    },
    totals: {
      pointsTotal: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
      moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
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
          points: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
          money: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null }
        }
      },
      seniorFare: null
    },
    isRepriceNotification: false,
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    _meta: { purchaseWithPoints: true, newCardHasSufficientFunds: false, isInternational: false },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..enS0GRZCjb96m9uOvQ19fw.iNT_5xxddkJtP20zYT97_Wqzh_Agl2JlvkcTQtVxlrMlXqdx9Y7KJfqk6qUBJQbLzQvYmozCmZoOgF6V9Ev6HWwPaDBidNtBWrmcARFkkeiOBPpOhvOJpXPqonUdff0a9clBzQJfNxQSaaODEaoo9Y151pcomREYJVtU4D-gOKmtSV1PRCNZ6PlfOKpBZdDv5o0CKGRqzdLOjpJRJ6OSPzcfsNHyRUb1SMgxa0r5O6jDywMDvEVX0-_qyqGemrkqcM-uv8Bts7oUoVrw3R9t2D6TotZjAC_fKwczxlta6Iy8f64ElEP6uSyO3Zq_Xa637JU9ZDj0SDIdoHCNBd8tsLlXnqX_thrXtMuX0ZoeWk0dDtPmPKtswfUGxr1Gk7np8RvHwuB2063L05C0sIlk627o4InLOJHrgR9DViZvGYlTqpxKgzjPYBJ1AYkYKuZO7yWvNMHpFPo7Jx8otBo4oX9z9CTWrUwJkQRiLvrT0i8tp_mNJysLC3yRkohfPVbkoXRaJVTZegF8RR3IoQr0hA-b57bohuS-RlbV42qCqR7fYJ-x3nPzA3Ld2rvyujXGooRfpRG7X7mAE94a1nAqXJ8uQ_wOhaAo4_iAdJIuKBFpMLZChMGPy-qECC0TXBNSI1UwFUU22rXiFFYbPeJbCYMHKCUENNpNoN5noA4RKlnqudWY5AZOBon78csQGKtl_I2rxVeU8pIfwKf-RE8ITKQbzRes_r-uKxNDy6SQ6HdKhhDnysakzaoOQxT6VwDNEOaZJiAQL-P2WR9o6RrCCtRLu5FKk0mRSPjLcun-23JQxbsr8DsKcREt9Tl1cAsBGN9GGvqODDKBLubvQ3EcbZazgcqmKM909XkpEgBwbPYbu9TKQ4JS19QxI38dS97ayLRQ6sF-MfXV0vVGRYH7LK5NmWnkLQWlcCXH1E5NvxEc5gg0H8L9tpQzkY0if8BGEQQl9fEhdyjj-p8trFjwvus53FXmBlGRGTF-YmTfas8VRS3B6w0M82WG-S979OxU7Al1kvksoqNATFiXmo9Bro8Fl8f8KwT5YMRpmmP-POjB6vMWybmPzKeCxe4LosytTiQZXb68TawYyra5g8ol2aYjhAy700PctrQIRoF0eWr9jY71Wp4sPNWIuYh9Ug6Fzv4PFbqI0oDQtUUkGJw8U2c4Lvm9h0QVp0BxEah9Oh_PzqPHKfF3L_vN0n0uKAQ-Ibn00La8HlbGvnjH--Tbm--fWpRmH2omS0CbTpPUN4wGe8jQJxIYjFO_s5QidwrkE1YHXyHcHcU8GSfn5LDe3YXXvGxbw8QyvgU-vBbXZGvOYr5d_gJmmH0ib7gpAdfQgyI9DZYMjICFLajowwnay5Pmgz_eDy-28zy_PwFg9o9BRXtM4ZoPx9kaFUGheyXsuDIlslDjSmUy9bkhd4OPeYtMj0x7tva6Vf6fZhwW50cTEkJ3ZSah1nPQNNkyfUj4LFZbs3V8haEpQrj88olUXdnb9iYlnjpj43Ytoo8TYLmTb0G9_IK-HAN8iLhD7hTuNB_fIX3HhFH46TkTopCfvNpYJG_OfoGZeOIzMZE2UymOVVBdRPojLwbCS6I7a1DokyatlM8PCaXKMgVRo_2XgGuf98Efa110KCMtUdNma9zy1GBip9Vb1mY0HKe_pQvYZc0vqj17xrT7lP1RyfzkD5Z_17s3oz-X77biXNmHKAPwY1xf0O8IrFAxkxlV2Kq5J-p2KpX2G_yaBjguHqBxmXtfJr9-WMyE1IaWR2rF-jnL9CIJR6q9hFozN6StGd4Tvv1vy9NbMcegsXKiIzTKBNPQ9vMPA4I5AbcThk7Oq1-O4lc09oE87X7o0H2VGBgq3f3DJQBhwZkMzQg3mCJF1EH8buTqtixi35w6o9SA4VhagltGYgLZAxWqlDAdOMs-HbhynXpAdbvtRu95neO8QFvU_G98kG7d22oE0eBXAzJqUo4xK7e4NVYdjpLkiPPmAfWIm_ek1wlek7B8xYRz5RZDd2Whi9xUqG1hM0id3EVsn7aP8_ChrKQeQVTx_2W8W6P80UJAIEn_jlnBJkulFV_h_V9kCCkawVMWAGbYAKDbs-LCXhMReERz0d25hpgrBqzAiT9Y9g8F2amTqCXYwmHYF6pGPK4tRNv57BE7ingNqsSjFnqzJ14wOhtH0jbINbuMWnBe-el-Hz5LobbfgYsTAkjxraadiWmJOM-HUZqf080MWdGwKZlhtiwUQdWlXlHaxad0E3sBg3tL5-ofsrF1igmcj4uJDVqzH-bYUGFsdZx2Tp9gg-O1xNam_9grXQHstrnnJjMMijfsa1Agz8-5U0vQlwTPlusqqwojIKYCAXIr1kT4Sgp8TA0psFbAaAugsbUxfE_5_RdebQggZzoXz_LSnVPfOBgxyDRhqthhZb4_3f6Y2AH6_6xt9A1T1iB306Jj1s0o3-mer_Nf1fhrtVoFJUw9MlkLjpkhB3Z9TBoaGdNEpJ4NpiopFIfCgfqjzIux2lQh1jITJ_8hTemAqg_BYfpm5srzZq-PASpe0VQ_ztALGtyjFwC6UFAXq49fp-ZnC4_6bAKnHFb6ktYML8AHdo-kpSlmpYKgBHw80UObdUO-1VJCVI02s5ioQXva9yFQcVU9b-_KD-bxRwgffh-zMyVe52bXiXTNNw3ZqDKNnmMaCKcVbm-1nws4ytRRsirOpC2KAHgPuX63gA.8L2WoJBxviO6jnOj0vFXAA'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFBGRixQLEFUTCxEQUwsMjAxOC0wNi0yNlQwNjozNS0wNDowMCwyMDE4LTA2LTI2VDA3OjQwLTA1OjAwLFdOLFdOLDE0Nyw3M0h8UEZGLFAsREFMLEhPVSwyMDE4LTA2LTI2VDA4OjMwLTA1OjAwLDIwMTgtMDYtMjZUMDk6MzUtMDU6MDAsV04sV04sNyw3M1ciLCJxdW90ZWRQcmljZSI6IjI4MTQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwiZmFyZVR5cGUiOiJXR0FSRUQifQ=='
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6Ik5PTkUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6IlJFVkVOVUUiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIwNjozNSIsImRlcGFydHVyZURhdGUiOiIyMDE4LTA2LTI2IiwiZnJvbUFpcnBvcnRDb2RlIjoiQVRMIiwidG9BaXJwb3J0Q29kZSI6IkhPVSIsImZsaWdodCI6IjE0NyJ9LG51bGxdLCJpdGluZXJhcnlQcmljZSI6eyJyZWNvcmRUeXBlIjoiRkFSRSIsImZhcmVQcmljaW5nVHlwZSI6IlBPSU5UUyIsImJhc2VGYXJlIjoiMiw4MTQiLCJmYXJlVGF4ZXNBbmRGZWVzIjpbeyJjb2RlIjoiQVkiLCJhbW91bnQiOiI1LjYwIn1dLCJ0b3RhbFRheGVzQW5kRmVlIjoiNS42MCIsInRvdGFsRmFyZSI6IjUuNjAiLCJ0b3RhbEZhcmVQb2ludHMiOiIyLDgxNCIsInBheFR5cGVUb3RhbCI6IjUuNjAiLCJwYXhUeXBlUG9pbnRzVG90YWwiOiIyLDgxNCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiIwIiwidG90YWxUYXhlc0FuZEZlZXMiOiIwLjAwIiwidG90YWxGYXJlIjoiMC4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifX0='
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
