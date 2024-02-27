module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: false,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: 'CHDWDE',
    header: 'DAL - BOI (Round Trip)',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-02-13',
        flights: [
          { number: '1791', wifiOnBoard: true },
          { number: '1993', wifiOnBoard: true }
        ],
        departureTime: '17:45',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '23:30',
        arrivalAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: 'Y' }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: { name: 'San Antonio', state: 'TX', code: 'SAT', country: null },
            arrivalTime: null,
            departureTime: null,
            changePlanes: false
          },
          {
            airport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
            arrivalTime: '20:40',
            departureTime: '21:30',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 45m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-16',
        flights: [
          { number: '4141', wifiOnBoard: true },
          { number: '3871', wifiOnBoard: true }
        ],
        departureTime: '14:00',
        departureAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
        arrivalTime: '20:50',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: 'Y' }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: { name: 'Las Vegas', state: 'NV', code: 'LAS', country: null },
            arrivalTime: '14:40',
            departureTime: '16:15',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '5h 50m'
      }
    ],
    passengers: [{ displayName: 'Kyrr Test', firstName: 'Kyrr', lastName: 'Test' }],
    messages: null,
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '1,091.06', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '1,091.06', currencyCode: 'USD', currencySymbol: '$' },
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
      moneyTotal: { amount: '1,091.06', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '976.34', currencyCode: 'USD', currencySymbol: '$' },
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
            fee: { amount: '73.22', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: { amount: '13.50', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: { amount: '16.80', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '1,091.06', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '1,091.06', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: null
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: { amount: '547.78', currencyCode: 'USD', currencySymbol: '$' }
            },
            { boundType: 'RETURNING', price: { amount: '543.28', currencyCode: 'USD', currencySymbol: '$' } }
          ]
        }
      },
      seniorFare: null
    },
    emailReceiptTo: 'jahha@wnco.com',
    isRepriceNotification: false,
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
            inboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..w78Y224jSXzoVKyApFaoMw.juFucjGBDiWObUM5BbG38EkMy5-TZzYqGggjQSxqx4PQI2D0jlJZu_5Dc9BqO7auIpMc0kHZ16-XNFQMxJCgSLwzXgsj74dGQwfN6jsE4xOADU_zkNl5kz4nN1rAfhy_4cW6U52lyLuC3Sf1yGIFkFjKh0jTvNNzVurjjms7w9rtJZsKvCV_KLtDhUItnQNt0avKDOidfPg7MkV8H1LNNpN7HXOcnPXYRRFTmEw3_Z0WtGgPhYPjidtJVrGuccN092gEzCG24ZXkJqXq1ANHiw8QsBjL69Y6Rzw-nc2LtdT0apSksfJbmxrqWTwMk8iwzrzAx2MDiLJpGS8qc-xrEYA20IdGeIELDXHOHkJiQjI1yHbC0W6LQhyXWNSTqdsvQrr_xbqjLtvAPRE1gBGPg2ugpRnfDW8DTVb1pC-kWvd73ItkKmoogyw80M552phT-B8GA3eHbqoZxMQw6G0_hWNPVzxF-R6PiAsR5958nTSqB2KLXz8yQEmCAbh65WI6Gql6gyCpEi40ufAAU-7O4NiBas2ZeLSRKIvaX3CunFteFDucmbworQkOHk0WViGD4ejcUz1vJDabwOO1FKCrTzx-CoLMmheYpqvR1WbWFbqaM0YLqPM1UcWehplCMlhbEzOSM3BfFHXvZPxozwdlsjmGgjrOU9EHCGVHbMWmHhSt-l9tiLjpEPDGCfRyoPd6cJPcOHZ4LRUSb0O6-1TeSBI1uF6ZGlT_klOcEaBm2Lj6g4FhLi8hz8MFS1hONBOQ75zlLtVqj6KbuLTw9wqVjMIV9Mze84mSepA74C7z9QivEgWkAhj2iBqVkH_JoiEXsxwvgWPg_bIEViSRFIHHu7PZK5vO-g0Y4t589-Y3RgVf4jLBwNHCs5wUxisN12l94hMc1ZEBmzGwzqwA4DkVSHDJGzZl64D8EN4Z69B6o6_bQphoeTRKbnWPtQsTMSeg4ydNAwlz4Ao5FdTLQqELKHlSyR-w5rHFmfzktTrsE3EgN5Vwq9laOSo4VBlzTcaDTlcyVnN-QoyrqWDmyzAlykiPWQB5l8e1tZcaplnR2gtsvV0FiZ9xMFOI3jwrc4EjBSSuo9Lj0uoibdCrNTEcsDL3WAZEweBKXs3NFKWqHMoCR9K-DupdBv_VYcoivGI0lAmeZkGL598TXf0wdlOBTroBOYqy10WUyLfdfW7neFM8CfaQujkSJwv7O40liDyoycp46_UaTENwcj-IBsb3EO9016uVEAyxiTQd4t5e_n2D-361l95dhhOUhiUjLPhv9vSrL9EuVivb3u_gv2AsU2CIYsBmI1jCnYxwf-lUNGDfIYqyqE9h_rwuqzXRm7sMU6noJ3BUK9lDEqEHRHqr1PnIbTCM0stfcCZ8HotzGY9uzxeAaWKjS0D_vADOIfqwrmTnRufBUWAQdj-_8I6fotfrXx-H3ba0k4zUnZojmhlUdf90DRi9EFkhRWaT06wED8FilRPJcZV3GCG2t0FnW1KxUZCPfIxV6DXFraXImUvsaumWIzOtwcAKtw42XkDWPiLzU63B0n0zGkUIph2fjllouBJY--4tHfeH8rxDD7kHjhp0u5ByW8ZtgCFSw_jZQ7RWpfCj6t2g6ZHuH9lF169HhWYz__PA3P6OHrgTydJc0faMtK4TJSEsfctGACfapl_xCFZK2w-LvaVD1Wdn-5xr6b6HOsc1kb8ErzBB38wzUEVfKVHjCgZRhEWz4DPTWYQZq9ZdQb1k8-bbiefLil1u7zw3MXKz1Uxs-BiYsQV21p1Z7EausaCKbh3UVP8mTciK-auYI1xz0GCVW0R_jXFltYhl-3Cv1mgmZQVv8uN3TqP8yXVMLDr53ZYAsUl1Csed44AyfEM-gD_Uglryy_Efx8uGdx6WB9biRKMicJoxImhpRTcSKeIC6qLAPhquDh_nX3P_ZaZETKQW9fljja70IbYXMlGCUOL8Pdhn9MDpGrhOzuPIfSHr1687LbpkdFfEMNNNALlvEpWkvayh-ayEJv6XAUlEsFrGADwn-r3QCq2IFIZ_iWECcY6cKWIh6iDWHt-eZCmyQGGS9Vw9SlVcFtEZwwKeOUQbvjKzjaNLH8iT19fKsP6aNyFt87Mu1vFLLwPksGdngi6d12-f9eH56nI0I9O0l-QM3_jGaCFz0T_4EFH6UGz_9kK1XxCZtTR-E7K8FAJxQUtFbtodRYSiUdyUQ1s5if09cfPE4jPXQ1RnHSqc3HeVM_77JfL9TF2-UV8j8QAVRTgIhLpLr4VcCmJ17cbMykeL6UmnhfnKtk-_AcyBukPWtQQHslerpLALrwrLqdRI1ffnimy2VfPKKVR8S1ERCNDTzyrwyx4h-ooTEI7VovBuVbpL2eHDLAFievH-WpmcGoy4UIkz4QcsSh_Nh2tXAGB964bXDaBpd_Iv4MwQDydssIXJg-ykZLvxW5-0TBoSQn9JxbXD0z0ndI5n7rvMlKTyO0HDjOGeQ11w6GrPisozG4ls64HXwTOaok4KAHwdnVnx_xBEsRhYpW5Ksv45vIzBKM0xnEGCfqeg71BcTCoQ4cCHawu1k2MjobhRy_4M6MtmmVJViIuVqnyW-vYsu4pSMZyTPLR4UFEKCgpxJANXh31aIaRiU4QKoBcBJ-0iHu3Dgc08Qi7wemm-6Lwf56JZRsXYfPOQ1eFYkHFF5q_T7wRC2UcDvooaYkcsq6E9MujAOeYF9oR_NUSqfEJ4FI40nIeT-T9OIVX03ivzfQEG0s8hCj05PT-VVsJrPrmPcEaOL8nQnezwOigUE73VHMkyu3aDwjM1Aix67uSuLEr0GZ1mQyAR3jV53PWDk8ib0wSvYxE_8mAp6jeWlzCZeFenjmHFUjzUw_52gN2N-AnnPeumfCg7UdMc3svjRTW0VP1j59uYGmNpKr7jpg61YHlqOI05cpLnTnogY3iHxeXdOXgty-iuUo4ekMSBy-_yJliTRgCywtdtRx9nsGFvW7KfyreeLQtfeBXGd-ky5X_MOv_fSe-aVOy-0FUWZ8gzwyHr2waw32INQ2THAso1fj3yqlWeZeoOV349ZSWuG5SNcTcF-3wypsZnJXZBNT11_-uw6ltG4MKyzBFdLrwTNolTEVGrIiCr7NeEmfB1pNHn2tiJDrMYPTUFlLMZrkhsFi2T1Ws1GtObz0T3R3XfKn2k-XLaO7KsAOcAcLro7_A5KJlqxBrfxSZDvnT_WqtL0Vh1Pq7I6SuE3gFi6r1ctvoLrhIm9_l19jJuG-SvclPB81sltM0_UOs4ZJvIJD1T6xfW1Ljvs_nrRM5vrihQcFbxvgeVAsvbBJsGnN-yXKpAWY4OfGeNFXU9e1FKW-p8nhnfDbH94yz3bOYe10j_TREmCCroZwPm8BNTT8cwUMfc6733tNBczjgBEWL-EqhgYcWYoXr86M4rhoDace63JwOXaWM2VBzUWj0m9_p6a5ApJtVuWlRMCmnum4QSGe5ZdBiIlbsSEgEGX0FnrXqSaGibfREx4gEejzSyY-t--dx1SYSlOQXcXWxu830PPFJk1ZarU7C-xXWQzhCfh_Mfa4mfFF-0DZHXifvoFoQCIjD5K_lOC9ubdboC12KohqdADq3B-AiHABW3K3TCVQR0s5ywCiVu1-JC3Y8D2MVldFnK93u5g_nfRu0qDb-qedUsjnUWho4brPX-ZL_no1a6aYmgnSVi1yYP0_HH3jB2RkccvxcTEyyuRZ4GjEL063YEemtgIs4zFerAvPVWX5GvctKc4tVTxbyQhIxPYnuhM7HFNpNZ5Z_5FoBj6xPo2Jq_pvUP2r_6lbv3_YLQOokfyg6htU70ThUzPHjViSwrJmlbaNVZgNoJ33NDYYFvYU8Jb6l9hFKg1Sepo-RHZnCRokBZ_TvTKTM2TI6CgALsSzxaI_4RPBVN0oBXtfrBVL_sty8941QId5w6ixkDzyXAuwzdZuKoPEUEJzLQYCXTqfbGjppOnyIlTVdc-tcA6IlcJhYeoDSC6eAnKhwODKJTbf58ERIaUQY.3y1ZMHVcLCohPPRiJr9Btw',
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..NPj2kOAhGR23-4BO1fv0-g.WgbX6RBNC7TSg5eXV-tL1Kt6mo-qlCvaQ2nZjHdvRvM0TA1GHTPyMaI_PdmIk10CCm4l-Mws3MSDfnuysELyOOawFNibpKXJxi01ulJfTLbFWFBAx3n3Day3q9SgsCZ6MU6sfb3xTJd3Yh6Q4cncNfXPcpVmE220IoP5NvgtD1AtWLAA6Dmel99eSNG2HMAz0ufYyc8faMtJ0JvbVMO9Nv63Efey4W-7jAkAlJJdiCfyDbQ4VDmMMyBEsIyjSJPC9rkepHLGwL7fVGr6p-yxMrxHgdfU0uRLcBTSpvsk0_tf9giHtzOit-PCu8y2iDBYfJCITZxe6mBmCkA-jm01EAFjkXidAHhRpVxwQP5PAkI9tmdl2cGsHZVzBzCitwblFdLINPo_3_MaM_dqnBefk3KHWHKeTD4RSE3tgYwwKOSyA91mfAvwXWBn7YWuOq9iKryrU3NvYaaEBzJ0UcHBn_RH1mqaLCFirohGBjUsY_uWxn0z_QjklkGD770_Fl7ebWpkVmT4pUGjsg_uMolbi-NjoJvBgPlvogDow_OV5orSOK4Zgu97DN6vFuaVSw5Vs7Kmcz8nEZKwKKn1GyRyYqAc33IemLyQbqJ_AZsfsQRJEhu9f4xb3Z5ljC5jWN12HfGJsaqb1qzL0uqWXQNeE1TLbe7kTjk97dE3sqDm8mJuKeO_ORb1ja5TTQWZZHQ1z_QIEKDidJBHCXzSWFd0StUiJTGoYG-XSpg8eqOhnl4VKO2Fg-OB4jEnaT4IIUgq7VX1OTg2sjo0JdCbI8H8Woofs20wfrufIsWbSCVcklSDldaQ9lddrIDOF9uHoRdaXWZdTBmiIaZtnyEOGFVex12nQA4CX1oKQiQhwYcXPkigLRUkmFFGw3-MG79qOZ3AyxmQIoU4Tj8Af4YagDiFsdjv8aHFt6p5ZHAsnCfwH4GDiP6gS2JitSAvpu7HXvQvP0kRHA3px4oRvjShzhm5Q4waWJiDVgjLMI8kst9YRENwxjKjHJEhGYMd794i-iPfshS8-2wQVfOznxpDFs_y1F1KkHdGDFG6NlKzMLr93b7NANS0JdRxculN3sc8_Sbt3hE9FRJBqII7pwxxFoPfSVMgVD6OYtLQZehci27alSsY--TkDVUK_bi5RIlPyujSf5T9wXXw3-7Ky8mit6ErbT9nnCidjm_L27UqMXkSgtka0ANx60eKZ3ymbelVSeye0-_jJRXSuixP4X0vaYK7p6nEEhv3aepEGhzptSB1m3gHFT-icxNDQ3vdxhYh_X3EbxwiwW8cNLj0JocGVPYRbtAZm_e833sMo6bG6YFPzxw0New2LrMDLahPfwp-D1bC2aXP8rhoVUUaIRRlyAGiGbl3qpDZZ2sTdKfw4YeRX_XGlg4MOT5hgHH-gWGWKSil2ck7j_BSh_cnpquoQ_c2-lhmaa7uUKoDjvwN98zAkQWOAouGyopKqW651kdTEAV2XPO88TnNJFE1Fz_sYFH5IneH0wEeFEeoDKpmSIpsMqeTqwKszthaCK0ZObCy866vFuI2dUhBbjDHdQLpNPNSDxzgpH7v9WTMdueGlLwh76yWZFW9BZCjBAlus1kNWWQea7hDk04W93ZZefPTPsPpniFTzaqLmBcAKKpjYsvCmzP9KlIQs_EfMAkPNNigBRSUSB0menjS6EwjNJbO6vefVJDAD5HMuV97iZy7blBWLuUKmcfHvnfKFMVzK9mhr-6Qx7NNe_yt6MBwHkPJOfhdV4lzJyLb6RWAtWWYWwhueLWWBP3tXPN4cvs6_-XHS8Ov3bzcaeVyGdQqBP917YSfafteEDis3wV2urKG0qLmc1nMwM0STO3d1U3ZbiwqSsdykS_ZfUFIYZ2LbYM6bzKzmMFLTqK9_9nLg1h95FLukK-rQ2up7oOj3DVRfU4g5OEsCX2pOD1Ri1AEIgU0Iaf9WTLgn-_ANaAFL9r7ZGnhRi65SNKIyQQqQNyiz_SF1yUBWeDp6TPtAugzFs9ce3LG78ZqGvVqfXvuXdEjayqZq1avRF4of8LeMxJpfk1s9X5MPyIQXgVb5T7OxwM25umukTI2hST8iNAQsqFU7ctuynStj5N6b-P8EcD6LvMjv1qL6w8wqGm25IHv22e88mbGzxGX70usiWzyua5Jb_waxDRpWTDyeN_-50Hzz0PY2QaRZd9wGwsN27ILZSVi3yg6-5TvHhe-Wi-s9DZWYhpKpqGBsEhgw1FA2L4gVHt7jXNGNN55DDlkPz_N9qyzFBx1-H4RwRpgG7Nq2b0HBkMKUr1WwgWhFe2I7yQbIh3mS3iQFcZ-R787t0o9dxmMqv4MCg6huJqnOnOdZelf1H_RhErjpAZukt5uNUyhenRVquiu7-2QGOE1cQOUQLrw7JCpQueec_WWQEhUXIy5237uimVik9OdDyyjORZT1fbcWX0ch18wixJfrSo-Rm-QfEFa-GKEG32Su6Zi3IEkCHTaowFUEmmXuNAB4ku7ZhvG35yt8aza43ToEbchgs_iqIVSlo5drSmsxPuKxapY-d3IXCucE-yEZoefwPA-pYjnqXv4h52YBJjnqGPUBCT-8PgsuT7qRbfbkW5Y7YFX94WpJKXadN8TvUJ39H2Sa0DahjYo6ag8hos4AH7nEQqmXbu-GJavRqPbGMlSsLCNvwWyOPDsAwESS3C7AeK8xbNk_Ex2NtBcXv13IDGSG1eWy1kvY21I4w-ojq5vlQgztcxr3Wds7kup1xMDW0E3dU0NOCE6Z-0HFKPGQQI7mLeDpL2Hzdpa8VXV5JuvauAj9y6tfgjZFTjhnRpxvJgwz6b_vpRumAPwaNQBjj_uHd7l_2ioQvKutMWD-3dgmg-Fq859kaLT4RgYnvF05S-QxCg5R_t9jOdr_rHvTCikB6yMAPffhQvlNT1GDO25TA_QuMgqr2e7Y6vKYxRrWUxj_sA9HwsR-KzJ4ij6-PHUDAx1ymflwFFWx7AV0dnyJxn6vMqqKnn8Lu1OYk_H4TBYg0RlNCkOGMqMUBBod9-w173bcfrtK5F888yWGBm4_JumYW5n9SQ10PYVv_yq9uWrvUC-sAzkqv3jvmJZPExMSaAWSnsbSrf7XZ8RVbstB8pZkHIzTVNH6G9eHJmaO9fGUNmc3isxgECG9x1vnso91YnMJYxe6O_G3ivK4tv8i4jzoZijAJYdnwkeyaWC-uZc2VY4eWE2MmNTZTYOXiUvPL0Ll76Vc33qW7mcnmvPtlL6zjsu6yOTaohUkbFeEX6K5hy2-t0_GAk6-lWN5VxWLefYHvxZs8BgZXmEGwNYStFg8LVITK2Pez2bX_gG9Gx9DwMgtqn-a3Ht2Bwpl0JC4DnGVFsradLFud-DSq037BHypbCQUy8rogbk9kDEmIyPjGuF5Tj8N6qqMkm9N5Bl9DFX6-1EjSFj83ild1pIqTczhqZOORJOZb8uimym_Cp61rcfwMm-HbPtviQkYXWvuXPGAhEAS5Ahywy_M4arP4QMD6nlGyC-dAfjrEaO1ySgho9wDWUI5CoI3_AM3iuaiheZGZwJV4a7X0Ub2eLroZKUIJ0YqJ9pT4TtN4l2p3XydtvAiIb2lKYFXsRKAmXKCPcpCWlAprthdhXQoX9yNXGk8seo-Tj4IZhU-NN8ISOEuWCqKlc3GGlKJ621XVLMWK6bTE1aE6-iawPVvDQ9psCD_HbgaTuTDurcYju7L8z2mMMBmd8tCafcVEjzEshCTgo9DwgMnv5Ao-LmipE1XxobMZDcMgDqmiYDWPlYLk1bIlRnOTANebaTzTUTZtqpcKydhKv5QT5DstbF0SWF8s-A-Ksq3vFMIMt1kU78CXLw2xyv3bC0ZiOeAd9NUF0O_j--BdmJ7W3XLotz-wf51Ub_NA1GcPZ5U_oIzVP8iFYeMdN9uZpCiRDPHc7EzCO4L-Oq_93bjRXSE1Zb39Y27HXITKrOUYsaGMfPm0-11y4X6GIirN1y7cTAkYENdpeEch_XsdcQzdFqgj8aUZuzx8a-9sFMt8o.woQcea60t8a55-tbbBYmxw'
          },
          productIdToken: {
            inbound:
              'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksQk9JLExBUywyMDE5LTAyLTE2VDE0OjAwLTA3OjAwLDIwMTktMDItMTZUMTQ6NDAtMDg6MDAsV04sV04sNDE0MSw3Mzh8WUwsWSxMQVMsREFMLDIwMTktMDItMTZUMTY6MTUtMDg6MDAsMjAxOS0wMi0xNlQyMDo1MC0wNjowMCxXTixXTiwzODcxLDdNOCIsInF1b3RlZFByaWNlIjoiNTQzLjI4IiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiQU5ZIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQifQ==',
            outbound:
              'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksREFMLERFTiwyMDE5LTAyLTEzVDE3OjQ1LTA2OjAwLDIwMTktMDItMTNUMjA6NDAtMDc6MDAsV04sV04sMTc5MSw3M1d8WUwsWSxERU4sQk9JLDIwMTktMDItMTNUMjE6MzAtMDc6MDAsMjAxOS0wMi0xM1QyMzozMC0wNzowMCxXTixXTiwxOTkzLDdNOCIsInF1b3RlZFByaWNlIjoiNTQ3Ljc4IiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiQU5ZIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQifQ=='
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6Ik5PTkUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJjaGFuZ2VDb3N0VHlwZSI6IkVWRU5fRVhDSEFOR0UiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIxNzo0NSIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTEzIiwiZnJvbUFpcnBvcnRDb2RlIjoiREFMIiwidG9BaXJwb3J0Q29kZSI6IkJPSSIsImZsaWdodCI6IjE3OTEifSx7ImRlcGFydHVyZVRpbWUiOiIxNDowMCIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTE2IiwiZnJvbUFpcnBvcnRDb2RlIjoiQk9JIiwidG9BaXJwb3J0Q29kZSI6IkRBTCIsImZsaWdodCI6IjQxNDEifV0sIml0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQiLCJiYXNlRmFyZSI6Ijk3Ni4zNCIsImZhcmVUYXhlc0FuZEZlZXMiOlt7ImNvZGUiOiJBWSIsImFtb3VudCI6IjExLjIwIn0seyJjb2RlIjoiVVMiLCJhbW91bnQiOiI3My4yMiJ9LHsiY29kZSI6IlhGIiwiYW1vdW50IjoiMTMuNTAifSx7ImNvZGUiOiJaUCIsImFtb3VudCI6IjE2LjgwIn1dLCJ0b3RhbFRheGVzQW5kRmVlIjoiMTE0LjcyIiwidG90YWxGYXJlIjoiMSwwOTEuMDYiLCJwYXhUeXBlVG90YWwiOiIxLDA5MS4wNiIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJjaGFuZ2VUeXBlIjoiUkVJU1NVRV9ET0NVTUVOVFMiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZGlmZmVyZW5jZUl0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiYmFzZUZhcmUiOiIwLjAwIiwidG90YWxUYXhlc0FuZEZlZXMiOiIwLjAwIiwidG90YWxGYXJlIjoiMC4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZmFyZVN1bW1hcnkiOnsib3JpZ2luYWxUcmlwQ29zdCI6eyJpdGVtIjoiT3JpZ2luYWwgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiMSwwOTEuMDYiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sIm5ld1RyaXBDb3N0Ijp7Iml0ZW0iOiJOZXcgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiMSwwOTEuMDYiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sInlvdU93ZSI6eyJpdGVtIjoiQW1vdW50IER1ZSIsImZhcmUiOnsiYW1vdW50IjoiMC4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fX19'
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
