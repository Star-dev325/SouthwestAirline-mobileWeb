module.exports = {
  changePricingPage: {
    paymentRequired: true,
    refundRequired: false,
    hasNonRefundable: false,
    emailReceiptTo: 'testemail@wnco.com',
    recordLocator: 'WKDLWT',
    header: 'ALB - ABQ (Round Trip)',
    accountNumber: null,
    upsellDetails: {
      offerTitle: "With Business Select® you'll get...",
      offerFeatures: [
        { icon: 'check', label: 'A1-A15 Priority Boarding' },
        { icon: 'check', label: 'A1-A15 Priority Boarding' },
        { icon: 'check', label: 'Fly By® priority and security lanes', suffix: '1' },
        { icon: 'check', label: 'A complimentary premium drink' },
        { icon: 'check', label: 'Refundable flights', suffix: '1' },
        { icon: 'check', label: 'Same-day changes', suffix: '1' }
      ]
    },
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-05-11',
        flights: [
          {
            number: '139',
            wifiOnBoard: true
          },
          {
            number: '1783',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:20',
        departureAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        arrivalTime: '10:45',
        arrivalAirport: {
          name: 'Albuquerque',
          state: 'NM',
          code: 'ABQ',
          country: null
        },
        passengers: [
          {
            type: 'Adult',
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
              name: 'Chicago (Midway)',
              state: 'IL',
              code: 'MDW',
              country: null
            },
            arrivalTime: '07:35',
            departureTime: '08:35',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 25m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2018-05-14',
        flights: [
          {
            number: '1233',
            wifiOnBoard: true
          },
          {
            number: '466',
            wifiOnBoard: true
          }
        ],
        departureTime: '09:10',
        departureAirport: {
          name: 'Albuquerque',
          state: 'NM',
          code: 'ABQ',
          country: null
        },
        arrivalTime: '16:55',
        arrivalAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        passengers: [
          {
            type: 'Adult',
            count: 1,
            fareType: 'Anytime',
            bookingCode: 'Y'
          }
        ],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: {
              name: 'Chicago (Midway)',
              state: 'IL',
              code: 'MDW',
              country: null
            },
            arrivalTime: '12:50',
            departureTime: '14:05',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '5h 45m'
      }
    ],
    passengers: [
      {
        displayName: 'CANNON LIU',
        firstName: 'Cannon',
        lastName: 'Liu'
      }
    ],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '467.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '986.38',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      nonRefundable: null,
      refundable: null,
      totalRefundability: null,
      travelFunds: {
        item: 'Travel Funds applied',
        fare: {
          amount: '3.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      remainingTravelFunds: {
        item: 'Remaining Travel Funds',
        fare: {
          amount: '4.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newAmountDue: {
        item: 'Amount due',
        fare: {
          amount: '518.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalDueNow: {
        item: 'Total Due Now',
        fare: {
          amount: '515.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      remainingTravelFundsDisclaimerText:
        'Your Travel Fund balance of $4.00 will be held for future use by the original passenger listed on this reservation. All travel involving Travel Funds from this ticket must be completed by the expiration date. If utilizing Travel Funds with different expiration dates, the new reservation must be completed by the earliest expiration date applicable to any Travel Funds applied. To view your Travel Funds, visit Southwest.com'
    },
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '986.38',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '875.14',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: {
              amount: '11.20',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'US',
            description: 'Excise Taxes',
            fee: {
              amount: '65.64',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'XF',
            description: 'Passenger Facility Charge',
            fee: {
              amount: '18.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'ZP',
            description: 'Segment Fee',
            fee: {
              amount: '16.40',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: {
            amount: '986.38',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '986.38',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        }
      },
      seniorFare: null
    },
    isRepriceNotification: false,
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    _meta: {
      purchaseWithPoints: false,
      newCardHasSufficientFunds: false
    },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/x-change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..y64rMBTBYoGBeKnkcMsKSQ.vgzT9DpUgBC5u-F073o9lVRyZxHUrT22G65kOFt7zXGMWRYj9CDAQjDl9Xjdh6WEyl9-hhdaINJlOgqVnWsEh_LAx2BUAP9g8ubhQxQbn0_xQvCshg3c_iY3w8ZaqznZ7MjIh-MPh340dBD51r9Jn9zyeHznKyNHlIsIUPvPd3zOc3QKwt7tKmxqb2ewuaRsP32qIqKGv7OIB-NUkd_XQH-Hk8G93MGwvKlhKv4EdLHeyvrKYL_JTPHqFMvuhviq1D0t_zcurzETEgvAaK_p7INjxLqGl63tpTPiT0AcLy3m66wP_f-beqeZcl5Ds_UBJXK7S8BWZgPVioNDtgmSD0c90vcmlf0lQa8TfhS07tHn21td0yLJJXsug9uJWEa9toAqiCLAhe6I-ZzJPSNs1OFqpYfIX4SQpF9Ry4xnvNC5w1TniKlyNSenKacfVer9q-xyQioMAyZu5HblhxfPGjE7ZoA_B57GXRaYqeaIEMkTNVV2Y68YsvQ_zclDuAJ1QCKyyUEiWJrRPqar9eGKdyNHqS_lv7tnYvo2JyE2Is5UQaj2nCLOiV98Ba5o5tDAT7nM4AsrsGl73BJjZ0uSRoT7INHry-Xi4KSY-oClEtIkK4lwyW0v8d2AJpCTtMRNs63D9gF4wxULs3AVOILP-Bftj75vfYcYervQaRd8e8Z4xrzTBjt5UtI8HOG6HmMN8nj0T27nzk4a_twyWP8ByK_J5QL4E0kUpa3fC0kAQRW4Wdi_a9Ls4481VytEAVOUIXDxfr62oHa2sR093hl0jdAZfpXKUv7Yf3KMF7xl6RoKGEQ7GCIVYG1QaPJuR7xmgUYLHORWs0ip2y9P5jam8M5E3hTZVsN8T8uFQtMg1M1KIUu85lnMgeXcZzdw9Mwct9FDQpkPeKNSQr55gAGTv6OXiPcxiG6_o4UiZVEc_6NnjHwBzsdBCzL6byfuKBSZ81f4ofPkMIyIMsijcr9mG5g66pR_Gu84zTcu2HvVRXApf235srEnoWtNosnrrOe9UMeVjyc5bOAQ5ktAt_vbumDzDds44uNyjEFQTQTRh7yqBur3DKNTz5soIuPcDVGEGXnebkZ_dWMVzgFLzyoudtKxro2sNCGgM61zEu4jm248fm6yrD4PcClxbzGrJsmUBKdyKfZU13JCHF6jZ25REL9n9Y1iwrrJuJU2SukjTIQYEVgWMa3Ss53RnKiN95cjRqXCjOimqN6n9d5cFfA9QyRuHdYkI6gMnMQk_9KN3ZO2OepK6Cha5IPu8Uz0jZpylyVvV21PblgpFtb4delQ__gNkD19e4r1looo8ZNQJZsbaZVxQM0EYTBsnJNTNPir_EjSnzUlyOPm1QgLAdPqfBQ_LVprpfPqBfFkIsf7qevJe7C4Sytyy-_ac-x1UzuzlxXCyCe1XlAkBL3V1duD2MqVxfoaGyMo4nR6734BE_M13vAhtdFfvEq4O1kbaGt4nEuDDEkIy9b8oa7SjFjaHOY-7zKHumGX24yNhFkEmmb8n_7aJy7U2nnK9M3UAGzNs-1k_vugAyARH9knWmcv9JHOeyyIHdrp5sUMNtZPG2RAKXVRkyJCreFZYfFZ0rIg1pMIFvxgU6xVEwsCuryZxvsy9tEs6MwLD5ZH47rxpRoZ8z1noXqnn9pGaNjXsIAjfyRWSZyTIlIss-NXQKXVD43GZ8DsBahgAVAVIB5ekYvPfYOaIes40ZoApjhv0z_V57dy0Zz8OD3m3XgI3u5s7_Wm07LWrq0fSh_l3uB2y0D0ah-HV7XLFAFPfiSfeCFw9CrMzqKqNUqR1nJEwOpVl-MR2bdHSQWY-HQGvQSe3ULyskqGe94Yh5GYieCLD-iXVZg0jTz6Jez7ImnSe1ma7pXrZ6BzT5aRxxGum8N4wmH6qmCsUz2BPzAKh0rMjtCjbsam2dzqxijQSVPEYHoz74HE-6cV204_5-mxfOcveefb_mZRG_aXuoMwnoupCD-ijrgHIW_ie2LCHwHMKFCOur9sxrfs9GfbOz9GK5NUMiG0qsILIf9MnphIbF4aouFFXFiW8nl0bJtp0IqoEsoO2zKK-rdlyj12-6wv0On5jgzu29OzkysQLwqLGz_Gx_3TEw0FQ1_bLmHkeAJ2F0uAdqZBtY8rjCSFdoQiKf-6H9Z9subaqdThX6SOiECe5NUmdOuY0nq7yPoot7QGIx-CGdsLWr8eShAsLT0qB7vERH0NRxZodh-jmUZsy_oOx800B0EPnKFI5mlBTqVGMbJx8PCutD6rKlaeXqe0Km2an-eTLc5_TVs2XBkVk5BGfS8gH0voKO3n4X1Fb7Ccu7IE86_vEjhZiDGMnHPoJiYftZzq-XtZiCqYu_bb5y1TjrKe3n8zsM1b0sgRhuBh2GNw93-w3pGuEK6448-4ezTnKerDx_1d2ksDGmm7vLP4sg8b35GQL9rLB6q8Aj-ghEEhWWIialksypeLLDopF6ZqPWrTLwLk33h2NlbAR-Wr9A5NcmYq4Sj9Cqzz0-3iomyPELKmeWE8ZjzcHFKKd25E6jyXRZu5UU4eBixmG0R-eFszb3mvaWqOgIXBL8guids_QQ2J9JJ0H_PvQYNpMz4fKQEGyIPb_vhOb7xqPc6jt0ejjIpOBSEm17SfFOatpzoobIInravKNN5dLWSEvzJp5lrvjJXCC6TC4CVRgDqkCEAjnKn7XmICR5om5h5zp8y1mEjlwlsNY6EOUnBRwBaJYXZs9B2hez6TP2BUD8AKxXBtVw9WOZLpwb0y_8wKQ0mRq8kHrc0tYD-ykupY_AcXmOqWBVUajKLgY4RF3aXDb5hxfbmF5LAHtSP23JE5Eywm-A.MRZ-BE-9QGOZm-5_2RgqbQ'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQUJRLE1EVywyMDE4LTA1LTE0VDA5OjEwLTA2OjAwLDIwMTgtMDUtMTRUMTI6NTAtMDU6MDAsV04sV04sMTIzMyw3M0h8WUwsWSxNRFcsQUxCLDIwMTgtMDUtMTRUMTQ6MDUtMDU6MDAsMjAxOC0wNS0xNFQxNjo1NS0wNDowMCxXTixXTiw0NjYsNzNXIiwicXVvdGVkUHJpY2UiOiI1NzMuNTgiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwiZmFyZVR5cGUiOiJBTlkifQ=='
          },
          newFlightToken:
            'eyJwYXltZW50UmVxdWlyZWQiOnRydWUsInJlZnVuZFJlcXVpcmVkIjpmYWxzZSwiaGFzTm9uUmVmdW5kYWJsZSI6ZmFsc2UsImJvdW5kcyI6W3siZGVwYXJ0dXJlVGltZSI6IjA2OjIwIiwiZGVwYXJ0dXJlRGF0ZSI6IjIwMTgtMDUtMTEiLCJmcm9tQWlycG9ydENvZGUiOiJBTEIiLCJ0b0FpcnBvcnRDb2RlIjoiQUJRIiwiZmxpZ2h0IjoiMTM5In0seyJkZXBhcnR1cmVUaW1lIjoiMDk6MTAiLCJkZXBhcnR1cmVEYXRlIjoiMjAxOC0wNS0xNCIsImZyb21BaXJwb3J0Q29kZSI6IkFCUSIsInRvQWlycG9ydENvZGUiOiJBTEIiLCJmbGlnaHQiOiIxMjMzIn1dLCJpdGluZXJhcnlQcmljZSI6eyJyZWNvcmRUeXBlIjoiRkFSRSIsImZhcmVQcmljaW5nVHlwZSI6IkFEVUxUIiwiYmFzZUZhcmUiOiI4NzUuMTQiLCJmYXJlVGF4ZXNBbmRGZWVzIjpbeyJjb2RlIjoiQVkiLCJhbW91bnQiOiIxMS4yMCJ9LHsiY29kZSI6IlVTIiwiYW1vdW50IjoiNjUuNjQifSx7ImNvZGUiOiJYRiIsImFtb3VudCI6IjE4LjAwIn0seyJjb2RlIjoiWlAiLCJhbW91bnQiOiIxNi40MCJ9XSwidG90YWxUYXhlc0FuZEZlZSI6IjExMS4yNCIsInRvdGFsRmFyZSI6Ijk4Ni4zOCIsInBheFR5cGVUb3RhbCI6Ijk4Ni4zOCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiI0NzQuMjEiLCJ0b3RhbFRheGVzQW5kRmVlcyI6IjQ0LjU3IiwidG90YWxGYXJlIjoiNTE4Ljc4IiwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCIsIml0aW5lcmFyeVByaWNlUmVmZXJlbmNlIjoiMSJ9LCJmb3JtT2ZQYXltZW50cyI6W3siZnVuZFR5cGUiOiJUUkFWRUxfRlVORFMiLCJtb25ldGFyeURldGFpbHMiOlt7ImZ1bmRUeXBlUXVhbGlmaWVyIjoiQ1VSUkVOVCIsImFtb3VudCI6eyJ2YWx1ZSI6IjM1OC4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9fV0sImZ1bmROdW1iZXIiOiIxMDAwMDAwMDAwNTEwMDE0IiwicmVjb3JkTG9jYXRvciI6IldLRExXVCIsImF1dGhvcml6ZWRUcmF2ZWxlciI6eyJmaXJzdE5hbWUiOiJDQU5OT04iLCJsYXN0TmFtZSI6IkxJVSJ9LCJleHBpcmF0aW9uRGF0ZSI6IjIwMTktMDUtMTAifV19'
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
