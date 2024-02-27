module.exports = {
  changeFlightPage: {
    messages: ['Hey Change your flight!', 'Select the flight'],
    selectionMode: 'SINGLE',
    boundSelections: [
      {
        flightType: 'DEPARTURE',
        originalDate: '2018-05-04',
        fromAirport: 'Boise, ID - BOI',
        fromAirportCode: 'BOI',
        toAirport: 'Austin, TX - AUS',
        toAirportCode: 'AUS',
        flight: '194/285',
        timeDeparts: '15:00',
        timeArrives: '23:45',
        showWarningIcon: false
      },
      {
        flightType: 'RETURN',
        originalDate: '2018-05-11',
        fromAirport: 'Austin, TX - AUS',
        fromAirportCode: 'AUS',
        toAirport: 'Boise, ID - BOI',
        toAirportCode: 'BOI',
        flight: '1732/2021',
        timeDeparts: '15:30',
        timeArrives: '23:55',
        showWarningIcon: false
      }
    ],
    dynamicWaivers: [],
    _links: {
      changeShopping: {
        href: 'v1/mobile-air-booking/page/flights/change/shopping',
        method: 'POST',
        body: [
          {
            boundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..bN8Mr9fbptHQ8AJP48RhrQ.7iQVgfFUd3WQeRSKJwrO4gwUcvTdswRGPfDJxyj4obMctWTLzt39APDnXQOMJjxKihcQCHXKfk00A5gfE8in0mgsda8cv8sAj0eeh8VDdhyWhj76T-PqSzreWSqkpet2aPiRMa9b0FiiEmboT0XKikZLsIaNmx9Vt6Y5fQ2KzsTA7CSaLg4hjw-ozhOqgXT7jwLUf25S1GPQNx-ZaYB07NKv7fkTo6mUCYEkCJF-pxDRH20bVn8ceiN8wT3qiIWzB_3jRlIGIigVrnOEklqdq-Dl33m8y_SuzeIL40YNwjaf_bCtvVr7rVDa9z-44KUBE2IwM3A30sb2ASvm333XJPBNIbcl-4ExZ8N6hutrMJkJ2rEfNaXJwRAHHM1GXI4YcZLiJBYL03caNAWahQ6eInWU3RPB0A-ox0r_QNyZobz1OG3ahsq5oiN6nveiiUcJuYuZDhUZsdJ-FqmTJwDPMMZUFhz-Iv51NChX_884wKDyuVD6Bf2_nx4OHB4c7uEXM1Qm7Ho33G3y57dgCxFKre0h-rc5WWdRVQtpXdDwrVIJsRAby4IZLiYm1QCQK08nkProKv5JpcBHBsHU1XJfU4kcri9719a-k01XfNN5sulRzQ3IYpY1t_N-QcEHMSUaDHQuB-2_h2KxCZvGrTVBjw-n_o4BYk3f29LHWfqEkBSwqUQCLtqnUWWkkQuI14ZYhj4ZPr4u30eM3EUpYzaEHpWh1hi_D3IArGkTKtFzW2WOmSd_cqMqc363jBxHSOsKo2sUmx8iD7_3do4Uuj0UIWXfLWJCm1OOJtvBBAHvwhpR5RyMjcUb7hsUniroIoPLLNWLGT6UybOC2mgs_mhdK3k2k5eOByHERBrYA_VqHD-vo1iZOLIBPJb070LYf3fjhGHUBYWSEoMoVhwWSpOizCcRRXo0dmwPhsJHT_7q52iQhUNesyhzxe1IlqYVIAOF4hnKCcuOKCTGea8ijCj4k8UIQY1_RHtzhInxaviUerotsCtMVS69C87SoVdiij0ipHXeWydaSdt70Y3BNo72_WOWoR-ZbW5JX1kZYKnvnoq583EvJCg3h--994Ut__UzgGU9ut8ylVhgzkV_EmZhiOXjC-IdSlNl3k1GNsvMUSH1sgKpTW86Td-yw8Jzvgiqq3Kef-lh0NaN-OFmJu5CSH1szX7zQFDaWnQkFA2d-2jJDrb_gqcBOkU1_Du1tfUN8d2YAwjYQrpGMMzdzw6ieJe2VNN5Gm1oLNCsjKrXtfVMJYXYyJ8IXOK0UjSwNLuQN9C3BqRBdltT93CfivmBUovt5E5XACfcAwGStwf5Lf8m44ChiTVKnMbEp-OkV3C5HPrHxl2oXj_Faxv85u-Dx_ANbNPi5zvDgOQmzYOZAukTVITtHCgilh_y_9SQ_4emhVFZ980F8rLaVajVMyRzTlnDhqqdCGTnS9CDX3oLRZPsHyAk9IgwvyZbOUEmrEdGjiyFy9qpvwR6bwsE_jWNUlIvrhEeUm3wh0NkO9EkUU_u--uSPjY6PTSnM-NTTXPl3uBEM45PNKsf4802_3gWpds7uwdGzh7zDgfdbXO6Ce0lDe9Ii2YAggv7B8faSQJU.zgdKOp_JOekmKd6LYwwrgA'
          },
          {
            boundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..-xgSlRCmoPEC9m4xLHlDuA.50rmVlsy8Hr8ZZCwDpn6DqKq_N8PopW9kZm2KxXx0wc0HTCBJpudH9DVUN4EAl3kvkD5o3j3KXJ2XIM1nV2s9nQvm4tLVZLK2e_lpl_oXSRWH5H8C9U2Wdy3VQGtlvD5tFVy1_xE7eyMgy0wHygzDdgB_Nin7lHkJxdYv2V73ZtO7Qr69jnBu5I724zo4EUrdM8UHwDqqWVHGi5BOcYTwrPo64k7HvQ3iT1ciFMRc7WCerEUju0-zhL2R4MlKCiEp6uNPOret9Ge0uwS9sPHE6GmjH6KtTRAAB9hkg0vPlZWtEQ1pSooyZjnsrt9I2yijTwwZgiwRdoH6ZUSJIpOzPN1zDTr8U45q3sy5YGT5W72gl-OSiUnHSppi9c572z0enfWPE9r3GlmtrP00q1zq198X6pn1YRL5t1cKZewdcUQ5eONVTkQyV5kLMHsjne3qq0KKv7bDUGFBA6vd1rMhtZxA1hBL4mVl10iEJLv64RbHlQmzZ97HZEwoU8TA26tgioDAd2cJqqqPVaUJ-ujmF9xcvn70WN3J-Q-fEv0QB-9K_hjTSg-RUgsmkKf6sjR2fBdfIpdYk0ASuTFUAw--uV6lG6TFtVDpdTKrO0NyMNRFVLsOAYmLdkAj5svSq3QLarK2rhdPxle2v6AI1f3BBLHFn5Y7yUbJB2RlTIxkfFsVBe66A7-R8cbHc7e6ufSWrc-WdGffzHQnaudlvzgNFW2q3-Qq-YDG6WmgRrgXysq0M-mwE6C4bZZr0n_WHo1iXmAav87OcMUa4eEqsU54VqQgJb0z8L_pqn3VzgE2_ZXvTvR_AKiFiMnHRzjm5OedWOaLMZRyHkYb4eF9Yt_LTwAm_-AWnD9lOFv9fbdCeKgYWPsd2tcBISFO1v4JAeqGEFNkz-TuFi-L3cb_7H8OkYK81dpNmwBe7L8jju8MEULs99M3K1yorIHVAKry3xTv7yXDwfXwVQNpmAaJh9JSQ8P3p9ush8FQG0huqvsFzmfrPCN8mmSX4UX4XTmvNHwH_buVnjVVst6ZnNwIx5WICwy8hoAcRptOchsiWKr-OXVcvmmCeS8DBMAd3WLSy2_HfVCDZh8y7891PhfOYkNZLOhjjB8Mel8Rzm7LuYWJmJtLsWAmhsTtxwNBriewPqMuJjfJ3zt2DTmNj6BvVrBFurI2K_SklegQeI_Cvi7EgxcrvqDVKAXRd5mkTyJ-dCwtg-IEgOk14WZvJ1iH3-TNXC7OTuODpeK6SL9_T9ebR1Aj1gx6o-XaiUm1VdvIwX1Cn62Uc4GK3RSr9yScVOn6M5Yz0J_8doM00_miahTZekUFmfyNYPnRJp8NxKnSHHOgMmPVayp8qGMWH2Dq5xQxqU7noziClJSffEbiH9optW535Bsb_1BzxifRkRMkEYBGZ0SM3x8tQzkb5ZjwDzZiQcAalyrgrlcrdvTli2-P6LXIZvfcpbjZlgDCYyqkk9GgwWwDPlNQQ9S7FV0XN9e5D2QwlgcG1aegUrLMNsif3zi5NChZZ8C618gMVKpXgemm-BCwmXIRX8LXvSbkFJGnsXyqqszoVsELLGxI10qk317Hky6aQ885yyChbIxm0tE.f9JRb9581yNnriU--vHh6w'
          }
        ]
      }
    },
    _meta: {
      hasSenior: false,
      hasUnaccompaniedMinor: false,
      isSwabiz: false,
      showSeniorFares: true
    }
  }
};
