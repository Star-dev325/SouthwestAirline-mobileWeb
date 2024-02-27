module.exports = {
  changePricingPage: {
    paymentRequired: true,
    refundRequired: false,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: 'NS43T6',
    header: 'AMA - AUS',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-07-01',
        flights: [
          {
            number: '5477',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:05',
        departureAirport: {
          name: 'Amarillo',
          state: 'TX',
          code: 'AMA',
          country: null
        },
        arrivalTime: '08:55',
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
            fareType: 'Business Select',
            bookingCode: 'K'
          }
        ],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [
          {
            arrivalTime: null,
            departureTime: null,
            changePlanes: false,
            airport: {
              name: 'Dallas (Love Field)',
              state: 'TX',
              code: 'DAL',
              country: null
            }
          }
        ],
        isNextDayArrival: false,
        travelTime: '2h 50m',
        upsellAmount: null,
        _links: null
      }
    ],
    passengers: [
      {
        displayName: 'Tiertwo Withcompanion',
        firstName: 'Tiertwo',
        lastName: 'Withcompanion'
      }
    ],
    messages: null,
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: {
          amount: '128.48',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: {
          amount: '346.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      youOwe: {
        item: 'Amount Due',
        fare: {
          amount: '90.02',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: null,
      travelFunds: {
        item: 'Travel funds applied',
        fare: {
          amount: '128.48',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      remainingTravelFunds: {
        item: 'Travel funds remaining',
        fare: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      remainingTravelFundsDisclaimerText: null,
      newAmountDue: {
        item: 'Amount Due',
        fare: {
          amount: '218.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalDueNow: {
        item: 'Total Due Now',
        fare: {
          amount: '90.02',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      }
    },
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '346.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '336.88',
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
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: {
              amount: '4.50',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: {
            amount: '346.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '346.98',
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
                amount: '346.98',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          ]
        }
      },
      seniorFare: null
    },
    emailReceiptTo: 'x227296@wnco.com',
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    isRepriceNotification: false,
    _meta: {
      purchaseWithPoints: false,
      newCardHasSufficientFunds: false,
      isInternational: false
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
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..zEJ9erOcfZxQQoqBeXAF4w.n9diYEIFVldnw9qIu2ok_oGnYIjnaALZoARBWkhtxc0EpZBvqKB9DtIHzE22oD2Md_I-MrSQl4C_g6N0uTfJZPHywNp7Wae-4xO9JY4XpRU-Wixt88B7b8-gwcZBqhwOkvZXkbjYDDlnbL0Mk5mPb7MwP5AM43MwocYmlrTAt9k2552Iz7uQwklOiwnrptIvgQnRrBBLPL0ndJa5SKzxqiYcqBIIfLIAfdELvTcgN9qU23v0jjXHS83nJpCAAheXdeIQcx05aX6ozqo2T1B_cg39etFPqf_lKRC89n8TWbalmkt7NfvdgcLNTAdw6Av2Zmu9V_Qsk05x8qoQK9d_wzc852i2u6I0OK-J5ixI8PNFmSY2X20qu98ifXJsyCiUqSFORSXamw_8CZZ_A-51dttDlQPEcjIle7giyac_JIoMYckO7dUkUU97vQkmLBCd9FcUUEJeIVcrGcQJ8AkLh0HP_xkrmrARhQfM-Ni4p66BkDGFcl5CXs7HXtVFR7FDKGhmwqZkvdRI2W6HJcV6o48E6yyjTIeKbPfQ7_jWU2XR1XKGzsvmMH0BAlPONROGzjauG2PNWwls_Du37qQ13FBgI3bDqMvl8Ox0Llr5ZfCpQVCSh1p_OHDtnXoDIIEHfkk9p1Dp4JkuDpe55Q03wEgp9h2lxYFL8ALTfXED7fOXoNDDw-o-FSKgN_aCSf7GSnpNMei0WC7dhoDqyBjiIUcye9q4tEQFMyJD9OraFPVl16e0so18-b542vuo74yl4tzxnZ3xaKTpcxu1o-mbGZZWPl6WPdIVZXoUCdh48KnQKq38hSk8K3xrSYUJFssgCF-cAp78YnBYZqAyVGrgnA28uLe1EB5AlI7JNqw15ooO_FU_0a4ZR9Jzgs4pQt9vgMccwby9P7diZ3xRudSHtZsPPqip5qPqfSzu4ng4l4wsPRBDlbftMkdeYS8_lpWnsVVEKksiqlYdU23rB1Sy1aqL0ZqM8qpL5XmGEIJcSl8sxKCCjwrySdownKhmmhaqqBHDBnrDwEVR8H1yeqBeJjZoaJgQP-sG33vswx5DrAdzDEDvO7Npq9BYOJD8W3P5nqL27rx_xUgMVedOkJqUEOpVSdmCnIq5n_uhbB4vU6pTZZNkj0pHXlvvKHQ6_49EzWRXpqfbbxDaSciPT-k8JnBkiQ9bgCAKrkRth20C1o3vGNgQl2dZ3WZl36pFYSxtI0_rP4LWF-etblA8bbHAr0nr4c94tzi7eurbWOssLas2klSxl59vFcNwKndeU-d1DeaJU7C-W6lfEufXfBgAG36wwqeFymLRwXF35rkvhmb24FMfc7gecoOVBYs3avREsbqvgBcibzICfdS3iKGSQe6LhuY12_reNQCWD-Slfj17MI5ZfbIb9Iw036ZKQSmIZUn-XE8hJlYJ5oqUig3itxmUFdUFMQ5Ndyu2-u5XkkYF69SoW8A6hRo7MMFCIR6hRQXgRc6cg-DbjgXDKJPxr4uPJvOowU9zsb-wFWP8kxj_Karoz86NAmWi1v-_GkXXPClI1yNxixsqHg8hupexg29Qr1ooeBQS6sRhxFBFZKIZyZp-_hOQBf0ohAsabV52tHicbMM7ACGL2zgwWdcW8ptZUMISytab0RaseX6Nqmu6GxHNbN5RYwhjLBf2FFnKKZsPTebULJeDSMbOMmznv8B3oZ_EroLi2A4T2FrCCk20uyHbj1_22gS7QUFM1VH58CWjWs6GpiVSh3tSgplQFAW5Q2rd4kIVsy6LN33Xo3rVdBkw-mfOZ6p4E2RYgJKsso0-hj6cUcuQOjDkk-gOwKACdzxedrQWNzsWSWpEr_sETIhA4P5SZ10k7iCnvDoUHEEmXAsr3nyxn-HGLyw2A-5HyWvUtC7b6Oqe-Y9SqviJOFaXzgVJ4mxG141Ek_51ELp31H_E-zMSgezeYeSAz3tGKaLZN9tuyRf0mtw4h9QFRy7N-TQLqFVo8AjrYXMBkqS9sXGWq4MOSgNP56CZrmT6xWOsOeHoiQHz_Hc9-9Vut4KH3R7QsIb95KisVYodTRB8sTUKuIRCXAlNLOt8KcKEjR_ET49UXTL6yp1e1tfK9FXLkzm_YIOBiingtTGY0K-Tz0OSEaIzjKymLYc3x1ANQgM7_TKCYzsYgdGnfCrFjt-L89mnwPfoQXpKAoqmabwUJmL1u0zV_5HZaQLLWihFXJ5Yjh1jhq5Gg0pyIt7P8gBhVycbiIR8A9E-XJ-EqOumPRJU2ox8KoNfXNX33M8QjJbVRkyr4xr9XvBbovMbv_cTA8PXZnH6yDid7I8gIcx7W9cuCta0aejAsiqyE0dkCM7Dtd9-wFbxh4z2hBWibiDDyUmFwRkFSdbDulGXfF5QeutRxW9lJJ5nFMjyMO035KyBzeRMQCVF7JSgyT8zus-w9wC1nf1h-aSW8f5cWahZy4N4Hft69TpscOmbpgxlm-vq6C4A7rcaVZQbahlthpRcj0tTbsPa52fkk_o6d2VLNoEa8lojFHfPQuJ09rp1poXZppo7l7k08DaSJSSCJulMsZmdzNAMsa1TgKjjKU07fTmQhIwZfDOSpcQjdySPzHJMTaCjC6dNRGdS-hQLMSboW-pUjDIXfOVFpvYYsR02l0dXfvhaa7Yd1U3jByXDB1zuVt_ek1IFORZT3MJJHYz-In3K69EZqNZV2Y0JmtkkGlu6HOkHzZ9iNWZOIINmZXVQCrPmGnG6asMusH7fKbmB25YLkEOjbqMpgs6Ofk8Upe4kqn9LCABsxpPtL6qaZJChjVzJ8rlhAWE41Kzxo0M5hCSOS4K64zdRlgWR7qymFUuZp5OJ6kNcZ7toJr0-1fvBHvIgpMQhtQkk9ClSpFCS4hApqydcXvxbG8F06TdQxRChTrP_5OPw_KsHQvRh1kfYvyxgCl87krUxcB3t_AvG0X4nOCks12P_SFnP.6eWiAUbe-OgXfBZxWyvnPA'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBTUEsQVVTLDIwMjAtMDctMDFUMDY6MDUtMDU6MDAsMjAyMC0wNy0wMVQwODo1NS0wNTowMCxXTixXTiw1NDc3LDczVyIsInF1b3RlZFByaWNlIjoiMzQ2Ljk4IiwiZmFyZVR5cGUiOiJCVVMiLCJmYXJlUHJpY2luZ1R5cGUiOiJBRFVMVCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ=='
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6IlJFVkVOVUUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJjaGFuZ2VDb3N0VHlwZSI6IlVQR1JBREUiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIwNjowNSIsImRlcGFydHVyZURhdGUiOiIyMDIwLTA3LTAxIiwiZnJvbUFpcnBvcnRDb2RlIjoiQU1BIiwidG9BaXJwb3J0Q29kZSI6IkFVUyIsImZsaWdodCI6IjU0NzcifSxudWxsXSwiaXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJiYXNlRmFyZSI6IjMzNi44OCIsImZhcmVUYXhlc0FuZEZlZXMiOlt7ImNvZGUiOiJBWSIsImFtb3VudCI6IjUuNjAifSx7ImNvZGUiOiJYRiIsImFtb3VudCI6IjQuNTAifV0sInRvdGFsVGF4ZXNBbmRGZWUiOiIxMC4xMCIsInRvdGFsRmFyZSI6IjM0Ni45OCIsInBheFR5cGVUb3RhbCI6IjM0Ni45OCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiIyMTguNTAiLCJ0b3RhbFRheGVzQW5kRmVlcyI6IjAuMDAiLCJ0b3RhbEZhcmUiOiIyMTguNTAiLCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIiwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxIn0sInBheW1lbnRTb2x1dGlvbnMiOltdLCJmYXJlU3VtbWFyeSI6eyJvcmlnaW5hbFRyaXBDb3N0Ijp7Iml0ZW0iOiJPcmlnaW5hbCB0cmlwIHRvdGFsIiwiZmFyZSI6eyJhbW91bnQiOiIxMjguNDgiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sIm5ld1RyaXBDb3N0Ijp7Iml0ZW0iOiJOZXcgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiMzQ2Ljk4IiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19LCJ5b3VPd2UiOnsiaXRlbSI6IkFtb3VudCBEdWUiLCJmYXJlIjp7ImFtb3VudCI6IjkwLjAyIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19fX0='
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/change/calculate-funds',
        method: 'POST',
        body: {
          itineraryPricingToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..DZwpb5MybQqWlmmotD1HnA.pMK06Ff5k-SEstcHZ8BwYY2MFNCcaOZw7gieyFjAdYa1Z4fnOBOsgyprGba6WrB3TpMYzQZSl5yk0T4L4hMa8oJYrSSPlhWE9gcPQV7gXXBH5rcEvxXLozlFmdqLSPQFuzHIXnZ1LhS03TebUwoOl5S16uEFmrZfI4rJLD5as3kvi2xZYJrMrX78JW2ptKF7nfhi1f2nUlQdP8l6KWz5WFCyVl7wLMQUD_EKldhvBt0rYWFLbUNRj39iVZohUmH9wWQ66hN5s8BzLij3780PS-u66RHzC3grhmLDrBr4fFNQDAvpS993CTFpKtgI_QepFeUO52x_qF07I-VzaJQsuI4kupCKEvocYVhQCR5jy7JE72UFNKdUlGfcfuqEbE6uYRpPIObM3v13Q9iXOLDx3whw7MkNQg9SG0-fyrHCYzizJZl5y00Jk9rD4FnXCGPX_WUppBd1z0AC6pkgn5pYKZVAFVadS45_lZpEgUzUPKwiOEOzMHnG0cY2PI_21FByB8tBJmm_d_aE2LfX2GvVp2Q0HBx5pg4ZzLae9-PN7jN8Y9LusvKhlNsIIiUMpj5bhmdujQRIQZVXSC_AEquJmE8i0Cy-Bl2MIvD-B-FjL7y6Q-pbdqCrijcXQP9Ho6UFx5A90Op5yZYItiPb_NehUDX5QxocnrmwKRAIJNpGlctes04P6PMyBzNRIVHyhEZpRGej_AOCAWqZYRwHbGwCTJO5bK7gwChuVQd938qK07B3AxQvjL0_N6SWN_JpAEp2d4hGRTPuqC9McFvqXxV-dn63wjFzI--xsG4ejHIaK65oMta-QnwYITxkSML3aKGPHyNvGl102fFy03a7A36WkeSciPb1lSCPj7oVD4tB4XxnHf3gfasn30c-oIWY89Fv8I84KTDqJTw81hG1MXNVO8B_Q82oX6tNnPI5NCnlrJSZRCHGyUBwiREDgSoHSpN9kEPJ_XCOkqDBwr0z_g_rttZybTvMbtqogi2yBAyrGIsHG2O1T9ey3KAK0xYq_S3ZieDscDDQMr9c_VNyaYhk_GJnIfC1TSuoi7secPpJ-t1XTTd9TJEHCIa0CO7hgYcireibT41YmQsT_bXbIXDm7P2ocuet9beCKqeltbYAu1cqZ6W6_fm_hYnMkP9ZoRTKuRILWMyP_zLSI0u_DWLuchYAGOJRFKHpd5DRx_DnGWThiQrxExqUy5rZ1_I5mj3MZtYruRTzvDRhz6YrdD8MEnV14E4MVDj3pJddKfSaN6IIDFWxltp4zhL_GcJnLiXbUb6xVyCh9mxc7k7eQM5Z3W9Rkst01xpoKWvxBh6yd95s_3ToTTm3mQgtnFHnGsDUJLXrM75cWgiBldUrpyMr-WoDZtyy2xFw8Ki3EUk6BkdaD5dmmVJQUi7a4nHcHePCyXDZ6I-ATDdnkXQZ48oAHZFbeJQ0418lWEXgMtPzmj6OY_zDHAauUVTW5aBWFLbHz3KXCbeKgfFYMcju-l8sn1bDS-yznPJ31b2hw2D4oTazc0SSxslisC602b4uLjSvpttAhsMs_uzbcCLvLZGugeJ4b_Njscc4oppkpTRB2oV2MUWHlZLmA_oVyKd3V6cu_own3JVDrVBONh0qM9uhWp7dqrogwxxfPedZd9bGzjGfLpnpOoqR0Wp8HewL6J2KsYayRKxVFFUZG297lQ4oMsZCt90gEoapiCoZxijQLrp7XtTjqXU_mVXAFer6JQ1Nq-NtLe39OS0spJt1RmTkbmYHFQPAf5klvu3x4a_z9iGzFJIXg9WDJcKof6PoU0UqELojjIH2UjJSp5etyyymJPK1bMea6v5PPDpXqJ_au748S6SlzFMZ28hBtzmTL4-T6toLXn6PSK98nDB8MFsSedX_ybfvn5d6V1ghY0ScqD47NPNnddqosSP-7KKPIlayMVP6Fgsd7pkgS37cMf45lrbvcw2kHmke5TRNo_BHPD9ri4CLOfC_8ATC7lKUyT5JM-p-9lv-tRp3Wy0UnRILzoSH8jgW90UQ5WlgFPZHn-ZX6JJuhAkJ5mYUUWdD__ZOryV010pEQ6dlXMbm_kHgzVWwuMesZlehDnYa50fwE6dGr9uF3Ks9bV6WZg_8FCCerzL9rlbpTY-uvQLsm9ZmojCBkycNGqcSTdZeuuKiwrnb-mHsmgNV_GjoAF3Pbzuq3oHTEfFUjJE08BIoLV-O3oOowBcYyGtQ66KyodxzwtHOU6hY3AnvrMg1phrHk1-J84iR9Qin_vOUhVjGe9rwTylwhLDByzuD2Jb_23pcTTN30s98grGRsKthG0HIrmFmopoYr9732pT7DVABrxV08QqBDv7ffphqadTemIpamOszdSxyynLAD_Mtvrye8NxxFkWah-dT7grY5Kej1Df2_3birCFe2p9jbz52yJvTJLiHUl7BG-HA2v0qDdELeY7iOLoOC4OaY9RkBvTpA06P6NECCnpavP4KIpVxD-xpAfOjJagzXpsEyKyx1JogFz-FtgHOFqFaHa8tchoCVZw9fEkqZYYKMDRIKTEOb7m_Yq-bgPNGDfAlfmnZp0eJuiELg7k7Wg2c97ZDYel8xTAMxY5aY6sAr4hAYl2vddK5LIgYF3Fwpc8lsxEzhHp04qIi5OsHVfq2uXulZPW-gGUliWjy6DWMEaDA18fxJAx6hj3WiitUuOqhn-EE-9X_kaBHlrKra3Z2WQn_PETKixrNRSigXoxN6ibxAIwl9isr1TjU0R6CEGUEbp0mY3KoPwEUeeguAJEP0D9Kd-4bmuzU9Hl_zm5oSeO-DVY9PwWe5ebzWG5G8hqPEkktUBc6qiiJOp9T1uG4lWgt6hqmBTb6iSgg6dySEIkOT4Y8baNfGVzH8sGSv6MDNV_59AypRJaSqNjcH2PccTxf6n_Ofx5YZVSADWji-9wZUNu9ltLqHSpKf0QKdN4spQG0jARizouAkxzL2yrfJR71irToVMRoNAEpeeMmbl5kA6JAZrJN-K4qGN8Qrie8ji_O9HwJo2V76VbnXbfjZqwG7iH4qjhkoI9db7RAHBhaoPy0kd40mZST0W-QtvB0fsyR-4_FLk_907AhPn0AGWmB2qODIOmUVzRsAn6Jkfj2yEWD6d5ZpT2AizPNwP7mIiBVCVTUZfQgDBFE68YwU4EhskwJ9JlSqLtlcps77IBU08rNWTdZB1-FZCnANiMvlyd12ev6-u6_xTBk6ABPwZ4vxvhHcjCFyflM7rhicrqH75VRmXmIzrKlYcHcT3gpli4qceCzfPMSx35WpIPMXHGW660z51i9lxNCzZJ1t-vuIqnOHPE0j-FgUpLJnjLX4MW0ub4y0gIK7QRGHGoHMlbhUGXmi41d5hnrsXK7IhHIS7eMQ4RKuxcfV9P5BvP9IKC43MMr-MQx3WnnV_FGF0tnuzZuLF6aC1x3vWlvQNqne1AijTCa_Qes46IxbhTQZODtGQrHvAflobFiSamElKEZmy0rKpJi6zMqpAcuLKARTG-P8il8Gxq2IEMP2SRASa9pOwyHEGB1YTbcu-5K_WciZ3hwXzAWLVakf1punPvSuSGY4nnL33aH52CL6AYU0QuU1qb8cy3YPcFA6EHXb3uU3eZ0WwJCQtHbKfy89FWikkh2FAzMlKn0DoWOm3znXyVi0sovg8ov7LS4XhFv1xrlo65JUNIRK2GRk6TPNsbKIvjhY2POV6JUIsEJWXqqDgvMCO_4-UuQUz-LJgeEr8Ozb_GqdA0Jr5QJze0B6Ccf1WmmNY559JuOxUizE4ZFVOF1r1T6mNrbxv4JZ5F-TgFyX0M2_h0cmd_XVmqepKvZTok3RJgpCdUGSXRANrV5s4IyKduba0Ir5gnqJR4_exUuAvM9QEuVd9Lp7fWxjBl_yngrLEuVbjyJMn5QwnDT3W6Kl07o8X5F8xp5LR8i-sZ0tuzOVmnMhQ.GRLlCUTOevHT4B41ZBWZEw',
          fundsAppliedToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..aBq8PxafTbFf9ATiRyQwtw.5S3uSNDYLNUJzACGEX2EJ0HH3aGSQzg5c4uGAgE8cyNpBiGDRu0ewwBJe9U1mMBKfRwMd2gB3LZ10DfEtNrRfkVpYxNq_wTGM3RYAJv0E31hmzmZl4AhVjG5nceAw2SeOb1qS0y7oK0wPvdYEM0ZPuHQD8fTLwvbjKPo_dIKFwZ4j8FhdLCt0pgrT_nnjg6qlABdi_e3MQsBWkqeuzwjIouwe9JVf2RFVotqrCv88yug50xcDYa46h7gRpbXyQ0EapC79YRK8HNLHs4OfbWZIzNopHc2hvuAYlvuUU7rLu7TULV9r4x0wYvwmjwWxb4xymN1nvWTjRYNCtx7MIhI9sZ4O850OyUzBRSKVXNAoPwEwkKOLIiaBpZS-2A9mBIn33Jm8kRqU1FMP8cAsMJbEEHlAWYCIoznzI0hq50DyyEmLmNGwVVrpsbnMzYBXgiRFvaACLdR8jg99KjnTbgu5Q_fu1VzbozD-MB6ft4jZPXSN4cWBFJRReiV_5YEFpyNtOI1KpYTEze49tewYaSlrd4UK-4dqOXzQ97-m37IUWtsuWbNXeNfLaY6RQDyhVM8JFnRGjdNdbErLUYNasTEZ2_VD4Z_tf_UZ5zSF7K4m6M84NaZZ7OgrRkhVevIZgdyLJz9jvoS8WW1v8Vxxcjm0K6NtZCLCfSjF60TZZ8F_IsUVwgPlPM2YaBCOTutdpDcdAt_GAIdTP0kYB0BHE6NEQ0D5y2myvuGjAbRdMRryceq05ulLqwJZ1P-lrw1QKHDKvnOQvt_KFWymNWORrMZ53Du-HMBVdJ-Q7Eq6FMBJamIT3Q5Kec-kDGsakh1lbgvYDxOH0NUq3wlwrk-WDl6y5mk-v3SBM2SvwEst1Q1Lo_Y9sGKlfeAHIXQtdUxkM-heZopImm3bRDw2jqRPTKoj9yQBuN4ET0l8F3sK8B_AwT4gqCVB9DJ7i1OkZwZ9wiANlgjW98pHhj6VSCt5exdPMIdvb1QtSRAxYxGEfbn-s1B0C66cnTUpYp2UVFJP-VRr1k-e3oPXSmgpEE2y-pvDSSPi1zll6WfeRKi9krYVMUzGeIWnEeRXYKA9L3tNBG0JlQ1_Ncd8BNtLyBPOucG30arHUoAmS-X0Iwx7BhzxG8OONciyOJpqolYDs-wiFj1LfVmNeJ1-TNaGiXmatitsr2hEyh1sei2fbEeV6QOxHy9Zscw5nrylYAeLVXHP1CByVWUL4U6j8sIT-ZJM8K-x3xCltvkeqbkPRwCkrxloa9AbAH526wH37fAwoYmo_qL8tzZ0w8aCL2lssPR66Jtz0xkEB8ugZd6lEWGNP5y7ZmrMyTBqS_nw902CmAqmSIzuwu_oKXJPZDGmnIK6xK9ric2xJoB4hQ5QNmXXlbd7evktZLM4GdjRWzelt2hmAQmfQbfa6fHziJ2Jc4oWiZEwA.XbrYn-LXi5qgMYVXDy2uOw'
        }
      }
    }
  }
};
