module.exports = {
  changeFlightPage: {
    messages: [
      {
        key: 'CHANGE_DW_SUMMARY',
        icon: 'WARNING',
        textColor: 'NEGATIVE',
        header: 'You may change your travel date/time at no additional cost.',
        body: 'Circumstances beyond our control (weather, etc.) are creating disruptions to our scheduled service and a flight(s) on which you are currently booked may be adversely affected. To minimize your inconvenience, we are offering the one time opportunity to change your flight date(s) and/or time(s) at no additional cost in accordance with our established recommended practices.',
        note: 'None'
      },
      {
        key: 'CHANGE_FEE_DW_MESSAGE',
        icon: 'None',
        textColor: 'DEFAULT',
        header: 'none',
        body: `Select the flight(s) you'd like to modify:`,
        note: 'None'
      },
      {
        key: 'CHANGE_DW_DEP_STATIONS',
        icon: 'None',
        textColor: 'NEGATIVE',
        header: 'For your departing flight:',
        body: 'Departure Airport: Cancun (CUN) . Arrival Airport: Houston (Hobby) (HOU) ',
        note: 'None'
      },
      {
        key: 'CHANGE_DW_DEP_DATE',
        icon: 'None',
        textColor: 'NEGATIVE',
        header: 'none',
        body: 'Available Travel Dates: You can move your departing flight by up to 14 days at no additional cost.',
        note: 'None'
      }
    ],
    dynamicWaivers: [
      {
        alternativeDepartureCities: ['CUN'],
        alternativeArrivalCities: ['HOU'],
        eligibleStartDate: '2018-09-17',
        eligibleEndDate: '2018-10-01',
        rangeType: null,
        rangeValue: null,
        flightType: 'DEPARTURE',
        firstTravelDate: '2018-08-18',
        lastTravelDate: '2018-10-17',
        calculatedStartDate: null,
        calculatedEndDate: null
      }
    ],
    selectionMode: 'ALL',
    boundSelections: [
      {
        flightType: 'Departure',
        originalDate: '2018-09-17',
        fromAirport: 'Cancun, Mexico (CUN)',
        fromAirportCode: 'CUN',
        toAirport: 'Houston (Hobby), TX (HOU)',
        toAirportCode: 'HOU',
        flight: '308',
        timeDeparts: '17:45',
        timeArrives: '20:05',
        showWarningIcon: true,
        isSelectable: true
      }
    ],
    _links: {
      changeShopping: {
        href: 'v1/mobile-air-booking/page/flights/change/shopping',
        method: 'POST',
        body: [
          {
            boundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1JBgWGjHYdi9mwoZSjgsrQ.LcuoBI5JLW-F1vr9c2TP8338iU15iIXTMuS9U2WHtWkMQvF6qiuItz96Ma2zerwZcAUd-aMQ3Rz2upUb4qX8rTXjAxOL7hU_obzQMraW6Ukj44f8JxqYtDyQ9BF_VU-XpFaNlDgNkVvUWH1dLdoi2nP0ZPeQjSR6KYf3sUFmAS9yeV3aE0FER8Ld8q7UHB3z3zdJUcfysPsmLQVgr-G3QdoERHYKMvzr_x34ta88kyaca5_4VW69xUMGkT0l9f31ZZbIjGv3iS1ctF-eTWIfOFkpbJaaq8bAhZ0oeFiWegOdSpkrVBiPon6Iml-6bMh2VbbTMgK8hiq9awJ96dEYuGtV9yOE81EkYhq3t61Gb5wv8Ug1IVBjYuF7_LMQljEC-Nr_c2qOffEfDr2Kvym1HXMYr9X_op97EyfXQ9-8STFx2RswDr5HsH5LEdf1aFtMyBnan79CtZ96a-vOn5Dp6gQhVOqh4N72kpQbmZjleUCsV_egdL9lWF1-Hm2eE8HQots5Lcuq98wVVrqm_az4bWCs_rzKIJS78348bKZr7kMFSOkk4PUBMUfTdGyCSo60rMTeV7DO7uPoBx3dKFiGwNFwXZKRXtAl71XXpXqQYofTh02Udab3KnCYfGaB8bHU8QKLDJF73l-jKSIbSP96lCiO5QqRjOcCc6Sp_p48hX0stFYo38rNJnBfELZRL2-eyynd6tYV9TK6DM4cDZxoQQFdVhBN-EWW-iVkFRyUHXaaTnrbjz1F6PrQ4q6NIKaADHUo6OwX1QhJP-_96IlqJhbHWJCBDYaGSEo1jT0qZ84e7CnDA2sSiCiI9emiet9PJNrzUaVwlCGIEsST91K7Pz-zEQ90q-H5bsdwDG86bUQno4x909ADTiPW5tqSNjrE3do80LZO_TmeEZWly5JMT8UKD7lmxodJPPR8sCuqG5nBt0xHx8Xv2YCBCUn5L3AVYTFsBL24qt8JpQWjBf7drc5nIWxwz3LTWbPQL2iL9YBCdmW8Tej2JzffO3cnGo5LcD5yw29vWNYfaaATEK5NqSeUmPjRKvKPChTj8asJAAgQBGZem5LCWfXueCUNDTtdGs3MkfSeW0DRK4oTL5ermEOyHRKkURwe0GAnPfomYlmd1ZR-nHQWEyzlSDt1YIdI73SYsT0v8p3QZjq1ifluA8xUTK_rSss3UMwDn0gjCNyOWyBCakZaXhAJkwUeS3SDGnhLHwYXd20mWrjiNRLCespkw_HCENzK2wQ-9U6GmrpvCujnfw48KWjXDNwMdnxx0mQWigVsKOwMZp6hUiJ1cJb0MUkoYHPiNbves5dSuDKHUUmsDCHjB2Mvk04hCh1HMT4PCAJiZLD4LrNNegunAnaFXE_pCw6lpC0MuGVz1VUhKPyfo6ObWRPbGW2TzdRH0X6czknPfD9G-J33dv7hAuWQxqi5o7-0HuBhilkegttqCQzJcxhxH2EI1-WkkObSjIcgx1K5wePhCc7ByWP9geeKrsVPghwXwxNqw76--b54sNup_0I8rcEHxhMKE5aQFPRe3e3K9dPDWZYjZSBy0BmLPK_Xy7jvbmqXfuKAp_zxOPLn61oVDH06mh60ksgrhafRxZt2K7bs5a_Y-Rbz-l-Y0dmCrURlQaeuHYj0Oa4vBkvOkGMsfpi1G3jXIMTJUAtYR8kyLlWlZfdtKCz98Pb5TgM6bpARLZjKsBfU3ch0E0BymHqTbJVBrYMo9Ez38uI4Ef466DK1fORAxwiahoPwaKwVauRN5O380-PjVkxPelUDz-IHr4XHIuBa1uWz3_qNju1olVrB_DQAvnWbAls7mO6kspxp7Fl1VEBvNDD-glkZFm9wVu6q0DzDE8ZJoMdsGzgQ00NkcQZHMCZX_wRhk7I6RSdrpgO8a9ptROCfT-jM9A7ZhxBIEsZhlUvHDjcs91r8C2lGz0QO_K1mOwM6IcWsfZhoMG7SrWS9IK_d94bHtq4J8m-OO4z16knNz6ACzUGji0q3kAWLimXaZCcFnSSZRXg2xO13OrkbTw-PPOmIJK4TBNXMp7xJq4PKstd18mPGT3lxAXqh-efrHpJ2hDMTmq79Wbo2RcY0s9H57zvIbAEm0ZqP8t2F0j4tNLhdLgiYH2JnZ0rc8E4TIhJmcfPi_C0MVDccgqanrkExYsLzhVihMKmMj1aZNtsjcu6z-X27VveNMwPIFRGAh_Pn-zvfNjTNMZE-sO3ssW3kbUuyYLFSzW13gI7IM4XNc6Vm0Y-qghwyJ_9zcQsdOD_ySfi8aBniQBTayGOxeUcPwTAn8k3jG35Hgh4IRsZC3ttDHqNQbdjN2waTc-Bx9u-EHwkMqnYSDftbNpyF4NKgrUee3bJewW01A87pj0Kp-QGCm4ZZfspe2fqiM2b21gvBDzUL-qy4p5O9ayFdTvmIvR6E3Q2262Aw_vSqJ_aiNOzWTn41biPWaZa4bnfW80A2sFKvgiO3oHg81_YATtDQFej_Xsd_hjJ-efO5jjnYaW29jSFfzlTiC6DV3b-bQ369pI7Kwn_JzhugtMXMyejSARaJyvFIF1hUtMLDcXEPGP0y46Tip3RWnH2SuQtEz_u4PX_kfZPVpOJfDIPHjjLNyPKbZtP7TRqGYA2eMsQs699TcbPTDPj9Og1j8gO0Ei3IrUbYLGEF4P_xrSl6N2Pzo4btwYd0kKOGT4dG2p2AL9NCUrer9TuDYf8XQvCaqIxseXHvqeaYFhpFE7_HuMK6QnbshHgY08I94P-3bjujQslyjna_-lIW-BF1Zmli-DStL64QciYbwtD1fkjsB4DhVcJZ7WA2QrjRjdJKMtgOIksI2bHOOH0_OBzr9Su7YD4NZTh5h4ppqAZZUKSPCFje4Qibh-hWK-56ol3iL_4hBv05AlZxCtd1rVY4Z3SLQOtqI3ANAeESAhriHLYvUnHHKXc3-Qra40d6lk9qAoGJsvxz70urVbmbapAD4kwyPLOMTwl84wuZrqb156Fj2XM915NBevBFda742VUx-3SJzC1fbVZRKNWw_pfZd9aoGOCEq7CYtcxrk-CSgIA4hnaQmsewheOpn8PgIXnJp2sxXH7B6SLU46LQvZ6i0OPH27UFxpsQdcqwYsWzkzw-kQKELAEsOxL8fTnQRtvMMEmUlHdo3XzVEDg0hxfDZwjHaUTUwMUowL0A2DBAkmwlXOv9v6TbDJU3rGBEdibgTRQplde5L5p17TkFcdwp80yiWR2X5UAJ3B_TBI0Sj30aiWAcdtkufiwyrm9bm9T4ncDR1wBUbDmBgBzD9WMKtxeUyd1H1pY6YfqN_5FPMY2zy0c.Vsj4fmXnRlUhkvPlQ2-1iw'
          }
        ]
      }
    },
    _meta: { hasSenior: true, hasUnaccompaniedMinor: false, showSeniorFares: true, isSwabiz: false }
  }
};
