module.exports = {
  changeFlightPage: {
    messages: ['Hey Change your flight!', 'Select the flight'],
    selectionMode: 'ALL',
    boundSelections: [
      {
        flightType: 'DEPARTURE',
        originalDate: '2018-05-21',
        fromAirport: 'Dallas (Love Field), TX - DAL',
        fromAirportCode: 'DAL',
        toAirport: 'Houston (Hobby), TX - HOU',
        toAirportCode: 'HOU',
        flight: '65',
        timeDeparts: '06:00',
        timeArrives: '07:00',
        showWarningIcon: false,
        showSeniorFares: true
      },
      {
        flightType: 'RETURN',
        originalDate: '2018-05-24',
        fromAirport: 'Houston (Hobby), TX - HOU',
        fromAirportCode: 'HOU',
        toAirport: 'Philadelphia, PA - PHL',
        toAirportCode: 'PHL',
        flight: '1817/1911',
        timeDeparts: '07:25',
        timeArrives: '13:15',
        showWarningIcon: false,
        showSeniorFares: true
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
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..TasIWmsTf3n598ZgNOgT4Q.0MPkM3_WKhXZkKu3BgV8FDqPIynsQE_Ro50y3UjzUcmafBTatndBglzngwXx17fR2fXLeSxrAvIv7YJqQ5hAijhzbDQdJGQtcOppdOgwBeNpyZyyKjUywkMkOLYzEurVeSt7ZiZtJFmjRtUVpC_BNqPhx770cqlhhY-WZ5gJ0S9SX03PxnjRemsTJmE4E83XdHJY8V5JotqTeisNRVyX4E-OtEUs1sH-ybtzVWmQV9Hg79K4JjCdlsif9h6Q0uaxt9t3myngvwFRZwxkIaT3N7D4rbCwJjy3DNnH9YlN55toD2uuIcDMNRrKyhHT8emJpDXv0vqkx39hJSeACCz28FnMFp4GAFWHGec1802cMwMO52c1_gHDD6oOK6BB1qOsyqQV0LefxBxFtU9eXRzCQ2Jlc-I5uh7rqkYCB1X3inSQN2TJ9JHrhzEyLEJIYcIXSFKhnGEvO9TVLCSveRa276XJL25M8WT3SGLWEJN4mdoH7r_QDnqY74MKMzzzp_rOerYAFnRtEzrMwU6w7y4ib_rvp-2pu3JD-lusIoCK3mZQM3APX660ScfifLw5iWgYeSPAfN8ELVKqunNYJST3T9FTcCmi0OGJtMQvWlYFt5ZO8MT9RMZ4gveLzKuj3LPvMSf2d8mHSRSfc42ZxHuIFfLKqP6hVupc7Ej5v3PCbjLEaOitKvPTLKbAwk1ofKnHlO5Sodk6nLgQgLsN0VFQogYozDnC94EnxYyNBeUApC27GULKcIUwkj078mby-ejQqU6FDw84ccBm71d68cMXgljmvv-b9FxCPfNAsz3yQgjjbRJMzpUnNXIhe_gkFgpC2q2dZ5Ds1wubwoFrhNz1p5LEtoki7B3DPgm_UXMg1bV4y__xIXqnC_vjcdIP0YE5uXsudycav61XcZOIioneCASLAx8FBKVLG7gykFuf4w8QkG1TkRZk2VncUkaSD7aDFqiA4YKkNQlT1z1HpQijYo4riQYG3RFZGwrdBbqdNc8MLjhbzYjOd0gJoDrDDuiRKZZasNtVMeHGDX0hQg6CFe7USwYF9UUKKMYmDiEO-pvHEl2nQoLcKQPTqpbnHXQ1Ul2hCMWWLLUQjfODXgAKKnBjmmQ5SXkcFtqttxc-JvFBsRGFO95kyU7li097y94glus2WAfFaNqa8bcaiYUhFYVs1SrQ7OClNIz1468zFDeIdSChP-2jdcBODoK9oWUHLK8ZIN15ldYlzkToV637F37KBxyGr3defhNh7NzZ2LeSVRo4YkkiN6a7niIevV9Sox9ZACLz4UQ6eTf5CpeeV91WMbsMTHI6Fa_bgaCK71kFcmp9f1-QMS9uqOBh1KgmMkhY-wZkU1d3RSEQhnDW4H8KosJDyqzHj1HmKttCl4U98g7mj4SesSuytss0KmBpoESOPtnmvBE-IOZRttDIeueFdrSC__epZWHajFdZ0x5fnk85a3enKQ3uniiHqzNNExC6j5oWmdaA98yACT06ALKp7ERVKBFk77mQRIPEIhOyOvomINVMG8PlKjl9xfUltFYiAf7B5CgVsyNRk3yEU47GzOetoZqIcs5Fgss8VIJJbe79sJ5Lgt9jLuoiyFz99dEvBfiCsiB0bR0BRx6Cvq4JCjohNi58wkQKTobff6HagPYAbhGIqIrmcYCBA47-ebxUDF0GxU8xmRuG7JtPl2Om2AbzrGbQbXLMeIVgd-Aq4cATAJYcEjg5loaD84ZISqWyHIZFrfYIJ_HZ_5fHSjXq6lK4GQ83vohTjc_fptv3it-gUCLegbwp-a6JA1iBcp5eZJ7jdzrshkrP8OAg8kZObtzZYiFuzxSsRwHyPmkzFYlbnABdSMy3huQk622aZAQrrhA8_U-YuCaCf3eAgA5MZzWcFeu5i8cpnVwJ-b1OUXpQ8kgRql4lcg7Qkub5_YCA6jidr1Iig86gBhsC9kDEyfeSgYEmFJDu8N8ax6jG9uCp1uyfNBAkcPZ4ROlq-pztskJkkb5mChcn0E6bHwvzK8kBcak5PMPAVGgDzLzdBqIGYI3S4tINkcjXGwGv8ZmNSzWumFntfM0H_O_gcA4pG0YJjg5HFoD-1LIm6LbZYbGotuXOov17I-55nb2IQsLuPfbD-y_oKd1Dn9CsZUwdE7i75TX5QbR4Tmesw5qQArbuHJZZ78ZFrt8wvwNc_kFt-_JnYWUVJZG7hEny7AM4MPjqRZTkeSE6GE6ZGrlk95NuZBEgKTjR8G22IeTUqpC8vNj2KTBT3Y4R8OaqXw4itdXyadjqFk75joNCvRCTxJwgkFqw2MNZ-ioiVhH9Ok6SZ88BCgbdBG_kIFnD8nhEmVvFu5zmN3k9tuGo3F2Czrf497xDSNjZ05LeSxnsaOf9XAMz8Vs6mDcvfFmBN_xGEOyhsDBc9cxFUtam-84VLbsC2G2kbHVW7J9da1SkecKz-uANZ01vyR7tFJdR-tZmR_7G7nE4M6qrQl0TxVyI3ujV85_J4dVcQiuOqwK9DmpGyz0udIbl76so6rMe67vFYX44n5g3fQpjlMutR20.YT6UxMOUmP-ULwR67VPoew'
          },
          {
            boundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..8hcBSdQS1qNYJwcULjGDDw.8HxLwpoFRmoXGn3AzzAt-E-qqNWoktGEjN3_W1kgNpSqTviPHGy_7flCfLMpDKed-WR-iz8xcZMQvCa8b-xsMxaGyHqLHxOvamzWFVP1kNM88eR9OS1BXzIF1Hmh58XJ83DWIPfUcAGCYuPXubw5pMt9fRp2xywKDUkGsEC-g09Z45rwBEDOt_k7uIBmI4GGKHl9LEMJbbPe9Q8By6Bvcg2Q3xobzxzlSvcmwTqORtwiK4MG47GstSE2bV3yJiHNmfZL-WCxh5y0b-F01Nf2mUzxGpD5mj2S-JVXd_antvhnurZxQ_a9LRkx_l1ZEFjURZDQzMF6HW0mpySZKLPGeHRUZdTJ2-WkCrKt0IdnRF4EbpAVMDgmegWx87bH6ULWc22njLEPc9szUi8gbLfGqf1XBZrFm3AxFc6_GQz0X9GdHajMuK8nyu6zuUvj2S2T5ctaL0ldUasr2dzP10yAmWxeCzi_u0RQeSqsh4V9CuJ8LqDWoPkDJ-ED1vnR4FGzVLF06CCmgeFcYg_1o3dz0hzmITivJ3MF8JUTy605bvpN_EU-pbT9VHYHW-IyFrRIxG-Y4TtB-4BKR3YdOEewJdH5bje64zdDFB-xLFDkGFeviLOHSOkkcVLWnGnyHKaDdwVdDuvWsRR1Jq0TYRXdBXelMI1cyZePIi4BWq5TPEDByHsCN3YOopbBB3or5lO6L4opxGJexK_8SifthObbDQZuAaGOP-z3we3jQ4YliVk5RxwOXYj468FrLdZ12qUOQ9tF6I3D2BfVN0LB3cJ6-guph4dLQSbIF_DmIVBMw2CxB2F8xpG7DwYVjRPW93CRBoRbV7dTwRKMAUfsTY00IQy7z_9L__6HzFeVRPIgsu9iJ6X_F_hpxx3WJmsC7ymPSNP-w9_chcld0IAvyp9llXmA2BcO2hGEcRG8tAPRM4khaCA-eRoawIFvzDRuIX8OhwXIXEW6u6fv7NmfUyX2x-5bNLK3uKqh07lDBEq_A6R5xgvXfSe8rvkAKAJMmUxHr_KyzyEMPKPy3VvztXwxVmy_ahIo4TGkax_zF-3KTHUZp2392M4KbTl9mZAGwb7FGA5Sf_pUGWtnJfE4RSjtYXzF77NLX0xG1n6noWyXPLqHQIkELliBnr4wa9mSgWkL7CwnVVU93aCX96iiZN2UU4B-WQVWqx_XjvjHrvgIrYzzW1XzDKsigl96HvE8P9tOirAvud6hJUAJXlnDGL0hQsAcP5Op2cv-hzXyYxPcjcjaWJa-aQ57GI9i0LrPYWsLCIHfphC-w8yfkpCVmKe9ePrXz4jLPhd_Z9WDHUd7twcW87xijHppWe8VBxC8aUhGapRQY67IJz3YvnQihBlQuaDT-J2BEMZ5oivzQCkOsWfc_2RsFFzAbt6JuDJXILlmaGKTyU2cJcqz7Y_84JPvHoUB-nOqk1FHQergB4VIe9nVwa9BZFmMQuWxpmueoxznSE85h5WT0fDNfDjtvglfx0awgFuMGYDCOlsW8yO9PB1tA5YUbmnVeFM-g9vJu_2GJILA_Aq_91UdA8HPG1OF6_8NECyhb18TGnDw0BDh82dbH8w-PEyun0oHTz513ta7NO-JbP8WdbHqjLQ2ARmQuEQqKY_dqKQ22-0VGxMH5HDUL6K0b_JIQY1J2e6o8a8wRkhxEdqOHT_xYrcPRgWvwf5ctPAIpgL11UPr4xF7HlxariaF_O2HHEDW9yooot6I5bZRpzzvFfTWlcyewGbcrL_Uu-g-Yxa_-41fGYMvqOdg8FWGPOajkx4FBMrH-htfQJ_lR5TQvwDvJ2wNUyPr2fVuAbx_7y2n93zckO8Ypi8QdrToCOEzkATjZYDB80G1_4vu__O9rUXQuiz5GaX76K_W_yI66fB4LXD-3HV2TcA2tPQmOBJiezns0emQt4yZgpsPkpd2y-wU3Z0VeewSXT08EUz9l-jkFC5MF9CzikfkhH04fAknDMDVqcjaD1Jhu2cxTsZ3VQTrXT1MO0ejHLs1kcGp5LGOLxkIA43oO2pdVDz2HgPsr8rqy2e-Q1gt-UAwulK1ksVZ3cSKdmE4rx5Oqd2iAoouASuosh6XbAFCrJyiH445VMFtI_aZ3VLMW_oQRJIJ4JwSGiZEAQujnmS8_s7KShUX7b4onxaHPk0kmFIRifyciI7sLvSd6MowD2RaQj-h_OPWZtlQz833uhZGt-7DcpdDPmUwnzQoM7gjMvZt7990WATMsotJGBe7MYfOVZXGraGeVKhJwfzQNYY2gIlyv1nEu9MGeopGnQkAw0ss34KxL6aVVCLv8w53KV_vmUogvw7_Mtp6Me-o-4HLOWqFL6yEfvm46VDa98ilXLDUk3c2llxL0zXfof2VctJESq5CC7ZqF7rZ4zVsZokJreNje-qQA93Qyrthl0lHaYR20kTwM5OU1uSeaMAbqCKU90svBdDDYRDrEmv53ctcXWTdU6w5Kk-EW4AsMjnxCEFoomeQnlA_7uMmmPWlgi2MueMekpZV14evbMtJIxyBX14e9Y_gW9eOUrRo3SVZXHISSqpP2YLwBk0JNU8EqYrdjbaqC2jcDBPzjEzNjB023eGftJo201wuvQHPKfD62tBRicWse1xoIThZtm27KHtV_ik02OfNb60eO55XPMCswqi73Ufx5UNbs--fOPrbc_lZjomcBMjcjX76OamR.WbSrUDGcKaP0FUHTv8wDUg'
          }
        ]
      }
    },
    _meta: {
      hasSenior: false,
      showSeniorFares: true,
      hasUnaccompaniedMinor: false
    }
  }
};
