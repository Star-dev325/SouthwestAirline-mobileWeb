module.exports = {
  changePricingPage: {
    acceptanceText1: 'Select cancel to change your flight selections.',
    acceptanceText2: 'By tapping continue, you accept the new price.',
    paymentRequired: false,
    refundRequired: false,
    hasNonRefundable: false,
    recordLocator: 'WBYDCX',
    emailReceiptTo: 'testemail@wnco.com',
    header: 'ALB - AUS (One Way)',
    accountNumber: null,
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-05-18',
        flights: [
          {
            number: '6956',
            wifiOnBoard: true
          },
          {
            number: '276',
            wifiOnBoard: true
          }
        ],
        departureTime: '05:15',
        departureAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        arrivalTime: '10:50',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
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
              name: 'Baltimore/Washington',
              state: 'MD',
              code: 'BWI',
              country: null
            },
            arrivalTime: '06:30',
            departureTime: '08:10',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 35m'
      }
    ],
    passengers: [
      {
        displayName: 'YANG LU',
        firstName: 'Yang',
        lastName: 'Lu'
      }
    ],
    messages: [],
    fareSummary: {
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
          amount: '566.58',
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
        item: 'Amount due',
        fare: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      }
    },
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '566.58',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '505.84',
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
              amount: '5.60',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'US',
            description: 'Excise Taxes',
            fee: {
              amount: '37.94',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'XF',
            description: 'Passenger Facility Charge',
            fee: {
              amount: '9.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'ZP',
            description: 'Segment Fee',
            fee: {
              amount: '8.20',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: {
            amount: '566.58',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '566.58',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        }
      },
      seniorFare: null
    },
    isRepriceNotification: true,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
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
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..9QAJrVnET67PZHBTzNhLBw.BUsa2Eiy2O28pHC-4PK-VRgp0VicM3lerADS-JAdZ9OO1H-oV20UzDGN7Lt5xzBlgt7pcJ86ZAio3VX6CFEAC-k1AeJHXJxBcVnldT3MJS1LGGRKxrLz3IqKhTML9nZKrn71_QQuyMtWk2AnbOIegt8NZHeAp1Rx7hJpSkt8g8z5m3sLUkvbl0uF_eQX6wt0KtPWOr6GCmLdnDliZLSWRWd65bm5plJ49d05VVwR7u4jRRvNSE0oadmOvHGIX7lYipGAJKdvy9NK1Znsr6km588z-p_AxWtUW1qob1JduqHqLuHglTrlnleDqsqtc8O-_8OhlI2i3whBKf4543TPyb3u1gv4jwOKyhRngEb6HfU2l29RQYz2bwsWm0uIurVQjnh9mD54ghosHtSvUoCqEuqszHTOhw7Nd0jS4GpbwlqWEwF6WCo4cyNHaoctGmeXTurcihsMGMnW3kgGFY1RU1FAXsJXJ_INJr1cvsjXZWgwAtkwkVZsynb20kvRcgaR8E0dEBZZiSDCSLTVGgHS9IXpUhA1-NS58kFyu6-BewrnYsRzxsJdc6a97J2lkj27lCer9A3G5Ci0cI1R-UdPXmaZs-RZGF8rkuKn7AwyFfhDUs0FtSB2hwH2eaOJ4wqG7GpVacIf-O-wjhPfaOoDucJtiYX3KeYVkiJE3WOV6ANI0fFDfclLhupRLRX7lYYx6ZdIkkbKjUMG4WlVrRdhQOdwJDre2R4ks6wiLICXu_TMhWO7TCDtzCTZYu4dy0o-pAgztLuHtZZ_KrI6_kr_jh08dk_6DvAXWMJDj60vrFWqMZCZn_eFcwpWTRqbAjl-gRtVR82MY8GLBeboZgnsFqUE6hTRHfdemsThwyN-dHTCF8WxyxHmfm0PhFMLOEO8uSs9M4VoHWpmXGKNuPF22gE-koSXvA1r1_8G0YNrdNPAVigImPHrbXpD-LUU2PvcZPXHbRhRj8bCloVz6FUCu8VfvBMxw7VNSLEm1lhdUBJ8Z4FdB8t__KqEqKO1lXVdzGxVFfJ5HlK-HQcgEoM2R166IPRmZ52UqKSQBa0GesMT_S5zgkyZIbRN62xqe60WutLCTW7ihZrnN32llEPvlxMC23AFcipTwFDuFr_32j9EzVZD05RGViIei521bjoOzA90kZv2T5LOi6XMK3gXMybm6WvUnwYNgPMLisErYR2n-bgiyDzs760vLydbD9gycNT9m4MRHpo5aaxX-Ts5U8rc9uFXztchoGSDpiQbfrQmDH2bfC5eZK9ZYHy7eZW2y5zWhakZ4OCIRhkGgqftm4-JxBduUy9cJ2-zvvJziFQ4S9K4VOVfJ1lMg8LqFVpzM6sVE0okBtZ3XejJFxOP4dQZY2l3madaLk5NZ_KNnOQyZ-ovGVxmm94LlScqOT42tREbf_73lvcn6Wt2ATENVWRPZTc7yGX7a8zbDtSX6pnz-fbbG3_om5HyjtOUhHgd-nxt4Lng5r6NvGmZvyY3DAOh_gkHpjumCOiy4Rj9WSgfeWDDHsUr0_aaj0VXXPmwOrfeCMA95RBnpC923qPXEO7G63a3jFi1SKQhR5uuGkdrZ_dBdw0klmLjItj4g0TSy8atH5kF8utN5XShz0bGdNosaZ6O7peyKRX4tye2sJGJ_DvqIqT1EbDwbfBm4c1xE__lxmvzHP1rlhk7QxnDPyR4-DpLb320lvP0yebbgCed1SbphbVKNWMAAy4h0U9fFial26zZ-AWqIrtIb0cmLxbcCLehzEPpfPDEuaiipef_bEVjhIq7LICyQh11Ai2b7T9HzE-uVcdOTvc1kMOjZAda2pqsKqNl2OWUQuBqd39FcUqMhrAODDBMZd3tLZXwIbv8Uk3hpzLEiF2XNeSJNWIyY2qoagpRC9C-DkWX9c3Dj01x7JkWD8NH4XfxkTBVX9P-AvLjhgkausSntPIAuww5W1QwmrBMmxvtIh4XJBYM_aOKDjT0CMNDY_13CiXsiY664AKiDgBz18foD19Q_xQUCWAPLQ6toHCXIP0On_-HVnoV0-rggk2M8VoaIh-6_uCDfhh7263eypgh3FeSZX6BcPzyAml1vALmvvwqAloDjpD0j4pferqXzcMEHU5nWB4Fzw-cxcLXvH1HE67PZt1x4vr_NqKVU1pNniceMT2BN1r3ze-QB-OJ3XuZ465ugKnnXmyeBOLDG2ukcKtKPheNawJzJx8t4HGTjgOGz4AGkZ70mgyk1FP-goola9wXDou83XQfzpw8MvfTM9eaVKevRwUt1YYratgrLxhhfsJjbafX4NnjBWq1UzxHb9HPkPifHedIgIK6_MPDNrgTmsQhhPoOmqWuH9ATfJFu5k9OagmFX0B8hTI2QJk5HGsFYRFBuGUaQyZP-5IdDq-c2inD1QScm-HNdSf7TcLtm6pwgbPc9RE5JxcQ9YFuXgfS.ny96ufWsUugcagT1rrvnZw'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQUxCLEJXSSwyMDE4LTA1LTE4VDA1OjE1LTA0OjAwLDIwMTgtMDUtMThUMDY6MzAtMDQ6MDAsV04sV04sNjk1Niw3M1d8WUwsWSxCV0ksQVVTLDIwMTgtMDUtMThUMDg6MTAtMDQ6MDAsMjAxOC0wNS0xOFQxMDo1MC0wNTowMCxXTixXTiwyNzYsNzNXIiwicXVvdGVkUHJpY2UiOiI1NjYuNTgiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwiZmFyZVR5cGUiOiJBTlkifQ'
          },
          newFlightToken:
            'eyJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJyZWZ1bmRSZXF1aXJlZCI6ZmFsc2UsImhhc05vblJlZnVuZGFibGUiOmZhbHNlLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIwNToxNSIsImRlcGFydHVyZURhdGUiOiIyMDE4LTA1LTE4IiwiZnJvbUFpcnBvcnRDb2RlIjoiQUxCIiwidG9BaXJwb3J0Q29kZSI6IkFVUyIsImZsaWdodCI6IjY5NTYifSxudWxsXSwiaXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJmYXJlUHJpY2luZ1R5cGUiOiJBRFVMVCIsImJhc2VGYXJlIjoiNTA1Ljg0IiwiZmFyZVRheGVzQW5kRmVlcyI6W3siY29kZSI6IkFZIiwiYW1vdW50IjoiNS42MCJ9LHsiY29kZSI6IlVTIiwiYW1vdW50IjoiMzcuOTQifSx7ImNvZGUiOiJYRiIsImFtb3VudCI6IjkuMDAifSx7ImNvZGUiOiJaUCIsImFtb3VudCI6IjguMjAifV0sInRvdGFsVGF4ZXNBbmRGZWUiOiI2MC43NCIsInRvdGFsRmFyZSI6IjU2Ni41OCIsInBheFR5cGVUb3RhbCI6IjU2Ni41OCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVWQUxJREFURV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiIwLjAwIiwidG90YWxUYXhlc0FuZEZlZXMiOiIwLjAwIiwidG90YWxGYXJlIjoiMC4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifX0='
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
