module.exports = {
  changePricingPage: {
    paymentRequired: true,
    refundRequired: false,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: 'CHFRDU',
    header: 'ATL - AUS',
    accountNumber: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-02-16',
        flights: [
          { number: '2326', wifiOnBoard: true },
          { number: '4092', wifiOnBoard: true }
        ],
        departureTime: '06:15',
        departureAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        arrivalTime: '09:25',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: 'K' }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [
          {
            airport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
            arrivalTime: '07:35',
            departureTime: '08:30',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 10m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-23',
        flights: [{ number: '1465', wifiOnBoard: true }],
        departureTime: '07:40',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '10:45',
        arrivalAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: 'Y' }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '2h 5m'
      }
    ],
    passengers: [{ displayName: 'Sumo Aprilmember', firstName: 'Sumo', lastName: 'Aprilmember' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '816.86', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '838.86', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newAmountDue: {
        item: 'Amount Due',
        fare: { amount: '22.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      totalDueNow: null,
      nonRefundable: null,
      refundable: null,
      totalRefundability: null,
      travelFunds: null,
      remainingTravelFunds: null,
      remainingTravelFundsDisclaimerText: null
    },
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '838.86', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '745.64', currencyCode: 'USD', currencySymbol: '$' },
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
            fee: { amount: '55.92', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: { amount: '13.50', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: { amount: '12.60', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '838.86', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: { moneyTotal: { amount: '838.86', currencyCode: 'USD', currencySymbol: '$' }, pointsTotal: null },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: { amount: '434.78', currencyCode: 'USD', currencySymbol: '$' }
            },
            { boundType: 'RETURNING', price: { amount: '404.08', currencyCode: 'USD', currencySymbol: '$' } }
          ]
        }
      },
      seniorFare: null
    },
    emailReceiptTo: 'x19851@wnco.com',
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
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..OnUTdnTf_x9F_8iC8rgKGQ.cMyZYn6X7WK4E9OhfwTc0xXHhw0--fUV6qWfvo1DekI8W8rKi830uVqaL_MbmC_mmcCvLBAxzRgVfjokxrmde4ZGkFbEyGfhr75_VwRkwYVDIHT7yzWSVeVMtixhiGjFOhdaRXhXZDTtr4Y_jJKVxF_HFANhVOOGluBgDWq4WJR6UVU70eOUym5ggfcG_C3R5Iblwu14IMKaX_s-E6I-rEQdspQSCy2ansjCdOV3xnXG5_vLN0RIxauNx11adOEiz3bRHlk_hMxGa5LzJdrOI0KgHJ6cguNAR1O-gwRpnc822MJGOqH8wx48V24G_cIMZ8vrhEGHZrCNNPUi_5MkrdGmVkh35SG4XRPzt3eqLUInY0mBKM-FJt8DdnG4VurAH-2MDperMSHnBB55XIIJbSChG6mXSbu-qI6Y9yimvdjIG4kmRRF6zX-6We2tBbGXH0oOXlG3XAO6h3t7IN9T4UaJe7yGidA7JMo9D8gmJmSGHdBgaS9EZ-PXXOI4BIQbkcENAqdf8eZzbXP2IJcX4tiRFTTILeukil4XpCnpBx0wF-uudhyBY-E5IiGBQRsgQSWYYawz_oexxli6OJ1uxeoTIYpUunSVTJ3bIjvRiDTd7DHUtF2pAxEE21nun-tglqWYRH4j6yzo6B7aslO_vkwI6G6BG4qXtjlqE9k2f-mXuVlRPAx1iNdVCMPc9l1KFnJMNK538ryqXUgQTP0ENOeKdK5SFoc1zdqnXzRfHupPje_DVbpVAjKy3wK7qUAmO59LdGpIIoFhllPV2Gp3CpMQ0bbFt458rlxnD4RbkrB6JRW6TbU2IhZTtBDgip6hbWP6qOw4HtCm9dxzW8t-UZkte_CA44FAlkezXWchSBY8sAWN_vfJbVsJiKlagHqKwmymoWwYiHo2Of8Ba8YwfSrp6M3gEvmJFRYyK-19R7Ot4eAfcYp5htaEOQs1AVrRgs8Rbda8m1NvSGRjLej70SilFoE8AUajjhJ_1ata1gdBhYIGSCeBbq_xXVLe--Yb2VZdgEy79Rjv43Roy1OuMpdYkE6fVBd6hfgqJuOPslua5m_mf4NJMEeTARHksNhhGIoyKNGyPOJaWxzfZXufL56HF0E11kWZpUtPxbby8DPgA2tez44Twl1vLX2BK0kVaxthaa50bDa5EqXZhN5PS83vtCgcGd0vqowB8joEuWePqmkluK7UhheIo4fpOYiupcAIdQySieKcs1txeMKRzGOwbxa88v4Lg5IOSJ8uYFZea4Q3Z2Bc0gaFH8QB1nXiHrpZCTK_9tc9WlTgohg4Iw4ofpzY_Hp5ySuTsgWQi7oCaUc2cR2gEwt-TVLZNlvXOElbcsw2lAcSLdSujOmNK46HsBoYf1teWcXmkM05srcYd4CBnOHhszd_dlMt-tm1i8JcRx1-E5wP94qYJ0DCFzwb3Z7bx-MZ8kbFRfn5n89nEkVEnQ_JY9ssJsQrs8z6GU60aQg5gIrO_P_FSjpBTTnKzl6e5cwjwwzdX6wLpqs6Bf2wIb7LjgqIvJWHusVRQAFp0OP51ZBkXZWt4IdVh-Y4x4p-plGj43ccGuvNec_ywIUvFafSQTN5NjuG1f1ucVi5oaMnaaZoxJTvgAE7IaEantPACKXkuATRWbwp9SFuIfRkL3vz5XxHVjc42qv4J0S5wIPn2fWWRrRcHH6AMMmuhwvHxeb3YXzP78w3fO2ZVSkMzhtrMMm6ElwRzZlFoSfwi-3r6EluKQBcTny2vJZni3Dy21nwx3YRam1NQ0ta-xY441I0qD8B7Q3CpdYOYMfw6QXcgYnda1xVsQa_MRPJ_bHdJmRqcUIk33ItGDPjtXSk3l9GeDGJPdoVNEFObJNK9vQbnneF2q6axHkwE1HNlUQRb1xkfab0kQAjrAHZQ1DpOS5UevOb1u29YJz9611iqqA9rgbwnb_7MWX1UcKkAgMNRtwfUMgNA6ViVCn-dba1DVYmZ97X1b0BEi26tK-aTnRGXScfQwZVmxVJB09LSAfWPWysiM6bcIYGXAUj5EKzZY1LM5IrgR2JiPCAzpJzPkm9OG2fs8UB6iWVSmwsY_50tDdR2kvCwq03BBHeaZ-irgqFWQEsluDi9To3m6He8Y1H-jkdLqrx60AOOeBZnlzRintyfR8mCWz8acRTcXwYjbUGIv0zSlPUZkbnjiTFeB8Ia2JvvqHG8ZKrSUPOnIMPU_cuoTo17FiAKWEPwbq63z5PFvottSS6SwYv2WCnrNMuUQ2udqGbyv-eNm8rcvXJYq7csvFBC0MY1Be3zyDoQedoI90RqMtmBJ4WtagIzK4ogDDsQbq_AW_-zEWWH8w4udePAOBpWJlfFCtRJn98wvotfkQ38lHZCMVdKV8C0yn8MwmAqkb1ZHdlCio2kj5IZt2E6Hu8PPvV4JVG_TlWa_wBd7h0h7XCkswm7WGHK6OPVXc47Q6mP2OxA2hU1Qfe9PpfDU8JN3a7obWZ0Bcn2awjEJlk_mgn68yXnhBqL4JIDsIO5ykf47Y2ByqNZFkOFCS5FjPrCt-nH9uvbi9TABscbArB48yWTeJXbYEOfRxJpVN29816x4cH_7rVMaL3X0GqbFLbH2haIlUIuaBuHW8NjkKfWD-q6aD1XQLOQ4YW1Dci8ut2_GO9_8lX_uhE69DzDq9sczW0p4pbz0LD5QzURV0Yak7ANewxiXtZU1KgpE8mssey0rahSYEwDyHHpDbeIJxq_GVH11wKXefaP1BPUjPCR0mx_KHOq4_M7Lu098cUwi-iE2HRig2qEArCrZ7rORKoSr7Fvou6CfTVRjGIzGbrkaDxtMjdJkc3ckL3lHryjLMM8hlW37XhPvRK721b6GpgaOlcnlmOGeXrVDysVfTfxE3QqPQoSFtmN9yCjXAuizw3sUnCoqcse-jqxNZ8Fbv3vj4GQGzmsv5DonwK6tIdl2LOQqlpO9eReiczJmso8KwhDm4OwIQ9y8JFOwsGy9cMtpoPJXTNbQxO4N4JHourlyPDPHLKC3BvWMyl4VncYRTLYfNHfolRcapxH0fE62KSIOt-4JKfCSC67opfzp4asrgPbF-Vu2ZOxG97Aabrd6u69hPvmM0-DsAsvMAsflt-dUJWRMv7TeWIwK6KW5nVx2FeoMP3iib96TZGDlEMtokVS_dj4b_MheGss-raD_Q8NOj-V0g.9ofuNGkikg3xxzFyEqXsWA',
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..7iUbYSmha1eEAVSHs1ZYUA.Ob-Fpq0E1X2fWy3k9dtuRapwATzIef97a53FHRZuyUyD7e7b_Oe-r0xYQaXXupUAayqicvSW55b86CDmHFXEbAJy2SXwVx2U6zR-Vk3UflNk8wHGAc1-uPEo5D_Xm9cJageHijy8stE-9u8w9W57LmQdInZF-sVPsVqFBah6dXKik876fE29GnR3_BS1nv8Up6KyJCfi2ywPtHrSZ7c931Pf41g7LIeVGkA5viWRZg4n0tbbpj_qAzv1KNBBQc79GNwSzpsMeJHfcbN85KZYvhQi6QLD_1okcPzD8hxhkNyBPRuVZJ_kJzt4resJETB4lS3FGq3EaSSZdd119dS2NoRjOsv6qENtoF2qtuPxM3vwf4TI7l6u73BWMt6oJcypSv4cjm-Ua5_CwFq6jbJ5Yl_4kQ6vWj3sqZnkHFlS8uO1ZQMPxQyDyQUZ4d-NE4m0hgJbtcp0aGdvJH3_PXEiLwsUG2LWSoPHoKUwek_6qbl-aykvEgEbS0-Mzak5tdFqJAaOdm0W67jrFmxFUJivIdqrn9xu6nIBwA4eSrwFeZT_pumRMjItN81PEWQi1Ha5UPkZdjlbWwYZdwtOqzRtkrqBOJg2nBaVrpU73ejshUrfHJXG0ZEL7UBS6bv3GvnUPV569hIk64l7fZHCwaepqjWY-iwjiVaETlbaBOiQbOG9a2OHGKreZ-N89PolA5s6MKLgWGZPgHtKNJbr9m3esySPSu1QBiKU2mCG-QL71Lp5JAZn7gBIEufHX-3z08Ppb5VOGASifLap1_H65YXllMsvFQqkzNm0eunRS4IuDymb4CP_8vvHwQPZpnOoOVg4nOkeSPo2-M9N79CRdEANHSkkawpKl93YGd_BXjA_hTqohAHi99abw0K1R-1U-YgnLzJDns2iGFQKt5m1bOdQ3lEumHARBBg9eOqVkUwHngWl7mTXOINze3PWi9XUq1DHNsM5zialnEKJaOlIxDKMTEHf3b18MQQvl3BknrYRsMrwzsnOCzjWXK7BThD16CPm7l6RMIy2d8AJTE_VjcE_4Y5dxCAek-EGvOAJ6dl3MvAXA3f3F6TDIuALACNAZVR3USGqWpO-PNUcxXMVTlHqhWNjarFb36ITSi30H5cO_QFcUOl-z_B8PyJWxITqlzdi1BUmCPuW6MZsvpsB7KNsyr75Pt_x55Lg9MO9LeKzD_I1Jj-UkaLYd3_nAm0QCUWtpQw93Fphoo_zO6EW-zjlM13iFMiTGfUSvOPID0vQ7x6OWk-zJPrQgAm8XEA4NmBR-CDJghq9JrzUYJRCAFB9_0B4chPLmG6kcqXxfjCxQlZ_KiIYIZdEoTvx5xBAGKA9vu2QoKoB1CO0L2VnnuH-dyIilhsqLt3e-DtK1qup6iBwbGguAgG3Ohs6eQ3ECDTpWJ42xkt3PCiMJgTdGvi_kHYZeYL-A1jsJjwicQgKHkg7OldFYTdCj317uvtTz1AeEsP66rSpJh8opf7KJ8csXERs7CFfUPtOOW7M7n2DR42LbJfHw2OQXv7eFArA5yNLgqqHHFF9DBVltcbEIPr4h23wcFSDoJcmVVAWBrVaaY6B2XnleREYuqI9yrwgvxAzeDirBEB9Hpg7h_qS4gtoZsAiLbMtyDIikxUE3SlhMu3GqYvZIY3txXZMPIVrpl75UEnpHz0NVjnShhNWbPYw-8P3HvGz314kuBu9k2GgECULYKqO6to709oT9qRL3pB9dhYYPLQw_sB40nD0EfTmyp57pFKRoDFvk9G5HPpnmKiy14lflUfNdScOgp3wYTaouzBTdS92WDWkdlnnOX6_e-pbzYG4PAL0F5eYKGL15GP0O6t79Gmd5cckU1xVxe2sXQUdnrC_338d1jYG3xtXgqEYdXXvZlRDrUUoCqpQ1wUwYYJEV9BQIXvLxCXaR19aRqz1TUqVPUVbAr9ITqFhpgGnUEuaQL-eRw1h-HWe0bLhnrfGUaZfGAwNbVZNZ1wuibaqdCTpd5Lt_Vl7bq61NDdNZDq_MJTHKJpeO68VEn6xLsgA9lbDhAX4zeVL9gfncA0MJm4UbgjuDW1BG--OJew4dOZEl8b6f7vWPojNFCA7rQ9NwvA6Vk4TJeLDd5M-ZyToDaXgqHENNWkfsYx4TX02UYGUrvihmn-hlPaFx0DB3Pc1QuutNhD5KuvFIHpYndOIBiffLtxyE18PSkBwJlr2MaCiTunJKFTWOQ1ijH4_PDM0YZPjLaGzIMNCrB_uznHct5JLNDbc1Al-6bnQjQrpcJwzXzA2gQfU08QUc-mvxG7FJiqzezEVXBBMc9H5VulCkeZ8QX9TC4AcgpZH4HGc3tLQ7vGJoHKyKq3D9QF08TALi4aWljY04fNBbnmjQeRJgNg5BGRonoURCisIKoJxPlV9wJ8xa6J747ys6AFEfrl5OrQMmu1HgIWVxdF4Neamdl3ZjerZha3E_IO8jZ1VZHDRkY-rAaOYHdNAq1y8WZfqT1ctT31SWiHoeWEbCbJZoAdoDZd1ZpNtSZMxvvlUIZ4VG1QwuTfOmHTuSxdgakbmB7tg7CSwsMr2xSx5QBumQb6mJJ3GxVlko8O4yY6DupDJOVKmDKnhfOnupMNHNJczTv6J-T34EUlXTTrcgtaHeillwInBYXcoyImn59T1vWu6ChFdzWlwIs7Ln5klSS9fzmIXBkd2rMwN8f-0mCi2SQ4KuNHuZgSdG1aTbhXcXOFkwHJ-psVEqYppA_Zm9vcq_5WiWnH_uksbrc08OyE1upvsBCoY7QhSY1zZArF0XxX26uo9LUCaaBChjZ_Rhlaq_vFIZcm6gPROy4gQKAXRKq2KNoIBZUqcDK96X4tvfmLNde4rVnjRj6i34B0Krzpc4PjaN88Xmi-ZUWIrOcG05VipVIh3KQpwuC9Sv-eSZOZCRbXwF7Grr_4mpaXF1zT7wZcDRa5XXCg_GvBzR89s-OzU7ITWeEVn_fSTgHMBz4GKbQhY_wzQqRca4-wi8c1gEn0nDidDDZQYYf-0SYQfNb2XBoFFHzx1Qkmb55BgyzfZ1uuIg1qSWpwVR3yFEtfcjO1wfz_txURr-caZFhX-SQ9U7u8ggNuq2HEwsBisjM0c1kGDH4luVWrD-IRSKDKNYiT-10GK1DOObBSKUXgNvJHXBpSVnfyIF_UQvO-Uu4F3kJHnXo1Vblq-ebIEFnTdT_hPPbWCKQTTh81KJGnc4EGOxs5WDpLaMeTxcIKpPaRAWBjoFYzdy7Di4-lCCh7cQSDNqQHIPc24ohvahOmRkBfvyC6pRkKi57VItR9C0OP1TZUGqo95c0a7a6EVuyK4TDnjQwPYas3avx7K.EhxTbLgKuSp0X7BkvCJAPw'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtaQlAsSyxBVEwsSE9VLDIwMTktMDItMTZUMDY6MTUtMDU6MDAsMjAxOS0wMi0xNlQwNzozNS0wNjowMCxXTixXTiwyMzI2LDczV3xLWkJQLEssSE9VLEFVUywyMDE5LTAyLTE2VDA4OjMwLTA2OjAwLDIwMTktMDItMTZUMDk6MjUtMDY6MDAsV04sV04sNDA5Miw3M1ciLCJxdW90ZWRQcmljZSI6IjQzNC43OCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IkJVUyIsImZhcmVQcmljaW5nVHlwZSI6IkFEVUxUIn0='
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6IlJFVkVOVUUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJub25SZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6Ik5PTkUiLCJjaGFuZ2VDb3N0VHlwZSI6IlVQR1JBREUiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIwNjoxNSIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTE2IiwiZnJvbUFpcnBvcnRDb2RlIjoiQVRMIiwidG9BaXJwb3J0Q29kZSI6IkFVUyIsImZsaWdodCI6IjIzMjYifSx7ImRlcGFydHVyZVRpbWUiOiIwNzo0MCIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTIzIiwiZnJvbUFpcnBvcnRDb2RlIjoiQVVTIiwidG9BaXJwb3J0Q29kZSI6IkFUTCIsImZsaWdodCI6IjE0NjUifV0sIml0aW5lcmFyeVByaWNlIjp7InJlY29yZFR5cGUiOiJGQVJFIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQiLCJiYXNlRmFyZSI6Ijc0NS42NCIsImZhcmVUYXhlc0FuZEZlZXMiOlt7ImNvZGUiOiJBWSIsImFtb3VudCI6IjExLjIwIn0seyJjb2RlIjoiVVMiLCJhbW91bnQiOiI1NS45MiJ9LHsiY29kZSI6IlhGIiwiYW1vdW50IjoiMTMuNTAifSx7ImNvZGUiOiJaUCIsImFtb3VudCI6IjEyLjYwIn1dLCJ0b3RhbFRheGVzQW5kRmVlIjoiOTMuMjIiLCJ0b3RhbEZhcmUiOiI4MzguODYiLCJwYXhUeXBlVG90YWwiOiI4MzguODYiLCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIiwiY2hhbmdlVHlwZSI6IlJFSVNTVUVfRE9DVU1FTlRTIiwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxIn0sImRpZmZlcmVuY2VJdGluZXJhcnlQcmljZSI6eyJyZWNvcmRUeXBlIjoiRkFSRSIsImJhc2VGYXJlIjoiMjAuNDYiLCJ0b3RhbFRheGVzQW5kRmVlcyI6IjEuNTQiLCJ0b3RhbEZhcmUiOiIyMi4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZmFyZVN1bW1hcnkiOnsib3JpZ2luYWxUcmlwQ29zdCI6eyJpdGVtIjoiT3JpZ2luYWwgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiODE2Ljg2IiwiY3VycmVuY3lDb2RlIjoiVVNEIiwiY3VycmVuY3lTeW1ib2wiOiIkIn19LCJuZXdUcmlwQ29zdCI6eyJpdGVtIjoiTmV3IHRyaXAgdG90YWwiLCJmYXJlIjp7ImFtb3VudCI6IjgzOC44NiIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fSwieW91T3dlIjp7Iml0ZW0iOiJBbW91bnQgRHVlIiwiZmFyZSI6eyJhbW91bnQiOiIyMi4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCIsImN1cnJlbmN5U3ltYm9sIjoiJCJ9fX19'
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
