module.exports = {
  changePricingPage: {
    paymentRequired: false,
    refundRequired: false,
    hasNonRefundable: false,
    requireNotificationDecision: false,
    recordLocator: 'CHFRPD',
    header: 'DAL - HOU',
    accountNumber: '601173823',
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-02-16',
        flights: [{ number: '4191', wifiOnBoard: true }],
        departureTime: '20:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '21:10',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: 'M' }],
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 10m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-23',
        flights: [{ number: '893', wifiOnBoard: true }],
        departureTime: '06:30',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '07:35',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: 'Y' }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 5m'
      }
    ],
    passengers: [{ displayName: 'Kyrr Test', firstName: 'Kyrr', lastName: 'Test' }],
    messages: [],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '32,987', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '28,997', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      nonRefundable: null,
      refundable: { item: 'Credit', fare: { amount: '3,990', currencyCode: 'PTS', currencySymbol: null }, tax: null },
      newAmountDue: null,
      totalRefundability: {
        item: 'Credit',
        fare: { amount: '3,990', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      remainingTravelFundsDisclaimerText: null
    },
    totals: {
      pointsTotal: { amount: '28,997', currencyCode: 'PTS', currencySymbol: null },
      moneyTotal: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '28,997', currencyCode: 'PTS', currencySymbol: null },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: { amount: '28,997', currencyCode: 'PTS', currencySymbol: null },
          money: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: { amount: '28,997', currencyCode: 'PTS', currencySymbol: null }
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: { amount: '13,408', currencyCode: 'PTS', currencySymbol: null }
            },
            { boundType: 'RETURNING', price: { amount: '15,589', currencyCode: 'PTS', currencySymbol: null } }
          ]
        }
      },
      seniorFare: null
    },
    emailReceiptTo: 'jahha@wnco.com',
    acceptanceText1: "Select cancel to choose a different flight.",
    acceptanceText2: "Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.\n\nBy tapping \"Make these changes,\" you agree to the below conditions",
    isRepriceNotification: false,
    _meta: { purchaseWithPoints: true, newCardHasSufficientFunds: false, isInternational: false },
    _links: {
      changeConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/change',
        method: 'PUT',
        xhref: '/v1/mobile-air-booking/page/flights/x-change',
        body: {
          changeSession: {
            inboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1Gq8R3q98c-AqKTWUGfEIw.3GrdUC39TB2nqpPjIrdI8pLzBBOd9MvuCl_8-_RwP1oOnDWa3RXDIvxtmosrZZxZ3UO_mMu_rKrFISE6H7AsMEzTXC3gp8xN6Lj6HChHthPpDeyk3deQI2Pnm1nmlMM6Ju8z8hv7m3eMyZ5DErh9UP4udMPn2awHt3yz4fJZvIuk6fOOoJV0j6H6VQqlTbBjD3qIQoVIvJlZoU1lYgdf25L56nzOKXPRho91EvMBvPI8F6eTxGY0yr7vUmId8puIQ0IvubQkPXZFTZcxz7OOzCAHSaOSQNaTKqnWT8UsBtMLyBmwa7bsAF-j-K6XPYcTQYyHKvNjCk16xAOALnv8Y4m4LF6w-ZZHyQfP8C3lg13gqb-pHcX-DvVdNBUXL-cAP29pIj4qoUH34W5hnBzFUrMQdg5hQlDWTbi5M68F1D-lfqCtkC9JmfKQJ-0vFLoaMy4gXyPvAgRF7YbNTD0NWqIF5PB8JTEjb7rMrnRHsmxv_lbN15R_8BbvDtctHZ_vVbWQssjlE6k32zUuuL6lOPO68o-rbDFvCHGTyC1HvoodklyhaSSez5iaAOVdM1wEvHOqGNvYEqpH02JGmlBPE-sNZPRl1G6avX4s4vpseXrR1g5qTVZdJcpVs0ErJeZYj8jhLXzBvS1ZlrDd15RHreBFjEmyIza-GBymalZrj0FIvvIQg0vPOQ6aNwLkvJq03MJ_fjxLo69ZrysMZVtBXPX-SA84XkVvKi-UB-t-GxJUKaP6hzWQ1K5iHCbQyoDyFQMA7jD0k5frt_fwbA4W5CwFFQGDMOTi2CMOLcUfmczDyGLmsJiTk4iZ2UOOb55DJj_An7W7QU2UvjBy84nE4g-0HQ4ezfjIbyO_L5lY6Jb5DDPPZTeQQAkfGuvCk5VKxi1Jp3EVdEquIPLLVXQU7XAQwkSTF04LMmmgauV01dy-rod9is957rT1XeJZMJZSGRJ1UPS6jrlHy6TlK00i8kMc2PpBWmufMxDeeHYp5QwMBK4CLbogW4H02NOQP_uQFg8q0jBHla4dj5P-WmeHwdwP9O7oEi24_EVacQ4pdXPUb5cwcm8GKsn27ZFdPCvSWpu4qI062Hl6blHVO1V6pPIcrkgB7aVNp-4gCgDw9GN8vDD9xeXifQCP7Ob7W7X_K1nnbdLz8M5k2mxMk6IR_9ZSxJ5fNTekyS9GcCCvb5_tU9-3qBOSYy285HSC6-meeKgYikWeS2YERYSKcjfYzVtWW1_KU9oQSjmDr_EHysEtCcQqMTH-2y83QcBzmxcL7d7XauxTcw3ab5uYzrxoY1JPlSAVAc-icl6Odn_VgIdExII-7QxKh8X-PTAf_IGsEUm7U6TxuRboLMdGPS1QJbkEYMeH26qttz6gwi1MshObKpiNLPd6_jAjGAYaOG6dhb25JxRKYigOB9GmKERz8b7PeV9CyqJYvO7kP3PGDlMIDAOXXVfgES8hvyJi05wINRR25kD-GWXO4TUTZBpr6NM7C1Qr0Jb9uyRZ-56VQpvuYoSSBpAEKYwpXHrYYe4M7a90bM-zCFKfDQsYMpxdKIwf-xCcEpTOuS7DYdUqs6n0wUUGelY4IwEE8fVQp-smsFsQJEZCIm4_ZTsDxNv0EzADayi5VdNg9HIuaRMJWgZhPo-bmTHaUNX55TXDmRAoHhgTTqF0tbUIKL18s0PGdyYhmoCDiB3eCfP7LmoNJpTdF3laaCCu00x_NjPi4byr_knZ2TpKFwCeZVvz5vlvF_HGxXOlWLpeA1OaRy3g3Nn_6JsH-cKMTHjKwTsx3_vX-mGnnWg38bdKnOCjNF-olKecVXIN7qTjzww3boJy_Fx7brNbqx9vqqpUJej8r78dHrwy8DJfyN7lHVuuuFLUPggPfElAggW9sMkkYT-KhuyGgUssZYS9ztqFqPRU5E_iS8ScZJSwP2PSwMiFrW-k8jfJLIbJnDPaQruHc1_yUCeQYlscEZnd7heF92JVqScZLXUU23u-0K6zQd7F17To1c3gBqBL6QwdtjtMrIlK-r-r5KZM6y3mCIQIwpwwWeIYB8fS-gTe_LxmoomAvm_rTJ2STlpDJmFPDAyyXihpolC297S8a6gm71tT8GL7JgJQgQVLdGjJDvzftwEXruXZN0oBvNRGHGx7HZsMx0eQN24zjAj8JX8JjU4b5-TVqzKrdW9JdssjxKD2OGXB2-0OhAld0_XFUF3eo8_myWhjS67PIniils9FSgJlEKtT4mdCpqa0_tmviKRNN4haG2e2930HpH5ilvxi8KmtdZdWmkssbL3t6QoaXPjqVQx98UJVxvjStB-HjDpHgdFlqGvmyhxFDmDNc6F2KVNZLjQfL33tLdeQzBYHEScconJLMr3knSiYX6hXzZjIFqmaYmGDWJGqFfajNDoSCeI5rY2hfQ7eiWnVCXlouz0z3hgOVBNbKgwvxzKyhNaIPAgFm1UqGR8qOm6qFFTAEwg3FD1JhvIz-pJrYnRrVkBSZNAM9hSKeSe8rlmv61R9XDlW7YZSdu80f1H7SypejMiFQFJpbf60OGT5JIQ28OS34HlgubR9r5RuBOCgPeGKx91WvJajEvUfWaBSdjFObzGoLDHUa4GTkToBFUR092ZZWXoje5VMqczGaNr3IEnD_s4_pwmcaEEf0Vo1-wiJBENO7l7unaSZQk7cIROl9gawMUe_d_G_RxCzE5_ZTIaFLkd1KK3FhPksx66Jdm-gyVeQRnFNXCcqy-OVioPXveNErgVhbMcbap5MAMpYrWy-j_cW5M97lXyjxiENOKYv90UrRcgjEcUhv9A9JiQ22qhNs0s_c1vmLIg9Afs1UyDQY3AvzjudkhN_Y8l70jql5fjUnsUo_0zZXXi4qIoKfBPzPgywOzM8nhKf1uGy83dUAw1UGa8bH-duNKb8KmWdySBcc-EjPKtCnXLYqsci7RW8GXtrNmd9WEk3ogZj3evOMdESfd63igz4mdeQm3lonw8PpMWKj7ZW4uNOvaxQXpQTMI8-q-G6OksyQkdAcqNVjMEH0T-3TNCNhDh98sNwBarM1zYvR_q8SaNJRC89p6bpkS0Z-89hPagR89bVDUi0ArQo-OQRiLWfJcrnjg_g67nUCQylZoq-6GhrKR84gmMisI2Djyp-dph-xOcDs0vw2rvJT0mEwsnCfitI09d0ZiKDZFvKmKo.ib3gX09agJNrO_FFJCb7Kg',
            outboundBoundReference:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..bJD8Lfn1LZ0TJoP0pDprUA.Jw_UWWQmUc1NGbNFtDniaMjmaJ_2PbAbx1yIoK7-i0TiI61DKL_aUyXFWyyneEBoKPG0MRBf73elJaQXwUoh1jtZv9rSTyib7hWmJNpuh3-6IjnKIKGfxaPn9o31Nbg_aCEqwcUzqU5qZvo3QqHmbpI81eJmftokPmdqV8zqY7OaxkgvP00eMoA2XEybJ5CfuULOcj5fGLCZ6UkaYoH9RYMhNVK5VU6ojlaK0lPqrf-6ilo_Ly9d7jUh26MCQiDDKq4OZgVi7rzo2Pman4g41qPLDO7NOa4E6NRihGToG-naoqvViLqa_ci7As1yHV3kSvzM_4-2JHPdKKOs68FMuztxihoYIX23ykqCyMFVBf-UHUo1MneEWqoaeGZD62oWVNDX2RsQfOXzZs8Z5eGsGakhRvXR42TUbbx0ysecKuVXBrEWmrQHHqlJJZtbcy87JSdI6Ol8dWtrqSvUNbGSozr4tG0R4QNgfaK5FZmTWWWolHoR5qDHJv9oBwDMJVBY6rVGSRgEiHvn_aasD3ZI8c1XDkkEwpaK61U6d82ulIf4FqcXe3HRfmrGrY1KO5xwS6hde4i_RlzndIaqUFrC57veQQL6w7MLx68jn12b_d6DtBbp83YtvzVSWfxzB14VtzZFvKP-7l8eZ-ZUpFEAC8lWB8STfywOigVt8ET2JXYX8eh0GDg7ly4cmDL9FNYoCB9VDlCYphna3Uo_IMekbr62wcLcaAd8MCuobzJC1aD2w8LhtpXIbzGds8gGH77F2i0krfwcpawwO-w3wgykmPnPIgVV0A1K82GjGWi8D8Dig8hdp_KKJ_m71LbYrroWO4F8iyW4itUyH5ZvbYz4t6HCJKPHaT2E-sWCvTRLa8iv5e_ByeZ_UMLyyY_a9hazBKYQXPeGelmBGE40ztHnEMmIusGLljPKzkmJrvClYyJqLc6kManvZX6tURQUFsOlyOlxi6x-OaJFgIAmHL5GeEfUpEFR1mBOJB2vYoDhRBYgs1gviEAV4py0ICme5bkiJc2GKTBufSCxZciNemI4_aBRYGD0kp2YqT_HecBIuCxhDz2czvrE7TFEv6m9Hk1vHvjsmonIQ0ebSVGlluwOesOlpQkZ5ySAvZvxiuRTKGjnSCidIQ-bHow2oyt9YmpHBvnJNtRWkPe3qRCLTc0jNtt76fc-pVBBAFiVFK2kL7F45gas2_iozhD2ahMX0uqB9mCJlAWwBZDO9anjMIGy-vBTJ0dyVXvAKFBkCqw-LJ33kr5CLUCm-DxBBERB9Nb4jVzYIX--upOns2iPUb3sjidQ0aSV2g0Y8x2E6pF3EStKDBsdi5XIA8FumFRbyIAO_GKbJjthOHJEhSczWD_F3wC4jjFRycYCLlpN6k1-EA8pc72pqcnsyz1TdGjezn_nqk6d4Lv12xfMKTiw6hX7hDH_otDM70nLvrITJoaFXGMbRmjiN0NkRfbmBKk6U-PL3V6U374mNVCwzHe3e5Ka3a5cIlFb5ApMwWZQMzrtG9ag6tS0xDj2ks_ask1o3mkIzP7kl35F_7Q5IeCrPmDKCuYK1jxIhc2_lxsXHRaSBa6m94tZZx7ab19WeP_cpuGCM2l_88In-vVT3tq_Gya7vxsZq5YhcnqAn4x8gJ-59niN7IYf0HMg7zucLTIB5cJBS1QoGuX2FeJblnSJrNgFFOcALJlhF52EYZO6xtx7ts4elYNWPErrEVDLChLZi8o8MbPL8IokGkdXJ-HH0okPc2xuDzRS4lCL2jFdZwvwbBYdoyIFYphCXaoTdfd4GSWR_Spq_pMBx5npUGNOrg1bI7T85rJEnXvifkXsKruR3_1GOymIcD37WPIbIvc4Dl_zPtJnsqFRbxpe7NFoNcxt3bDCK-4X40vW0arqlj_JyH6m-YD_L9H6tjqbENTzltAwXOpJk31GERx9ybNRZq3AuzLxTPJ-f9dGQ9X-vwWn77m84XzOqqEYkfwaeYlQKGIY0MF-vL7C7ZsMxTpf7RCmV0jnDb195uvtHKo1HUpelinSx4WY3x1OQXbe-gAO2x8bfV7zChhi6oFE0HGLiOPLyI6BguNAH9DyB4LB4GBoEB7g07TKF-UrEwRudAETDcwU4LfHgzJhgW4wIV1rcAlPrV-EgVMDxlMQX3l0xj0_-jI4u9ay-X-PcXgS8kt7LWlU28-XLtnZZj0u9kAv-XRy-Gw77bhQ5eq7FHFB5EcOatQSb3NFola-vvQaW1gUuNalpq2REVDk6GSRRW1Q906mGlV7cx8uzjGgP-IwF-5mrIgHfmpECUZnGWULcDGTw_3rodSSuvh1gefkqjau_923IZeBZyFqC9iCg3LRXh7WgE9Sw8lT9vuG3r8hvbMig-Xnj-obdVHVbS7m4HctdqBlRIJEtEtKVHp41zozR6avxUfDZsyZ7O_CClx7um75eWUYs7nA9jUd-VhvYGQf1LdtmX6LHxtJ2wADkL1cWix70hHuDnMJopA_jgVAToHKMFBB-iRB2cO13AXF-Ul_HU2aXqBmPmoz7Ndcijva719iqukXulKL3p9TAq4FUbmIboIU5YLgKRkDoIganeuoisoCfe8txlpCBrJB7hhLsqEgYL_AAjs5ESgk7caL5AvHVW_at9-DgF7Pu0UAX0FmPAGrPkDwv8jlYQ2UEzdeUwQXt51D9w9ydGvdZeP8JuQjlPHhp7eMR1wHy0nPf7UWIQgesFWD_3DXm88sNd_q7eGzJfy1P2VYsmBlifWGB50ZtUoDtV9XaAUiSHBmilc5Rnz9GvrT2fYQFt6AhaWaHpSj8s_eEJfuUFrsOTWDxhsrr7c3IuR6D6hfgG7ryMidX9bX-TcsFYCnzr0ivUpkP9N-2kcE8hzmyzEfCKG5m0gkWVPHkeA5Kwk2TJZyr9lzjZDp0bIbwkJ8fsyjXknAJVX6iodV6zC4R0OSD3szVe6OZmiDmYxT-qzu5_t53VZQ8DzfINp5tkiBABLi5z6pN66C7hEP0kgfLWX8wGvwCAW-vH_dLRFI0nHPkeD5D-gVUznDqDwJP1sS_d4Il5sWHa9WiKj_yMJ5MXS3dXNiUTFOwMSsQNd1hEpQD7mlOaGD1xy-rqRzM1EQLotIegI464KjqE7hhF0d8cMgKPCJa1HEjHFixrobzBygaedyeKFjRYg5LhZBastxuCm-o1nf5fRUyT8.Gz-rL5zES0Z7T9OxFJpOaA'
          },
          productIdToken: {
            inbound: null,
            outbound:
              'eyJwcm9kdWN0SWQiOiJXR0FSRUR8RkZQfE1GRixNLERBTCxIT1UsMjAxOS0wMi0xNlQyMDowMC0wNjowMCwyMDE5LTAyLTE2VDIxOjEwLTA2OjAwLFdOLFdOLDQxOTEsNzNXIiwicXVvdGVkUHJpY2UiOiIxMzQwOCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IldHQVJFRCIsImZhcmVQcmljaW5nVHlwZSI6IlBPSU5UUyJ9'
          },
          newFlightToken:
            'eyJwYXltZW50Q2hhbmdlVHlwZSI6Ik5PTkUiLCJyZWZ1bmRhYmxlQ2hhbmdlVHlwZSI6IlBPSU5UUyIsIm5vblJlZnVuZGFibGVDaGFuZ2VUeXBlIjoiTk9ORSIsImNoYW5nZUNvc3RUeXBlIjoiRVZFTl9FWENIQU5HRSIsImNoYW5nZVBvaW50c1R5cGUiOiJET1dOR1JBREUiLCJib3VuZHMiOlt7ImRlcGFydHVyZVRpbWUiOiIyMDowMCIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTE2IiwiZnJvbUFpcnBvcnRDb2RlIjoiREFMIiwidG9BaXJwb3J0Q29kZSI6IkhPVSIsImZsaWdodCI6IjQxOTEifSx7ImRlcGFydHVyZVRpbWUiOiIwNjozMCIsImRlcGFydHVyZURhdGUiOiIyMDE5LTAyLTIzIiwiZnJvbUFpcnBvcnRDb2RlIjoiSE9VIiwidG9BaXJwb3J0Q29kZSI6IkRBTCIsImZsaWdodCI6Ijg5MyJ9XSwiaXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJmYXJlUHJpY2luZ1R5cGUiOiJQT0lOVFMiLCJiYXNlRmFyZSI6IjI4LDk5NyIsImZhcmVUYXhlc0FuZEZlZXMiOlt7ImNvZGUiOiJBWSIsImFtb3VudCI6IjExLjIwIn1dLCJ0b3RhbFRheGVzQW5kRmVlIjoiMTEuMjAiLCJ0b3RhbEZhcmUiOiIxMS4yMCIsInRvdGFsRmFyZVBvaW50cyI6IjI4LDk5NyIsInBheFR5cGVUb3RhbCI6IjExLjIwIiwicGF4VHlwZVBvaW50c1RvdGFsIjoiMjgsOTk3IiwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCIsImNoYW5nZVR5cGUiOiJSRUlTU1VFX0RPQ1VNRU5UUyIsIml0aW5lcmFyeVByaWNlUmVmZXJlbmNlIjoiMSJ9LCJkaWZmZXJlbmNlSXRpbmVyYXJ5UHJpY2UiOnsicmVjb3JkVHlwZSI6IkZBUkUiLCJiYXNlRmFyZSI6Ii0zOTkwIiwidG90YWxUYXhlc0FuZEZlZXMiOiIwLjAwIiwidG90YWxGYXJlIjoiMC4wMCIsImZhcmVUeXBlIjoiTk9ORElTQ09VTlQiLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEifSwiZmFyZVN1bW1hcnkiOnsib3JpZ2luYWxUcmlwQ29zdCI6eyJpdGVtIjoiT3JpZ2luYWwgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiMzIsOTg3IiwiY3VycmVuY3lDb2RlIjoiUFRTIiwiY3VycmVuY3lTeW1ib2wiOm51bGx9LCJ0YXgiOnsiYW1vdW50IjoiMTEuMjAiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sIm5ld1RyaXBDb3N0Ijp7Iml0ZW0iOiJOZXcgdHJpcCB0b3RhbCIsImZhcmUiOnsiYW1vdW50IjoiMjgsOTk3IiwiY3VycmVuY3lDb2RlIjoiUFRTIiwiY3VycmVuY3lTeW1ib2wiOm51bGx9LCJ0YXgiOnsiYW1vdW50IjoiMTEuMjAiLCJjdXJyZW5jeUNvZGUiOiJVU0QiLCJjdXJyZW5jeVN5bWJvbCI6IiQifX0sInJlZnVuZGFibGUiOnsiaXRlbSI6IkNyZWRpdCIsImZhcmUiOnsiYW1vdW50IjoiMyw5OTAiLCJjdXJyZW5jeUNvZGUiOiJQVFMiLCJjdXJyZW5jeVN5bWJvbCI6bnVsbH19LCJ0b3RhbFJlZnVuZGFiaWxpdHkiOnsiaXRlbSI6IkNyZWRpdCIsImZhcmUiOnsiYW1vdW50IjoiMyw5OTAiLCJjdXJyZW5jeUNvZGUiOiJQVFMiLCJjdXJyZW5jeVN5bWJvbCI6bnVsbH19fX0='
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
