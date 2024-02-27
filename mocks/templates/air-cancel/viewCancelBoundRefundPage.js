module.exports = {
  cancelRefundQuotePage: {
    headerMessage: {
      key: 'CANCEL_REFUND_QUOTE_HEADER',
      header: 'Please review your cancellation.',
      body: 'The following flight(s) will be cancelled for all passengers.',
      icon: 'WARNING',
      textColor: 'DEFAULT'
    },
    recordLocator: 'EMRCPT',
    requireEmailReceipt: false,
    receiptEmail: 'S@S.COM',
    passengers: [
      {
        name: 'John Cancel',
        accountNumber: '601048265'
      }
    ],
    cancelBounds: [
      {
        departureAirportCode: 'ATL',
        departureDate: '2020-08-13',
        departureDayOfWeek: 'Thursday',
        departureTime: '06:05',
        arrivalAirportCode: 'AUS',
        arrivalTime: '09:25',
        productId:
          'WGA||VLA0V2H,V,ATL,HOU,2020-08-13T06:05-04:00,2020-08-13T07:10-05:00,WN,WN,2651,7M8|VLA0V2H,V,HOU,AUS,2020-08-13T08:30-05:00,2020-08-13T09:25-05:00,WN,WN,235,73W',
        checkInEligible: true
      }
    ],
    tripTotals: [
      {
        amount: '314.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    ],
    pointsToCreditTotal: null,
    pointsToCreditAccount: null,
    refundableFunds: null,
    nonRefundableFunds: {
      item: 'Credit',
      itemTotalLabel: 'Total Credit',
      amount: '314.60',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    showRefundableSelection: false,
    cancelBoardingPassMessage: null,
    _analytics: {
      recordLocator: 'EMRCPT',
      gdsTicketType: null,
      tripType: 'roundTrip',
      daysToTrip: '1',
      multiPax: null,
      isInternational: false,
      isSwabiz: false,
      boundsinpnr: '2',
      boundsavailable: '2',
      boundscancelled: '1'
    },
    _links: {
      cancelPolicies: {
        href: '/cancellation-policy',
        method: 'GET'
      },
      cancelPoliciesJson: {
        href: '/content/generated/data/overlays/cancellation_policy.json',
        method: 'GET'
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/flights/cancel-bound/EMRCPT',
        method: 'PUT',
        body: {
          productIds: [
            'IldHQXx8VkxBMFYySCxWLEFUTCxIT1UsMjAyMC0wOC0xM1QwNjowNS0wNDowMCwyMDIwLTA4LTEzVDA3OjEwLTA1OjAwLFdOLFdOLDI2NTEsN004fFZMQTBWMkgsVixIT1UsQVVTLDIwMjAtMDgtMTNUMDg6MzAtMDU6MDAsMjAyMC0wOC0xM1QwOToyNS0wNTowMCxXTixXTiwyMzUsNzNXIg=='
          ],
          cancelToken:
            'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..NQhLfPIWbO85ASGHdI4QAQ.u5aYNHjy2Rr-CyXAyCjhIhw5_PCgOxqEBNUUs-08pIoPta22AK68pnuYu5CnfhlFvYgNwVDu77TepeSNqvXizlWP_eJoBB2C9Fqv1haTqePn59trC8ZH1ulmTuCZE2J-I-IVyh00t67OtBWDO1FhjErKVyX8ZCQxRdjv61BP2mdebM8EHkJSJF_7exQ8Z1Z67pjOVekUSWMGLzcRb5aBPKrin2PwpHz9jQaBi_I_PiLv70UshKtsCq3hg68dgXYEmGtm0jdQ4CrRphNYeiIZ0B84ul6qUJPR2VoZC5lwbScOdeHJOXl21Y555nuTJCITFm2eOYCKqPupzG4eBY_g6aG04jdhQZsp--O13bIPOKZp44CnVHKi31jyAZ8wtlw4ysLzHiuiOH47P8LMrOslYpT4HN-XnZSq571AF-TYEoWQDMjAuV9HXxwP-MLhcgk1_4aZCWF1zwt_k3SO5zVTWOOzgdghBFEd6zUFgOTpKCw85NN9CefZg24kXA506OpMr8l0FFBWcRGyIket9h7VYtpCU4M2qbQb_rb6Bp8165vMnkjnmJK1dRCGiUWBQMvZ6AmlzDdZ0L3nmQtB4GGEj_KSWuKWDyRsfdUFuILz_TO6TQjReOMPhfzo4aR0DHvRmNjHHM0QZ7LTlv0ziUjL0r9EjeNmcyFfomuwmZ1AjxM1GTCA1CeCcUJEgaT71TefHhDrg4kACTuJ7jt8j2hwAIPpz7TLH3XTo2l7k3iA-HRHdK499gAIPKINTXp7irVSI7Mc1H7CoTnqfY6Eh0oB-i5qsGK3yYLQZLFjuUP4ScI_5QuAlweJT8MQ2liiPwL-WmJASlh7YLp-4tBljN5m2DJrf_s4LECYr4oKnGxzlJbrtoqL6TZ2WsRv2An0BKkBKOf_7q6ZmvYGHwCZue3l7d1GQL8cp9G85yIKKtIVT806ck7Df_SDco1HUNlhzIMTdHadqbLzLkC8zdLKxzcKIXYm4y_hkITLr6SHeW4D25hhopSkSeR3uRRtgn1AF5fPhRivebvPJfEbhsimCBSeeQkkDc3z7AW0Fr08mXhfbeG_p8RVdpLHoqE7m0g8kvJbLIAPgRdTCLDaz02XOkevAcz1U-79nVqhE6TmTpc07HXVeKaXWEtHz-XMRos_tVqu8qPFJlmJhGN8JweC3U5Fs9i8ImOWZVvwCacqSH0-Lm7uzzEQ_vRjUUKqXqA9FGs75mfksRrHyjxyp44HugDOkiNIFDQ9kttUmmjcr82bC5ghPL5PgB431OTYIq4uFEcRYl7vMX9ZIWolVXXuvWn_xy9n3nJ6-eJFnox-oJYbosiDE6k41u5f_APvR2B7Itqnba4v7WEkY8z7XO3EcNmWggdnKxlrcgeP3Z4LEmyI17MWHbkkOuCU78ecji68Zwi2gEJm7-9QXhZ1JuRms_KETwG9-1OVs6MjpKP9N2ZmsfkFDASc3Zx8BgmQVIGwgNwqSgo_8hY3V0tYs1yYACR4-3wlHS9JPvsUSaE4GKmwS-TKDXwDy_6JwYAUIIQfm1QrqcsonQXOSbct2OI99EIh94I2qFzkjARXgW4vG0gz3gPn1MLKOCWIS9Agb6DJuAVllK8coTZ-zrNq08sFJoOjxZ6SPjxtWuxHNFX7Pv8lpwZLoVjlTHiozRAQf57C2v48eEeK1XD07Du6HNaO2V7-60sDeoDjQLyZg1rZKhMhyhD9VvU-GVwIVlYhLJyTTLDGsg589RdQafSnyIA8LK1GKDxGGe9iopwDp4VPNgDwdo1QpoeAF7dS3UaC1jiBte5y0JAyDG89UmHIdKUCiD0hR3lm6fKQZnyp4HwAqjdcuPJ2zkhlQ2gPnFmHgLjzfp3nZObIfcgBi7EHvOge2cEO4DWH3VXfw3J4O54bhMbdoTcVN_BSrBlaXu8UnMcqrk0i5GCJRexvc9Bgqt8cuKhdttCxNOFrOwRi5g0D46nMy9cDy6tJ-EGR6_YpI_hkzDaVBvntV6n09b1ZvWxiD4flZjidyA0X2L-bKkyuRFi-JsiPt4P3o6Ggk2lo2k8XL7KO3yRKeGedZdaZbNFJwlPPcW6EGU6L1ks6oPIm-qOtlw_CtwM8OGhK8fO_VvOG6vRtdSBJ1duKRYhwSwTQIOqHagLJNsDH4w4MohYVCRvYh1ChXxLMsmJvC7MF-2_hG00CPevxLwm75yZmx-XQo4DYtHVKrVD6Bu4D2hFvtmtgF8HimGOzlffBHPmtLAHHFqRGs4PzrWxUYBnuoI85GMk5QkK7NsO-JKql-U1iO_sV9Q24HbHnKPvIzvsaOcKx9bCydEl3FSsr037K9uVC6RoQ3t-zEbt_Md-C29yliPSjyJ-xfhqW9tgW6YJ9od_4Fi3EVxzYSbJv2d1-yuRrIDY7vw2xphG39ZMKSn3bZTEFlscB9nomQCB9GnosMeP0kuKSXdKKOjkbfHvYhhC4kei9jVh602QWz4Jd7rMe89IESyeusaa41iO-rUXV17of4JvfThiVfHo37wYUe8N6TBfby8ozigzQuN4A-4X8a8Fni_YHepkbPFmm484zwX61984keJPoMQPsahWZyBQ-F_ZgeCfoUToZrqNIOIckFyVvnpYb0NY-7U72CST_fzXPDI2aDshxVqkLwxW-e2Db2RFbW8EOF5CSVAZztX_ntjVBNYyiiXOscfFjkYMIlTGHiPCwdn2R2d_YdVVrm_rta2MN50E7G4lWAIn091Q2i05vuS4AIyDMFubqQmPBHGSmA-4L9VYvdrGjLEQKeYFVhMOaeAH0lUi9rdC-8oRADl2N42g6HnhHRPXMIeeZJxhTAtCx1tnDAOs2TzlIqBSkYLRYaxSX7QR31c9s5yP7QWFB28IWaNpLxxdwyUjvWPL7T4BuKsPw8CH7LevJvwJ-z94FRBZ_goZzgTJawlfZMrSGLjGaklTyORb7CtMlERmTiTluC0bWZa1-dVgivfSbhpX9s6w55ei2FqgtlVFWVplZSlGhDqZi7adV3g0fel_klgvMrrAj2NCCQp6uXbSHrzWCEzYATmKiZsAi_hzQs2jSKSTN04sEZUUU-zKZ2fTIHPoWP21y1ntiXCSXKBUrAt7lqWJAYlohzsy7HMQilQSgTbtn2DXWzxtwYmY13EIE-FhkwzJnS41B3KGaa8-DtFa-MWlVjldbHzwtgXA-B2n53efh8VAvCiVy5NdmTabn7hXuok5FVtf4_xUT4cfKNn-igKmMnWP-NiIenriuEgfOrPt_sPpLk6hwP_gD25oG4g4i3Z4NglESAf9_dOlwuoY1AbWm3SUN0y_nNZOZha1qhd7O9F_Ht6BYvjCLnOlAm0Gu9p_Dc7AC4kXEuWVW6NblS8cTSiBc4K58wJ1wz5AO4AaNEpflA7Mny4jn3lJ-j-woyh3EXZa0eyAQQGLROmf-uwz7EkOGYQU6ojhS-csgjNBPGwUUcuzygWvNhCezNlAXRCM8CG2zxfJ0yaP0939FmZdVDySPeOIUlTNYTtoXTyBwwDzmAAhKAZDK6okO-IiG_iH8HQrYlI6UKGPWd-Sg9taIscoido-4Xhzcl3VZeohx1rXf0hgu9KV07fN4vxqJRdaGRSh0BQejuyo3hVZe7t5ZN_jOlUSU0NpKh4Vd2xMRq4iGpXeZPYQ6B21905Dk6qUshni8kC1gFS_bDqfAsofK9BqudLBqWp2RXTMl_jiRLuj_kIYjfZRZPdxS7Z8O84G9DJtVLS81SF1RxsPjoYxrWLBGLZ0P407zQ4mM5g-iC6_MvBR71rO7bXCd25Q49Ozvj_6KYgovJ0I4sFM2gDkTJ1IdmKxGUmrEi7RaLPSHCoE6ocHuGRT5KGCV84qML0WXTrWYrnoYd7sHq0PXA6qaEkeDAg2ZB7_aG8qkHvvU5jgZAvRsu7qpKksdqQAcBbuTK7AfdQeYpXNXnf00WCyvXAgFj4qoCtmP8ulv4x7WA9RUWk8XXLbP7zuZjZU9Ho5UuauiVzhBhDWSZy_vDBzdfGipqTGbzyHoeJatDl2mca5aPkyKVaFGGXor_Us88z2m-De2iFqqAUVKA1740NKh7N-ucVfOKAVccD2XuV1zOBJj_jAPHRjs2lmYkp4RkrEvHAQ8CtKbFri8pLq2UZwaT_n-5fTBCWRE-RzDRXKhSu1nM06r48MG63hiMX9Dk2-G5_5nbHalZKX961KsDt8P2GyEqf-D3IPRnwOTj1X3x7tCvFrvDuHXT21lPI-9peejfUYkQdxmtwBgHRfM5r3uCVCHhrawI-ZgAsbx7dPn1jxRL9F7-PfLsaR7ZD6qPzfHQ7DMsk3JpZPhDTzNpHQa6dWAMkTqq5VZrFb3pxDXYDu8Eyy-9UqKAtl9x7_nig9J1YiDOV4sa9aLWFn9B_hD-BkNNjantmcUIvxZdt8EMv6nU5gQRU4fWi1b3KVqDdaKMPSdeoLslo0iznur2A.7jRfuaOqqaRUKf3eRy4FCg',
          passengerSearchToken:
            'ZeRxoJRu5rWC30ci273ZYKzwMNT6NF8w7JrWUFO7BYhTJk5dJvaUOHn23QLbYN7AzezHSUBL4YIiQD0G1BkG3Nn51Gw-iQ93GAV2KqAvB-JKUrnwvJl-l-W_IcC5TwN1pIMyq87JnmpquoMv8Abm8DjLn3b2'
        }
      }
    }
  }
};
