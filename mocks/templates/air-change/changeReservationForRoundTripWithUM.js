module.exports = {
  changeFlightPage: {
    messages: [],
    dynamicWaivers: [],
    selectionMode: 'ALL',
    boundSelections: [
      {
        flightType: 'DEPARTURE',
        originalDate: '2018-07-10',
        fromAirport: 'Dallas (Love Field), TX - DAL',
        fromAirportCode: 'DAL',
        toAirport: 'Austin, TX - AUS',
        toAirportCode: 'AUS',
        flight: '2367',
        timeDeparts: '06:00',
        timeArrives: '07:00',
        showWarningIcon: false,
        showSeniorFares: true
      },
      {
        flightType: 'RETURN',
        originalDate: '2018-07-13',
        fromAirport: 'Austin, TX - AUS',
        fromAirportCode: 'AUS',
        toAirport: 'Dallas (Love Field), TX - DAL',
        toAirportCode: 'DAL',
        flight: '2556',
        timeDeparts: '05:30',
        timeArrives: '06:30',
        showWarningIcon: false,
        showSeniorFares: true
      }
    ],
    _links: {
      changeShopping: {
        href: 'v1/mobile-air-booking/page/flights/change/shopping',
        method: 'POST',
        body: [
          {
            boundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..EM1ZluXp_OHT0nNCJc31Eg.4ljDxFiXfPH4wYuKI_qT6uvXDyiYKkFWSlQpk3yTwhSgLFhMiDcMptUsdkyJAUK-59z1dcwV_PrEPZBzebhgkqKkMDbR6uwPC6PL0Q9M5PSr7lQGtadXvZBbRw2m_77q5eI3BqjMSJro0R39xGuEJUBe1Ziz07gQP_DdI4boXqbp-o2AhwF2-9PFEjMsjN_QcG6i-Bp51JfqD8SY21ypJcV4ihC8Kdm62RZwTomwyVcG6gYzYafHWglfpA6DxNppeuTg3V12Amqh83qKR43fZqCs7tRSt1jRV9GuPKDrNmrHgnRfxHjpX0_fcKSmYB5SQmeffMrQIEe63AqETw7v_CpY_QhqRj1Yn1HNZ15ZlFZlpfKj6izJCRL5qatYKwg_kZ2_n-exL0bKc5zm9YvKbd6JF8MDal5gHPbE-WVXz3kF8zhzdMLX5cLGsMUXG9FzLya-wtek0vN2Ja4DjjIRzDKVcbbxh_7vFG1WYKykzbaVfvrHKTnffeIhBUeGnGGMXFvTPYp-G0hLk-TuhjvNKasxiuLkpxujPAibDyrwxhPIm0GLxD3CPoQ13mSDwuUvTuU4oT3LUvAc5OHxT_aRFQ1R7Xy68EDKpqJUU3KRVi9ottijSqC6yhmyfOTZZ24K2GOhUo5QWSiWazLwAgXSY2Az04ye5PQ_4pXPprCDF4UmWrjQ4WNFj_lxwsKvYEWkTRBCh0hrYX8kF76VVkzfgxugsNj3UF3O9kijmA0amVKjwl8mN2uinT5YvwWIG2BGy-LnoK_N5s8nZvs24hsXRRvTdFtoYMH-Xow3vX8yT7XhAZeZL4p5M4SKyU7YglfGGgwatvzaa_H0zoKaSbSKwTycbyn4XlqDmAGxhyPgBDKCqxvXPGkEyNRHwGClEnUTpaZInFYdfEapswM2josaMuaor7lo2F58aWcmwQ4-Em7Hew9RxaAt1S1ubUmFW3cf7H88Z30wS0mSY7JG9HtGu5UNj6G5JhlYnrfiUBQxULKWYn8_QBjj8H7l2Pb5AJ1PYenijrNrjiX0Ut1f_JNE7BrYIjo8vEjIVPNMV6Nw3AentC1mZsMXJEaBKvdevPXE6whRp3QlbX0eyGjq0MmqPPMVChIy6vCpnZU1NSfj9mY2nqko8-dNqDg5PKXI5CQle1Hi1nAY2oLhhlGOVq0mqPsq-NutJ6tMdZdZL9y_ZheUXzj9uqldLl5T68o7W1bThphX83pCvyHthaBNDr-8ZvENdt1N1fPhzGqR3MSrru-_-_6_pHTJkNL646VDHlaHagQQh5REXrb47lrFuf0nRmpiN8uqz_Yoa4W9kwd1RaveDgCD4b2lZoSWgkJcwyS3BUXBgW_Q4WVzYMBvcg2DAw99prD12J-ALuP-910_7XokhJVJA97VXbZfiu4-80z7PzOw5aYxqHJdFtPpa3QMJLE3QVIBJwjyuFg7Jls6E1YVTDJoa2CegmTx4X90rembf4WSoorHPaZ0TM8TXIG8A-FJieIowtwZFZW-r7pWEZvHA3sJYlqYAQ4IrwjN-TrVEUeQEzuCCDvbLSzwGCKqMOfFKTwXYHNFLFE8nmVOUsNb1vd3Qtt2NpUYzhttbFUERWR89-nUSfDJJ_JE9PxlwWQ1YnDw1QauIS3tCaiduYbe9-NdlhOECaf3a9Ttc32GNDH5xASU19RB0_jawqvbTCco9IhOM0uCLJ_2gwqkj0gedRGQb4Avqp61XTZ-G_rFKMC9Fm5Hr61l0OgILpL_fKNLvn8KNTaNT6VavjnNZICGGa5gAm3akOWfy_Q6ZUz3tH5z9NrbMQq5NzoDTOdJhOV7_7VHRA-7l2MOK9k0Y0TOQuNk49CgOOHafM85MF2NR0fuI_27WL8Hl_nhKL7HBGKuOIZt5g97gCbzwV-AEiCWgSQ0PM46AS4uOTG7IU0caIUXKNh45ysE4zOCDQX1cs5VGithu-BJA9nYOPZDs2ennbX-gx_nHZLugUkcU7kCU7dXo88pbA1AFhezDhavAZktZVnDA5qgc2Gri8XDyZuxsHZXmBHoDzrxOOrfkpWR24BCBmRM5b8CK16DVMEzHQfjWP2VXHtjoJZ5ljFPGJr6gpHe-q3Knbt5Yggst36ffrnAgzrwoMp01EKYXIGpfIU5_phdAWPAk4e81niOtqE9doLbJUeh_90Mb9uzgax0OPNwXPxWoTvEYD9efrpP2FMLd74ibPXnDWEBl7N7cu_PIL09qadPWQsHlGvEvvXQv3Zdw3PEg8yKw2HNQMXWMP8jaOzcuu-EtN-nF6W3P1popmKxv-XoxwIQFfbQBGb6jggEMmW-oXT2JNZP4ELfaEyC2rrou5QsheDGIqepuoR31UfCbBmDf2ZAZ6SG6UO2XXxqiWcQmYsrvMvWWDYc3JghQUh6Jy-YShHfauq-uGS97ndisfG5SlGFtXFWeSSt50XPCrgEuDCj6_qaanub3w.tb0IscuWRPzD_vNaUlJY6w'
          },
          {
            boundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..JeDRfFMQKhyLprz9a8UtDQ.fD6WFdvMrurfYW45ISObSdDVtZRPjJeSScgG9-NMnAXRl6ODYKGQXPV7zW0BmbEaXUTyu1DYuHGe8wXXb8MOeEtLndTII3Mkzr_eZfBtY5kCj06roCrH28PtYHh-FMfzF0Nfbjsgt7ol7EFO2BCs9PDaUtrvwQhvrqHxjVEw44hnjXBYL52lSAbJYC80M0ZCnzPY-4NbXohCd4e3nVapu0IQ5dMUQtgj2r-I5nJK4E3etsZ9x8qxLzG4eIQTVbT6kSi0ePgaWxkmUcD2NVYtolHDSUWRydKZ44KwUTKP2pJrut8SFDEmobLuI6RBN-p6YgNSybHMkxIJSjyW4urvkUybn0mqXmzpwT9vAWiIpXFjeJPSF_ojw9KMwjBRqB94vIqpLaTVGzIyP1rPVqElYAVB9iZa2lLj9o-xZE5tDYzhA9MafeUFnG_KoSS76fe0QULXk63LVgJVAN6-9oEeJ24uPWQ6TSbuLNOIrpXl1HBhH3fal9IjHUWjtJAxKmVILqaY-QZDHWgIBPmop2jNyZSTsl6Cf0WI73i-QaME2IFt7KiKyx4UreeRN6RNRemXtVHpV-7VsGVdvAkq4IsLjwPXKAjcgFvhtjFrhXm1fOXxQGC1TgNj1YXYUHYFWJBU9jmV50o6D6LV08UIVjCp8gABCqSUuYJumqq07Zv0bUrATzXs-e5WczQejAMzGxayO1PCPA9BnNG94FHvy72FFwu7nMqDpyv3Hn23zENHSKqCN6E-B2HZBk2jymHllpD3EHk6EcgVbECrLYp5-IFBwicsIO6ZKx5WDKiXo9kk2bzgnJIrJ2BwDhOEnd95-N9o5dbjPXAr9zJuuzPt3Cuax7T_vWGHjLPUv6V7-06O1rCf8TdTBFqB43kRxxKqGnJyL32m7ecUUj58orBG19vtkxdlMQsMI5agavH4BLbSQIEWvZWmmDZkQ8XjVjHY9694RMCvQpi5njIUEkkLrkrFXjbs2CF18WQbQzDjEy9-9PZF6rloFawpUYP7bGSXwPgV4spgdunE7JMqf1clcbu_E8FdV_a32G_kdtysEdtUgpxrpjulGgyqw05dPQxB8xduO3TJUwGcoEGdsnoIv7UIRnxc10eitYw9aBlKAzqYabxxz3-ddyzKjGrYE6XA3vYkb831FkIE6stQFeCMUSAWw8XAYzfe212Kl_cLTjdA_M2052ctKLpxpIvWzuKpAE9Au2f33NKzJVZFTrxFTzC7NBbXXnyUZjg3IwEBpOJwCkOXgcCGg6BtWZ07Cp1Awm8r_-N6MZq53QWWggb1q2iUb5rmfAOrsIAa3ry6vmTq7WdpJxs1tkJzWWff-bXKHRznWAQPrZ1Vr6TVenGi9GAyjwgvcRiILD-jWOgrh2k870USHrgpimzkH23Blm1v3bv9L98WH93QNjTuL4Dx7KzFs2rwg3gM298D-Y8nTfDEMsHQ6m0XHzOEJH5KAG86wqUmjXlSbtNh3VPeZhM3y8z-OSJNpF1KfP0VxroUbvBVVuBGLWQ--5Mj3YGNyNWfJbzfEhumWNhAuXeoNOJVUFUI6sFFHr63ypxnMuMoXDenimbjwWpLkLUpP9pDvsRio1702Klbg8fl9XrYXD6_qFrYudpc42Vl8ypqB1Wy7BL9KA5VuAb5ua35GrI4MxfDcZKK7vdp2eASmJLf-CqaWCpsLXGyN-YKpaUwWtEtZy5CSNAWoclKa6x_4PSLyV71Yzj-7ZQUMBdaBpvMyT3sMu0KeiWoj0R25lqVwu2v3yvyeHcAnskw47157_dzJzxk0FORN9VXGp2tGE0BqX8RAFMc_3MjDVTc1x5iG3wZW5UB3FG3fvPaEGGrLUrzQdF6zE9NhaA-RJ5KyVqHRQePfT7IDOd3UTzFPMsmykLSHqfI1RMrYJN8PmPCq85pofksRonWKoBlDkV8IG1IqWhQuKiSx-eDttSWQia9Cz78D-eqCJhQelZgIRA6iup0YJWKDDYvFqwISpk30W-EDzasm0O1f3fQCv5bqp9nhVK54sZGVnZnOd7Aw22rFVl8hAw1l7q1jWJh9y__QT7JguKr9L9bbHSrZpCKiDaIkjvGug0I-QGPkfk1wLB-F8UZ4HKFRmDdqbW2hBJaZoXMSGobFiJJ_9USrqKgNOUqMLcB7xhmskkRF5WzKWXW56CbNx0HiwXTQtXYwftwjQ6XH9K86MPgktwRc8_N-AqHso8r9SbtpTHx53LsvGsuDskYHjAA3azP4l8mHW_TWVtKxpS4GCucxhwMVr001lE-dewkRn-po5GbbIvGetxycJtLGl3_-l5U0LCHFN--nXJ5HNwQZ7wl0IBC-hBAlTu3Pd6E1pafrGZosxNIsdGiGmVH23MUeYVVX2pDw1FvHnW-RO9KCO4mQ2BBlLEcnYQv5EX04gVh5j541QKbF0pSIf7xYUhL15tYngQ7k5EDDdcA18bwjOWMUg.0szm-yH2P975ize_XKKYzw'
          }
        ]
      }
    },
    _meta: {
      hasSenior: false,
      hasUnaccompaniedMinor: true,
      isSwabiz: false,
      showSeniorFares: true
    }
  }
};
