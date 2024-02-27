module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: true,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: '2IUUIS',
    header: 'DAL - AUS',
    accountNumber: '601116272',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2024-01-15',
        flights: [
          {
            number: '427',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:00',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '07:00',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengers: [
          {
            type: 'Passenger',
            count: 1,
            fareType: 'Wanna Get Away',
            bookingCode: 'E'
          }
        ],
        stops: [],
        upsellBoundDetails: null,
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.dev10.southwest.com/fare-rules/wanna-get-away',
          fareProductId: 'WGA'
        },
        isNextDayArrival: false,
        travelTime: '1h 0m',
        _links: null
      }
    ],
    passengers: [
      {
        displayName: 'Minnie Haynes',
        firstName: 'Minnie',
        lastName: 'Haynes'
      }
    ],
    messages: [
      {
        key: 'CHANGE__REPRICING_MESSAGE',
        header: '',
        body: 'We are unable to secure the price for the flight(s) you selected. The next lowest available fare(s) for the flight(s) you selected are listed below.',
        icon: 'NONE',
        textColor: 'NORMAL'
      }
    ],
    priceMessages: null,
    reviewMessages: null,
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: {
          amount: '252.65',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: {
          amount: '107.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      nonRefundable: null,
      refundable: {
        item: 'Credit',
        fare: {
          amount: '2,257',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '132.05',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      youOwe: null,
      totalRefundability: {
        item: 'Credit',
        fare: {
          amount: '2,257',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '132.05',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      travelFunds: null,
      remainingTravelFunds: null,
      remainingTravelFundsDisclaimerText: null,
      newAmountDue: null,
      totalDueNow: null
    },
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '107.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '101.40',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: {
              amount: '5.60',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: {
            amount: '107.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '107.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: {
                amount: '107.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          ]
        }
      },
      infantFare: null
    },
    fareRulesWithLinks:
      'Please read <a href="https://mobile.dev10.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    acceptanceText1: 'Select cancel to choose a different flight.',
    acceptanceText2: 'By tapping "Make these changes," you accept the new price.',
    upsellDetails: null,
    emailReceiptTo: 'minniehaynes4@test.com',
    isRepriceNotification: true,
    _analytics: {
      'air.fareTypeb1': 'WGA',
      'air.fareProductIdb1': 'WGA',
      'air.fareClassb1': 'E'
    },
    mktg_data: {
      air_bound1_airportcode: 'DAL:AUS',
      air_bound2_airportcode: 'none',
      air_bound1_selectedfaretype: 'WGA',
      air_bound2_selectedfaretype: 'none',
      air_bound1_selectedfareproductid: 'WGA',
      air_bound2_selectedfareproductid: 'none',
      air_triptype: 'OW',
      air_bound1_time: '06:00',
      air_bound2_time: 'none',
      air_bound1_lengthofflight: '60',
      air_bound2_lengthofflight: 'none',
      air_fareclassb1: 'E',
      air_fareclassb2: 'none',
      air_changetype: 'Credit',
      air_changeselectedcurrency: '2257.00',
      air_changeselectedpoints: 'none',
      air_bound1_flightnumbers: '427',
      air_bound2_flightnumbers: 'none',
      air_passengercount: '1',
      product: 'CA',
      air_pricingtype: 'CURRENCY',
      air_confirmationnumber: '2IUUIS',
      air_bound1_date: '2024-01-15'
    },
    _meta: {
      purchaseWithPoints: false,
      newCardHasSufficientFunds: false,
      isInternational: false,
      isUpgrade: false
    },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..E0xtRxXq1QtKoxMgDvj1QQ.La60XmUMtLpbFEie73njouyGQsoCxRf736wtiT3Jm8uDfOpZ0HUSBwH3muJq6yvWsCGBvvPAh6op2J7MDDV2betDI7_E5E9BeXjtsvJxqqMqUFPnXJ_k_3cajkJtWBXp0mawFgAx0RdSojox93jDLAzkXLV0RZrDPsE3G8lz3e8tFD6_TO1DAnH7IGkbyI1LdF_Kqd51AMCkSGtdJFjagRBbsG10Lrkg0W4_-MOCL0a6vj6e-aHh_IFGIbeQYUvdOQpcwayQB_wRSlsSWYfmqWVLuVBcEGGQzvVAt5YGyt6i1cL3g13b2HPtTn5uJr_QDBEysKxzFjn6XL8Gzh43h82rotfCW1tw0dn8Y7YM5_mbT4khSu2G5ixuBrT-qU92mhO-ou7mmkL-JkmeQIoY-zkFNyP9o_5N-dKtEZ9M0NXz1OvqXH1lgVXd8ZfO1lbh8Ooq_Gt9OPTH-d-4J_27sj_y2iCodw7nLeBBQ0cJgpPsQywJU25C_JRqSTcYDX1NA12Mjzl66aRd3tdnYlCkdahlcXbBxIVfU0YnHhht8iK1Zumb4I6-nyMVn5h7aMe3im4tWDVGm-3smDq069hzrnmQf7yXWP-wcyNrXwXuYZKKTihwEoroVKieyro5bQCIF6YKVotI7imN1fR3Vj1vW64M53e_je9vs1zZPSECykGjmdvcmOZYt2L_jWKFs4QXdWODW3FbsN0mU_SzvSc0sly1AASFADgCOLWsRdSuQ8mdiYd18dmG4cdRceVlwte4WAWbUMUjI5Kd3jWjReUdy2qoKSIgAnmUKZm33D7czb_2SqmjAKk8NL3CWXcsj07gVDz25pVOIT2IZeAwuaQXt8RubbQW1HvglXeT2kUozckLlPzmuUQx8aD_Pl2CwZIxZQqTZFFNIxVlFLW3WKNrFzrwA3GCR9smTWMY5i0U7mZfderC80HxiAivVU6DsBCTS2HRfMSQAFmXow69xUl8jXwnOPMWobY6uBLU4wMT9VnrtFHNf2IJlOrODs8wug3JDZzQwvh9GI9UgXfXp-LxWLRiFwrEkS4L1vmJqMyYxxZtlHA2IZmgI7trAzw9y-vQwdYSJlv-mzaNphbBmdsLJtc9_TUZdoHxipAHdNFn8VzYOX7RorYqZ-BrJbH862ewAslm75qEde9wuGqR6PWaz9teGMl_hyodag43tfHqZ5tqLatbRqTmGzh3tYqa0pW06Tjh9W_eSP1nPCoQVBJlcf0bX2J2G54vqHVYSBdPDjhqBvy6MvhBDSluc6J6yr6QV08bkVS8g6OygFz0RcqBC5P93vMTEp4-CeouK3NW38QSUxlEdME8Dql86Zg1Qg08xwB3IH32Ic90oscCdfhbn7-iyEe5nNqj35MUN9vAFm1LAfmvy_7Mvw56Numgaud-OABbYUMi2eMC6AyFW_iT_cOEfcoRlbjb85MeyvyMUKu8Jaemq09vUUa08TJpvk9LFRbCPNOht534Fc34m5ETErwb9qYP8ib0zGynXPV4VdMFu1Knjb9I66NiuUuZlk5UylshSnI808dE8to4aPpYaIVH_avtA4G6ooq1Zb8BaT0-bfHEEzrbP4S2ZNdIs25bvSsR0LVCLP5xKROtDgmwyzr4EOVeh1UrXlCIQXImHkAYUMupkVHEigK6NPc-BYhxxQeAB9e--ZQNBcgg36zkDsNixz5P8y2TfTM_MbQ0tSPBUYNQkYklEaYM1ImVs4VgkWG-N374LFC92zj3lSy2W3TSe1ciwaJ2yqZpL554ePaJPNin3IzPjR_X8JXhU9JEQLL-UwNojE7K6Wxzp0kZQBRIkAQdW9TGWVb3QWCRxpN5zdEh1cB-Tx40eukqPm5lubKaZpqGlQsb1nqBGhdHyokVvfcAQdfQo-4z5cD3WAEm7UqJor7JQuf4HK3SyX3lUFIxMixTx0JrCmM3emGKr96HBIhehszsRF3gec3N8C1O2Cdw-7duol4K1oznGrRtxDj5AIpHFz2NJlAWXgkyxtGOiUSosKo6KhbWVPiUf5YuQTmb0cam8vvNDRFQj0oXW3BP2ooqakc6z7kGM0OuPy9-JsI5GWC-_gdpKbMfneDKwsqEM17tFv_MgfOmmKVvaaK0kiv75W_NzWk0-fsfctPcUVfhVO563HQP_onxVlelGuUhL-JRkDXE1iDqP9tL4-s2go4UNmkCnUJq5NKVoTszNYEJKYxPO4QUm8ZvFekbx792zqflKnoXVfprdByNn-P9uIw0xUVnoR0hDxd3f-TxpLOOYSm_VjSucjkZ6vfmKgQFTr0TDFxgOp1sJ8Wgpfr8lmpmIOdIhiu68-ThEB1NF_1xgLOf_ndN6XshgzcsnQRvErb9vvwTACq-sJNxqf21JRrdxIzimex7OyGoPqk6eZcp0nBcECmwNt0q0RpnnwQatqSZiPgQjva3iU2L4qs3yumXyftA7lpIr_EiBH5TEej6XLOCTOdyr76bOmkTcR31--kUoY5yyy55GHD-Vz_dND6UzAqZxHpwsKKKqf4NX57rYB-mKS-HbOgArzxHYZYiv-CfADEM1pSr-_rxbX_bdqZQXU7mw3_5p_Qngx_NwrO0rgBUwqGyH0HWTngxiWmdNsrFSi1YOC3jEHfKOb0w3Pfl9ejD5UDQrZuwFEJ2d8LHmI56AaE2YaSY5r71di0un_QpCXWzqRLomdzdiWrEq7F05F08HDQbauXFdGlLBgWooFNNEjk7yCHZKet2Y1Y3EDA75bavuzczWOPopQsw2l_mGyRbnYjeaJD6ZnMMjoWRVUhQEZBUV3QHhCbYDf4HpSPivRemNiCDJBMDOUAqKAMDZNWLpCqUQTB3sFWp-p55cd2eQSpmzbeDvAdE_aUcXpmB9r5UUkcBxkS4z82SsX6CqCN60KVeNa2PzpC4PFU0j9dUaj27M6XcvC2AsgAcDWJ1JLDwrIsfAEW69PHVZQZQQwJO5vVlusNG7JeuhjjUMMhIG_jBrZ3hFGvFOrbx6ZdoKtxB68H9LcJIZFQXZII7890l6f19z__rkTGcFFwGMSSu1lNHjZAb7iNFqPBc8PRC3ItIunrIZ4_9ZPgK6sk44spPSdL5pCAKGeVE_o76VleDdUrw30Goxh2RQLhqUT0OBVNjvzXZe3zlFvkvTM2QA784pWsoyYAiO1DkMpTOPWENTHWNiMS5cTHg-V73mZTJ3pjjHefDAw45H6-2JEGHO9sqatvnfasEn50F7SW4Rpo9bABHl-h94zd-Q3Ke-xpxxK2Vq1wmXL3OX7nQgeMAAfw7AVRGVC3gQQwyHXNVc2ftj6oQ4T8uD7mrb04PA3fZH0JXZyP7XnTFN6HuD0XCPvt6UWTKw01FM-OJG3bF1vOnA_HwQmFpD7LJJRGa0IUUl6iunFsEyRkOlnFffVlYhCcogOLaOGvPHV_FJXmgE2K61Pf3Co1fpkOXASADvz3IfTx5HbKcjpLSxjwRT8_7Vn52xUwtpiSMGA.TyyjLdnFkoElbB_42WJOCA'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJXR0F8RUxOVlYySCxFLERBTCxBVVMsMjAyNC0wMS0xNVQwNjowMC0wNjowMCwyMDI0LTAxLTE1VDA3OjAwLTA2OjAwLFdOLFdOLDQyNyw3TTgiLCJxdW90ZWRQcmljZSI6IjEwNy4wMCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9'
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6Ik5PTkUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6IkJPVEgiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJjaGFuZ2VDb3N0VHlwZSI6IkRPV05HUkFERSIsImJvdW5kcyI6W3siZGVwYXJ0dXJlVGltZSI6IjA2OjAwIiwiZGVwYXJ0dXJlRGF0ZSI6IjIwMjQtMDEtMTUiLCJmcm9tQWlycG9ydENvZGUiOiJEQUwiLCJ0b0FpcnBvcnRDb2RlIjoiQVVTIiwiZmxpZ2h0IjoiNDI3In0sbnVsbF0sIml0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiIxMDEuNDAiLCJmYXJlVGF4ZXNBbmRGZWVzIjpbeyJjb2RlIjoiQVkiLCJhbW91bnQiOiI1LjYwIn1dLCJ0b3RhbFRheGVzQW5kRmVlIjoiNS42MCIsInRvdGFsRmFyZSI6IjEwNy4wMCIsInBheFR5cGVUb3RhbCI6IjEwNy4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiItMTE4Ljg2IiwidG90YWxUYXhlc0FuZEZlZXMiOiItMjYuNzkiLCJ0b3RhbEZhcmUiOiItMTQ1LjY1IiwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCIsIml0aW5lcmFyeVByaWNlUmVmZXJlbmNlIjoiMSJ9LCJwYXltZW50U29sdXRpb25zIjpbXSwiZmFyZVN1bW1hcnkiOnsib3JpZ2luYWxUcmlwQ29zdCI6eyJpdGVtIjoiT3JpZ2luYWwgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiMjUyLjY1IiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19LCJuZXdUcmlwQ29zdCI6eyJpdGVtIjoiTmV3IHRyaXAgdG90YWwiLCJmYXJlIjp7ImFtb3VudCI6IjEwNy4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fSwicmVmdW5kYWJsZSI6eyJpdGVtIjoiQ3JlZGl0IiwiZmFyZSI6eyJhbW91bnQiOiIyLDI1NyIsImN1cnJlbmN5Q29kZSI6IlBUUyIsImN1cnJlbmN5U3ltYm9sIjpudWxsfSwidGF4Ijp7ImFtb3VudCI6IjEzMi4wNSIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fSwidG90YWxSZWZ1bmRhYmlsaXR5Ijp7Iml0ZW0iOiJDcmVkaXQiLCJmYXJlIjp7ImFtb3VudCI6IjIsMjU3IiwiY3VycmVuY3lDb2RlIjoiUFRTIiwiY3VycmVuY3lTeW1ib2wiOm51bGx9LCJ0YXgiOnsiYW1vdW50IjoiMTMyLjA1IiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19fX0='
        }
      },
      calculateFunds: null
    }
  }
};
