module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: true,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: 'CHFRDD',
    header: 'DAL - SAT',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-02-23',
        flights: [
          { number: '3352', wifiOnBoard: true },
          { number: '3651', wifiOnBoard: true }
        ],
        departureTime: '07:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '12:00',
        arrivalAirport: { name: 'San Antonio', state: 'TX', code: 'SAT', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: 'F' }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [
          {
            airport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
            arrivalTime: '08:15',
            departureTime: '10:55',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '5h 0m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-03-02',
        flights: [
          { number: '4565', wifiOnBoard: true },
          { number: '329', wifiOnBoard: true }
        ],
        departureTime: '06:25',
        departureAirport: { name: 'San Antonio', state: 'TX', code: 'SAT', country: null },
        arrivalTime: '11:05',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: 'F' }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [
          {
            airport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
            arrivalTime: '07:25',
            departureTime: '10:00',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 40m'
      }
    ],
    passengers: [{ displayName: 'Charith Tangrila', firstName: 'Charith', lastName: 'Tangrila' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '351.77', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '232.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: { item: 'Credit', fare: { amount: '119.77', currencyCode: 'USD', currencySymbol: '$' }, tax: null },
      newAmountDue: null,
      totalRefundability: {
        item: 'Credit',
        fare: { amount: '119.77', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      remainingTravelFundsDisclaimerText: null
    },
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '232.00', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '173.02', currencyCode: 'USD', currencySymbol: '$' },
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
            fee: { amount: '12.98', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: { amount: '18.00', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: { amount: '16.80', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '232.00', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: { moneyTotal: { amount: '232.00', currencyCode: 'USD', currencySymbol: '$' }, pointsTotal: null },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: { amount: '116.00', currencyCode: 'USD', currencySymbol: '$' }
            },
            { boundType: 'RETURNING', price: { amount: '116.00', currencyCode: 'USD', currencySymbol: '$' } }
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
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..sG8FLwOriGFcU0RMFDHSMA.awPTF4g6zMSDeSkjWVGHeA0TVu1YF_Tg7JJ4-BEgTq-4zl4trhMYovUZ9Gq3vMFUsOHbxxJPZzY_T_jfljq6xBHrPPdt_p0cN_xnF_IQiQ4K5gIycGv9bdTrO_ZJeg-99ByY68_tWZSOdemIF_5oQqXED6DlHHpC3xOBoroJq4TC16CLZnmMmACrsp0RlUUtYF2Pb7noHaFBDgwrnAdkSvHKrhelEACKjSipobGoTWnWavxR8r2nNUqKaianypIiF_t0wj_36z4skVtwBdUYdAEaA6UEnEM4QRwPlGal1LFFumCafahz3-dHIFRMfXItClxNzKbCw_cFrnI2aEtk8v6caCi3EHAQARL4r9DVEfov9W6hYkFhyZ2wMs4ndPC1WzUC74-_v2A954NTPOfIRN5mOv3HyH2QCTiYUqeo9T4wSRe5P1yoCdppvOBIvCxzQoHpTdygrZW0OAu1hK7VrMt9EsnF80iKT30e09u8H9qG0zgoWDHQ7ZLJWyHSG_3vqcBUJqvrvt6usTRdqGxealn-BjInChg2tJURxfNAsH80rtogbI_Hvo8zJyIE65ey85TS_me5QPfWTy4ZRbamubf9rxLkWVYVZ80MLTjaddqsb6zA-n3k8bRrrWi__hf477tZLJlTIFtXDTnDAmpBek3GesnMcBr-txvi7xPA6vAHXr75oiXX95DT20MIj1nFK-BGsZIjO-rTLrqw3X-lOCQPNzVZaH45vzPJXIYFnuz_XqAw6uDeEL0SfqCqsUGDJyzyTdPjcUh1TI3L9bG3vnucH17sSMzAL3yqAmdCvCCqnznt6e6qZvTkZzrbwR3nwYMQ66qt_ZCxM97m3GcX1IIXM4LRWi9YoCCBUXdXA2RHfJmACQkAeoal15oRHXQh_xPdEb8Gu50Ei5fziEnCkg-dKF_u8OghuWnXc6cyecgv9j4o6uSFICwRN4B0EKLJvJlhxf_tQfBNvtTfCB70zDg8eaURxhQg1p9Ft1YAAXhiG_UErxjxRNr23lcX6OCPPqGeMLmglShswGWflvpDKAVozPEPtXe7lSUurG4HoQAZvc-A3vWVIl4jz_JBWMbl5_vwAQb8vi-jPx2MMyDOcWc3YHPiv08A-b3Dg5iqVKpMW7GKhoBOgVF3Hrx3SsFiUIdcmTDIBFxE-YqizYha-XseCzI55cJeuRunhwtvUpaBVv7eqyhFFW3-9WQUXqFDBk4O2aIeQAUiFi8qZjOA2fzzIhw44IeiVQTQIUF9gJjIwnyfeUUUlKkawFwf_qJ1d2cTfSumf7qovFv58Gtc4bnBrk2U8MCRlGyMAtXy5wcKP7f-UrNfY3FYuiQSgNAxEgC3mC5mI2mJRLG3eiX3ZLxm4Wfcy4-lhinWgSrfMlrxMTHtlLlpg4dmzPXUhi5p1c5egTuzy0BgkqaTMHJ1nqanbNyHM0xYMrSxdnXhn1MJtBZbRZ7AxaWw1vt8y_tIwvntXHgLq4GRGGxR5idCgY2D4EL9zlGQU73EtPn7zLfPm0a2lnBlC2mx7ykXTUG3HO_nnHt3T5m0hfFMshZ0Q02-z6FowKQCODsrJQsyO_lrKHXyhmNY6bimaMjpzoy3S2jOoYliEmEHCjxd73m5oihMa-aL0fRId2W05cSt43010Z_RmGfFIf0giRVyhSW25gw0ZF_bZBOEU7biJ-9Zr0hSayUapWAAEZ3T-H8evCn3O8FDabhHlGCoehFVj1bMF9cwG7VDEtbg19zjD72Be90cQ6e21Hg_tyXaGP0eNvjo9XnjoyJ1EsV-9E4cz7hy8aIc4qN8OM5nHQKvf4olKhkMD2Bhl-IW4vBWfEYTiYBC1Pi_7TVOIKG0KQpgJABJIC1Ao-Slp7L3USDER6beMayucQtOtiHftmGbioZpMaJ3-OXNqzZup56Z9NHEq3CDZIfSkSIDAMRCaU2m4oEtS9yjeXd4sdnRgh9T9baRLpovKprDGKYCtAnQeze5ZvhlGhcO9ujlQun2gpE_80CsjWL55xUXn7oxupHgiCghNrARBbCLlzfSrkTKUDXTi_yntPfHxjvSDn0uxqq6vdOKGuxTbUnjgOTcQtU1zZgv3iGmuiKFv9qsHJz0IpGuknj_n-XkJeL8W1D0qLOaItZZ9aXMGFDWAB-Z0Ns7jxSe1vRmuRS1L8BRFRIANNFsg-FI4LoTUpkAxCJg7NHEj0O0dxwYhl6GinoJ1pg347MwIGKCJ7jIb3mL5kDGZ1Jj7bLT6clLBIB-Kq7MdQmWBT24k2fk9miNUfSqVan_78wlipS4kSANRL_zxN30f0M49txizjeRIjYq024wkWg76Uq1m8zHSVYI780dQlGQUu0fnQImrs2aJJW4Qhkcc0u8TfK1yl0vwonRqhMQGl8wrfIXbuvWL5t9AH6Va9pObR_CFCmAGlE7no9cZDyvFt-gvaynVWz2tPYJgUollvQYdUPyQKVc6kXdbdOd_znS4eKpxVz8Y3LMOwAitjyXmqccG3XG1Thh8HbFOAd5sahVwUYjZhBObwpyWsGIBNcdwWW1PONY7lUAQG5Tjx3p55PAk1GjzynO4mlVEQ7zH-88gtpQ5VedOiuxm_3NLzakRZ8UVvk5ECsLUvJ0MjXxNzXWYWZwqxTV0Dry4UI12ldAE95FkZmi-QxQlLOC-fMd9PbWuplyYetFAFftQs408VZ0-wBzqBZev6JjSFWhFMrTgoltj2dfBQzA9IfTJS1vQZ3XjwWakdbRpRosP6igDcqVHpOIFNi8h8hKG615nGNcHyJhoGltHX7q1bZLOSazjA1v13oo3A6aBtg4tboJdjW7JN6MYErEYs2k_u6Kxdw_J5QdAIql2flA18SyUSUMg1HH--RaQJgx_ZQyqIM37OHtt5QtZDg2Y600TVUDG8Fo03UESTfD69HahYbIOeVb2iKESQ-5drcs_Q6bCTVtBjTeNaciH_26SMlbS5KzslG4gudHmXyhi6Z2Y4_YShlGH5_ebFUlpm76yyx6QrCSV_4P4aGnElTLD_EEzPyb0deqZJo8XX4QYEH49cxxEvw4THHbv2ELC4o1vhk2w1TYQqZYSIzws-PIxh86xTs1XT0B2vFkEA-BS5D9swhmVnUnO0Es9ZlEsu2tFKIKJdmtvCZPBMhqtqT4J3IXJf2OvEL8u9nJ1NvnMsrgF6ogiLFpKk4wlrphJuu8mukX8h3IJDUoRrCxNb3GSwskfpHOYjby84wM6rPU_GHvkWHTS-WqB8xZa-MOL_FLhZrf3vV1CAn5-hCJpYO_wCaNJeTgspjHqeHt17lEfs0c8zT0wlWe3g6a8fi5P307CVgZlgaUKo8y3Nt6Blo1Tvsgr-hPvJyHk3WS2DEl0_0JqdMEMdWmX2DDbWdH2-AjW7ovUr7LAxGPkxUuv9JdAMLwqLmoanp_iCjTZs2jyy555KqhoxSzTzzBmTEQBUucJqFm91OluDPu5bOe5bteTXgmhyIivQNDNyzXxt9kDVesefurUVypEgDcfNuyJsj9ZlOwWeygp5N5XOj3.n2WvfwZhXP9T8UoAkvEUuw',
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..X7z2CmWPrwrM8J354I2QUw.NIwN3jL3RZ3sF_wwpNC1iE5XLCvFIZZdhJ-VpjVTiwyTEcomUgfgyQrU7X9A5RavBv-wgAvIdOjHl3eabWJhg8Re0EdwQHkhUzwY_cgCMhvdcGazs-pWE-FupHZI88i64_a-HteDtYcWufLXF9TgRMOZMqFmct0v36demtS-hFVCSm-7v8G0AC28mi9k9oT0DDpHz2NWcQceyqoArjJiW3s0W63Uyqjx4jdwQCzv64vpHZeAraXP1SCiKybOGiZ0Uz8BQGWKXp1MU81Q2CGvlwp_K1uJi7150dAiSs8Vxp_XFvCAZRdKn5daOvaGLor8PXIwQHINmnNG6NVsZyAGTjzrsJz8uHCcmozKYvbe0zyBS-FgBmR7p9Uo3AdIMayHwTP-bDhBQOXF_tT4unvnU1dyfQ9-n2U7F9VTWO3sSwNkqxvaTwg9vqD3hMz69cW0anL2v4Lsw2nUd4XrSBrV1gNiGG3nx9P0n_WCjKCiFjQiNLg0y6pzQvgEK83nN_5O2DE1NYCCC05I-LHNyPf8AGzsmtX5DwhtE8J4NBA_IyvcC7ezDAmSsbQ8vi6busnA7gOqulps_sqinGXxRjJNWXmhs-NKBzx1aCguTlpiDQ-P1Khk6cPBZd2ZTlaXZq_dqYJvieHtFlGcaBWtgAEOM5E0r20A_IzVGVdUbA1o3LjoUwp6aA7PJV-QtpDBzVYjJ6o8BUwPjJTnqviodGYnejL3KlvRb1Ozr2NbBKDkDzkrw3EXRm0AYL131fti0r-Ifh6NY95YBjjYPPYcVQnJrc613T870pr-DiKKGK6Kk5MOXJzed5MSb4FpYImGS3qMk9iWMwV5DvjPQj5K-6jQh4GzBSGe8n_X-RrtBHIPqL9p36MXtIlATMc_ThLb73SdjNEszcRohRJA1heWBlAQQ672eWCPl6kGG63ki8ZJawx-OMY9tzryAX5Rm3rhsa2uwgwqIfR3euvkUOL3pf5jIW5nz7ZXERU1WaIeREORa22IgAarQFzE--GrPCxzmD6aHvqDo7L-cWMguf2IPq0Gb0jJlbhYbqUhRFW4K8ss0DJplsojwmzl5dxZeMedS6ZqlvFAtK5wpZhptwgb5xrikwmASqzS3Hjxnth639Y6Dve-Zk1yy5zljIkmO-pOlOBrDESaXXYdI205zDSt6akbnaX-CRrtSUpvYlKyT6eoB_7mwl3mqTJPQR3nq7pN9W_M0XXRTFgA56kBLDFPtYHlKlud6sGe52f5TWLaw-qKjXc8wOUMgT5G78KVJUgALsxqHLw0MhakX256XK3sE0X4MaicLaCUNn33t_0dMNmVgLsCN0QRFAc4RWaXNuv95st2OSKkHEeyWETDKsvVO4dA2pxf9klanZoEUwdIcSg_n7dNCwDwiEcjTdZ8tpGl-RIa-dyhCTDaeQ8VfdAeKCVtF2lmtQV1QWmzB0xF2Gt-meQU8MxitzIAHeMaS1xYJIvq7xMdWNwafTmE7VZKiYGe-VRqp2af3-73gqJMBd7ZTcDnZQ5pifE3MDyYlttP4nH1dyMwmL2fDBShA1Ef_E9xUi5CNAw9yquj2cP9UhqSej85Ml6njgQBw_vjH0SvOp1HuPTnQZRKak23Iz0RscmelZE3cDM5z9NUaKKmJaTlimdjJ_TMbde5xnZfrWap4_RjGNrzIyrKePl5UaKDMLYPwUGVHMYS7bGl2FvxLuyUXzAbM5mxLPQgXpxFTZK_-EYurdQ0XS-QVHtG-v9b-NIHUB6cOyvO9jOuP9GR_qWAULg7X7ToJtdF89XGVSbd11bQ2zwDAK6wJVbp7NOILRMg4uIEQUs7kGjVY1GDLVaDJxsXyL3Cu16DeLtg9p2YLch6Dw9ndX8KvQXpIRZCqOsqZJQus10wGeMUYyWhneV1EFLbbBU26X3WzacEjuVbH0Eok5ILkBURuNzCwPFcYmAxEORfGc_hx1Z80EGzDXimNgguyYUYrNvx4R0CFs9md0Cr0rgdGYXw38SGtWDjpYTDw2yvzKJIRK5ObmxBoGiktVpus7fcJTyGy0fguFFR6vvnhPvF45h90qwkgtcJoNZZ2Jgz5vdLqBTVYO4Mn_VPBTyN8epy7w7uRY32Fx11lIuYGWsDw7ANuWx6nJPZ1UVbu1ihkZ7YhSVKVAIKyPpTP4X8lSoVVTI7BmGYMgsh7Q-jzSL9oRyN0Sw7njDUIvwUtn3r46YyeNZN8rx0vhyrpM064WIs9wf6Sj4avlA7rueb7oWu1f0DdYBh8ZfXvVJ5rH8pSGtuFs7TW1ybnEA4X5r6TtAvRU4ZcwW153wVMQSv7hdZdz0ESyYgIS9k3y9fZ8EHRMfrwvBG6KyQ_mOEMkjxskHnigLiNH9YOyMRYlel6gWrhF2Jnjo_XbMZnRaJVB03N1gajuPHw9ErEUAkFv4bJH1xm-Jc6xxPmum5TE7cLe3sGuvqVS4c-zDmhWiIPHKKh5YMFnxUipR7rOPsP3KifOYv5flZ_f6hUyT_FiB1ZfSGgtallTAtnSU7X6KQQIeS5iLa-a43m92_XJiNDouEJ4-UejGKa_RjTrfIlWIqxMge3AhwRMMwISRjFwzUSVK5Otl5YuXt5DJoKEg_gx9ZBZlDqA2_mguoRvSCKmJCZldvhXNAQ2sM6XNw3eST3aitkq-XH4fBOtVlGeKLh3yYfHc69kCFnyRXOyXLq6ETyUFmOHOoJlP28-goOTfIGISLwccTX69KD4x9g-98csVEEIzhkPtsye2Yu_A7TNA0jsk3yq3KyZSdbUCavQZR_orMXyiEPODahsi-QyumCzm2OqWdAtk0Fui95V79S3u9JWEHQ7MmR1U6fSUkrKYz70HwTbM-cwEPff7ig1WqFI5QOL1wWfXoE4C8BBHROZ1LslbpDolKgYl_IPqwvZkB8gFaUfapiwn3dsFZJmtcFicCW6sFn7oveYnF0Tn-U05kD57to2w-8tZh9LAufrrky_7VhEanCAt_TPW89kmFX0DtFOeZDDw3g31znrKC1gpqoxP6tp5tZ4qd9PzExrUO3CHSmWdSMnhUCmBrKNZgaFBVx4d2jaaraYJXXfSuI_NwRFdUd7_nikkrdcvdtOXMLHNFtKueBoFAfsmO6VMpX90JZEITjnCBsa8n9cshrmvY7Drw2MmxcqOP14LPdKsmeaemzwBkJMWzmDmJgRQ37aadzUa2AIaSX18TuiGFyyaGfv_3NGb_W3XVDPNe9khtiMMBDguNZlFRLGo5OQbjKhbHbcfNz2GY_jMRO8TaXUqJicarzBPBVKOFdOfZY5cmzkPmgNgx4HApBLcTCYKhOmRYrdNezFUTsqb0_6Tl6cYOuNuEfGJT8wGZeOKySVLLA7ZovX1DUu7HvekdnH9Szp63ckcHQuMw-sGGAXucfKGkJLSCrhlS1M1wW7ZO86opa1b-DNV3j_O5OE1pzXdrSeKN26Psv2lr_cqPyBjK46tR3jGINyrKROLP8onRZ5N_GAkg9aaJfC2Kiowccn94XeA.PtUiPlTqdmrqOuWqTQuw_Q'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEZMQVZWTlJPLEYsREFMLEhPVSwyMDE5LTAyLTIzVDA3OjAwLTA2OjAwLDIwMTktMDItMjNUMDg6MTUtMDY6MDAsV04sV04sMzM1Miw3M1d8RkxBVlZOUk8sRixIT1UsU0FULDIwMTktMDItMjNUMTA6NTUtMDY6MDAsMjAxOS0wMi0yM1QxMjowMC0wNjowMCxXTixXTiwzNjUxLDczVyIsInF1b3RlZFByaWNlIjoiMTE2LjAwIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiV0dBIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQifQ=='
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6Ik5PTkUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6IlJFVkVOVUUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJjaGFuZ2VDb3N0VHlwZSI6IkRPV05HUkFERSIsImJvdW5kcyI6W3siZGVwYXJ0dXJlVGltZSI6IjA3OjAwIiwiZGVwYXJ0dXJlRGF0ZSI6IjIwMTktMDItMjMiLCJmcm9tQWlycG9ydENvZGUiOiJEQUwiLCJ0b0FpcnBvcnRDb2RlIjoiU0FUIiwiZmxpZ2h0IjoiMzM1MiJ9LHsiZGVwYXJ0dXJlVGltZSI6IjA2OjI1IiwiZGVwYXJ0dXJlRGF0ZSI6IjIwMTktMDMtMDIiLCJmcm9tQWlycG9ydENvZGUiOiJTQVQiLCJ0b0FpcnBvcnRDb2RlIjoiREFMIiwiZmxpZ2h0IjoiNDU2NSJ9XSwiaXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJmYXJlUHJpY2luZ1R5cGUiOiJBRFVMVCIsImJhc2VGYXJlIjoiMTczLjAyIiwiZmFyZVRheGVzQW5kRmVlcyI6W3siY29kZSI6IkFZIiwiYW1vdW50IjoiMTEuMjAifSx7ImNvZGUiOiJVUyIsImFtb3VudCI6IjEyLjk4In0seyJjb2RlIjoiWEYiLCJhbW91bnQiOiIxOC4wMCJ9LHsiY29kZSI6IlpQIiwiYW1vdW50IjoiMTYuODAifV0sInRvdGFsVGF4ZXNBbmRGZWUiOiI1OC45OCIsInRvdGFsRmFyZSI6IjIzMi4wMCIsInBheFR5cGVUb3RhbCI6IjIzMi4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiItMTExLjQyIiwidG90YWxUYXhlc0FuZEZlZXMiOiItOC4zNSIsInRvdGFsRmFyZSI6Ii0xMTkuNzciLCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIiwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxIn0sImZhcmVTdW1tYXJ5Ijp7Im9yaWdpbmFsVHJpcENvc3QiOnsiaXRlbSI6Ik9yaWdpbmFsIHRyaXAgdG90YWwiLCJmYXJlIjp7ImFtb3VudCI6IjM1MS43NyIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fSwibmV3VHJpcENvc3QiOnsiaXRlbSI6Ik5ldyB0cmlwIHRvdGFsIiwiZmFyZSI6eyJhbW91bnQiOiIyMzIuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sInJlZnVuZGFibGUiOnsiaXRlbSI6IkNyZWRpdCIsImZhcmUiOnsiYW1vdW50IjoiMTE5Ljc3IiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19LCJ0b3RhbFJlZnVuZGFiaWxpdHkiOnsiaXRlbSI6IkNyZWRpdCIsImZhcmUiOnsiYW1vdW50IjoiMTE5Ljc3IiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19fX0='
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
