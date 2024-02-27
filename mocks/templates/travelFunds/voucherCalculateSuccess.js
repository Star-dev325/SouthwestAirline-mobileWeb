module.exports = {
  travelFunds: [
    {
      expirationDate: '2020-08-27',
      travelFundType: 'TRAVEL_FUNDS',
      displayName: 'Ben Lacy',
      fundIdentifier: 'JO3GHK-9249',
      errorMessage: null,
      appliedAmount: {
        amount: '83.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '1,306.36',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: {
        removeTravelFund: {
          href: '/v1/mobile-air-booking/page/calculate-funds',
          method: 'PUT',
          body: {
            removalTravelFundId: '1'
          }
        }
      }
    },
    {
      expirationDate: '2020-12-31',
      travelFundType: 'LUV_VOUCHER',
      displayName: 'Southwest LUV Voucher',
      fundIdentifier: 'Voucher 2398',
      errorMessage: 'Funds not applied',
      appliedAmount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '200.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: {
        removeTravelFund: {
          href: '/v1/mobile-air-booking/page/calculate-funds',
          method: 'PUT',
          body: {
            removalTravelFundId: '3'
          }
        }
      }
    },
    {
      travelFundType: 'GIFT_CARD',
      displayName: 'Southwest Gift Card',
      fundIdentifier: 'XXXXXXXXXXXX-2619',
      errorMessage: 'Funds not applied',
      appliedAmount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '60.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: {
        removeTravelFund: {
          href: '/v1/mobile-air-booking/page/calculate-funds',
          method: 'PUT',
          body: {
            removalTravelFundId: '2'
          }
        }
      }
    }
  ],
  balanceRemaining: {
    amount: '0.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  totalFunds: {
    amount: '83.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  totals: {
    pointsTotal: null,
    moneyTotal: {
      amount: '83.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  },
  fundsAppliedToken:
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MiGOuHRDaebtXADDAH6B2Q.nq2njfKHALp9iOptDgbJtd-TOeILxzv4LRat2eU4R9WOQNWY4xmuQThZWhL7hv7w6y57hn8VzlO1LfJhVN9hY4JuP88NKPeBQ4CVZnNOVDbPPQA54v5AdDNbK5HQ0lWffCvpbKsU9xLweEyhV6DVodhEmK4c-lX7PcXALTYQUUTkbpqK-EDn0LKQumKS3s8C6atNom8KY8r0nVWPkYuIT_tLANxbXAhVPkLLFI-1HVqPuak2J93gn5FGU_kNWg8rm_bo0Gj8Xv5lX5OMJ9dyuHwqM_StKvz01QWYaRXje-0PXs0oF5Pv_OhSJC-rORjsuyzgEG5MLWjUMq5FZ9UISTnolChzcG289dbFCun_Pahdsadk1sQO3A7LTR9RAJ7iO2Z4Q-x8tCFQtDQdvnlFYQPUy83bMHvGEkxQP6Tfg0-4kEdUNfel8oc2IzflK_SIs0FS0yZRfrvxN_czqLXtHHpenwHQ4MfvMF1qTBawq5knv-tNX7ExBPaSSrdZUTm2XUqqXmoUwsO_GxObxBd0ExVONe_Z0xcydqK5L4BcWhw-6myyQQSdIPoHKmminoWcbtz0nAWoN6ZZ4-3ofQMUUKriTDr6U56TNCtC3xoAewMw_KeB3QJT8Scs4VzblJByw4tJWx4WVcWH_ebMlt6BV60oP7zjKiC3lIZ2l3MB8qNVo-PIm4zw6SssG2Cs3vSb27J6qmPInVSjyD-V69Zv-Htrz7GVMY7tMvLIByER58yDjzmgqjE7TA4S35aaggVB7of9M6YRui38jtbA37mK56eiuvmEIvbY7k_zPa1qUA4HwXrOr-7dMmEYG6cUKRlyQfdoJwrv11XQVuEvjaRGCgdiLphW9vCbR5yoifU1OwaJSTvXijnQGInhWmbUIWa03jaZ32PFlSr0ycQT2A6TTALY5fxFnhm0sP2OWpgmGoqOLQwGiJf-qanBwv_Bxgz78lA2oS4K8CADqhlbbHt6f8hKMQzFZD4IZHEQZEf2nKVAit67XWjrriv-L8cVJwrcvuYCvYiK-z80Yh6YSz6RjWMUyOA4Ys2IlQmEe0kyF-sIEmMOACb-V_5AAqV_tTiAHGqcPa3i679YAoh25-wBF8l5Yo9Pdiz0qt10OQDPqyTSsT10akIFX1AVei3RNZgaEU_5A_bLwoaO3a9byLzFfAzbBf3C9YKlohHqdiQpQMwn0XRtiHLlblGDHP3GBbHTNeSEsT_binDe-svj5N--TBXaXl8VTydQ3s013ipiQia8AaFSCN8-_JE3fQpEuy5aMar6BHuEFFvLV6XdIWf1fzbpL5oj2aLjoYXjr4I5qpvCpN7SdQ5Yz1Qj06hzsPLQY6nmbu-BBsw02N8SDNhKKPz5fRMOQR9TU_fWAtwv1gnAtwXSNMOnL6ln59acqUEbwoxc04b3mmK-D6shawDbJNrCDBKHyU0617fuj7g81zhsA_YTEmp-t2O_z_cp9BiacSdb2bz9PV1U3oBzcVQAIiRkoPV0H-Qo1SmcAmXxaqjK13dhwnM_GZD7DyWNdaJrDuuNcO3kuHl9bC3jy2RhEHia67aPfSwSgV5YzHK32LRYAsHf4RZxjplgiI2p0XSD7VKC4SbmcFzG9SC5-1046t-7GZPDWMhvhWI7NVxJsCraR9B8vhskA0OyZEIsSUjTLbyWuaZcz0pVXJSo5NCDVb8mYqThWQr-lvoxXj5RkAi6kT2UdF9kPiw5czBlzME8HlsyN5ABcVgVKMI8sPz8S2YAfYdF77M9tmvsCRftx22LxgVQNns3fnjNfrFHlhENFmD0I54mBsr0KsMr309jpHSu4t0xTltn_L8R1ogRT5WHZJm5EBE4FHmwIaUKp9PbLu3EUuKagsyAen0vj0pFi7yDPdbum96z1Vlf1cqgo5QfkpGf90raCg53Z2evEQe_urY9zDiqqS04jdLu8ugfDflJuuU6SBH7lMYOW9o1RpoXordYberg3ehzMZKcyNVaPr-l5AtrVhIJaTvrR_pEF1RZQaEu1mGsBGAFqLZT4ZQADDLWnwqMfG7EPYDcSgtWde1wjD5hWgdQNYc6EQzhr6T3d5-oq1rKUZzgl3a3i1wSM-hQ6ch4KUWRx_ouArSte5exsQSGZRGaoYTAAht5T0eVJqQqcbnm_NZi5KJszOZWuu_LzsnfhG4REO7kDL2Bh0ycSXJI6XdjLejg9G6usNZa8dBvAbsbROVG5JkGIQJWrYR_aI0_Khj5ndzR3_2b1Vq2eTjiCEZ-0GPsgKgt_G_eWq3LJfaRvR9-rDutV90HpqwqAVo6nv0PbgEvhOgqbnHUy0XJ89ky3w_LSZ30r1c5H9iBpt7u-lD2x6Slp4H7I6PN8T6icVujnuifEy7MX4prZm9rA0HR4oqZew2rfIZGiiDrC5YeRacbPLqooLybUjDtw8sdaDZkMal9ju9XmZmKDch7V_Izj3viSjPkXIFnbrvVlRx0gc2z_eOM2CW68F3uK7BVphxAnbYxO_6MyJT5pFswSvrYPvl_8AJqNhyNFT2VTPSewzRr41DSACP6FXLD2Idhfw3twROEoM9iLmMUWVSCeh8GgsURFGzaAAWli0XyIqXK7KgFELtnomSS63VRfJk28VVz7nm2ITzvN_Q2Gfb_XJdIlx3kxGjqw7PzbR2dysxChCongprzlNic9Ue3nJ3EWDLR5pd0jyF5fnPuy4wXqbnKHkYXeNfJNRfOww7_u8sKlVJXE5v1qxrG1umeJDgj7pFxIryjPXOdzgolPQEwaQ69A4o4W63Fcrv6Wjc_0ws2KV-c8-aQjn7338fx5aEwO-HAOOCvEhRyY8gOSDu0QB0gMO4vYDev-QeYAnIEjr9ANU68J-CNSzqS7gFTHgzRX-k_GRfCXK8RfL35m3Zy2MN_kaTr-eV8DURDySeS8NfaE1_1kywzg_bVsiJK8aHFHV2vtLr9u9tHZ0UYgtJ4G2G3ovHbcf7KGPlwIqHFHe1Ezt5sgLAFiAE_KTs0090Q8cKAPkGWdU9XikN2T5NCrLseP8mTRjXZdlC-shWMkKhXiyESmISRVczd2J_x-QxGA3thE2bA4e0S95PkpQu96w4aok6WIU2aA2qjpPWYH2tCVCNkbsd9Lpyd5QdQxS3HsztDL5BB_mKqH_bOo6n6iXXAi1bw_vR85Q.UAemzJNe6gMR13Ikq_ju4w'
};
