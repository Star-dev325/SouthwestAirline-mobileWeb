import _ from 'lodash';

export default class CancelRefundQuotePageBuilder {
  constructor() {
    this.cancelRefundQuotePage = {
      headerMessage: {
        key: 'CANCEL_REFUND_QUOTE_HEADER',
        header: 'Please review your cancellation.',
        body: 'The following flight(s) will be cancelled for all passengers.',
        icon: 'WARNING',
        textColor: 'DEFAULT'
      },
      recordLocator: 'J4PGLC',
      requireEmailReceipt: false,
      receiptEmail: 'RJZUP@WNCO.COM',
      passengers: [
        {
          name: 'Juszr Hcxjv Hdcgo',
          accountNumber: '601545232'
        }
      ],
      cancelBounds: [
        {
          departureAirportCode: 'ALB',
          departureDate: '2020-08-01',
          departureDayOfWeek: 'Saturday',
          departureTime: '05:05',
          arrivalAirportCode: 'DAL',
          arrivalTime: '11:15',
          productId:
            'WGA||FLBVHNRO,F,ALB,MDW,2020-08-01T05:05-04:00,2020-08-01T06:10-05:00,WN,WN,2577,73H|FLBVHNRO,F,MDW,DAL,2020-08-01T09:05-05:00,2020-08-01T11:15-05:00,WN,WN,2899,73W',
          checkInEligible: false
        },
        {
          departureAirportCode: 'DAL',
          departureDate: '2020-08-08',
          departureDayOfWeek: 'Saturday',
          departureTime: '06:00',
          arrivalAirportCode: 'ALB',
          arrivalTime: '12:05',
          productId:
            'WGA||FLBVHNRO,F,DAL,BWI,2020-08-08T06:00-05:00,2020-08-08T09:55-04:00,WN,WN,5606,73H|FLBVHNRO,F,BWI,ALB,2020-08-08T10:45-04:00,2020-08-08T12:05-04:00,WN,WN,2892,73W',
          checkInEligible: false
        }
      ],
      tripTotals: [
        {
          amount: '245.96',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      ],
      pointsToCreditTotal: null,
      pointsToCreditAccount: null,
      refundRequested: undefined,
      refundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount: '45.96',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      nonRefundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount: '200.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      guestPasses: null,
      showRefundableSelection: true,
      cancelBoardingPassMessage: null,
      _analytics: {
        recordLocator: 'J4PGLC',
        gdsTicketType: null,
        tripType: 'roundTrip',
        daysToTrip: '52',
        multiPax: null,
        boundsInPnr: '2',
        boundsAvailable: '2',
        boundsCancelled: '2',
        isInternational: false,
        isSwabiz: false
      },
      _links: {
        cancelPolicies: {
          href: '/cancellation-policy',
          method: 'GET'
        },
        cancel: {
          href: '/v1/mobile-air-booking/page/flights/cancel-bound/J4PGLC',
          method: 'PUT',
          body: {
            productIds: [
              'IldHQXx8RkxCVkhOUk8sRixBTEIsTURXLDIwMjAtMDgtMDFUMDU6MDUtMDQ6MDAsMjAyMC0wOC0wMVQwNjoxMC0wNTowMCxXTixXTiwyNTc3LDczSHxGTEJWSE5STyxGLE1EVyxEQUwsMjAyMC0wOC0wMVQwOTowNS0wNTowMCwyMDIwLTA4LTAxVDExOjE1LTA1OjAwLFdOLFdOLDI4OTksNzNXIg==',
              'IldHQXx8RkxCVkhOUk8sRixEQUwsQldJLDIwMjAtMDgtMDhUMDY6MDAtMDU6MDAsMjAyMC0wOC0wOFQwOTo1NS0wNDowMCxXTixXTiw1NjA2LDczSHxGTEJWSE5STyxGLEJXSSxBTEIsMjAyMC0wOC0wOFQxMDo0NS0wNDowMCwyMDIwLTA4LTA4VDEyOjA1LTA0OjAwLFdOLFdOLDI4OTIsNzNXIg=='
            ],
            cancelToken:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..rgOcSLrdV-FLFaTpCBVhnQ.P2v2lGbvjtS02liZyVP3ZjEs1oaXNTL3LjuJrqBT1GYivzHv2nkYpo7TRjFzn-IqdtcIHii46EaYq1mmnTkHjpZqg8TPcIQkGvSavjao9liA4JecQ1dafp6BpNxpS3Bco20z5vGVg_CbV5rY0Y7RM3wRkgr7iDzdW4Ew90lxWoHD5qgKsvyjywgTt39vVvBMCtBxg0q0OCWWxXaQZ8Tu_nSmdhu4mX2wT-AcB5SXeEp3uRlguW_pme9QR-xvIhxQjtcMsOf5YyFyosxHXtb8puOl8XM8dVcFJOPp8c6lhipuwqmKQcUIHiSFVFPlnDxiloOyINW_ZAS6At0RjHtabbrZFk645PJwSed9c5l9D9ZBSV4ydqwHCh7muianYU7qE8BJyi7jsMBInyroR4lqD5Zely343Pqvartu1KbRkuLuFm9D4NVhCR1kP8QBo-2OU3sKJF5PECVe8ODcenKCzF1J8P5Ak7Eotsg1Xq99UZiU0ijBJR8efjdDpFUmtforB5lURy-oNor3rsmSKDsHR6VmvZKJwUtMWGlxGurAmS9ptWRVce2-FbTIj0IBeY9WMD-F2V22OVXrg8BamCRKqytS6YL-g0GUSJFOrpOJIL6R_LH22G1myiD6Au5yAc4o1Exbc0l-vQ3PuMuOUEb6qiWjEWbb-N1TNhYRftvuHgr-ornA1W2oS5N7_xXMhgUiWGCkj5Y2M0NXOpH5G9YutYzS8MSEUXuDrZsiG4ox204XwxiyfUZYQEN3zxxD344rvbv-Y3MdPeiefAda_2YyKNhGtYhKazjXgZBKVkud5vlCfeZaCWRh6O9N2YPx4ZMMEq5gPr_pswqQ5B45OU2pESrSC2DOeexKvHVN-NxRAvEOzDnNocfVXdvlhIVNqXYECJPhlOY8bWSQUPaePdXEIKaTDvu3gcrdtZRX9x06GzdaxrpblO7ZqEyH_QPx4GYYqrQQPM9dxL01clLrr4hSxqbflN95v0SDV8jmzIPSKvEkbSEq_So49Y5_Qw0O3E8Hu9uUXQHDhiOyX6sYlfFFyT1l36nVjdcSHLIQWB38mNDEWuQ_50OglzWYtwtdADKBmWa2hVSwBjkZNHTJlU01rV6GEIr9h2vDUFocPwpFLALHgiLPqsn5BhZJXCdeBvDtQi2XS9j1B4fRm3HH0-0wArG63Wd9hSm-3V6yWmLGXdeKohzaR9jFvzsLFaKpv-lmedS6UW8dQsidfYgnqSQLVcYuqtb84a6m-h_c_Kq91SwHUXFIi-YzS1DdxSow4qHk7VYvNxUfW48fy7uTZpaIuksBT9KcE4lnP5_te0dN4G6FIEJDCHqmGVCO41JVP1KRTq0iH8CDrBolFdJVk4spjKY8EUnHKBdcFBIW4ijL20psZQLFGUtBpIcj7SligG0KT_3vXt7itw1knzCNSO04Lyc8nGkaoxh4zGTBiCY1KyG7EW4T37CBAHKPIl5RO6k8L54pWQu03BERj6rdXccGAJL1G92jlHSoKOOM9WwbVWEO0q5SNsAkvJoN6tAKYfnCXBa3N3Pt4F-2xmTLlYkYE9O2wSzLz4RJoGyo9zF9yA5ifz3L_DFNPBFl6rILMWkh8S8nMezUbqg3hUwtokjdcX7X_eaC9GgY6uExbNUpSDO1Jbc2K9_9LHUKxSoHk16dkIAL1QJCpMhyp4X3I32xOgFryCl84BecvmGVV7ikBfLCejBRn15wSElHquDk2cKXBfPh-cRFQKaqM8Byw4vxMQyBJiDUIks0rlJ7gCAQNIyY2s2M19mvYPqzgzSBOelH-dviylXooFF07gXGFziGucIHyqlXEqqSHt65bQmjIRyNGvn11vUounCMmCPq2qZEUn3FisWWwLwbQ1i32VOpO6Mi21oxK0jC4islrvYEMyQlYYKzfo4D2h3z4vzK8olO3Zh-BHJ42NLL-TULtd878i_ABMeSrQSHzHCoaEkhQ_Te-irK66xYKDm_EnTz7xYhrtcjE8mhtubH4JUAu6j3qurv6-MHkegSBOLkcz4LnBZf2x199iAmRrLWQjFA8aNgYMQyZ7BzByY051fA_l8mvzzLyXzK9j_n0AWC0aQKGLreEhCRJDFrS3AywGFhDq24zBenqcLuh4_ZPsQqNKSMhy5Xf0u1auFLqSzEhXJnQ3AEnqtMI307XTvwt0CtZUDD43_INyuvFoKaQUfHxs5j5ps-q2oB4fmdmFN20Aud1m20hGlZLyeEnKtO3AQcLON8uAcLjqfMBMkDE2T4cUiyllEavaeXbDu4qrYGcp2Mgrps6cQJmJn4BwBy3Bbfh49O_HoVDagBaXzF68b90c3IVZ6D4GdI7016zKokS_2Z8al46Ieag0ZU07cgtR22f8FMkFsdTQka-EBLEKVeaJcioVTQ42ux8L6iEgUhLjLXf0nMKpdNcsog04HphsAsacN83WKMpyhYTNwDnp7NcxHsn3HJHtxGhbsBz-4HQ6gAZM2RsO6tTkbYp_wSBEaZkvjoo4yJWyDqjyYOgR-EQF8b36OCO-DRVeUDmuhcUMcHFEPTF1e67jgsc_dv4YhMfqbSRkhKNJPJa6ME8QNz4cxlWpI0wkhD9ypQxq7sKia0iUqBOHIwsylgSl0vXiTEM3IzHJ04StDHwObUpj7hTE4T8l98Z4vQfFStFvLUvbdBtDt8Y9NpruP1cXS_dB-AHKEyGPsbZ3_NHbGSR5bPkJuCtZL-esekGl96w6MevGUnrcngoOxm5W3JG-6ngYcpyLsGtkgWoDAQD0ASLvVb7BFSNPecTv1lGVgow2FRU9TheFm2afLjor2H0SbUfXr9BfjLhGplaf8kfHnrwHedq6ZXHqET26OYSMb-INMA2UT78a07S9vWwpFZpQXM--uhD5kjzarEnmLhqd1q11FAuEgORXgpeaScEbfmedchevHtMcJk9uuOwubFhezic3BPKswbLFITiw8u9MaoTdpPmux8naYgSZc2EuwvGs9OfSdU21B5KyV7cegxjU-ZMepUSY-W_vzQ7jLBrADOYvPbUSZUA4uNIJ8Pr6-pB6VUv8D-C2QrzsJbDHIDQcx5rlzVTEtlEEDMir3WZkJt1IeKStnzHx5293ijf5Lf9Z6BtMG-Fa-WGEhPDtn7XZcD3bC-yrbNr-caGiUDlCqWBhlht7m5eKlZbf9C2-EB8nvi7WMfba0YDxOlWexVvNUMfG-0cYYbZfMPuH6pVNaHpcSlWO-_v-pksWTf8lyOBPdpzAahKUZvE_gM19IMMnkd4U_gUEMYX7FbWCPdkUch-t2xGUwKUlNNYqHwXm49GgrY-FlSbxsTKSWvM9qWol_lykK5uBE0KLKQhVndOyzNw9ZXw28Nlv2sFWFRKMiMPGUaCDz2ictxkC0QX-N829Yplq1Z4qjylD4inaCzL_U6HXMuXStMjCmyUFcU2pDROuGL1MJ3gsxox4rBF_x20fO-8l2FmHGva9LUnXca22o8-HOOl0Xsa7kHmKXGUUArCWSu4rdO7ubkHoZhM0uWKy_5M_xlLqKx5IymbAJ-FEUn_3QZ72UGoVUpbWQiNQb8oQDq8L0WwOZ_aTm7S9wjhgCLp4iFiNIs1LLAEn7tce3PzNakBxlDtElefbXstFXb9TPnrCqYXKEB4r8valJcNxu8-farzlnssmkqdjwcFpajLgw1iLncd6NJD7E1FtX_SIsnHQd40tR4DcwlJ9v9LEUYkMwf4W8cmbq-_IS2SU6DfGTuhaUPyCZsXn9hFHIS4FWrxobY8t1Gu6O6d5dXjBT3zPbnIMnQouZFQNAohrxhKtu0pLpEDnjsMDpxHh5vHf8m0MS8XQmFRT7iBKeXmcfSJr1wZKHLUdj5X1ddRZWBYDjdkBe4kShP4HBvxWrPT_nNypcB7urOoq3XeC07kRyGjL9800AD39jXRUBAjPQCtc-nG8TvY5Ib3X5ZkYcNUC22Y9ee-hXS92uqu8LCTp5yXFMS43UG5BBSSU6ZjmszEw_vyqm3Gca-ChLfocyt3W__BAYWXqaVvhAZixZW23an_jC04Jo1MshV7MFAJ1A7umrO2nnPdeMpVq6bQYGq1dIYYrh37a5Lm4jqJQoMJP2l5WaqC4n_4de6oE48mxeDXKp_icVL-phz9tJcy0A8lZttwaGvmgkxJy7d4mu0qJJKpIIcccL9qx-hFTOGfhcE-ac8h9enkV-sFd76G0S9Wru-G2kuoxCJtIzTH3E6xv7tw5ybb5UAndNZFA9NUnA_pP_VnCmkCGgV7yjfeyuIzXf7bo7DxASNpUPgLz6zqMhguW65o5nOsbOsaYD0aJ2N0Et2BGBRAv5xsnjXxEJirPmHUGmYgtJAXC9FsXADhbBuiJFrjRt-BwsuZvFR3iZaHYhriEFuFg.l4wRThnIwMI7vmDHA2F2HA',
            passengerSearchToken:
              'ISqjPCVJsKP_8NzoS1gytUfMzyyOav8zoO__KrAMNbEM7S4_p7aCPvZ8XNSaR8RvB_2Lz3HXa0xTWsV_cP4atIRNpFjMIF6SV52QqBN3SZwPq3aHlZCeM1OktauQux9gtBgxBNIGLheZjB8mCQ=='
          }
        },
        refundQuote: {
          href: '/v1/mobile-air-booking/page/flights/cancel/refund-quote/J4PGLC',
          method: 'POST',
          body: {
            productIds: [
              'IldHQXx8RkxCVkhOUk8sRixBTEIsTURXLDIwMjAtMDgtMDFUMDU6MDUtMDQ6MDAsMjAyMC0wOC0wMVQwNjoxMC0wNTowMCxXTixXTiwyNTc3LDczSHxGTEJWSE5STyxGLE1EVyxEQUwsMjAyMC0wOC0wMVQwOTowNS0wNTowMCwyMDIwLTA4LTAxVDExOjE1LTA1OjAwLFdOLFdOLDI4OTksNzNXIg==',
              'IldHQXx8RkxCVkhOUk8sRixEQUwsQldJLDIwMjAtMDgtMDhUMDY6MDAtMDU6MDAsMjAyMC0wOC0wOFQwOTo1NS0wNDowMCxXTixXTiw1NjA2LDczSHxGTEJWSE5STyxGLEJXSSxBTEIsMjAyMC0wOC0wOFQxMDo0NS0wNDowMCwyMDIwLTA4LTA4VDEyOjA1LTA0OjAwLFdOLFdOLDI4OTIsNzNXIg=='
            ],
            cancelToken:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..rgOcSLrdV-FLFaTpCBVhnQ.P2v2lGbvjtS02liZyVP3ZjEs1oaXNTL3LjuJrqBT1GYivzHv2nkYpo7TRjFzn-IqdtcIHii46EaYq1mmnTkHjpZqg8TPcIQkGvSavjao9liA4JecQ1dafp6BpNxpS3Bco20z5vGVg_CbV5rY0Y7RM3wRkgr7iDzdW4Ew90lxWoHD5qgKsvyjywgTt39vVvBMCtBxg0q0OCWWxXaQZ8Tu_nSmdhu4mX2wT-AcB5SXeEp3uRlguW_pme9QR-xvIhxQjtcMsOf5YyFyosxHXtb8puOl8XM8dVcFJOPp8c6lhipuwqmKQcUIHiSFVFPlnDxiloOyINW_ZAS6At0RjHtabbrZFk645PJwSed9c5l9D9ZBSV4ydqwHCh7muianYU7qE8BJyi7jsMBInyroR4lqD5Zely343Pqvartu1KbRkuLuFm9D4NVhCR1kP8QBo-2OU3sKJF5PECVe8ODcenKCzF1J8P5Ak7Eotsg1Xq99UZiU0ijBJR8efjdDpFUmtforB5lURy-oNor3rsmSKDsHR6VmvZKJwUtMWGlxGurAmS9ptWRVce2-FbTIj0IBeY9WMD-F2V22OVXrg8BamCRKqytS6YL-g0GUSJFOrpOJIL6R_LH22G1myiD6Au5yAc4o1Exbc0l-vQ3PuMuOUEb6qiWjEWbb-N1TNhYRftvuHgr-ornA1W2oS5N7_xXMhgUiWGCkj5Y2M0NXOpH5G9YutYzS8MSEUXuDrZsiG4ox204XwxiyfUZYQEN3zxxD344rvbv-Y3MdPeiefAda_2YyKNhGtYhKazjXgZBKVkud5vlCfeZaCWRh6O9N2YPx4ZMMEq5gPr_pswqQ5B45OU2pESrSC2DOeexKvHVN-NxRAvEOzDnNocfVXdvlhIVNqXYECJPhlOY8bWSQUPaePdXEIKaTDvu3gcrdtZRX9x06GzdaxrpblO7ZqEyH_QPx4GYYqrQQPM9dxL01clLrr4hSxqbflN95v0SDV8jmzIPSKvEkbSEq_So49Y5_Qw0O3E8Hu9uUXQHDhiOyX6sYlfFFyT1l36nVjdcSHLIQWB38mNDEWuQ_50OglzWYtwtdADKBmWa2hVSwBjkZNHTJlU01rV6GEIr9h2vDUFocPwpFLALHgiLPqsn5BhZJXCdeBvDtQi2XS9j1B4fRm3HH0-0wArG63Wd9hSm-3V6yWmLGXdeKohzaR9jFvzsLFaKpv-lmedS6UW8dQsidfYgnqSQLVcYuqtb84a6m-h_c_Kq91SwHUXFIi-YzS1DdxSow4qHk7VYvNxUfW48fy7uTZpaIuksBT9KcE4lnP5_te0dN4G6FIEJDCHqmGVCO41JVP1KRTq0iH8CDrBolFdJVk4spjKY8EUnHKBdcFBIW4ijL20psZQLFGUtBpIcj7SligG0KT_3vXt7itw1knzCNSO04Lyc8nGkaoxh4zGTBiCY1KyG7EW4T37CBAHKPIl5RO6k8L54pWQu03BERj6rdXccGAJL1G92jlHSoKOOM9WwbVWEO0q5SNsAkvJoN6tAKYfnCXBa3N3Pt4F-2xmTLlYkYE9O2wSzLz4RJoGyo9zF9yA5ifz3L_DFNPBFl6rILMWkh8S8nMezUbqg3hUwtokjdcX7X_eaC9GgY6uExbNUpSDO1Jbc2K9_9LHUKxSoHk16dkIAL1QJCpMhyp4X3I32xOgFryCl84BecvmGVV7ikBfLCejBRn15wSElHquDk2cKXBfPh-cRFQKaqM8Byw4vxMQyBJiDUIks0rlJ7gCAQNIyY2s2M19mvYPqzgzSBOelH-dviylXooFF07gXGFziGucIHyqlXEqqSHt65bQmjIRyNGvn11vUounCMmCPq2qZEUn3FisWWwLwbQ1i32VOpO6Mi21oxK0jC4islrvYEMyQlYYKzfo4D2h3z4vzK8olO3Zh-BHJ42NLL-TULtd878i_ABMeSrQSHzHCoaEkhQ_Te-irK66xYKDm_EnTz7xYhrtcjE8mhtubH4JUAu6j3qurv6-MHkegSBOLkcz4LnBZf2x199iAmRrLWQjFA8aNgYMQyZ7BzByY051fA_l8mvzzLyXzK9j_n0AWC0aQKGLreEhCRJDFrS3AywGFhDq24zBenqcLuh4_ZPsQqNKSMhy5Xf0u1auFLqSzEhXJnQ3AEnqtMI307XTvwt0CtZUDD43_INyuvFoKaQUfHxs5j5ps-q2oB4fmdmFN20Aud1m20hGlZLyeEnKtO3AQcLON8uAcLjqfMBMkDE2T4cUiyllEavaeXbDu4qrYGcp2Mgrps6cQJmJn4BwBy3Bbfh49O_HoVDagBaXzF68b90c3IVZ6D4GdI7016zKokS_2Z8al46Ieag0ZU07cgtR22f8FMkFsdTQka-EBLEKVeaJcioVTQ42ux8L6iEgUhLjLXf0nMKpdNcsog04HphsAsacN83WKMpyhYTNwDnp7NcxHsn3HJHtxGhbsBz-4HQ6gAZM2RsO6tTkbYp_wSBEaZkvjoo4yJWyDqjyYOgR-EQF8b36OCO-DRVeUDmuhcUMcHFEPTF1e67jgsc_dv4YhMfqbSRkhKNJPJa6ME8QNz4cxlWpI0wkhD9ypQxq7sKia0iUqBOHIwsylgSl0vXiTEM3IzHJ04StDHwObUpj7hTE4T8l98Z4vQfFStFvLUvbdBtDt8Y9NpruP1cXS_dB-AHKEyGPsbZ3_NHbGSR5bPkJuCtZL-esekGl96w6MevGUnrcngoOxm5W3JG-6ngYcpyLsGtkgWoDAQD0ASLvVb7BFSNPecTv1lGVgow2FRU9TheFm2afLjor2H0SbUfXr9BfjLhGplaf8kfHnrwHedq6ZXHqET26OYSMb-INMA2UT78a07S9vWwpFZpQXM--uhD5kjzarEnmLhqd1q11FAuEgORXgpeaScEbfmedchevHtMcJk9uuOwubFhezic3BPKswbLFITiw8u9MaoTdpPmux8naYgSZc2EuwvGs9OfSdU21B5KyV7cegxjU-ZMepUSY-W_vzQ7jLBrADOYvPbUSZUA4uNIJ8Pr6-pB6VUv8D-C2QrzsJbDHIDQcx5rlzVTEtlEEDMir3WZkJt1IeKStnzHx5293ijf5Lf9Z6BtMG-Fa-WGEhPDtn7XZcD3bC-yrbNr-caGiUDlCqWBhlht7m5eKlZbf9C2-EB8nvi7WMfba0YDxOlWexVvNUMfG-0cYYbZfMPuH6pVNaHpcSlWO-_v-pksWTf8lyOBPdpzAahKUZvE_gM19IMMnkd4U_gUEMYX7FbWCPdkUch-t2xGUwKUlNNYqHwXm49GgrY-FlSbxsTKSWvM9qWol_lykK5uBE0KLKQhVndOyzNw9ZXw28Nlv2sFWFRKMiMPGUaCDz2ictxkC0QX-N829Yplq1Z4qjylD4inaCzL_U6HXMuXStMjCmyUFcU2pDROuGL1MJ3gsxox4rBF_x20fO-8l2FmHGva9LUnXca22o8-HOOl0Xsa7kHmKXGUUArCWSu4rdO7ubkHoZhM0uWKy_5M_xlLqKx5IymbAJ-FEUn_3QZ72UGoVUpbWQiNQb8oQDq8L0WwOZ_aTm7S9wjhgCLp4iFiNIs1LLAEn7tce3PzNakBxlDtElefbXstFXb9TPnrCqYXKEB4r8valJcNxu8-farzlnssmkqdjwcFpajLgw1iLncd6NJD7E1FtX_SIsnHQd40tR4DcwlJ9v9LEUYkMwf4W8cmbq-_IS2SU6DfGTuhaUPyCZsXn9hFHIS4FWrxobY8t1Gu6O6d5dXjBT3zPbnIMnQouZFQNAohrxhKtu0pLpEDnjsMDpxHh5vHf8m0MS8XQmFRT7iBKeXmcfSJr1wZKHLUdj5X1ddRZWBYDjdkBe4kShP4HBvxWrPT_nNypcB7urOoq3XeC07kRyGjL9800AD39jXRUBAjPQCtc-nG8TvY5Ib3X5ZkYcNUC22Y9ee-hXS92uqu8LCTp5yXFMS43UG5BBSSU6ZjmszEw_vyqm3Gca-ChLfocyt3W__BAYWXqaVvhAZixZW23an_jC04Jo1MshV7MFAJ1A7umrO2nnPdeMpVq6bQYGq1dIYYrh37a5Lm4jqJQoMJP2l5WaqC4n_4de6oE48mxeDXKp_icVL-phz9tJcy0A8lZttwaGvmgkxJy7d4mu0qJJKpIIcccL9qx-hFTOGfhcE-ac8h9enkV-sFd76G0S9Wru-G2kuoxCJtIzTH3E6xv7tw5ybb5UAndNZFA9NUnA_pP_VnCmkCGgV7yjfeyuIzXf7bo7DxASNpUPgLz6zqMhguW65o5nOsbOsaYD0aJ2N0Et2BGBRAv5xsnjXxEJirPmHUGmYgtJAXC9FsXADhbBuiJFrjRt-BwsuZvFR3iZaHYhriEFuFg.l4wRThnIwMI7vmDHA2F2HA',
            passengerSearchToken:
              'ISqjPCVJsKP_8NzoS1gytUfMzyyOav8zoO__KrAMNbEM7S4_p7aCPvZ8XNSaR8RvB_2Lz3HXa0xTWsV_cP4atIRNpFjMIF6SV52QqBN3SZwPq3aHlZCeM1OktauQux9gtBgxBNIGLheZjB8mCQ==',
            refundRequested: false
          }
        }
      }
    };
  }

  withCancelBoardingPassMessage() {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      cancelBoardingPassMessage: {
        body: 'To complete your cancellation, all issued boarding passes will be deleted. We will preserve your Boarding Group and Position, however you must check in again and reprint your boarding pass. Do you want to continue?',
        key: 'CANCEL_REFUND_QUOTE_CANCEL_BOARDING_PASS'
      }
    });

    return this;
  }

  withPoints() {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      refundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount: '2.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      nonRefundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount: '3.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      tripTotals: [
        { amount: '16,310', currencyCode: 'PTS', currencySymbol: null },
        { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      ],
      pointsToCreditTotal: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount: '16,310',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      pointsToCreditAccount: '601545232'
    });

    return this;
  }

  withOnlyRefundableFunds(amount = '159.98') {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      tripTotals: [
        {
          amount,
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      ],
      refundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount,
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      nonRefundableFunds: null
    });

    return this;
  }

  withOnlyNonRefundableFunds(amount = '159.98') {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      tripTotals: [
        {
          amount,
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      ],
      refundableFunds: null,
      nonRefundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount,
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      refundRequested: false
    });

    return this;
  }

  withMultiplePassengers() {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      passengers: [
        {
          name: 'Age Senior',
          accountNumber: '601005646'
        },
        {
          name: 'Andrew Zhen',
          accountNumber: null
        }
      ]
    });

    return this;
  }

  withLongPassengerName(name) {
    this.cancelRefundQuotePage = _.cloneDeep(this.cancelRefundQuotePage);
    this.cancelRefundQuotePage.passengers[0] = {
      name,
      accountNumber: '601005646'
    };

    return this;
  }

  withRoundTrip() {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      cancelBounds: [
        {
          departureAirportCode: 'ALB',
          departureDate: '2018-09-15',
          departureDayOfWeek: 'Saturday',
          departureTime: '16:35',
          arrivalAirportCode: 'BWI',
          arrivalTime: '17:50'
        },
        {
          departureAirportCode: 'BWI',
          departureDate: '2018-09-15',
          departureDayOfWeek: 'Saturday',
          departureTime: '19:25',
          arrivalAirportCode: 'AUS',
          arrivalTime: '21:50'
        }
      ]
    });

    return this;
  }

  withNoRefundAvailableMessage() {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      messages: [
        {
          key: 'ERROR__CANCEL_NO_REFUND_AVAILABLE',
          header: 'Travel Funds held by travel manager.',
          body: 'Upon cancellation, these funds will be issued to the traveler manager who booked the reservation on your behalf. Please contact your Travel Manager for further information regarding these funds.'
        }
      ]
    });

    return this;
  }

  withEmailRequired() {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      requireEmailReceipt: true
    });

    return this;
  }

  withNonRev(dollarAmount = '0.00') {
    this.cancelRefundQuotePage = _.merge({}, this.cancelRefundQuotePage, {
      tripTotals: [
        {
          amount: dollarAmount,
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      ],
      refundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Total Credit',
        amount: dollarAmount,
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      nonRefundableFunds: null,
      showRefundableSelection: false,
      refundRequested: true,
      guestPasses: {
        amount: null,
        currencyCode: null,
        currencySymbol: null,
        item: 'Nonrevenue Guest Pass(es)',
        itemSubText: 'Refund to Employee`s account'
      }
    });

    return this;
  }

  setRefundRequested(refundRequested = false) {
    this.cancelRefundQuotePage.refundRequested = refundRequested;

    return this;
  }

  setLongCancelMessage() {
    this.cancelRefundQuotePage.headerMessage.body =
      'The following flight(s) will be cancelled for all passengers.\n\nNote: For those cancelling within 24 hours of booking, you are eligible to receive a refund. Click the cancellation policy and information link to find out how to receive a refund.\n\nNote: If your flight is cancelled by Southwest and you choose to cancel your trip as a result, you are entitled to a refund for the unused transportation – even for non-refundable tickets. Click the cancellation policy and information link to find out how to receive a refund.';

    return this;
  }

  withRefundableFundsUsingSubText(subText) {
    this.cancelRefundQuotePage = {
      ...this.cancelRefundQuotePage,
      tripTotals: [
        {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      ],
      nonRefundableFunds: null,
      showRefundableSelection: false,
      refundRequested: true,
      refundableFunds: {
        item: 'Credit',
        itemTotalLabel: 'Credit',
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$',
        itemSubText: subText
      },
      showTaxesAndFees: true
    };
  }

  withRefundableFundsSubText() {
    this.withRefundableFundsUsingSubText('Refund to method of payment');

    return this;
  }

  withRefundableFundsSubTextEmpty() {
    this.withRefundableFundsUsingSubText('');

    return this;
  }

  withRefundableFundsSubTextUndefined() {
    this.withRefundableFundsUsingSubText();

    return this;
  }

  withSplitPnrConfirmationLabel() {
    this.cancelRefundQuotePage = {
      ...this.cancelRefundQuotePage,
      recordLocatorLabel: 'NEW CONFIRMATION #'
    };

    return this;
  }

  build() {
    return {
      cancelRefundQuotePage: this.cancelRefundQuotePage
    };
  }
}
