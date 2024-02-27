module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: false,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: 'CHFRDE',
    header: 'DAL - HOU',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-02-09',
        flights: [{ number: '2863', wifiOnBoard: true }],
        departureTime: '08:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '09:10',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: 'Y' }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 10m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-16',
        flights: [{ number: '893', wifiOnBoard: true }],
        departureTime: '06:30',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '07:35',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: 'M' }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 5m'
      }
    ],
    passengers: [{ displayName: 'Charith Tangrila', firstName: 'Charith', lastName: 'Tangrila' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '428.22', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '428.22', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      newAmountDue: {
        item: 'Amount Due',
        fare: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      totalRefundability: null,
      travelFunds: null,
      remainingTravelFunds: null,
      remainingTravelFundsDisclaimerText: null
    },
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '428.22', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '371.74', currencyCode: 'USD', currencySymbol: '$' },
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
            fee: { amount: '27.88', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: { amount: '8.40', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '428.22', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: { moneyTotal: { amount: '428.22', currencyCode: 'USD', currencySymbol: '$' }, pointsTotal: null },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: { amount: '229.14', currencyCode: 'USD', currencySymbol: '$' }
            },
            { boundType: 'RETURNING', price: { amount: '199.08', currencyCode: 'USD', currencySymbol: '$' } }
          ]
        }
      },
      seniorFare: null
    },
    emailReceiptTo: 'aterris@example.com',
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    isRepriceNotification: false,
    _meta: { purchaseWithPoints: false, newCardHasSufficientFunds: false, isInternational: false },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/x-change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..Scha4Z3GTz0wm49Tud0k9Q.ZX5xlqIax4Z_gbgpes6qljjMSsb3CmTdr4VX9Oo-El-nt7rE31AM_qk7OdPUvFOwlQJABT-T0moDEY2e0VTpxObQ1zgGMYccqF3JLz5rBgLPiTZsfAGdTy_lyrdVY0trhAQizGp2UB99n98GZoDagoOAeULj85SrOOjCo0CMwA1dyjDnOm8gtxctlcqN-SzVKlD2Sk4FeBrcCybO7PHRixbhfgVETlGijzWt0MfukzhvcDGctSq8TY8VhY0uQt_69fj2cjc-XccwAvj2lZyQsfdC38SxQwJvKh3tqI1-WdmgEg5KA8mLHAJho_11zPqLeNrBql6PASm6k_HcJTJSyywDjmnEKDku-undIspcGomTsCA0ta4RgJ-p9AkrGolrtEgoAEGLgYkYf-i1ZSpGxXdoQbJsa_xkVNgg4KT7gXQfknPXfnX2-ona3UvNLvZ3Iii-kRXLVMFuWajt7HLSTm4BbxTzLDmaNT5X1DipCySlE852Jiw-t088aInA293Bgp-ZOVyhbgvh2EBqI_v3oxUav4auSTwq5vk7XWNiiqpOinvIcaB_Ab--dAhh3Ode1jeTEwEsIldn9D6hLdtkBcCG5tTHa8yfBqTRvHg4Zd6P8iIABB7UKqNcu2n2HxYSpwaQnnatcg2hXB9C_LsyJ2J9ZrBOJuOHfBU6jc5pXNir2N92IdOKnhxeJgtdY9UoixW02clwMmeSwXmc0kn1Oz5p2MrfHRwDo1pWCNll5ZN92-S4PCbpyejEnPx3AsXp1oVzcbyYgNiP8MOuJnGTXCpbrfnj4pMzAxLjOBUfkSl6izy4QuVxcPS90WWvcsNfPsrWtdey238UEgsUbwbWTvkYs1eX9cjakDjMMJ6u_QnjNQNw8tBkQTAxL2C7WgRVt3Jxb6GS7a9xh7AU12_rpRVdBnZw3gSEqI239usOheGD4neoGyC-HitaGWJLslNsThPeOOOLqV8IVrBa3zxvQ8QdsxE7-cyHqVvDmZLxG9S7oaFDBPnQauo2oK080cX2f5b9KhxeBJldPCV9i5B0t04AFuWL7YKfMrOvn49ROJoSRfi_XRcLMaNf8szEiCOnUOsY-MRc4DJ2pv98mqIXMMcGOil_oTQbjDNKwsANXuhREUa6lPeUQuZlYp6JzjVlgNA33KqBx3cFOYK90nSuxX9_Pr5XQc9mmNwVy6FNZlEa8N90xzoEx5n5cvessqijysBnszMWWpde62k2jjV-r7KPfHOUKWj5OgylzrXMZx97fWTA0JCAkTr7DDDkuyhJMXwZrh6RwOQF3H0hMB0dr61W7PIdgssQFFkCRtzYEqopHIqpFPgg5T_EClDdzJQDiOjQ3dVN30Y5kaOxJDAvHqmReLrnoscwHBOOlApuMasN7TdkOmtEK3crKjkg9ib9m23pC2j9Bv7sKCJXQDkkaGRjh7NTekGXTPbVQ32HOUnNZvAU1DQOnVZCMBgpyaqkHtpciqnLHQGwfz1FE2rzDjf1Anoezczh3HLPaZi7yM4t3fssQCFc1XB6IkFfVXnPazm5cAbGcyjLcLnx7vt_zixui9j0ziFa-wZBu5z75xh0xPMP5rZaiaRmECivH0-mnxtbKodNgxKAWdJ5HdyR2XwhdBCdKR5emlgNbnPC2hlQMVoD7Xw4cqrfcaTk3Ak1JojGyAJ0DRyi5aBgF1MxFw2i-X-rQ6RmwkdtqjqoakDkBmDTr02DBXCrLlPucoJ5SXy5jhpLqr2fsqj_JI-Y-JeatL-RXpYx11c0YTnJPHOa9N8Qqnuxh6qKP0O6Omz_-_jKx07RzG88-H3dP8lZGSsgaM3SIhDVIUJQtI2SDE4LYwTIzU3Yvid0T8a4YIsypJXKsP8tkHfqNO_T5JzAXutO08VnirrVK9K-UD2ZoeXLbwBkGmawFnlKDyue3K2phIO0CqedlKNHId17BQBOQCpt1qQ00wMHcymT-4cQ_FF438RhwDhsggDd_M-Ex21xnJ4S_JWnvyFaOEYnP_Q7ruD-QKcJuhIJ2EbFHRETiRL9zvBM6SvXLZ0gGvQzT6YX307XV8OcuIpadOxKyye0ajNzOdx2p0op9YQwlHYg9nflrfAuzItOGqVI4CmQwgIclccbAVJxkqFyihCHrUEGQsrH9Y-EIZKcerdG2pbtk4j_tOucphbyOPztrC1yNqsJgt-geCbu5ADQaENU4haGPhXpbGpSr1t8bCTV6RChZQhICwWty1vVW8wCATSq_T0oDB9bmi10IGVE1b1dgpm1UTjk2zCUTl43X-8BxudUt6rIblhOQDxOMrEPCkgnM9fPBSRjqd0H201dS1QYYTpEWYxCEPeHbHaQ1dZoJy2VxxgqpuRUQ1tFZO4r4DZ3Sat6gJfz8LOzhOz8mwpDm-iqvS5JCozLKIAuT_iMmjdx5LsuCnwDqBvU3_jGMpxHXqCQLVcgkyxo0CyVVNtS50tz4okoLJNE3bDHW5ti3u2CrhLAQgMYa5C69SX154ePDiqEb4siH7e5QDMKV3QNDwnRJHxk5gGIahxX8x_pfdc0EW6KHYvuXAfDfnwXONHokQxBjxIc-zxYRfqQWM6LhXfZOWxq9xrvzfUcvdFHEXoQWElKA9DE2FJAqMpdGKT5v-ZJsq1h_kMzWgUQor-VY2Oz2axUNtSgr9q15LHbZX65Pi4v2bRHUewFBmxxBCrz0Lrzmge73b7G7KKQ81EEQg6Mv3KvEiw6PSVVRsfGLNHMPRoDYTCTnTW7AQ0KatlZLjCzT-tSmb9WETnoogo6cEAAOtHHejVsC_5HPT5XPI43h9qHkdjwR6A2BBHwGackzLLx5_BsH59EunuLeKpV75R28AiS1S8hjopEslWPS1oA7UEs8Xjewnktb40ToTWjp2TBkNR6ol8gwOjBPh7YhF9NvjoZ7MjSamPQMZDTS6u7pwVdVuI06Yp6IE17LoOKluIFwfm8bncpHJaWfJgS1Q2syVpEpMt0ND4vQOPU_98sX9UtKMAyDAJGv-m-orNyM_YwKyrMsnDRLNpsE-wBl9LYzoEcXQcyoqE81n_F7zZxrYyKM4-9voBzcgC5V1iKR678.r88gc-cgsBFTKx_1-gZGOA',
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..vLgRESohqJOZTdEqheQiZA.2pOsu-ce0UjMQw5SGXsn8gZqAMAoZiqcZ_YB41FCuBr-mXjsOguIJlC_MHauC7x3S_KabkFR_gub5JNB9Gh4sD08Ke0Utq6-q4ra2ktiIl2tdo5ON9WC01O0cvDS8p5tmvYX25fZ1WFabxZ_vuyIaK_KYpzF-aV91Im_v8c2t--2z7S00yqcjjd5ex3DCTk0MiMC4JvMRQumaiLgpPtTLWa1YDQUFiIHlV2zJfLGgNOJWrc_Ofd1GI0ajuFKSTFqhRzsJhLspEI6UjqMGzXNbAvFjgBE79hrZ-TZvCP_x_I_vKjZhSrYf6JVchjRp9aEZgPnM0pHJSHePBhymLiCZYJ9EGpq36JmQZnBV60DItl4xA4fzBNJD0lhHou46swIXFkdHhc_Sl2i8FCTn_S042-TvprS4mzsTMWmRwhIVYr4ViC3PkqGlAXoZAI8M35ZTGpkFck4XXZJCoWIt1deZkCFhiO3tcQZXB_Yrc22qsoUlCYuIlcGMQUeuhG4AItWdc_IGbvSmsUGR-VcylxFcHrj3zS2U3yQ1AXAdKKwCyKTwO6euCpPJv8gGeTEtFCIA50ePtUky1hLvQSL13oS8K4BtrdkYjosQ8KDBUrXYIvodPVoNqN_ExtYJpm_CZalouJPvkp5wyKSFwPcaJVg-92-ONMhDT2_BZ9HQxyMfDb9o0seIiwMA9c0VVlFQHkuNydSb1sisKLOhqJ0Wa8USO7qLQmeqdGaEIz9VSz1vC1o_BsUg_rpPHQulmns5nvw0wgXayITrlrSc9IitcRQE6iwvBo8jhnA2lztHF-sAyVRTuac_qh4rCwQL5zd6MjM1PGoD1liFUEyUCuTOkBzTMpFZUk4y4iKJeSeKm3DZsWbSa2qqRpgntvpB5ALeHo27v2yeREmWxufaU7qWt54lNW7STcQDRzTCnCfIjzIxVdKt4tjG_WKAg1509ZOHGBjCiBV4Iqme-JZ6sKkoMGlTvOr0XlTbY5BFFLxBG-goxDQ9KlR72hxFvv0UR8Qh8DeaUl6x411riL0ZZYFwAMz421yxv7fz_7Tolm-uOtQo-UjIbYNBaI5ATtvnBGVkx7jQU8MmTg-iF0TlQZjDk6slWOMY5Rw18jhqu1z7bmysn0a5wyRtXY3pR7yl67vsiNcM6slnovbn_DFGEmbGZbGr4xhVKdD6GgxM3SEA4mMgKzld42XGxhSOtZID-LGtc2uhj-ftCyHKLVT6JLtiZy8qau_paApRFV6TTuhHduag6u_6ytSroZF9QW7SbWM1rm5K0QZR93JukccxSe0ydGEEfGW-t3VAls8CJ6lY9k59bLvknL7AaC7gUU5moAKcz3vQbvq5Jzux1D44WjwtLkoMBk-1haDJfyMg3GG3v_8BT84lj5iaIFzPxTcVefU3aqKcejvGdoDQo5s4ZfTzh54gNUFKMFup9Ez0RbUfOg66vIdENDGl-P1bcoK839uTWmtIW9OeEotUnP_Ax9LBjg7BVQOyEz1zBx8ZQoksi6tHg_eDF914dYNh0GRf-DtNSKUq8zwWkB4sgF0uWm4Clp2S_LpbaaQUWmbNS2ihIJJhik8yhMK2kH00TSlu5QFY_eoQ5oFItJ9ftl1eqEliJgl9M-mYABmVAp13NBoPOJdqSzYU5P3lt8RdU31myMXMxK1tNTNGYtBE7H8NPPZfYp8VESR03h7PB0FYfz5RbOl91I6ufUtmwq5tn9OqYsmPnQTFlezguxxQzFIm0CQpCnovIXLd-HeLKKrOZ1vMm-HeTomYcVbin2DRBbL0EpCnHwr4HPuu2RPPPLt5IbrR3cSIWXAlqQFy7llqZtLQfJSrg9SFrgU3FEYOGWoGBeCgA5-NVUrrj6M6LH8V_7t-AFHwQFuoc1xEtk3Dl4EGWl9CQrsbYOjNyXEriZKUjc8u1qEuFDmCUbOpEFHJEl-re-v1V9oSGeASwomcAf5eBapleuyIbVKkuHyerewHob2HLpnNAxF_5XvVct7RoMmlMP0S5kNqEdq6UkJkbCXCTV7NYAUPpmdieWBWt9BWAk57d1VKfZIrq9WnhNPLImo_Rt7rrJiPT78F72FFwikXSWnLTXW31vJN1pINeep1Km5-ghpmiDcwI8iRbHXIfeoD3iX3GyIQ6j_Li4jUNdFBmBPc2YN2JEUHFSi4R6sgJ0ED5u6NREuR5kR5MlLgVGSWzmJko1GeFw2oOEqWtdhCLGPcfP6mDKDn0AQw7OL7UdzVXqHWs8XGLm19OZrJEOik2Gj-rxkfC66I_dwnYfowpYeumpcWhPv6k7ObK6GYGdG8w3OegSuFdpOhF8l22pKlWVJkYpXQmyqhtbpMWRop77qBWyjjli3vlYYCdjr8724Ijdh8JyaVH0gODatYUOjxrCKNqUJm2tiCDEVXU7Ocnw3EexqqIgOO9PDRMfx4OGmpdhSyGthZlgU06EDCjb9f7-xA5hRU4LpkULp6_nDVec5OHTVXZ2xEIPm6ldkTMSyF7NmzunNpIqwlsHIoDXPyRPSZ_2nfpv8b7pr0hUNtRpDZBgP09KSgf7isrwBG5pOOvyGGJ1Z9IA3vq298JS7ysodrdyv-ke-IDwUfmG1F47j41gG5DAmnQLLYP4A0LxiiqyUxippnQJ0pwcGYSbu_aE4wL4iAYLFHjVFpKwtDc2Y9cFOyEo7AF-YaVxf3OAzUzEp1iYZFoLhIEjJSgfX9ycjz52LM_bgPpjWekAavtuSj2xajwUGw68YEscgI3ss-iMqaLZxmTfA5uxXQb0-HnDzN7MCTG-PF2DsEB8DacdrE0tzAQVcze_mkAq4T6KB1y1xEtMfQCBPg-j5xnoOppZWgHcLnnEJxo0LVSzzkOTzNxf2WAqQdl_u_scPDJtxyLVsDanGwla6uOadaojGpMjuaXMF7M5W6qvcJk1Sf1S8JRuFyH-9Rk2a-xvT8c7phYTHmcQ2TD5NAOLqdIDcy06hWqgQXdY3f3HS5k_7TS_tCxEFJEJz2p6VJMxzlunS0KUsEkffbdnifccDvrIbztl4FX0RnZDsrU2zoQsaqgpKp9ad3KJ0tmnXgZcxEni5-rS-.bGsQuqd-3JHuXDJVj2hm-w'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksREFMLEhPVSwyMDE5LTAyLTA5VDA4OjAwLTA2OjAwLDIwMTktMDItMDlUMDk6MTAtMDY6MDAsV04sV04sMjg2Myw3M1ciLCJxdW90ZWRQcmljZSI6IjIyOS4xNCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IkFOWSIsImZhcmVQcmljaW5nVHlwZSI6IkFEVUxUIn0='
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6Ik5PTkUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJjaGFuZ2VDb3N0VHlwZSI6IkVWRU5fRVhDSEFOR0UiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIwODowMCIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTA5IiwiZnJvbUFpcnBvcnRDb2RlIjoiREFMIiwidG9BaXJwb3J0Q29kZSI6IkhPVSIsImZsaWdodCI6IjI4NjMifSx7ImRlcGFydHVyZVRpbWUiOiIwNjozMCIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTE2IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE9VIiwidG9BaXJwb3J0Q29kZSI6IkRBTCIsImZsaWdodCI6Ijg5MyJ9XSwiaXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJmYXJlUHJpY2luZ1R5cGUiOiJBRFVMVCIsImJhc2VGYXJlIjoiMzcxLjc0IiwiZmFyZVRheGVzQW5kRmVlcyI6W3siY29kZSI6IkFZIiwiYW1vdW50IjoiMTEuMjAifSx7ImNvZGUiOiJVUyIsImFtb3VudCI6IjI3Ljg4In0seyJjb2RlIjoiWEYiLCJhbW91bnQiOiI5LjAwIn0seyJjb2RlIjoiWlAiLCJhbW91bnQiOiI4LjQwIn1dLCJ0b3RhbFRheGVzQW5kRmVlIjoiNTYuNDgiLCJ0b3RhbEZhcmUiOiI0MjguMjIiLCJwYXhUeXBlVG90YWwiOiI0MjguMjIiLCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIiwiY2hhbmdlVHlwZSI6IlJFSVNTVUVfRE9DVU1FTlRTIiwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxIn0sImRpZmZlcmVuY2VJdGluZXJhcnlQcmljZSI6eyJyZWNvcmRUeXBlIjoiRkFSRSIsImJhc2VGYXJlIjoiMC4wMCIsInRvdGFsVGF4ZXNBbmRGZWVzIjoiMC4wMCIsInRvdGFsRmFyZSI6IjAuMDAiLCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIiwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxIn0sImZhcmVTdW1tYXJ5Ijp7Im9yaWdpbmFsVHJpcENvc3QiOnsiaXRlbSI6Ik9yaWdpbmFsIHRyaXAgdG90YWwiLCJmYXJlIjp7ImFtb3VudCI6IjQyOC4yMiIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fSwibmV3VHJpcENvc3QiOnsiaXRlbSI6Ik5ldyB0cmlwIHRvdGFsIiwiZmFyZSI6eyJhbW91bnQiOiI0MjguMjIiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sInlvdU93ZSI6eyJpdGVtIjoiQW1vdW50IER1ZSIsImZhcmUiOnsiYW1vdW50IjoiMC4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fX19'
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
