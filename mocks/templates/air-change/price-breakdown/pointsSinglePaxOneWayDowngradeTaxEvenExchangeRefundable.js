module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: true,
    hasNonRefundable: false,
    recordLocator: 'KVPY2V',
    emailReceiptTo: 'testemail@wnco.com',
    header: 'AUS - DAL',
    accountNumber: '601143782',
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-05-31',
        flights: [{ number: '2042', wifiOnBoard: true }],
        departureTime: '06:55',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '07:55',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: 'V' }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 0m'
      }
    ],
    passengers: [{ displayName: 'JOHN WANG', firstName: 'John', lastName: 'Wang' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '2,613', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '1,613', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      tax: null,
      nonRefundable: null,
      refundable: {
        item: 'Credit',
        fare: { amount: '1,000', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      totalRefundability: {
        item: 'Credit',
        fare: { amount: '1,000', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      newAmountDue: null
    },
    totals: {
      pointsTotal: { amount: '1,613', currencyCode: 'PTS', currencySymbol: null },
      moneyTotal: { amount: '8.40', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '1,613', currencyCode: 'PTS', currencySymbol: null },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: { amount: '8.40', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: { amount: '1,613', currencyCode: 'PTS', currencySymbol: null },
          money: { amount: '8.40', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '8.40', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: { amount: '1,613', currencyCode: 'PTS', currencySymbol: null }
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
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..3AoisYo8wdy03Ko4CPQ_PA.ZLAcqP-1AUgRhcWHd6DI3lGH6d2tViZZdWEuIOCyi9hliNrxSGFFkToOco1wnVFoVyQ8_jiksPqenzB7W0CZynNu3u0uAGbl2n8fw3mKKPp54yIRl6uHBXb1sngfTXBaL8HityxpU1b8DijUBoaJQfgizZfVteVYILZg15Z3q0JiUlrCqffzn_MijOJyl8YrG7njbeJ6BrZ5Ykd4VP7rSrJKtFFHQ0RP0sfa814lPuyxpl39BHtMQqSzVc_zV6_Z7IDYK94URXnU4juw2RM2jJCebbuIpL5T_rZ66bq85AgI82Hm4w3Opqm1MSgkNrzK8u6NXxO9MPtrXH-b9v5Nf7uaxFVOD_La-TXzNcuQEui8RibTnBPWJXAyNIX9ISd8axw1RFy4P2V-2SPsf76hlxzR6KLqd79eb1rnoULCF_XoiXn_cTMW4PzztkjzsVHLsXa-Z44iJHmjEQ5wURv0EQPBQA-bTJBt9WMJGneJjmAhOhcfWZMSnr692Px0A0Pwv3PFKya_u7jfXv7S4Focr9y1azxY_TVswxjH64y9D1srgyKUJ0YyeHfBgQLboaVW3KW3inmbQ2NC4xB5DaVuOvrtsv2dqlEwHg8UK6Lv7oRMVOMoQ_UiTEAFEIgBqO8Ruochv2vpBo7QtDsw5WDSoz6zAx0UikoDrCpmMptmJzM4IY3Jew20tZWWyL7tSUGEp0KeS6F6wbK56ApsDiBa_qniiLCOmkIWtg1rCKEklYE5Dd-nSwk7JcAywgKGN_0ElDp7EgZDDGRFlfefOEULy1ZCn7kfXkuNDOCiBO_Wm3gZHC-3F6-LIlcim-n_97O29aw02ENZFWW_Uv-TOvEtL-LeYBwtRHLbQEnEp0VR41CAYe4qdaQJva1m2Ys5q9nXZway9mPVvWAGlCRBnURCk8bDvYjvjU6LRzL2T4tWG9q9vySMPDDx5Uav-FhNJGDmeZd_axMZ9z_bXbc-MAgeFN6Bf18RWuHJnkl7aICjrX30v19Ax3ldCmv8c7HK2grLHDMf1UWFlqTvPcM7Se61uMPBygGU5Ix5CocrM2itEAk3aKMa3XBWNgpqlexa0TzI4AH8hTztJRqTLV8SpYKOA8JQKF1kDJYWOd_UBkxOJXTqvum-MN7H6XItkD4yFhcXUyUeNhNqRYrrSDJlnI3XCjIIhvM_4iz1uAg74BkRFNwhrcCCupwr_4zBm-2kDo5YaWGal6HYLudHFIqIDP0wmcX10P832_1xF2igVrBnrub4rA0DrnBY3LcmDeqngsY9VqO81f7k-cHPHDJd5imMhcNix2ldYFmwMKA4qcKKtEBTud5bwJOfQYsUnKNbjaBmNR25ctfRZEy738JE8Kq7qQqbVHhaU6UP4q9pXTfHSjQQ5j8Ns8cOcRrPdaRaaw58SKe31jSR0cDpOEqhOzxixtYqDd8GMHltfzD3k7Z6YHn4UjlnfFaqQ5VIXx3yb7YppS7h__U8WCV7Qv3oSPfirHMFnvuOYdxoSeUpv-RlWE__LJWi-MMOKqFN0pfLehXZ-zBYLW_x0eC16rTUOOisIiAar9y_RwrMQSczK_MLsCydUpeTo18mXA5YiCBDBq0RWp4qwv7rRVrKmFCQvUwcKCmO9wsKAU5ONQmlw2TuGoxy0piQHGHNVCUL6YJbBE1vkIWBJKpA_IZH9-xlGBof8KwSlniabhiPyUhDwzIo9PM_sgvaUMwI78uX6WZHJ2hwQpU9ctMh7hcWvieqjnLQ9SqSG7b15ks19LXMfwjFL5AOU1CDqjsGCn8ABs-4_XViGTrMqVzsE6B0L-aB2BYC4zIAszRWkQvNNGxeA4sIl_vOYDCkYiU7M9xwTIQf6wKi7QKFeHoCFI3G39V4Ozt-C6rAFoRinlUqrpAbkpS2pmpbNApCWuXQa1VOzKLaWkNJTvu1Lrfra6nSPQ1A1QwUNlg3zZ2zXz9P6Gqmke_m7XwtzyYlzH-hQCLIXZf7vsKhklugiofE8T5WoPf2xSUnehYOtYlTB575LGwsFKJFoenOL3RTtGao3URla1sMfInh7IxsFNcKMe6M_Awhuzb1NuAxztmABIwirawlu69lKXjn-OH4oHK6jtW699sfekeS47DKqhQEimwlFkGORaaMZyYQW2X4u68ncG6NqUlnV4M4ClOKqFEFxyMGS9F-8ZtcqIaDvzV_pjWyny4GeXJDxl75otA1DR4y7bSplGoSptJ9qn7KwsyZDiq0TzyegdsSZ1BqfPVdELshlI6XMAmU5bL5QZGABxpB5IHuSpBfzAzklGeIZfgZs7bx8ZdduRwP1NFVNNRg96dw96e2XYfZDlWO6vlCSypmTY734PRhlkGdPngsETqtDm-6NFD5MG1WfEY3MT0U-R_p7z9pgV_hgkZSz8Hs_DralKTmVuOlUflxvIjgnVu_Ne1BK4oc0amrel1oQfD7rcN3tWlpWrMbQ8aaBlev0y8cjCHf6mWGLxpjbCXLZ7F30djnVd_Lb9ouW1dQ5iDLTMCYtBGvD28F6LZA096gvUi1Z805lifFqhlWKic1xcStDqT5LyEtq7gAelTQ1jgJHk8d4qeV-hbq-SOeIINisu9Uu8udc97hvcou58LLPfq_5guaFtjgEtuED7yiQGpzbrj6hzBIUinacaifyJNpGkEMrz0J-jnsY14.1TAbYiVPZohOzMLJjuZ_jQ'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfFZGRixWLEFVUyxEQUwsMjAxOC0wNS0zMVQwNjo1NS0wNTowMCwyMDE4LTA1LTMxVDA3OjU1LTA1OjAwLFdOLFdOLDIwNDIsNzNXIiwicXVvdGVkUHJpY2UiOiIwIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiV0dBUkVEIn0='
          },
          newFlightToken:
            'eyJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJyZWZ1bmRSZXF1aXJlZCI6dHJ1ZSwiaGFzTm9uUmVmdW5kYWJsZSI6ZmFsc2UsImJvdW5kcyI6W3siZGVwYXJ0dXJlVGltZSI6IjA2OjU1IiwiZGVwYXJ0dXJlRGF0ZSI6IjIwMTgtMDUtMzEiLCJmcm9tQWlycG9ydENvZGUiOiJBVVMiLCJ0b0FpcnBvcnRDb2RlIjoiREFMIiwiZmxpZ2h0IjoiMjA0MiJ9LG51bGxdLCJpdGluZXJhcnlQcmljZSI6eyJyZWNvcmRUeXBlIjoiRkFSRSIsImZhcmVQcmljaW5nVHlwZSI6IlBPSU5UUyIsImJhc2VGYXJlIjoiMCIsImZhcmVUYXhlc0FuZEZlZXMiOlt7ImNvZGUiOiJBWSIsImFtb3VudCI6IjUuNjAifV0sInRvdGFsVGF4ZXNBbmRGZWUiOiI1LjYwIiwidG90YWxGYXJlIjoiNS42MCIsInRvdGFsRmFyZVBvaW50cyI6IjAiLCJwYXhUeXBlVG90YWwiOiI1LjYwIiwicGF4VHlwZVBvaW50c1RvdGFsIjoiMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiItMjYxMyIsInRvdGFsVGF4ZXNBbmRGZWVzIjoiMC4wMCIsInRvdGFsRmFyZSI6IjAuMDAiLCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIiwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxIn19'
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
