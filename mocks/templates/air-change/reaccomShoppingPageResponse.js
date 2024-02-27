module.exports = {
  reaccomShoppingPage: {
    currentReservation: {
      outbound: {
        stopDescription: '1 Stop, STL',
        boundType: 'DEPARTING',
        departureDate: '2019-11-13',
        flights: [
          {
            number: '2111',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          },
          {
            number: '2543',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }
        ],
        departureTime: '19:40',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '00:05',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengerCount: '1 Passenger',
        stops: [
          {
            arrivalTime: '21:15',
            departureTime: '21:55',
            changePlanes: true,
            airport: {
              name: 'St. Louis',
              state: 'MO',
              code: 'STL',
              country: null
            }
          }
        ],
        travelTime: '4h 25m',
        isNextDayArrival: true
      },
      inbound: {
        stopDescription: 'Nonstop',
        boundType: 'RETURNING',
        departureDate: '2019-11-14',
        flights: [
          {
            number: '2519',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }
        ],
        departureTime: '08:30',
        departureAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        arrivalTime: '09:30',
        arrivalAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        passengerCount: '1 Passenger',
        stops: [],
        travelTime: '1h 0m',
        isNextDayArrival: false
      }
    },
    flights: {
      outboundPage: {
        messages: null,
        header: {
          airportInfo: 'DAL - AUS',
          selectedDate: '2019-11-13'
        },
        boundType: 'DEPARTING',
        passengerCount: '1 Passenger',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        shoppingDates: {
          beginShoppingDate: '2019-11-11',
          endShoppingDate: '2019-11-26'
        },
        cards: [
          {
            departureTime: '06:00',
            arrivalTime: '07:00',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2107',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..xKoAEyaMxz3Ff2iA4v0cWw.CovCXB01i3F24hvg-9bTRGL_iIZqX5lqU_rTjVu6C9ixQO0KojeYXMCejMa_-vw7vrZJVGJ4hTiLfKg45uvgVHk8w2q2IW6stQl6Cl4Jl6MtHjVQf2dLVZxl6vGs7pUaE_OFpQulbytvGodPQpIq31wrVRP1TE0jsOImPGx7ta-lOmSprefXlM0yTbUseYJ4ZnMio0Zr4EUYlYJvWV62KvkZIRyvG7-dHHSegFT0TBS8cIwfvmoZCWVgYoMFmCMl0SgnbWXRqitbZmd_r6cXKJ0fzD_GfrulVc6n2jDz0UoBGFmmUkGnXZfLJoC_turi1U1Y9LeyjR06kUqj7sKGtUQTZItfS0j99syEjc7mzb0Qk0H4rjAvJ9wU2S2u7ZN9LD0VlqjGy9IkJyI8x2ui0LboyaWggZVhdI6N9dWDXfMy97-V_cAPm5loR1SEgYsLWnOq3j0C0xjqXiFysxZnifudlJANgsY8WWiNSClgEl1vnuSfW_qdamxPs-KPXq-HLbm-pes5A2z_6L6Ye58U7i9MQGgQWiI0qHktuJA39069qjeQMaMXryRuMlgfGPGHF1DzgXA5U3IW0cPY5yf-5MtP6HpCmnkPmtzD9EF177WXA86hYvv_weZxj3aEfEIpm8uvt6Y0FXwR15fOFybiMMKjQGQdwKADbfdRziizITpgp0iylDPQ169DzKIcuQfjEa09FvE9qap6IfcpC19cXOMYJL91dz7cqMtpSqlPdC2Zuf8EyCqOh-1FLUsMh5aK2kWM9X7b8QknjavKgcg6A-YUNP4HqqAOMZ4ij46qR5IlBSudHiW41AQiNLK0wI6P6lp6cHJY7DWttZaumfWSLyFoTDcSr5mt9UTxM5P-cso.E5bDYp0w3knV-K7k7imnDg',
              cardId: 'DAL:AUS:0:2019-11-13',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '0600'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '07:30',
            arrivalTime: '08:35',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2354',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5On-XzORXKjABKF1bo05ng.MZ3QYyALiVI0jhkbO_bToMA3gJ05gO5VVIDpBSn57jaqYhaZvYu4SksTNwXyx0YwzOAtG3GAnB5CEcKtOFq7UvDTSf0NJsWpD32tkk3FOewDShykRpUiR0DnTPpzrCziNti6xq29mNIGjClHg0Aq6mCiWVHa60Ml7oJ3PQAxGEOKb1aScJ5pd_mcbVQSph1tSfHn8sww2RJY9kK7KO9mdoh52gW2V3znTfR6sWs2IAj3rAiskM5ioQbcu_m4lSrMrnNjHm7QMLR5_hMYavrDfYiMjPPqIdrhaMPdOdHlP8NFrWgzndwlIliPRXEM1ybZ10tl5jrZvA39tx5YaptWEJ-XL51Vs7udHlu1s0qLDGULAUtNZM0ynQ-4nQJ50epQ-Xp7ze_XdLjwlOrq0OgxVVe-wx7l63iBAFtHtE0fmWIcHEE_AYAeN9cOas8GyC7ije3iEm2mpOcnL4nMKpEecsqmbyNomH2mL6whGfQEznIHeaOdfEDfEm3fmJ5pttM8wQG1gAaFWDp_fGwsoYEKC-EqoSlt_Ota_hu9_s3A5kvubl18iCwRnb0UI3SrWwNhsKJZa8bjcCREiYUEdcgp9Lp5-PtXhS9BAFu3TkrhtfbXDK3XQ6-FCzHrUlUEl1d7N2_Yg8d63LsyYvgP2wor3XnkPuj515LrE7vtb0aK80m9JE6PNTvh-4IbcbDs2KlNbcnWq7mXe5ZZGZGv2Za_rFju6YxjQoxYPfPDLqYSLV6ZWnCsQJGIbhDYlRLwPst9F93KbSVYCHIqAVjrSXsVZGGzs_SA1_zbGCiXGODOF1_0Ptey_WQJ-IUBpM45ZQl8s_lxThnX3tx9IBk6w9ZZiXWrGbMoIp30xk4qjtkLRvs.5b1BG-BH2pRy27u0tNbQYQ',
              cardId: 'DAL:AUS:1:2019-11-13',
              durationMinutes: 65,
              numberOfStops: 0,
              departureTime: '0730'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '09:20',
            arrivalTime: '10:25',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '1991',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..1kdhpNlAyRjXFv7YrhlTUg.vCIKO3YKogSRZr7fp-FZBpsHmsmNyo7pbCKIPR2fvKif7jk7XCmPI1C4xWqKBVlShK8vymXh9nTanCkrv6qhnJDUzVZiwwXTX23vvsR5woGt0mSzzUn-g1WcHrnLEMT4mPH6qV6lmDvJc2kggUIAOZ9Av11M8TU3uKpMkqlNMlneHvKiQFaqnMeWXFJbaCpMddgulNrbcJazQhkSeINQlDuEi9w2bATF8nsg-9UOvwCVZRpmDsV0tJTWz7KilWcyoGrCcR3R0Swkm3aN4e9femqYwOXuQrjGwZR_LlCmo8m5idn-ioJH5T2k4dOKkgYH5Z0OAq5Qmt_AsGhqg2ufub1cBNSrq3HnrfvX1sO0OWV6BzofOBDIoZ8DpFoxgGDlCxMUhm0TBWLn6tkJBN3VpgjL-GkEheTLdvJbVZcBNIb4DkrshXO2MBCpreW2409GDu8R7VrycX5LJ_SJX0j7scA3YIRutVIvhrzSl_Gn1hdSXn7jHoZrpabLshn9QrpXdJaZV2LJySCzQC0JSozkoxJ0irJBN9iXgF9b-LPza30ZPLZDpOOoDIMKl4IshAlAF--r6b4lvG375faI0IuY_Zu6MLCSDk9AC-UV-SGIYpMV0e_YWKsbn5-DpuNrzDVRis7ULecML0N9B2J80APwl5esfRemLBXfnfL0dtxLsu9bbTgnOz1Pgmu4EdKbP5S9yMPqmeBltPIm2cVY9H3J-Ek0073vRzvWgkYmHNcnmwNbg52aHXLzLnUfPOgUA7joPMmn5dc_OnPt-rCcb7QfILNKlhHzw3Ix7R9be3HS9y1ZduhgxSG-6ltj1SGoiEX1TUNon-Nnj5Fnli-1f-LCWf0gv0y3pjtD-We5eNTSw4M.tD90iGJmuR30ii_-R214vA',
              cardId: 'DAL:AUS:2:2019-11-13',
              durationMinutes: 65,
              numberOfStops: 0,
              departureTime: '0920'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '12:20',
            arrivalTime: '13:20',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '171',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..3_syDG2r81cwbh_ZQw_lew.y9a2i3MQOu2pfrKYwpYnrQ7Q0uiaSg7CU2X7DpMbjLSHqezZA3BC9ViqlvFsIwTAytCXPDwr08ZHSSEsbeGD1po-_4w_ofAqY11x0JQY-_q3uPNyAJE4bevAmAj-BYt1bslfxR9duR3bgYUYE6nn_v003xt_s1HYysij_J8qHX0EbHpnRt8v6jxIFmgdLNYmdjdXV-jCjzhlPTA7etvmeMfilsDbFADbwnF1D_8wYbgY3YxDm9xSDAXZSp01LDdO4_VKMwzRO2tujGBmeRo9aG0GIVU2c0Yp-2xUL2oeEJPNcbdTaRK0pkasu-bjZxJ2TZeBsmcaOD1dABCZQjjAqV94oXlugWICCaDunr329cEJAn3PzM79mT2vnyhJ1jJcU8MdF2ilSjcGz4VRLA-ogevWOk7eCliTleD4DIc9-ILjYFBDzfBxPXZTl1VtScmab3S_XqbeW3F2OW9x38DH4vYxgkPeo8TiGPLUo3mbL7mfOTpRdhY6PAJJqK0BJTZW2kfrFkgFTi38j198p6ZxGBTPnCKiX9KFCiD5-xirR-yYhmxj5scPNxmN1y42O1YENoObPrPzNZsu0kuHh8w-c10dyqznf7cBwHyRONeH40cuGHk3gBWft9g8OrdUx8I2SAdHfWgnoHNsFZ-iVcQin6_NLnKECCHkkV4dhGENcYjP2Q7O3OryfQxPoHNC995gTdEw9CSo4VCE3gr7zNsXIXJlNDFwKW71t1quO-McyJCgwXYapmnoutt7DBWca2WDZmw0A9mMi0TlKyTHKLkgPKDMMRCXLIKYjzVZu96QCgKyQoZwgoL9GOzZJz2I7y3i0Yl2WtWsxYPK9nixUjarYZepm7l6_GK47QM79taGJO0.qaWoy0H6JopP9Wx1m-59FA',
              cardId: 'DAL:AUS:3:2019-11-13',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '1220'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '13:50',
            arrivalTime: '14:55',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '211',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..zvDegUQJGWcLwPRgorjcAQ.cFZe1Q5x2x7CA9Pj3ob3bOAN0nzTeK8TGmd3yHk2w22bc79SCC3F9jXPfkSaFirsNXkUEdw5cxhNrdndRFdE-0BkWgqW8IHyDuv-PZeehHHZY70Neduj1mrGmKdZdu0GwQIuoGY0_ZrqSK1wFhwn_-BvIKJW8qg6tGw_M57DKIt-KUPVvQ7VB2eM9CbTAo8GKGXhkChslNRfAj1ir2aU-Vze67pG1dRKBHfl8OIs6xcpH2-FTmm8ko2FBknytq9vkCZPTb_4zkUtVAHLWwv_i48WcQoVl8sCdcQjHurkkYJgQ0jT0kVPj82RcV8COOVddJAEBuKNzuvwJmCoOXSSDyTMRxbZDK77gfF1-ITKvY7K-y0sf8QXcKqB0gArU1rMSnw_50DDtdIkAAxjTSOWjGkiAB8g7vFqEoHfRJDeHj3t7_vjjzjZwhpnJGUBYF0_fVzBTteMr1XOI9QVUpH4VbnEZUVPUR7b88Au4D8c-u-WQBhl8Edt19Nb3zSOO3Y7snkwsIAslXpuYGBvUajgJbDm2XuKgUeabH8DsaLX8V4Lof8ZMTbnqT8JZ4bIT_Fd7O1G0T9B5zDL8EddVXTADhBeF0RD1a4OiYC_UuhXIpLPp_-1Nngq6NljSeoj8Iuo6tfDcRELtGPJiQg3acxS7Oyaz3nI8PMSda1CL0pDzdtznxTwDkjbs1e3pxnBPsyPbWbwY2PfYi8W9f3e3E_sDXUtXpIkWKryWMfJpe1UU7CXW9GbIFBRncnsxxdtGpcRTwhH1dAy5fbRHgeXaUHbK2Z4xnpjppPrqSPXihGnvhleyxpDwPWDYjjcRvcjuBumyqgWWxyp9zPnltP2Q9BVeZYOolRbSE7ILDjkrUWyC2k.REq2y3XQBQKl3Upamu6whQ',
              cardId: 'DAL:AUS:4:2019-11-13',
              durationMinutes: 65,
              numberOfStops: 0,
              departureTime: '1350'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '16:25',
            arrivalTime: '17:25',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2110',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ck9wL_bHxJKewbXwiEhOXA.83Ycu-VAdUOFN6KzNHdQsW1SRt5AbaUwi0fovKzsi87mpcpS2cc08Y0CcwpnsnDpWm3yWUrZ10StbbK6L4SZKWDoWvzefgRmOLmanl9YZQEUly3MPZcVjBGwQritAYumDygvRn-1pCfN-gIQ6tIeIMnIoERIip4ElQLkOjIyXFCF-LxQytA4ialbUwsOGrM3RoZIg2J9WZ7nAq8d4ZGP1vzRNSCd7f6FbnWAbSItVXTripDh4kaFJI4qJlyH08tqCpIgJiZ5SxgApVbfrr1AYBBsLI2nJw2s9SobeFap6-DcddZ6QYMLGzU4khuZ9gqWhm9_6gYstRVmUBIOsjhp4Be9XwUztsxWZlB3cfuXFFOdaK4dVbYc88CTGvIofoqC9Qv6EeGa9o8739p3acRDM8SmP_N_fsdy3GGioYdFrLOcQ8y80qShFhKumOLGxTBvTO0uXSLSKIBYNNtnarZ4-fquyt_xd6l11v4J70sJ4PkpitnKLK_R1R9ns2toy14YEREzx_SDjhrHaH4FibPekIq0bO_I2P3V-vmwk5O808xvwzf5_CJVxKRf_e_mFl9zzmfKa5_M9kqP1PsKsjOR2hVAAMDzQiF6FAutuPq5RAtaG_lK_x_OflS7WU8GVMcw16aHUEm4MpAaAOwT3km68cMh0m0O5ESkh5ggrMb3u12YxMb3sZdMWU6iVoVVal0M3cThQbb03d0alEG1-dhagn-Hv4AKa1PxZ4Qkr0P2Rei5X6m47Mgah-mFVqaVBjIOLwmNyl5ocWxP9flZflqFIOfYD3VTkwO_Rudw77KzFErkiRXiWSFSEiqPH7MXrXdB8Rs5fnUQCygFF6Et-PUegRCFsBuSN8UIN0FuBjBvwwc.inuuh_h3-f2K0QFADsiKYQ',
              cardId: 'DAL:AUS:5:2019-11-13',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '1625'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '19:25',
            arrivalTime: '20:25',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2865',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..wRHuFeFSs7ug9RB7UwhKrg.Im4nyKBtJscGzW4Fe4iBoXeUs8GgVLc8AaqUTx906eMnfgBKam2W48fCwc-LlpocQdPwG6zGiLkK1bgAfF8nSqRxWTkojyqQa3YiJ7W_p3YhqkHEJXfe3_ADfhR0iXf0pJoo6un7WO2ZonZNjCAIPlCHCm8TLwSaWQ2M8b7u0sdoc1pNS876-96DIAPOKLNhmajWb-LSwwLpM8CpzYNueqG6JHk-cIe0jcyyZuyRK0k27dQ0jPHynrsTP_2Jgh08z2pu3soYsXUA4_dWJ-6kbBgfKIqEjXDlJCJj46CcSbDlYjv8YafusyX_GYjGzFQP7aiV9Tf1gG3nOaXUi4b7yNu4PzXv6QKfhvnQ4yM-PTD9WLZQ71a5DO8JARj44i9iwGcaRbcmAG5t3TfMi1hcptLglKn5ilL4LIrLDKlhF4d3d0KMQ3sFViPwW-xwcS_FW7GUqykX3tka8EpwBoQ-AbmMRCNZZxIgwQGeb0sLfy8UN5oZrfLoFRMPtc2ZTaTkznOK0IaVtsKc-RWqt8RJUI7WZ1dT_j3ymo2GALKbL3HhBBPITT-G6ds0hg66MVACvxE1r0zr6HjYktp3xB_BpZgzrWx42YLTAh5c1_NEFuSV-j8DuCOYSAG0OBmp_GZbvL93KWOrHnWnCtrJyLCHZNeG4ZZwQMCIVjt8WCLR2WxH5SEG3FnAbRwOxbXuhHc2eMp0Z49nry5hWQ5q9x53HntQpXFh96OPe6Ks0ILzSlTuJaov1hDexdvQaQeNBLo0Z55O4Qosu33KP7Q1p8LETWIXEjhurcso0J-WNuZxXmVHH3lAycl7xiL8eIy_H1wqEOXxwp9-w7PIm16Q_pcZpPMrUXdowaOM9xeMYvh94Tk.UixFSc0txxvtML03zQpiOA',
              cardId: 'DAL:AUS:6:2019-11-13',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '1925'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '20:30',
            arrivalTime: '21:30',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '750',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5s2aXw1l4RyxGmO-qN1AJw.mUX7v8MJYrOd4jvH-pQKQ8snF7zuhUz0NODKeZLkDn3r-ibLj_enJA3v9tbEroGXtqwMlV4ylzw295uL9K4_NGGTWrbTheb91m0KEiu5Zg8z0ClqV9KNjekqghygSBAWOoKytWHXf3I2dfADz-7BrFjOXCmiGe1ro7XdVgqglyZpaOudAi-62bTHuOXS8xGxrmUaesfm7pWH9sjJ7ClOpXrnoDYfzgPfbSd4tvSDmfiU8w6DlXgd2h9eutB8p34jQG0CzSqXYq2NT3S0GiDUqJFiVhhg3GdgMXAOuaAixP1vKIp9EgHT7mI5Q_qt4v1-9I8LmLoHEueZ2fvvlX-o6eW4Q-fUJ6Sggs0YaLS8mpIRQQnLathDQKukPie4xzoEh6cZraAZVdAMmp7QTkOa3jY2EG21sEK-txjhSqTAT6hxuLgeo40dNGOw8H_cXQXKQlurAM-knsfVoaIT3Rzcs0JoU31jf1b6DVs7DXdxDE8z8coTHB7-ECTimmps6f8BaXyu39KKnZ0Em5pbixsKlxayHtGKJpq9k60u96G5xV22ixpEhO8f6Cx3qZ-NOpGauuVMixhsQCPEhDadKNPCcy4Ejun3SYus1bamGTYgcWem_wiD3htEY_NowL5WvI1NtzAc8Sn4Yu8Ni8r9pexmh7PkJ6xJnrKn5V6egpROWmlQXWlZgv9jCeqB1C-MeOnf80AVro0L5pSnWTvn9CI5F79Z9Q7MKa-s9GK-swcuFXQfS3aQllHUHznpzZWjGjFdFomdWSrYY8bXHHLUzSZXDhu0lQesSCgH6eYyy4OG4k6urq8zVlj-W5quV5upbyl41MZnCTg_-JLaakHJqZA9P0dXIDXDkgHT2NfI63zukOk.ZVFeFv5lbFtTfC96BkkrLw',
              cardId: 'DAL:AUS:7:2019-11-13',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '2030'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '13:00',
            arrivalTime: '15:50',
            duration: '2h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '27',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '2346',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '14:15',
                departureTime: '14:55',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..L9JpVtNw_VT7WeH2iWER3g.eUdbyVCA8-VN1FyP3tt2fzZNKGXzKPLZHyZUjZb3QKQatA6Ncwta1RqCjpHBigm9xZrVWWKQ1aR59JvG9Prnu4x50nLkJrh98NTN1Ly2r1NowJV5-OnHsHTj7R1zqUSZUEs6uQLnCh_Yb7-ggW1i1BD5rlq7Am5kEKaYsdh-jnedBwqHX0mvZyIgrxLehcBLBBnelp4vBqpik7-ji7FAjG_Xk34gxsSa_m03qlAeDznDWckNaG0i9NDhi0Qh-qlxWtl1MYBufgnD7VI5jzlnQ_RZm-ta0ry3sxbkPXpzHvAHHPzdI95leo_Xr2zxybMZavqt8xgRX_8y9tQVfubaV0RSu326LatcwqIajd1uIr-zOAfNUqg0fCRPp0P0VAKk5kw2EnT5yNM3oVPctmf2fOo8FQumUZA4MEFdfvh5Xi-mXA3VlyfmxxJyaUUaLS-7Mk3GNGuSYv2eHFf37ZM_9oJKooBtFzEjf5OPvVnZM6RaQS8eh3jJjNs_4ufGd9r-PK0fwPKgTJpELXY3Lv7N1v6yT-Dk8eRc5BGLNPZydRMQM60_JmU5ifvmFIAZpFbfz7bZ1UVGODkOzcHneelQerfKqYCNRMT5TXthW2gjc_OxrYxeiaGlwUUH04HgbgBybDdd6ZVXct0t7wGd_c1WXdE9Zan9QSMWEt90MVk0ofW4XHpNAHhvGlXeAkkg0k5KaPgi2SeDOqPcQg6c2DG58xyKx1CwZcBvE9P8mz3GCjWabNxaqYRpxdBt252ZEGcnuzXRCWSNZW1h3OZkqUS_d2NKCatj2Ad9KsIbUGpShJ58fc6GW4acgjLneymad5EvNWEa3335Tj4K6m72DXIMzY-9M2zlByI5tdvWnsU8RtTUTDfLGID-inXOgbLcnQ5nUy1rtX8KKh43vfFq_aFy3PzV-A-CLmRgn6ZKELsMqIEh_W-WBHU7MHX-GQQAcqzwdl3Wrb_GbTXC8OEa3aQ4wGHJ-vVw6sGpX9gs9nT9xGuIDxEMQY9l89pAnJZyj3q5Gvc3qOpr-r_lb4Eif6X0eWgYlYLJqZICkRU4I2xcdcwmmsc2mKVKJf1OHpKuu-4I8rIjhJLWMddcK5ZFCJhZUHBXMlfzH3Iy6-tiENpq6mPQrg8526hYFNQOR0ScTtre1TkU6nKbbjLtClVuBHjvc4y_vDa2tL4hNmttlfXaNzEF8zxM83kpt3zhCeD0Ug7h.xHYsBS0eucKOlLXocFwoWA',
              cardId: 'DAL:AUS:8:2019-11-13',
              durationMinutes: 170,
              numberOfStops: 1,
              departureTime: '1300'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '18:00',
            arrivalTime: '20:50',
            duration: '2h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '47',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '4111',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '19:15',
                departureTime: '20:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ymCAQwLQ4usyT0zvxzvCjg.FQgdYk0C6tmMrbvV4nXCx3MbEMEL6vMeruYlpscn6PPy-MzniCqRupIxc68jukVEPsF7j-4hj_7OW39T1cg_uur2N44kHGlqA3xNnbIcVGoHYvI3RVrVOQh0LcevHKStaTwVWqnd-3wf76Ytr7b-VQtGlIo4Nv-9Gl53X1gjadFTpWN0VbAkVBtP1gTLbRW-vYtY9qvDbvkgHm3_Q6n1JH86mV7TZEti2Dyq5rpQu7tt4VtwtghzHvNf4s9Fvvf34rrRwJHUZ0ZlutGeVDnlPF5AHqMa0uzB5fl4pO0P6zUaNL4Z9heqZUiOaCOtxaUxzTJIxtYsfZh9UJwhiS5zJAVBq6knfg7w4l90OwSQ3itL7h8r2zZlobC73ys2KM-d3Sc8OKpYENn0SSJ3Kgbs-3t7Y-LJT0f9Qa-gPdh1MPacpMKpCiWqSSNzefup-0j43TtHWJt82kFg-6bsv9OQz-UL7tuXlHFutEQyu7v8ANA7klkZzZtpb_MVU5FIM1WQ_LVP1Ki4VUliyO-clsKvyrDCRn_hl8ZEMbkQihrv4MUxmMzHdRbu2S-UKRIEm5z8qgOqUIT0FKXx08Ui714hrO-zi-dzOnjGNXSHOYXRjDwK9foIjhxcIZkprUGJ-zYu7z8xnou6V5A-ENRZZN3CeTxUsLZ8h6da_xibOiyCe6S-39R8sMVguvXB5GB-osbvccRlzgGl8L52LG3LhMAgNG9h9W-LLdd-NpM2HT_AfUCHoienc_cktFXEIytHFLbxWj9DmubFCf-zxi1_jdTSmQqGu2ne-sA_cDRJEDdhJm3DrMYx_eH-3E_RXTHgmB49VXOJALbvRaCT1-3CTk00d2Lkd1UJgZSK-NlQSmc9qx3ZwfYCszINwHwRKzgdUDrnr6KWOUsiuJwU2qbquXo6VRuh6xtCZD_0Wwv8veTaG2K7p7ov_b5VRCmT7TGD_vknPB3K4Nr_Z7jgamNeX_ZKtrlqqEovk_A4svPzo4spEGHZTFmZIqSlch9qrPWiIOyzAyzGrY_CEZiDUZ1sfvAUw4RgVww4lEKTVWZLaxoi-A2yWKjo027XZVgN8u94jSYg9P3IJEqhtyKAuwsAfe2iFaVDkUDo9FEOCAs-9i38uuhmbHVP1Wyd6KQlSw0Q6-VLHf1UmtalXeFRJQO2zWopztaWcv7HuFrWZkjRE_kipofS1yy1D2-zCEIgExDFsqPe.FAC4jKWttlW_SPf36X_DjQ',
              cardId: 'DAL:AUS:9:2019-11-13',
              durationMinutes: 170,
              numberOfStops: 1,
              departureTime: '1800'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '09:00',
            arrivalTime: '12:00',
            duration: '3h 0m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '9',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-800',
                  numberOfSeats: 175,
                  wifiSupported: true
                }
              },
              {
                number: '2855',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '10:10',
                departureTime: '11:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5ALfbe0ISQ840H917bma5g.hPVTSFHeiVEyvjlNZmEE-DNZ8ItUJOnvkdiA1VxIXgvEvS2UZ6T-5SdQAIJ47w86URlv69FV8NTMYjsjufCVjJPP5BTqIAhTmzf2sf9mt7yAL0rFDanFpqks1hSTJ_P-_2jRWpYmkxSbutkMJH0GHHGyJmXBixrjBy6znpMSuiuRf1GUc3cS8Yd9ULLDLhV-sSW0pZ8opwmcDRnnZUrj8MaAMRD1wwYOVSqsy3eyd9ryIVMfQPa9V2kVUgulfyKpfaYgGyjaUzLkoRPZB1QN4PknnKHJWv51VfSi0VhjZcHC96IjyQEpf0Dvji7RkmZG0l9P3MVQYjxhfSO-vUqr-nHBI0vc_oifbldpLPlrd4CjiMps1I9dyj_z_qG4puwK0C0wvuBPahuj0V2toPnmunEMwTtySYQgzkE0SgztRz6s5WNmYHhvw2ubuTna-_AfuJq-1lRuayH4DbM6hnHcbTw4njFP5xB0DOuEPfNeDo852I7BdwXR9A8bASDLozoMWeACHmuIApMq0aeBc_AhzfGhV2kAo29QJ6D4v1MOXETMj5BOIbUL-mOgEWIRyPTp6Tzmt7306RCb9EYODPzt3mhCBJphGsMJYvB_dBuzonpT-oMqbm3NjKXUS_7q5y6YthhXm0Q0cms1azvrhBnlsSqQ3nQHhbGxIM4SNn2NLAalxeyfXMc5Ctfr0znpJctrTNFwRjuHpqdWCOrK7AOsf6f8FazkiRTXboEJO7REH_zgBvss4evtCzjffuSzwuCU5deLiKZuGB1tnGdcRtC5XxDPDcUJnht8wYSQeL5PM0OlxPla8ObtmK3QziwfCpE54YDGHlrZ_aT7Lybv7hFxNVvnh1yfyu8hajR1O98mCNrkIrewobJPzEj2KLWblp1T8sCb2TLcs3McVmiGvxmJ9wRl0QZxX071W3edbILEidqdtOQcmUvA4gKKqT3d2AxbG3tV33yN0J5aB_4sAF7Q-3HRHgOA6BYk7h9Watda6Xcl7rcSGSyjdUPftOEbQmYsmrpiK4FKybkDopehjBDNA-F3WYwVm_qwvC9DSO1vq0AkghFKC9hfuUpx4JUOyhBk24C3rN1Cf8uEjczSx4Onn6xYI9FZSHmbvwSW3mm2TfKysQOc_c9aleRakprtpyuVeRcCUDECFYqIQ2YE-WIIk-mykQJmGCAC9tcbhrTr_4jeQhC2V3QQPQOrGVHkwKbp.o98k8nImVPZX9Q-J1J_qtw',
              cardId: 'DAL:AUS:10:2019-11-13',
              durationMinutes: 180,
              numberOfStops: 1,
              departureTime: '0900'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '12:50',
            arrivalTime: '15:50',
            duration: '3h 0m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '6893',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '2346',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '14:00',
                departureTime: '14:55',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ziVueM69mK7_1m727mZKyw.gh1TJoM4UwcyGwJipEM-6G8L6SgpwDjBJkz0qbcVxiGpqr7SRQGxHjtXVMR04vn5J-gewhC14e2f2fqoaftLhaFmKqqZEmD29dDTJQUeGm79t8PPtNS5JGqr6atJRgZ5dij8tL4QqHOAR5s5VR4RH0TJvTRIaAk9MP0avLfSk-BNIfdZgNJeX41qb652tFkxJ6Im89KyrDPEgd2ndoX2wSsL-uLMEV5G2P3Hi5ohTWXkWRcuPX79LO9SQXVARO0MVr1JI9kxapS0ClUhuTo3UWXJ13qKXsiu-CuhUrcQL07fHEjMOcgqeLr1LYGTef05S6xAxiq2S5Xezc2HfEafU0MN4AWj-NyUAEfi9M3r2NWw72s4-OBm0r_uH44mcwvH2COxGYk-XEQM-xCwLV3M5yezSFhNWAoB8Z80uJcU_OIY8Fks_VgPqiNX34iDuDc-giJgBvAhncGtu3fBQuIgryUad-VI1ZGywjqOO9X0yI5mtTISFxe-czqnOjvUbZpyhUqkFrm63hxKUNuEiahIe29pBYXzrAVsZf6zE13jMbVVhf3QmTIzK4MVo50RtUQ7kkx4ooEsavLf6NOD5aGVT3PJzVgh0EdrKedKVxfInWkvQwBavkjQYExEdORk3CQKqcvnIFsBrsP8wbEeVPPcNsWDjIIHQSsp5uv5gLf8foYHL1dCNobn6mB-O4EM_NLFg2DskPbYoX0x7yOgRsuunfS4oNd3kE-r-iJ2QY4iu3_hhuFxWIpBES-6zX5pnrNphePVu3Pl1mOQDaQDit6ScKku9KBmUkLOAE3SkXoc_9d-lRuHQcbitw_Xk38MqBTO2av89glqEb063Etj1mygbsg2zLcUk5bsf29u9IClBmz1hz77mdw5AQRMmcUay3MuWgepOzDRF4p_QNXYq-FpYWe1erfLaQe3F3wQ5C-RlfjF8aKfOauJ-cO7pu0u1Ux81Gy_cKrWHZLrFRq1A_nFo99h7QGLBGbjoHxAG6tIGgIsKAuaLiCH1K2Jz24Oc3Azq7ud8G3zirw-FE_hlb2G7Fxh2eGvVvdy_AtqqvBQGbPj7UpbhgtbRK0c6mUp2FS_xa2v7_gh5y2vc0lpIgDgbwF66FuFXBb-yD0zOGaj8iQ_G0vDgB76G9a9x4tHadQyL5oMdi2OsAuREp61PKEjkIHGMVLl7dX6wJJW-yNm9Uy6DjIYYu-QeNB7Vrj4TzLj.MlXstK6a1aErrH2W5CGUwA',
              cardId: 'DAL:AUS:11:2019-11-13',
              durationMinutes: 180,
              numberOfStops: 1,
              departureTime: '1250'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '06:00',
            arrivalTime: '09:25',
            duration: '3h 25m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '1628',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '200',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '07:10',
                departureTime: '08:25',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..u22pKHZDONO8uncKYZm6WA.4uZRh82STeT6vEMMUBADvbROlWzsO4OsTKXx96jC_qPYIAfo16XXyEZp-OOeiq0rbYnlX12G5fif5tcKH4LmO2CajVFbsosQ1FjKDYFD2jMumXD3OU-sEuUeqnbBxHMtqnTCPagL20hpDIHCS5fkzsgz7Lf1W70PDjHRonnynm8rqiJfV7JzygyIAECpX677v3EnvgmxpcPBcL9PaDySC6dZyxbz4b9Pqze89a2GfUiiJUpe1o6673ClfjWdlGQGM2_TlF4gN1eaL5X9HQiUYXajvvAswJM3WwWO7cZKdJOFUQq_735X2ZUS69_YoFZzYf90pbl5b95PXoexTKWs3FZZNgVEUKUN-SCVqmGiKG3kD0jl7bGkUUHgT6pkzQDYWltbH76PIkEPiGns9x9OC8by-cypmwQlHLQY2MLQOLfNGVORHzJfMrZSww55z4nWXJO8z-F9VW1FDVojGWEW3q-IPolL6RM50KGCUcnx8cg0N88kdSBvN1A6qShrVZj3Rk9d2QWmT7UMeekOyD-KP-uAEBhA5epPl4YKgkKsQWwAvhyDAuKLxLx157RpzxwX81r5fWluIYKtM_pMBeL0v_QZy4w5ofHNfFNVVf8HYlZozBOvKpfuVyyhK3EFI-TJjqkL8upWLfRL_7X5Fb4X22bUPnqwM6J7pmx-foHSFLPwAvR0mgvOuSkRkfF_etv560lajUSjEEXKb9l2NX6tfN54R-jvpLWAv-BSaVbZu1CoYp_DxnXCiT5K-mqU6U9tSRzL-WHU0ew1jg8keKyg_tKAHfQwzwhjzEE1mEoC5vVwGKYaOb46AdJBZ3FxX2cMay2bTAsWZPHkemd4M5TzgvggPdEyPrtsyoDsXuvYG79nnXrC3CqOI6QBpXYYgh_PrKkS0xPHYlbJlG-1ZMoTQKzK735saWJIxBXPeDxZdDnPso-hKvCyyImZDqDOeVBW7BVXwKRr9l5-hZTtMw8vra5NqGSCsSVxCBspl5dsIV6DBitqEeac6pEEV9X-_b_vwzbozJ2nW2WD9LsuNn-5gC5sGXEa61WogqEsq6KPbWj_ZgtuA4xXaBjHeC3Xv1A7B5PfBtjgHus8gouzSYJcXMnwbLRcd7POjsnfjGVHwYT1ImZbgb9ijT3KcMKody1IzGkED7iKTl4AqnZnyabi0VqxObYe_xHFCy3ulasYeSldA5GMtt-IMvDy_KBFGKNO.IXnbCC5QxTi3uym8Zq3KEg',
              cardId: 'DAL:AUS:12:2019-11-13',
              durationMinutes: 205,
              numberOfStops: 1,
              departureTime: '0600'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '13:55',
            arrivalTime: '17:30',
            duration: '3h 35m',
            stopDescription: '1 Stop, MSY',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2318',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-800',
                  numberOfSeats: 175,
                  wifiSupported: true
                }
              },
              {
                number: '406',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '15:20',
                departureTime: '16:00',
                changePlanes: true,
                airport: {
                  name: 'New Orleans',
                  state: 'LA',
                  code: 'MSY',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..9DvTDCmGqFGvqF5oD41uFA.kmPoH-aoF9eOMGFTsdnzd9USEbPV_Alw7cSUpOYrhRDKHbtBJfPcch19kcbPTv94AAbwlvonELmA87wr7egqLtC6jFiajZmQk5KUA4oX8C90n3HBAw5V2Uw_Mte5pq4S12mey4pFJqa-JravB2HU1KmSubXNETGx9qAwljOftykRigJW0gzwlmng1dY6FA5L3hn27fRftnEbLTPC1vE_pNwQTXkNRYUyFLLrVSSFucRNYSqrFy63_zEfRBP58kEdzX4qv5loFQH-KJT7K0zqPt_rveZhDLuhlOUBxVumqLlE3X1djlmIquaNSwnDKUavXqs5aOPARzSwFzJwRbLDTvEdY4C94I1b6Ge_lVjYvtY0T3E8jVOX-Fh34Lmkq8VmAfaoNXhm4pkI_pOTV6r1760yFRvRfM5-e3Cjmpk7IPBenLBr-htcFRNaetzGK0ktomr6YMX2vbDu5vhHi5cqpgIEwjyFtvA0-SNgMFrvJ0Y99iNMXBItyDH5TBdiQfcnb_8mMjxUD47M4ZWHZRy19aiJj6hBMKx0LSIuD4j8ZAD6D30Z6gzeuFv2Tn5ap84zLQo77q0AUfFIp4cEXELmExtToVmeagc9I6R5q2e1qok1aFMr2T5yvLKLnCQhnVAVpWTQvGcoPv5yP3AcvSoF81fwf2FHWNUqEu3PVIHPEJjMqT-e2lXPHRMx3Z0KX9UJI9AOCJPnEAervVDK7FOz3AglvEbGMJ7CvLPhJXuezEIM9eJCU9ZB0CNVvsZ-NYzv-eZ0ivT2hEOC2oFyKNIps3075lKrldPrewGaqB6gUjWtnSIvmWf2aFdlZ49SCdnXTmA5PPGGTvx3vrNYoRoi0KMtR7qodkYbZp7CE-l_7xeAIZNS_P3uNKDX80jKTpba2n8CLG44zIlUEKPNkSW1kk0vvw4z5lTRadedHGe6zCFnFrCo0gTB1spZgB0GpGs-ET5t046JJ897z9Kt0AZRjN2N00Z4ueIKwEpU5ZqyOiu-BktWbUoTPawVQKhpLsua1SfGRjpJGyFwmNBc2MMSf5PU4idJaNdWJOSNAfvexUmsGj9tHdGUF2Ea6dkPyCyXdLkRsQci17RpodstpmKbbh7EgULBfLrXIzwpenjPJBhXWV0I5fRfQqqUcLZTI6zsMGdoxjbwhdvd7Tp1Fzx95H-p9yDwc7TbDgBJCi6iNIA_AW0CcQCShascjZWwSFhe.BxcLi_c_Q4MRuzSaunzy7g',
              cardId: 'DAL:AUS:13:2019-11-13',
              durationMinutes: 215,
              numberOfStops: 1,
              departureTime: '1355'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '11:00',
            arrivalTime: '14:40',
            duration: '3h 40m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '17',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '3634',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '12:15',
                departureTime: '13:40',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..Pft_cMLzks4nC2ZV08CYFg.hRL9xABIHJEVc223aDKCSoP356xsu6zx9O8kRj4gXsTk43782pLWzf2yuYy3vDk8dcMTIwuYl4XMtzCIvwfb77xrZ4YceCcJjuPGvHueTi_PuYBLgxkC43oXoxz85yBU9YKhPTgI2lAefBOmRI27aD0oTRYNBW3L0cEu-1K6ARAbHi6bNRxatb9U-K6-YlYIqq8EM3SDF0EjuN2fevBzJisVTQWnNGRIAhQRd6LM9WmC3Xn4_Gu1een3_3OO4rkU0EB9RXgR0D0OIznW3uSDeGHoYntfw9kNn3O9CH_b-rW0sc8kMnbm-Ts0tGiqySAAUBuC-AJk1HqAvd9kQJd4j7Pgj4dgCT-DNzdgwNb5JzYs0juRGzoJJdp3xgkOPYg1vGTouGLnWWNXF9LHU8f3hS6s8HzZkVwWsacG-m5zgjnDOk_NiW9YnHTXxujvaNy0b4cddkdZIo_ydKIoopd0LgGzMSwdHu2RnJLP8ycdHUpeprFAt3QghO9ooW47e1s0Tr0nZAI70oM7dM2GqaonuPJnOEBtePoP6_nJ3Hu3WEvI0V3vrVyMwmv9mBQ92tzP7od6HJ9vuY8JrCIJZ1Z8Fmzey2mk01TO5E1dYEypjtWd1yxv_yoovTbdO3LCstm0Ef6vBC0AF49eF9D6jVJefsD_3zFRF2953FXwPC9FEQMjatXU5euoPRX9COkb3IDtPz7KBLEG_dNsorCUZrGmnoePUZLl98OvpsVndD3AWBU-CH8GLMkG3IfG3DIndRlo3OrAGPxQzD-a2SeUEdbAV6CZpEPMXg1Us-3FixR9y0vqu0U7pr3yAwEYiQkGSUjD20fqn6gZtL3C29_tG7IdMjkhYbB53U7UlBWY-2SElf1ZykLBaxN-aHkiHz-Y0y3BT2d0piYU8Nz-oo2oJtTQAsILyt_hKCkVVajK27YLkEcFHii2t9nS5CKvxSUeHj1d5d5uI1M7pMTfkt-W0IGn0S8UDAQoaswHQnYoEhT1CKaM7SHcVu4kZ1IVAafP2lpK92YmbtTxPjU5n_sgLxtnum3TIPpzM6yhtmV8teyFqbrZZtDjYwnAgwfoPSJ3wD0iJ6znZ-Q4RbzTktQjhOMamuNGtjMArxPj9eyRXlnrU9PvXUQBam65G4v6wIZ7FAIkNDpl1KoMcTDPTCkyjGGHGJqtLuWlGPA2Pk_bdoTSk9fhh-Lnmd2-IMhadOwOTNws.8V-dbQf9mvfuL_ILI2kMeA',
              cardId: 'DAL:AUS:14:2019-11-13',
              durationMinutes: 220,
              numberOfStops: 1,
              departureTime: '1100'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '12:00',
            arrivalTime: '15:50',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '21',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '2346',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '13:15',
                departureTime: '14:55',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..OitMitTindfdu0hxRYDF-g.P_sEq6fo9REJjwc02HGRuD1LifVbsBU-lmpLpxaxVZdID-q3hpibT2xJoYhHOIwFHQw0bi4SS-5zr5asroxH-7WyUU3KqopJLBWAG-RqVuYKzllhY3NyIoba6m24UVLe7Rtgub-M4_n4VB_9yqh2eLc3YCXACHZMwjKTvhX8s-384cHB6sJZYyPmCSa49GXziQrTrLEcurmQmPe4yyA8Mrjls_5vK6if6ceYqrkqGN4hlFrBaic_4AZCP3cdBmmMQL9ljrIaRJaVHA-VircD3vay4Cxvb6O0Bstc0hwxw7ucyX9PChPMJ336GYne0GLMWZC9eNp0LbIBbg9Kut96OECSr56A3RHV469YmrL6Rrse7CEqQaCQQfwgF120LZ04HL9o3-CNttQJ37zArixpDSyBp_50_wkxHTF4yw8SDxzmRJasKRyoflL6SViW-Y4GZaklB5SWgPj4XMZhkEFbE-MRnAXQrM2knpXKBq9-aArPNxxHpzgntDnA80mo9Ryar_kZQQJHyThDcgpt3TUKtcBuOsHTIuSAjTXe5jd4USks26qzinBY5DzyGNYwnd4h9tR7K8yhlmdogumqDUGmUPdHUhe6Axy0LVTuq2mHNvlIk5sAh0B5g9SPZH1RN6Wz6kQv4XC0TOleBqO__Y5X4oj-MujlgSdnwUryYjSanwVVfTpaAbITzrt65gxfJ7v2ILtRGPzCteZhcXJgev5lhtcLI-Rh8kUCPBVd2NxDjk8PHpN7aVT7HHWP4deVDFTN4zt6OmwVHNmvHI9oV6cbhMIz8DKZJgEoDGJCnAoLHLgQ7xgJ7CfykFqgQVCFOz-hQX0lKvUnPDLOK4ewFr2ClLXjiMgh1rwpDgLNtRQLMqsSu-uuZINjC1zDWi9vLy_oFwZi067WG92YEo-bkVOhC5keV1mp5E1n9RpdECYEOJkSTO7mFLv3EwgnT2vy7RWl683HPS-Y08KTqBnNwL9XM8j-he5GkVkOJDRjrAZlbZ9VjC4QDzFX-8L9NXtFCJZ1wabqLKi-TusE82aeIy_K9fN7wKefrxKI6XGas0n9BkXGKxJg6GQoDesuPYHANzNUqUQi7EF9Jqsa44oJ23WFZnX7BgpwWTMA8iCHSHIxbUcZhqCjwnmKzEILeXnTPUp1206no8U5TsreTWMiEI_BIYyq2Szso0ZY7fUo3NoZigw2NVOLsh3X4fEHGqVBkTUT.uN8F25Ed0AGW8tgylPS7xw',
              cardId: 'DAL:AUS:15:2019-11-13',
              durationMinutes: 230,
              numberOfStops: 1,
              departureTime: '1200'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '17:00',
            arrivalTime: '20:50',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '43',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '4111',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '18:10',
                departureTime: '20:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..0jh6dPCUriLipxuvKExa7A.Q69vswgQ5aYJSWeGvcv1hs7pP9ED1GMUVzcYP6eKFruP6XcUdRfmR50eTtTKsAjNuy4kqVzbfrBpQVXPLjbN4EDSsM0dU8Z6y4xKk0gqu7w3G5VHftlZWaF9QMWXCtXJma25edJ__AfuDbGl-Z4LCpmSosDNERKvxPhzIucboamuL0d6xKEvt3ysZWycePE2nQW1DfUa6nnV0iyPLbN-5ormCB03l06L-83CB6FpiAF2zIHGaItzU0ixe1x8dlEzRL0Lf8Av2pkKIm29z65AFJZAJUhT1B6Zy0cWEAGWoBf7Ky_diG46Uzl4U4FlOhSKDhK7sJ8229VZ-gL7OFNCxGsujJdwnG6S4wFQpiSeSGqjHtmKDx7tjtHAat5LNOysqJhr770FQKSzn11pbKbkENyTZgspq2moZTlm4yeCQyzhWvhtHB7uZaHokhimd8xY8ELjlt_N_MtBJQrf2oktaBrvYBLISQ5uPPS2OFJyK-WzuI4Y7laMI0sMhzyB7RcBAmIVDqY75aSYCRDGYmuGhLGD2GZNlJMJGYtX9jNwrHZkgoJuOoiPDy2CIg6dBq89AP2nxAS_ktSWw2kGZ-wXGkOMHsZP4v1_nHvYwyKxxo1DpVyI9ENctWxElKHuwkiTSvI_3GX8rcwlfv11rtueP2pp5CsxuD-T6Xs9D0DPrgVGrLC2LMBdCikbUm_x7UrBO1Lrh1UeG3hi6wo6HTTOUM9rjvFU3_tQ0Udtb7BtmkZ6UneO1Wly_XZo-BqRQQpBM8GANefEimUT8QjRPJy8V6xytV06gV9G6Ep7R2xr8Vr8DTBN9wkmGLwEh_sew4_PCPdY_SWOCUCpqMcmto2pZxdXR8ntc9ebjphcIXoolvT4Xa8CzQ9e6Mc1ZT4cpjlcPnxtVZ_ZdRJklNnkjAD99_3SKbm6z3TfoZ-vLxCFnW0O_e9ZWTWn8vX-3Rpx_ZxDyP_cPQbtQEvJG-aVVrD6A3utw6PSZM6kcm-L8Am60wOanYS095O79VGMBPK7hitqO6-_8IQGoVv_cxAOZKCS00uUuX9j1EiyzKL3jNFNCrwQHXbBLlM4ZZk6vN9RDGQZ_hTqMLv_lC1Ue69lbIXqt-eIm69Iif12TysysibLkiUEui-xtFk6sYlz0zP-PvZlz9h7vc2Wfn_4EWOPmjNj2WsvDwyXIHABngOsdGllLPiYw0FUWKnyaGd57O1T5XKA.F4abnIDvxmcUd5-DattQxQ',
              cardId: 'DAL:AUS:16:2019-11-13',
              durationMinutes: 230,
              numberOfStops: 1,
              departureTime: '1700'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '08:00',
            arrivalTime: '12:00',
            duration: '4h 0m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '5',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '2855',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '09:10',
                departureTime: '11:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..3H9adxzUeZSaJdf5PPrARQ.14P8JKP2j24btBher_fws6fjsiLG0Q8sSsdYmcs43SUn1thCqldT-60UInq5CheLJ7ZN1KXIzzn6RtMJusArwWLMqx0SMQSlHjzPCNQiJ1GDeiz5jGbStHp5cMS0-lyCiyFcI9ZHtxNymWLg4DDbn-DmVTsaItJQID3c45vtoHtT4Ngx5nmSJMgqLdNvc13qzsWNMDH0E_6yM5p4ZB55AO-5s0Lg82f77KWK34DJ4RTEvOe7NU7DZ5dWp1BQpf2BPsyHcj4k-z3vvl_nd9VtOp1b77SKT3I8cJGiCKtj5WsLEbdrExNtyVUnC229JgMI0Bf1axQLz_hX7LeIsN9zfmA4I67kI3wT_e2Iph5uNZEzMmWuqKO2bjq6SrLWFDSlQ-shs4rDb1kuww-fEmMwZ6vphtTXZaUCm2zKt1Lgp91zeyw5XhClWsGI-r51k_f861zBSX-gjr2MI2hpH6xM-5eizKu-yla1nL20jVAbV0GAtmjbsrKdKvjIAl1U2I4sARp0RWB57OP9p4MI-sE3-l--tSh-fG1YTYiBmTCF4OlXClJDLyfiIdUzqv2abOKuBSPPqnKnRpCTT8RbM0HMV5xbNOzkjmSmHmVDoYF8UmdAvQGK00UfsR8BIgLvJcrJQnVbWTowDde5xXVOqtnzeAM-9rZu6NH3Gju1MwejYFUiP5SnATw3NzMBgt69TbIdPo5J5sntceXYkbvJklyl-VkMIIuYOfNHCtt6XOpq1iyEaTDN1QJqEpi9-JnnSrup_aaRdH28oaDisuB7pTKso7Evdm3AXuUykzo2dj4GobAvufZnPaFp18fTX4NfXss31UO8vaSinA_AnEqEvpj_0wnI5803DJ4Ez_r6nxds3a7vUtlLd2Mqf64fNVjOlXBbTciKQyIoaUe6xq5cs0vI1tuHBB5bXz2ouQFgvZQHWt3shVcwslQQbutHJGRIeoHXRDXY0PHkcE5DI28QmQVRuT0Y-6ZidJvnya-SePxQAhPmcB9PY1T-XrkFn5qJjFLK_45TLiBntl57GFp3mPkiQpcM5EdCbl36bmH6L416njc6mmqW1ZQylpfBksaxbn-lWwp37SxEWXlj-F7woWkQbA0XSMDZ9CPgalImO85KG7-imv_I8RdPJfN4ivIiyVCKuTKncMSEEluf9QZ3K4RvCzWA0S1g8Ia-NkbdgA08AmJZSCSe7J4zRyRbFyZOLr9I.osuz9YsgBw_8snYv2fZv-w',
              cardId: 'DAL:AUS:17:2019-11-13',
              durationMinutes: 240,
              numberOfStops: 1,
              departureTime: '0800'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '05:00',
            arrivalTime: '09:25',
            duration: '4h 25m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '6885',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '200',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '06:00',
                departureTime: '08:25',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..0G7WsM-rzeldPj6Jr7DeSA.NrKXw0mlkryE2ybzpUmEg-S3jcIddlK_4QSQVJED69GLa6fK3N6fm8Idt92RMTQRFXWHwS9AqS0IA5e7VRTlyFM9EUqmV8qgqNnzgDEs__1YIWtJXF_qCg_6wV-h--8x8qtSPk433jMiDTGjT23Al9P31AxNf6rJibE0llAal-FOkyYHcRDBY9jMcxtdgJRU8TOu_Vv75uvmSZX0-3CVpqqlDdgNiXXqhMpaVzgodr1ZW3-8eETle9cR1k_bJtLHcrDvg-M5dqk-pbBJcYs4qMLmczhJ8bcVEd1sn-uDwSDfkbzQpvRxZjD7Av9xpx2iKtiqM2R6k7UKHCmN1CWOHkjjeXAnRzqSrRt5mv3EUjcER9DPJezJl1ytIlsMcvRH01kYyMN8lHobDbSb3CezDPsE63gJnUbj5-cDYNv-lXJ_5HbcvZ2_b0RkVqAdsHoyYXj4GNhtKcf43n1rPhWVSZ0c1a27z9kIyS1tj-tIFeYnoBFoNGQWRZK5bufQcwLctw27bayeoKp7__JKZxYD8Is2G8TXacJmMZbZFDP2YFngjTJu4lLJu00OQz-dzHGHMV0uTVaHF7SQ489z4c42vOBbngPxBzUBQsan_OdVEyFK1lashhU8Bif5TNEuqut-FSpPX5XpukQec6MAabbxtfYobIoYTXViA2BkGAScWfLad1YJVj7F_XCwcScuK_cdKkDrodADGTa0QozL1T6XHHwwQLS_gcmMfnX42NqCuNc-IggXEtm6vT4Glf3qMECijM3x42WmiKwvm55glV5hswRxLr2IbNDVPUYvnFmkezTpBX83rLuKuwK0kO-RwBGcW7wyjHJxze6mWBDBgQsVfnZ4q0bkP7gqYv4e9TGCHSfNxxkVod-0uwQq3KxxcsPiZwLDXuH0RKBka5s3gO1Z5EqVV89PfxCDvGU9-8YUYGuKT3Nxhc8BqPBlhFheLfQu82CLURsH7_UmX8bxqcDmsECHpxsEyD-9kwV5UCe7GFiAPEM4d6o8x8y0fRSRTVVNzOzkAa1j_yA0W8IM2RVOH_GFhEfQKieRs3ThnAy5fmw2yjMY59XfjjRbmrI8XhQADmTgANcQtmn-XAbpM42PJA_bB-ckHhTPSA7boOdHFbeWEFGHdJ3XyL4QXuABHggCZ8mLwK5eMqODysJi9wIja0a79YsUvxQbcm3FYKvw_LxreGVJb4WDJQc7mB9Np6a-.tAxh_PbB2TFcsnPhscM-Nw',
              cardId: 'DAL:AUS:18:2019-11-13',
              durationMinutes: 265,
              numberOfStops: 1,
              departureTime: '0500'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '19:40',
            arrivalTime: '00:05',
            duration: '4h 25m',
            stopDescription: '1 Stop, STL',
            stopDescriptionOnSelect: '1 Stop, Change planes STL',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2111',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '2543',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '21:15',
                departureTime: '21:55',
                changePlanes: true,
                airport: {
                  name: 'St. Louis',
                  state: 'MO',
                  code: 'STL',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..pUtV-wdwVLLjlaYFD700ug.R602dhhS53zCDfiW70lqe2uqyDGKZGdbD7doCnQx01Jd_8fUAs3Me8SRw532IAw6DVcbqUh0y00NhLWoNUv_kD1kAyBRJaT9w84QcoOydSi2-z4zBMLYw5cgfV9B4KKtaIt0o7MQZEYUnzUzvzzOKPCG1B1vv2MAowKIBVUggHMMz_56FSpdtOPYAojANLVX54UYCtipjrBhcnImwRl1eq1ndemjBG5rg3yvON7TwI_kBIDTW0ssf-zGaKE_kzwMVsKjG4LoQEsl3HOHRBpp3fmcuG0cF28CALyctRLZvg1tteixbGSLVqPcpNlnf6y-4p2KoTwCyUB3PLJvlVZG32RE9Qsjxk55J3zuRIM6NkIhfSBNRTr-m-fZ5oHhi3piYImGLk0PzMiF2YVEiMMCAMB7vSUvAEIfUXjcwVwYbWTdoaK3YaN90t1rKMJ8TIeIA8JgqUHWQRP8tiRno4iz422imaYcITnH3_V9QOiJ6nbV4ThPs3cBzARzr-LGoRFB_BIwJvqvjjKuJKxtDuir-8JWns57SEvDJETRLoVydcfPxbeOx3cC73t6V_26Q8g08Pw_jNvoo6oy9jUO8gUf4PcXVyDIDRMV7hPGQnPDuJAHws9GntQRIOG-gyQ_e1qNXvHTWOB8YMpwC4T6TBswMXMLiCogyuk-umtHOXSjN4t9He-b_e9OFkfCYbEgQgoeg75FsEVgcq6YLbwnH7hJoWY9opPZKoV7rXrRfVAfGRGGfnIfBGwWH1wKt99xHpiVM3ATHsZuUiMvrIoEXhkvJG2Mc9S-x2jeQ2sBQJdk6HvLyR_f_wxo63uSW8OLK5M9zEFjDDUlop8TmodZqEENYXfjAkumGNsxarZXKPHieCiK9utHO-Sv2QHMhScQyCH4aMNBFhHUlH5uOwvgTgA8LifhgVasj6ZqaBDG7s6_H-5V5jMdHwxPba-4tu7iH2CQDR_pKMlyjUgZCWSyP7mWXQo_x3H6zlfSKtNF2MsvEJbJPe-1JGKSQD7SHduOOtq2kC_7W9IbdRq3cO1o2wnxwWrWD6hcybAEGbEk15Ht2qT_sZZoYPZFDzLdmoq4IbcA0fqmdPWbalOt6zY-ckwSOIo_mIa88EmsVRMnGGG4mP7xsalceoQ2NJIsbl9mNoFBCVVHF1pKyGj8zxWPw1O87yTBzHghWoA9kEKENB-2s2s_vC78SW4-C0L6qU10ufDq.noD6s4-576aknugMcCcFNw',
              cardId: 'DAL:AUS:19:2019-11-13',
              durationMinutes: 265,
              numberOfStops: 1,
              departureTime: '1940'
            },
            isNextDayArrival: true
          }
        ]
      },
      inboundPage: {
        messages: null,
        header: {
          airportInfo: 'AUS - DAL',
          selectedDate: '2019-11-14'
        },
        boundType: 'RETURNING',
        passengerCount: '1 Passenger',
        departureAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        arrivalAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        shoppingDates: {
          beginShoppingDate: '2019-11-11',
          endShoppingDate: '2019-11-27'
        },
        cards: [
          {
            departureTime: '06:00',
            arrivalTime: '07:00',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2075',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..97Ks6_fNSwzgyaUqoOQUrw.WUYvqvWlu4C4taqq8wzJM9hZ32lDSA-ry98AznA36C8rVX6yOzZq-t7LUXqhPdDyK4z72M2kilXNhuZ-6WidLJgz7NngTy04Ud-5DLQv8S5Vd1wAUR4ZmIT5UM6JCi89vkmwKV0s2xN-GIhsG0HSnybzxkqcuos16j_3APVWNY6lUQrUSXVM6B_OSke2N8Hd9qmNlHkIaFyCUsTcKrG9IYLsLcdHXrvNAcP09NaTkKthmwE_956-e6uE3q1hGCirK-LrpuogIpM86QfUITgqIzz6PAeG8pLEv9KWSni-3oUxVadhs1PPa2xz4W3SdrCm2YJCEdhkKHy0Cn6QuvJEH10KMap9VPU7LPLi5UU4P6Ut9AvVmlckmDfGvmnRR717Ut_QqcN7O1YhE9RHGfNPpxrFupT-Q_NK0qPZA0kq5QKwBMrhkhbgm3rJeR8JP-U5x6YEB3zmFHaJM_E9jeB8K047y6Tfco285yWNeOeHQN-Y3jSHgXRWtiWZXtn1i1khLZOJxIg4JtkofZmmkapYt3vdNQ6X2FwkJSFlB1XAjERkCQjvDurK7cnbc6VomAUNi_ZlX5D1194LunjCb5UaJimFyXm7pZYEs8hGWhQBa1BsOEp403kmNEV5uTCJ2FDjAwkL49c5FZGrmkolxWu_ZA-sj5yTOBJ35sTLT8iSoxVK_jdoAqarbRo_veh8hpJQQfGOOpTPfsGdNTdSlJgBVXN07bG3j5d6OqFWu9cpRn274dm8YcKvpJYKcmeFwwPEH7jhnw0HnEym6DZCQwSNXnuj4vWhiOkZps7u5oWYzp2O454mKg4GXNfR9GPiEJ5aC4U6K58jbFY9II-VQLzhRLBEl5ZxAq2o4a0qIcnUnZg.jVnOEOZmETZxIY2067_drw',
              cardId: 'AUS:DAL:0:2019-11-14',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '0600'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '08:30',
            arrivalTime: '09:30',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2519',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..FaxCqal-f1WWZu9OUJFEOw.uYLzSaXYWxkjw8IrRxPckWvhTujVQQNwh9ojbfcoOyn4ZEu2uzPDokcPLpuSQV1vd0aMUPued9HYm72nYE94F3IpA6KBpcyclpR02mmUWf6rLIGLWCGNv94XwfTzAocmRxpetaTAc-0e5tCuHgBI_ZFczebobeNB0c2SEVihxVtAmyOoMy1ymGwl6EjurARSVo064ZdjmQ0nwltchBb-rFf80Xj3CwYg-D_OsjNObGTfGeK9spfr1fugefwVoPayLi4H6k3o-XYFliGJRgDUlCZ_dHBExve9YXOicdsQ-dhPMMn3Ox1wlhTRZ_h5_HsiwQUB8XKyySjpfHgb_ztsFroYPZdwJIAbqEICXrDrI3X6jMX1h6hqpxLS--ZfjZYJS91HyU9pYkmLohy5GDjVA0GtEqw5IpEiCdqFwxKOD0VFtWN1qGE8M_QKjMMNx-_C1UJ4UMZos0hOcjzDrStM2ydkMoK-S7kAHvEDNUKgbNe29luXlTAQN5jzFg7Gtlp1p38QU7S3u6vnG9QneYg2u55029rofmh-UptVO3xuGQ8XCuqnqNakz9Ya2MQ4BfsnBCPG1_RdWrxA7Vk2PwN1UrgKxQvdCExVe4y_sowF5m0XJ9ug-qmUxKxST3ZzEsiji4PWJtr3fARg1CdwG2c7i9N5UihMMJ8noaQc-5UbbybPcYfwiZIHAimn-j_PTDznyhibXqeFF2bQ0L6jG78m5rBlCuragmYavVAJZQO7Qx7jugk80uPv8yJt03xF29A4s2drLJPg02vjzb9ITo31Gcf185vXppB6NbEkZAy3-sw1_b5BTGui95qfesBYjxlpvEt5uzto9l1LyZ69sMCh9aTsiQPZ8IFMO8cDtU-dTyo.68r_lFp7PP1sSnLpnKNhIA',
              cardId: 'AUS:DAL:1:2019-11-14',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '0830'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '11:00',
            arrivalTime: '12:05',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '3884',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.._wjCCUcjuPtMRBxNJij2Tw.2PXrSQkwj_Xj-maFFNdJLvdxhf8U44FFDFlxt_-PHnry4NK8M-H6jrjnfah1lSkgF9EiPqTMg_QEAqeseKwqbneitVKC2Y5qSiQHaN1ejSCH1T7UX0LPxtNt1J6arqyPQrNfwM3Vkjoju7mHyTVdaq7t2fcPbwsHoDgo48QTfPVuHgObuepvhVaZQt807GumKJX25IyAJF3wLsU0MmFJcMphsnNgL32JBvORYhhGJuFlvfswThjKLruYIykK4eaYhGeMdNPDF5_rUZsKzMq05ibSZSGRmA0ZAaMGdNXBtExkElWDwBpjtH1b5CYVtu03zCBA-EdDUGd0ywGt_DXPeETXqxxyFoRnIt-skfAlIVk9GTHctFB10dS0yY_67QmiGyCNeh7XUl5cOoLgAiB5-g_l14rg-snWDt5ZvVpo-gPRYjXUlHExKntKOyrT0vAc3KlsH-Ngqajx_1cVJS97NCUFW9LOPKHgncEI0YElwLXBGt7iyZXYr0BcF5wPYvIKKJHoduTlHvLqyKzV5Eq61moQDrtr0xACj9gxsTE1nHrpdk4kQDwWCAic3gUQwmPbQD3IUG9Dl8lqwy9gYGwW0Ze7d6x2vTiQTZSZf9brpyg6oCUuGBxSpcEzIiN9blpxERXN6F9e93dTv-bKqBKBexPTTIZyrb75p0HVbeYuzPYyTvb3N1cZ5Kaj0jFdsoJYwuNmLqs4rQUPoq0o_v_b8hBze74w5jyJG8vpYGAwMl-J9Dz-a8x2ntXRwK7Jo98tAjidH9XIuqtXkozvbI0HCN7sYV0ZKhOOX947pfrJ210I-glx2SLNAZ817GobXqzgjHBKI58mQ6R9FZD98GfJ32i1dHOgGojySsPOMbkFmSM.XpGLRgMtrP-I1PAeenLMsw',
              cardId: 'AUS:DAL:2:2019-11-14',
              durationMinutes: 65,
              numberOfStops: 0,
              departureTime: '1100'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '13:55',
            arrivalTime: '14:55',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '172',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..mmqyp_uskcuTXU5Usd-3sg.EfXhpZZeP07tjVAzlqx6ZwS0dQn7Doa7sHOFtOTELPwJrlztyznLZjjJMre65t9CQ5H9jkxLJ-Uw13zo0_a-rEaGHsmFI7RJwj5k2mwGwVp0V6Su0QBagRLvh5eUVorh2Mp30CycpLXmSMzqcs2uey8Yo_l41QcQp5F2swyeEozWlq20xyQpAs2eGucEfnIO9DL1EttESyDhw2bmDOwPQ67YRhlDlc545tlnPUbH9TaJ7rTJDZEpofEk21gAEutYQDTntwSv2WAJXgm9ZTgpeRgZukbS965IR3covrlQNKPcVzyqFUqwmyDMA0-XkpdzYOf-EMHW203mR76sjBHlXfxfZ8CZ0RqjSAHpgzXPHs8-wruzClKEhZs1XCIna3QVkrvZHvs8aAc4q0HXLTLGleRueksrVMjK2Gigr-gVhLrLwuQtuii97JQvzcjho9DNrXBrCnsIN9Eh0Q7wfRKRQW8UzV0Ul2uavaKned8grqkZxuXdQmkeWVtxl4UPh60RCFmA4wOqIemNAb-cYvZbce-LeP3MohnTufsKCDOxkEOhz3Kddgi4EqdWtzgBKd2SD-mFQHXYJaGEOUYj6FXxk2t4YHOMMHw4T3OXGdNTLVbXfutfUPmUsdJJQbaYtGw-u4tE6Yo6xTXhUE4W0GMchJS-RFoX8sYY-zHMuJAwd00bWpUhLkBWJfWa0S90GWpNQsro4iVDRUSaxyQhUnQT6l9TjsTzQfYCDjkphSK3W4lky1vqtelUC05cW8tB4LmoMxhDfrn3PnUV49fqczKTOtZNv3cKbXxJxxJnV24ZJxNSgRiAOhOOnSs6N1xi0ZKtFvC9ZIy1vKIJnbkRqL9yrzHdHc-WuiBi9wJB4JPnMnc.YdEYWJY6bLCyIxIUi5TgFA',
              cardId: 'AUS:DAL:3:2019-11-14',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '1355'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '15:30',
            arrivalTime: '16:35',
            duration: '1h 5m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '749',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..cfXE_H9EJ1EFFU35YcU6TQ.kl9CKUUviNlHriXWUeYuQ6PPxqeHKlhdj_TOCePWozeq-ONl-u3s8FLYSr7iY7Pg4wLTAaRxobsH5hJrc5T8merKB8rUKOsyg3bGrePjKTGVbVw0r-DAW0GdYbnPBUrQLsQ4dQUqRN994lsXMtAnFIxkATX7u4_9ER3-6OoByfapV7Os9hLofGzbDMdEpg5TqKNe87aPeTCprxFnWKRwuz_k4Mvuy25W2xghvwz0FD9Mli4WVXwWi3U7hEEt6SCU5PeM3ni23p_RJ6JmqSpxMR8YHD5z1vFi4PyXEABzlE8JxtntviL-5z-OdVPHjOJn4smor35XIAit_-H8UbHbLsqsK6XFPYSGz6ebCUg5PWUYTGEW3X2wObP9A-9-BkD-r_2ExwhdPq3TmfKuY_V5xqpoAojidBpYKzKhQLM0YYa7XGmKgzNXmZRvxcewJFya12HR_5FnMc72rry4Aq9FnUbAgVxmj76fBh57CPxPAzjZ-pGVLO0GaG7TzhbWbDvXERmrKdd0hmx_OQd_nEu8hp2nu8slh6WgAjZ44joAoDmCppohOtyZT56JQqI-yASh40WpFFtbrGPAhuN-loLbhL9L0WG629s1xGwSp8onk57SvYwFNxRk4dv1g4kKXARAOrP9h4LkSfDHmj-iJ_cEm1KDfUi0pgUjaVkx5KkIAVR1PGx_f0LJNZ41FqIZfZnusnt4Q4CMRxrz9g5NOEO8_815PI4xD4AAV61Hb4mqznRrkfqO7NQr0REtgHBrFveCNzizTnT-ScEFrRoTtomjOaazmWX_fdmA8XEBaShxvENoV7mQeoe57S2ln8VWVmFA_eFh28_XoIraqGZY2X5e5ym4BDF1_U5AbSlgiYJK4d0.0q8bomHTDZyj6lqXHKKLdw',
              cardId: 'AUS:DAL:4:2019-11-14',
              durationMinutes: 65,
              numberOfStops: 0,
              departureTime: '1530'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '18:00',
            arrivalTime: '19:00',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2111',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..WIXB6IaWXB-7IwkHDDtt8A._UQs7P8LQoKLtGn_ruob8In-cw9sxRRiRkOmiaBqAChnCRuVHJgxtxrjPOE6MSvsXuIJx8NlusHgG-0WhjeBohyJ-MVSA_d7BdM_YPekdaC23o2qnQUCt6cdZNGivfX8XA--YQutWz5ZauJLaN6W9iI3JELA637w39GItL27psQC-2-5Af7dnDglPInx2ubviWD2hYgzxyCaFSQZ4ktY6Z7qUnI4R8Jep-PkP2WeWTabio2VTondbjFRdC4Z1unlaFZpC0LMc9co6makN0heIVGfPyEhWEDwMESUV2XFG2aNAE-GwARXyTX0a-MHAVBh9-OEZmYC14msS5VjJHnkcPNlQu0iIT9GC86BfUlworf1JnITpRoucoSucazpDPFEnJ4DZm4JUTJiisQADWOwg1ZqJce2J2O6GZ2qlFzjEE5NXrS54U0MRGKFgcnN_4ZMnsIGU-mkb0BI3NUJvSux5RozTrbjFLXnLXTSMZ50yiWUiRnWIamelvSShA6YrB5-Cm3vCdl81XrdwRlQcYliWjEelEVAuwJ3bld9g-_fLFyFal78i21IHlSuDQCBaXtX-vGYWMIC7wnSQVhvJl0WkPGM0-8zyDagGjmQ1qtWYSkOnaOuKYXTq60dG1fon4Ns0-1e7m4htL-1SYFZ-zwbUkflHn-lTb_Qc53cnsi0PXi43DmVVCh6QevjQGh4P7jZ-401R5Dl2jJJT9sFrdVv2FYsmJGJO3Ic0ZNWzvO6EcTvAOMEpabXyzAHJEsKVlIpZrGsP3Ibgm0QvSftj9ZrGdR5mjLA5KrxUoD6NzSwGw5s0KfgiA259kbJs-WaFZRm2eevOL-_HCWnrG-AiWEaEI3JChq2FsLrgMNfCUvBA5Y._SawZZOUYSYayzXiGxBG8g',
              cardId: 'AUS:DAL:5:2019-11-14',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '1800'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '20:15',
            arrivalTime: '21:15',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '3903',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..z0YX0dLTdVtpfkwSAYYIfA.p0NlzF8Y_dAKX908dDQHzPKkYUD-iT74SuytHTwWPDzcaEKNxs8CCrABNRGN-d8qX_kGMaqSeVqCcJHVon3aBTekjKzljxMrm2zQw5Mkx2FOYPZ7tdCNzJ9ZJZW3zQtFXj5rMZFZ7qL8ueyjxPKfW3zaqNUkmMgWyQ0rLtavQOgM3i9PgoonW-za0TnPKSsacXZuEGQrkzvgoz3JfgSxVxtnxPfjHlkir-CBTardf-F-oJOLLeoaMi6kZGXIpUZ_zGNIHOuICxBNRckJupaQd4-K8JdUU17B7_QMxJZ5YmLZUfobEVFoPVBB6GMmubArXJtmdpggOKo67OBt5cPboEx-12lRdkMF-ePg8Yij4gDf0OOtQKbfQDTMIfNrGYm1EXmJHTM34IL-k-mwlhNMFItZm2youD1E2euXGmzgbrR6WDohdd_f3OkJTqnVMuGTTdTSZVf6OnjjdEP00Zg9ZQ5W4RYFzVlqeh5i4lIUk_vHHnbTQERZiODdgQRshnVWUVjvPMhBg6-vQqw-66mSD-yjCuorQxYsphgSDjCYf6nFSvNejnQh1HNJ21GO8QOcGtyWd2JEZRlQuwLujKwH737gYj4FvOIAJpyqvdebGB-2nxDlnsdynO-Mk6bva6IUnvTQv2M66BwZpFYn5WjxOjbCbtk73ZO8MywyeNIsOlCTG0mQZ2roS6LhjXGl8FnIB_C5QK1ZoAhNbAfj25t_kDuUW9DdNE9p4L-buMfbiJmxFu4npz3tmVqKMJvlwJ_0Z7O6iEK5FbZ-81WfFVcK-DKf2BCeAB_rOd2I5Gfe0PN5SgVd9FKyJoFASS2lk6jThA6hRX5dKiJuc9r17bzthbfnQwK4UtNuVomGlkFxJsY.JHVKRko7XhGNg1nk9rHmQQ',
              cardId: 'AUS:DAL:6:2019-11-14',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '2015'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '21:30',
            arrivalTime: '22:30',
            duration: '1h 0m',
            stopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '1125',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..fuEIumNYU89C_pyKp_RABw.2nMlpSYdMX9v6qeKdO-v_gFHGvl0K_tN4s4Vqxn6GP9-3Wm817BT5_AxKHCIOSQ6CqZKsWbDoGLrsIFZ8KdV5_yqEu9wZ8MXOBvdbrPKT4snlpzOVJNifWQFxSIIi3FCrxGfo9s7-9JmjjldB04qqdkCr04apT2UoWCiDsYJf0kMbqX1mAiKuF4lF2-qhAXp1dQXzy3DkSeW9OMFHq8v07svhMNKS4aazVTctFUOP7DZ5c1T8oF_moc5vJYQntpASJUQn_SSAUSFx57I7jyoJwAhxxM7u8Fy2INxZ3TpMxSqGnlDDDFSQqtZciWtYd6RwKCMyZfgUgWQYPD0PVJeSd2I_i55C9M8qb4TXQNNAhtjU6kWaJXN0DCnnRAdyLpG1pPt7ZNwtOnB-e3pdbGbhG0WCQiEs4Pj_AjWwKbc53dL7BgsCbc0VXA75-_iCa9_43NfhZrsNeQH2nlIX1pog15c2dqMt7r3RugJjUz1FJMpojdJu-3b5ue0jYF65PfUw3Ho3kYPvAFxQAeAc1-7K-PAlY8a-tNBHdj3lJG6sfxYfWpRdoAX_x8OOU6EX5HwvbUM2OeuihRVYbQtoTMujiXVdf_OfDI3_fJtVfvanQWIkW47TvgpuPyB7YuhRQX0RQHMfwukgrSiQRDKBBfKUh1T9uqRhicp6ygGCRiwmDdvJAW__X9QUKa85r5kWlTX6bfqJpJkjC5G8xarysrBJHNJbRtRugawql2498uu-K3ahbkOpdVMEJPEPXTGkQTiyEv6e7jtpicMn74NWevxoUKEFbFnhkJJ9UdvTTaQQ33qIgvKh_GLRvM3UTwtivliDT1kjSZNlALP4UvwM3Bn0xWUhofmpmBIiLzrVhf1ITI.xCSC_gYwivI_PISlKURuVQ',
              cardId: 'AUS:DAL:7:2019-11-14',
              durationMinutes: 60,
              numberOfStops: 0,
              departureTime: '2130'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '15:20',
            arrivalTime: '18:05',
            duration: '2h 45m',
            stopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, No plane change',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '44',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '16:15',
                departureTime: '17:00',
                changePlanes: false,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..I4gBVOsQKx09bS4Z3NKTMw.tpnwyH2qZKGdeb9LeI1tbeNPcLDFQ7FOea8fY4u4cX2zYaRx2MSkIkadNj-38L9pGmO2YnDcsSZDypcgR0C3prtuwH7Mp1NFpYQQxHlUyyIx1_sjeupqw1OAcxQEnifbHhqS6vNI3xTeH-l5AIaS0RjQHk38nsKT2S5VvxEvYOvmWxU41VAMatnCKB-YMPKUDhwHWRLjYb900RNA5znkwTao1yA9IBQbT2OhyiwMrKOX5qm-F0ryzLVGEPb7Ms-gw-8ka8lGC5atxIbGXBEGBRi2csGK_PZXiXKdxrXwMyfKRSKtY2sR5CeaAIYyaggqfDd7NFVBEjbOR33rco3DcUidY08xhnMdb6fBL16eH87tGlV2JxIKGW32nHTGQHNjPeexC_Ei7wx1vRcXKT-2IWOMq6ZWEopr6IpT0TDcFBtSnbXZHmRpE-dQoNQwQoz_5BWrKk0UDBVWDYWCouZLXONjy17_5q9LZ1pYsLwoq6fXfgfPWDW7-BDknUdb20kSI-sR4xL_7I6uuR1Gu6FPY2yb-ftOKYHDRuMc1aBAFVLPh7JL_fqubOU-8-fKioZ1_iXolZHmIqSRH49bsVYbxLMlDb8Ph5La8KNn_Q_2tTKEzKT56F2ORN7loM0r17XHqnoc3HcXapWtG7A5eaQ8FvwkVhKVTC8NjQKpMRBCzdhzt4pdLhbxw2Y3zer1uBOr0JmCSwGwurnQ7GH2P6E3FwGzaG3kZwQJVCoc0R1PGfi4R2xBBMaYaehTi6A6k2vyBzVL5aeotV038qrmmdYJgFWnw4qGjXmY9dncgsRTPGW0y5oAB3be_rSMH5V02G4Nby9wzR4jbJCTVG9zctF44J_3VDnvh8KsP0a1qU0_Bbg.Xb1EjsMzMmL6_x5UmNmkAA',
              cardId: 'AUS:DAL:8:2019-11-14',
              durationMinutes: 165,
              numberOfStops: 1,
              departureTime: '1520'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '17:50',
            arrivalTime: '20:45',
            duration: '2h 55m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '973',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '6827',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-800',
                  numberOfSeats: 175,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '18:55',
                departureTime: '19:45',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..Mq8w1nqazqAf1nj7PEw5Gg.FxNWvL01xj59dfR3Egp42-hgVJcEGOGMwh3ChIsNiyHTK1hRGdupQfbWmqdci-GHHen7j5hAH0sai9GPv61QA0Xay3GqfqkVpVUt_pM_wyDj-uthWiwQL8Kk01Uqli7OH9Xtc6uPw8MXlmb5CP9Uiq1zK4JdbfsFKgUwKjDBUcbss-_W98JVRK2gVItw4wBJesaKGcnNZngJDgNwrwpiXYD52Vjzojt7N0K8YEuFClx0u2qDMAf9jF4uiqGb74Nu-igbShlu22kjCDcoO2dhSAkplOqIdZxCKvdsaPXB9T8C-ywmmRG9UINBCl2BL_75H3uUbmIxe6_Sl39Iwtgq_i76SlwU5iFtiNKUE8QBoyIvdf1QLNE9vi_QinxXNkkgksAGfep7qD6l40bacfNymLJRcKELABZ86E9waIey4qYqftgtRSVVCbDFdi87qE6fAu3kjdsJ_XUOjpcT4HArRRDAmhGqPT-6XZ2BTNsMBS_JdWU_fWyfwCDMyrkXa6fc90kHRjcslj_yPVdhPDbBgBUP8W6ECcAJ5JIZmoPuiYbdM5880Sct_EKAfgu0zxeRK5NWlDDrZQ8ZJ69rr4BTAP_pukrljVFfSIWM_s41mV7YjqZmtSVcweqsN-Jk-J2fVMWW70KthC_Zv6jZf7YRUslmVSToOBXFSI6JOevpky0oNj-rtP3Tn36SDubgtoWwjQGTPkot8h1nzJ_AP43sVeDwLEksITQbnvseO9Axzwjb6hSbTWNdINV0FBhw4QZcLrOAq-IqItNSrbqLiB3i0udk0Bg0mBfg6ruLSymjEfJ9Lc8OcdcKn-W7CnVNX7NSLkpXQOWMa4uirYfzL_OCuuZIFmnAm1d5adaYsTce5fhi9OiJ3w328DK9yR65H8pXZqxOfaYYNU0fs7rjspNNdpZqWu3uQS6dlOHMkGjVIm9PNBHFPodPM_TtH5vhKknPYyhguQlJQDgXNpWJwMV1-F_i9rKeiUTwX_9IUIicVxD32aOKgVTTUVbbFGcemN4eUSfv9jHBmzutC-OX8hLqLnJ6S76xudY5c5nkJuYjgryEwJ-WfTFy7v1rPCN79nezzbWfr4LXPmuyGUgvDDofOYza-xXkaEsH4yLCHqTMSaO1vPWnhdgWzt6NL9EM5d3avzsmXqfIu_uVizrNK2aJyyZmDD3di0hd_zJfZsdwKiWLhOUBphVZGlay8DTSPHn4.LMHuBzbRrkLrJrFMlpqFFQ',
              cardId: 'AUS:DAL:9:2019-11-14',
              durationMinutes: 175,
              numberOfStops: 1,
              departureTime: '1750'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '12:25',
            arrivalTime: '15:45',
            duration: '3h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '3222',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '6822',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '13:30',
                departureTime: '14:45',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..bxNPE2R_0iAP-dUpUhXtKQ.IBcoxVNN-GcSlFYSiAt3IcwMNU0LmRTcL2ZGfm7iXRIF8g2pXFE6veyriJ3Wkx9iCj6MfJSN4NnSNM3toycMioGQxZpF5V3qEC2Twp6SR7_rNcTrX2l6eopxH1JCoxxAyUHGY-Cif2gcgyKMl8VvHgDKYqseY4Lx_a33jgchGhGcpdRYVvu3AVRhNCsu3CvHseGTqDEZ02EgNnEEmK-xN_k12Y13Jsk7YPbuPGsAwVYSBSk-FJytzcKzg_R1hTXT78I-jvCPKcA9mDEUIQgxV8yk8r5HR6Os4f20rbF0IJhQfAS2KGr5d86nkYuIie95LT6xB5Mo8ecAA43dPyKJYk2hOgJB8VDeFQPPHyVvzwUwu5UxjCo95RAk34HKJqRu-yOzYyUQt6QzzeTmifqYjdcN7Dx5SdprNdE5jzLjJBX6Ik8yuV0STWHCHyjIs7wSV5svOPfKcY3H1AIm7sRBdaA13gEajUDNAifadbP3nf8cDw003ds3GoZXDaCc2h5Q8N_uc1KbdxTeR_EiJU_PQqdj-hI5EneWkg1siqqsfKJZkeTSKRWMGXpVXAzSborIitYTam0WIQD88Pz8HFzkbjKX9LAD5FIh42PJyHtc4vxHPfnq3kzghcrE0RlmQbAK2SXgZu6-AYEgjSESlNb0cFwOisliIO9QEJqmhHPK1SZQFTCqRAOxTR35P9MiF1PZsSZAe9cOy922RBHqmG6lSYgGerSqUpJ_Umz7r3kjpxoF7s02m_E_Cb27B0ACP-WgChVMMXr0OdL1I01lXQfHRUJFr-J6xEgPDIY5zdDwO88nxGaWl67l6l9uh941LYQTqrh3qloIXs9Hm72MziuZF2VkvEuaX_O5sMsPOotFMr-gDCyibAP13NkfrmBf3iDoS0rxe1RskCxDvYmR0vrMjMcmpLqC__6e43p5s8V5ofFk2nFgnYk5AzxB4ag0eINfJaQoNRKF_JKqs2i6M2yJEpeNHphoJzKYWV_BMJ37bWXoQB_c-asoDzCt5asxuaD-BNWLipsO9zHiFamVqOd6cXDaWl77ta50UUMlBuKiuG8yKOeOMzrB09I7XkkhZU3QHojFpXU1zaWrIxdb5WqxUbkKj1oZFffOCOd7hwFMrLjFCs6Td0GTmIyuVZ3-iolGLQwP7D9ooZFby2hdhSwV-juZY2yxCEGPAAkvWJFg9HvCfD6Nx8f27lnCWRy1edhm.mFgUkNIJVLFva2WhPvY0Vw',
              cardId: 'AUS:DAL:10:2019-11-14',
              durationMinutes: 200,
              numberOfStops: 1,
              departureTime: '1225'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '17:50',
            arrivalTime: '21:10',
            duration: '3h 20m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '973',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '58',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '18:55',
                departureTime: '20:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..jrlIxVOhptRpw5Armr0P9Q.RNngVqJiFUx7sqn2PKBXDgx5ELzj3vfFcQuU-YFbutj5qKItTbAiRM0cJJ-2sbzKOL1bhgJ5NhAJXqs5qIgJrx25TitRJFUJ-zpdvKiVRsClUzt29SPclU1_mHappRYbVTeWvLodYtnkLmKIQyeaSapjOGmxeKsssjb7B2nicu8v0zSqxVyANOoLK00ol3l80RtoMFOMlzS0PIE1GmNuxWbfDKLqTFF_VVUN0_98Jl5HaV5ro8Lng4_6BU_tWjvsgUe0cvPnYWuICSlDbJjMQFiJRZdG91sC6C8WtlbdNcJEMU47d5ZhbYnKDt5mfxpgH05T8rYm8nqJl9qaydyMLbm4za1hObmSy4Jej5Xll7in1JJnyu-vlw2Sc_wwSuzIyarqQ7SS74_2APxeTl8DcBJbf2OjcCzvkVrmV8_L8ytWoUiSaRq9oWQN6BPRoelNwzYEO0OmsyxPjGBfMbV0eq7X_DPGPLFoQ_4D7idfv0I_Icyx6QgrdZVUonRk2KUE78c-hFwZYDSfLs8XuwTEOEITgzhAg2SiKFKHfH04ELHXxyBierB5RTylMhoCgTy77asHdEf0bWdzH9YhwyOyh64W2saXRrGxN10ooVVmoyF0p26NFLeX1TWOTRVxrrtt6UX8vc6qODgNdWMmG8G72RBlE8dB22zM_kQ_CmJhMOZo1y3T_7R2rPVJt5NLVdKJXHnrLr69TsPx8WSDN2zbIR7BcJp2Uz_BhbczA3eO95ovd3WLzc-JVNxEu3pZptc45M4y5c5gJDr3jbV5Yed0mjng_F-Qw8EjRkRODzxBrejaWFl4-VoIfAMpqMgfgO3VfcD7X0I4l0WLtnnviIqfTfguGvtCG5qxECXRp1G3hikzxBOAsfVhAi_DYExcMmg_4P9JulUih5RSEZE5EtTMWlrTmibj7azM1FhyBlxIm9zVcoIGGAJj6dOLX5CayXfK6RPniswuiOA95Ys5dS9fEjGmlWF59MD7S8GfgGP-IZ2lqqn7M8PeoG4NDNhX-RmkjrTdmsLU4L_qRTLDnfYP9QrNWVWLvjd5mhwGj10vExLIQ5ih7xS-Z9yINOUah9Vb1LzEIn2oH744hFhmuFKGRkgA01OBphpUDyd5klwtYCVJjA9BlIfKG6jRMX6Y0DAMMTgpaW2j2_0GKBPrc_iIw3mE-uxBdTsJUXbP3LruR6oP-he-IHifunMnIQGT4CSL.M8Aik7AX3PB-m3ywLLtwoA',
              cardId: 'AUS:DAL:11:2019-11-14',
              durationMinutes: 200,
              numberOfStops: 1,
              departureTime: '1750'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '06:35',
            arrivalTime: '10:05',
            duration: '3h 30m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '986',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '12',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '07:35',
                departureTime: '09:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..7B-MmLCvmMHDu2OJFqW-iw.Al7VW6IYl9w6rwTWO07iRVek6PwXp8Z-XhE8Q7PSZt-Xdk_1LGofmszWfnvZfkIaCvb56z8KYrvbYt7C8I4ahZ0_Lyhhbe-KzwY9UvSYag5bWchTW1WI_jDgYzc7FuYGByWO1OAS35ukgAErtDfRrsL-Kv9T7nUA6Jd9uUe5Gerwm10Y4IzRvreAYXeM5co65VHWtRpIISbRNkfxdeZV1Q_ch8vMm2uaqrF4cfJPOAqTQvtpsila0HweUGFOkJsdZa4Wb80dy1N8twP9p--l0ipSepiRE3rN6QLiiJieT3fHpkOWCclw1a0pGiTRw4W1X5_6QZltURNQjsw5OrbaVQIMHuRqGXgqCqptBBnbRPcmkNRDnQtPqTeh6n3fFCm8X2_AzMFssj85dxa0-VMK16Msm7AGxKG31_P1r0cMQ61VVqoRK4JGQLOfN2s4sMWnrVS_32uHjpm3L5txBhPuIPQEgqzA24QKwia_RQDqYzlE0lSAg4WoCo5-LIdGPuN4bUPgTDxgC0LD9a7_BykyoTYfAbAMxEEMARb-cI3GOzG9_GRXkRWRCHQ9B2zAos6rbqdxJd2IIQ8ZGjC0Iry0Dd6Wzxt10iZvcTEK531kanZEft9E62PdMUj7QxK4z-DR3_q6EYs8qqvha5oxdUIE1X-JFriHaQreEwsZRdovNt6RKOSVnbU5kT1MT8eefUJxnbbiMQi5BcUOcj22Scmua2un2RkOYxiLq0EhGW6KLGODJ8TCp4UbU63RSW_hbjXoRuJWHjY3k7gohmECzrHjMIxNtavL0cN8VV6TA5MqHk5OWwTbw1yGPLYxFIGuoGfj2KRrQGTVyCeBchYltSl23CXNLvKhmmcBLriSV_KsPLEqpB4gaYEKhpuWGAQzP2IXf055qyov8kom1M364ofhf0aBIoCZLtyTui7Qqj0MIoOjrTwMpGFhdXh5pM13M5o6cwBhx4Edu_3lOaurVgUJarbLdg5BhzefDKWf_3htWpE6O1_gvNZr-HRpQNwVFPzQl59MSKIbWcPuCoF1JbkNWcLMTqoligXdwqp_puARJz6YzffAk0zkHmeom760NBZ96kBlPTsuV7Cg7zjaGALQTjY9MRQyhxO25Z5vTV085FGIhJA0q12p2LfhwsjNwOGa35_BEoITYY7Ga0Lp_NrjZGfdBRTI3ySfNTA448o3rf7HNlwX_115G7Ac3cGpC4-Z.AaEGLqvzES4X4XimRDG6ZA',
              cardId: 'AUS:DAL:12:2019-11-14',
              durationMinutes: 210,
              numberOfStops: 1,
              departureTime: '0635'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '08:45',
            arrivalTime: '12:15',
            duration: '3h 30m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2367',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '20',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-800',
                  numberOfSeats: 175,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '09:45',
                departureTime: '11:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..nZp76kjh8XHtilRcxy7HyQ.Cu5v5zDp5j8BHlML4ru_Qhq_9x8N9cdagnHeTZyN4IB0QPSSTV72m8z4v7BDJX5hxjBQsw3qMWT6ppT0U5c3pGL18rPkpHBInriIRHaS1nYloZDHPcVXT02gOc_XlTpGDhBidBfKmhhtfE59i3n47MW7AOmJ9Cq22tG9HCij-Ib3DZrV8DRzjkfbG77B4ewz9VMvtHIVWZmRwTdZTQbFCOwJCl9KwhhB2gNJfst6ppj1jkUE8qh0PB_Jfx0o8Cty_XilPO74-pqc-_9m8MhUNeNWVq1ThPn644Z5SJE4Bn4SLDVP8RSmlO1RAoXDd3fCXyEphJyXebpUR9VcA0ETEYxVtVdzK8dAfpxXvIVCC_LovZ5hQbl_tBo-mmHieez2YyefQE4IGMuhe2WvVYZ4mz0_9lNFQ98Yk7_GDrs0K7ypQetcCN-mTjagDu3C6l1k3gRL_qdwuOrHwD4q_1Ae6gyuyNRbyS8yUAxRzcDwf9mdGKH7ts0-99yGmig77MzqsSmSBVp9Z3c6g3IRt1S_t2QLsdR6-N-831xucFnzPS8HfQhHxbFPYJ25LNByQ2S6WEOKGb93m8VcAqHCGZuBghYrjcHeN2B-aydkwOHarDQE0Zs-HlBZAMVtDO8rOjuDIa92cGGlpsAqxQV4CObO64LyUzNgWrVDHW5D9CZkkO5BS_jKoKV6UlfJz2i7jaSQVKQKUtHpXaD92KVNX2JS3_7Jdu-0pt4SH_olLus0ZoGX0kD1mC-3oHCTjf4ow7uQDrvaZ4lLy-BXLh--gd9xyFAQzkhmmZ_tBd0HxfAKgWhaz3cKIb3Dlr-sp9SFp6ol-9BV0VUOUyzeB0io9b_-zSL9pmr2jI1SHwIHNhntah9H8LOdSJNtmcbYZXxh5oakWpgSERf-wuGBFaqkEjdgE-1w3rs1z0ydnhfIyoOSb5TyqMPm4lMsGzbtB8N-03HY9i-1iaPEUW04VP_0rWqP3WX5MAI3Gg1_dd9HoOmh9p1ktLtFXGnoShf4o__TXUc5MQbpMnXSuPho7VG6Bsnu023wV9fZpGigOVTrK-fTfiaEcAcuu7J5jaY3hN0mUF-ap13J759lm1pB9SnwtARG-euzgiUcj94iE5NQkJComLqU80ysf-1jYRavGEXB5hzOEN-9epfM8wUafSWOBjVttaTFnBJJev-QGMbZ2RmemNdD5fh__oGyEg8-RMdNzAK_.xEBmYec5fgHocJ-nqsD3PQ',
              cardId: 'AUS:DAL:13:2019-11-14',
              durationMinutes: 210,
              numberOfStops: 1,
              departureTime: '0845'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '10:40',
            arrivalTime: '14:25',
            duration: '3h 45m',
            stopDescription: '1 Stop, MSY',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2413',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '140',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '12:00',
                departureTime: '13:00',
                changePlanes: true,
                airport: {
                  name: 'New Orleans',
                  state: 'LA',
                  code: 'MSY',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KuDE8iHeEmwOuFKx9gQt3A.MFeMFJEKW6PnXV3_mXn0Nibhapl5jSJkcGKfJQB_hmFFpX9hyZUHGcRNZ7rySHEPjh_44PLrwAJEH96zywmVrfkSKipLuCu_8qKAGEn8iyj6m-sTgP56xiHwKmru61213D8EXGfz4sOHdESe_ecNbnzjbbcjhino2Ff1U-bskY0viXND4aZKOXMdkw7vMOffUmRH5Wa--o4FDeCyVSEJQuxG8SPFceS__usubSdi9tlEZRhUnBhIN3DSE1F-uF-DzRLq_z-1a_Lk8UTA1TT08ksr3Cj2Ol0FD_BnpWumazK7WAbUDdEV98mztZMSlw9Y0183EAUQhbqG1ywCQXIVlNE-Jws5sIWhqZmrZZfrjYyQw1c7jSqf625PK8465UiCqmvUpmpHehu0hZ4UIXF6XKxJiw8HfYwW_BD9f228DeqkKOE2eCbeREjRhns5tHVdr918OHsLSipnMH7-TqXh1bsiEeDp9Q4RkB0taC4-L1BX4zafqNYr7FslmsG8kAR2gaWYhQWMwPpNtxvJvM_ENApJ_qYMrLFXj3Ii1qWDW4jRTjAkUnIWpl_oQIp7P419g-84P015oQJGOWl5X_KLy_1HGUs4auKgS8ET2HTc6KVLkjyF20NZxpDPqUJMdVe5Nvg-gRebz3dRpr0M2ohbP6TuBl6_RgSKe4yO-fOfrfdzXqQt5cTsInIEbUKK9KpjXMpFbNYRp_no3fllGqyl0LI0tNdQ9TJQJWN7KvW7VPDTO9CiAbH7OojAksDJEdo5-y-3gHlnaGQrtlPElYoRJfw2TSWFEGWxXmzd0MU8nE1FTXX13efGGZmax198Qur1VmaQWG15vkZicdCLOSmJyDl09O-i03_Sxddn7SM3FxViQxTuO_Uz-Y-wEVquVJDI_nqrLxR-Wsr-6aFc2zJNbdkdD0pLtIhDzRVR01Jeb5yxAdDyp0mOTpG4lYx70MnC-1kJMKTMnKLS9bOVckc-NSCwMeGGxj6nzS3WkBS-7n6JRX6Ic-MA1mBD5FMJH5su8OJxgPyUooHII14QJrrmbevlEyuMgIOjGs9KD-6uiDYcz2DcCafr1PX3mzj7jh7AR7YWYhUUjku8KTXdENxkL4yTEIjLc1EeZ0ian9nrAsqaRb_8omclyL95LmfKVKRddeHcypMch3nfVZNvCbashBV6EbMK99S1gyHVMJsHZOSWQT-NFCBl4s1y5VrwEH16.UJcsYFynDwC7YEXQzODHZQ',
              cardId: 'AUS:DAL:14:2019-11-14',
              durationMinutes: 225,
              numberOfStops: 1,
              departureTime: '1040'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '12:25',
            arrivalTime: '16:10',
            duration: '3h 45m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '3222',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '36',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '13:30',
                departureTime: '15:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..iXVc9JPxg14bd1o8UqF64A.ZfxXZY9ufIzuM4lHv6I7ZGc6heQMEC9JT2qrwLOJL-DTkFP3b2-uEe-Pgm_4JIY5kzUfF9ySsjvrIwLVXTO8JmSYh2N-g1LTe9Bs0pHFMZjUE2n4CX3LTQfGJzhK76Ugaeu5xsXTaWp9FnVNccKmUGV02UiM3HxSUbBB3TcGYdGydLMiK4m_oIPn-18bjkhIOw9o7lFMFCeWruXPdwvsFNF5q3_uHnCkHM7uMD1GuafPg7uijuH33X6TXZ4f2w8u2wozbNxAwmVIbvJhZLF0jJQQstiqu-MCPMTXZ0u81s6RmU-sovu2nLixdyNTv0_XFFcAdhcffwnra13z9ZurA0cqJp0N-B4QIMuykc1i1Dpg3kSlCPgKlAvOT-ZemGGXIuIwK6uHKe4zrNQUHhPPghCJVhCHYsVoofOf0cTOQCQAETZwFy9CG2J0keeImbNSQlnl_VnXs_XFMPYe47IBEJTS7LWyERVkJjI6_jGPq1hAEoXHiXO8XFE_mCwTdESZnnTHrHjrWk3q2bCeNy7lz2NVrONbSuBz0Zb2isSQWRd0WsflRy6Nx9eNgZncXfnnxAMdC-2eI272n4ntJWL-vKwcOzHbNaBIZ76Nr5kN6-JDjn719cHQFAmGuN4cOrjVDbEkTd0gnqkUl7ijP6kEAZuWpAVtJq-FxiaC2J9CZWSMC2P_WdXamaCy3wTiRqF4mntzzurEGO1DI77UMuu0HwddT1xrlqNCPukREY4Gkhv0jaw0k_lNdWNCyY77PIVKnDUYG-NT8eU_qtneSQDiAnzZgzTJMLXciTHfEFzKUgW_PxjvA3F9kudN6iNpkIopZD_NlV9Dnq2sxDzAuKEeSu0tpgIVEFKg9xXaHdXR7QWyHt4HBOvw-oCv_RuJ3o3xa6Fn6xI9Ef4pHke_ZQfhJLhk0PkS3wN2FI7kx7mvVOB3-QwjIAD6eNJJ8WHsvyiVm6ek6bj-PxTQDfy52eGcy2hgb2QW-pBjDGLnzaGmwv1RsCuLigyA6yzuX0WQeMggf93-VGO9AicgHt33nG8Yat9WR-j0rvZ-twGQ0ZxqwWPzSW6l50Mtf3stF7zbXL1qr8yaRSwbnrUOHm94MTEcK-JdeNe2hMthROaTKOoHj6MBdHdBWjqvGAk10_QowQK92CoaS5b4luf-afBvnbEP8-BrFj7k8DX2583UrTQ1rhMhkjcS-X_NadNCYkJ1chHR.dRWCa0weQPD2b_lYzWB_RQ',
              cardId: 'AUS:DAL:15:2019-11-14',
              durationMinutes: 225,
              numberOfStops: 1,
              departureTime: '1225'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '14:30',
            arrivalTime: '18:20',
            duration: '3h 50m',
            stopDescription: '1 Stop, MSY',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '3154',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '51',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '15:50',
                departureTime: '16:55',
                changePlanes: true,
                airport: {
                  name: 'New Orleans',
                  state: 'LA',
                  code: 'MSY',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..nmbHFwZ5L2zALSp3QpKOmQ.TI1qGnI43Y6SEXIwIUFfbJ8tJ-jM5abp2bJWNDAgZCIk5Y6dC2sf6jBdUMHc8gwJAde-Gk47PzqdAk4wDPt4YZPvg9OL-hSC86s4hnl61tUSo6W4QUuHx2csH0b0khvdhmCtQmSHdAPSY0HNmT45ebXm8PeG0g7Pae1VIfcCyOTx6soPVFh74PuVaTnRTbsrc7xqavOkP57WCXVz4IyZgGJUcMKEUA48ZAlKOSf8n9jmyA_S7WG-dRcreQd_BUNmxTSchzmIDQyLmC_pp_dDIP64Y5KRUJMcJyFafeaPVPfyhcVhqxcGiL-qRNczfAxqHTkFGi6uuFcsm_a8ztXF0JKzFG-cr8J3z9iq1GKjdp7J7r-HUnm8SuS_SN1nYSPX3zexX89Wy8igLuOjAHWjXLsjl9M3Qq7x1nDzo0PHygsPPEhdE6B0CyxSjke4jvA1-5DuYrWgdaCxdoNl0I1OuUUoyPU2ULAQOfp7S62jaekVWv9SQqqTiXtW3ADv2eaa9oc8XqMYmEA68uNpSqnOXA2eIIHsdleIxYseCnLpD1b7gkHDbpb_aJkWlrUFLEJ9NID6WJJotGkPuoK8FSZEo8bZplan_oWwg1YKUlYXxhY3df-9RhxGccdEzG9d-yBQyKHUGZR-PqXkPKXyC7ruyYp7OhXsQ6TXQ2etehr0Ux_J8iv0-k6MbLl65hwtnTXmz1ALCkzQG0OlRhtbpvW3Ef6P8N7Ndo9Vn9qb6Bh4eFgerjNRBmMyMWfvi55cHIfozp7u-QZtDBsxlyU7qk3hs-5ckg4toyOJgiJXyXMFxd3CAKJN7MUPjKS_sJ7IYHCNgdlEAQD1XwT1KHcSWePVt7WBcerBVzpgxxtYVrPHZO42trZkJTmRcnWL2uetaPolkI-12iRWYrML2XXgsPvs3fhiczEtCPfoEy11tqW3pGobpGj1av0TQ2EwHIAce9pggiLgmNj_OR4FdAnTcvyvyYhH9LOpJyUtGfb084EX3cxtO1496ynNoz91KOpFrq1abiR5z1WvP1lbNhASgqhz2ElWszkf3uVgvZfqJKeDC9zKOLG-_7hF5IAoVQrroGCiSz73PTBwRDpyfsgmBiuirnOZADr3eOEhRjtrYhTbWwDd7bbeoYJweKp9ikV2c5sJ4Gn44-Rgd_f3_yDLsl_PYio6ZG25tFqn1Qb74oBQHPPlr9HaM29TnQ80yp1YnrEr.s_fHlEtW78h3CCgfnsiFpw',
              cardId: 'AUS:DAL:16:2019-11-14',
              durationMinutes: 230,
              numberOfStops: 1,
              departureTime: '1430'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '15:20',
            arrivalTime: '19:10',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '44',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '48',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '16:15',
                departureTime: '18:00',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.._OAsZSn01heDYzUQdJtx0w.txMYzHt3rWdId7BqgZ2hUp_CgWsM8JO7AmBNCpf7qJADbNNakvMEfi7IntGzp70Fv5c04h7Ln3zcPymkAJOs7sV-DLfFFnWEF21f-wpoYlmPBZOPrkX01mniJjwX0gsMb7CqWJcZHnngVzuSyiVBc599krKMmRtM7fmSl9gBXyN7FxnXaTXlkymoUIsdS5Se6KxXOEKJGK9kCyL2SDDu47yOPN0yKf-Q_vR4opMmCyonzQ6P_xCmK8Pc8G0KwuogdznEw2HDYfi9qKOi_MWqimL1G0Y62P71QDBEfoSGWcbwUY6DKT3QFlCDNfpEWsWDrGejQP88VTJJzqLiEmPGJvC9xsPUl7E1nN55SW5UdJFWzzONmO8-etEqupNUqtoaYTAnBreLoGAVDjzJGsoz0Q1D6xvrPH9_1-T8fg1SCC_f8Lm8O29nG3a7utKLFOlqIIcMNEzbFnmrqJLZTI0lCNUUQf1NFA_3SjZl7mRiNQj_do0ejOeFPR9R9cUYB7yNV1B15sVB5ai8lnote3iir2oX7Ny5vYpAzD7PaPISK3rdEyAYzjDDZ48J3cs5YpNUeAd-ajHd-DJ2TSzwc72ZE3HfhSPP75PXd3-cLApx0oIDTg2mqK99teFJNUkMUPCctTnJiowfrbcV7OINbCDR09L3Q99j3LDWmrNCRg3C4vBZlfynSWf9mfLf7gSnKsV76U4vok0TUGOhl9rYq-AOgYzj9gO_ZidqSJMXGRVah9ebCyNinyMPzkYluRLr9y_zX7fnsf-Qn8CvdCC6DD7pgTFw_9owBUUzdiCASM9rTVupS4vmvBYe2WqWbVqK9hJv9it8QwgBd9bJ5HbSlV8srQ5t_l8akAYxDLvv7xl9VRL47dsnf6NuQvCDw7R4VMpO1c7cD_BGsZA9Pd0ZIXmcC1RHEPOtefJXt4QiWXLD7ZlCp10JcNsNso47SYW_LQEDS2LJY3dCasyOi13pke8lzkZBx4Myeskd956HHViG4xrbhx4HiGykaFf9GlThxoAkoU4lBJBDMwmEM5mgCzUWuA8bmBZpWRxX6gaKNVNjddwC_g8Jy_mpWbM9ua-VV-jpvGq0zzfEcLqgqT0ztZRBtxxHYA4PWQpGf3qhDXjWOXfdiZ9WFMnDfRvXXAagHt40Zks8tP1yuKFT1ybWpdTkAzIEJCDMmes36P-alk07_N0VAbCcsa-KwCmFUYLkrX2-.MuNxfFAhbBvkOlJTSJbAnQ',
              cardId: 'AUS:DAL:17:2019-11-14',
              durationMinutes: 230,
              numberOfStops: 1,
              departureTime: '1520'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '08:45',
            arrivalTime: '13:00',
            duration: '4h 15m',
            stopDescription: '1 Stop, HOU',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2367',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '6963',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '09:45',
                departureTime: '12:05',
                changePlanes: true,
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..DPL2_sibANXzOSroHOijzg.ew1rHnaSASoXeKdiGU4GJin6Xp78YvuyRxrpuJJVtHl7mn9-TlP6mg5Z1B9aMKkhDIdxm6QWRk5AAW5QPBzvGg5yQk77QCCsmMmLaDiEfZC97sKqnqgM0iP9ynhd824mOdCR6sd0swb8kkvmRJvpEj0bPIKwL1SsyCvAzQCAwoBOf0fWjSlLMI4qav6AAIqBKF-KQ3QM8GyGIQZvOOYhhlO7SwhrSoLSK1ZL8kG5v3m1utHRoE3s6gBY6gw21HE7rseyZ6cQcm8byS0CoO3bFd-u5qwi5sb6kAwXvDLwf-NakkblNuODyWicVzUPWT0aKteWYTSBijGTc4x9yAuNI6O_yqFXdR5WceYRuaGgvDtDLPNlxq6gj1J3YWCELWcfm5taQhM7izflNe07-5W9sMLo96vg5x1jAilR80IEv0U3SeHsTutmlCaVV13tMpoIHc3Zqhtc4hUN2cSxSZe8ijYYRT8so9947Dxcg9jnJoAZO-pGaU8NunKw-ylipRfWTglcSDBA3ytZ3ShtIt0nonFt6iSLRxcZlQK5NZOh_0OuwcSFq5VGRETXExlHQYLMRBodXdKYgHZWnwexSC6rh5nqZ0MuDwSeQYA3RB-0xtTGlR1nZHwn5L5jSaYbnfrmxIW1NRCxsTOFnOFtVOEK_XHd1hCHe46xa74uuut1_z6XOBFKQy7rTWDxYN-kctke42mqNrFoKH06KkAlQZVS2EE1MnBvcHo6sIVF-_iu4IflARBWbEzlCY7z90avgVkiS1Th-2MwaEZ1D23Os6cexeLTsowQH6QFTkZewW9SXNwF2geMyCm2FEfJH6HR-CGJI9skqGW0a5OG24HjkT8Ccs0Az1QLgA7GqrPIBz_olIjJuobdApMS629TCq_7HubvefGuSy6R0WfvTaYdXRQDxrWbHh2Jdz6WivnXeWgs3authSV4KCerLnIJtfRFWGLGRH83yrR1hT67b0I2bFNbEGJKPqQ-Axk-z8v02spnkzVHvJFzu6LfiA1-Fc__P6PjaeD7eAn8tWY4Bq3-M04WBKxsEDSNq8ffyDpBLkHPwNgNY_PLHyFUtdv4saG9iMMYXkweTVEynavsch1Y52hoRsx5MzZ7b8c_zvB9Qr4oG0ahfFV05nt71HqmwtHJQqsiDlJyL2p8xQ2gjBbKFo3r4Q0IvWhM_2UYE6SiL1Ts6DK3kN2CXh4SeQsnOgBuqrtc.-T5yswYmKzID_NSwCQfu2w',
              cardId: 'AUS:DAL:18:2019-11-14',
              durationMinutes: 255,
              numberOfStops: 1,
              departureTime: '0845'
            },
            isNextDayArrival: false
          },
          {
            departureTime: '17:10',
            arrivalTime: '21:25',
            duration: '4h 15m',
            stopDescription: '1 Stop, MSY',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [
              {
                number: '2412',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              },
              {
                number: '1409',
                aircraftInfo: {
                  aircraftType: 'Boeing 737-700',
                  numberOfSeats: 143,
                  wifiSupported: true
                }
              }
            ],
            stops: [
              {
                arrivalTime: '18:20',
                departureTime: '19:55',
                changePlanes: true,
                airport: {
                  name: 'New Orleans',
                  state: 'LA',
                  code: 'MSY',
                  country: null
                }
              }
            ],
            _meta: {
              reaccomProductId:
                'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..diWaDJJ0TdoliPReIAs6nQ.3vA0qRr6Y1N0UdrYYQmvhF-ZKkGwhXMaUnnOxv9JodGSA_p9qVR81PFVv7wKy8CCPdE6cLU2eIYrmaRrR6AQeKfXofAHGZ_7S5c-DlNUPxcyjROcQPu8Nxttp-Dq5q7HTK5pUUu4BcR2FHhQJj5Urx9bQqGCGM7m08xHtKIoaLmcuLUnvTx2M2RwLMGug0yQiTnboE8OiNNOiQZ2BKB4-yCx7xvavu10gHgN39TqrU5rAz2k3U846fmFBMVTTv7tH_3zHSy85IJRcCf3ZN5_SeTZPO3hrSC34RgZWXjyZaErLnkMemunmU9UNkzou0UmsH5GE7dTtRNVKBVlPKkxDtu_6ZOZ8Rc_1N88lyyMHhJ-5l6kKvH7GOFlcUz09vsDCbGFpcKJgdUJaG5JMlgIrq3jNY6c4Uom4fqf1mRA93AhPCZZPcH_HHk_7Zts1Q3fabhDAODlkzH6iTfjOlDW4iAmRxmNU12fJxW4dNSn-eXYInPYYiJxcmwN2oR3GFveqLL0kV0KUMYG-FH284JRSX87OBSkP0aiy6bNkbSyD7b4UcTW73gPCdhGA_xVWSSAeuwzHOKbmaHQD8TEMmCdvErQ7GHexDmXmeHwEkbQqW3sMT_Y7ip2WUo15TkQBTXGJkKRcLBR1IgA_8uGl_5dUMo_eBQH_hjOafPpMj5d3V8bgUIYWBXCgRm4gvEvr86YmBdT0nA46c-ABl_m-MkQjzZqfi9tZcONwxy1460GQZf25m4b4of5SiYaJY58rHh_UJ4EzFGiWspnMFJSfxZDyvtpQ-QOMto8adkQUL5yFexOtyMIFxY9OyvpnC28cG4OoHX3pn4O4BsFCRNWkPcSYmKWK9pzRK_YlAhilR0Mwv70s2U10qeXDH-Iu1CCBCFRcdkD38OLZ7HdCV42AckCaxT-_wOX7940oeHYqWnAHyWWlGV6g5rQA4DelO23TcaPnXIEm_iVwjA7pHWoFAte3-5oy7UJwE_FYQ8I4hFLiWT-epKgYxc8l9Cp-alodzD95HeeDHOkAkaChDrmu_JrbgyEm9j8-OIYYkoyOsTMFVtlkLfWhkM645Z4p7Ki4Bz8ykpEsM0rrr--x9jEE9L0dDncK2Xy6hd6lUk8plwCqXSLzgjXlwx9b2VtyDFyWLg1rl-auZUm4-9vabQLpsJaY8T02Wx4j7p10R-g8INBNQU0boXu8jLjy4oTDBVF85tm.7YNexNOJgwIM7uxPZ4Spaw',
              cardId: 'AUS:DAL:19:2019-11-14',
              durationMinutes: 255,
              numberOfStops: 1,
              departureTime: '1710'
            },
            isNextDayArrival: false
          }
        ]
      },
      _links: {
        reaccomConfirmationPage: {
          href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
          method: 'PUT',
          body: {
            shareDataToken:
              'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..GfUrvvG8tHFHujvBjl9Jjg.-cpr3wK_Bl-fPVkHbasivZ0n-y4xX9EJWxsNZpOLQGN2kLPwqBmNm1lnfZ6GfmCw1GdoWhutiRODpUu-KTrGCnhFYKmU6L_a8Q7NGHG0YPQL_yuKiNUhKJkMjUg5bN_4PGwzctPsC8t-lMovzQgSRjjFMKvv78jiojNMYlGPL0Gbzt_FIvm4sSMaFjYavSYIKrm_6CiJuRR3O4dYKs5vQH0PuXY6-RF6fpcHCuwZZ4KxV7MJCtpw1s9aJB9oeFB4d9W4Pv0NIxR89ZvJNP8Nh1WdW8DBQoLmkXMBLGuTQZj5hi7y5RcpC0Y34CUjQA-_ugaPQ9oEqTLXr-j9y6oMYRPjscFe4T5bD6hLaEDE17l8vVmVlkxj0whtHOUAKxlLVlSMLDqYpmLnBWZgYv0i9qvRBEzWouOFMQo5F4akitSPRlffLAIqoydlR2xyLLaKwhur8Y8ade6ONLkIY5c3UAXvsYWa3zq6LeAXZuEXewhunr1K6IVuBbVG4GYON0Gh_E_d7UF4y7sXvaRHRZ1vpLRkr1fMeN-wUOpUbS2xM3nZN0eaTLhinHcLzNPy6383ubm-nl54xpUYxquaqakPubWGCfojmdqifUvxj45ZtZKNvLv1N2udHg4L6QyKPmHbiPMXTDz1Qw5frNJcwHBZYfJyf0NolCFdM16KOoaJiX8F-3I16oj5qnPH_GSxfeYZaRTQiEc3byKpyezHu2KzJ40s-TN3FKuAUvor6I8-P6txal3k8VQtg2uWDDMmzJ0ZRWwNUhbYUuwD8FEhXeP5z8C9muea3IeY6zu6dNvoju-WXdMG02rzT8dnKkDef9-U65wvkZY72uSP9bfrD3iy03LeRV2XKWscVdaAQ-cdc7MUyrrb7gTlEzaJ2ZlC625cyDCEuMA_UfnmianIs_N7PobPBpzbcS6pQFo0fmssk-XaJdqFgDIgYdgONOXTdX8_KAqh2ScC6crR18l57U95mSxG72PB40XEAuC3xJMvmu22dWrFmObQTdv6uRtDClulEmupQnA7XoV1PkHJ6DwXXEkb3Yo_zqLmDVqhEQ36-TlBwBaXj1MDSoVxnDx70JjFbfwkuVUu_Cn315xzbKKplSD9jwJI1uIXn-NMBFnpk6APUIpZRGhxfHhtvgdqRprir4EKe952Ek51fuV2eTUgaND1KcEpsht_BhitXCm0TzoSS47uH7GMNzXhyL9axA7IVkBF_7ZKYFNkJA4HDrU6T4CvhgUt5DOoN4ReGc5m2nzUKwu4glkg_xrFdh2IYft-Lmc684MWfkinWHdUyH3zLqryOWNzdTh-30hMehHXTIkob-B2rbpB71ycSoFhzoy4htS72T6YHK4ttKnNJoNssGa_NQ2OkY5-wSbp8FBGZajcAK41K_xsMzR2mSQT3y3U1BcvjMvNEAj_OBStEaVn96lVeIXAdBag7xGdeVYAy1Wu-24hF3XirjEnOuEvdnBPjPXUCGWIok6BxWX0Jl1hDkE9rnWjkLcfDyLdXObyhMGrnfPEd7eRm9nHW1lmzaUoqg-U09NH_3yhi1CngA1ie5_5XdWtZ2WyyHe2FKVa1ut7c0R_M434n7NjhKtMP_nuVgW3kdSZMeUTSDAyGCSfcUHOrjZmQGSXB8d9DDFblTJbZHTNJSzVzmjySJ8PuiLGJXthDqd_eYQCuiZ6x4DfcyuZPSgvoLxgI99c05ck4ScFDAPmVrFq8NS1VhdRlS5e1j74hnBfTrf4TDeHJyEIFBYSkywQ2MDv2ttoGoqbi_pSuiVSYTo-vSWJQVYontsMKu1s4-VsFwKh6Pee1yg2WgnqyAO0aiGNEnpwsFZxCy8rFChyAPZLFo2Se_fHyWg2xwjmgxvoQKqAmGuuCfF1LBPZHNkF0BudE24LdVPm1DAJDiYN0_viM0Gf6HKzZv1OoWFOicIfKoaBBRdVQXj46iB6SJVNPxAC4EUoXjCInwILVn0uHBswjuk183c36KROlfjqm-5et_pNDIvm4LVMa7U7gCep1ccj7IvdD8f0xMEiGotJYYjDmoPS745m0PSb2bT1OuFr_yOIii-cZ6B4gH1RNnB-_5wZfqvTk9uyGucLt6XDNCdBfieKAfQh4lwn.dvnJlHFMoG5G1ntQSCc9Rw',
            reaccomProductIds: {
              inbound: null,
              outbound: null
            }
          }
        }
      },
      _meta: {
        isCheckedIn: false
      }
    },
    tripSummaryMessage: [
      {
        key: 'REACCOM_TRIP_SUMMARY_COMBO',
        header: null,
        body: "Your trip has been modified. Please tap 'Confirm Change' to complete the update of your reservation. \n \n This eligible change at no additional cost may only be used once. Please double check everything before continuing.",
        icon: null,
        textColor: 'DEFAULT'
      }
    ]
  }
};
