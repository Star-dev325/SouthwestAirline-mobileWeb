module.exports = {
  changePricingPage: {
    paymentRequired: true,
    refundRequired: false,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: 'CHFUMN',
    header: 'DEN - IND',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-02-12',
        flights: [{ number: '1150', wifiOnBoard: true }],
        departureTime: '11:05',
        departureAirport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
        arrivalTime: '15:30',
        arrivalAirport: { name: 'Indianapolis', state: 'IN', code: 'IND', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: 'K' }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '2h 25m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-15',
        flights: [{ number: '1326', wifiOnBoard: true }],
        departureTime: '11:00',
        departureAirport: { name: 'Indianapolis', state: 'IN', code: 'IND', country: null },
        arrivalTime: '11:50',
        arrivalAirport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: 'Y' }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '2h 50m'
      }
    ],
    passengers: [{ displayName: 'Unaccompanied Minor', firstName: 'Unaccompanied', lastName: 'Minor' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '838.36', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '856.16', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      newAmountDue: {
        item: 'Amount Due',
        fare: { amount: '17.80', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      totalRefundability: null,
      travelFunds: null,
      remainingTravelFunds: null,
      remainingTravelFundsDisclaimerText: null
    },
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '856.16', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '769.82', currencyCode: 'USD', currencySymbol: '$' },
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
            fee: { amount: '57.74', currencyCode: 'USD', currencySymbol: '$' }
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
          money: { amount: '856.16', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: { moneyTotal: { amount: '856.16', currencyCode: 'USD', currencySymbol: '$' }, pointsTotal: null },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: { amount: '439.08', currencyCode: 'USD', currencySymbol: '$' }
            },
            { boundType: 'RETURNING', price: { amount: '417.08', currencyCode: 'USD', currencySymbol: '$' } }
          ]
        }
      },
      seniorFare: null
    },
    emailReceiptTo: 'x12920@wnco.com',
    isRepriceNotification: false,
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    _meta: { purchaseWithPoints: false, newCardHasSufficientFunds: false, isInternational: false },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..eHcwKsukxQDqHg59U2f9xg.EOt2g6pIqYksabsGPnLZBEpGrxwlHtk18XriSxi-abHAg2qwe3wQEBfZal6rNozP1Y1eL6JwYXPJ0V8TEHKgRlbGWE-pLFFDXVpdrN5FO2Fq0kUlQCUc2_MixylmAAZ7RK8XG-MeYXPDDUmOxrhYgfhTBro1N_QE4m0dzxCj4DuzLFN1m3qclJTQR-bGE45gvP8Xfb1SZZf1Uh7EIGJjc2KirTL891g0SkqwWofiBid74T4sifr8hy-eqCcjbojRyd0RZYr-oRGajClPLgqW8VjVe0zrRvOZqcXl-CZV7fd1RWko5LVs6RsT_Yfq4PAmUHKAUw66WJzniZ5X1NhpIPXQpYlgYJymoSzL1TKQBsRuLwPecjypzJYo7Rh5TcnliD91y8H7kmMilcWarCb6dlIg5tUPGqt-EL57b8ZSh65-g7iZCqVnq64Hyr1qRP-llMvohGmwe5U5DfQI3V3YFUL5XXyCX-STAyij8IzeQjAJhzP8T6GpTK5WXueQRyNi7dOZTOxjB03nEl-N9v-3FdO4R3B_gP66SpgFTy6qClr5wza4lgkf0lQuxtJICDermV5Km-AjlJoMtqF8nA_A4wumDjIoG4n3SdNYUvzMgfP9CnLPybHqKBcHmbipTXQZ6NCfioYBjdK4vGlpTRaDb0TbSPiFqRLZb5rCLw7o24tpxhp2VPvZMtH0x7y_dUYJSI_jUdZ-oivjP6ys8zX3HXV65tUj8cbSKB8EEaeWOV-IuL-1Dsy-uc9FjWKTg7oie4c_Wdf5jnQakMsCZw4UIoT8vHBiIlHNuSNPnvSRHcO8GDGIFa9CIFnjZqytoFq-uUcWDEnWMCaSniPzNMPnRdfIu-zpHUWw_rrqYmfPCTKXbT5Cr9oSjF2gDU3T96Oj6n6oOxXetWpT5-wx5EM4w2kdpz8IhpZuca399Bl0mIXcxVgE6jehcmMzxq6VNmqrX5iaStybtvmoAWeKl6kVFO7ATJChMxIRYH3DY33H5utUJli9BuFkbQlyMqL0lPUdWl__7aZjZYT7s7ZM4kjGFpKPX90d5Ixa4cBveQJlLCMNgdXwFL-GuxhmPWkkz78c4ToA6Qg_qHe3wV_AhrZjMgN1j9oTfprqlE-7YFUesYnqFp8EvqUcZuv_YJLXflXyLpzSzxswkeXAQbZ6Z3vntNziOjxBFvJyeUHA3KDg8gFRJH-vvbRTVGsyVh8HP2inAnmTYj2K2gXGCKNnslP8bYL0Oo3pvbozZ1vr0BnEbrn7FazKjq0PjbPaDT4kbRuTNEQLsarkmMDYxJmzpBHHdtIHKXUWuN5DiOifYqUAKVqM7NbQ5Q072N2xppG4xH_aJ30htH4pGHcskCRD54zRSidjcAs6UMwobP2U4Enyw82BOb2fXpQ2vbK4Gshe2XyJWkFJxR5V6-MjoyMpUHX8Pn58ZejvgJLcP16XvQXsZffWZVvVyURkXZZyBf2pLNnF4w56WhPpo9GjVDQzZX6EZUiImRJCTNBKRsq5-DpPGoJlPcrEx_LeF4vTDTAq407gZnVnKrXY-Drux9vRpXJ05rb_5havBKDK0WfYbUt6lS0ukjWGmTdU-djNjQKWLgK7Rxf63hU-PQ5PX6nTmu5vPKD7Cxdo6xygl7x-Nm25udUNjwW8Q88p1cmN3bnUlhbUlLVcuQbzplVKiCD5v49zF_q7vc0Ivm6bj9vbFixW1d-G65QNb1IddffPw75WU5OLBIs-Mel8I333bZZ5dJ1L22DzofX6d3UykzJjYOXxkM-I67nFf8nRbcWlc03e4IuptjWH98xyoGCgktzV6WZwBCbHoyk6IcKM_kBwAF3rHS74HX8rXTbrSgPYf9d7tXzCnrzda8RmHNFH57FxWH_PPpNRVyrZWNOjWyC5H8lxPRr_lTJcbKN1mN3dBPpKP60lb3UTOI_duHEqy7sxgBJX56iKohIqB3jpV8t8hovlb8G8eiO7gB-L04jpyNqJfZ_RjQ0rr_icPnzN7yhGykyFbXhAgnRqDIZwR5tpfyvYX372sxaCYm42fBqeEE3h_XRzH_L4RF9Jktmz2oQiuNUeZk_6BCcu8LnGS1eRakjhQmIZb3s6sWSbq3IXmjfRXTg0L1D6UDHxRYUuHrNX01jBCaHMadIapXeZPW0j9saUFMhhGQ5c-VdFRMjosV9U2e-2UNpsODk-4bFTf-f3dRg6VeYjOYqLhJl1l2kluwBZi6aU5nFx_rZryRkilmvsjP68pRkhxzORSEkhYCwiU18UQ6TTG7x0o7puP5IJNcQMc7uVwY84T21q4rXZreoh0HabyDxIMsbqNcBGMpGpvNcSLHo3Tb4i4ArcZDL2ZR46l5TOkUgOzAA_n-ZNgiO3h_-TO-XJPORV0JehFKnEDjLloc5zVvkpYEYHQHCaa3B8VKM9EHeG2uif3GnF_2qBWTD908dVguXkF7jON-zM5OTfM5heEcJAaZYq2SFWCnMxkgvpkSJCmH1ubD83b0MlwtCHp212mLAjZdG-h0qJuozvMLbzWcENs-3Hzwqjvcge5oHGDgvEMpROcostPHJqZ5oyi1a4fGEMamugwI34SrVzPLCTMPWO7uOMdXYY3fJuOiwNOKzEHHioIeLZX07yHAfKr2wKS7r57Szm7oYt5q3kYKQTPMlvYMl_o72bmBPltE6ToQT1ZrwXaz0oxcs4_H3z2E3OrWnM63RFH6mJ3gNkI1rjFHl4bnMuB1WWs53m0An5cm-IHorHp29Liyf3qEvINn36TqUQ7n1ZCFex1E-3SrqoY7i99tV7GOPd45LatGmG4FyjTfX6tS1jGHowTv4RROe4CEi3RRac_3LwrsRsq_DUWDj423UY2Qo6gyzHULxeHGKv__TjegnpPnLAEFIgiSUIckmVLvTMMkhRCoOL9Tf0c_ruTK96ddO300dedYa2FKHiP-uQ2nvgcdS-dNQ0RI7gyT8Wq-SrfOdCrVC_TKf7k7lz8y3_FDjtk2mx1xA1pF29ZQ2r87XJrbDXXKaDhJU4Mzwleay-JlqXtyUdBXZiZSzzrsUgL03Qhr7buibvhOaUnwe0udlsN0RifjQaFKBEgB3KlCV6GNPFWbAYvA.TOQLwGMuAWVjROdlqd7oJQ',
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..O-dMdoWXm_HfdjMiIh66aA.Ibx3UpuGoKSAyo3oaOMKIiTngPTmz5O4z2-GTwoSNevQTYjQCNJYN5FaMvcxg0wYURrp9AhA5U005qD45EKU6XgROJzjLzduyRZp6f6FOpLbcyuc_HjvkEKaXa1GSoGmEzxbqpf632BJ-U0py-lwhDeoDaF7u_Q35dHmG-weLeOKSOzhLnXPHprJgnUa1j5zpg4sXTmk37uTfOPY0s2wrNATKXvlYUljYAH72z-jZxRssqXeWoyUN2XRj-O-fdEx1HFA0KzUrD0YfFpKGtNao3AX7tU9fDbSGhNqWWNAfyA5tzr1eZSbV8SuJaLdK5FqeYCzEVIpMgITzcbmp6_cNP_e6mNwh516upnaAojWPR-DPd9mflEOiiKb8hDoqCacWC3nJZJ61FZ-zu-QUI-L7k2xTGAJwwMQFHWD2kGvf5Yne8zEtor4SNPIKGrdPSQLIa-XtK5GV5rjaIVkaZWLbO6HKl8t9YUT4SH1gnzSjFQLoso9VxXAhV5UXPi7ln_lyyLK6GBDRKA_MP2rH3hBusy5-6Kc2KByEvahMGHXRaXnnJGPr4Tj8_QTTksqTwZorRbx-4Ww2MVlWZ-JOqOx5ZfJf7YhLu6W-8QZKuycL1utpdHbgXL-t1rikLadDY86f0AlfQogdXRZ6QN4y4MyFv7fsGhVhGsDAnGCF_udefEE6hHD4576TUyvvnUi9JzhW6fjMqgPgS9CnLgDC2bC6PwZf3cVY-fsN0ndGn6lKEQo7VY65w4FK0Mkvubc06mYIZ45SR91VJrH1rq7tvhIlgRnwflY-HhrTsIhGtxc0FVvWXNcQtyCpVq-eJ-ksCyDoHdGhPBpYffFhV3dLfkihRDpoXOwV89IcXc0HcKHmpJpbu7WiZUuBrew38L4-0G1QGbEV7KBr0nmq54H0Uts-0oqi_6VApBs0nEY92uW-G1JbNlyTtKNAyP4V9Sl0qDnbJo38eal_po8GnLFUMpG6ipAZru_YPYmrK0bnd05l2aZDkGLBhNtUHgaZ_NhafVfKi9i3blEiibbH6XPF8OyXqJpd96XqsSwuD5fa0U9oph1buG7InVIjBwo2Uyo85JY6pEu9_9-q36B73QsUI3BJfDiLEZnlnvgTMT8O_0gjg9AurQd3CVin8wx5IECbgsbEDq-pyj5Pv300d9qmDbe64x9xU0xCPf4DPKLAoE8ucZiVXEvesRz51UbAvUh6uONyRV71Dya_V85egweDQJtTop2LUyQOOT2Vm7ak9jVbwyi7aX1tE_uEzcu-S_gPoKKCdWYv4kdkYQX2eaj65DDyHCm3MEPq-2bV8rj_aHsjzR6WLye5rUNNJzTe5kFUFchoLoewZVZCxMOCo3wO4JU1Xd8PkzKMehZc2d8hihofYB9tb75PBmRPdgUyFRpoqAEbyHfXwXdgNfAVMvtwrIlHDQQTCU2Xv-ZBKzpumMtNiAijoI0aQ_966mW4O_U30WUvemcsmmP82gQsmtmGRKPWMoqlBpgnGAwBw23Z99BzABkoHJjHj2g38lIOwFaTFfAyk7CCFUZOpagwd6zO0ve-4IwqIFTCbp6W6ovExyUz9YFdRh6ftdRRqBoMzOA22dpCpW2-42B9rS_cV0Le-Dheyx-Nrtm4Yh9XRkxh_mL-vxuF5dKTfB9b0Dsehjx2A2ilYZ0nhc_RJVIRK9sPkSPjg2cVA_NBjMwi5wC02C23g8cqVDOvEzcg69XVBV5mrkcMMUcpEUN7Nkdb8IALyqP9LLjsQog53udaldP7Dku-wpxc1JdxOnnMwN_jrVqErhbsePqGkos6lyX_KGIWkaLm7raZusAXQxfhHbx6kXJH24fo0XOvMsW8AZgkd2Wv7EuqZ4cCddsK0Z8ysJNVJe6K8Wnt5A6FmLuc_gZQ7-filkgBrXpeGL_itpCcJ21iuAPUbp0N9lkiSaQb42eoLez6MTTZ4SM2IPrwh8By1tBqq1eajBUgvdvre8IU_aqwFEg6T5qAZ_LatKP4gQhpBsiY78qb7I567lKEvAjVTelogqgHqxuJwuU3IOZEaKmuKo7P8qhncfYXjqEHMDTRYsnkwkg6WAuLxyYs9-Y_ezr1Wz5znxYe4PAm0AMeEG0fph43w9ErSNdW-QCeSYw4ILHtFx3Qv5oV59zEt49FAabZ7_7U7qCcHESTr3j8Kp0Vaw5MmYu143RdiyESbo3AxSCJUuzAIMJHkIO482XRup7IBaYpHNTr8HFImHAp_oYtXBlbAeBlNWAqGyk0FHntw-NIRhwJR38orpzocyuiy6CfP8m2PYZbHJ5Y4B78Rx8zqtAh2wyPgod_1Djfdc9pCHN26ANsA7koVEgmSJqdw7wATYuHL716geCGfG8n97W_hXXlJx23zFD4aCteAHxcTolxFvJVerrsgYYEkD72ZpmKOvNocxAtao8D1e-wiDH8R_NYmWq0AY-tO43IhZdy9Jza5ZTBNiLe_JPgdDcPao2qap9LMGXXFsjFrUGLN71uj3Jqo7z3XWGMzNtfKKwV5FW5FYkkauFK-p-iWvTESoVhwTBVCYilq1JeXw0SilEQ5snsPf0Wosl7Nsn4947bGibpoZ2bIKh9Hc95MNp98AXbrOC6P2e4h3xTV7jLJ-I5_RoUZTl1L6GKqe-kQp5spMjCGjJ9KubIj5GNlpKWmuH-PLkuyimJbnCEGjkoXVWjG0zRjq8gQUITKRKJHCioFcEUN68fWPYiJXb6r4d-EBK2OfYHbY3fdp589vtmVDDqonNNi7ZUTtaxgajukR_mEFfOXvfag6ATWHvgdEHlGQ1hdwoVTnSH8J2BHgqa2B6YmWN7ux02ma0SBlomoDZ-wjbae63i2uoVo42hcyU7jbAcb6BXLWbqF62H5GArkjqKGUPrpMjIcBnyLvxAC11eeqAsROFsdSvTiXco9MQA20GCjtRAh4-V4cruQqg1JhDUyzTYoZQ7gd5z7K1cPxGmFPkBffVIgiZljy4yCF0XjZt6w1Z9wRVbokEPGSMZqm1sjsMVrGGJCXyy4zY6KX6kCDXNqIbbkdds7eYHHGteeuzWrxEAYJeOmC-B4hUIksuve4vLKQEXh0kUEE4itQkX3FZxQ.2xek_Qaxd5Amj2MrlDHgCQ'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxERU4sSU5ELDIwMTktMDItMTJUMTE6MDUtMDc6MDAsMjAxOS0wMi0xMlQxNTozMC0wNTowMCxXTixXTiwxMTUwLDdNOCIsInF1b3RlZFByaWNlIjoiNDM5LjA4IiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiQlVTIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQifQ=='
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6IlJFVkVOVUUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJjaGFuZ2VDb3N0VHlwZSI6IlVQR1JBREUiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIxMTowNSIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTEyIiwiZnJvbUFpcnBvcnRDb2RlIjoiREVOIiwidG9BaXJwb3J0Q29kZSI6IklORCIsImZsaWdodCI6IjExNTAifSx7ImRlcGFydHVyZVRpbWUiOiIxMTowMCIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTE1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSU5EIiwidG9BaXJwb3J0Q29kZSI6IkRFTiIsImZsaWdodCI6IjEzMjYifV0sIml0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQiLCJiYXNlRmFyZSI6Ijc2OS44MiIsImZhcmVUYXhlc0FuZEZlZXMiOlt7ImNvZGUiOiJBWSIsImFtb3VudCI6IjExLjIwIn0seyJjb2RlIjoiVVMiLCJhbW91bnQiOiI1Ny43NCJ9LHsiY29kZSI6IlhGIiwiYW1vdW50IjoiOS4wMCJ9LHsiY29kZSI6IlpQIiwiYW1vdW50IjoiOC40MCJ9XSwidG90YWxUYXhlc0FuZEZlZSI6Ijg2LjM0IiwidG90YWxGYXJlIjoiODU2LjE2IiwicGF4VHlwZVRvdGFsIjoiODU2LjE2IiwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCIsImNoYW5nZVR5cGUiOiJSRUlTU1VFX0RPQ1VNRU5UUyIsIml0aW5lcmFyeVByaWNlUmVmZXJlbmNlIjoiMSJ9LCJkaWZmZXJlbmNlSXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJiYXNlRmFyZSI6IjIwLjQ2IiwidG90YWxUYXhlc0FuZEZlZXMiOiItMi42NiIsInRvdGFsRmFyZSI6IjE3LjgwIiwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCIsIml0aW5lcmFyeVByaWNlUmVmZXJlbmNlIjoiMSJ9LCJmYXJlU3VtbWFyeSI6eyJvcmlnaW5hbFRyaXBDb3N0Ijp7Iml0ZW0iOiJPcmlnaW5hbCB0cmlwIHRvdGFsIiwiZmFyZSI6eyJhbW91bnQiOiI4MzguMzYiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sIm5ld1RyaXBDb3N0Ijp7Iml0ZW0iOiJOZXcgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiODU2LjE2IiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19LCJ5b3VPd2UiOnsiaXRlbSI6IkFtb3VudCBEdWUiLCJmYXJlIjp7ImFtb3VudCI6IjE3LjgwIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19fX0='
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
