module.exports = {
  changePricingPage: {
    paymentRequired: true,
    refundRequired: false,
    hasNonRefundable: false,
    recordLocator: 'REPRIC',
    emailReceiptTo: 'testemail@wnco.com',
    header: 'SFO - LGA',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-06-26',
        flights: [
          { number: '1809', wifiOnBoard: true },
          { number: '2227', wifiOnBoard: true }
        ],
        departureTime: '05:40',
        departureAirport: { name: 'San Francisco', state: 'CA', code: 'SFO', country: null },
        arrivalTime: '15:30',
        arrivalAirport: { name: 'New York (LaGuardia)', state: 'NY', code: 'LGA', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: 'K' }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [
          {
            airport: { name: 'Chicago (Midway)', state: 'IL', code: 'MDW', country: null },
            arrivalTime: '11:40',
            departureTime: '12:25',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 50m'
      }
    ],
    passengers: [{ displayName: 'SIYANG LI', firstName: 'Siyang', lastName: 'Li' }],
    messages: [
      {
        textColor: 'NORMAL',
        icon: 'NONE',
        header: 'Before you modify',
        body: 'We are unable to secure the price for the flight(s) you selected. The next lowest available fare(s) for the flight(s) you selected are listed below.',
        key: 'CHANGE__REPRICING_MESSAGE'
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '529.58', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '599.58', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      totalRefundability: null,
      travelFunds: null
    },
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '599.58', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '536.54', currencyCode: 'USD', currencySymbol: '$' },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'US',
            description: 'Excise Taxes',
            fee: { amount: '40.24', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'Passenger Facility Charge',
            fee: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'Segment Fee',
            fee: { amount: '8.20', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '599.58', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '599.58', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: null
        }
      },
      seniorFare: null
    },
    isRepriceNotification: true,
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    _meta: { purchaseWithPoints: false, newCardHasSufficientFunds: false, isInternational: false },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/x-change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference: null,
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..z2rIzCOzspl1RHsTAjklyg.ulnxepG8Xq471t3KvHjtyBGwgxlqd3r4YGo93KcF8TX2fecKZci1_FtaqI9gpHbeY0hXisL3yWXvg9dd7WCOWUgi7_6kb4zBmkF8_jAjOAGjcqb5IFgRW3dp7nhNL6Y7zs3JhD3UuBiZzRecbU0wWTo_79mClsEme27cdqkFMdXqNof1c68-pbMX3y9PHfxZDVASnZA5ff8f1IX1ZRbFUQHZdhKhXIMLSkSxW8Rs0F0-Jp5t-1bARmHtGK3Ieg2njM3Q0d8ov7xEJg6-knTYu1SR2nYcRwppGa9DJ1fJK_gJynE6Eo4JXOiw92fjUBSU3GGkQd-lJN9OeRc6HR_H0IysC3lOngP_bdOvpBVOCMkR8DUjAybidZtFcC0_Uke8TtS0_6o0g9EdLl790kEnYDtwLtk9X58mIPV-R7nrlAz7R-XeOjWWquwOjG1qRXtWgisbIStqbOmndDw_5aV1f9kP_BM2PUDtfZhikABI8ZiRy6bhbEKqVHoVNn0UX1zL7ZnOQXGCYKpiGw9HNNzFLqIybMIIuBpaCT0FWh_Tk5K-E_KUt592pQBc7EtYc71MCo-BzW1dVam2fcAq3aSJMyFBbuV8ZnDNdOQyMJz7y8_C9x5EH-qM-vn7Pydr-Wy5o2BBs9uBt3RjC1F5C1pVqTifO6fX2UuV0uCO5UhKFqbuUKlPqFLH1IkWxrnuCAJ3Ctpn6McAGyq6JdoNN4vRPey0G1myAWTh9iDca2IVSsTjP7dg9cfAZRv2ByZgKlO0riz7eaGIEDBRMRbbobyIXjRG8fwHzo0TAAKaUUsaI28Rh4dA4f7crtFgFN2dMz3L0YRBuWE5jNxcPjX6q93gKE1uAfRMfNSVYptUigcwdx1S02u2WNsp7Ijwai5bwOJCwrrxQjo2CCjMVMrrb7m6qO0UB2vqP2Bgk1AHcrxFgDj720zbGrHtetbWD70Hps5nVPf36p0VVppo01iO17fsw810rc6rmysbgVrBboaDwNduIrTjLO5MD6db4N0017OpoBdbB6AT4P5XNFxEfSc4eMfNZAjnb5TcZQoAH7tXIE3ggp_4i9Qg6AgFzmXA0S5APrk1upxv2H-WcIOacW4nvfJ6c09_uR6e2cIrsaimZpKDV6R7jWDaeUpab9DzgANzUjOBXoWzSHouHXe17b32weFbiLSRLylXuPh9PuHgT2rpXlehj4xQ_aOMcJrHBB0UofFv7PpZgamG7RT2Jmhl4RbdW7VxF5YD3teQnUumxpSqX0FAwSoOzYyDBhx2hLUyBwVwLhLJSCMisDJW7a4G5duh46woAeh7lWINNBC6vVyAMAfyvmIaDIN9AWVR56V-SJfegx79nikoGXucVtTdty2KzzSOAPWQykIxvnyezFrap_tD7j8u4Qekmk53QmKXRjLYnxyHHeRCFw1cn8HS5xYH3ykEKNAsZoTh6tm-PW-7spVIFGM3GSIBCaQ81yuhDfQnqJLzcpMjvX9QoZ0m4BvK6Ei2wO5Futbh71FAOXeb0yE_Z332KOwIKdrl_o8XOFIrK7E3xeUKWXJVEgVsF1E22MmDgXP_Lk7PbdgVeRitIfwezo8TswqqJDJuVazSM3u-vKdpd1yNIEnJisvhC7UNIPtpLJ4nqtlApprEIP9sABG0SvSWJHrAVpVtL28LRxmFlrt_Qg_beYD0XPl1PVWKqgyPmpr-MTa8MtUn8wfjYWgvolFLwrfJkzTM03UxRKkDEmpdase-egFFj2OjDpjBvqfQ68TE8v3GUPFMtsntGP4HDT3FJU7t0_uqsq5Rt0R4zEiblMNK5Dnvb0Wcgr6cxi9z9Kz9WB-wgy7O5XY4wj4Dml0eAY9tlvZXPh8yX7ed97WDvu6GyrIlfYnmktZlHiJIBhq6ZRxroqLVSXvM1NrIquIlzHCS6c-VDqh9mholgbctPjLb1eDk7BOLUfH99JLlHnmcX7TsJ38gbN8wCrBmaAT5zq4d61MxS3BTsM3PSC_TkEWoFBKR-ycDIiquSYAvnwnGBaDt1_1wsOwqv1ZtjopgMH4ljIZaOyH5oSOpD9rEIOwrqf7cg652RzyzfvcYKQJlvZGkMNUgURLcQWjZyS8ZRaLXiwXv41saLiiAM1FnHfs40eC8pyrJHSKoZFW5TKFltDPFv63dl4bLiJqYfk0njpeTYi6BXo0wsKFBi3NjhESuXeW6zOjjyePBr-WrnVrcJ-DkxnOjx4OFCdH3gcxGxZpXqT2rJyWZFUynYLrmg6uK-aYepqmOVP8nvm_zkS2AOHfZbth5bvw4jSwPXA-0puwmowF0ifCEDQXup7cOmTxiwNVjKDqfdoxJDFiuw-Q493a3duwglTCKtyAmfQmnLgbrL88RlDzGvMgVo3Q3VJjb8-B_5ob0i3-2FEpyKWfSoOPAvM1M01zc0b_inaabjSQlo2ge7J_IFiQIKBnf0sgsoZMg4jxqbxRdLQnSSqoBhs_vU8kjZvhFZPozy-EljRkkm15Jzt-1bQw2UGcfOVNmHC6RFytFz8lpaHndcYpPwDCyHTOd6RnykHVMVvj_yGr7ad-t767I9OFrhEEEaD6lNP2ilEhvjw.hZY_jF3xmt6ryTIn4hCgDw'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxTRk8sTURXLDIwMTgtMDYtMjZUMDU6NDAtMDc6MDAsMjAxOC0wNi0yNlQxMTo0MC0wNTowMCxXTixXTiwxODA5LDczSHxLWkJQLEssTURXLExHQSwyMDE4LTA2LTI2VDEyOjI1LTA1OjAwLDIwMTgtMDYtMjZUMTU6MzAtMDQ6MDAsV04sV04sMjIyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjU5OS41OCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IkJVUyJ9'
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6IlJFVkVOVUUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIwNTo0MCIsImRlcGFydHVyZURhdGUiOiIyMDE4LTA2LTI2IiwiZnJvbUFpcnBvcnRDb2RlIjoiU0ZPIiwidG9BaXJwb3J0Q29kZSI6IkxHQSIsImZsaWdodCI6IjE4MDkifSxudWxsXSwiaXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJmYXJlUHJpY2luZ1R5cGUiOiJBRFVMVCIsImJhc2VGYXJlIjoiNTM2LjU0IiwiZmFyZVRheGVzQW5kRmVlcyI6W3siY29kZSI6IkFZIiwiYW1vdW50IjoiNS42MCJ9LHsiY29kZSI6IlVTIiwiYW1vdW50IjoiNDAuMjQifSx7ImNvZGUiOiJYRiIsImFtb3VudCI6IjkuMDAifSx7ImNvZGUiOiJaUCIsImFtb3VudCI6IjguMjAifV0sInRvdGFsVGF4ZXNBbmRGZWUiOiI2My4wNCIsInRvdGFsRmFyZSI6IjU5OS41OCIsInBheFR5cGVUb3RhbCI6IjU5OS41OCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiI2NS4xMiIsInRvdGFsVGF4ZXNBbmRGZWVzIjoiNC44OCIsInRvdGFsRmFyZSI6IjcwLjAwIiwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCIsIml0aW5lcmFyeVByaWNlUmVmZXJlbmNlIjoiMSJ9fQ=='
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
