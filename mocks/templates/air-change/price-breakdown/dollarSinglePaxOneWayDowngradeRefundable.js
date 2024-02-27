module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: true,
    hasNonRefundable: false,
    recordLocator: 'J8WTKX',
    emailReceiptTo: 'testemail@wnco.com',
    header: 'ALB - DAL (One Way)',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-05-16',
        flights: [
          {
            number: '1702',
            wifiOnBoard: true
          },
          {
            number: '281',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:05',
        departureAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        arrivalTime: '12:35',
        arrivalAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        passengers: [
          {
            type: 'Adult',
            count: 1,
            fareType: 'Wanna Get Away',
            bookingCode: 'P'
          }
        ],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [
          {
            airport: {
              name: 'Orlando',
              state: 'FL',
              code: 'MCO',
              country: null
            },
            arrivalTime: '09:00',
            departureTime: '10:50',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '7h 30m'
      }
    ],
    passengers: [
      {
        displayName: 'XIANNING CLAW',
        firstName: 'Xianning',
        lastName: 'Claw'
      }
    ],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '573.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '64.80',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      nonRefundable: null,
      refundable: {
        item: 'Credit',
        fare: {
          amount: '508.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: {
        item: 'Credit',
        fare: {
          amount: '508.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: {
          amount: '508.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      newAmountDue: null
    },
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '64.80',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '39.07',
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
              amount: '2.93',
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
            amount: '64.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '64.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        }
      },
      seniorFare: null
    },
    isRepriceNotification: true,
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    _meta: {
      purchaseWithPoints: false,
      newCardHasSufficientFunds: false,
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
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..8yImOai7C9VlxmfenG-nnA.g7kJdvDRwARRzwZdqpinsiFTmZoccgEIZ2YOvEBOoKN7kN8nGGRQbjqfqxoZAhd0cVRHyrU4IAISN7G3Et96uaHyEjaWiekzJMY0k5ew8mefGWhqKNIYmp3g2AivdMfaV6Gaav7KlnQQrBHqlbPfCnSyl7B2-VN_G6Fplo1_kngeBJ4JSwvRZoGnUxKWjNHzf08KjRmO0b69xQHBsLpqhxz9UFLbbv46aCE49xCJ6pikphynx615V_qHRZMOycBS6LaHtLNd_RBmHN9K7MP-rJvy0qOF2NSj7S4CrfsturcmLnAXWKhxInJI3gDiiZSuHklM2zYLtd3-kEQkEXeZvuRQXhZ5b4pvvZTQdVasfiMbu6BJPB2WYJSnsvvPg1UiE0A1QMNP4pYJ8Y4OmSvRY4r3hNSwj6AMelyCc6QBaIWKttJwLBLRM8aixvJ5vBjMxQZYm_n_-6HuwFQY0Dic6RYDYKbrU1scg4eTiQ5deJBCVnsLCeFD2Mz431wAC0L7NQRgjCLyOcHXDQNxSTp0RP535AUMTmNvf5X84eWjwfzCI0sBmu6sHAJ2Q6umVfH8qTpcWJEoRxQn0nepGfbVF38j6KhSNJw9DaCfrI1vKD29lYNP-zM9i-fFRmuLQAUybgiGY4AlcPh9WR3I7l6oDh060cyJWGq7nue9t0oh5yS9pdUDQFv26D-7Sx6meCFUx4mSVovU_5-nJ6xuClrLIOZxIu4Jl34An5DwH5p4WkfIMW_BZmmCrg0vz8WgP-7dwZbdkPJ2XfCw0V8dfyDe5fYZd7LCN-2H-prfVmmmKAiKw_6Fws9QHu-VSHnslG7ccT2FhXOYoCFe3QDRNocoB0AcyQwVh1Ou4u0hrQGJmJJGHpKWkxK_FxT6I3Jnn1W6S8y-82-z9Y52jGJualFywJLDhm9PuXTiA8SEd-2V0QqO0XApVAdvkR_Ntiyi5Y2uBGf8JppR16-Gn3cQLQiRVU0qbe64lH08vujqkqrTFJh9kIwjkK7Ws-7JfLwWjtoo-DnzxfsdEygBREUr5QDyLO4l8xKY09SgxGHrdTFpl26ZSQxTsEWmvafxPwWVAHqc_mDR_P2Ut7GM0vC6tYOn47o7n6ay-DvKvBR2ra6FPTyVeSXQJs4QzhOASfzT7XKA0VDHcW2L0dAzI5I9Tt5S5QwOv2J0IWlurvyECBpSg6IH0EmtbYMBO6zLp4EEvi3nixUx0UkDysZyWEM1S_0OVrbOryObg4nVEjxuSFxO2FFdFFcSqXHzXqaBlBnmTTgnr1umUJDIE3bXJsAvuCFzzPzInRyC_jLdz-Q7VnXDz2vbrdC1F-EkgYQr9bWuVdA_yHwABGCqOsSbu-ZuSQJtUU13z_Rx5t1Pa2NfXFSsOqBxb17FGuUAYT3-m5fGgroSmsuLAsXbHtXWSO4_WjVKD8mE2lo9yQP0mHVxerQvyrrg1Q242Ht1Ftu7YKphvohcyyb_sMscIVaQcyCe2MroUnyBRVap50K46uKcTD8jhl9wqhZxhIwKKz9kNTCbVw-e8TqDMmA-IynA3eDiVSf9KWPf8top3k6lM8I3a1T0tAolFMg0DxSonceRQHvS4dFMTr5AwKBkfAuB_LO7m8A-1NnBnu-SfsQyxhEdC0StL2Pb2nOoZYUQ6n9Nec4B3JIFw05iO5HUjM8wgxQENyLLzyoBVQz774tqgPVpSFNN9Plh_oenn6mSOIXAq5fHgwC9-egzlh-E0O0FGGPY_eodacLsloyJSQ29yakv-1RqOfPNfsSFISeSVEFdB6BCSrRdTHRp0EcibUrCJN9XVBmSIfcpu-tpLt84mKgE988VlhxluEROD8cswiqPL9kW2te8L62ZIvOc0-sJPohOwa7RgyChNKdBicxzDb0Dxb3axzs_3U-WOerG7ZU0emflL1iVHMPkuFbKthZGmCTe8DXvL2QB0vQMwFPc6M4MjoDvE-eYJbKOtARwU96VR3Im0hb0wVa7QMXY2E6PbXXP4Ekqw5zw8W4QZMcC6jwxtgSFOU36-KdWtr0mZoVJWp7LX_ZJA46AWYApntjbCE5ebLHkNn9N9UvrDdyQiLWMH5j4sO88OFD3eIbU_cdEXNgPxyEe7rF2xIo6VOYiWv_IgC_eCgqC8ISaxrinPJOJpfXuLrCvtLweX6QzJ_YJFPCuMmaTVuaWNmzchcaG3IsfGzq3ddGmw46KN9iCQoKOhtB72WonzaNqoUmc5nhXHqhRKG4W-LdxZnhJnqnXpaaGfn8zGPj41kUFlNN12dgVEU4gzkwfWws_g5AsJiGsj8ylpBhjsS0mCkpJEcIX8qJ-SF3SisFVAbTRaMUSxBUgEvuNKt77ZZ_ZjoY4yB3Bs5SF8oZBXAKaRPkGiB0Bc7J2jb1JecHPeZaNBZ__kJJVZLmE29750e8CZVj4nixPppyVXmfXzd0PlB6W2nz2P7rgSp6BOtQnlsfdiOxLgmbTiuyy3RQ.QtunSNkHJaN3Sd5YnfeuPQ'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFVMQTNQTlJPLFUsQUxCLE1DTywyMDE4LTA1LTE2VDA2OjA1LTA0OjAwLDIwMTgtMDUtMTZUMDk6MDAtMDQ6MDAsV04sV04sMTcwMiw3M1d8VUxBM1BOUk8sVSxNQ08sREFMLDIwMTgtMDUtMTZUMTA6NTAtMDQ6MDAsMjAxOC0wNS0xNlQxMjozNS0wNTowMCxXTixXTiwyODEsNzNXIiwicXVvdGVkUHJpY2UiOiI2My44MCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IldHQSJ9'
          },
          newFlightToken:
            'eyJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJyZWZ1bmRSZXF1aXJlZCI6dHJ1ZSwiaGFzTm9uUmVmdW5kYWJsZSI6ZmFsc2UsImJvdW5kcyI6W3siZGVwYXJ0dXJlVGltZSI6IjA2OjA1IiwiZGVwYXJ0dXJlRGF0ZSI6IjIwMTgtMDUtMTYiLCJmcm9tQWlycG9ydENvZGUiOiJBTEIiLCJ0b0FpcnBvcnRDb2RlIjoiREFMIiwiZmxpZ2h0IjoiMTcwMiJ9LG51bGxdLCJpdGluZXJhcnlQcmljZSI6eyJyZWNvcmRUeXBlIjoiRkFSRSIsImZhcmVQcmljaW5nVHlwZSI6IkFEVUxUIiwiYmFzZUZhcmUiOiIzOS4wNyIsImZhcmVUYXhlc0FuZEZlZXMiOlt7ImNvZGUiOiJBWSIsImFtb3VudCI6IjUuNjAifSx7ImNvZGUiOiJVUyIsImFtb3VudCI6IjIuOTMifSx7ImNvZGUiOiJYRiIsImFtb3VudCI6IjkuMDAifSx7ImNvZGUiOiJaUCIsImFtb3VudCI6IjguMjAifV0sInRvdGFsVGF4ZXNBbmRGZWUiOiIyNS43MyIsInRvdGFsRmFyZSI6IjY0LjgwIiwicGF4VHlwZVRvdGFsIjoiNjQuODAiLCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIiwiY2hhbmdlVHlwZSI6IlJFSVNTVUVfRE9DVU1FTlRTIiwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxIn0sImRpZmZlcmVuY2VJdGluZXJhcnlQcmljZSI6eyJyZWNvcmRUeXBlIjoiRkFSRSIsImJhc2VGYXJlIjoiLTQ3My4yOCIsInRvdGFsVGF4ZXNBbmRGZWVzIjoiLTM1LjUwIiwidG90YWxGYXJlIjoiLTUwOC43OCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifX0='
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
