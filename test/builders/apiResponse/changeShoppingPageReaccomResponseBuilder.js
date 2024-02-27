class ChangeShoppingPageReaccomResponseBuilder {
  response;

  constructor() {
    this.response = {
      currentReservation: {
        outbound: {
          stopDescription: '1 Stop, STL',
          shortStopDescription: '1 Stop',
          stopCity: 'STL',
          boundType: 'DEPARTING',
          departureDate: '2020-09-24',
          flights: [{
            number: '1876',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }, {
            number: '2288',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }],
          departureTime: '12:35',
          departureAirport: {
            name: 'Austin',
            state: 'TX',
            code: 'AUS',
            country: null
          },
          arrivalTime: '18:45',
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          passengerCount: '1 Passenger',
          stops: [{
            arrivalTime: '14:35',
            departureTime: '16:10',
            changePlanes: true,
            airport: {
              name: 'St. Louis',
              state: 'MO',
              code: 'STL',
              country: null
            }
          }],
          travelTime: '5h 10m',
          isNextDayArrival: false
        },
        inbound: null
      },
      flights: {
        outboundPage: {
          messages: null,
          header: {
            airportInfo: 'AUS - ATL',
            selectedDate: '2020-09-24',
            originAirport: 'AUS',
            destinationAirport: 'ATL'
          },
          boundType: 'DEPARTING',
          passengerCount: '1 Passenger',
          departureAirport: {
            name: 'Austin',
            state: 'TX',
            code: 'AUS',
            country: null
          },
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          shoppingDates: {
            beginShoppingDate: '2020-09-24',
            endShoppingDate: '2020-10-10'
          },
          cards: [{
            departureTime: '07:30',
            arrivalTime: '08:45',
            duration: '2h 15m',
            stopDescription: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            stopCity: null,
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '4583',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KyTi8pBXChsRLMQMe9j_5A.njN5b4YfWHH5ueJBbUxwm41mowFcv5Vy2HznZFQK6yGME26ugfhzHC4kn8Qr9bSLjdisevLCM8vuVOocjGksAvsAsb2OT7zG9rY1BQ8674DHFl4oY097F67QF9CQaa0VfNUzTysQDW3fjpGnmB7B9YdO0RJwbNUW-ky6V5UXZyG_zjz3Sa2tobJoPCNemIz6hzN4iOb65g2jNmwvr5pnUZmQfb0meQR8_7WP9sBQ0UXx5GaBZGAIzj4l2MkQ96pCoj5INllckIiFpZfc7ITQJJmuzvi-8pA7hd4W8j5YwhPP8KrF8Iss9J0mnp9YdfC4i9LF0UkEgtrU5WM61mfJLLN84LOgKBxX7nxfNvlCrZ5aajSaSjipiGmFf-s-mT64-Ql1WvbCYT3aQa2WdTXG8m-tUpkV5_UFkF8TFPDbFuIriZqdG7B09-v8-13qK4esjAS-e1CvN7RyuWbafVMoVhzqOZL6ntfQBjJe9HV1jhmvJF7MEMmqUiw4zWPPo-2TqWZT0d8lKgMBXajJ7O81W8qB2gI0erkXp4b0MC1O9RU834GmSeIk7HvIbet6WS1G6EmpjxDNIZUnbLdLrTpvbLI1cqCbPDvFux1Z8Mm6aptVIhUm9I2aQugI3nRs_tzd6zG7qm9KfQiqaohqDPhBDn2uoirYNpq35dPvUks4pIQK5OyQ2BJ_oQ_Hmj0S1zio_NPcKVT7sTo3levhhHJgn-Q9mPPj_W0rXsfM1MZw8wkVgIc_v1QnT1b0KD7y3eL3babEhCovOvRhcBzXLcESYIkkLNyIgF_ww-mo6a048rxxIR_J8CL0nctMHBcddV2Aw6WehFTOr3aep9MmfhC6ZScCO_NnHVbw_WVcamymZ_s.PCy_vjP2Jij3tOWnSoT0xQ',
              cardId: 'AUS:ATL:0:2020-09-24',
              durationMinutes: 135,
              numberOfStops: 0,
              departureTime: '0730'
            },
            isNextDayArrival: false
          }, {
            departureTime: '10:35',
            arrivalTime: '11:55',
            duration: '2h 20m',
            stopDescription: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            stopCity: null,
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '5664',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..O4qkOXSA-gmbPjdMQymghQ.pD1PmxdniQH6qT6GUnd811-SkLInLpW-7-HqoKaBvmHDa3Tj8T6veCpHm-CX29TzSFYvtQE1cWk1vcCHQd7K2l-v8-grjAgbg_kgSmw8cd0B57nV3tPKvZ31R0zkDMzZAMM4AwoVd9Deffb6tOu3UYkCRp-B7tYxU8ZnCSNFg3erXDIkUNmqejm9B6ohCS0SMLmMnOPSCYHUiEV5QXhwwKQEh8tqZYHbfPOPdrOPTjNaP-NYFRv5BPfzVjfBH0oY-twckyOq5XhJiaY4eIzVmQineKQDCUMximAiqcwOieLCD3qK4MaYlwA4Y8lEe81UCxrUqN5BLiWQvavePbhffhEUqB-Bbea7kUmMbgBy1l-UiCwKIAwVYOntVBqx_BT5yEAt_leG6w4gjUyxMfUboijSzIP79ckt2sQv8_xcvHDckiOc_4vPG88G9Mn_7h9tFyy4NygXBOwEBGfVaGw2y-Cd1GpB20WZZlId9nPstynYTcf2qrVxlkRZWyOUVV8VYW3o2FNwGew0NG_cLof2qZvSQe8_LGIpxIbxdsn_E1CWxWWqqwNISr-8jMcVcENS1B98UGseWyeDSTPL-TDv6BpgLMoECYcUpqR9f6MiZUaDeK9QY488FICal0-zzuXq-KAXToxFTrpjoMKT7XoaUL1O5BHrOGVao3MCy1SqErtgSG8SCU-Hknk2H3jf-j7ejwvKNJeQq5f00_K87sgwKLjW5mPrcQAhKE8VJogMSfySYLyRjp_E-FKGt6o1nw6xCI43wcvIM4vMwaM7rnThLDjBY8vqeH71Ik1v8kgorM6lLEEZWXzySRiM2goVXbEjlYwDBk8jxDRm4Mptm3j-SVeXW2f80f2suWngl13l3y8._FOhHBVPG2pdNsCzF4omVQ',
              cardId: 'AUS:ATL:1:2020-09-24',
              durationMinutes: 140,
              numberOfStops: 0,
              departureTime: '1035'
            },
            isNextDayArrival: false
          }, {
            departureTime: '15:15',
            arrivalTime: '16:35',
            duration: '2h 20m',
            stopDescription: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            stopCity: null,
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '4094',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..0VsI7dRYHmp8tmeU50J94Q.bCbV1jOjRJBAQwAj7zocvRhsdEGimV6E3R2UusBa1kTIC41OjJ18av1inCxoB41BjL8_ATu7fzmWg9duHiut2ExBtfY58NThD8ufQkKHlGkeAGwMpXsh6KWJFCO7p872hYJtFO0hbqBQY_2sceilm2VGjwNsObCWTJR_2ViwjdRUFjkkcFxqSgb-8UUfhXiwjGf2fc5lIMsdLLKaxFbgkK4Vu0bo-p059M4-zy4StUiE4nvR1wg5dAQPDdbkFp7rnY7usDPB1RW7WAuLB2C6BMTonrcgiVvj9Ut3b88lRDUtmk87tuTaH_N22PS7Uk1EU1RCBdt6f9_RTOiakEYquFaVSuzPqkACpg19NRqd4dm-lQ5Hs4ExzW0pyq6UVOLrBN0ygLy8mb_0kpcDugeCSpsSxm1Qq3dp_sPHPn6trcf0DYexFmidDnnjmmYMBNNDtsw0OnDwSWYwwcklt0zbffEhUPEu-UinxoTyxtvokjbO9MMb0NF1JdlJuivCpERZdZHc5QPI4u6I9AwPFITy_CzDysCgMDc5dBhKm0gNpbABaiwcTgM7HbFBXaQN2AiJmkQrU081HVlcFLPRmMEZP-WCw7zmPYgC_Oav9C9Uzcxly8A4rp7wMMLivf8AEd19nuMcECT3YHXTIdmA15TvsgHZioug34_TZehAhsLEde2rhXwLBbi5rzNHjWkb34pQzVd1HaPIce48zjr1xkV-VlkKzZfO3K2ugOP48dwrev5Ef9DUaTkBkvmuYEmsoYlTOExns6fjiup3-0lBjQrKWJT6kwlNwuEiU-qscnbsvSpw5TFADdvnyiF78TrCTEWT1n3BkpJw3Sy2CtdX70gqsgafQMGbFd781SUE0KDkKg4.cfQoDv70me3YGw1yditvgw',
              cardId: 'AUS:ATL:2:2020-09-24',
              durationMinutes: 140,
              numberOfStops: 0,
              departureTime: '1515'
            },
            isNextDayArrival: false
          }, {
            departureTime: '19:50',
            arrivalTime: '21:10',
            duration: '2h 20m',
            stopDescription: 'Nonstop',
            shortStopDescription: 'Nonstop',
            stopDescriptionOnSelect: 'Nonstop',
            stopCity: null,
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '3519',
              aircraftInfo: {
                aircraftType: 'Boeing 737 MAX8',
                numberOfSeats: 175,
                wifiSupported: true
              }
            }],
            stops: [],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MQQP3zjLUx80ltWn1FxwtA.Yy_zoEjbKvjs0f7thhbhAaIPYqEGrFr6SEMHI-x9MvqryWq_6G90drXnX2sEYm4CJS6DjSR8VBt7XRsdArCkbPbXu_OsVde870CBcHpE7IYf8l2OQ-NJoOlqojzbwPZ8d-4_Ule_qFM5OLyrkVt5W5F9iMu5PHlF-dNQqPI_viHleE1VioBpMprMj8rS5ryt88o0rZT414pWjXLnR0nTRmmC9hFxSiYT4fEM--tz67vOedFNc0JP5sZJJJo-RFkN9yPtqDzJF9tBQGQYC-EkeJ__GEf1rplhMxWIeLOOoGxCoTwksgTmVCBiUEcvj2UhBuqHq4wdL5SPMFhfghhzj8w1KMb510_pp1etMYJu6QfDZ9ZKVEdFKtmFtjcGwt6FPmYnUHQZeR3c9e7dKOOjrqvcKya-xAqVDREN3eX6g3dDNlGY48_ua9oNT65NWfHfqsnZagdJlhwj0AlnFGM0ALSM-GwDGHb8AlhhT-cTue09KahBOkfEXHRmif-ss-ifFZkPAaNDH6z332uVECougO8VWMPtgsgI_nHKj18ERZU4vxCpcNQALCoI81HcVHVp4utPXSKgtnnyhmWHMECWQd4SnLFB6AqN0TZDivGBjbhnpKJ30iAQnj4xjCHmqmVdM43UE628ltmP3uXYjxOn1GyLZnUzpj95lgSzsf6uoY4WOKcTHdU8vN7E46VYc9CrGbqDb1Ou39phNjTKlj1AdZl2oIlYIXMqueSVhrInbasfDGzLwd1tyrPVCVgI2RkUQjl4-k2Ui_1UQNZEiqx9rGRsfUcw-VpbVVJe43fDvSDaJ4WwCXL0Mb23KabjvJikZrk0VZyCTcxM6eeB4jdnCbjMzGzKJJtnebn_T7nrg5Y.DsIPFr4bI0LbQEAdaxKAhA',
              cardId: 'AUS:ATL:3:2020-09-24',
              durationMinutes: 140,
              numberOfStops: 0,
              departureTime: '1950'
            },
            isNextDayArrival: false
          }, {
            departureTime: '12:00',
            arrivalTime: '22:10',
            duration: '8h 10m',
            stopDescription: '2 Stop, DEN, HOU',
            shortStopDescription: '2 Stop',
            stopDescriptionOnSelect: '2 Stop, Change planes DEN, HOU',
            stopCity: 'DEN, HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '2385',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            },
            {
              number: '1271',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            },
            {
              number: '4051',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '13:55',
              departureTime: '14:40',
              changePlanes: true,
              airport: {
                name: 'Denver',
                state: 'CO',
                code: 'DEN',
                country: null,
                isOvernight: false,
                isNextDayArrival: false
              }
            },
            {
              arrivalTime: '18:05',
              departureTime: '18:55',
              changePlanes: true,
              airport: {
                name: 'Houston (Hobby)',
                state: 'TX',
                code: 'HOU',
                country: null,
                isOvernight: false,
                isNextDayArrival: false
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..LQyDvb9cSo1CctUPn68V1w.pXsy2zdNBkLlciIu3ZKYbVJksFYXxy1g2BmyJQAjvfLYHsfEaekcz8FJsrrh6eMITtkjO3_o3kiJi-n7PmSngk3EJzSjVJDxwXIA3SCBam18wO8MkVYp4Ort4oa99bjY2CUPztIGeSlHnBlKrziVbnNWVDqAf5KxkdMY3ZgHp2sXDi6Om65LnOyY0RjCrwtBs4Kx17waoo1fFnRa3AUmdtqKUm-YKRjpW66OrILSo4auCpAXiOyOzS3gY66SJcVvahtE4AQ8TsZGbS50oJMH5BOEGKtJyMtL1ErJHjpndmBNXL65ToLn3ioIUtjd0qsXaL3TAn11GkwrvAvAWrMo6-zYQhfkSE-slBctQNNjOnqDWlCw7d_gJJ7KoELdqaky2_IogW5w2AeAcblo1booDk3Zkp7Lc4BOAOeHWiHiTuS_xUPyJDm1r8wTC21yNb_WDVpVkKgVV4j9Nj216CjXLeIlFSnYsIquV7a9JZk_2Hm4vE9wE6A7idD5IfIsnUvzayPClXBCB32swSnFEGOJR1uJvDZrSwimJqs0yrla2nIzXR_ZZuk4lprRib5g0Vq25ReSztORGHNmBhoSGYb3eHkUeMSb2ocupDt1C-MQjiwybOaVFS5-iqUJnyegvs7M_z4209NQGJXEY494liMpNPLNNQascxvRHn6Pd3FvKE4EAVfKiFwey6heW_p08D3ZtJIo0pr5tju6OZJ0DsWcDOeDAEmjwleFWHPhWYq4cupOLx4qbRGLnYOt3Zl7uXdVGo4KdIRDCs1Wbgp2XqvlV16DKAuLegAj79dOe5Z7MemOnv6IB1Z9nJMgVZ4_lcw2Xh_xdrBPXjGVcXZ5LniJvlQDsdumaqC7D4su9mPCyVjec-HmLV7mp7duV7mwsCr939mOcGG78bMm-m2IcwuEKj0v2irhnjoHp0P-pY_gH0uartstZdbdzNA_KJVpNx6Kv7C73eoqUuZNs8LMLmi2K4OUY0QvmBfyfHiBHSsbfuSZ8LJ2bNLPtTq7-XxYxRD8z7msN1EoRCg4bP-t1HAFiNEfpQzouEoJsxgipUzq0UMJl_hvNdqUwIJM4n0hdKLCQvNuksY35dfEPca-p03vEJBjZHISIwrZCq0xlq4Ap41HofL-wN8hfRKTRtjcqnHcrBqj5TIJgQNcrxNu_LzJn0b4w7D1WoOhHryNKUIvha_eDeXvB74u75-NfufYNoLXsz4HzU1lZpOxUe5SSq8b85HLST0yV_zHq9aoXfvAnLI7nlhE_OvOC0rDxHng2kFwDXDwq6-Kl6hWssPdQnQMq-1Aw0e2Cvy16Sld8bGgOqWXGN63DFXYL-_6nCF8s_-_e5nwNWHTGahm1DNDyW3_rp9chLBs3LnaLXIY41YAFPraqHHJoScLCBkOR2tjd38KaneqxtAMnvrqC05yQpdIrFQYZUi-jQODR0NBDP3h3isClDJ8wL3xeFWzWpvxbeZD3yxFzRGx0xiaYBfv3UTBpaDITzdi5mPbPU9_B6agOV0_Qk0Y4ILT4x6fKa1XkuhhB2hZqb0fRo6M1CX582x53lBvysfyL0g4O4bR8HxmSQo.7awAnVQWLDzFZjRq1DriZQ',
              cardId: 'BOI:SAV:0:2023-09-29',
              durationMinutes: 490,
              numberOfStops: 2,
              departureTime: '1200'
            },
            isNextDayArrival: false,
            isOvernight: false
          }, {
            departureTime: '11:50',
            arrivalTime: '14:35',
            duration: '3h 45m',
            stopDescription: '1 Stop',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, No plane change',
            stopCity: null,
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '4837',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '12:55',
              departureTime: '13:35',
              changePlanes: false,
              airport: {
                name: 'Dallas (Love Field)',
                state: 'TX',
                code: 'DAL',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..-uOsrfXaOofdyTUG1Up4Fg.G9eMxGc410dTzERWxfHilTSSh_a04P1bXu4JgAmvHMEqLPLHzuDhGd6JIIN2vCBFO24mRPsUYqFF8IwEucUAAe0Lt_cpRJzQrmPOgzXQ4arNaYrMFxVWpW2nukYbsxwGOxUXKA0wJ5IFrMLzygKypKoZsOllWSheTDq71XJjBeHIA_uvTx3d7Y_ooKuHmqPppbXpUtZF9gJ0fUIClxzi9F4SOHnFo8ba1HVQx-SB97FCWh5sCNpaSmLkxu9nFKlH7qDy1XsVL_QJ-Cf5Khcy4gXJs3RHoJ5h65hbjSZUUA1YVY2MmMF3syL_92a0vzJ-7HN_b5cNnxO7XyWy-kbmqvD1dyWTxK75DzWkoc9VabHHF1F6VQxE1pPK-2eT6Tk5p8vBXwnS2PC3ol9zodgklbCoYzfevfjWikvQXtW979zhvVFv1p9FDaNao1nNIuKPV3NPGtPavhlzMrsVPow78iO8Q9g_cu5uEBzq1uDP7urJWGCY6s44-UTOHhI6jUwuPHQjB5fya9C9dGlb-cfdPLBM1pTgmxNRgndbM-SSkj8tcmljVsatsbF3tDls60SYVHoRt9i9dc2dydE-DxpNWX1vXPgXdc6w1hyNXh61QBIqtB0kaj0s8ZHYYj5BIj9zItt_WMshtEe4e6LjGpa7OAibOeVsspV7A3F0yTYec8hrDg53_e-oYgKx5VsY9yZkVAqtgM3pBSNnU3E2gWAaylEZOUtcVbi8N5EGj8GiF1KZ2TBTPFRss4IJSYPY_R6sPKqadc2CiTZ_rlAtMMzOmL6spzDrpDCfGMEOWLiP2xnuzk0l9Wy7PGF_nqyH3ehtL760vpfCnmFvtnEZpk7S13i6WaxpLfaSoPmFYo17nys.pgdA6ax9qO10UsVkuvKz0A',
              cardId: 'AUS:ATL:4:2020-09-24',
              durationMinutes: 225,
              numberOfStops: 2,
              departureTime: '1150'
            },
            isNextDayArrival: false
          }, {
            departureTime: '16:15',
            arrivalTime: '21:20',
            duration: '6h 5m',
            stopDescription: '1 Stop',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, No plane change',
            stopCity: null,
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '4303',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '17:25',
              departureTime: '18:05',
              changePlanes: false,
              airport: {
                name: 'Denver',
                state: 'CO',
                code: 'DEN',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..f7hlfZwhw9q-cWPG2Pxx6g.VOupZY9hrTT0an0CMYwTPZb0lAwzJn5Eyvu-hTaGADopq48ueYqnK9tL9Au6rqYTu5qCHB82ej3Rrdu05gC7TWFsZ3DTGpdvmigG3x5QVIitEdSDCVzB7XU4viy8ECOw_NnE0MkChxeuiM4mXm-yb8vy-uxYEFBl8OXw_WE8tE-w2wqganjEDaP8bCr5l_P_TnOJV4WRVuCX_hJWcXiybXsqOpkIq_x999MvMC2MbQ_9tuiDritfRIKX-DdEC1Y43oACg5zHgfwfUzzt8Rcgz3H1ev3Z9iCCyRS52zRry83GGLAfwKWBj6whKFrEcsuEbufFnvCECGMiU0SamnF2bkYEnBKOq-sfimy-alXsdZJoarHdy8kysRyDLvkZmM-V9nqJ6GZ6Z5yc_6RUVVZzrizMqT6OAxKwtySp_bJpnhj_mxzvuytJN50QPP0_lvL89X5Z9mNsJ1BwReIDxecI1RRknh0CreS7rxhg-V5qSsnzjvShe1rSodB_Q-D8tguPbjLCdYq7zsAnnbFhiXXFLHt1O_9LrzyocV7l3cVREjWoBwMDjVcOjn4sMFCGkXNIZbDYxUlDhXBMdkwMLqkSm9rstBmnOJDmkCbeX9nl5DRkUPMzkoreg-_-F0JFdRounfq99oAImXXlj6J5k_eNn71MjGzmGgUwOFPp1b4GL6S2yFlVBdi239Aa6rro0eIKctYd1YNBYWfNbZ270Xy5T_6b6fqh-DUulQBYCx4Azi5czVPhIXTy0vHTyuqS215pKy9Jp8BhxmZR6wFJyJRlvAd4RIVqkCO58AgDRWlQ7_srzQLO9pDGQioIBDs6QCXv3tR_q7IJ0aE77YoNuA_Zozo4zIWBz2rkS2k2aogDv2c.ouHaXoQHLMe9krsWnTV-RA',
              cardId: 'AUS:ATL:5:2020-09-24',
              durationMinutes: 365,
              numberOfStops: 1,
              departureTime: '1615'
            },
            isNextDayArrival: false
          }, {
            departureTime: '19:45',
            arrivalTime: '22:20',
            duration: '3h 35m',
            stopDescription: '1 Stop, MSY',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            stopCity: 'MSY',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '4106',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '3357',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '20:15',
              departureTime: '20:55',
              changePlanes: true,
              airport: {
                name: 'New Orleans',
                state: 'LA',
                code: 'MSY',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..rlzEUKxMzdQgQ17FWeDtKg.i4VR-lVBwh6trhiqr_9vr2i3dWfB_vV7-HJF3Fth5uAjYvyXBoaZLhk60xZjuIIWjI3trmapSn3c7YrM8l1bmMEEiiOCfsTIHw8VeC4Wd7WRbd8beiJK6jVHnyCINYYdlmtL4RPjEuZhR3hBRXeoEpMqTEuBtNAKTULRYY3MjTyLgrPEszQERNfk3z_6GQcz8WkSDogpxB3szDf8jLHF_KIunrIW0OUYRPEbMnD2tf_DBAZPzaxtWEe6LxOhNj4GeZYtOtl1vPaXUSdk518ZXXBpvM64x50R1_JuASZSkFFAxWh3VHXZqrNXwYrSjaXVqdnWBo_bZnbjSRwyLPFIMwcJ9q4C7EAQcUCWxqKPQ66ta-Sfly4oRGZSf092QD_C9--UDTuypI2XXi71cG-1tJwq_nxYrd8gfHwihqla69cAvkYe8xbC8AM6iEiWGdnm7-6qFywjcNUDOS6FypEJ-CBaHDFccy_zHb-RorgULrwXaOa-pYyEMTLclrVWaL8IMz3LPWWlSORO-XzW6mLz_EmMvFJsVH5KEbYKr_z0ra1zXhxfZSvYRqgj2iOqzNQUoa6YQhI07QjgYt3YVSVlC6PL814CtWJGD8eHZ5D8s1OkcVJC9nFdUrBKEtosIB73_wUWex-usnieVoiGjXvV3qdBABkpgOkVv5WKSgNRkZK9BE4sDjs5KR9H8pR6XZA0j9NC8aUHur37qxdTdNHUCC2uqqKhg59xZZxufpHLNmeJOaggyJYNSpeeRfHW2FIZsgIlXa6Gw3le3E62Y5lt48jltYsXn_qC4riJ2pu4Bm6N16_wjL5Jr5m9KPqxi8yTJI0USZUhy8g5s9XxmCzck5P5bJANszLhnm9N2Pc8_tASADGcm0Gol1f-rziivLWoqnEqIsS9rgKsje9K0hGJro7AeU4x7imopvYDomZyzgKdcZqv3ZQP9umFaND5QJgYqaF3tze-7e0sbaip7ag4G6_wG6y5lTuILBs8s57xIG_WhNioWzNY_LANNxNagIy_WjqWFpLgs2Se2NR008l9NBAYQPUa0JEPSiqLw6pLmUldVxOGgDiKKnQqBtFMMj3k0ISWIh45BZrFRt3kprK3O_jBjikYVXRd42X18XCOOWRpFKkJCU8u0PlhmgwPFjEtULm36IEmkxMHXJwD2g0wrmEm4isbt3av87emCXG1FlPI-MGJJJscjl8THRROn0L4.MUUWuG0iGfc5F0byglaDiw',
              cardId: 'AUS:ATL:6:2020-09-24',
              durationMinutes: 215,
              numberOfStops: 1,
              departureTime: '1945'
            },
            isNextDayArrival: false
          }, {
            departureTime: '17:55',
            arrivalTime: '20:35',
            duration: '3h 40m',
            stopDescription: '1 Stop, HOU',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            stopCity: 'HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '4270',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '3704',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '19:05',
              departureTime: '19:45',
              changePlanes: true,
              airport: {
                name: 'Houston (Hobby)',
                state: 'TX',
                code: 'HOU',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..k8A4HNI_K1XuTPwTpShN5g.MmZhSRW6eiauNONo1gpWg9_EYSMNQnvlnWDi0bYYPRubAJgfr15EMrMMLXiL7djrA118LFDl4Rx1jAuz2U4srJzVUYoUKQUx5B76mJJ44BMAdR8N0cKoKK9EhJ7shDVLcuVKQZv44jgxQ7G6F89vOy5WUyInUa1oKOm8S2m6l0Bc9PnZELmt5LcPwc8F7dqBVMbRrXwXTG8QOVPfluKM30GtLS7zRa0xTnGkDaLrhyNV7n6NvdEYvlvZoG7ZshlfHcxJ0IhaHynSZw3PBLHVH0MrueZWKYrsyMKybOzSwKb5gcRpWKNEIPdBSn_k6TE1Ia524iCVtw2FJ9Pd_s-S95Wyl2lKhI_xfuQk_zmmcRtvJw8GFKhgJ-7CJNDw6y-T5kzBE4lgZZzg2S1D1zLWDk6BqgsDb-3ao9Ogt0P0KUfn7-ky3AAkWUoxMxIlurZBx6GmurI1Ud6Kd5GBovmOgZtxynJ7xIV1Zedfo1SJ6UQ7CtmmbLpr6XXpabbiR3nOtVOowk8OS-7nPtugTnpv3L-16JIefsL2DCz0pEFDauGuhGUgY9c1KkUhYA5-twHlbdBZoAtKzyNR3fYY1UjXLScE5aSkWS5gabuupMZwBnC7eGvfd3oc8s1e7nzs6S1tRNcfQlawen8vgdLRbVIIFIwp29ydeXEgwIS8osoz9hT3PEkRBOL1hpM5-5qle89Ka5rkXraUUPPAYvKjApTIVNxlpONS_6PUGHLOO6XDGEhMRNteqP-yt06YfCE0ok01w56LpDvUKl23mjeaKlbg394kO13HFQ1OPdOWxXas6CmYMACwFNNQOFCKUcnCVn6E2VhoTY6gGweUqdDnEDmoE4921Ir-BHecGyYIHhHJyRUdaOWc96R0pP3lvo6HBBsHICYHerGUKE8LCQ0tFulOj_y6hItL_LV71n1ihYYbLnIcdilj1j2Jcg7D2hZ1pTBz1o8C2Nqdcg2R4z9uFH6q2gJVkuBosWzZEHe2OTCd8NxQgtkEwqAvmCoC2QS9Wn5wtFITkkfY38oXtB7wX0Y8xMfWBq0aWk1UouEW84K_Ey3CHN95zkFAkv9EtgNS_FQbsnWR4r-Fd91XY-OPGD4eH1oosrkAD3OnDVwanGQiBeJA2h_hmT7-40cwoMetFu0iIQ1hs8MGAV7vXF6nsmbK2SttXbjLMkiCbNo2JRyMal5hOKHiN3ZmixOJ01t65xEQ.Zibk3oMMawwKVniblj9-3g',
              cardId: 'AUS:ATL:7:2020-09-24',
              durationMinutes: 220,
              numberOfStops: 1,
              departureTime: '1755'
            },
            isNextDayArrival: false
          }, {
            departureTime: '08:30',
            arrivalTime: '11:20',
            duration: '3h 50m',
            stopDescription: '1 Stop, HOU',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            stopCity: 'HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '3418',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '2942',
              aircraftInfo: {
                aircraftType: 'Boeing 737-800',
                numberOfSeats: 175,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '09:40',
              departureTime: '10:30',
              changePlanes: true,
              airport: {
                name: 'Houston (Hobby)',
                state: 'TX',
                code: 'HOU',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..K5AgTnNYq5Nw5zIIAgJa7A.9DbZIH9_e3ow0mUvPMCXRyAkbrSnEaHv1KVOgh88E8IXj_HeMi3jlkGlJ4RYz0ac1E7VWF9n-Y9lBap95x21Q1Bq4jcdHRw2XECLPkPiPDtYHT7QraQOm56ofJ6OmhXR7Go67CMpF1DgJqKJFtJDsNv7jS5Q6kEK-HPE8qQAmig4McrhPs7vAP7kMEutwuqos8v1AIBEQPoXR8z5XPkZ7Pz8lnu04iVOvyER9FrjNmoEq2YGl87aAKnS-NQ1sUqjcY7LJG9QJC_7BjkE9-o3oGahlfDK6xLDYWPZlo5R8rrrJZzSsu4Q7CDsaSTbXaNvHZAV1pDakpjsPyijVcTAruu7bFF13Sn9biFr4elxMSEPNI41-yvpvmQBVTpoIEDB6WJ6ASZwVPbP44Ei5WndAF9dc6yKVoZf50VcVvXETbHksGXr6VxMe41MLxzWoWTh-TKnUOk_bjSKJghGtAuhG0GaEFcWXcL3NWTGz4N617OEY221QQwKtWk9rp11p4RByPDmNxmNRISZg-B67Opg1vqAqAKcd-WZJhDTY2JN5ja4ripQ0q0gToyIs4kc3nbqRwrngDidb2tgoOU8rWdVwNcc2qnluWGRLU2vcSL4e5PCOoA2Tq5eFnNlLQ6diWBLytxwlyP6Pt6eSHK0Psxx3HdU3Kedn3-zOdEaVEVtRQpOyGaldYCw-ylj-hI-hFAlod2TazPbD131Nhd6gsSzEQG_E7n51NL_X6vGOOThR63V0UeUN-v8unD26ALm0Wv1VfSeuSseBWUuZIUDn3BByK_InGfotr28gNC930C5rWU91AqngbAeqeMcOq96ADR1GDZS8eV_h7tnSsLM80zN_WHwHQOeoMucUMSv14B0E3i6j14keu3J0vdHo39xnpF2IDonf8_DSr9pujA9a9xBb17RoZU_Y7BVrZwDlFThrwBgByXa8mQ0XiO2GVmI313pe0Vwl5pHmaDClM1uRIAY9HjQTHwnkt_0J4hCh1MGcuRoVtCLEqNS0v9IrjuVJvG8eUaUOSNkFQtFRW52_BrX9DBBLHfeBxj1PaSogWB3ElQ-PcxQgUynFA3AxGM72VdwgzMhY76Z75Xcj3e0bt2us9TdActbN31U4XyWZj4ZCB21CxCUsMvM8YYrDR2hTOnONpoJcxnvrH4LD-86_1kW1U8tmmx85ROc9qTYEnk1anGmymsaZByjxUsQvTFwFsfG.NT6VAUiyhnvK4Htdykqvsw',
              cardId: 'AUS:ATL:8:2020-09-24',
              durationMinutes: 230,
              numberOfStops: 1,
              departureTime: '0830'
            },
            isNextDayArrival: false
          }, {
            departureTime: '06:20',
            arrivalTime: '09:25',
            duration: '4h 5m',
            stopDescription: '1 Stop, HOU',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            stopCity: 'HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '5926',
              aircraftInfo: {
                aircraftType: 'Boeing 737 MAX8',
                numberOfSeats: 175,
                wifiSupported: true
              }
            }, {
              number: '5182',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '07:25',
              departureTime: '08:30',
              changePlanes: true,
              airport: {
                name: 'Houston (Hobby)',
                state: 'TX',
                code: 'HOU',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..TRk1AWVdMjRdyhGLjtX_9w.KnDGOvfZFvM4Hm2oZAQU-Pgxh4MFKoNhuB602LZ2mGlBeNaWL0EPpuZfWSLpvC-1fzJ_ULbWjQ2WB3m45E81-P7kJXBpRopCcyaCn36S-woNfA7dNqn3Ua8rl3x9H9lOlvwOJ5CM3KmnJlR-T4IQ3I-v1_uaBAlFOOzP4BQjmWtk95cg7_syfgV2NuVGrMmTwB6p3LnbFvbyFkeyXOAFE-29UJesnsZroUYTlP_KxPLCMBNbJnD6QD9QBLVoCuFyI0vvZ2G3TyuNi8S2cp6ikqYy6Lq1eWYs5TnZ5pqcB-nlUZ6hb3vGCMhxiDADBH9w1aNcwIfLlZjwZ9DnveQbL04oxGd2b-yVYgivs_10KDe2tH_opGAOi9V3HkfACYvInSkWfZa8rnA-_J-EArtilMPguW0d4dAETNYKWnQLxgLdBWWJXaf3AGgcKhnQ6UO6zM4-udqYG1DNOPPh5bUAZ4uNOcTG_u3zKtARyzbGJKjBVmYGR6k-gosUSxwG0WWNDTj7FF0gdo6EAHALt5ayjoO0D42ZVIrC-Me5Anotibxe2AZ0O8jfXiFnThxiMytJiHS5oG4BK0q3HS6XlaD0o8V-d8mz2Lvwz2KvUGBAlRC6SEw70GtHARNNYrFw95wUMxDAB82rTRMAkAy82ynKS0hqsZE9dXYl0ZdLUSLEgrs0ViUGhpiGCyrh7Ye_8664dVdQ-UDPuKF9ffj88iaY7jeCeiLRs7ettu14kCrECFkA2ozR4B7j5zeEaggttHeOW148AbZK5oF4JMznh2dPMKEmJYAgZXgP9l1iSF_QEc2x1063LIKRrsPvkvqPEbmV9FoGrOsrghgvrs94W1VyS6eXsSl6dOBgEIjB8Ovz4b3U3LRlysIFLaBM5osFBQNjQsvNSXEYdkvCocPtNKBre2NCg6kFspl1GS-H3olLvfihVhDiGuZ318UPSAr3cW9vPpmMVdLwhjdkepPZM-CapfWR_Wl086zAWQqaaenKHnPhb8rcO2eU7PK2068OH-m-sdKkHKK_RYu6p7IcFGZXI1ide1lymev24USzfpsSS1Czkqx6DnXAM_S5OTHAlaUGSEwPDaWnn-8r6NvBYH22AjYSZDM-XpZ3leVDHg_B6Gwss4g8teTXX9r70bhC5-nUqypnUco1wTQlNYVz7xI1cAqFotbSRvO5hi4XwvaaGJ-91gFVQ8707rjzWqPWrmac.GxiIEnUuGizh1InJNohHsg',
              cardId: 'AUS:ATL:9:2020-09-24',
              durationMinutes: 245,
              numberOfStops: 1,
              departureTime: '0620'
            },
            isNextDayArrival: false
          }, {
            departureTime: '15:50',
            arrivalTime: '18:55',
            duration: '4h 5m',
            stopDescription: '1 Stop, MSY',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            stopCity: 'MSY',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '3732',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '3426',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '16:25',
              departureTime: '17:30',
              changePlanes: true,
              airport: {
                name: 'New Orleans',
                state: 'LA',
                code: 'MSY',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..V8Zn9ASHRShVHR3IvZgNlQ.Bju94pKAYSvHiYgxPq1wugc2uJiiQWGMP3mUYrYDY2irDZfPUVnu34JTbRP1tb9SNKE0fI18afvEexjdqEZ34yGAFrXNaV6kL-z4pgaqF8LEEvs6U7pkQsyv-vkB7yaZHV0HTNfL8lvi2DQDMAk1QFGpupsceb2Tn3smSQkGAzDH5HG9dCryCEkmgZp1vmDGSlN49SK-bfzozz-F1Epib1OTDOybPHiLMRxRFZeDYUHYnt9pM3nLujHpd8TBUpN3qGksicHpvTlcR9Zl7uQxq1JuqqgZbrY1LXf2XHIX8Lw7cCiV3ZWKUNnuck7nwxjs-ObekAtrLuWznHdN3ejMXbcLJ6I2kiCkSikhE6_rxo_SFMaRqGn03S3knGaMNWBHtVoxPWryNnyjb9ZqSDo3HsWXNYJp75AlKvo5Y90gaKHKKCS7ejM_HTgDAL5VZAnEP_mW8ag7Is0Z686gwYhUGync3GLxhmE_AWTy3wVYBiCNOlc1aTrIvFWuGppzedyByLDm7OH1k2Qw3Zk63JntQD7ekzh7p1bLTwFBddwvkSowoyAgdPhzoLHkHcM8U6yL_8EUaLptMaggSu1jYJlMM81DgEC4OAQXBCPOplLw533eUCrVS9y7HTSq21UmEEPX8ChxRSirou6vfHdF43BhcX0uJKb4cnuGUdajDg1Sh_irEWYIUJm60Twci-ifGdcH8i1q-gey4p-IIuKWKLnL_cYenOKhnBv-0Qtyxwc8FGjUWpSUk2I4WqZvK9SvdB6L0zcHTzdcvjlA486QNamRGqsSljN-8Utftj0A3yLXltPNVyX-A2kQk4eKbuIdbbLwE1jO_rtgUe0NAzrsIQ_JBhxMTCaYMXj80twS-TL6TOOOwSsSjDMT-80DKimSTgFB6pee1hyVHZacvAX59FMAwPehY-JTr_UK0kGGmsY6Vy_tA4ga2T5_qaC6u5yvPd0XZ3BkIW8uXqMzkpQI8VB84gj3_56xHhl_ybRna7L2LxDHe7NwEuh7xZZNU0DK25p4O2VLrCzpCrIq_x_7Ur_DrGZ1l5xO2m2uTOy8oFKipW_m018jj-5LeUG7iUBrVBn0sATXb64mYONkvTSU2eYB0pumGBMN_oMK5DwOeUf1wsXpnJHKczTfBNF99tPdJM_j_XLuadyMlXbVCAIMaAjA_Uv0dI5Mv5RDJjjJhLabEf2mdicER1HdmWWRNlQTxcmI.JdYsYWl3UfK6z3Q4N_vUDA',
              cardId: 'AUS:ATL:10:2020-09-24',
              durationMinutes: 245,
              numberOfStops: 1,
              departureTime: '1550'
            },
            isNextDayArrival: false
          }, {
            departureTime: '09:10',
            arrivalTime: '12:35',
            duration: '4h 25m',
            stopDescription: '1 Stop, STL',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes STL',
            stopCity: 'STL',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '3138',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '4746',
              aircraftInfo: {
                aircraftType: 'Boeing 737-800',
                numberOfSeats: 175,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '09:55',
              departureTime: '10:35',
              changePlanes: true,
              airport: {
                name: 'St. Louis',
                state: 'MO',
                code: 'STL',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..PCvGnkedSsLavMFla7rtGQ.ayiEl1x_olOxj0vJ8mG38la7YQr42YlV1Pke8fFSbNAfCT5FowM9xJJy6scQhICxPTu5lSHer_FpW4LyO-MclPtviWCZGct1_vp9j5goVXMXleIGugB5S1T7z6hNSxlv6PmyNDsbgiDEkGxvw_980hgzn-I3nuarVW87Ya-KlZ4NSCQbLtxIuHYCV4PbAnAD2fCAtAwF_EGmsvanRv3m2UMyNqZ97gfYl6aSkSCGerQVXUfk0aYXaIwBlpRh423UHIgljrzruoJII_6pqNDMU07LKPXoWBehGbUUFoIqx7hb_AcejkMobj4TTn-tYEZja7EMC2sLzkPYmApxW21vaVPRRj-mXHNURUVfGQ6NiDs7sEqbT2xkynhaJ0Yrmhe2CAoWmdnZ8PA188CHtDqYyMPclZYWSPoNPOTkjclkmXD9V1ITuM6zq6qZffhiIJTfggnLy_LzyYSGiMpgykwnXvwesc6y9s941cHib85ZWPufb5WAt_nia7JELDbKY0zT0cCHd1HZex_eki4Yf1oM6dyZqpZT7W6kJiAcVIFp4FGa-omk5CCGGoGg73V9W6Oh6WRhngb5LWBnfKqrW-7Rjln-v3ypnMMXXWe4JUlRbkwQDeIBVZ0Rr5mcjCCARmiwXF3-_bSy6KMAsNiIkiQaw48AXG1atcN_7l0XP6qzQaqZuvqsYVpOBlh3cBpKbV8eB7WnycRHvdVaoa9zlKHHr1tOnD_5Xq60GdqZRMrEcfEZl0AZeMD-BEnmWWKTTh5IYkhiY4WAN0-D-WCztzis1h2ZNF0-iz3in87rpdKY1CXuwTO-ugQf4uTleZoUza5_CTBzLjGCs3kdVb3ZsEBIjUnII-314mlbE9PW9EkYlUO78fc0SpYCVpQw8Hf2qCE-AyaEZw6jP0s3kmGao0bVDD79ytlmEZS4qASTqOmuYBTFjs4GNNpytUfl5Yem_YxQnKjjNQ70O3BWRjegb4rdutmwhzVly1c7n-XItWJiombqPOQYCbyDUoO1H5iZaZyK7JKa7vCYK4SzISbFdw8Gzyy76v8lWSz6aZTJCF0sYEALLyD_rXG1eo1vp_DhOKnpZTgEEMnQ1CElVueBqKX3mAwSPCV4JmfDKptfsyilTl4Rhb41fb6BeKhAJNOQaM4OlHT-5kS529a1pX-mYiz1BcxHTdw8rDy5tyDEnGQBec1TaSFwgvBGEM2h9GEGGwzn.3vyooDnJLPMNgghkaKmVTw',
              cardId: 'AUS:ATL:11:2020-09-24',
              durationMinutes: 265,
              numberOfStops: 1,
              departureTime: '0910'
            },
            isNextDayArrival: false
          }, {
            departureTime: '14:10',
            arrivalTime: '17:40',
            duration: '4h 30m',
            stopDescription: '1 Stop, STL',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes STL',
            stopCity: 'STL',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '3401',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '213',
              aircraftInfo: {
                aircraftType: 'Boeing 737 MAX8',
                numberOfSeats: 175,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '14:50',
              departureTime: '15:40',
              changePlanes: true,
              airport: {
                name: 'St. Louis',
                state: 'MO',
                code: 'STL',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..EGbjuS5qWjW98PnGc0tDwg.aqiCPMe1P0z93pfSHby1rGdZDIkmzqRp7Ry0jgyyMinK6rtP_Qw3hMCgugdzg0jWY9sjHRTdGofJQ1aYfqQDl9pZ7OpsHZ_ZdROXWLJJyemOVnc5z_4orCiRBh50Ff72WeGxpHwHnAotKS2c1epvwACa2Rspx40HmcUAeFZ7JmXDA1VF4WXCuNd3In_Qh7AhXfRyuKlY0KUyrRWxSMn3MqvzOiIWSsQaPrZyjo3-fwWvAct3bjV9_wwveraUoEQoXm_7WpUatahVggFBius155sltOpxUU5_qC-D9qVcXKX5YQscRcyvB4UZP5b6UTVLpa1lM2r1LOAnL5_n_s_qkGupkbSpoqMe4KbDZy4yhR5t8cmmhlXE0yt1wjG3WzbxOZHlsGVdfz-lH_y4lZ_nMYoMR4z14hHJI0Bx4k9zKOT96P5RlIpnBwa8JKu-wxlDSkaEYWoNtbA3UiCJ72Ekd6FCIKAyswq9Ze3vDjSOCFiNf8-vkqSv3u_Uw81nmnslFfkbs03hoPcAXTHkakl0hAqskrzVlI1NGNE2JpfGOzEYFAubgcbLj0qBwsbAs5XTyJ9wByAiu_Stdtv_fKATuaDIzNPYH9YXQ-PTF_Gcvz7__KhFBglanVDElSbYSrmq2uSnrjDDYQkqKzS2-nyyLG0wgMwzqr2mk0CnqI66mTIVVCxNgOUZVHberqpPVmAF3m9btWWgsnF28og-xOoivi5rIsNVfsNg559zCWKuaiQfybm46fKdNuWQ7XLqYzXmVCimlDj0vuv9YzVTML7HOPD8Q4FLYg4CdOtJPDu94rNJMtnbX6PFaoIiK434LDY8IfEfHKj1FPgFfUJFZ5zLFilqw7S_dfm5tFXkG0w6zVGeVvlNGIDJpQucO10cONuL2CHfCbOqyUZW_pt7CFbVK2bXiDw-pOPjpZZFKTY73Em3b7RGdP6nXZQgXx1_b5l9GVDqmfoWF7xt6D61Z9TKPbcMHeNQ5tucNDaMcDLyLrqxQWyvGdwGEHf6yEJM2J1T2yX4zvpXxF6jPYRjhB9o-eIKVtN80ZsfjSG9sgkzru_C1P9ZJa2uTbt9dHgb14yuCNig5K1iWv0uou_gCc4MiEiitfG_qoqgk2dnZeBdcwBgUImmEbbQ_0JKR1F_jjJAw6r75KNX1ktygbCbnwsvpgtJ3tJqh6EzKEQhtPphwvFtcktGzF1yrxQ_kzSDLIrK.E601vWCV2GKkdp8k9YyH3Q',
              cardId: 'AUS:ATL:12:2020-09-24',
              durationMinutes: 270,
              numberOfStops: 1,
              departureTime: '1410'
            },
            isNextDayArrival: false
          }, {
            departureTime: '14:40',
            arrivalTime: '18:10',
            duration: '4h 30m',
            stopDescription: '1 Stop, HOU',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes HOU',
            stopCity: 'HOU',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '662',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '5866',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '15:45',
              departureTime: '17:15',
              changePlanes: true,
              airport: {
                name: 'Houston (Hobby)',
                state: 'TX',
                code: 'HOU',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ttEteG9d0TYdWSXB1tRmeQ.qdsQGhrBpOSUacKZy8vV1Vd643bXRdrHEKe7Bku34OZkSOvhgkC4cQJ8jioJxZWn1Ldb0DMQzElRh4MTREBWgoCzuRJuxowoXGAEv0FxaH2dp7UXc7NsRwyOF_xW1xb238RttK0ygKd_SyaDF6P3jMIP0hVJtN3DAVEwg0kp8_8-a69gNwQe4t2FkwDr8JuPHRdSFxlOheVbuB41TFx1MxOFm5mEkUcqi3uleubRAxM4vDqy9XX4oR57mpI5hR_tvIaxPOje7VnralGyJxW9sIzQJaryZ24ZYyMQqUt7f-uTco0hkkBU-EkS-eZbQG33PfCRGPuaABznw4rcJcX8yzuOBVVALQUr9O1Xw7dyZAjo0hpnD01lmbToo0Ur_C7bxH0Ld7q_Ml5WMsuf_TN5ST-PqoK7RZ5DuWCVhNFuoJZW_udxpOFNryou-0IGdPV7igI6V_7Yratg2pQhB01f30hhDpgsyk89gqJqZgk5YIE-EbCpXGJ-Rs5tjr2tMIpvRWfoZJetRr5MZCZ13bswiqFWhOvMpLKKBMTtEaQtpkemzms8IKuqIUZzT4xYKGmyljWrO7kqhToqonmr_Ug6ACq_jBYq7p3-RoLeJGB5yGaMQ01QPkbyaJedwylE-iXuntTnapp10_3BEZpThGnvitwU3wJtI1yZWMT5se2U2MDZqAV0RYuCzG8q2XGzqHa9xnHIxPu_kXm_taWfpjoP0ens5bjP9GzeKXa8XSyuPgtrmd8t04ryWkM2B49gWd5bOGrfw8UhJJuOSPBypc34gE8xkNptmVlTrBgTYUoRlLEA7TRIZcKhN4yz869fkrtks0-JtVGGJI0dpo2Tl8Iu5buVL40J8PSZ9Txo7iA9wT9F5_haokJsfNyCWqwgOiUCF46Nfd4bRnbj53vWPYzhoQcznP7CIMkCn6Eu8Hir8fPygpEywgm-5uaD7vi4dUFHGfXtrjGaifD0emUaMq2IkKX-b5v1xC6t_e8GJQd9QzeDkVA0T6o5lJaCCC8POBLr6xgcMxJ_xZvzn3gOh9MKwytuLHVdfhM9p6PeYOd2oVbb7EEdfKO7UDgcLb7ovfrp8dHg36iStr-_uE4Jaa8z2tUdU5S1ZYwHc6z7_e8YH8Ml7LKxBiGR3AxWdx7NibnLJoFANfTt3JhQmOuEXGtPN1EuC5jg0ljaLXW0Sth9AcK9b0_T-726esWg-WxJP_b3.dmBVVrkHbytXLO8_FkFdxg',
              cardId: 'AUS:ATL:13:2020-09-24',
              durationMinutes: 270,
              numberOfStops: 1,
              departureTime: '1440'
            },
            isNextDayArrival: false
          }, {
            departureTime: '08:35',
            arrivalTime: '12:10',
            duration: '4h 35m',
            stopDescription: '1 Stop, MCI',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes MCI',
            stopCity: 'MCI',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '5214',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '3502',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '09:45',
              departureTime: '10:20',
              changePlanes: true,
              airport: {
                name: 'Kansas City',
                state: 'MO',
                code: 'MCI',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..4KQe56oXx8JaBi-i6vzHsw.yDeDP4PIfoEMpITQMzTAbZJ2BqM96qdo0ha8bwHxC9MqfrZvyc9N8aDFGjiriij-z6YkG-a8s95RZYNRUf4Fv4TB8cgmyXk69nmBEASV9Cei3T8G3dN90FfsEAgf-UzJTi9LzuHrakwhFb3cEyoLFbuW-2bKOJXoNDKY2qFeZPzE2xqgUzbYma02knKfby4kZ7bp8I6jPTlw1e4VTkACUt6ZvPt0M7ykuL46L12i5PX0ASLkUPAhyPtUcwJ6ge8ELZrIjpQAp5BJNVIADkqlj4VIMwEFgHb7ijMXDSWf4oh3fJ-79BqJW-MAUlIgcmLmcxWVLKC0WnbeezW-aBIIe3EeWn6JlYBkoqzzWHZ4nSXHEM6QMdTs9ccvbePCmvZlFoHprq8q6oHr7pz51cGARUrmwd8OCBz24w-bYASEbxQpXH0QMVxVp1Z_4WP5aBdYoSiBvBqgBSL0OFxGuChmQ78DxHzOJgAyULTCJkHhneOto0-WNl4vvRtn_2QgOpIo_H07flDbcIAB0L6kSviz64QZzN-cMUIjD1s4em0EXKs38ZBOg35rNzxYCx--nXaaCv6nfyImOOJyePltESpJPlgYdoNyGmFq7sFCqXvnAvzli5OG7_HKT1E8APzYvmJpwZmumM2Y6uq8ep1uRK7NpNxMXfmkFz_7kCnJKSRoqFOBsia9iPbQsflq71RMgal7DgGtYpPVQBOwtm5FgYd31zTijK00S-Zbso30C4xH_bgIDOWujcbyAfl2tTxqf79dTwKsZIvcTobqwZGShD76212k5FbC80V_re9Tf_AjMVOZ3IiliUrvYoIpfw8QUdx3JD4ANdTM0yOeBo-AuNjH4FLtUqb4Hh0Vutdg7PXzNtJeKtGsN7-_BfIXU-SF0tRLq1gWr8lJM1b8dz6ljGS9gG-9ARQkHbocmJMbYYNfOjk2FLrz7P6YfEpHJC-F3Rc0yN4LL3uCAI-7nH1lOmk0foPKMTfb2_x83vk0DCwlKZJl-lzuW_zH31fCmJ247D5X8bi8Sx8k-jeaMBVuvuMLzDTFePsnOGNdRxBnsV5Kj5O4jmY4oldFXSO8oXjxZ68P--lNb3xTQMb7na8BxMPVe5Dwm2aNwjjFUcBiabk69EQHQ-Z9RYz9BqycofSi44Kxb1UPNuYVIHzz9p_dX4-JOtEHxrM-s4R9rgOZtOH0tijaQMYGyUMIk2Dmy5wkbB7z.Iln3Wp134u3Bh_ySgWZr4A',
              cardId: 'AUS:ATL:14:2020-09-24',
              durationMinutes: 275,
              numberOfStops: 1,
              departureTime: '0835'
            },
            isNextDayArrival: false
          }, {
            departureTime: '17:30',
            arrivalTime: '21:15',
            duration: '4h 45m',
            stopDescription: '1 Stop, BNA',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes BNA',
            stopCity: 'BNA',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '4939',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '3827',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '17:35',
              departureTime: '19:10',
              changePlanes: true,
              airport: {
                name: 'Nashville',
                state: 'TN',
                code: 'BNA',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5Q7z8EcToCXsJL7NQ9GAAQ.ZQyI1HGUI9JIyEmvlX5XBRRkHzzZX8ngi3e7TSVNv5UlqrSf1sfw6bDVnF4Pi4F9ajvsLO7VOx0l2EH23YvcA3kcdGXk2j8akPk-i9Q6CdTY2LdNAYOSFvxnksHNratnVqwDhZ06e0vVxNYuxOf4647NT5Txq7TllJtQ2I-i4xyT7OdwF3dw6FpGxqzgX7j9X1XLk4ahOxfq_iaoFhRPTvtEImQBfi8lyCi6yAOkSnw2MbOqZyh7yE_hqAXw1uyTQ22etgYczw3nxxHPac1tHP9GXhWphHSiW4SijvvKofjdVfTU7CA3Pt1dl15_9SlWqio_0zz4I5OBkbDFNrWBvd59pPc4UkkIWmmfc4qBC21VdjFCJSEHweE-F5Z66M5bIMGzHLhtYDjqNNJox-cW-wRvLusFYkB5DkDAQjVy7RbdG_RH0CiQ8Nol4F7SN-7RVfsehtt60GUqb9Xg8mNbe6Vdn67UahIhlVl2FetmjBW7J2i7rfq-m30BcrWmMZW_YHPJihP7SmnD0B2kyvAEv9XZ3D_NhiKfEP9rCn0tStMxH4exDybM4I_JP3J6RtOO2zXsBrif5yiYS24RlnXs8DWOMtw6TzlYn4_WG2ExMaGy7aa2u2Ng38th3zya2JRDpbYClvamtTK3-N2TH2l3Nb4Wf8_8SIAHy1x7h2-GhI67XkK9hWSI_KXYO_pgNVPdMkj6uu5GF5ShNSb_ykgbAFGeGT-_2GiGx7ZwaCRDL9-m8GAxBrn6pKKNNV-bgv_N77LtSS6wu5F0PFzV2RrPfEYwwX961C2s8fubCJwYf1IhWW0Va9UlQmyTtxWpbokc-a_DTjvldxp5QdxNPzx8BZ5Vb8dMlpu5u9RLX_qfm90qU3coPWgCkhT_2hzxIvGwaOcKl8A0cp0lamP2DuFU7ri_QUIrICwswkhoI8T9eJrAO6pCwws77hImwt22PjR86GyDNsWVJkhQNrfocLWUFyJ2MwzH7eILyBT_IR-y2FkHuMfzK5UvwE1_PQnCGZzWiLYi6NGIgY7Rd_knxp0DSRJbJItptrivcXDxyMeJA_xnOdxUJSOATs8nSRQHwaK0TWg8PsXhEp2A3rQChDBQOWN-wUtmXhCsehuF2XVuIEVraMIuCNk_i0Sivqg-1p1MqynRiMBJpPzTLbWOjXuejXEYFp9rmVXzXu9NFacwQXsieM1EnV5MxNBZoxqVrpO6.KWaO5co4ALmBTMC7jNqzEQ',
              cardId: 'AUS:ATL:15:2020-09-24',
              durationMinutes: 285,
              numberOfStops: 1,
              departureTime: '1730'
            },
            isNextDayArrival: false
          }, {
            departureTime: '17:30',
            arrivalTime: '21:15',
            duration: '4h 45m',
            stopDescription: '1 Stop, BNA',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes BNA',
            stopCity: 'BNA',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '9596',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '3827',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '18:30',
              departureTime: '19:10',
              changePlanes: true,
              airport: {
                name: 'Nashville',
                state: 'TN',
                code: 'BNA',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..uNmvX4EjDfv7gW1rKp0Okw.yt7CgmCANf0zXTmL_c8DHjL60QXAemar_OqurzwikmRGZOYvJRk3VhKAJ8BeNAWRGwA3RnyQo9Fw8C0HVq7yihjw-DJH6T-5mtM1ryP3k0ayjwlVn6JzZK8OrLrvUJRzagES-IINm3aOqRpnxOLXETBCqC8EDbsbh-yi4T0mNhOIMcjSXKOW_u6Imd90VOj7yEXnpGmZXJFgn7uyrO1C5yqUSysr7CzxE4Ms15sjTo1w2RVKKAw7GXyhxOJDnMQzZf4RKyFHHjhMuOEkKULv4Og23FImFVcV6cvlG8hAB9vMV_E2vX70OJptVHsDfFFnYBpSn3CGgy7KBZsTMwMbpfwl3D9lIq-ltbQfuWBVACHC-XGu-3GXWJJI8-lwjcmi8P3uMx-7hwN4lMyT_DoMWfjLAk_9VEHPKT3jkiaP8QrFW_zRqiKw04mSCPDl39slSLzzT7WfoJq1qa95fIb-P7Vi7Sujmfyh2PWTBFN3_U92g5o9MLX40QnQS88QYSOKtHN4ArUsHyzpTqK37S_dDicCu0aoFgjfZ7zl6aDXo1gj6l_nIDluTvUZFKMgSWHtDABuFvUy8VdY0MLHOwrkM55ae-QxU_H0FPgoWXBaDZElkwVPnJEl7-T_OXARnBF8qfShFDEcxPkZqt7RgyDJZt4Jghm8TtupGNK7S7rm6v-Dzzug_i6hrZ7SiSMcjJ1djc-jFF4BGqVF2WmkcTtp7lHBYxdhKMwYU6qwP9hlvWcxsnW-0WBYTruo9lET-ogWJIouIhFFHZbVd9YYXZ_Axzze2jbbyQhwHRsUpDagSA7DtNGLlFfd_m-KnJL1iQq-i593HBG4asub5KbO7M2LWhshIZZjULcnuZTYD8tBSE1hFTCTQVFknpKWtW5wrIOxHK_okEC2XzaJzlgRY0BqA8LQVVFAerRAf2VQr4niSoREi-FO_pDgI0OCxcxmfY-DMoAkix-dqyyW_59YTqC4O89DP36-XmVIsAhl18CoRuWATYLzLekXkIYcLXToTsLAfG07WaDcENY7irq4z98P3euLgVBYwDCvQDXdrxG6sLDnAxHNljqoZD8dD0fa56dzouICkrhVDbersrZT1luXBx5bky4DKyvTTGJw87oKJYUHXRQo4Uc0d9wvekXEJ1bXQD5VYl3EyYvbFU-QIibxOANzF9HuD2sUciuszNW4wdDBhaj821Y2O5FUDx2BZhFn.W8Sluaj-tcoVJedFlGsmWw',
              cardId: 'AUS:ATL:16:2020-09-24',
              durationMinutes: 285,
              numberOfStops: 1,
              departureTime: '1730'
            },
            isNextDayArrival: false
          }, {
            departureTime: '14:35',
            arrivalTime: '18:25',
            duration: '4h 50m',
            stopDescription: '1 Stop, DAL',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes DAL',
            stopCity: 'DAL',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '2772',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '3281',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '15:45',
              departureTime: '17:25',
              changePlanes: true,
              airport: {
                name: 'Dallas (Love Field)',
                state: 'TX',
                code: 'DAL',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..A_nRhvCsbNFwZcxb2our4Q.m-AK3ZJB6a4M4MzObKjySXqbpRGF0KUXd8tBuMW_purkwcVhaRqnNySTPzBgg7z5mEhipnWJcVQrWj8H770La_YNUxKrMYawLFDKeaeeFk__uuuyEJ3G6wuvV_J45cPhfv_R6ToO23dIGvDoSlKiAKQ4PtwZG4qVU4MH0q_gXL8_XagIAbQKILEHJAvTb7m15BeRC6E6L2-V2_ttsP2DWN_eImKG38YbPXQpgT0e9dwP9zkdFuobxucZD65_VoVJopx6D5R8l-6XVSI2BV2_QxmJNah0Mge8P9DqYvDT4zSexzcxFGXQbeBjq74oLnBmaWMXq6MNJ4awgsAHzXIhPa2aaJFtJNynzKrZpvCGVHg6m8z1Fd1IJ67gvHFh3ABA9wNSEse7rO95KkDke7o2S1hkmBAlql687aIlKV2A-zTTd4vmsrano7EjrOxj0tb1dsCHTJ6XjRaS1uEkMRJY6Pm4ePy84B6_hroAzLecKYFp1dQkBz-Dv_hRhlLgrrfJgqAgHeSwz83LUvG9xPNrhqYuUQQnb9SZvBMq_2AbDtCvjFvH1m5NpSWhk8tJyOa1GC1V3VU9ls2DxlbjhKuYgizEmlg2YNk_xQRNycTH_wsW_MNXVBuEal3JI9iQCm5Y0e2fkLHwXAjmMdDnJpLQSKsfckjRDL1pzjnLw3QwxNw4bdm5XAUVZqeq1N7elfHq0gae3ugQpX9iXBryexPI2aTLnj1ax3jXLUmsXUJMNimLGN-m0rTiItPnFCiWrNiRPoULfJXW1Lf6hUsR4fsik_yC5bovfh8UXsjsO7uCwCOoMELnkSPmnbOhmBKpDr4IPuGs2sf7sExsRMVASRbsjOOK3zy6D4U_3Yp4ut4pavmg7AVQt6fic_vMa5VERPDZK3NUICDsNyQ-4Jz4nYI_-AXTQyajCuL_K2_sUz5hixzUL6uWZ5BebktO9xTY-ufjAspElfI_df4CNuGj9zAyIWvUrVBzw5-ClGJKvpc-CEjkGU_mlyb7hygmTVlQSE_uXmu_2b7jWV-Gks_DUFQkqaf2lQOLLJgozbMjfPrFKIjuDJeCXfkpe8UVn-ZbBtrg4Lub1gW6-_YTUKYX9jiTi12ixqJ-bJLfP8zAF1PJgxPUvXC6VyE1uD1cjs-hExkSElSpsh8aCs1ZL0vl5Kto_bd5Pc4CfqN4qFkYXxZBAO6uPAeJ4B3nhm2TA4GKVFNd.oQJOuf-vuaAJ6h2u5a_q0w',
              cardId: 'AUS:ATL:17:2020-09-24',
              durationMinutes: 290,
              numberOfStops: 1,
              departureTime: '1435'
            },
            isNextDayArrival: false
          }, {
            departureTime: '20:00',
            arrivalTime: '23:50',
            duration: '4h 50m',
            stopDescription: '1 Stop, BNA',
            shortStopDescription: '1 Stop',
            stopDescriptionOnSelect: '1 Stop, Change planes BNA',
            stopCity: 'BNA',
            reasonIfUnavailable: 'AVAILABLE',
            limitedSeats: null,
            flights: [{
              number: '9602',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }, {
              number: '5230',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }],
            stops: [{
              arrivalTime: '21:00',
              departureTime: '21:45',
              changePlanes: true,
              airport: {
                name: 'Nashville',
                state: 'TN',
                code: 'BNA',
                country: null
              }
            }],
            _meta: {
              reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MX3rfJUJcfZqPsv32y6LgA.smAfqfX6sTcQMKZYjfqFPBu4DCBTxqAcErTDlZuVeG1cnQH8RwUnR-q4zpxaxqDsMdNI-w9BfpwpDh_j3EQJM11s9FiVtFAHPR-kSDY0zU2KCkRP0MdGe8VRtL-D-A6Vhnl2dk6uvA_ch-TRxhXGHmxj7T9R_TOY-mb3EGKjvgwZkgpeCTM-Zawx70av1FRbv-5JLKzYyMlokoERi_5nDgQFWwTRnzZCThwqFyhe6j-6qMdICrF4La1VuM66e7iayXBEQoYR7bTI09NxZtWCJOJ2FYTuWgGy9jCTMKYbNRIKv3BxrYEU36gGadcAuBtDBY5oRWKAEqhRs0TQKpS6Tp8IvP_4a3fXDLdq8pzUSJliVZ3_n1xkmcj3GrexXPMVKF7Zh90w8RtEDkfFZDch0LNlvYbgtZK0NcigmbmCScS91GeIODPIjjtvAZQwmD5PGySIqlAohUF5-MSy9ZAIJXzd-L6MpB9MvlQ8Pgm0PWFb3i4JFc3Zpe7Ncf5NCXXGeRHndZ8AG_CMW2W8bmr-XLzwlOIWtceLIUQ1EvSJy6ZvjgdVED7AgyupOviQHO3XE6oy2JZFShte_ZeNrWwFDBCHy8cG7gu3mFdmkYv6btnm6ijGsnIEfEi1qDewsXCUZ9ZWGar_kR0dUHVjFbAzxuXBG_NrxjnRhb6o1Nn6XW9wzExXpzbkgZK2u9WQBR65jdQXyakhrAqxcpe0Y67Xaeqf8p4Ij4IavN7jUETbdh7p_klnR_xjm5F_BSOfdgMgv1_yWQGSbkzbJUMDIn1ldYDXXgUI0-LNxmuByIhZajkpq2XUdinNUnTZq3UB_BLpzy1k76zRDZGDh7BJpybor5aTaolraUVzk9Zp8eW_FesHnRFmfg6GO3A4pTyQPCkOA8DUVFVhjVlukmieD0p56MoUQ4I-qq0Np19OrK7B1IEbOTHAhblmY-lE0xU-0SiLny-z8huYv8QK3x9cbxloGDIe9DXbLCXUuUxhWa1y3uy2VoItEsvhc1qL2qE-A0EJlo6wqaSNkyYjHAhMdcrJdMZcVACGptVh8KRLiAvZlMjeWT9X4f8Z_-x5T8y1Vzxy18_GVEJuCO3SDPWY3seYLi0Cx9p73WxTNDMdrAb4oBsmlN6m-E3VY8E4Z6l62TqI0RMs9-2KycWBVuauKQHOtP5A0toCMU2e9nJ4xF7_SY_8HbgUeXgfQzo3s6zIswqx.B4E-2N13qw2VpjTHg0cOdg',
              cardId: 'AUS:ATL:18:2020-09-24',
              durationMinutes: 290,
              numberOfStops: 1,
              departureTime: '2000'
            },
            isNextDayArrival: false
          }]
        },
        inboundPage: null,
        _links: {
          reaccomConfirmationPage: {
            href: '/v1/mobile-air-booking/page/flights/reaccom/purchase',
            method: 'PUT',
            body: {
              shareDataToken: 'shareDataToken',
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
      tripSummaryMessage: [{
        key: 'REACCOM_TRIP_SUMMARY_RETURN_BOTH_BOUNDS',
        header: 'reaccomHeader',
        body: 'Please tap ‘Confirm change’ to complete the update of your return trip.\n\nYou may modify your departing flight if you choose to do so at no additional cost after confirming this flight change first. Please double check everything before continuing with your change.',
        icon: 'reaccomIcon',
        textColor: 'DEFAULT',
        note: 'reaccomNote'
      }]
    };
  }

  withRoundTrip() {
    this.response.currentReservation.inbound = {
      stopDescription: '1 Stop, DAL',
      shortStopDescription: '1 Stop',
      stopCity: 'DAL',
      boundType: 'RETURNING',
      departureDate: '2020-09-27',
      flights: [{
        number: '4837',
        wifiOnBoard: true,
        aircraftInfo: {
          aircraftType: 'Boeing 737-700',
          numberOfSeats: 143,
          wifiSupported: true
        }
      }, {
        number: '3589',
        wifiOnBoard: true,
        aircraftInfo: {
          aircraftType: 'Boeing 737-700',
          numberOfSeats: 143,
          wifiSupported: true
        }
      }],
      departureTime: '11:50',
      departureAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalTime: '16:25',
      arrivalAirport: {
        name: 'Austin',
        state: 'TX',
        code: 'AUS',
        country: null
      },
      passengerCount: '1 Passenger',
      stops: [{
        arrivalTime: '12:55',
        departureTime: '15:20',
        changePlanes: true,
        airport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        }
      }],
      travelTime: '5h 35m',
      isNextDayArrival: false
    };

    this.response.flights.inboundPage = {
      messages: null,
      header: {
        airportInfo: 'ATL - AUS',
        selectedDate: '2020-09-27',
        originAirport: 'ATL',
        destinationAirport: 'AUS'
      },
      boundType: 'RETURNING',
      passengerCount: '1 Passenger',
      departureAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalAirport: {
        name: 'Austin',
        state: 'TX',
        code: 'AUS',
        country: null
      },
      shoppingDates: {
        beginShoppingDate: '2020-09-24',
        endShoppingDate: '2020-10-10'
      },
      cards: [{
        departureTime: '07:30',
        arrivalTime: '08:45',
        duration: '2h 15m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4583',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KyTi8pBXChsRLMQMe9j_5A.njN5b4YfWHH5ueJBbUxwm41mowFcv5Vy2HznZFQK6yGME26ugfhzHC4kn8Qr9bSLjdisevLCM8vuVOocjGksAvsAsb2OT7zG9rY1BQ8674DHFl4oY097F67QF9CQaa0VfNUzTysQDW3fjpGnmB7B9YdO0RJwbNUW-ky6V5UXZyG_zjz3Sa2tobJoPCNemIz6hzN4iOb65g2jNmwvr5pnUZmQfb0meQR8_7WP9sBQ0UXx5GaBZGAIzj4l2MkQ96pCoj5INllckIiFpZfc7ITQJJmuzvi-8pA7hd4W8j5YwhPP8KrF8Iss9J0mnp9YdfC4i9LF0UkEgtrU5WM61mfJLLN84LOgKBxX7nxfNvlCrZ5aajSaSjipiGmFf-s-mT64-Ql1WvbCYT3aQa2WdTXG8m-tUpkV5_UFkF8TFPDbFuIriZqdG7B09-v8-13qK4esjAS-e1CvN7RyuWbafVMoVhzqOZL6ntfQBjJe9HV1jhmvJF7MEMmqUiw4zWPPo-2TqWZT0d8lKgMBXajJ7O81W8qB2gI0erkXp4b0MC1O9RU834GmSeIk7HvIbet6WS1G6EmpjxDNIZUnbLdLrTpvbLI1cqCbPDvFux1Z8Mm6aptVIhUm9I2aQugI3nRs_tzd6zG7qm9KfQiqaohqDPhBDn2uoirYNpq35dPvUks4pIQK5OyQ2BJ_oQ_Hmj0S1zio_NPcKVT7sTo3levhhHJgn-Q9mPPj_W0rXsfM1MZw8wkVgIc_v1QnT1b0KD7y3eL3babEhCovOvRhcBzXLcESYIkkLNyIgF_ww-mo6a048rxxIR_J8CL0nctMHBcddV2Aw6WehFTOr3aep9MmfhC6ZScCO_NnHVbw_WVcamymZ_s.PCy_vjP2Jij3tOWnSoT0xQ',
          cardId: 'ATL:AUS:0:2020-09-27',
          durationMinutes: 135,
          numberOfStops: 0,
          departureTime: '0730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '10:35',
        arrivalTime: '11:55',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5664',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..O4qkOXSA-gmbPjdMQymghQ.pD1PmxdniQH6qT6GUnd811-SkLInLpW-7-HqoKaBvmHDa3Tj8T6veCpHm-CX29TzSFYvtQE1cWk1vcCHQd7K2l-v8-grjAgbg_kgSmw8cd0B57nV3tPKvZ31R0zkDMzZAMM4AwoVd9Deffb6tOu3UYkCRp-B7tYxU8ZnCSNFg3erXDIkUNmqejm9B6ohCS0SMLmMnOPSCYHUiEV5QXhwwKQEh8tqZYHbfPOPdrOPTjNaP-NYFRv5BPfzVjfBH0oY-twckyOq5XhJiaY4eIzVmQineKQDCUMximAiqcwOieLCD3qK4MaYlwA4Y8lEe81UCxrUqN5BLiWQvavePbhffhEUqB-Bbea7kUmMbgBy1l-UiCwKIAwVYOntVBqx_BT5yEAt_leG6w4gjUyxMfUboijSzIP79ckt2sQv8_xcvHDckiOc_4vPG88G9Mn_7h9tFyy4NygXBOwEBGfVaGw2y-Cd1GpB20WZZlId9nPstynYTcf2qrVxlkRZWyOUVV8VYW3o2FNwGew0NG_cLof2qZvSQe8_LGIpxIbxdsn_E1CWxWWqqwNISr-8jMcVcENS1B98UGseWyeDSTPL-TDv6BpgLMoECYcUpqR9f6MiZUaDeK9QY488FICal0-zzuXq-KAXToxFTrpjoMKT7XoaUL1O5BHrOGVao3MCy1SqErtgSG8SCU-Hknk2H3jf-j7ejwvKNJeQq5f00_K87sgwKLjW5mPrcQAhKE8VJogMSfySYLyRjp_E-FKGt6o1nw6xCI43wcvIM4vMwaM7rnThLDjBY8vqeH71Ik1v8kgorM6lLEEZWXzySRiM2goVXbEjlYwDBk8jxDRm4Mptm3j-SVeXW2f80f2suWngl13l3y8._FOhHBVPG2pdNsCzF4omVQ',
          cardId: 'ATL:AUS:1:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1035'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:15',
        arrivalTime: '16:35',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4094',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..0VsI7dRYHmp8tmeU50J94Q.bCbV1jOjRJBAQwAj7zocvRhsdEGimV6E3R2UusBa1kTIC41OjJ18av1inCxoB41BjL8_ATu7fzmWg9duHiut2ExBtfY58NThD8ufQkKHlGkeAGwMpXsh6KWJFCO7p872hYJtFO0hbqBQY_2sceilm2VGjwNsObCWTJR_2ViwjdRUFjkkcFxqSgb-8UUfhXiwjGf2fc5lIMsdLLKaxFbgkK4Vu0bo-p059M4-zy4StUiE4nvR1wg5dAQPDdbkFp7rnY7usDPB1RW7WAuLB2C6BMTonrcgiVvj9Ut3b88lRDUtmk87tuTaH_N22PS7Uk1EU1RCBdt6f9_RTOiakEYquFaVSuzPqkACpg19NRqd4dm-lQ5Hs4ExzW0pyq6UVOLrBN0ygLy8mb_0kpcDugeCSpsSxm1Qq3dp_sPHPn6trcf0DYexFmidDnnjmmYMBNNDtsw0OnDwSWYwwcklt0zbffEhUPEu-UinxoTyxtvokjbO9MMb0NF1JdlJuivCpERZdZHc5QPI4u6I9AwPFITy_CzDysCgMDc5dBhKm0gNpbABaiwcTgM7HbFBXaQN2AiJmkQrU081HVlcFLPRmMEZP-WCw7zmPYgC_Oav9C9Uzcxly8A4rp7wMMLivf8AEd19nuMcECT3YHXTIdmA15TvsgHZioug34_TZehAhsLEde2rhXwLBbi5rzNHjWkb34pQzVd1HaPIce48zjr1xkV-VlkKzZfO3K2ugOP48dwrev5Ef9DUaTkBkvmuYEmsoYlTOExns6fjiup3-0lBjQrKWJT6kwlNwuEiU-qscnbsvSpw5TFADdvnyiF78TrCTEWT1n3BkpJw3Sy2CtdX70gqsgafQMGbFd781SUE0KDkKg4.cfQoDv70me3YGw1yditvgw',
          cardId: 'ATL:AUS:2:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1515'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:50',
        arrivalTime: '21:10',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3519',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MQQP3zjLUx80ltWn1FxwtA.Yy_zoEjbKvjs0f7thhbhAaIPYqEGrFr6SEMHI-x9MvqryWq_6G90drXnX2sEYm4CJS6DjSR8VBt7XRsdArCkbPbXu_OsVde870CBcHpE7IYf8l2OQ-NJoOlqojzbwPZ8d-4_Ule_qFM5OLyrkVt5W5F9iMu5PHlF-dNQqPI_viHleE1VioBpMprMj8rS5ryt88o0rZT414pWjXLnR0nTRmmC9hFxSiYT4fEM--tz67vOedFNc0JP5sZJJJo-RFkN9yPtqDzJF9tBQGQYC-EkeJ__GEf1rplhMxWIeLOOoGxCoTwksgTmVCBiUEcvj2UhBuqHq4wdL5SPMFhfghhzj8w1KMb510_pp1etMYJu6QfDZ9ZKVEdFKtmFtjcGwt6FPmYnUHQZeR3c9e7dKOOjrqvcKya-xAqVDREN3eX6g3dDNlGY48_ua9oNT65NWfHfqsnZagdJlhwj0AlnFGM0ALSM-GwDGHb8AlhhT-cTue09KahBOkfEXHRmif-ss-ifFZkPAaNDH6z332uVECougO8VWMPtgsgI_nHKj18ERZU4vxCpcNQALCoI81HcVHVp4utPXSKgtnnyhmWHMECWQd4SnLFB6AqN0TZDivGBjbhnpKJ30iAQnj4xjCHmqmVdM43UE628ltmP3uXYjxOn1GyLZnUzpj95lgSzsf6uoY4WOKcTHdU8vN7E46VYc9CrGbqDb1Ou39phNjTKlj1AdZl2oIlYIXMqueSVhrInbasfDGzLwd1tyrPVCVgI2RkUQjl4-k2Ui_1UQNZEiqx9rGRsfUcw-VpbVVJe43fDvSDaJ4WwCXL0Mb23KabjvJikZrk0VZyCTcxM6eeB4jdnCbjMzGzKJJtnebn_T7nrg5Y.DsIPFr4bI0LbQEAdaxKAhA',
          cardId: 'ATL:AUS:3:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1950'
        },
        isNextDayArrival: false
      }, {
        departureTime: '11:50',
        arrivalTime: '14:35',
        duration: '3h 45m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4837',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '12:55',
          departureTime: '13:35',
          changePlanes: false,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..-uOsrfXaOofdyTUG1Up4Fg.G9eMxGc410dTzERWxfHilTSSh_a04P1bXu4JgAmvHMEqLPLHzuDhGd6JIIN2vCBFO24mRPsUYqFF8IwEucUAAe0Lt_cpRJzQrmPOgzXQ4arNaYrMFxVWpW2nukYbsxwGOxUXKA0wJ5IFrMLzygKypKoZsOllWSheTDq71XJjBeHIA_uvTx3d7Y_ooKuHmqPppbXpUtZF9gJ0fUIClxzi9F4SOHnFo8ba1HVQx-SB97FCWh5sCNpaSmLkxu9nFKlH7qDy1XsVL_QJ-Cf5Khcy4gXJs3RHoJ5h65hbjSZUUA1YVY2MmMF3syL_92a0vzJ-7HN_b5cNnxO7XyWy-kbmqvD1dyWTxK75DzWkoc9VabHHF1F6VQxE1pPK-2eT6Tk5p8vBXwnS2PC3ol9zodgklbCoYzfevfjWikvQXtW979zhvVFv1p9FDaNao1nNIuKPV3NPGtPavhlzMrsVPow78iO8Q9g_cu5uEBzq1uDP7urJWGCY6s44-UTOHhI6jUwuPHQjB5fya9C9dGlb-cfdPLBM1pTgmxNRgndbM-SSkj8tcmljVsatsbF3tDls60SYVHoRt9i9dc2dydE-DxpNWX1vXPgXdc6w1hyNXh61QBIqtB0kaj0s8ZHYYj5BIj9zItt_WMshtEe4e6LjGpa7OAibOeVsspV7A3F0yTYec8hrDg53_e-oYgKx5VsY9yZkVAqtgM3pBSNnU3E2gWAaylEZOUtcVbi8N5EGj8GiF1KZ2TBTPFRss4IJSYPY_R6sPKqadc2CiTZ_rlAtMMzOmL6spzDrpDCfGMEOWLiP2xnuzk0l9Wy7PGF_nqyH3ehtL760vpfCnmFvtnEZpk7S13i6WaxpLfaSoPmFYo17nys.pgdA6ax9qO10UsVkuvKz0A',
          cardId: 'ATL:AUS:4:2020-09-27',
          durationMinutes: 225,
          numberOfStops: 1,
          departureTime: '1150'
        },
        isNextDayArrival: false
      }, {
        departureTime: '16:15',
        arrivalTime: '21:20',
        duration: '6h 5m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4303',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:25',
          departureTime: '18:05',
          changePlanes: false,
          airport: {
            name: 'Denver',
            state: 'CO',
            code: 'DEN',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..f7hlfZwhw9q-cWPG2Pxx6g.VOupZY9hrTT0an0CMYwTPZb0lAwzJn5Eyvu-hTaGADopq48ueYqnK9tL9Au6rqYTu5qCHB82ej3Rrdu05gC7TWFsZ3DTGpdvmigG3x5QVIitEdSDCVzB7XU4viy8ECOw_NnE0MkChxeuiM4mXm-yb8vy-uxYEFBl8OXw_WE8tE-w2wqganjEDaP8bCr5l_P_TnOJV4WRVuCX_hJWcXiybXsqOpkIq_x999MvMC2MbQ_9tuiDritfRIKX-DdEC1Y43oACg5zHgfwfUzzt8Rcgz3H1ev3Z9iCCyRS52zRry83GGLAfwKWBj6whKFrEcsuEbufFnvCECGMiU0SamnF2bkYEnBKOq-sfimy-alXsdZJoarHdy8kysRyDLvkZmM-V9nqJ6GZ6Z5yc_6RUVVZzrizMqT6OAxKwtySp_bJpnhj_mxzvuytJN50QPP0_lvL89X5Z9mNsJ1BwReIDxecI1RRknh0CreS7rxhg-V5qSsnzjvShe1rSodB_Q-D8tguPbjLCdYq7zsAnnbFhiXXFLHt1O_9LrzyocV7l3cVREjWoBwMDjVcOjn4sMFCGkXNIZbDYxUlDhXBMdkwMLqkSm9rstBmnOJDmkCbeX9nl5DRkUPMzkoreg-_-F0JFdRounfq99oAImXXlj6J5k_eNn71MjGzmGgUwOFPp1b4GL6S2yFlVBdi239Aa6rro0eIKctYd1YNBYWfNbZ270Xy5T_6b6fqh-DUulQBYCx4Azi5czVPhIXTy0vHTyuqS215pKy9Jp8BhxmZR6wFJyJRlvAd4RIVqkCO58AgDRWlQ7_srzQLO9pDGQioIBDs6QCXv3tR_q7IJ0aE77YoNuA_Zozo4zIWBz2rkS2k2aogDv2c.ouHaXoQHLMe9krsWnTV-RA',
          cardId: 'ATL:AUS:5:2020-09-27',
          durationMinutes: 365,
          numberOfStops: 1,
          departureTime: '1615'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:45',
        arrivalTime: '22:20',
        duration: '3h 35m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4106',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3357',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '20:15',
          departureTime: '20:55',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..rlzEUKxMzdQgQ17FWeDtKg.i4VR-lVBwh6trhiqr_9vr2i3dWfB_vV7-HJF3Fth5uAjYvyXBoaZLhk60xZjuIIWjI3trmapSn3c7YrM8l1bmMEEiiOCfsTIHw8VeC4Wd7WRbd8beiJK6jVHnyCINYYdlmtL4RPjEuZhR3hBRXeoEpMqTEuBtNAKTULRYY3MjTyLgrPEszQERNfk3z_6GQcz8WkSDogpxB3szDf8jLHF_KIunrIW0OUYRPEbMnD2tf_DBAZPzaxtWEe6LxOhNj4GeZYtOtl1vPaXUSdk518ZXXBpvM64x50R1_JuASZSkFFAxWh3VHXZqrNXwYrSjaXVqdnWBo_bZnbjSRwyLPFIMwcJ9q4C7EAQcUCWxqKPQ66ta-Sfly4oRGZSf092QD_C9--UDTuypI2XXi71cG-1tJwq_nxYrd8gfHwihqla69cAvkYe8xbC8AM6iEiWGdnm7-6qFywjcNUDOS6FypEJ-CBaHDFccy_zHb-RorgULrwXaOa-pYyEMTLclrVWaL8IMz3LPWWlSORO-XzW6mLz_EmMvFJsVH5KEbYKr_z0ra1zXhxfZSvYRqgj2iOqzNQUoa6YQhI07QjgYt3YVSVlC6PL814CtWJGD8eHZ5D8s1OkcVJC9nFdUrBKEtosIB73_wUWex-usnieVoiGjXvV3qdBABkpgOkVv5WKSgNRkZK9BE4sDjs5KR9H8pR6XZA0j9NC8aUHur37qxdTdNHUCC2uqqKhg59xZZxufpHLNmeJOaggyJYNSpeeRfHW2FIZsgIlXa6Gw3le3E62Y5lt48jltYsXn_qC4riJ2pu4Bm6N16_wjL5Jr5m9KPqxi8yTJI0USZUhy8g5s9XxmCzck5P5bJANszLhnm9N2Pc8_tASADGcm0Gol1f-rziivLWoqnEqIsS9rgKsje9K0hGJro7AeU4x7imopvYDomZyzgKdcZqv3ZQP9umFaND5QJgYqaF3tze-7e0sbaip7ag4G6_wG6y5lTuILBs8s57xIG_WhNioWzNY_LANNxNagIy_WjqWFpLgs2Se2NR008l9NBAYQPUa0JEPSiqLw6pLmUldVxOGgDiKKnQqBtFMMj3k0ISWIh45BZrFRt3kprK3O_jBjikYVXRd42X18XCOOWRpFKkJCU8u0PlhmgwPFjEtULm36IEmkxMHXJwD2g0wrmEm4isbt3av87emCXG1FlPI-MGJJJscjl8THRROn0L4.MUUWuG0iGfc5F0byglaDiw',
          cardId: 'ATL:AUS:6:2020-09-27',
          durationMinutes: 215,
          numberOfStops: 1,
          departureTime: '1945'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:55',
        arrivalTime: '20:35',
        duration: '3h 40m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4270',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3704',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '19:05',
          departureTime: '19:45',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..k8A4HNI_K1XuTPwTpShN5g.MmZhSRW6eiauNONo1gpWg9_EYSMNQnvlnWDi0bYYPRubAJgfr15EMrMMLXiL7djrA118LFDl4Rx1jAuz2U4srJzVUYoUKQUx5B76mJJ44BMAdR8N0cKoKK9EhJ7shDVLcuVKQZv44jgxQ7G6F89vOy5WUyInUa1oKOm8S2m6l0Bc9PnZELmt5LcPwc8F7dqBVMbRrXwXTG8QOVPfluKM30GtLS7zRa0xTnGkDaLrhyNV7n6NvdEYvlvZoG7ZshlfHcxJ0IhaHynSZw3PBLHVH0MrueZWKYrsyMKybOzSwKb5gcRpWKNEIPdBSn_k6TE1Ia524iCVtw2FJ9Pd_s-S95Wyl2lKhI_xfuQk_zmmcRtvJw8GFKhgJ-7CJNDw6y-T5kzBE4lgZZzg2S1D1zLWDk6BqgsDb-3ao9Ogt0P0KUfn7-ky3AAkWUoxMxIlurZBx6GmurI1Ud6Kd5GBovmOgZtxynJ7xIV1Zedfo1SJ6UQ7CtmmbLpr6XXpabbiR3nOtVOowk8OS-7nPtugTnpv3L-16JIefsL2DCz0pEFDauGuhGUgY9c1KkUhYA5-twHlbdBZoAtKzyNR3fYY1UjXLScE5aSkWS5gabuupMZwBnC7eGvfd3oc8s1e7nzs6S1tRNcfQlawen8vgdLRbVIIFIwp29ydeXEgwIS8osoz9hT3PEkRBOL1hpM5-5qle89Ka5rkXraUUPPAYvKjApTIVNxlpONS_6PUGHLOO6XDGEhMRNteqP-yt06YfCE0ok01w56LpDvUKl23mjeaKlbg394kO13HFQ1OPdOWxXas6CmYMACwFNNQOFCKUcnCVn6E2VhoTY6gGweUqdDnEDmoE4921Ir-BHecGyYIHhHJyRUdaOWc96R0pP3lvo6HBBsHICYHerGUKE8LCQ0tFulOj_y6hItL_LV71n1ihYYbLnIcdilj1j2Jcg7D2hZ1pTBz1o8C2Nqdcg2R4z9uFH6q2gJVkuBosWzZEHe2OTCd8NxQgtkEwqAvmCoC2QS9Wn5wtFITkkfY38oXtB7wX0Y8xMfWBq0aWk1UouEW84K_Ey3CHN95zkFAkv9EtgNS_FQbsnWR4r-Fd91XY-OPGD4eH1oosrkAD3OnDVwanGQiBeJA2h_hmT7-40cwoMetFu0iIQ1hs8MGAV7vXF6nsmbK2SttXbjLMkiCbNo2JRyMal5hOKHiN3ZmixOJ01t65xEQ.Zibk3oMMawwKVniblj9-3g',
          cardId: 'ATL:AUS:7:2020-09-27',
          durationMinutes: 220,
          numberOfStops: 1,
          departureTime: '1755'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:30',
        arrivalTime: '11:20',
        duration: '3h 50m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3418',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '2942',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:40',
          departureTime: '10:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..K5AgTnNYq5Nw5zIIAgJa7A.9DbZIH9_e3ow0mUvPMCXRyAkbrSnEaHv1KVOgh88E8IXj_HeMi3jlkGlJ4RYz0ac1E7VWF9n-Y9lBap95x21Q1Bq4jcdHRw2XECLPkPiPDtYHT7QraQOm56ofJ6OmhXR7Go67CMpF1DgJqKJFtJDsNv7jS5Q6kEK-HPE8qQAmig4McrhPs7vAP7kMEutwuqos8v1AIBEQPoXR8z5XPkZ7Pz8lnu04iVOvyER9FrjNmoEq2YGl87aAKnS-NQ1sUqjcY7LJG9QJC_7BjkE9-o3oGahlfDK6xLDYWPZlo5R8rrrJZzSsu4Q7CDsaSTbXaNvHZAV1pDakpjsPyijVcTAruu7bFF13Sn9biFr4elxMSEPNI41-yvpvmQBVTpoIEDB6WJ6ASZwVPbP44Ei5WndAF9dc6yKVoZf50VcVvXETbHksGXr6VxMe41MLxzWoWTh-TKnUOk_bjSKJghGtAuhG0GaEFcWXcL3NWTGz4N617OEY221QQwKtWk9rp11p4RByPDmNxmNRISZg-B67Opg1vqAqAKcd-WZJhDTY2JN5ja4ripQ0q0gToyIs4kc3nbqRwrngDidb2tgoOU8rWdVwNcc2qnluWGRLU2vcSL4e5PCOoA2Tq5eFnNlLQ6diWBLytxwlyP6Pt6eSHK0Psxx3HdU3Kedn3-zOdEaVEVtRQpOyGaldYCw-ylj-hI-hFAlod2TazPbD131Nhd6gsSzEQG_E7n51NL_X6vGOOThR63V0UeUN-v8unD26ALm0Wv1VfSeuSseBWUuZIUDn3BByK_InGfotr28gNC930C5rWU91AqngbAeqeMcOq96ADR1GDZS8eV_h7tnSsLM80zN_WHwHQOeoMucUMSv14B0E3i6j14keu3J0vdHo39xnpF2IDonf8_DSr9pujA9a9xBb17RoZU_Y7BVrZwDlFThrwBgByXa8mQ0XiO2GVmI313pe0Vwl5pHmaDClM1uRIAY9HjQTHwnkt_0J4hCh1MGcuRoVtCLEqNS0v9IrjuVJvG8eUaUOSNkFQtFRW52_BrX9DBBLHfeBxj1PaSogWB3ElQ-PcxQgUynFA3AxGM72VdwgzMhY76Z75Xcj3e0bt2us9TdActbN31U4XyWZj4ZCB21CxCUsMvM8YYrDR2hTOnONpoJcxnvrH4LD-86_1kW1U8tmmx85ROc9qTYEnk1anGmymsaZByjxUsQvTFwFsfG.NT6VAUiyhnvK4Htdykqvsw',
          cardId: 'ATL:AUS:8:2020-09-27',
          durationMinutes: 230,
          numberOfStops: 1,
          departureTime: '0830'
        },
        isNextDayArrival: false
      }, {
        departureTime: '06:20',
        arrivalTime: '09:25',
        duration: '4h 5m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5926',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }, {
          number: '5182',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '07:25',
          departureTime: '08:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..TRk1AWVdMjRdyhGLjtX_9w.KnDGOvfZFvM4Hm2oZAQU-Pgxh4MFKoNhuB602LZ2mGlBeNaWL0EPpuZfWSLpvC-1fzJ_ULbWjQ2WB3m45E81-P7kJXBpRopCcyaCn36S-woNfA7dNqn3Ua8rl3x9H9lOlvwOJ5CM3KmnJlR-T4IQ3I-v1_uaBAlFOOzP4BQjmWtk95cg7_syfgV2NuVGrMmTwB6p3LnbFvbyFkeyXOAFE-29UJesnsZroUYTlP_KxPLCMBNbJnD6QD9QBLVoCuFyI0vvZ2G3TyuNi8S2cp6ikqYy6Lq1eWYs5TnZ5pqcB-nlUZ6hb3vGCMhxiDADBH9w1aNcwIfLlZjwZ9DnveQbL04oxGd2b-yVYgivs_10KDe2tH_opGAOi9V3HkfACYvInSkWfZa8rnA-_J-EArtilMPguW0d4dAETNYKWnQLxgLdBWWJXaf3AGgcKhnQ6UO6zM4-udqYG1DNOPPh5bUAZ4uNOcTG_u3zKtARyzbGJKjBVmYGR6k-gosUSxwG0WWNDTj7FF0gdo6EAHALt5ayjoO0D42ZVIrC-Me5Anotibxe2AZ0O8jfXiFnThxiMytJiHS5oG4BK0q3HS6XlaD0o8V-d8mz2Lvwz2KvUGBAlRC6SEw70GtHARNNYrFw95wUMxDAB82rTRMAkAy82ynKS0hqsZE9dXYl0ZdLUSLEgrs0ViUGhpiGCyrh7Ye_8664dVdQ-UDPuKF9ffj88iaY7jeCeiLRs7ettu14kCrECFkA2ozR4B7j5zeEaggttHeOW148AbZK5oF4JMznh2dPMKEmJYAgZXgP9l1iSF_QEc2x1063LIKRrsPvkvqPEbmV9FoGrOsrghgvrs94W1VyS6eXsSl6dOBgEIjB8Ovz4b3U3LRlysIFLaBM5osFBQNjQsvNSXEYdkvCocPtNKBre2NCg6kFspl1GS-H3olLvfihVhDiGuZ318UPSAr3cW9vPpmMVdLwhjdkepPZM-CapfWR_Wl086zAWQqaaenKHnPhb8rcO2eU7PK2068OH-m-sdKkHKK_RYu6p7IcFGZXI1ide1lymev24USzfpsSS1Czkqx6DnXAM_S5OTHAlaUGSEwPDaWnn-8r6NvBYH22AjYSZDM-XpZ3leVDHg_B6Gwss4g8teTXX9r70bhC5-nUqypnUco1wTQlNYVz7xI1cAqFotbSRvO5hi4XwvaaGJ-91gFVQ8707rjzWqPWrmac.GxiIEnUuGizh1InJNohHsg',
          cardId: 'ATL:AUS:9:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '0620'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:50',
        arrivalTime: '18:55',
        duration: '4h 5m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3732',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3426',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '16:25',
          departureTime: '17:30',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..V8Zn9ASHRShVHR3IvZgNlQ.Bju94pKAYSvHiYgxPq1wugc2uJiiQWGMP3mUYrYDY2irDZfPUVnu34JTbRP1tb9SNKE0fI18afvEexjdqEZ34yGAFrXNaV6kL-z4pgaqF8LEEvs6U7pkQsyv-vkB7yaZHV0HTNfL8lvi2DQDMAk1QFGpupsceb2Tn3smSQkGAzDH5HG9dCryCEkmgZp1vmDGSlN49SK-bfzozz-F1Epib1OTDOybPHiLMRxRFZeDYUHYnt9pM3nLujHpd8TBUpN3qGksicHpvTlcR9Zl7uQxq1JuqqgZbrY1LXf2XHIX8Lw7cCiV3ZWKUNnuck7nwxjs-ObekAtrLuWznHdN3ejMXbcLJ6I2kiCkSikhE6_rxo_SFMaRqGn03S3knGaMNWBHtVoxPWryNnyjb9ZqSDo3HsWXNYJp75AlKvo5Y90gaKHKKCS7ejM_HTgDAL5VZAnEP_mW8ag7Is0Z686gwYhUGync3GLxhmE_AWTy3wVYBiCNOlc1aTrIvFWuGppzedyByLDm7OH1k2Qw3Zk63JntQD7ekzh7p1bLTwFBddwvkSowoyAgdPhzoLHkHcM8U6yL_8EUaLptMaggSu1jYJlMM81DgEC4OAQXBCPOplLw533eUCrVS9y7HTSq21UmEEPX8ChxRSirou6vfHdF43BhcX0uJKb4cnuGUdajDg1Sh_irEWYIUJm60Twci-ifGdcH8i1q-gey4p-IIuKWKLnL_cYenOKhnBv-0Qtyxwc8FGjUWpSUk2I4WqZvK9SvdB6L0zcHTzdcvjlA486QNamRGqsSljN-8Utftj0A3yLXltPNVyX-A2kQk4eKbuIdbbLwE1jO_rtgUe0NAzrsIQ_JBhxMTCaYMXj80twS-TL6TOOOwSsSjDMT-80DKimSTgFB6pee1hyVHZacvAX59FMAwPehY-JTr_UK0kGGmsY6Vy_tA4ga2T5_qaC6u5yvPd0XZ3BkIW8uXqMzkpQI8VB84gj3_56xHhl_ybRna7L2LxDHe7NwEuh7xZZNU0DK25p4O2VLrCzpCrIq_x_7Ur_DrGZ1l5xO2m2uTOy8oFKipW_m018jj-5LeUG7iUBrVBn0sATXb64mYONkvTSU2eYB0pumGBMN_oMK5DwOeUf1wsXpnJHKczTfBNF99tPdJM_j_XLuadyMlXbVCAIMaAjA_Uv0dI5Mv5RDJjjJhLabEf2mdicER1HdmWWRNlQTxcmI.JdYsYWl3UfK6z3Q4N_vUDA',
          cardId: 'ATL:AUS:10:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '1550'
        },
        isNextDayArrival: false
      }, {
        departureTime: '09:10',
        arrivalTime: '12:35',
        duration: '4h 25m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3138',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '4746',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:55',
          departureTime: '10:35',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..PCvGnkedSsLavMFla7rtGQ.ayiEl1x_olOxj0vJ8mG38la7YQr42YlV1Pke8fFSbNAfCT5FowM9xJJy6scQhICxPTu5lSHer_FpW4LyO-MclPtviWCZGct1_vp9j5goVXMXleIGugB5S1T7z6hNSxlv6PmyNDsbgiDEkGxvw_980hgzn-I3nuarVW87Ya-KlZ4NSCQbLtxIuHYCV4PbAnAD2fCAtAwF_EGmsvanRv3m2UMyNqZ97gfYl6aSkSCGerQVXUfk0aYXaIwBlpRh423UHIgljrzruoJII_6pqNDMU07LKPXoWBehGbUUFoIqx7hb_AcejkMobj4TTn-tYEZja7EMC2sLzkPYmApxW21vaVPRRj-mXHNURUVfGQ6NiDs7sEqbT2xkynhaJ0Yrmhe2CAoWmdnZ8PA188CHtDqYyMPclZYWSPoNPOTkjclkmXD9V1ITuM6zq6qZffhiIJTfggnLy_LzyYSGiMpgykwnXvwesc6y9s941cHib85ZWPufb5WAt_nia7JELDbKY0zT0cCHd1HZex_eki4Yf1oM6dyZqpZT7W6kJiAcVIFp4FGa-omk5CCGGoGg73V9W6Oh6WRhngb5LWBnfKqrW-7Rjln-v3ypnMMXXWe4JUlRbkwQDeIBVZ0Rr5mcjCCARmiwXF3-_bSy6KMAsNiIkiQaw48AXG1atcN_7l0XP6qzQaqZuvqsYVpOBlh3cBpKbV8eB7WnycRHvdVaoa9zlKHHr1tOnD_5Xq60GdqZRMrEcfEZl0AZeMD-BEnmWWKTTh5IYkhiY4WAN0-D-WCztzis1h2ZNF0-iz3in87rpdKY1CXuwTO-ugQf4uTleZoUza5_CTBzLjGCs3kdVb3ZsEBIjUnII-314mlbE9PW9EkYlUO78fc0SpYCVpQw8Hf2qCE-AyaEZw6jP0s3kmGao0bVDD79ytlmEZS4qASTqOmuYBTFjs4GNNpytUfl5Yem_YxQnKjjNQ70O3BWRjegb4rdutmwhzVly1c7n-XItWJiombqPOQYCbyDUoO1H5iZaZyK7JKa7vCYK4SzISbFdw8Gzyy76v8lWSz6aZTJCF0sYEALLyD_rXG1eo1vp_DhOKnpZTgEEMnQ1CElVueBqKX3mAwSPCV4JmfDKptfsyilTl4Rhb41fb6BeKhAJNOQaM4OlHT-5kS529a1pX-mYiz1BcxHTdw8rDy5tyDEnGQBec1TaSFwgvBGEM2h9GEGGwzn.3vyooDnJLPMNgghkaKmVTw',
          cardId: 'ATL:AUS:11:2020-09-27',
          durationMinutes: 265,
          numberOfStops: 1,
          departureTime: '0910'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:10',
        arrivalTime: '17:40',
        duration: '4h 30m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3401',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '213',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '14:50',
          departureTime: '15:40',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..EGbjuS5qWjW98PnGc0tDwg.aqiCPMe1P0z93pfSHby1rGdZDIkmzqRp7Ry0jgyyMinK6rtP_Qw3hMCgugdzg0jWY9sjHRTdGofJQ1aYfqQDl9pZ7OpsHZ_ZdROXWLJJyemOVnc5z_4orCiRBh50Ff72WeGxpHwHnAotKS2c1epvwACa2Rspx40HmcUAeFZ7JmXDA1VF4WXCuNd3In_Qh7AhXfRyuKlY0KUyrRWxSMn3MqvzOiIWSsQaPrZyjo3-fwWvAct3bjV9_wwveraUoEQoXm_7WpUatahVggFBius155sltOpxUU5_qC-D9qVcXKX5YQscRcyvB4UZP5b6UTVLpa1lM2r1LOAnL5_n_s_qkGupkbSpoqMe4KbDZy4yhR5t8cmmhlXE0yt1wjG3WzbxOZHlsGVdfz-lH_y4lZ_nMYoMR4z14hHJI0Bx4k9zKOT96P5RlIpnBwa8JKu-wxlDSkaEYWoNtbA3UiCJ72Ekd6FCIKAyswq9Ze3vDjSOCFiNf8-vkqSv3u_Uw81nmnslFfkbs03hoPcAXTHkakl0hAqskrzVlI1NGNE2JpfGOzEYFAubgcbLj0qBwsbAs5XTyJ9wByAiu_Stdtv_fKATuaDIzNPYH9YXQ-PTF_Gcvz7__KhFBglanVDElSbYSrmq2uSnrjDDYQkqKzS2-nyyLG0wgMwzqr2mk0CnqI66mTIVVCxNgOUZVHberqpPVmAF3m9btWWgsnF28og-xOoivi5rIsNVfsNg559zCWKuaiQfybm46fKdNuWQ7XLqYzXmVCimlDj0vuv9YzVTML7HOPD8Q4FLYg4CdOtJPDu94rNJMtnbX6PFaoIiK434LDY8IfEfHKj1FPgFfUJFZ5zLFilqw7S_dfm5tFXkG0w6zVGeVvlNGIDJpQucO10cONuL2CHfCbOqyUZW_pt7CFbVK2bXiDw-pOPjpZZFKTY73Em3b7RGdP6nXZQgXx1_b5l9GVDqmfoWF7xt6D61Z9TKPbcMHeNQ5tucNDaMcDLyLrqxQWyvGdwGEHf6yEJM2J1T2yX4zvpXxF6jPYRjhB9o-eIKVtN80ZsfjSG9sgkzru_C1P9ZJa2uTbt9dHgb14yuCNig5K1iWv0uou_gCc4MiEiitfG_qoqgk2dnZeBdcwBgUImmEbbQ_0JKR1F_jjJAw6r75KNX1ktygbCbnwsvpgtJ3tJqh6EzKEQhtPphwvFtcktGzF1yrxQ_kzSDLIrK.E601vWCV2GKkdp8k9YyH3Q',
          cardId: 'ATL:AUS:12:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1410'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:40',
        arrivalTime: '18:10',
        duration: '4h 30m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '662',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5866',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:15',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ttEteG9d0TYdWSXB1tRmeQ.qdsQGhrBpOSUacKZy8vV1Vd643bXRdrHEKe7Bku34OZkSOvhgkC4cQJ8jioJxZWn1Ldb0DMQzElRh4MTREBWgoCzuRJuxowoXGAEv0FxaH2dp7UXc7NsRwyOF_xW1xb238RttK0ygKd_SyaDF6P3jMIP0hVJtN3DAVEwg0kp8_8-a69gNwQe4t2FkwDr8JuPHRdSFxlOheVbuB41TFx1MxOFm5mEkUcqi3uleubRAxM4vDqy9XX4oR57mpI5hR_tvIaxPOje7VnralGyJxW9sIzQJaryZ24ZYyMQqUt7f-uTco0hkkBU-EkS-eZbQG33PfCRGPuaABznw4rcJcX8yzuOBVVALQUr9O1Xw7dyZAjo0hpnD01lmbToo0Ur_C7bxH0Ld7q_Ml5WMsuf_TN5ST-PqoK7RZ5DuWCVhNFuoJZW_udxpOFNryou-0IGdPV7igI6V_7Yratg2pQhB01f30hhDpgsyk89gqJqZgk5YIE-EbCpXGJ-Rs5tjr2tMIpvRWfoZJetRr5MZCZ13bswiqFWhOvMpLKKBMTtEaQtpkemzms8IKuqIUZzT4xYKGmyljWrO7kqhToqonmr_Ug6ACq_jBYq7p3-RoLeJGB5yGaMQ01QPkbyaJedwylE-iXuntTnapp10_3BEZpThGnvitwU3wJtI1yZWMT5se2U2MDZqAV0RYuCzG8q2XGzqHa9xnHIxPu_kXm_taWfpjoP0ens5bjP9GzeKXa8XSyuPgtrmd8t04ryWkM2B49gWd5bOGrfw8UhJJuOSPBypc34gE8xkNptmVlTrBgTYUoRlLEA7TRIZcKhN4yz869fkrtks0-JtVGGJI0dpo2Tl8Iu5buVL40J8PSZ9Txo7iA9wT9F5_haokJsfNyCWqwgOiUCF46Nfd4bRnbj53vWPYzhoQcznP7CIMkCn6Eu8Hir8fPygpEywgm-5uaD7vi4dUFHGfXtrjGaifD0emUaMq2IkKX-b5v1xC6t_e8GJQd9QzeDkVA0T6o5lJaCCC8POBLr6xgcMxJ_xZvzn3gOh9MKwytuLHVdfhM9p6PeYOd2oVbb7EEdfKO7UDgcLb7ovfrp8dHg36iStr-_uE4Jaa8z2tUdU5S1ZYwHc6z7_e8YH8Ml7LKxBiGR3AxWdx7NibnLJoFANfTt3JhQmOuEXGtPN1EuC5jg0ljaLXW0Sth9AcK9b0_T-726esWg-WxJP_b3.dmBVVrkHbytXLO8_FkFdxg',
          cardId: 'ATL:AUS:13:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1440'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:35',
        arrivalTime: '12:10',
        duration: '4h 35m',
        stopDescription: '1 Stop, MCI',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MCI',
        stopCity: 'MCI',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5214',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3502',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:45',
          departureTime: '10:20',
          changePlanes: true,
          airport: {
            name: 'Kansas City',
            state: 'MO',
            code: 'MCI',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..4KQe56oXx8JaBi-i6vzHsw.yDeDP4PIfoEMpITQMzTAbZJ2BqM96qdo0ha8bwHxC9MqfrZvyc9N8aDFGjiriij-z6YkG-a8s95RZYNRUf4Fv4TB8cgmyXk69nmBEASV9Cei3T8G3dN90FfsEAgf-UzJTi9LzuHrakwhFb3cEyoLFbuW-2bKOJXoNDKY2qFeZPzE2xqgUzbYma02knKfby4kZ7bp8I6jPTlw1e4VTkACUt6ZvPt0M7ykuL46L12i5PX0ASLkUPAhyPtUcwJ6ge8ELZrIjpQAp5BJNVIADkqlj4VIMwEFgHb7ijMXDSWf4oh3fJ-79BqJW-MAUlIgcmLmcxWVLKC0WnbeezW-aBIIe3EeWn6JlYBkoqzzWHZ4nSXHEM6QMdTs9ccvbePCmvZlFoHprq8q6oHr7pz51cGARUrmwd8OCBz24w-bYASEbxQpXH0QMVxVp1Z_4WP5aBdYoSiBvBqgBSL0OFxGuChmQ78DxHzOJgAyULTCJkHhneOto0-WNl4vvRtn_2QgOpIo_H07flDbcIAB0L6kSviz64QZzN-cMUIjD1s4em0EXKs38ZBOg35rNzxYCx--nXaaCv6nfyImOOJyePltESpJPlgYdoNyGmFq7sFCqXvnAvzli5OG7_HKT1E8APzYvmJpwZmumM2Y6uq8ep1uRK7NpNxMXfmkFz_7kCnJKSRoqFOBsia9iPbQsflq71RMgal7DgGtYpPVQBOwtm5FgYd31zTijK00S-Zbso30C4xH_bgIDOWujcbyAfl2tTxqf79dTwKsZIvcTobqwZGShD76212k5FbC80V_re9Tf_AjMVOZ3IiliUrvYoIpfw8QUdx3JD4ANdTM0yOeBo-AuNjH4FLtUqb4Hh0Vutdg7PXzNtJeKtGsN7-_BfIXU-SF0tRLq1gWr8lJM1b8dz6ljGS9gG-9ARQkHbocmJMbYYNfOjk2FLrz7P6YfEpHJC-F3Rc0yN4LL3uCAI-7nH1lOmk0foPKMTfb2_x83vk0DCwlKZJl-lzuW_zH31fCmJ247D5X8bi8Sx8k-jeaMBVuvuMLzDTFePsnOGNdRxBnsV5Kj5O4jmY4oldFXSO8oXjxZ68P--lNb3xTQMb7na8BxMPVe5Dwm2aNwjjFUcBiabk69EQHQ-Z9RYz9BqycofSi44Kxb1UPNuYVIHzz9p_dX4-JOtEHxrM-s4R9rgOZtOH0tijaQMYGyUMIk2Dmy5wkbB7z.Iln3Wp134u3Bh_ySgWZr4A',
          cardId: 'ATL:AUS:14:2020-09-27',
          durationMinutes: 275,
          numberOfStops: 1,
          departureTime: '0835'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4939',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:35',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5Q7z8EcToCXsJL7NQ9GAAQ.ZQyI1HGUI9JIyEmvlX5XBRRkHzzZX8ngi3e7TSVNv5UlqrSf1sfw6bDVnF4Pi4F9ajvsLO7VOx0l2EH23YvcA3kcdGXk2j8akPk-i9Q6CdTY2LdNAYOSFvxnksHNratnVqwDhZ06e0vVxNYuxOf4647NT5Txq7TllJtQ2I-i4xyT7OdwF3dw6FpGxqzgX7j9X1XLk4ahOxfq_iaoFhRPTvtEImQBfi8lyCi6yAOkSnw2MbOqZyh7yE_hqAXw1uyTQ22etgYczw3nxxHPac1tHP9GXhWphHSiW4SijvvKofjdVfTU7CA3Pt1dl15_9SlWqio_0zz4I5OBkbDFNrWBvd59pPc4UkkIWmmfc4qBC21VdjFCJSEHweE-F5Z66M5bIMGzHLhtYDjqNNJox-cW-wRvLusFYkB5DkDAQjVy7RbdG_RH0CiQ8Nol4F7SN-7RVfsehtt60GUqb9Xg8mNbe6Vdn67UahIhlVl2FetmjBW7J2i7rfq-m30BcrWmMZW_YHPJihP7SmnD0B2kyvAEv9XZ3D_NhiKfEP9rCn0tStMxH4exDybM4I_JP3J6RtOO2zXsBrif5yiYS24RlnXs8DWOMtw6TzlYn4_WG2ExMaGy7aa2u2Ng38th3zya2JRDpbYClvamtTK3-N2TH2l3Nb4Wf8_8SIAHy1x7h2-GhI67XkK9hWSI_KXYO_pgNVPdMkj6uu5GF5ShNSb_ykgbAFGeGT-_2GiGx7ZwaCRDL9-m8GAxBrn6pKKNNV-bgv_N77LtSS6wu5F0PFzV2RrPfEYwwX961C2s8fubCJwYf1IhWW0Va9UlQmyTtxWpbokc-a_DTjvldxp5QdxNPzx8BZ5Vb8dMlpu5u9RLX_qfm90qU3coPWgCkhT_2hzxIvGwaOcKl8A0cp0lamP2DuFU7ri_QUIrICwswkhoI8T9eJrAO6pCwws77hImwt22PjR86GyDNsWVJkhQNrfocLWUFyJ2MwzH7eILyBT_IR-y2FkHuMfzK5UvwE1_PQnCGZzWiLYi6NGIgY7Rd_knxp0DSRJbJItptrivcXDxyMeJA_xnOdxUJSOATs8nSRQHwaK0TWg8PsXhEp2A3rQChDBQOWN-wUtmXhCsehuF2XVuIEVraMIuCNk_i0Sivqg-1p1MqynRiMBJpPzTLbWOjXuejXEYFp9rmVXzXu9NFacwQXsieM1EnV5MxNBZoxqVrpO6.KWaO5co4ALmBTMC7jNqzEQ',
          cardId: 'ATL:AUS:15:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9596',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '18:30',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..uNmvX4EjDfv7gW1rKp0Okw.yt7CgmCANf0zXTmL_c8DHjL60QXAemar_OqurzwikmRGZOYvJRk3VhKAJ8BeNAWRGwA3RnyQo9Fw8C0HVq7yihjw-DJH6T-5mtM1ryP3k0ayjwlVn6JzZK8OrLrvUJRzagES-IINm3aOqRpnxOLXETBCqC8EDbsbh-yi4T0mNhOIMcjSXKOW_u6Imd90VOj7yEXnpGmZXJFgn7uyrO1C5yqUSysr7CzxE4Ms15sjTo1w2RVKKAw7GXyhxOJDnMQzZf4RKyFHHjhMuOEkKULv4Og23FImFVcV6cvlG8hAB9vMV_E2vX70OJptVHsDfFFnYBpSn3CGgy7KBZsTMwMbpfwl3D9lIq-ltbQfuWBVACHC-XGu-3GXWJJI8-lwjcmi8P3uMx-7hwN4lMyT_DoMWfjLAk_9VEHPKT3jkiaP8QrFW_zRqiKw04mSCPDl39slSLzzT7WfoJq1qa95fIb-P7Vi7Sujmfyh2PWTBFN3_U92g5o9MLX40QnQS88QYSOKtHN4ArUsHyzpTqK37S_dDicCu0aoFgjfZ7zl6aDXo1gj6l_nIDluTvUZFKMgSWHtDABuFvUy8VdY0MLHOwrkM55ae-QxU_H0FPgoWXBaDZElkwVPnJEl7-T_OXARnBF8qfShFDEcxPkZqt7RgyDJZt4Jghm8TtupGNK7S7rm6v-Dzzug_i6hrZ7SiSMcjJ1djc-jFF4BGqVF2WmkcTtp7lHBYxdhKMwYU6qwP9hlvWcxsnW-0WBYTruo9lET-ogWJIouIhFFHZbVd9YYXZ_Axzze2jbbyQhwHRsUpDagSA7DtNGLlFfd_m-KnJL1iQq-i593HBG4asub5KbO7M2LWhshIZZjULcnuZTYD8tBSE1hFTCTQVFknpKWtW5wrIOxHK_okEC2XzaJzlgRY0BqA8LQVVFAerRAf2VQr4niSoREi-FO_pDgI0OCxcxmfY-DMoAkix-dqyyW_59YTqC4O89DP36-XmVIsAhl18CoRuWATYLzLekXkIYcLXToTsLAfG07WaDcENY7irq4z98P3euLgVBYwDCvQDXdrxG6sLDnAxHNljqoZD8dD0fa56dzouICkrhVDbersrZT1luXBx5bky4DKyvTTGJw87oKJYUHXRQo4Uc0d9wvekXEJ1bXQD5VYl3EyYvbFU-QIibxOANzF9HuD2sUciuszNW4wdDBhaj821Y2O5FUDx2BZhFn.W8Sluaj-tcoVJedFlGsmWw',
          cardId: 'ATL:AUS:16:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:35',
        arrivalTime: '18:25',
        duration: '4h 50m',
        stopDescription: '1 Stop, DAL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes DAL',
        stopCity: 'DAL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '2772',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3281',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:25',
          changePlanes: true,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..A_nRhvCsbNFwZcxb2our4Q.m-AK3ZJB6a4M4MzObKjySXqbpRGF0KUXd8tBuMW_purkwcVhaRqnNySTPzBgg7z5mEhipnWJcVQrWj8H770La_YNUxKrMYawLFDKeaeeFk__uuuyEJ3G6wuvV_J45cPhfv_R6ToO23dIGvDoSlKiAKQ4PtwZG4qVU4MH0q_gXL8_XagIAbQKILEHJAvTb7m15BeRC6E6L2-V2_ttsP2DWN_eImKG38YbPXQpgT0e9dwP9zkdFuobxucZD65_VoVJopx6D5R8l-6XVSI2BV2_QxmJNah0Mge8P9DqYvDT4zSexzcxFGXQbeBjq74oLnBmaWMXq6MNJ4awgsAHzXIhPa2aaJFtJNynzKrZpvCGVHg6m8z1Fd1IJ67gvHFh3ABA9wNSEse7rO95KkDke7o2S1hkmBAlql687aIlKV2A-zTTd4vmsrano7EjrOxj0tb1dsCHTJ6XjRaS1uEkMRJY6Pm4ePy84B6_hroAzLecKYFp1dQkBz-Dv_hRhlLgrrfJgqAgHeSwz83LUvG9xPNrhqYuUQQnb9SZvBMq_2AbDtCvjFvH1m5NpSWhk8tJyOa1GC1V3VU9ls2DxlbjhKuYgizEmlg2YNk_xQRNycTH_wsW_MNXVBuEal3JI9iQCm5Y0e2fkLHwXAjmMdDnJpLQSKsfckjRDL1pzjnLw3QwxNw4bdm5XAUVZqeq1N7elfHq0gae3ugQpX9iXBryexPI2aTLnj1ax3jXLUmsXUJMNimLGN-m0rTiItPnFCiWrNiRPoULfJXW1Lf6hUsR4fsik_yC5bovfh8UXsjsO7uCwCOoMELnkSPmnbOhmBKpDr4IPuGs2sf7sExsRMVASRbsjOOK3zy6D4U_3Yp4ut4pavmg7AVQt6fic_vMa5VERPDZK3NUICDsNyQ-4Jz4nYI_-AXTQyajCuL_K2_sUz5hixzUL6uWZ5BebktO9xTY-ufjAspElfI_df4CNuGj9zAyIWvUrVBzw5-ClGJKvpc-CEjkGU_mlyb7hygmTVlQSE_uXmu_2b7jWV-Gks_DUFQkqaf2lQOLLJgozbMjfPrFKIjuDJeCXfkpe8UVn-ZbBtrg4Lub1gW6-_YTUKYX9jiTi12ixqJ-bJLfP8zAF1PJgxPUvXC6VyE1uD1cjs-hExkSElSpsh8aCs1ZL0vl5Kto_bd5Pc4CfqN4qFkYXxZBAO6uPAeJ4B3nhm2TA4GKVFNd.oQJOuf-vuaAJ6h2u5a_q0w',
          cardId: 'ATL:AUS:17:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '1435'
        },
        isNextDayArrival: false
      }, {
        departureTime: '20:00',
        arrivalTime: '23:50',
        duration: '4h 50m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9602',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5230',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '21:00',
          departureTime: '21:45',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MX3rfJUJcfZqPsv32y6LgA.smAfqfX6sTcQMKZYjfqFPBu4DCBTxqAcErTDlZuVeG1cnQH8RwUnR-q4zpxaxqDsMdNI-w9BfpwpDh_j3EQJM11s9FiVtFAHPR-kSDY0zU2KCkRP0MdGe8VRtL-D-A6Vhnl2dk6uvA_ch-TRxhXGHmxj7T9R_TOY-mb3EGKjvgwZkgpeCTM-Zawx70av1FRbv-5JLKzYyMlokoERi_5nDgQFWwTRnzZCThwqFyhe6j-6qMdICrF4La1VuM66e7iayXBEQoYR7bTI09NxZtWCJOJ2FYTuWgGy9jCTMKYbNRIKv3BxrYEU36gGadcAuBtDBY5oRWKAEqhRs0TQKpS6Tp8IvP_4a3fXDLdq8pzUSJliVZ3_n1xkmcj3GrexXPMVKF7Zh90w8RtEDkfFZDch0LNlvYbgtZK0NcigmbmCScS91GeIODPIjjtvAZQwmD5PGySIqlAohUF5-MSy9ZAIJXzd-L6MpB9MvlQ8Pgm0PWFb3i4JFc3Zpe7Ncf5NCXXGeRHndZ8AG_CMW2W8bmr-XLzwlOIWtceLIUQ1EvSJy6ZvjgdVED7AgyupOviQHO3XE6oy2JZFShte_ZeNrWwFDBCHy8cG7gu3mFdmkYv6btnm6ijGsnIEfEi1qDewsXCUZ9ZWGar_kR0dUHVjFbAzxuXBG_NrxjnRhb6o1Nn6XW9wzExXpzbkgZK2u9WQBR65jdQXyakhrAqxcpe0Y67Xaeqf8p4Ij4IavN7jUETbdh7p_klnR_xjm5F_BSOfdgMgv1_yWQGSbkzbJUMDIn1ldYDXXgUI0-LNxmuByIhZajkpq2XUdinNUnTZq3UB_BLpzy1k76zRDZGDh7BJpybor5aTaolraUVzk9Zp8eW_FesHnRFmfg6GO3A4pTyQPCkOA8DUVFVhjVlukmieD0p56MoUQ4I-qq0Np19OrK7B1IEbOTHAhblmY-lE0xU-0SiLny-z8huYv8QK3x9cbxloGDIe9DXbLCXUuUxhWa1y3uy2VoItEsvhc1qL2qE-A0EJlo6wqaSNkyYjHAhMdcrJdMZcVACGptVh8KRLiAvZlMjeWT9X4f8Z_-x5T8y1Vzxy18_GVEJuCO3SDPWY3seYLi0Cx9p73WxTNDMdrAb4oBsmlN6m-E3VY8E4Z6l62TqI0RMs9-2KycWBVuauKQHOtP5A0toCMU2e9nJ4xF7_SY_8HbgUeXgfQzo3s6zIswqx.B4E-2N13qw2VpjTHg0cOdg',
          cardId: 'ATL:AUS:18:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '2000'
        },
        isNextDayArrival: false
      }]
    };

    return this;
  }

  withOpenJaw() {
    this.response.currentReservation.inbound = {
      stopDescription: '1 Stop, DAL',
      shortStopDescription: '1 Stop',
      stopCity: 'DAL',
      boundType: 'RETURNING',
      departureDate: '2020-09-27',
      flights: [{
        number: '4837',
        wifiOnBoard: true,
        aircraftInfo: {
          aircraftType: 'Boeing 737-700',
          numberOfSeats: 143,
          wifiSupported: true
        }
      }, {
        number: '3589',
        wifiOnBoard: true,
        aircraftInfo: {
          aircraftType: 'Boeing 737-700',
          numberOfSeats: 143,
          wifiSupported: true
        }
      }],
      departureTime: '11:50',
      departureAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalTime: '16:25',
      arrivalAirport: {
        name: 'Amarillo',
        state: 'TX',
        code: 'AMA',
        country: null
      },
      passengerCount: '1 Passenger',
      stops: [{
        arrivalTime: '12:55',
        departureTime: '15:20',
        changePlanes: true,
        airport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        }
      }],
      travelTime: '5h 35m',
      isNextDayArrival: false
    };

    this.response.flights.inboundPage = {
      messages: null,
      header: {
        airportInfo: 'ATL - AMA',
        selectedDate: '2020-09-27',
        originAirport: 'ATL',
        destinationAirport: 'AMA'
      },
      boundType: 'RETURNING',
      passengerCount: '1 Passenger',
      departureAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalAirport: {
        name: 'Amarillo',
        state: 'TX',
        code: 'AMA',
        country: null
      },
      shoppingDates: {
        beginShoppingDate: '2020-09-24',
        endShoppingDate: '2020-10-10'
      },
      cards: [{
        departureTime: '07:30',
        arrivalTime: '08:45',
        duration: '2h 15m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4583',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KyTi8pBXChsRLMQMe9j_5A.njN5b4YfWHH5ueJBbUxwm41mowFcv5Vy2HznZFQK6yGME26ugfhzHC4kn8Qr9bSLjdisevLCM8vuVOocjGksAvsAsb2OT7zG9rY1BQ8674DHFl4oY097F67QF9CQaa0VfNUzTysQDW3fjpGnmB7B9YdO0RJwbNUW-ky6V5UXZyG_zjz3Sa2tobJoPCNemIz6hzN4iOb65g2jNmwvr5pnUZmQfb0meQR8_7WP9sBQ0UXx5GaBZGAIzj4l2MkQ96pCoj5INllckIiFpZfc7ITQJJmuzvi-8pA7hd4W8j5YwhPP8KrF8Iss9J0mnp9YdfC4i9LF0UkEgtrU5WM61mfJLLN84LOgKBxX7nxfNvlCrZ5aajSaSjipiGmFf-s-mT64-Ql1WvbCYT3aQa2WdTXG8m-tUpkV5_UFkF8TFPDbFuIriZqdG7B09-v8-13qK4esjAS-e1CvN7RyuWbafVMoVhzqOZL6ntfQBjJe9HV1jhmvJF7MEMmqUiw4zWPPo-2TqWZT0d8lKgMBXajJ7O81W8qB2gI0erkXp4b0MC1O9RU834GmSeIk7HvIbet6WS1G6EmpjxDNIZUnbLdLrTpvbLI1cqCbPDvFux1Z8Mm6aptVIhUm9I2aQugI3nRs_tzd6zG7qm9KfQiqaohqDPhBDn2uoirYNpq35dPvUks4pIQK5OyQ2BJ_oQ_Hmj0S1zio_NPcKVT7sTo3levhhHJgn-Q9mPPj_W0rXsfM1MZw8wkVgIc_v1QnT1b0KD7y3eL3babEhCovOvRhcBzXLcESYIkkLNyIgF_ww-mo6a048rxxIR_J8CL0nctMHBcddV2Aw6WehFTOr3aep9MmfhC6ZScCO_NnHVbw_WVcamymZ_s.PCy_vjP2Jij3tOWnSoT0xQ',
          cardId: 'ATL:AMA:0:2020-09-27',
          durationMinutes: 135,
          numberOfStops: 0,
          departureTime: '0730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '10:35',
        arrivalTime: '11:55',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5664',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..O4qkOXSA-gmbPjdMQymghQ.pD1PmxdniQH6qT6GUnd811-SkLInLpW-7-HqoKaBvmHDa3Tj8T6veCpHm-CX29TzSFYvtQE1cWk1vcCHQd7K2l-v8-grjAgbg_kgSmw8cd0B57nV3tPKvZ31R0zkDMzZAMM4AwoVd9Deffb6tOu3UYkCRp-B7tYxU8ZnCSNFg3erXDIkUNmqejm9B6ohCS0SMLmMnOPSCYHUiEV5QXhwwKQEh8tqZYHbfPOPdrOPTjNaP-NYFRv5BPfzVjfBH0oY-twckyOq5XhJiaY4eIzVmQineKQDCUMximAiqcwOieLCD3qK4MaYlwA4Y8lEe81UCxrUqN5BLiWQvavePbhffhEUqB-Bbea7kUmMbgBy1l-UiCwKIAwVYOntVBqx_BT5yEAt_leG6w4gjUyxMfUboijSzIP79ckt2sQv8_xcvHDckiOc_4vPG88G9Mn_7h9tFyy4NygXBOwEBGfVaGw2y-Cd1GpB20WZZlId9nPstynYTcf2qrVxlkRZWyOUVV8VYW3o2FNwGew0NG_cLof2qZvSQe8_LGIpxIbxdsn_E1CWxWWqqwNISr-8jMcVcENS1B98UGseWyeDSTPL-TDv6BpgLMoECYcUpqR9f6MiZUaDeK9QY488FICal0-zzuXq-KAXToxFTrpjoMKT7XoaUL1O5BHrOGVao3MCy1SqErtgSG8SCU-Hknk2H3jf-j7ejwvKNJeQq5f00_K87sgwKLjW5mPrcQAhKE8VJogMSfySYLyRjp_E-FKGt6o1nw6xCI43wcvIM4vMwaM7rnThLDjBY8vqeH71Ik1v8kgorM6lLEEZWXzySRiM2goVXbEjlYwDBk8jxDRm4Mptm3j-SVeXW2f80f2suWngl13l3y8._FOhHBVPG2pdNsCzF4omVQ',
          cardId: 'ATL:AMA:1:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1035'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:15',
        arrivalTime: '16:35',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4094',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..0VsI7dRYHmp8tmeU50J94Q.bCbV1jOjRJBAQwAj7zocvRhsdEGimV6E3R2UusBa1kTIC41OjJ18av1inCxoB41BjL8_ATu7fzmWg9duHiut2ExBtfY58NThD8ufQkKHlGkeAGwMpXsh6KWJFCO7p872hYJtFO0hbqBQY_2sceilm2VGjwNsObCWTJR_2ViwjdRUFjkkcFxqSgb-8UUfhXiwjGf2fc5lIMsdLLKaxFbgkK4Vu0bo-p059M4-zy4StUiE4nvR1wg5dAQPDdbkFp7rnY7usDPB1RW7WAuLB2C6BMTonrcgiVvj9Ut3b88lRDUtmk87tuTaH_N22PS7Uk1EU1RCBdt6f9_RTOiakEYquFaVSuzPqkACpg19NRqd4dm-lQ5Hs4ExzW0pyq6UVOLrBN0ygLy8mb_0kpcDugeCSpsSxm1Qq3dp_sPHPn6trcf0DYexFmidDnnjmmYMBNNDtsw0OnDwSWYwwcklt0zbffEhUPEu-UinxoTyxtvokjbO9MMb0NF1JdlJuivCpERZdZHc5QPI4u6I9AwPFITy_CzDysCgMDc5dBhKm0gNpbABaiwcTgM7HbFBXaQN2AiJmkQrU081HVlcFLPRmMEZP-WCw7zmPYgC_Oav9C9Uzcxly8A4rp7wMMLivf8AEd19nuMcECT3YHXTIdmA15TvsgHZioug34_TZehAhsLEde2rhXwLBbi5rzNHjWkb34pQzVd1HaPIce48zjr1xkV-VlkKzZfO3K2ugOP48dwrev5Ef9DUaTkBkvmuYEmsoYlTOExns6fjiup3-0lBjQrKWJT6kwlNwuEiU-qscnbsvSpw5TFADdvnyiF78TrCTEWT1n3BkpJw3Sy2CtdX70gqsgafQMGbFd781SUE0KDkKg4.cfQoDv70me3YGw1yditvgw',
          cardId: 'ATL:AMA:2:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1515'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:50',
        arrivalTime: '21:10',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3519',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MQQP3zjLUx80ltWn1FxwtA.Yy_zoEjbKvjs0f7thhbhAaIPYqEGrFr6SEMHI-x9MvqryWq_6G90drXnX2sEYm4CJS6DjSR8VBt7XRsdArCkbPbXu_OsVde870CBcHpE7IYf8l2OQ-NJoOlqojzbwPZ8d-4_Ule_qFM5OLyrkVt5W5F9iMu5PHlF-dNQqPI_viHleE1VioBpMprMj8rS5ryt88o0rZT414pWjXLnR0nTRmmC9hFxSiYT4fEM--tz67vOedFNc0JP5sZJJJo-RFkN9yPtqDzJF9tBQGQYC-EkeJ__GEf1rplhMxWIeLOOoGxCoTwksgTmVCBiUEcvj2UhBuqHq4wdL5SPMFhfghhzj8w1KMb510_pp1etMYJu6QfDZ9ZKVEdFKtmFtjcGwt6FPmYnUHQZeR3c9e7dKOOjrqvcKya-xAqVDREN3eX6g3dDNlGY48_ua9oNT65NWfHfqsnZagdJlhwj0AlnFGM0ALSM-GwDGHb8AlhhT-cTue09KahBOkfEXHRmif-ss-ifFZkPAaNDH6z332uVECougO8VWMPtgsgI_nHKj18ERZU4vxCpcNQALCoI81HcVHVp4utPXSKgtnnyhmWHMECWQd4SnLFB6AqN0TZDivGBjbhnpKJ30iAQnj4xjCHmqmVdM43UE628ltmP3uXYjxOn1GyLZnUzpj95lgSzsf6uoY4WOKcTHdU8vN7E46VYc9CrGbqDb1Ou39phNjTKlj1AdZl2oIlYIXMqueSVhrInbasfDGzLwd1tyrPVCVgI2RkUQjl4-k2Ui_1UQNZEiqx9rGRsfUcw-VpbVVJe43fDvSDaJ4WwCXL0Mb23KabjvJikZrk0VZyCTcxM6eeB4jdnCbjMzGzKJJtnebn_T7nrg5Y.DsIPFr4bI0LbQEAdaxKAhA',
          cardId: 'ATL:AMA:3:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1950'
        },
        isNextDayArrival: false
      }, {
        departureTime: '11:50',
        arrivalTime: '14:35',
        duration: '3h 45m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4837',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '12:55',
          departureTime: '13:35',
          changePlanes: false,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..-uOsrfXaOofdyTUG1Up4Fg.G9eMxGc410dTzERWxfHilTSSh_a04P1bXu4JgAmvHMEqLPLHzuDhGd6JIIN2vCBFO24mRPsUYqFF8IwEucUAAe0Lt_cpRJzQrmPOgzXQ4arNaYrMFxVWpW2nukYbsxwGOxUXKA0wJ5IFrMLzygKypKoZsOllWSheTDq71XJjBeHIA_uvTx3d7Y_ooKuHmqPppbXpUtZF9gJ0fUIClxzi9F4SOHnFo8ba1HVQx-SB97FCWh5sCNpaSmLkxu9nFKlH7qDy1XsVL_QJ-Cf5Khcy4gXJs3RHoJ5h65hbjSZUUA1YVY2MmMF3syL_92a0vzJ-7HN_b5cNnxO7XyWy-kbmqvD1dyWTxK75DzWkoc9VabHHF1F6VQxE1pPK-2eT6Tk5p8vBXwnS2PC3ol9zodgklbCoYzfevfjWikvQXtW979zhvVFv1p9FDaNao1nNIuKPV3NPGtPavhlzMrsVPow78iO8Q9g_cu5uEBzq1uDP7urJWGCY6s44-UTOHhI6jUwuPHQjB5fya9C9dGlb-cfdPLBM1pTgmxNRgndbM-SSkj8tcmljVsatsbF3tDls60SYVHoRt9i9dc2dydE-DxpNWX1vXPgXdc6w1hyNXh61QBIqtB0kaj0s8ZHYYj5BIj9zItt_WMshtEe4e6LjGpa7OAibOeVsspV7A3F0yTYec8hrDg53_e-oYgKx5VsY9yZkVAqtgM3pBSNnU3E2gWAaylEZOUtcVbi8N5EGj8GiF1KZ2TBTPFRss4IJSYPY_R6sPKqadc2CiTZ_rlAtMMzOmL6spzDrpDCfGMEOWLiP2xnuzk0l9Wy7PGF_nqyH3ehtL760vpfCnmFvtnEZpk7S13i6WaxpLfaSoPmFYo17nys.pgdA6ax9qO10UsVkuvKz0A',
          cardId: 'ATL:AMA:4:2020-09-27',
          durationMinutes: 225,
          numberOfStops: 1,
          departureTime: '1150'
        },
        isNextDayArrival: false
      }, {
        departureTime: '16:15',
        arrivalTime: '21:20',
        duration: '6h 5m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4303',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:25',
          departureTime: '18:05',
          changePlanes: false,
          airport: {
            name: 'Denver',
            state: 'CO',
            code: 'DEN',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..f7hlfZwhw9q-cWPG2Pxx6g.VOupZY9hrTT0an0CMYwTPZb0lAwzJn5Eyvu-hTaGADopq48ueYqnK9tL9Au6rqYTu5qCHB82ej3Rrdu05gC7TWFsZ3DTGpdvmigG3x5QVIitEdSDCVzB7XU4viy8ECOw_NnE0MkChxeuiM4mXm-yb8vy-uxYEFBl8OXw_WE8tE-w2wqganjEDaP8bCr5l_P_TnOJV4WRVuCX_hJWcXiybXsqOpkIq_x999MvMC2MbQ_9tuiDritfRIKX-DdEC1Y43oACg5zHgfwfUzzt8Rcgz3H1ev3Z9iCCyRS52zRry83GGLAfwKWBj6whKFrEcsuEbufFnvCECGMiU0SamnF2bkYEnBKOq-sfimy-alXsdZJoarHdy8kysRyDLvkZmM-V9nqJ6GZ6Z5yc_6RUVVZzrizMqT6OAxKwtySp_bJpnhj_mxzvuytJN50QPP0_lvL89X5Z9mNsJ1BwReIDxecI1RRknh0CreS7rxhg-V5qSsnzjvShe1rSodB_Q-D8tguPbjLCdYq7zsAnnbFhiXXFLHt1O_9LrzyocV7l3cVREjWoBwMDjVcOjn4sMFCGkXNIZbDYxUlDhXBMdkwMLqkSm9rstBmnOJDmkCbeX9nl5DRkUPMzkoreg-_-F0JFdRounfq99oAImXXlj6J5k_eNn71MjGzmGgUwOFPp1b4GL6S2yFlVBdi239Aa6rro0eIKctYd1YNBYWfNbZ270Xy5T_6b6fqh-DUulQBYCx4Azi5czVPhIXTy0vHTyuqS215pKy9Jp8BhxmZR6wFJyJRlvAd4RIVqkCO58AgDRWlQ7_srzQLO9pDGQioIBDs6QCXv3tR_q7IJ0aE77YoNuA_Zozo4zIWBz2rkS2k2aogDv2c.ouHaXoQHLMe9krsWnTV-RA',
          cardId: 'ATL:AMA:5:2020-09-27',
          durationMinutes: 365,
          numberOfStops: 1,
          departureTime: '1615'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:45',
        arrivalTime: '22:20',
        duration: '3h 35m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4106',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3357',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '20:15',
          departureTime: '20:55',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..rlzEUKxMzdQgQ17FWeDtKg.i4VR-lVBwh6trhiqr_9vr2i3dWfB_vV7-HJF3Fth5uAjYvyXBoaZLhk60xZjuIIWjI3trmapSn3c7YrM8l1bmMEEiiOCfsTIHw8VeC4Wd7WRbd8beiJK6jVHnyCINYYdlmtL4RPjEuZhR3hBRXeoEpMqTEuBtNAKTULRYY3MjTyLgrPEszQERNfk3z_6GQcz8WkSDogpxB3szDf8jLHF_KIunrIW0OUYRPEbMnD2tf_DBAZPzaxtWEe6LxOhNj4GeZYtOtl1vPaXUSdk518ZXXBpvM64x50R1_JuASZSkFFAxWh3VHXZqrNXwYrSjaXVqdnWBo_bZnbjSRwyLPFIMwcJ9q4C7EAQcUCWxqKPQ66ta-Sfly4oRGZSf092QD_C9--UDTuypI2XXi71cG-1tJwq_nxYrd8gfHwihqla69cAvkYe8xbC8AM6iEiWGdnm7-6qFywjcNUDOS6FypEJ-CBaHDFccy_zHb-RorgULrwXaOa-pYyEMTLclrVWaL8IMz3LPWWlSORO-XzW6mLz_EmMvFJsVH5KEbYKr_z0ra1zXhxfZSvYRqgj2iOqzNQUoa6YQhI07QjgYt3YVSVlC6PL814CtWJGD8eHZ5D8s1OkcVJC9nFdUrBKEtosIB73_wUWex-usnieVoiGjXvV3qdBABkpgOkVv5WKSgNRkZK9BE4sDjs5KR9H8pR6XZA0j9NC8aUHur37qxdTdNHUCC2uqqKhg59xZZxufpHLNmeJOaggyJYNSpeeRfHW2FIZsgIlXa6Gw3le3E62Y5lt48jltYsXn_qC4riJ2pu4Bm6N16_wjL5Jr5m9KPqxi8yTJI0USZUhy8g5s9XxmCzck5P5bJANszLhnm9N2Pc8_tASADGcm0Gol1f-rziivLWoqnEqIsS9rgKsje9K0hGJro7AeU4x7imopvYDomZyzgKdcZqv3ZQP9umFaND5QJgYqaF3tze-7e0sbaip7ag4G6_wG6y5lTuILBs8s57xIG_WhNioWzNY_LANNxNagIy_WjqWFpLgs2Se2NR008l9NBAYQPUa0JEPSiqLw6pLmUldVxOGgDiKKnQqBtFMMj3k0ISWIh45BZrFRt3kprK3O_jBjikYVXRd42X18XCOOWRpFKkJCU8u0PlhmgwPFjEtULm36IEmkxMHXJwD2g0wrmEm4isbt3av87emCXG1FlPI-MGJJJscjl8THRROn0L4.MUUWuG0iGfc5F0byglaDiw',
          cardId: 'ATL:AMA:6:2020-09-27',
          durationMinutes: 215,
          numberOfStops: 1,
          departureTime: '1945'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:55',
        arrivalTime: '20:35',
        duration: '3h 40m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4270',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3704',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '19:05',
          departureTime: '19:45',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..k8A4HNI_K1XuTPwTpShN5g.MmZhSRW6eiauNONo1gpWg9_EYSMNQnvlnWDi0bYYPRubAJgfr15EMrMMLXiL7djrA118LFDl4Rx1jAuz2U4srJzVUYoUKQUx5B76mJJ44BMAdR8N0cKoKK9EhJ7shDVLcuVKQZv44jgxQ7G6F89vOy5WUyInUa1oKOm8S2m6l0Bc9PnZELmt5LcPwc8F7dqBVMbRrXwXTG8QOVPfluKM30GtLS7zRa0xTnGkDaLrhyNV7n6NvdEYvlvZoG7ZshlfHcxJ0IhaHynSZw3PBLHVH0MrueZWKYrsyMKybOzSwKb5gcRpWKNEIPdBSn_k6TE1Ia524iCVtw2FJ9Pd_s-S95Wyl2lKhI_xfuQk_zmmcRtvJw8GFKhgJ-7CJNDw6y-T5kzBE4lgZZzg2S1D1zLWDk6BqgsDb-3ao9Ogt0P0KUfn7-ky3AAkWUoxMxIlurZBx6GmurI1Ud6Kd5GBovmOgZtxynJ7xIV1Zedfo1SJ6UQ7CtmmbLpr6XXpabbiR3nOtVOowk8OS-7nPtugTnpv3L-16JIefsL2DCz0pEFDauGuhGUgY9c1KkUhYA5-twHlbdBZoAtKzyNR3fYY1UjXLScE5aSkWS5gabuupMZwBnC7eGvfd3oc8s1e7nzs6S1tRNcfQlawen8vgdLRbVIIFIwp29ydeXEgwIS8osoz9hT3PEkRBOL1hpM5-5qle89Ka5rkXraUUPPAYvKjApTIVNxlpONS_6PUGHLOO6XDGEhMRNteqP-yt06YfCE0ok01w56LpDvUKl23mjeaKlbg394kO13HFQ1OPdOWxXas6CmYMACwFNNQOFCKUcnCVn6E2VhoTY6gGweUqdDnEDmoE4921Ir-BHecGyYIHhHJyRUdaOWc96R0pP3lvo6HBBsHICYHerGUKE8LCQ0tFulOj_y6hItL_LV71n1ihYYbLnIcdilj1j2Jcg7D2hZ1pTBz1o8C2Nqdcg2R4z9uFH6q2gJVkuBosWzZEHe2OTCd8NxQgtkEwqAvmCoC2QS9Wn5wtFITkkfY38oXtB7wX0Y8xMfWBq0aWk1UouEW84K_Ey3CHN95zkFAkv9EtgNS_FQbsnWR4r-Fd91XY-OPGD4eH1oosrkAD3OnDVwanGQiBeJA2h_hmT7-40cwoMetFu0iIQ1hs8MGAV7vXF6nsmbK2SttXbjLMkiCbNo2JRyMal5hOKHiN3ZmixOJ01t65xEQ.Zibk3oMMawwKVniblj9-3g',
          cardId: 'ATL:AMA:7:2020-09-27',
          durationMinutes: 220,
          numberOfStops: 1,
          departureTime: '1755'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:30',
        arrivalTime: '11:20',
        duration: '3h 50m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3418',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '2942',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:40',
          departureTime: '10:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..K5AgTnNYq5Nw5zIIAgJa7A.9DbZIH9_e3ow0mUvPMCXRyAkbrSnEaHv1KVOgh88E8IXj_HeMi3jlkGlJ4RYz0ac1E7VWF9n-Y9lBap95x21Q1Bq4jcdHRw2XECLPkPiPDtYHT7QraQOm56ofJ6OmhXR7Go67CMpF1DgJqKJFtJDsNv7jS5Q6kEK-HPE8qQAmig4McrhPs7vAP7kMEutwuqos8v1AIBEQPoXR8z5XPkZ7Pz8lnu04iVOvyER9FrjNmoEq2YGl87aAKnS-NQ1sUqjcY7LJG9QJC_7BjkE9-o3oGahlfDK6xLDYWPZlo5R8rrrJZzSsu4Q7CDsaSTbXaNvHZAV1pDakpjsPyijVcTAruu7bFF13Sn9biFr4elxMSEPNI41-yvpvmQBVTpoIEDB6WJ6ASZwVPbP44Ei5WndAF9dc6yKVoZf50VcVvXETbHksGXr6VxMe41MLxzWoWTh-TKnUOk_bjSKJghGtAuhG0GaEFcWXcL3NWTGz4N617OEY221QQwKtWk9rp11p4RByPDmNxmNRISZg-B67Opg1vqAqAKcd-WZJhDTY2JN5ja4ripQ0q0gToyIs4kc3nbqRwrngDidb2tgoOU8rWdVwNcc2qnluWGRLU2vcSL4e5PCOoA2Tq5eFnNlLQ6diWBLytxwlyP6Pt6eSHK0Psxx3HdU3Kedn3-zOdEaVEVtRQpOyGaldYCw-ylj-hI-hFAlod2TazPbD131Nhd6gsSzEQG_E7n51NL_X6vGOOThR63V0UeUN-v8unD26ALm0Wv1VfSeuSseBWUuZIUDn3BByK_InGfotr28gNC930C5rWU91AqngbAeqeMcOq96ADR1GDZS8eV_h7tnSsLM80zN_WHwHQOeoMucUMSv14B0E3i6j14keu3J0vdHo39xnpF2IDonf8_DSr9pujA9a9xBb17RoZU_Y7BVrZwDlFThrwBgByXa8mQ0XiO2GVmI313pe0Vwl5pHmaDClM1uRIAY9HjQTHwnkt_0J4hCh1MGcuRoVtCLEqNS0v9IrjuVJvG8eUaUOSNkFQtFRW52_BrX9DBBLHfeBxj1PaSogWB3ElQ-PcxQgUynFA3AxGM72VdwgzMhY76Z75Xcj3e0bt2us9TdActbN31U4XyWZj4ZCB21CxCUsMvM8YYrDR2hTOnONpoJcxnvrH4LD-86_1kW1U8tmmx85ROc9qTYEnk1anGmymsaZByjxUsQvTFwFsfG.NT6VAUiyhnvK4Htdykqvsw',
          cardId: 'ATL:AMA:8:2020-09-27',
          durationMinutes: 230,
          numberOfStops: 1,
          departureTime: '0830'
        },
        isNextDayArrival: false
      }, {
        departureTime: '06:20',
        arrivalTime: '09:25',
        duration: '4h 5m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5926',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }, {
          number: '5182',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '07:25',
          departureTime: '08:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..TRk1AWVdMjRdyhGLjtX_9w.KnDGOvfZFvM4Hm2oZAQU-Pgxh4MFKoNhuB602LZ2mGlBeNaWL0EPpuZfWSLpvC-1fzJ_ULbWjQ2WB3m45E81-P7kJXBpRopCcyaCn36S-woNfA7dNqn3Ua8rl3x9H9lOlvwOJ5CM3KmnJlR-T4IQ3I-v1_uaBAlFOOzP4BQjmWtk95cg7_syfgV2NuVGrMmTwB6p3LnbFvbyFkeyXOAFE-29UJesnsZroUYTlP_KxPLCMBNbJnD6QD9QBLVoCuFyI0vvZ2G3TyuNi8S2cp6ikqYy6Lq1eWYs5TnZ5pqcB-nlUZ6hb3vGCMhxiDADBH9w1aNcwIfLlZjwZ9DnveQbL04oxGd2b-yVYgivs_10KDe2tH_opGAOi9V3HkfACYvInSkWfZa8rnA-_J-EArtilMPguW0d4dAETNYKWnQLxgLdBWWJXaf3AGgcKhnQ6UO6zM4-udqYG1DNOPPh5bUAZ4uNOcTG_u3zKtARyzbGJKjBVmYGR6k-gosUSxwG0WWNDTj7FF0gdo6EAHALt5ayjoO0D42ZVIrC-Me5Anotibxe2AZ0O8jfXiFnThxiMytJiHS5oG4BK0q3HS6XlaD0o8V-d8mz2Lvwz2KvUGBAlRC6SEw70GtHARNNYrFw95wUMxDAB82rTRMAkAy82ynKS0hqsZE9dXYl0ZdLUSLEgrs0ViUGhpiGCyrh7Ye_8664dVdQ-UDPuKF9ffj88iaY7jeCeiLRs7ettu14kCrECFkA2ozR4B7j5zeEaggttHeOW148AbZK5oF4JMznh2dPMKEmJYAgZXgP9l1iSF_QEc2x1063LIKRrsPvkvqPEbmV9FoGrOsrghgvrs94W1VyS6eXsSl6dOBgEIjB8Ovz4b3U3LRlysIFLaBM5osFBQNjQsvNSXEYdkvCocPtNKBre2NCg6kFspl1GS-H3olLvfihVhDiGuZ318UPSAr3cW9vPpmMVdLwhjdkepPZM-CapfWR_Wl086zAWQqaaenKHnPhb8rcO2eU7PK2068OH-m-sdKkHKK_RYu6p7IcFGZXI1ide1lymev24USzfpsSS1Czkqx6DnXAM_S5OTHAlaUGSEwPDaWnn-8r6NvBYH22AjYSZDM-XpZ3leVDHg_B6Gwss4g8teTXX9r70bhC5-nUqypnUco1wTQlNYVz7xI1cAqFotbSRvO5hi4XwvaaGJ-91gFVQ8707rjzWqPWrmac.GxiIEnUuGizh1InJNohHsg',
          cardId: 'ATL:AMA:9:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '0620'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:50',
        arrivalTime: '18:55',
        duration: '4h 5m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3732',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3426',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '16:25',
          departureTime: '17:30',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..V8Zn9ASHRShVHR3IvZgNlQ.Bju94pKAYSvHiYgxPq1wugc2uJiiQWGMP3mUYrYDY2irDZfPUVnu34JTbRP1tb9SNKE0fI18afvEexjdqEZ34yGAFrXNaV6kL-z4pgaqF8LEEvs6U7pkQsyv-vkB7yaZHV0HTNfL8lvi2DQDMAk1QFGpupsceb2Tn3smSQkGAzDH5HG9dCryCEkmgZp1vmDGSlN49SK-bfzozz-F1Epib1OTDOybPHiLMRxRFZeDYUHYnt9pM3nLujHpd8TBUpN3qGksicHpvTlcR9Zl7uQxq1JuqqgZbrY1LXf2XHIX8Lw7cCiV3ZWKUNnuck7nwxjs-ObekAtrLuWznHdN3ejMXbcLJ6I2kiCkSikhE6_rxo_SFMaRqGn03S3knGaMNWBHtVoxPWryNnyjb9ZqSDo3HsWXNYJp75AlKvo5Y90gaKHKKCS7ejM_HTgDAL5VZAnEP_mW8ag7Is0Z686gwYhUGync3GLxhmE_AWTy3wVYBiCNOlc1aTrIvFWuGppzedyByLDm7OH1k2Qw3Zk63JntQD7ekzh7p1bLTwFBddwvkSowoyAgdPhzoLHkHcM8U6yL_8EUaLptMaggSu1jYJlMM81DgEC4OAQXBCPOplLw533eUCrVS9y7HTSq21UmEEPX8ChxRSirou6vfHdF43BhcX0uJKb4cnuGUdajDg1Sh_irEWYIUJm60Twci-ifGdcH8i1q-gey4p-IIuKWKLnL_cYenOKhnBv-0Qtyxwc8FGjUWpSUk2I4WqZvK9SvdB6L0zcHTzdcvjlA486QNamRGqsSljN-8Utftj0A3yLXltPNVyX-A2kQk4eKbuIdbbLwE1jO_rtgUe0NAzrsIQ_JBhxMTCaYMXj80twS-TL6TOOOwSsSjDMT-80DKimSTgFB6pee1hyVHZacvAX59FMAwPehY-JTr_UK0kGGmsY6Vy_tA4ga2T5_qaC6u5yvPd0XZ3BkIW8uXqMzkpQI8VB84gj3_56xHhl_ybRna7L2LxDHe7NwEuh7xZZNU0DK25p4O2VLrCzpCrIq_x_7Ur_DrGZ1l5xO2m2uTOy8oFKipW_m018jj-5LeUG7iUBrVBn0sATXb64mYONkvTSU2eYB0pumGBMN_oMK5DwOeUf1wsXpnJHKczTfBNF99tPdJM_j_XLuadyMlXbVCAIMaAjA_Uv0dI5Mv5RDJjjJhLabEf2mdicER1HdmWWRNlQTxcmI.JdYsYWl3UfK6z3Q4N_vUDA',
          cardId: 'ATL:AMA:10:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '1550'
        },
        isNextDayArrival: false
      }, {
        departureTime: '09:10',
        arrivalTime: '12:35',
        duration: '4h 25m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3138',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '4746',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:55',
          departureTime: '10:35',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..PCvGnkedSsLavMFla7rtGQ.ayiEl1x_olOxj0vJ8mG38la7YQr42YlV1Pke8fFSbNAfCT5FowM9xJJy6scQhICxPTu5lSHer_FpW4LyO-MclPtviWCZGct1_vp9j5goVXMXleIGugB5S1T7z6hNSxlv6PmyNDsbgiDEkGxvw_980hgzn-I3nuarVW87Ya-KlZ4NSCQbLtxIuHYCV4PbAnAD2fCAtAwF_EGmsvanRv3m2UMyNqZ97gfYl6aSkSCGerQVXUfk0aYXaIwBlpRh423UHIgljrzruoJII_6pqNDMU07LKPXoWBehGbUUFoIqx7hb_AcejkMobj4TTn-tYEZja7EMC2sLzkPYmApxW21vaVPRRj-mXHNURUVfGQ6NiDs7sEqbT2xkynhaJ0Yrmhe2CAoWmdnZ8PA188CHtDqYyMPclZYWSPoNPOTkjclkmXD9V1ITuM6zq6qZffhiIJTfggnLy_LzyYSGiMpgykwnXvwesc6y9s941cHib85ZWPufb5WAt_nia7JELDbKY0zT0cCHd1HZex_eki4Yf1oM6dyZqpZT7W6kJiAcVIFp4FGa-omk5CCGGoGg73V9W6Oh6WRhngb5LWBnfKqrW-7Rjln-v3ypnMMXXWe4JUlRbkwQDeIBVZ0Rr5mcjCCARmiwXF3-_bSy6KMAsNiIkiQaw48AXG1atcN_7l0XP6qzQaqZuvqsYVpOBlh3cBpKbV8eB7WnycRHvdVaoa9zlKHHr1tOnD_5Xq60GdqZRMrEcfEZl0AZeMD-BEnmWWKTTh5IYkhiY4WAN0-D-WCztzis1h2ZNF0-iz3in87rpdKY1CXuwTO-ugQf4uTleZoUza5_CTBzLjGCs3kdVb3ZsEBIjUnII-314mlbE9PW9EkYlUO78fc0SpYCVpQw8Hf2qCE-AyaEZw6jP0s3kmGao0bVDD79ytlmEZS4qASTqOmuYBTFjs4GNNpytUfl5Yem_YxQnKjjNQ70O3BWRjegb4rdutmwhzVly1c7n-XItWJiombqPOQYCbyDUoO1H5iZaZyK7JKa7vCYK4SzISbFdw8Gzyy76v8lWSz6aZTJCF0sYEALLyD_rXG1eo1vp_DhOKnpZTgEEMnQ1CElVueBqKX3mAwSPCV4JmfDKptfsyilTl4Rhb41fb6BeKhAJNOQaM4OlHT-5kS529a1pX-mYiz1BcxHTdw8rDy5tyDEnGQBec1TaSFwgvBGEM2h9GEGGwzn.3vyooDnJLPMNgghkaKmVTw',
          cardId: 'ATL:AMA:11:2020-09-27',
          durationMinutes: 265,
          numberOfStops: 1,
          departureTime: '0910'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:10',
        arrivalTime: '17:40',
        duration: '4h 30m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3401',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '213',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '14:50',
          departureTime: '15:40',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..EGbjuS5qWjW98PnGc0tDwg.aqiCPMe1P0z93pfSHby1rGdZDIkmzqRp7Ry0jgyyMinK6rtP_Qw3hMCgugdzg0jWY9sjHRTdGofJQ1aYfqQDl9pZ7OpsHZ_ZdROXWLJJyemOVnc5z_4orCiRBh50Ff72WeGxpHwHnAotKS2c1epvwACa2Rspx40HmcUAeFZ7JmXDA1VF4WXCuNd3In_Qh7AhXfRyuKlY0KUyrRWxSMn3MqvzOiIWSsQaPrZyjo3-fwWvAct3bjV9_wwveraUoEQoXm_7WpUatahVggFBius155sltOpxUU5_qC-D9qVcXKX5YQscRcyvB4UZP5b6UTVLpa1lM2r1LOAnL5_n_s_qkGupkbSpoqMe4KbDZy4yhR5t8cmmhlXE0yt1wjG3WzbxOZHlsGVdfz-lH_y4lZ_nMYoMR4z14hHJI0Bx4k9zKOT96P5RlIpnBwa8JKu-wxlDSkaEYWoNtbA3UiCJ72Ekd6FCIKAyswq9Ze3vDjSOCFiNf8-vkqSv3u_Uw81nmnslFfkbs03hoPcAXTHkakl0hAqskrzVlI1NGNE2JpfGOzEYFAubgcbLj0qBwsbAs5XTyJ9wByAiu_Stdtv_fKATuaDIzNPYH9YXQ-PTF_Gcvz7__KhFBglanVDElSbYSrmq2uSnrjDDYQkqKzS2-nyyLG0wgMwzqr2mk0CnqI66mTIVVCxNgOUZVHberqpPVmAF3m9btWWgsnF28og-xOoivi5rIsNVfsNg559zCWKuaiQfybm46fKdNuWQ7XLqYzXmVCimlDj0vuv9YzVTML7HOPD8Q4FLYg4CdOtJPDu94rNJMtnbX6PFaoIiK434LDY8IfEfHKj1FPgFfUJFZ5zLFilqw7S_dfm5tFXkG0w6zVGeVvlNGIDJpQucO10cONuL2CHfCbOqyUZW_pt7CFbVK2bXiDw-pOPjpZZFKTY73Em3b7RGdP6nXZQgXx1_b5l9GVDqmfoWF7xt6D61Z9TKPbcMHeNQ5tucNDaMcDLyLrqxQWyvGdwGEHf6yEJM2J1T2yX4zvpXxF6jPYRjhB9o-eIKVtN80ZsfjSG9sgkzru_C1P9ZJa2uTbt9dHgb14yuCNig5K1iWv0uou_gCc4MiEiitfG_qoqgk2dnZeBdcwBgUImmEbbQ_0JKR1F_jjJAw6r75KNX1ktygbCbnwsvpgtJ3tJqh6EzKEQhtPphwvFtcktGzF1yrxQ_kzSDLIrK.E601vWCV2GKkdp8k9YyH3Q',
          cardId: 'ATL:AMA:12:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1410'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:40',
        arrivalTime: '18:10',
        duration: '4h 30m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '662',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5866',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:15',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ttEteG9d0TYdWSXB1tRmeQ.qdsQGhrBpOSUacKZy8vV1Vd643bXRdrHEKe7Bku34OZkSOvhgkC4cQJ8jioJxZWn1Ldb0DMQzElRh4MTREBWgoCzuRJuxowoXGAEv0FxaH2dp7UXc7NsRwyOF_xW1xb238RttK0ygKd_SyaDF6P3jMIP0hVJtN3DAVEwg0kp8_8-a69gNwQe4t2FkwDr8JuPHRdSFxlOheVbuB41TFx1MxOFm5mEkUcqi3uleubRAxM4vDqy9XX4oR57mpI5hR_tvIaxPOje7VnralGyJxW9sIzQJaryZ24ZYyMQqUt7f-uTco0hkkBU-EkS-eZbQG33PfCRGPuaABznw4rcJcX8yzuOBVVALQUr9O1Xw7dyZAjo0hpnD01lmbToo0Ur_C7bxH0Ld7q_Ml5WMsuf_TN5ST-PqoK7RZ5DuWCVhNFuoJZW_udxpOFNryou-0IGdPV7igI6V_7Yratg2pQhB01f30hhDpgsyk89gqJqZgk5YIE-EbCpXGJ-Rs5tjr2tMIpvRWfoZJetRr5MZCZ13bswiqFWhOvMpLKKBMTtEaQtpkemzms8IKuqIUZzT4xYKGmyljWrO7kqhToqonmr_Ug6ACq_jBYq7p3-RoLeJGB5yGaMQ01QPkbyaJedwylE-iXuntTnapp10_3BEZpThGnvitwU3wJtI1yZWMT5se2U2MDZqAV0RYuCzG8q2XGzqHa9xnHIxPu_kXm_taWfpjoP0ens5bjP9GzeKXa8XSyuPgtrmd8t04ryWkM2B49gWd5bOGrfw8UhJJuOSPBypc34gE8xkNptmVlTrBgTYUoRlLEA7TRIZcKhN4yz869fkrtks0-JtVGGJI0dpo2Tl8Iu5buVL40J8PSZ9Txo7iA9wT9F5_haokJsfNyCWqwgOiUCF46Nfd4bRnbj53vWPYzhoQcznP7CIMkCn6Eu8Hir8fPygpEywgm-5uaD7vi4dUFHGfXtrjGaifD0emUaMq2IkKX-b5v1xC6t_e8GJQd9QzeDkVA0T6o5lJaCCC8POBLr6xgcMxJ_xZvzn3gOh9MKwytuLHVdfhM9p6PeYOd2oVbb7EEdfKO7UDgcLb7ovfrp8dHg36iStr-_uE4Jaa8z2tUdU5S1ZYwHc6z7_e8YH8Ml7LKxBiGR3AxWdx7NibnLJoFANfTt3JhQmOuEXGtPN1EuC5jg0ljaLXW0Sth9AcK9b0_T-726esWg-WxJP_b3.dmBVVrkHbytXLO8_FkFdxg',
          cardId: 'ATL:AMA:13:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1440'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:35',
        arrivalTime: '12:10',
        duration: '4h 35m',
        stopDescription: '1 Stop, MCI',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MCI',
        stopCity: 'MCI',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5214',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3502',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:45',
          departureTime: '10:20',
          changePlanes: true,
          airport: {
            name: 'Kansas City',
            state: 'MO',
            code: 'MCI',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..4KQe56oXx8JaBi-i6vzHsw.yDeDP4PIfoEMpITQMzTAbZJ2BqM96qdo0ha8bwHxC9MqfrZvyc9N8aDFGjiriij-z6YkG-a8s95RZYNRUf4Fv4TB8cgmyXk69nmBEASV9Cei3T8G3dN90FfsEAgf-UzJTi9LzuHrakwhFb3cEyoLFbuW-2bKOJXoNDKY2qFeZPzE2xqgUzbYma02knKfby4kZ7bp8I6jPTlw1e4VTkACUt6ZvPt0M7ykuL46L12i5PX0ASLkUPAhyPtUcwJ6ge8ELZrIjpQAp5BJNVIADkqlj4VIMwEFgHb7ijMXDSWf4oh3fJ-79BqJW-MAUlIgcmLmcxWVLKC0WnbeezW-aBIIe3EeWn6JlYBkoqzzWHZ4nSXHEM6QMdTs9ccvbePCmvZlFoHprq8q6oHr7pz51cGARUrmwd8OCBz24w-bYASEbxQpXH0QMVxVp1Z_4WP5aBdYoSiBvBqgBSL0OFxGuChmQ78DxHzOJgAyULTCJkHhneOto0-WNl4vvRtn_2QgOpIo_H07flDbcIAB0L6kSviz64QZzN-cMUIjD1s4em0EXKs38ZBOg35rNzxYCx--nXaaCv6nfyImOOJyePltESpJPlgYdoNyGmFq7sFCqXvnAvzli5OG7_HKT1E8APzYvmJpwZmumM2Y6uq8ep1uRK7NpNxMXfmkFz_7kCnJKSRoqFOBsia9iPbQsflq71RMgal7DgGtYpPVQBOwtm5FgYd31zTijK00S-Zbso30C4xH_bgIDOWujcbyAfl2tTxqf79dTwKsZIvcTobqwZGShD76212k5FbC80V_re9Tf_AjMVOZ3IiliUrvYoIpfw8QUdx3JD4ANdTM0yOeBo-AuNjH4FLtUqb4Hh0Vutdg7PXzNtJeKtGsN7-_BfIXU-SF0tRLq1gWr8lJM1b8dz6ljGS9gG-9ARQkHbocmJMbYYNfOjk2FLrz7P6YfEpHJC-F3Rc0yN4LL3uCAI-7nH1lOmk0foPKMTfb2_x83vk0DCwlKZJl-lzuW_zH31fCmJ247D5X8bi8Sx8k-jeaMBVuvuMLzDTFePsnOGNdRxBnsV5Kj5O4jmY4oldFXSO8oXjxZ68P--lNb3xTQMb7na8BxMPVe5Dwm2aNwjjFUcBiabk69EQHQ-Z9RYz9BqycofSi44Kxb1UPNuYVIHzz9p_dX4-JOtEHxrM-s4R9rgOZtOH0tijaQMYGyUMIk2Dmy5wkbB7z.Iln3Wp134u3Bh_ySgWZr4A',
          cardId: 'ATL:AMA:14:2020-09-27',
          durationMinutes: 275,
          numberOfStops: 1,
          departureTime: '0835'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4939',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:35',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5Q7z8EcToCXsJL7NQ9GAAQ.ZQyI1HGUI9JIyEmvlX5XBRRkHzzZX8ngi3e7TSVNv5UlqrSf1sfw6bDVnF4Pi4F9ajvsLO7VOx0l2EH23YvcA3kcdGXk2j8akPk-i9Q6CdTY2LdNAYOSFvxnksHNratnVqwDhZ06e0vVxNYuxOf4647NT5Txq7TllJtQ2I-i4xyT7OdwF3dw6FpGxqzgX7j9X1XLk4ahOxfq_iaoFhRPTvtEImQBfi8lyCi6yAOkSnw2MbOqZyh7yE_hqAXw1uyTQ22etgYczw3nxxHPac1tHP9GXhWphHSiW4SijvvKofjdVfTU7CA3Pt1dl15_9SlWqio_0zz4I5OBkbDFNrWBvd59pPc4UkkIWmmfc4qBC21VdjFCJSEHweE-F5Z66M5bIMGzHLhtYDjqNNJox-cW-wRvLusFYkB5DkDAQjVy7RbdG_RH0CiQ8Nol4F7SN-7RVfsehtt60GUqb9Xg8mNbe6Vdn67UahIhlVl2FetmjBW7J2i7rfq-m30BcrWmMZW_YHPJihP7SmnD0B2kyvAEv9XZ3D_NhiKfEP9rCn0tStMxH4exDybM4I_JP3J6RtOO2zXsBrif5yiYS24RlnXs8DWOMtw6TzlYn4_WG2ExMaGy7aa2u2Ng38th3zya2JRDpbYClvamtTK3-N2TH2l3Nb4Wf8_8SIAHy1x7h2-GhI67XkK9hWSI_KXYO_pgNVPdMkj6uu5GF5ShNSb_ykgbAFGeGT-_2GiGx7ZwaCRDL9-m8GAxBrn6pKKNNV-bgv_N77LtSS6wu5F0PFzV2RrPfEYwwX961C2s8fubCJwYf1IhWW0Va9UlQmyTtxWpbokc-a_DTjvldxp5QdxNPzx8BZ5Vb8dMlpu5u9RLX_qfm90qU3coPWgCkhT_2hzxIvGwaOcKl8A0cp0lamP2DuFU7ri_QUIrICwswkhoI8T9eJrAO6pCwws77hImwt22PjR86GyDNsWVJkhQNrfocLWUFyJ2MwzH7eILyBT_IR-y2FkHuMfzK5UvwE1_PQnCGZzWiLYi6NGIgY7Rd_knxp0DSRJbJItptrivcXDxyMeJA_xnOdxUJSOATs8nSRQHwaK0TWg8PsXhEp2A3rQChDBQOWN-wUtmXhCsehuF2XVuIEVraMIuCNk_i0Sivqg-1p1MqynRiMBJpPzTLbWOjXuejXEYFp9rmVXzXu9NFacwQXsieM1EnV5MxNBZoxqVrpO6.KWaO5co4ALmBTMC7jNqzEQ',
          cardId: 'ATL:AMA:15:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9596',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '18:30',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..uNmvX4EjDfv7gW1rKp0Okw.yt7CgmCANf0zXTmL_c8DHjL60QXAemar_OqurzwikmRGZOYvJRk3VhKAJ8BeNAWRGwA3RnyQo9Fw8C0HVq7yihjw-DJH6T-5mtM1ryP3k0ayjwlVn6JzZK8OrLrvUJRzagES-IINm3aOqRpnxOLXETBCqC8EDbsbh-yi4T0mNhOIMcjSXKOW_u6Imd90VOj7yEXnpGmZXJFgn7uyrO1C5yqUSysr7CzxE4Ms15sjTo1w2RVKKAw7GXyhxOJDnMQzZf4RKyFHHjhMuOEkKULv4Og23FImFVcV6cvlG8hAB9vMV_E2vX70OJptVHsDfFFnYBpSn3CGgy7KBZsTMwMbpfwl3D9lIq-ltbQfuWBVACHC-XGu-3GXWJJI8-lwjcmi8P3uMx-7hwN4lMyT_DoMWfjLAk_9VEHPKT3jkiaP8QrFW_zRqiKw04mSCPDl39slSLzzT7WfoJq1qa95fIb-P7Vi7Sujmfyh2PWTBFN3_U92g5o9MLX40QnQS88QYSOKtHN4ArUsHyzpTqK37S_dDicCu0aoFgjfZ7zl6aDXo1gj6l_nIDluTvUZFKMgSWHtDABuFvUy8VdY0MLHOwrkM55ae-QxU_H0FPgoWXBaDZElkwVPnJEl7-T_OXARnBF8qfShFDEcxPkZqt7RgyDJZt4Jghm8TtupGNK7S7rm6v-Dzzug_i6hrZ7SiSMcjJ1djc-jFF4BGqVF2WmkcTtp7lHBYxdhKMwYU6qwP9hlvWcxsnW-0WBYTruo9lET-ogWJIouIhFFHZbVd9YYXZ_Axzze2jbbyQhwHRsUpDagSA7DtNGLlFfd_m-KnJL1iQq-i593HBG4asub5KbO7M2LWhshIZZjULcnuZTYD8tBSE1hFTCTQVFknpKWtW5wrIOxHK_okEC2XzaJzlgRY0BqA8LQVVFAerRAf2VQr4niSoREi-FO_pDgI0OCxcxmfY-DMoAkix-dqyyW_59YTqC4O89DP36-XmVIsAhl18CoRuWATYLzLekXkIYcLXToTsLAfG07WaDcENY7irq4z98P3euLgVBYwDCvQDXdrxG6sLDnAxHNljqoZD8dD0fa56dzouICkrhVDbersrZT1luXBx5bky4DKyvTTGJw87oKJYUHXRQo4Uc0d9wvekXEJ1bXQD5VYl3EyYvbFU-QIibxOANzF9HuD2sUciuszNW4wdDBhaj821Y2O5FUDx2BZhFn.W8Sluaj-tcoVJedFlGsmWw',
          cardId: 'ATL:AMA:16:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:35',
        arrivalTime: '18:25',
        duration: '4h 50m',
        stopDescription: '1 Stop, DAL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes DAL',
        stopCity: 'DAL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '2772',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3281',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:25',
          changePlanes: true,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..A_nRhvCsbNFwZcxb2our4Q.m-AK3ZJB6a4M4MzObKjySXqbpRGF0KUXd8tBuMW_purkwcVhaRqnNySTPzBgg7z5mEhipnWJcVQrWj8H770La_YNUxKrMYawLFDKeaeeFk__uuuyEJ3G6wuvV_J45cPhfv_R6ToO23dIGvDoSlKiAKQ4PtwZG4qVU4MH0q_gXL8_XagIAbQKILEHJAvTb7m15BeRC6E6L2-V2_ttsP2DWN_eImKG38YbPXQpgT0e9dwP9zkdFuobxucZD65_VoVJopx6D5R8l-6XVSI2BV2_QxmJNah0Mge8P9DqYvDT4zSexzcxFGXQbeBjq74oLnBmaWMXq6MNJ4awgsAHzXIhPa2aaJFtJNynzKrZpvCGVHg6m8z1Fd1IJ67gvHFh3ABA9wNSEse7rO95KkDke7o2S1hkmBAlql687aIlKV2A-zTTd4vmsrano7EjrOxj0tb1dsCHTJ6XjRaS1uEkMRJY6Pm4ePy84B6_hroAzLecKYFp1dQkBz-Dv_hRhlLgrrfJgqAgHeSwz83LUvG9xPNrhqYuUQQnb9SZvBMq_2AbDtCvjFvH1m5NpSWhk8tJyOa1GC1V3VU9ls2DxlbjhKuYgizEmlg2YNk_xQRNycTH_wsW_MNXVBuEal3JI9iQCm5Y0e2fkLHwXAjmMdDnJpLQSKsfckjRDL1pzjnLw3QwxNw4bdm5XAUVZqeq1N7elfHq0gae3ugQpX9iXBryexPI2aTLnj1ax3jXLUmsXUJMNimLGN-m0rTiItPnFCiWrNiRPoULfJXW1Lf6hUsR4fsik_yC5bovfh8UXsjsO7uCwCOoMELnkSPmnbOhmBKpDr4IPuGs2sf7sExsRMVASRbsjOOK3zy6D4U_3Yp4ut4pavmg7AVQt6fic_vMa5VERPDZK3NUICDsNyQ-4Jz4nYI_-AXTQyajCuL_K2_sUz5hixzUL6uWZ5BebktO9xTY-ufjAspElfI_df4CNuGj9zAyIWvUrVBzw5-ClGJKvpc-CEjkGU_mlyb7hygmTVlQSE_uXmu_2b7jWV-Gks_DUFQkqaf2lQOLLJgozbMjfPrFKIjuDJeCXfkpe8UVn-ZbBtrg4Lub1gW6-_YTUKYX9jiTi12ixqJ-bJLfP8zAF1PJgxPUvXC6VyE1uD1cjs-hExkSElSpsh8aCs1ZL0vl5Kto_bd5Pc4CfqN4qFkYXxZBAO6uPAeJ4B3nhm2TA4GKVFNd.oQJOuf-vuaAJ6h2u5a_q0w',
          cardId: 'ATL:AMA:17:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '1435'
        },
        isNextDayArrival: false
      }, {
        departureTime: '20:00',
        arrivalTime: '23:50',
        duration: '4h 50m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9602',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5230',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '21:00',
          departureTime: '21:45',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MX3rfJUJcfZqPsv32y6LgA.smAfqfX6sTcQMKZYjfqFPBu4DCBTxqAcErTDlZuVeG1cnQH8RwUnR-q4zpxaxqDsMdNI-w9BfpwpDh_j3EQJM11s9FiVtFAHPR-kSDY0zU2KCkRP0MdGe8VRtL-D-A6Vhnl2dk6uvA_ch-TRxhXGHmxj7T9R_TOY-mb3EGKjvgwZkgpeCTM-Zawx70av1FRbv-5JLKzYyMlokoERi_5nDgQFWwTRnzZCThwqFyhe6j-6qMdICrF4La1VuM66e7iayXBEQoYR7bTI09NxZtWCJOJ2FYTuWgGy9jCTMKYbNRIKv3BxrYEU36gGadcAuBtDBY5oRWKAEqhRs0TQKpS6Tp8IvP_4a3fXDLdq8pzUSJliVZ3_n1xkmcj3GrexXPMVKF7Zh90w8RtEDkfFZDch0LNlvYbgtZK0NcigmbmCScS91GeIODPIjjtvAZQwmD5PGySIqlAohUF5-MSy9ZAIJXzd-L6MpB9MvlQ8Pgm0PWFb3i4JFc3Zpe7Ncf5NCXXGeRHndZ8AG_CMW2W8bmr-XLzwlOIWtceLIUQ1EvSJy6ZvjgdVED7AgyupOviQHO3XE6oy2JZFShte_ZeNrWwFDBCHy8cG7gu3mFdmkYv6btnm6ijGsnIEfEi1qDewsXCUZ9ZWGar_kR0dUHVjFbAzxuXBG_NrxjnRhb6o1Nn6XW9wzExXpzbkgZK2u9WQBR65jdQXyakhrAqxcpe0Y67Xaeqf8p4Ij4IavN7jUETbdh7p_klnR_xjm5F_BSOfdgMgv1_yWQGSbkzbJUMDIn1ldYDXXgUI0-LNxmuByIhZajkpq2XUdinNUnTZq3UB_BLpzy1k76zRDZGDh7BJpybor5aTaolraUVzk9Zp8eW_FesHnRFmfg6GO3A4pTyQPCkOA8DUVFVhjVlukmieD0p56MoUQ4I-qq0Np19OrK7B1IEbOTHAhblmY-lE0xU-0SiLny-z8huYv8QK3x9cbxloGDIe9DXbLCXUuUxhWa1y3uy2VoItEsvhc1qL2qE-A0EJlo6wqaSNkyYjHAhMdcrJdMZcVACGptVh8KRLiAvZlMjeWT9X4f8Z_-x5T8y1Vzxy18_GVEJuCO3SDPWY3seYLi0Cx9p73WxTNDMdrAb4oBsmlN6m-E3VY8E4Z6l62TqI0RMs9-2KycWBVuauKQHOtP5A0toCMU2e9nJ4xF7_SY_8HbgUeXgfQzo3s6zIswqx.B4E-2N13qw2VpjTHg0cOdg',
          cardId: 'ATL:AMA:18:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '2000'
        },
        isNextDayArrival: false
      }]
    };

    return this;
  }

  withNextDay() {
    this.response.currentReservation.outbound.isNextDayArrival = true;
    this.response.flights.outboundPage = {
      messages: null,
      header: {
        airportInfo: 'ATL - AUS',
        selectedDate: '2020-09-27',
        originAirport: 'ATL',
        destinationAirport: 'AUS'
      },
      boundType: 'RETURNING',
      passengerCount: '1 Passenger',
      departureAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalAirport: {
        name: 'Austin',
        state: 'TX',
        code: 'AUS',
        country: null
      },
      shoppingDates: {
        beginShoppingDate: '2020-09-24',
        endShoppingDate: '2020-10-10'
      },
      cards: [{
        departureTime: '07:30',
        arrivalTime: '08:45',
        duration: '2h 15m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4583',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KyTi8pBXChsRLMQMe9j_5A.njN5b4YfWHH5ueJBbUxwm41mowFcv5Vy2HznZFQK6yGME26ugfhzHC4kn8Qr9bSLjdisevLCM8vuVOocjGksAvsAsb2OT7zG9rY1BQ8674DHFl4oY097F67QF9CQaa0VfNUzTysQDW3fjpGnmB7B9YdO0RJwbNUW-ky6V5UXZyG_zjz3Sa2tobJoPCNemIz6hzN4iOb65g2jNmwvr5pnUZmQfb0meQR8_7WP9sBQ0UXx5GaBZGAIzj4l2MkQ96pCoj5INllckIiFpZfc7ITQJJmuzvi-8pA7hd4W8j5YwhPP8KrF8Iss9J0mnp9YdfC4i9LF0UkEgtrU5WM61mfJLLN84LOgKBxX7nxfNvlCrZ5aajSaSjipiGmFf-s-mT64-Ql1WvbCYT3aQa2WdTXG8m-tUpkV5_UFkF8TFPDbFuIriZqdG7B09-v8-13qK4esjAS-e1CvN7RyuWbafVMoVhzqOZL6ntfQBjJe9HV1jhmvJF7MEMmqUiw4zWPPo-2TqWZT0d8lKgMBXajJ7O81W8qB2gI0erkXp4b0MC1O9RU834GmSeIk7HvIbet6WS1G6EmpjxDNIZUnbLdLrTpvbLI1cqCbPDvFux1Z8Mm6aptVIhUm9I2aQugI3nRs_tzd6zG7qm9KfQiqaohqDPhBDn2uoirYNpq35dPvUks4pIQK5OyQ2BJ_oQ_Hmj0S1zio_NPcKVT7sTo3levhhHJgn-Q9mPPj_W0rXsfM1MZw8wkVgIc_v1QnT1b0KD7y3eL3babEhCovOvRhcBzXLcESYIkkLNyIgF_ww-mo6a048rxxIR_J8CL0nctMHBcddV2Aw6WehFTOr3aep9MmfhC6ZScCO_NnHVbw_WVcamymZ_s.PCy_vjP2Jij3tOWnSoT0xQ',
          cardId: 'ATL:AUS:0:2020-09-27',
          durationMinutes: 135,
          numberOfStops: 0,
          departureTime: '0730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '10:35',
        arrivalTime: '11:55',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5664',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..O4qkOXSA-gmbPjdMQymghQ.pD1PmxdniQH6qT6GUnd811-SkLInLpW-7-HqoKaBvmHDa3Tj8T6veCpHm-CX29TzSFYvtQE1cWk1vcCHQd7K2l-v8-grjAgbg_kgSmw8cd0B57nV3tPKvZ31R0zkDMzZAMM4AwoVd9Deffb6tOu3UYkCRp-B7tYxU8ZnCSNFg3erXDIkUNmqejm9B6ohCS0SMLmMnOPSCYHUiEV5QXhwwKQEh8tqZYHbfPOPdrOPTjNaP-NYFRv5BPfzVjfBH0oY-twckyOq5XhJiaY4eIzVmQineKQDCUMximAiqcwOieLCD3qK4MaYlwA4Y8lEe81UCxrUqN5BLiWQvavePbhffhEUqB-Bbea7kUmMbgBy1l-UiCwKIAwVYOntVBqx_BT5yEAt_leG6w4gjUyxMfUboijSzIP79ckt2sQv8_xcvHDckiOc_4vPG88G9Mn_7h9tFyy4NygXBOwEBGfVaGw2y-Cd1GpB20WZZlId9nPstynYTcf2qrVxlkRZWyOUVV8VYW3o2FNwGew0NG_cLof2qZvSQe8_LGIpxIbxdsn_E1CWxWWqqwNISr-8jMcVcENS1B98UGseWyeDSTPL-TDv6BpgLMoECYcUpqR9f6MiZUaDeK9QY488FICal0-zzuXq-KAXToxFTrpjoMKT7XoaUL1O5BHrOGVao3MCy1SqErtgSG8SCU-Hknk2H3jf-j7ejwvKNJeQq5f00_K87sgwKLjW5mPrcQAhKE8VJogMSfySYLyRjp_E-FKGt6o1nw6xCI43wcvIM4vMwaM7rnThLDjBY8vqeH71Ik1v8kgorM6lLEEZWXzySRiM2goVXbEjlYwDBk8jxDRm4Mptm3j-SVeXW2f80f2suWngl13l3y8._FOhHBVPG2pdNsCzF4omVQ',
          cardId: 'ATL:AUS:1:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1035'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:15',
        arrivalTime: '16:35',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4094',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..0VsI7dRYHmp8tmeU50J94Q.bCbV1jOjRJBAQwAj7zocvRhsdEGimV6E3R2UusBa1kTIC41OjJ18av1inCxoB41BjL8_ATu7fzmWg9duHiut2ExBtfY58NThD8ufQkKHlGkeAGwMpXsh6KWJFCO7p872hYJtFO0hbqBQY_2sceilm2VGjwNsObCWTJR_2ViwjdRUFjkkcFxqSgb-8UUfhXiwjGf2fc5lIMsdLLKaxFbgkK4Vu0bo-p059M4-zy4StUiE4nvR1wg5dAQPDdbkFp7rnY7usDPB1RW7WAuLB2C6BMTonrcgiVvj9Ut3b88lRDUtmk87tuTaH_N22PS7Uk1EU1RCBdt6f9_RTOiakEYquFaVSuzPqkACpg19NRqd4dm-lQ5Hs4ExzW0pyq6UVOLrBN0ygLy8mb_0kpcDugeCSpsSxm1Qq3dp_sPHPn6trcf0DYexFmidDnnjmmYMBNNDtsw0OnDwSWYwwcklt0zbffEhUPEu-UinxoTyxtvokjbO9MMb0NF1JdlJuivCpERZdZHc5QPI4u6I9AwPFITy_CzDysCgMDc5dBhKm0gNpbABaiwcTgM7HbFBXaQN2AiJmkQrU081HVlcFLPRmMEZP-WCw7zmPYgC_Oav9C9Uzcxly8A4rp7wMMLivf8AEd19nuMcECT3YHXTIdmA15TvsgHZioug34_TZehAhsLEde2rhXwLBbi5rzNHjWkb34pQzVd1HaPIce48zjr1xkV-VlkKzZfO3K2ugOP48dwrev5Ef9DUaTkBkvmuYEmsoYlTOExns6fjiup3-0lBjQrKWJT6kwlNwuEiU-qscnbsvSpw5TFADdvnyiF78TrCTEWT1n3BkpJw3Sy2CtdX70gqsgafQMGbFd781SUE0KDkKg4.cfQoDv70me3YGw1yditvgw',
          cardId: 'ATL:AUS:2:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1515'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:50',
        arrivalTime: '21:10',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3519',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MQQP3zjLUx80ltWn1FxwtA.Yy_zoEjbKvjs0f7thhbhAaIPYqEGrFr6SEMHI-x9MvqryWq_6G90drXnX2sEYm4CJS6DjSR8VBt7XRsdArCkbPbXu_OsVde870CBcHpE7IYf8l2OQ-NJoOlqojzbwPZ8d-4_Ule_qFM5OLyrkVt5W5F9iMu5PHlF-dNQqPI_viHleE1VioBpMprMj8rS5ryt88o0rZT414pWjXLnR0nTRmmC9hFxSiYT4fEM--tz67vOedFNc0JP5sZJJJo-RFkN9yPtqDzJF9tBQGQYC-EkeJ__GEf1rplhMxWIeLOOoGxCoTwksgTmVCBiUEcvj2UhBuqHq4wdL5SPMFhfghhzj8w1KMb510_pp1etMYJu6QfDZ9ZKVEdFKtmFtjcGwt6FPmYnUHQZeR3c9e7dKOOjrqvcKya-xAqVDREN3eX6g3dDNlGY48_ua9oNT65NWfHfqsnZagdJlhwj0AlnFGM0ALSM-GwDGHb8AlhhT-cTue09KahBOkfEXHRmif-ss-ifFZkPAaNDH6z332uVECougO8VWMPtgsgI_nHKj18ERZU4vxCpcNQALCoI81HcVHVp4utPXSKgtnnyhmWHMECWQd4SnLFB6AqN0TZDivGBjbhnpKJ30iAQnj4xjCHmqmVdM43UE628ltmP3uXYjxOn1GyLZnUzpj95lgSzsf6uoY4WOKcTHdU8vN7E46VYc9CrGbqDb1Ou39phNjTKlj1AdZl2oIlYIXMqueSVhrInbasfDGzLwd1tyrPVCVgI2RkUQjl4-k2Ui_1UQNZEiqx9rGRsfUcw-VpbVVJe43fDvSDaJ4WwCXL0Mb23KabjvJikZrk0VZyCTcxM6eeB4jdnCbjMzGzKJJtnebn_T7nrg5Y.DsIPFr4bI0LbQEAdaxKAhA',
          cardId: 'ATL:AUS:3:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1950'
        },
        isNextDayArrival: false
      }, {
        departureTime: '11:50',
        arrivalTime: '14:35',
        duration: '3h 45m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4837',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '12:55',
          departureTime: '13:35',
          changePlanes: false,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..-uOsrfXaOofdyTUG1Up4Fg.G9eMxGc410dTzERWxfHilTSSh_a04P1bXu4JgAmvHMEqLPLHzuDhGd6JIIN2vCBFO24mRPsUYqFF8IwEucUAAe0Lt_cpRJzQrmPOgzXQ4arNaYrMFxVWpW2nukYbsxwGOxUXKA0wJ5IFrMLzygKypKoZsOllWSheTDq71XJjBeHIA_uvTx3d7Y_ooKuHmqPppbXpUtZF9gJ0fUIClxzi9F4SOHnFo8ba1HVQx-SB97FCWh5sCNpaSmLkxu9nFKlH7qDy1XsVL_QJ-Cf5Khcy4gXJs3RHoJ5h65hbjSZUUA1YVY2MmMF3syL_92a0vzJ-7HN_b5cNnxO7XyWy-kbmqvD1dyWTxK75DzWkoc9VabHHF1F6VQxE1pPK-2eT6Tk5p8vBXwnS2PC3ol9zodgklbCoYzfevfjWikvQXtW979zhvVFv1p9FDaNao1nNIuKPV3NPGtPavhlzMrsVPow78iO8Q9g_cu5uEBzq1uDP7urJWGCY6s44-UTOHhI6jUwuPHQjB5fya9C9dGlb-cfdPLBM1pTgmxNRgndbM-SSkj8tcmljVsatsbF3tDls60SYVHoRt9i9dc2dydE-DxpNWX1vXPgXdc6w1hyNXh61QBIqtB0kaj0s8ZHYYj5BIj9zItt_WMshtEe4e6LjGpa7OAibOeVsspV7A3F0yTYec8hrDg53_e-oYgKx5VsY9yZkVAqtgM3pBSNnU3E2gWAaylEZOUtcVbi8N5EGj8GiF1KZ2TBTPFRss4IJSYPY_R6sPKqadc2CiTZ_rlAtMMzOmL6spzDrpDCfGMEOWLiP2xnuzk0l9Wy7PGF_nqyH3ehtL760vpfCnmFvtnEZpk7S13i6WaxpLfaSoPmFYo17nys.pgdA6ax9qO10UsVkuvKz0A',
          cardId: 'ATL:AUS:4:2020-09-27',
          durationMinutes: 225,
          numberOfStops: 1,
          departureTime: '1150'
        },
        isNextDayArrival: false
      }, {
        departureTime: '16:15',
        arrivalTime: '21:20',
        duration: '6h 5m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4303',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:25',
          departureTime: '18:05',
          changePlanes: false,
          airport: {
            name: 'Denver',
            state: 'CO',
            code: 'DEN',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..f7hlfZwhw9q-cWPG2Pxx6g.VOupZY9hrTT0an0CMYwTPZb0lAwzJn5Eyvu-hTaGADopq48ueYqnK9tL9Au6rqYTu5qCHB82ej3Rrdu05gC7TWFsZ3DTGpdvmigG3x5QVIitEdSDCVzB7XU4viy8ECOw_NnE0MkChxeuiM4mXm-yb8vy-uxYEFBl8OXw_WE8tE-w2wqganjEDaP8bCr5l_P_TnOJV4WRVuCX_hJWcXiybXsqOpkIq_x999MvMC2MbQ_9tuiDritfRIKX-DdEC1Y43oACg5zHgfwfUzzt8Rcgz3H1ev3Z9iCCyRS52zRry83GGLAfwKWBj6whKFrEcsuEbufFnvCECGMiU0SamnF2bkYEnBKOq-sfimy-alXsdZJoarHdy8kysRyDLvkZmM-V9nqJ6GZ6Z5yc_6RUVVZzrizMqT6OAxKwtySp_bJpnhj_mxzvuytJN50QPP0_lvL89X5Z9mNsJ1BwReIDxecI1RRknh0CreS7rxhg-V5qSsnzjvShe1rSodB_Q-D8tguPbjLCdYq7zsAnnbFhiXXFLHt1O_9LrzyocV7l3cVREjWoBwMDjVcOjn4sMFCGkXNIZbDYxUlDhXBMdkwMLqkSm9rstBmnOJDmkCbeX9nl5DRkUPMzkoreg-_-F0JFdRounfq99oAImXXlj6J5k_eNn71MjGzmGgUwOFPp1b4GL6S2yFlVBdi239Aa6rro0eIKctYd1YNBYWfNbZ270Xy5T_6b6fqh-DUulQBYCx4Azi5czVPhIXTy0vHTyuqS215pKy9Jp8BhxmZR6wFJyJRlvAd4RIVqkCO58AgDRWlQ7_srzQLO9pDGQioIBDs6QCXv3tR_q7IJ0aE77YoNuA_Zozo4zIWBz2rkS2k2aogDv2c.ouHaXoQHLMe9krsWnTV-RA',
          cardId: 'ATL:AUS:5:2020-09-27',
          durationMinutes: 365,
          numberOfStops: 1,
          departureTime: '1615'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:45',
        arrivalTime: '22:20',
        duration: '3h 35m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4106',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3357',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '20:15',
          departureTime: '20:55',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..rlzEUKxMzdQgQ17FWeDtKg.i4VR-lVBwh6trhiqr_9vr2i3dWfB_vV7-HJF3Fth5uAjYvyXBoaZLhk60xZjuIIWjI3trmapSn3c7YrM8l1bmMEEiiOCfsTIHw8VeC4Wd7WRbd8beiJK6jVHnyCINYYdlmtL4RPjEuZhR3hBRXeoEpMqTEuBtNAKTULRYY3MjTyLgrPEszQERNfk3z_6GQcz8WkSDogpxB3szDf8jLHF_KIunrIW0OUYRPEbMnD2tf_DBAZPzaxtWEe6LxOhNj4GeZYtOtl1vPaXUSdk518ZXXBpvM64x50R1_JuASZSkFFAxWh3VHXZqrNXwYrSjaXVqdnWBo_bZnbjSRwyLPFIMwcJ9q4C7EAQcUCWxqKPQ66ta-Sfly4oRGZSf092QD_C9--UDTuypI2XXi71cG-1tJwq_nxYrd8gfHwihqla69cAvkYe8xbC8AM6iEiWGdnm7-6qFywjcNUDOS6FypEJ-CBaHDFccy_zHb-RorgULrwXaOa-pYyEMTLclrVWaL8IMz3LPWWlSORO-XzW6mLz_EmMvFJsVH5KEbYKr_z0ra1zXhxfZSvYRqgj2iOqzNQUoa6YQhI07QjgYt3YVSVlC6PL814CtWJGD8eHZ5D8s1OkcVJC9nFdUrBKEtosIB73_wUWex-usnieVoiGjXvV3qdBABkpgOkVv5WKSgNRkZK9BE4sDjs5KR9H8pR6XZA0j9NC8aUHur37qxdTdNHUCC2uqqKhg59xZZxufpHLNmeJOaggyJYNSpeeRfHW2FIZsgIlXa6Gw3le3E62Y5lt48jltYsXn_qC4riJ2pu4Bm6N16_wjL5Jr5m9KPqxi8yTJI0USZUhy8g5s9XxmCzck5P5bJANszLhnm9N2Pc8_tASADGcm0Gol1f-rziivLWoqnEqIsS9rgKsje9K0hGJro7AeU4x7imopvYDomZyzgKdcZqv3ZQP9umFaND5QJgYqaF3tze-7e0sbaip7ag4G6_wG6y5lTuILBs8s57xIG_WhNioWzNY_LANNxNagIy_WjqWFpLgs2Se2NR008l9NBAYQPUa0JEPSiqLw6pLmUldVxOGgDiKKnQqBtFMMj3k0ISWIh45BZrFRt3kprK3O_jBjikYVXRd42X18XCOOWRpFKkJCU8u0PlhmgwPFjEtULm36IEmkxMHXJwD2g0wrmEm4isbt3av87emCXG1FlPI-MGJJJscjl8THRROn0L4.MUUWuG0iGfc5F0byglaDiw',
          cardId: 'ATL:AUS:6:2020-09-27',
          durationMinutes: 215,
          numberOfStops: 1,
          departureTime: '1945'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:55',
        arrivalTime: '20:35',
        duration: '3h 40m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4270',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3704',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '19:05',
          departureTime: '19:45',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..k8A4HNI_K1XuTPwTpShN5g.MmZhSRW6eiauNONo1gpWg9_EYSMNQnvlnWDi0bYYPRubAJgfr15EMrMMLXiL7djrA118LFDl4Rx1jAuz2U4srJzVUYoUKQUx5B76mJJ44BMAdR8N0cKoKK9EhJ7shDVLcuVKQZv44jgxQ7G6F89vOy5WUyInUa1oKOm8S2m6l0Bc9PnZELmt5LcPwc8F7dqBVMbRrXwXTG8QOVPfluKM30GtLS7zRa0xTnGkDaLrhyNV7n6NvdEYvlvZoG7ZshlfHcxJ0IhaHynSZw3PBLHVH0MrueZWKYrsyMKybOzSwKb5gcRpWKNEIPdBSn_k6TE1Ia524iCVtw2FJ9Pd_s-S95Wyl2lKhI_xfuQk_zmmcRtvJw8GFKhgJ-7CJNDw6y-T5kzBE4lgZZzg2S1D1zLWDk6BqgsDb-3ao9Ogt0P0KUfn7-ky3AAkWUoxMxIlurZBx6GmurI1Ud6Kd5GBovmOgZtxynJ7xIV1Zedfo1SJ6UQ7CtmmbLpr6XXpabbiR3nOtVOowk8OS-7nPtugTnpv3L-16JIefsL2DCz0pEFDauGuhGUgY9c1KkUhYA5-twHlbdBZoAtKzyNR3fYY1UjXLScE5aSkWS5gabuupMZwBnC7eGvfd3oc8s1e7nzs6S1tRNcfQlawen8vgdLRbVIIFIwp29ydeXEgwIS8osoz9hT3PEkRBOL1hpM5-5qle89Ka5rkXraUUPPAYvKjApTIVNxlpONS_6PUGHLOO6XDGEhMRNteqP-yt06YfCE0ok01w56LpDvUKl23mjeaKlbg394kO13HFQ1OPdOWxXas6CmYMACwFNNQOFCKUcnCVn6E2VhoTY6gGweUqdDnEDmoE4921Ir-BHecGyYIHhHJyRUdaOWc96R0pP3lvo6HBBsHICYHerGUKE8LCQ0tFulOj_y6hItL_LV71n1ihYYbLnIcdilj1j2Jcg7D2hZ1pTBz1o8C2Nqdcg2R4z9uFH6q2gJVkuBosWzZEHe2OTCd8NxQgtkEwqAvmCoC2QS9Wn5wtFITkkfY38oXtB7wX0Y8xMfWBq0aWk1UouEW84K_Ey3CHN95zkFAkv9EtgNS_FQbsnWR4r-Fd91XY-OPGD4eH1oosrkAD3OnDVwanGQiBeJA2h_hmT7-40cwoMetFu0iIQ1hs8MGAV7vXF6nsmbK2SttXbjLMkiCbNo2JRyMal5hOKHiN3ZmixOJ01t65xEQ.Zibk3oMMawwKVniblj9-3g',
          cardId: 'ATL:AUS:7:2020-09-27',
          durationMinutes: 220,
          numberOfStops: 1,
          departureTime: '1755'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:30',
        arrivalTime: '11:20',
        duration: '3h 50m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3418',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '2942',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:40',
          departureTime: '10:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..K5AgTnNYq5Nw5zIIAgJa7A.9DbZIH9_e3ow0mUvPMCXRyAkbrSnEaHv1KVOgh88E8IXj_HeMi3jlkGlJ4RYz0ac1E7VWF9n-Y9lBap95x21Q1Bq4jcdHRw2XECLPkPiPDtYHT7QraQOm56ofJ6OmhXR7Go67CMpF1DgJqKJFtJDsNv7jS5Q6kEK-HPE8qQAmig4McrhPs7vAP7kMEutwuqos8v1AIBEQPoXR8z5XPkZ7Pz8lnu04iVOvyER9FrjNmoEq2YGl87aAKnS-NQ1sUqjcY7LJG9QJC_7BjkE9-o3oGahlfDK6xLDYWPZlo5R8rrrJZzSsu4Q7CDsaSTbXaNvHZAV1pDakpjsPyijVcTAruu7bFF13Sn9biFr4elxMSEPNI41-yvpvmQBVTpoIEDB6WJ6ASZwVPbP44Ei5WndAF9dc6yKVoZf50VcVvXETbHksGXr6VxMe41MLxzWoWTh-TKnUOk_bjSKJghGtAuhG0GaEFcWXcL3NWTGz4N617OEY221QQwKtWk9rp11p4RByPDmNxmNRISZg-B67Opg1vqAqAKcd-WZJhDTY2JN5ja4ripQ0q0gToyIs4kc3nbqRwrngDidb2tgoOU8rWdVwNcc2qnluWGRLU2vcSL4e5PCOoA2Tq5eFnNlLQ6diWBLytxwlyP6Pt6eSHK0Psxx3HdU3Kedn3-zOdEaVEVtRQpOyGaldYCw-ylj-hI-hFAlod2TazPbD131Nhd6gsSzEQG_E7n51NL_X6vGOOThR63V0UeUN-v8unD26ALm0Wv1VfSeuSseBWUuZIUDn3BByK_InGfotr28gNC930C5rWU91AqngbAeqeMcOq96ADR1GDZS8eV_h7tnSsLM80zN_WHwHQOeoMucUMSv14B0E3i6j14keu3J0vdHo39xnpF2IDonf8_DSr9pujA9a9xBb17RoZU_Y7BVrZwDlFThrwBgByXa8mQ0XiO2GVmI313pe0Vwl5pHmaDClM1uRIAY9HjQTHwnkt_0J4hCh1MGcuRoVtCLEqNS0v9IrjuVJvG8eUaUOSNkFQtFRW52_BrX9DBBLHfeBxj1PaSogWB3ElQ-PcxQgUynFA3AxGM72VdwgzMhY76Z75Xcj3e0bt2us9TdActbN31U4XyWZj4ZCB21CxCUsMvM8YYrDR2hTOnONpoJcxnvrH4LD-86_1kW1U8tmmx85ROc9qTYEnk1anGmymsaZByjxUsQvTFwFsfG.NT6VAUiyhnvK4Htdykqvsw',
          cardId: 'ATL:AUS:8:2020-09-27',
          durationMinutes: 230,
          numberOfStops: 1,
          departureTime: '0830'
        },
        isNextDayArrival: false
      }, {
        departureTime: '06:20',
        arrivalTime: '09:25',
        duration: '4h 5m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5926',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }, {
          number: '5182',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '07:25',
          departureTime: '08:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..TRk1AWVdMjRdyhGLjtX_9w.KnDGOvfZFvM4Hm2oZAQU-Pgxh4MFKoNhuB602LZ2mGlBeNaWL0EPpuZfWSLpvC-1fzJ_ULbWjQ2WB3m45E81-P7kJXBpRopCcyaCn36S-woNfA7dNqn3Ua8rl3x9H9lOlvwOJ5CM3KmnJlR-T4IQ3I-v1_uaBAlFOOzP4BQjmWtk95cg7_syfgV2NuVGrMmTwB6p3LnbFvbyFkeyXOAFE-29UJesnsZroUYTlP_KxPLCMBNbJnD6QD9QBLVoCuFyI0vvZ2G3TyuNi8S2cp6ikqYy6Lq1eWYs5TnZ5pqcB-nlUZ6hb3vGCMhxiDADBH9w1aNcwIfLlZjwZ9DnveQbL04oxGd2b-yVYgivs_10KDe2tH_opGAOi9V3HkfACYvInSkWfZa8rnA-_J-EArtilMPguW0d4dAETNYKWnQLxgLdBWWJXaf3AGgcKhnQ6UO6zM4-udqYG1DNOPPh5bUAZ4uNOcTG_u3zKtARyzbGJKjBVmYGR6k-gosUSxwG0WWNDTj7FF0gdo6EAHALt5ayjoO0D42ZVIrC-Me5Anotibxe2AZ0O8jfXiFnThxiMytJiHS5oG4BK0q3HS6XlaD0o8V-d8mz2Lvwz2KvUGBAlRC6SEw70GtHARNNYrFw95wUMxDAB82rTRMAkAy82ynKS0hqsZE9dXYl0ZdLUSLEgrs0ViUGhpiGCyrh7Ye_8664dVdQ-UDPuKF9ffj88iaY7jeCeiLRs7ettu14kCrECFkA2ozR4B7j5zeEaggttHeOW148AbZK5oF4JMznh2dPMKEmJYAgZXgP9l1iSF_QEc2x1063LIKRrsPvkvqPEbmV9FoGrOsrghgvrs94W1VyS6eXsSl6dOBgEIjB8Ovz4b3U3LRlysIFLaBM5osFBQNjQsvNSXEYdkvCocPtNKBre2NCg6kFspl1GS-H3olLvfihVhDiGuZ318UPSAr3cW9vPpmMVdLwhjdkepPZM-CapfWR_Wl086zAWQqaaenKHnPhb8rcO2eU7PK2068OH-m-sdKkHKK_RYu6p7IcFGZXI1ide1lymev24USzfpsSS1Czkqx6DnXAM_S5OTHAlaUGSEwPDaWnn-8r6NvBYH22AjYSZDM-XpZ3leVDHg_B6Gwss4g8teTXX9r70bhC5-nUqypnUco1wTQlNYVz7xI1cAqFotbSRvO5hi4XwvaaGJ-91gFVQ8707rjzWqPWrmac.GxiIEnUuGizh1InJNohHsg',
          cardId: 'ATL:AUS:9:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '0620'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:50',
        arrivalTime: '18:55',
        duration: '4h 5m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3732',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3426',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '16:25',
          departureTime: '17:30',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..V8Zn9ASHRShVHR3IvZgNlQ.Bju94pKAYSvHiYgxPq1wugc2uJiiQWGMP3mUYrYDY2irDZfPUVnu34JTbRP1tb9SNKE0fI18afvEexjdqEZ34yGAFrXNaV6kL-z4pgaqF8LEEvs6U7pkQsyv-vkB7yaZHV0HTNfL8lvi2DQDMAk1QFGpupsceb2Tn3smSQkGAzDH5HG9dCryCEkmgZp1vmDGSlN49SK-bfzozz-F1Epib1OTDOybPHiLMRxRFZeDYUHYnt9pM3nLujHpd8TBUpN3qGksicHpvTlcR9Zl7uQxq1JuqqgZbrY1LXf2XHIX8Lw7cCiV3ZWKUNnuck7nwxjs-ObekAtrLuWznHdN3ejMXbcLJ6I2kiCkSikhE6_rxo_SFMaRqGn03S3knGaMNWBHtVoxPWryNnyjb9ZqSDo3HsWXNYJp75AlKvo5Y90gaKHKKCS7ejM_HTgDAL5VZAnEP_mW8ag7Is0Z686gwYhUGync3GLxhmE_AWTy3wVYBiCNOlc1aTrIvFWuGppzedyByLDm7OH1k2Qw3Zk63JntQD7ekzh7p1bLTwFBddwvkSowoyAgdPhzoLHkHcM8U6yL_8EUaLptMaggSu1jYJlMM81DgEC4OAQXBCPOplLw533eUCrVS9y7HTSq21UmEEPX8ChxRSirou6vfHdF43BhcX0uJKb4cnuGUdajDg1Sh_irEWYIUJm60Twci-ifGdcH8i1q-gey4p-IIuKWKLnL_cYenOKhnBv-0Qtyxwc8FGjUWpSUk2I4WqZvK9SvdB6L0zcHTzdcvjlA486QNamRGqsSljN-8Utftj0A3yLXltPNVyX-A2kQk4eKbuIdbbLwE1jO_rtgUe0NAzrsIQ_JBhxMTCaYMXj80twS-TL6TOOOwSsSjDMT-80DKimSTgFB6pee1hyVHZacvAX59FMAwPehY-JTr_UK0kGGmsY6Vy_tA4ga2T5_qaC6u5yvPd0XZ3BkIW8uXqMzkpQI8VB84gj3_56xHhl_ybRna7L2LxDHe7NwEuh7xZZNU0DK25p4O2VLrCzpCrIq_x_7Ur_DrGZ1l5xO2m2uTOy8oFKipW_m018jj-5LeUG7iUBrVBn0sATXb64mYONkvTSU2eYB0pumGBMN_oMK5DwOeUf1wsXpnJHKczTfBNF99tPdJM_j_XLuadyMlXbVCAIMaAjA_Uv0dI5Mv5RDJjjJhLabEf2mdicER1HdmWWRNlQTxcmI.JdYsYWl3UfK6z3Q4N_vUDA',
          cardId: 'ATL:AUS:10:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '1550'
        },
        isNextDayArrival: false
      }, {
        departureTime: '09:10',
        arrivalTime: '12:35',
        duration: '4h 25m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3138',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '4746',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:55',
          departureTime: '10:35',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..PCvGnkedSsLavMFla7rtGQ.ayiEl1x_olOxj0vJ8mG38la7YQr42YlV1Pke8fFSbNAfCT5FowM9xJJy6scQhICxPTu5lSHer_FpW4LyO-MclPtviWCZGct1_vp9j5goVXMXleIGugB5S1T7z6hNSxlv6PmyNDsbgiDEkGxvw_980hgzn-I3nuarVW87Ya-KlZ4NSCQbLtxIuHYCV4PbAnAD2fCAtAwF_EGmsvanRv3m2UMyNqZ97gfYl6aSkSCGerQVXUfk0aYXaIwBlpRh423UHIgljrzruoJII_6pqNDMU07LKPXoWBehGbUUFoIqx7hb_AcejkMobj4TTn-tYEZja7EMC2sLzkPYmApxW21vaVPRRj-mXHNURUVfGQ6NiDs7sEqbT2xkynhaJ0Yrmhe2CAoWmdnZ8PA188CHtDqYyMPclZYWSPoNPOTkjclkmXD9V1ITuM6zq6qZffhiIJTfggnLy_LzyYSGiMpgykwnXvwesc6y9s941cHib85ZWPufb5WAt_nia7JELDbKY0zT0cCHd1HZex_eki4Yf1oM6dyZqpZT7W6kJiAcVIFp4FGa-omk5CCGGoGg73V9W6Oh6WRhngb5LWBnfKqrW-7Rjln-v3ypnMMXXWe4JUlRbkwQDeIBVZ0Rr5mcjCCARmiwXF3-_bSy6KMAsNiIkiQaw48AXG1atcN_7l0XP6qzQaqZuvqsYVpOBlh3cBpKbV8eB7WnycRHvdVaoa9zlKHHr1tOnD_5Xq60GdqZRMrEcfEZl0AZeMD-BEnmWWKTTh5IYkhiY4WAN0-D-WCztzis1h2ZNF0-iz3in87rpdKY1CXuwTO-ugQf4uTleZoUza5_CTBzLjGCs3kdVb3ZsEBIjUnII-314mlbE9PW9EkYlUO78fc0SpYCVpQw8Hf2qCE-AyaEZw6jP0s3kmGao0bVDD79ytlmEZS4qASTqOmuYBTFjs4GNNpytUfl5Yem_YxQnKjjNQ70O3BWRjegb4rdutmwhzVly1c7n-XItWJiombqPOQYCbyDUoO1H5iZaZyK7JKa7vCYK4SzISbFdw8Gzyy76v8lWSz6aZTJCF0sYEALLyD_rXG1eo1vp_DhOKnpZTgEEMnQ1CElVueBqKX3mAwSPCV4JmfDKptfsyilTl4Rhb41fb6BeKhAJNOQaM4OlHT-5kS529a1pX-mYiz1BcxHTdw8rDy5tyDEnGQBec1TaSFwgvBGEM2h9GEGGwzn.3vyooDnJLPMNgghkaKmVTw',
          cardId: 'ATL:AUS:11:2020-09-27',
          durationMinutes: 265,
          numberOfStops: 1,
          departureTime: '0910'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:10',
        arrivalTime: '17:40',
        duration: '4h 30m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3401',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '213',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '14:50',
          departureTime: '15:40',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..EGbjuS5qWjW98PnGc0tDwg.aqiCPMe1P0z93pfSHby1rGdZDIkmzqRp7Ry0jgyyMinK6rtP_Qw3hMCgugdzg0jWY9sjHRTdGofJQ1aYfqQDl9pZ7OpsHZ_ZdROXWLJJyemOVnc5z_4orCiRBh50Ff72WeGxpHwHnAotKS2c1epvwACa2Rspx40HmcUAeFZ7JmXDA1VF4WXCuNd3In_Qh7AhXfRyuKlY0KUyrRWxSMn3MqvzOiIWSsQaPrZyjo3-fwWvAct3bjV9_wwveraUoEQoXm_7WpUatahVggFBius155sltOpxUU5_qC-D9qVcXKX5YQscRcyvB4UZP5b6UTVLpa1lM2r1LOAnL5_n_s_qkGupkbSpoqMe4KbDZy4yhR5t8cmmhlXE0yt1wjG3WzbxOZHlsGVdfz-lH_y4lZ_nMYoMR4z14hHJI0Bx4k9zKOT96P5RlIpnBwa8JKu-wxlDSkaEYWoNtbA3UiCJ72Ekd6FCIKAyswq9Ze3vDjSOCFiNf8-vkqSv3u_Uw81nmnslFfkbs03hoPcAXTHkakl0hAqskrzVlI1NGNE2JpfGOzEYFAubgcbLj0qBwsbAs5XTyJ9wByAiu_Stdtv_fKATuaDIzNPYH9YXQ-PTF_Gcvz7__KhFBglanVDElSbYSrmq2uSnrjDDYQkqKzS2-nyyLG0wgMwzqr2mk0CnqI66mTIVVCxNgOUZVHberqpPVmAF3m9btWWgsnF28og-xOoivi5rIsNVfsNg559zCWKuaiQfybm46fKdNuWQ7XLqYzXmVCimlDj0vuv9YzVTML7HOPD8Q4FLYg4CdOtJPDu94rNJMtnbX6PFaoIiK434LDY8IfEfHKj1FPgFfUJFZ5zLFilqw7S_dfm5tFXkG0w6zVGeVvlNGIDJpQucO10cONuL2CHfCbOqyUZW_pt7CFbVK2bXiDw-pOPjpZZFKTY73Em3b7RGdP6nXZQgXx1_b5l9GVDqmfoWF7xt6D61Z9TKPbcMHeNQ5tucNDaMcDLyLrqxQWyvGdwGEHf6yEJM2J1T2yX4zvpXxF6jPYRjhB9o-eIKVtN80ZsfjSG9sgkzru_C1P9ZJa2uTbt9dHgb14yuCNig5K1iWv0uou_gCc4MiEiitfG_qoqgk2dnZeBdcwBgUImmEbbQ_0JKR1F_jjJAw6r75KNX1ktygbCbnwsvpgtJ3tJqh6EzKEQhtPphwvFtcktGzF1yrxQ_kzSDLIrK.E601vWCV2GKkdp8k9YyH3Q',
          cardId: 'ATL:AUS:12:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1410'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:40',
        arrivalTime: '18:10',
        duration: '4h 30m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '662',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5866',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:15',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ttEteG9d0TYdWSXB1tRmeQ.qdsQGhrBpOSUacKZy8vV1Vd643bXRdrHEKe7Bku34OZkSOvhgkC4cQJ8jioJxZWn1Ldb0DMQzElRh4MTREBWgoCzuRJuxowoXGAEv0FxaH2dp7UXc7NsRwyOF_xW1xb238RttK0ygKd_SyaDF6P3jMIP0hVJtN3DAVEwg0kp8_8-a69gNwQe4t2FkwDr8JuPHRdSFxlOheVbuB41TFx1MxOFm5mEkUcqi3uleubRAxM4vDqy9XX4oR57mpI5hR_tvIaxPOje7VnralGyJxW9sIzQJaryZ24ZYyMQqUt7f-uTco0hkkBU-EkS-eZbQG33PfCRGPuaABznw4rcJcX8yzuOBVVALQUr9O1Xw7dyZAjo0hpnD01lmbToo0Ur_C7bxH0Ld7q_Ml5WMsuf_TN5ST-PqoK7RZ5DuWCVhNFuoJZW_udxpOFNryou-0IGdPV7igI6V_7Yratg2pQhB01f30hhDpgsyk89gqJqZgk5YIE-EbCpXGJ-Rs5tjr2tMIpvRWfoZJetRr5MZCZ13bswiqFWhOvMpLKKBMTtEaQtpkemzms8IKuqIUZzT4xYKGmyljWrO7kqhToqonmr_Ug6ACq_jBYq7p3-RoLeJGB5yGaMQ01QPkbyaJedwylE-iXuntTnapp10_3BEZpThGnvitwU3wJtI1yZWMT5se2U2MDZqAV0RYuCzG8q2XGzqHa9xnHIxPu_kXm_taWfpjoP0ens5bjP9GzeKXa8XSyuPgtrmd8t04ryWkM2B49gWd5bOGrfw8UhJJuOSPBypc34gE8xkNptmVlTrBgTYUoRlLEA7TRIZcKhN4yz869fkrtks0-JtVGGJI0dpo2Tl8Iu5buVL40J8PSZ9Txo7iA9wT9F5_haokJsfNyCWqwgOiUCF46Nfd4bRnbj53vWPYzhoQcznP7CIMkCn6Eu8Hir8fPygpEywgm-5uaD7vi4dUFHGfXtrjGaifD0emUaMq2IkKX-b5v1xC6t_e8GJQd9QzeDkVA0T6o5lJaCCC8POBLr6xgcMxJ_xZvzn3gOh9MKwytuLHVdfhM9p6PeYOd2oVbb7EEdfKO7UDgcLb7ovfrp8dHg36iStr-_uE4Jaa8z2tUdU5S1ZYwHc6z7_e8YH8Ml7LKxBiGR3AxWdx7NibnLJoFANfTt3JhQmOuEXGtPN1EuC5jg0ljaLXW0Sth9AcK9b0_T-726esWg-WxJP_b3.dmBVVrkHbytXLO8_FkFdxg',
          cardId: 'ATL:AUS:13:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1440'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:35',
        arrivalTime: '12:10',
        duration: '4h 35m',
        stopDescription: '1 Stop, MCI',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MCI',
        stopCity: 'MCI',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5214',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3502',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:45',
          departureTime: '10:20',
          changePlanes: true,
          airport: {
            name: 'Kansas City',
            state: 'MO',
            code: 'MCI',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..4KQe56oXx8JaBi-i6vzHsw.yDeDP4PIfoEMpITQMzTAbZJ2BqM96qdo0ha8bwHxC9MqfrZvyc9N8aDFGjiriij-z6YkG-a8s95RZYNRUf4Fv4TB8cgmyXk69nmBEASV9Cei3T8G3dN90FfsEAgf-UzJTi9LzuHrakwhFb3cEyoLFbuW-2bKOJXoNDKY2qFeZPzE2xqgUzbYma02knKfby4kZ7bp8I6jPTlw1e4VTkACUt6ZvPt0M7ykuL46L12i5PX0ASLkUPAhyPtUcwJ6ge8ELZrIjpQAp5BJNVIADkqlj4VIMwEFgHb7ijMXDSWf4oh3fJ-79BqJW-MAUlIgcmLmcxWVLKC0WnbeezW-aBIIe3EeWn6JlYBkoqzzWHZ4nSXHEM6QMdTs9ccvbePCmvZlFoHprq8q6oHr7pz51cGARUrmwd8OCBz24w-bYASEbxQpXH0QMVxVp1Z_4WP5aBdYoSiBvBqgBSL0OFxGuChmQ78DxHzOJgAyULTCJkHhneOto0-WNl4vvRtn_2QgOpIo_H07flDbcIAB0L6kSviz64QZzN-cMUIjD1s4em0EXKs38ZBOg35rNzxYCx--nXaaCv6nfyImOOJyePltESpJPlgYdoNyGmFq7sFCqXvnAvzli5OG7_HKT1E8APzYvmJpwZmumM2Y6uq8ep1uRK7NpNxMXfmkFz_7kCnJKSRoqFOBsia9iPbQsflq71RMgal7DgGtYpPVQBOwtm5FgYd31zTijK00S-Zbso30C4xH_bgIDOWujcbyAfl2tTxqf79dTwKsZIvcTobqwZGShD76212k5FbC80V_re9Tf_AjMVOZ3IiliUrvYoIpfw8QUdx3JD4ANdTM0yOeBo-AuNjH4FLtUqb4Hh0Vutdg7PXzNtJeKtGsN7-_BfIXU-SF0tRLq1gWr8lJM1b8dz6ljGS9gG-9ARQkHbocmJMbYYNfOjk2FLrz7P6YfEpHJC-F3Rc0yN4LL3uCAI-7nH1lOmk0foPKMTfb2_x83vk0DCwlKZJl-lzuW_zH31fCmJ247D5X8bi8Sx8k-jeaMBVuvuMLzDTFePsnOGNdRxBnsV5Kj5O4jmY4oldFXSO8oXjxZ68P--lNb3xTQMb7na8BxMPVe5Dwm2aNwjjFUcBiabk69EQHQ-Z9RYz9BqycofSi44Kxb1UPNuYVIHzz9p_dX4-JOtEHxrM-s4R9rgOZtOH0tijaQMYGyUMIk2Dmy5wkbB7z.Iln3Wp134u3Bh_ySgWZr4A',
          cardId: 'ATL:AUS:14:2020-09-27',
          durationMinutes: 275,
          numberOfStops: 1,
          departureTime: '0835'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4939',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:35',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5Q7z8EcToCXsJL7NQ9GAAQ.ZQyI1HGUI9JIyEmvlX5XBRRkHzzZX8ngi3e7TSVNv5UlqrSf1sfw6bDVnF4Pi4F9ajvsLO7VOx0l2EH23YvcA3kcdGXk2j8akPk-i9Q6CdTY2LdNAYOSFvxnksHNratnVqwDhZ06e0vVxNYuxOf4647NT5Txq7TllJtQ2I-i4xyT7OdwF3dw6FpGxqzgX7j9X1XLk4ahOxfq_iaoFhRPTvtEImQBfi8lyCi6yAOkSnw2MbOqZyh7yE_hqAXw1uyTQ22etgYczw3nxxHPac1tHP9GXhWphHSiW4SijvvKofjdVfTU7CA3Pt1dl15_9SlWqio_0zz4I5OBkbDFNrWBvd59pPc4UkkIWmmfc4qBC21VdjFCJSEHweE-F5Z66M5bIMGzHLhtYDjqNNJox-cW-wRvLusFYkB5DkDAQjVy7RbdG_RH0CiQ8Nol4F7SN-7RVfsehtt60GUqb9Xg8mNbe6Vdn67UahIhlVl2FetmjBW7J2i7rfq-m30BcrWmMZW_YHPJihP7SmnD0B2kyvAEv9XZ3D_NhiKfEP9rCn0tStMxH4exDybM4I_JP3J6RtOO2zXsBrif5yiYS24RlnXs8DWOMtw6TzlYn4_WG2ExMaGy7aa2u2Ng38th3zya2JRDpbYClvamtTK3-N2TH2l3Nb4Wf8_8SIAHy1x7h2-GhI67XkK9hWSI_KXYO_pgNVPdMkj6uu5GF5ShNSb_ykgbAFGeGT-_2GiGx7ZwaCRDL9-m8GAxBrn6pKKNNV-bgv_N77LtSS6wu5F0PFzV2RrPfEYwwX961C2s8fubCJwYf1IhWW0Va9UlQmyTtxWpbokc-a_DTjvldxp5QdxNPzx8BZ5Vb8dMlpu5u9RLX_qfm90qU3coPWgCkhT_2hzxIvGwaOcKl8A0cp0lamP2DuFU7ri_QUIrICwswkhoI8T9eJrAO6pCwws77hImwt22PjR86GyDNsWVJkhQNrfocLWUFyJ2MwzH7eILyBT_IR-y2FkHuMfzK5UvwE1_PQnCGZzWiLYi6NGIgY7Rd_knxp0DSRJbJItptrivcXDxyMeJA_xnOdxUJSOATs8nSRQHwaK0TWg8PsXhEp2A3rQChDBQOWN-wUtmXhCsehuF2XVuIEVraMIuCNk_i0Sivqg-1p1MqynRiMBJpPzTLbWOjXuejXEYFp9rmVXzXu9NFacwQXsieM1EnV5MxNBZoxqVrpO6.KWaO5co4ALmBTMC7jNqzEQ',
          cardId: 'ATL:AUS:15:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: true
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9596',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '18:30',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..uNmvX4EjDfv7gW1rKp0Okw.yt7CgmCANf0zXTmL_c8DHjL60QXAemar_OqurzwikmRGZOYvJRk3VhKAJ8BeNAWRGwA3RnyQo9Fw8C0HVq7yihjw-DJH6T-5mtM1ryP3k0ayjwlVn6JzZK8OrLrvUJRzagES-IINm3aOqRpnxOLXETBCqC8EDbsbh-yi4T0mNhOIMcjSXKOW_u6Imd90VOj7yEXnpGmZXJFgn7uyrO1C5yqUSysr7CzxE4Ms15sjTo1w2RVKKAw7GXyhxOJDnMQzZf4RKyFHHjhMuOEkKULv4Og23FImFVcV6cvlG8hAB9vMV_E2vX70OJptVHsDfFFnYBpSn3CGgy7KBZsTMwMbpfwl3D9lIq-ltbQfuWBVACHC-XGu-3GXWJJI8-lwjcmi8P3uMx-7hwN4lMyT_DoMWfjLAk_9VEHPKT3jkiaP8QrFW_zRqiKw04mSCPDl39slSLzzT7WfoJq1qa95fIb-P7Vi7Sujmfyh2PWTBFN3_U92g5o9MLX40QnQS88QYSOKtHN4ArUsHyzpTqK37S_dDicCu0aoFgjfZ7zl6aDXo1gj6l_nIDluTvUZFKMgSWHtDABuFvUy8VdY0MLHOwrkM55ae-QxU_H0FPgoWXBaDZElkwVPnJEl7-T_OXARnBF8qfShFDEcxPkZqt7RgyDJZt4Jghm8TtupGNK7S7rm6v-Dzzug_i6hrZ7SiSMcjJ1djc-jFF4BGqVF2WmkcTtp7lHBYxdhKMwYU6qwP9hlvWcxsnW-0WBYTruo9lET-ogWJIouIhFFHZbVd9YYXZ_Axzze2jbbyQhwHRsUpDagSA7DtNGLlFfd_m-KnJL1iQq-i593HBG4asub5KbO7M2LWhshIZZjULcnuZTYD8tBSE1hFTCTQVFknpKWtW5wrIOxHK_okEC2XzaJzlgRY0BqA8LQVVFAerRAf2VQr4niSoREi-FO_pDgI0OCxcxmfY-DMoAkix-dqyyW_59YTqC4O89DP36-XmVIsAhl18CoRuWATYLzLekXkIYcLXToTsLAfG07WaDcENY7irq4z98P3euLgVBYwDCvQDXdrxG6sLDnAxHNljqoZD8dD0fa56dzouICkrhVDbersrZT1luXBx5bky4DKyvTTGJw87oKJYUHXRQo4Uc0d9wvekXEJ1bXQD5VYl3EyYvbFU-QIibxOANzF9HuD2sUciuszNW4wdDBhaj821Y2O5FUDx2BZhFn.W8Sluaj-tcoVJedFlGsmWw',
          cardId: 'ATL:AUS:16:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: true,
        isOvernight: true
      }, {
        departureTime: '14:35',
        arrivalTime: '18:25',
        duration: '4h 50m',
        stopDescription: '1 Stop, DAL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes DAL',
        stopCity: 'DAL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '2772',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3281',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:25',
          changePlanes: true,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..A_nRhvCsbNFwZcxb2our4Q.m-AK3ZJB6a4M4MzObKjySXqbpRGF0KUXd8tBuMW_purkwcVhaRqnNySTPzBgg7z5mEhipnWJcVQrWj8H770La_YNUxKrMYawLFDKeaeeFk__uuuyEJ3G6wuvV_J45cPhfv_R6ToO23dIGvDoSlKiAKQ4PtwZG4qVU4MH0q_gXL8_XagIAbQKILEHJAvTb7m15BeRC6E6L2-V2_ttsP2DWN_eImKG38YbPXQpgT0e9dwP9zkdFuobxucZD65_VoVJopx6D5R8l-6XVSI2BV2_QxmJNah0Mge8P9DqYvDT4zSexzcxFGXQbeBjq74oLnBmaWMXq6MNJ4awgsAHzXIhPa2aaJFtJNynzKrZpvCGVHg6m8z1Fd1IJ67gvHFh3ABA9wNSEse7rO95KkDke7o2S1hkmBAlql687aIlKV2A-zTTd4vmsrano7EjrOxj0tb1dsCHTJ6XjRaS1uEkMRJY6Pm4ePy84B6_hroAzLecKYFp1dQkBz-Dv_hRhlLgrrfJgqAgHeSwz83LUvG9xPNrhqYuUQQnb9SZvBMq_2AbDtCvjFvH1m5NpSWhk8tJyOa1GC1V3VU9ls2DxlbjhKuYgizEmlg2YNk_xQRNycTH_wsW_MNXVBuEal3JI9iQCm5Y0e2fkLHwXAjmMdDnJpLQSKsfckjRDL1pzjnLw3QwxNw4bdm5XAUVZqeq1N7elfHq0gae3ugQpX9iXBryexPI2aTLnj1ax3jXLUmsXUJMNimLGN-m0rTiItPnFCiWrNiRPoULfJXW1Lf6hUsR4fsik_yC5bovfh8UXsjsO7uCwCOoMELnkSPmnbOhmBKpDr4IPuGs2sf7sExsRMVASRbsjOOK3zy6D4U_3Yp4ut4pavmg7AVQt6fic_vMa5VERPDZK3NUICDsNyQ-4Jz4nYI_-AXTQyajCuL_K2_sUz5hixzUL6uWZ5BebktO9xTY-ufjAspElfI_df4CNuGj9zAyIWvUrVBzw5-ClGJKvpc-CEjkGU_mlyb7hygmTVlQSE_uXmu_2b7jWV-Gks_DUFQkqaf2lQOLLJgozbMjfPrFKIjuDJeCXfkpe8UVn-ZbBtrg4Lub1gW6-_YTUKYX9jiTi12ixqJ-bJLfP8zAF1PJgxPUvXC6VyE1uD1cjs-hExkSElSpsh8aCs1ZL0vl5Kto_bd5Pc4CfqN4qFkYXxZBAO6uPAeJ4B3nhm2TA4GKVFNd.oQJOuf-vuaAJ6h2u5a_q0w',
          cardId: 'ATL:AUS:17:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '1435'
        },
        isNextDayArrival: true
      }, {
        departureTime: '20:00',
        arrivalTime: '23:50',
        duration: '4h 50m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9602',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5230',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '21:00',
          departureTime: '21:45',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MX3rfJUJcfZqPsv32y6LgA.smAfqfX6sTcQMKZYjfqFPBu4DCBTxqAcErTDlZuVeG1cnQH8RwUnR-q4zpxaxqDsMdNI-w9BfpwpDh_j3EQJM11s9FiVtFAHPR-kSDY0zU2KCkRP0MdGe8VRtL-D-A6Vhnl2dk6uvA_ch-TRxhXGHmxj7T9R_TOY-mb3EGKjvgwZkgpeCTM-Zawx70av1FRbv-5JLKzYyMlokoERi_5nDgQFWwTRnzZCThwqFyhe6j-6qMdICrF4La1VuM66e7iayXBEQoYR7bTI09NxZtWCJOJ2FYTuWgGy9jCTMKYbNRIKv3BxrYEU36gGadcAuBtDBY5oRWKAEqhRs0TQKpS6Tp8IvP_4a3fXDLdq8pzUSJliVZ3_n1xkmcj3GrexXPMVKF7Zh90w8RtEDkfFZDch0LNlvYbgtZK0NcigmbmCScS91GeIODPIjjtvAZQwmD5PGySIqlAohUF5-MSy9ZAIJXzd-L6MpB9MvlQ8Pgm0PWFb3i4JFc3Zpe7Ncf5NCXXGeRHndZ8AG_CMW2W8bmr-XLzwlOIWtceLIUQ1EvSJy6ZvjgdVED7AgyupOviQHO3XE6oy2JZFShte_ZeNrWwFDBCHy8cG7gu3mFdmkYv6btnm6ijGsnIEfEi1qDewsXCUZ9ZWGar_kR0dUHVjFbAzxuXBG_NrxjnRhb6o1Nn6XW9wzExXpzbkgZK2u9WQBR65jdQXyakhrAqxcpe0Y67Xaeqf8p4Ij4IavN7jUETbdh7p_klnR_xjm5F_BSOfdgMgv1_yWQGSbkzbJUMDIn1ldYDXXgUI0-LNxmuByIhZajkpq2XUdinNUnTZq3UB_BLpzy1k76zRDZGDh7BJpybor5aTaolraUVzk9Zp8eW_FesHnRFmfg6GO3A4pTyQPCkOA8DUVFVhjVlukmieD0p56MoUQ4I-qq0Np19OrK7B1IEbOTHAhblmY-lE0xU-0SiLny-z8huYv8QK3x9cbxloGDIe9DXbLCXUuUxhWa1y3uy2VoItEsvhc1qL2qE-A0EJlo6wqaSNkyYjHAhMdcrJdMZcVACGptVh8KRLiAvZlMjeWT9X4f8Z_-x5T8y1Vzxy18_GVEJuCO3SDPWY3seYLi0Cx9p73WxTNDMdrAb4oBsmlN6m-E3VY8E4Z6l62TqI0RMs9-2KycWBVuauKQHOtP5A0toCMU2e9nJ4xF7_SY_8HbgUeXgfQzo3s6zIswqx.B4E-2N13qw2VpjTHg0cOdg',
          cardId: 'ATL:AUS:18:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '2000'
        },
        isNextDayArrival: false,
        isOvernight: true
      }]
    };
    
    return this;
  }

  withOvernight() {
    this.response.currentReservation.outbound.isOvernight = true;
    this.response.flights.outboundPage = {
      messages: null,
      header: {
        airportInfo: 'ATL - AUS',
        selectedDate: '2020-09-27',
        originAirport: 'ATL',
        destinationAirport: 'AUS'
      },
      boundType: 'RETURNING',
      passengerCount: '1 Passenger',
      departureAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      arrivalAirport: {
        name: 'Austin',
        state: 'TX',
        code: 'AUS',
        country: null
      },
      shoppingDates: {
        beginShoppingDate: '2020-09-24',
        endShoppingDate: '2020-10-10'
      },
      cards: [{
        departureTime: '07:30',
        arrivalTime: '08:45',
        duration: '2h 15m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4583',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KyTi8pBXChsRLMQMe9j_5A.njN5b4YfWHH5ueJBbUxwm41mowFcv5Vy2HznZFQK6yGME26ugfhzHC4kn8Qr9bSLjdisevLCM8vuVOocjGksAvsAsb2OT7zG9rY1BQ8674DHFl4oY097F67QF9CQaa0VfNUzTysQDW3fjpGnmB7B9YdO0RJwbNUW-ky6V5UXZyG_zjz3Sa2tobJoPCNemIz6hzN4iOb65g2jNmwvr5pnUZmQfb0meQR8_7WP9sBQ0UXx5GaBZGAIzj4l2MkQ96pCoj5INllckIiFpZfc7ITQJJmuzvi-8pA7hd4W8j5YwhPP8KrF8Iss9J0mnp9YdfC4i9LF0UkEgtrU5WM61mfJLLN84LOgKBxX7nxfNvlCrZ5aajSaSjipiGmFf-s-mT64-Ql1WvbCYT3aQa2WdTXG8m-tUpkV5_UFkF8TFPDbFuIriZqdG7B09-v8-13qK4esjAS-e1CvN7RyuWbafVMoVhzqOZL6ntfQBjJe9HV1jhmvJF7MEMmqUiw4zWPPo-2TqWZT0d8lKgMBXajJ7O81W8qB2gI0erkXp4b0MC1O9RU834GmSeIk7HvIbet6WS1G6EmpjxDNIZUnbLdLrTpvbLI1cqCbPDvFux1Z8Mm6aptVIhUm9I2aQugI3nRs_tzd6zG7qm9KfQiqaohqDPhBDn2uoirYNpq35dPvUks4pIQK5OyQ2BJ_oQ_Hmj0S1zio_NPcKVT7sTo3levhhHJgn-Q9mPPj_W0rXsfM1MZw8wkVgIc_v1QnT1b0KD7y3eL3babEhCovOvRhcBzXLcESYIkkLNyIgF_ww-mo6a048rxxIR_J8CL0nctMHBcddV2Aw6WehFTOr3aep9MmfhC6ZScCO_NnHVbw_WVcamymZ_s.PCy_vjP2Jij3tOWnSoT0xQ',
          cardId: 'ATL:AUS:0:2020-09-27',
          durationMinutes: 135,
          numberOfStops: 0,
          departureTime: '0730'
        },
        isNextDayArrival: false
      }, {
        departureTime: '10:35',
        arrivalTime: '11:55',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5664',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..O4qkOXSA-gmbPjdMQymghQ.pD1PmxdniQH6qT6GUnd811-SkLInLpW-7-HqoKaBvmHDa3Tj8T6veCpHm-CX29TzSFYvtQE1cWk1vcCHQd7K2l-v8-grjAgbg_kgSmw8cd0B57nV3tPKvZ31R0zkDMzZAMM4AwoVd9Deffb6tOu3UYkCRp-B7tYxU8ZnCSNFg3erXDIkUNmqejm9B6ohCS0SMLmMnOPSCYHUiEV5QXhwwKQEh8tqZYHbfPOPdrOPTjNaP-NYFRv5BPfzVjfBH0oY-twckyOq5XhJiaY4eIzVmQineKQDCUMximAiqcwOieLCD3qK4MaYlwA4Y8lEe81UCxrUqN5BLiWQvavePbhffhEUqB-Bbea7kUmMbgBy1l-UiCwKIAwVYOntVBqx_BT5yEAt_leG6w4gjUyxMfUboijSzIP79ckt2sQv8_xcvHDckiOc_4vPG88G9Mn_7h9tFyy4NygXBOwEBGfVaGw2y-Cd1GpB20WZZlId9nPstynYTcf2qrVxlkRZWyOUVV8VYW3o2FNwGew0NG_cLof2qZvSQe8_LGIpxIbxdsn_E1CWxWWqqwNISr-8jMcVcENS1B98UGseWyeDSTPL-TDv6BpgLMoECYcUpqR9f6MiZUaDeK9QY488FICal0-zzuXq-KAXToxFTrpjoMKT7XoaUL1O5BHrOGVao3MCy1SqErtgSG8SCU-Hknk2H3jf-j7ejwvKNJeQq5f00_K87sgwKLjW5mPrcQAhKE8VJogMSfySYLyRjp_E-FKGt6o1nw6xCI43wcvIM4vMwaM7rnThLDjBY8vqeH71Ik1v8kgorM6lLEEZWXzySRiM2goVXbEjlYwDBk8jxDRm4Mptm3j-SVeXW2f80f2suWngl13l3y8._FOhHBVPG2pdNsCzF4omVQ',
          cardId: 'ATL:AUS:1:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1035'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:15',
        arrivalTime: '16:35',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4094',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..0VsI7dRYHmp8tmeU50J94Q.bCbV1jOjRJBAQwAj7zocvRhsdEGimV6E3R2UusBa1kTIC41OjJ18av1inCxoB41BjL8_ATu7fzmWg9duHiut2ExBtfY58NThD8ufQkKHlGkeAGwMpXsh6KWJFCO7p872hYJtFO0hbqBQY_2sceilm2VGjwNsObCWTJR_2ViwjdRUFjkkcFxqSgb-8UUfhXiwjGf2fc5lIMsdLLKaxFbgkK4Vu0bo-p059M4-zy4StUiE4nvR1wg5dAQPDdbkFp7rnY7usDPB1RW7WAuLB2C6BMTonrcgiVvj9Ut3b88lRDUtmk87tuTaH_N22PS7Uk1EU1RCBdt6f9_RTOiakEYquFaVSuzPqkACpg19NRqd4dm-lQ5Hs4ExzW0pyq6UVOLrBN0ygLy8mb_0kpcDugeCSpsSxm1Qq3dp_sPHPn6trcf0DYexFmidDnnjmmYMBNNDtsw0OnDwSWYwwcklt0zbffEhUPEu-UinxoTyxtvokjbO9MMb0NF1JdlJuivCpERZdZHc5QPI4u6I9AwPFITy_CzDysCgMDc5dBhKm0gNpbABaiwcTgM7HbFBXaQN2AiJmkQrU081HVlcFLPRmMEZP-WCw7zmPYgC_Oav9C9Uzcxly8A4rp7wMMLivf8AEd19nuMcECT3YHXTIdmA15TvsgHZioug34_TZehAhsLEde2rhXwLBbi5rzNHjWkb34pQzVd1HaPIce48zjr1xkV-VlkKzZfO3K2ugOP48dwrev5Ef9DUaTkBkvmuYEmsoYlTOExns6fjiup3-0lBjQrKWJT6kwlNwuEiU-qscnbsvSpw5TFADdvnyiF78TrCTEWT1n3BkpJw3Sy2CtdX70gqsgafQMGbFd781SUE0KDkKg4.cfQoDv70me3YGw1yditvgw',
          cardId: 'ATL:AUS:2:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1515'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:50',
        arrivalTime: '21:10',
        duration: '2h 20m',
        stopDescription: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3519',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MQQP3zjLUx80ltWn1FxwtA.Yy_zoEjbKvjs0f7thhbhAaIPYqEGrFr6SEMHI-x9MvqryWq_6G90drXnX2sEYm4CJS6DjSR8VBt7XRsdArCkbPbXu_OsVde870CBcHpE7IYf8l2OQ-NJoOlqojzbwPZ8d-4_Ule_qFM5OLyrkVt5W5F9iMu5PHlF-dNQqPI_viHleE1VioBpMprMj8rS5ryt88o0rZT414pWjXLnR0nTRmmC9hFxSiYT4fEM--tz67vOedFNc0JP5sZJJJo-RFkN9yPtqDzJF9tBQGQYC-EkeJ__GEf1rplhMxWIeLOOoGxCoTwksgTmVCBiUEcvj2UhBuqHq4wdL5SPMFhfghhzj8w1KMb510_pp1etMYJu6QfDZ9ZKVEdFKtmFtjcGwt6FPmYnUHQZeR3c9e7dKOOjrqvcKya-xAqVDREN3eX6g3dDNlGY48_ua9oNT65NWfHfqsnZagdJlhwj0AlnFGM0ALSM-GwDGHb8AlhhT-cTue09KahBOkfEXHRmif-ss-ifFZkPAaNDH6z332uVECougO8VWMPtgsgI_nHKj18ERZU4vxCpcNQALCoI81HcVHVp4utPXSKgtnnyhmWHMECWQd4SnLFB6AqN0TZDivGBjbhnpKJ30iAQnj4xjCHmqmVdM43UE628ltmP3uXYjxOn1GyLZnUzpj95lgSzsf6uoY4WOKcTHdU8vN7E46VYc9CrGbqDb1Ou39phNjTKlj1AdZl2oIlYIXMqueSVhrInbasfDGzLwd1tyrPVCVgI2RkUQjl4-k2Ui_1UQNZEiqx9rGRsfUcw-VpbVVJe43fDvSDaJ4WwCXL0Mb23KabjvJikZrk0VZyCTcxM6eeB4jdnCbjMzGzKJJtnebn_T7nrg5Y.DsIPFr4bI0LbQEAdaxKAhA',
          cardId: 'ATL:AUS:3:2020-09-27',
          durationMinutes: 140,
          numberOfStops: 0,
          departureTime: '1950'
        },
        isNextDayArrival: false
      }, {
        departureTime: '11:50',
        arrivalTime: '14:35',
        duration: '3h 45m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4837',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '12:55',
          departureTime: '13:35',
          changePlanes: false,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..-uOsrfXaOofdyTUG1Up4Fg.G9eMxGc410dTzERWxfHilTSSh_a04P1bXu4JgAmvHMEqLPLHzuDhGd6JIIN2vCBFO24mRPsUYqFF8IwEucUAAe0Lt_cpRJzQrmPOgzXQ4arNaYrMFxVWpW2nukYbsxwGOxUXKA0wJ5IFrMLzygKypKoZsOllWSheTDq71XJjBeHIA_uvTx3d7Y_ooKuHmqPppbXpUtZF9gJ0fUIClxzi9F4SOHnFo8ba1HVQx-SB97FCWh5sCNpaSmLkxu9nFKlH7qDy1XsVL_QJ-Cf5Khcy4gXJs3RHoJ5h65hbjSZUUA1YVY2MmMF3syL_92a0vzJ-7HN_b5cNnxO7XyWy-kbmqvD1dyWTxK75DzWkoc9VabHHF1F6VQxE1pPK-2eT6Tk5p8vBXwnS2PC3ol9zodgklbCoYzfevfjWikvQXtW979zhvVFv1p9FDaNao1nNIuKPV3NPGtPavhlzMrsVPow78iO8Q9g_cu5uEBzq1uDP7urJWGCY6s44-UTOHhI6jUwuPHQjB5fya9C9dGlb-cfdPLBM1pTgmxNRgndbM-SSkj8tcmljVsatsbF3tDls60SYVHoRt9i9dc2dydE-DxpNWX1vXPgXdc6w1hyNXh61QBIqtB0kaj0s8ZHYYj5BIj9zItt_WMshtEe4e6LjGpa7OAibOeVsspV7A3F0yTYec8hrDg53_e-oYgKx5VsY9yZkVAqtgM3pBSNnU3E2gWAaylEZOUtcVbi8N5EGj8GiF1KZ2TBTPFRss4IJSYPY_R6sPKqadc2CiTZ_rlAtMMzOmL6spzDrpDCfGMEOWLiP2xnuzk0l9Wy7PGF_nqyH3ehtL760vpfCnmFvtnEZpk7S13i6WaxpLfaSoPmFYo17nys.pgdA6ax9qO10UsVkuvKz0A',
          cardId: 'ATL:AUS:4:2020-09-27',
          durationMinutes: 225,
          numberOfStops: 1,
          departureTime: '1150'
        },
        isNextDayArrival: false
      }, {
        departureTime: '16:15',
        arrivalTime: '21:20',
        duration: '6h 5m',
        stopDescription: '1 Stop',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, No plane change',
        stopCity: null,
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4303',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:25',
          departureTime: '18:05',
          changePlanes: false,
          airport: {
            name: 'Denver',
            state: 'CO',
            code: 'DEN',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..f7hlfZwhw9q-cWPG2Pxx6g.VOupZY9hrTT0an0CMYwTPZb0lAwzJn5Eyvu-hTaGADopq48ueYqnK9tL9Au6rqYTu5qCHB82ej3Rrdu05gC7TWFsZ3DTGpdvmigG3x5QVIitEdSDCVzB7XU4viy8ECOw_NnE0MkChxeuiM4mXm-yb8vy-uxYEFBl8OXw_WE8tE-w2wqganjEDaP8bCr5l_P_TnOJV4WRVuCX_hJWcXiybXsqOpkIq_x999MvMC2MbQ_9tuiDritfRIKX-DdEC1Y43oACg5zHgfwfUzzt8Rcgz3H1ev3Z9iCCyRS52zRry83GGLAfwKWBj6whKFrEcsuEbufFnvCECGMiU0SamnF2bkYEnBKOq-sfimy-alXsdZJoarHdy8kysRyDLvkZmM-V9nqJ6GZ6Z5yc_6RUVVZzrizMqT6OAxKwtySp_bJpnhj_mxzvuytJN50QPP0_lvL89X5Z9mNsJ1BwReIDxecI1RRknh0CreS7rxhg-V5qSsnzjvShe1rSodB_Q-D8tguPbjLCdYq7zsAnnbFhiXXFLHt1O_9LrzyocV7l3cVREjWoBwMDjVcOjn4sMFCGkXNIZbDYxUlDhXBMdkwMLqkSm9rstBmnOJDmkCbeX9nl5DRkUPMzkoreg-_-F0JFdRounfq99oAImXXlj6J5k_eNn71MjGzmGgUwOFPp1b4GL6S2yFlVBdi239Aa6rro0eIKctYd1YNBYWfNbZ270Xy5T_6b6fqh-DUulQBYCx4Azi5czVPhIXTy0vHTyuqS215pKy9Jp8BhxmZR6wFJyJRlvAd4RIVqkCO58AgDRWlQ7_srzQLO9pDGQioIBDs6QCXv3tR_q7IJ0aE77YoNuA_Zozo4zIWBz2rkS2k2aogDv2c.ouHaXoQHLMe9krsWnTV-RA',
          cardId: 'ATL:AUS:5:2020-09-27',
          durationMinutes: 365,
          numberOfStops: 1,
          departureTime: '1615'
        },
        isNextDayArrival: false
      }, {
        departureTime: '19:45',
        arrivalTime: '22:20',
        duration: '3h 35m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4106',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3357',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '20:15',
          departureTime: '20:55',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..rlzEUKxMzdQgQ17FWeDtKg.i4VR-lVBwh6trhiqr_9vr2i3dWfB_vV7-HJF3Fth5uAjYvyXBoaZLhk60xZjuIIWjI3trmapSn3c7YrM8l1bmMEEiiOCfsTIHw8VeC4Wd7WRbd8beiJK6jVHnyCINYYdlmtL4RPjEuZhR3hBRXeoEpMqTEuBtNAKTULRYY3MjTyLgrPEszQERNfk3z_6GQcz8WkSDogpxB3szDf8jLHF_KIunrIW0OUYRPEbMnD2tf_DBAZPzaxtWEe6LxOhNj4GeZYtOtl1vPaXUSdk518ZXXBpvM64x50R1_JuASZSkFFAxWh3VHXZqrNXwYrSjaXVqdnWBo_bZnbjSRwyLPFIMwcJ9q4C7EAQcUCWxqKPQ66ta-Sfly4oRGZSf092QD_C9--UDTuypI2XXi71cG-1tJwq_nxYrd8gfHwihqla69cAvkYe8xbC8AM6iEiWGdnm7-6qFywjcNUDOS6FypEJ-CBaHDFccy_zHb-RorgULrwXaOa-pYyEMTLclrVWaL8IMz3LPWWlSORO-XzW6mLz_EmMvFJsVH5KEbYKr_z0ra1zXhxfZSvYRqgj2iOqzNQUoa6YQhI07QjgYt3YVSVlC6PL814CtWJGD8eHZ5D8s1OkcVJC9nFdUrBKEtosIB73_wUWex-usnieVoiGjXvV3qdBABkpgOkVv5WKSgNRkZK9BE4sDjs5KR9H8pR6XZA0j9NC8aUHur37qxdTdNHUCC2uqqKhg59xZZxufpHLNmeJOaggyJYNSpeeRfHW2FIZsgIlXa6Gw3le3E62Y5lt48jltYsXn_qC4riJ2pu4Bm6N16_wjL5Jr5m9KPqxi8yTJI0USZUhy8g5s9XxmCzck5P5bJANszLhnm9N2Pc8_tASADGcm0Gol1f-rziivLWoqnEqIsS9rgKsje9K0hGJro7AeU4x7imopvYDomZyzgKdcZqv3ZQP9umFaND5QJgYqaF3tze-7e0sbaip7ag4G6_wG6y5lTuILBs8s57xIG_WhNioWzNY_LANNxNagIy_WjqWFpLgs2Se2NR008l9NBAYQPUa0JEPSiqLw6pLmUldVxOGgDiKKnQqBtFMMj3k0ISWIh45BZrFRt3kprK3O_jBjikYVXRd42X18XCOOWRpFKkJCU8u0PlhmgwPFjEtULm36IEmkxMHXJwD2g0wrmEm4isbt3av87emCXG1FlPI-MGJJJscjl8THRROn0L4.MUUWuG0iGfc5F0byglaDiw',
          cardId: 'ATL:AUS:6:2020-09-27',
          durationMinutes: 215,
          numberOfStops: 1,
          departureTime: '1945'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:55',
        arrivalTime: '20:35',
        duration: '3h 40m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4270',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3704',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '19:05',
          departureTime: '19:45',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..k8A4HNI_K1XuTPwTpShN5g.MmZhSRW6eiauNONo1gpWg9_EYSMNQnvlnWDi0bYYPRubAJgfr15EMrMMLXiL7djrA118LFDl4Rx1jAuz2U4srJzVUYoUKQUx5B76mJJ44BMAdR8N0cKoKK9EhJ7shDVLcuVKQZv44jgxQ7G6F89vOy5WUyInUa1oKOm8S2m6l0Bc9PnZELmt5LcPwc8F7dqBVMbRrXwXTG8QOVPfluKM30GtLS7zRa0xTnGkDaLrhyNV7n6NvdEYvlvZoG7ZshlfHcxJ0IhaHynSZw3PBLHVH0MrueZWKYrsyMKybOzSwKb5gcRpWKNEIPdBSn_k6TE1Ia524iCVtw2FJ9Pd_s-S95Wyl2lKhI_xfuQk_zmmcRtvJw8GFKhgJ-7CJNDw6y-T5kzBE4lgZZzg2S1D1zLWDk6BqgsDb-3ao9Ogt0P0KUfn7-ky3AAkWUoxMxIlurZBx6GmurI1Ud6Kd5GBovmOgZtxynJ7xIV1Zedfo1SJ6UQ7CtmmbLpr6XXpabbiR3nOtVOowk8OS-7nPtugTnpv3L-16JIefsL2DCz0pEFDauGuhGUgY9c1KkUhYA5-twHlbdBZoAtKzyNR3fYY1UjXLScE5aSkWS5gabuupMZwBnC7eGvfd3oc8s1e7nzs6S1tRNcfQlawen8vgdLRbVIIFIwp29ydeXEgwIS8osoz9hT3PEkRBOL1hpM5-5qle89Ka5rkXraUUPPAYvKjApTIVNxlpONS_6PUGHLOO6XDGEhMRNteqP-yt06YfCE0ok01w56LpDvUKl23mjeaKlbg394kO13HFQ1OPdOWxXas6CmYMACwFNNQOFCKUcnCVn6E2VhoTY6gGweUqdDnEDmoE4921Ir-BHecGyYIHhHJyRUdaOWc96R0pP3lvo6HBBsHICYHerGUKE8LCQ0tFulOj_y6hItL_LV71n1ihYYbLnIcdilj1j2Jcg7D2hZ1pTBz1o8C2Nqdcg2R4z9uFH6q2gJVkuBosWzZEHe2OTCd8NxQgtkEwqAvmCoC2QS9Wn5wtFITkkfY38oXtB7wX0Y8xMfWBq0aWk1UouEW84K_Ey3CHN95zkFAkv9EtgNS_FQbsnWR4r-Fd91XY-OPGD4eH1oosrkAD3OnDVwanGQiBeJA2h_hmT7-40cwoMetFu0iIQ1hs8MGAV7vXF6nsmbK2SttXbjLMkiCbNo2JRyMal5hOKHiN3ZmixOJ01t65xEQ.Zibk3oMMawwKVniblj9-3g',
          cardId: 'ATL:AUS:7:2020-09-27',
          durationMinutes: 220,
          numberOfStops: 1,
          departureTime: '1755'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:30',
        arrivalTime: '11:20',
        duration: '3h 50m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3418',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '2942',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:40',
          departureTime: '10:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..K5AgTnNYq5Nw5zIIAgJa7A.9DbZIH9_e3ow0mUvPMCXRyAkbrSnEaHv1KVOgh88E8IXj_HeMi3jlkGlJ4RYz0ac1E7VWF9n-Y9lBap95x21Q1Bq4jcdHRw2XECLPkPiPDtYHT7QraQOm56ofJ6OmhXR7Go67CMpF1DgJqKJFtJDsNv7jS5Q6kEK-HPE8qQAmig4McrhPs7vAP7kMEutwuqos8v1AIBEQPoXR8z5XPkZ7Pz8lnu04iVOvyER9FrjNmoEq2YGl87aAKnS-NQ1sUqjcY7LJG9QJC_7BjkE9-o3oGahlfDK6xLDYWPZlo5R8rrrJZzSsu4Q7CDsaSTbXaNvHZAV1pDakpjsPyijVcTAruu7bFF13Sn9biFr4elxMSEPNI41-yvpvmQBVTpoIEDB6WJ6ASZwVPbP44Ei5WndAF9dc6yKVoZf50VcVvXETbHksGXr6VxMe41MLxzWoWTh-TKnUOk_bjSKJghGtAuhG0GaEFcWXcL3NWTGz4N617OEY221QQwKtWk9rp11p4RByPDmNxmNRISZg-B67Opg1vqAqAKcd-WZJhDTY2JN5ja4ripQ0q0gToyIs4kc3nbqRwrngDidb2tgoOU8rWdVwNcc2qnluWGRLU2vcSL4e5PCOoA2Tq5eFnNlLQ6diWBLytxwlyP6Pt6eSHK0Psxx3HdU3Kedn3-zOdEaVEVtRQpOyGaldYCw-ylj-hI-hFAlod2TazPbD131Nhd6gsSzEQG_E7n51NL_X6vGOOThR63V0UeUN-v8unD26ALm0Wv1VfSeuSseBWUuZIUDn3BByK_InGfotr28gNC930C5rWU91AqngbAeqeMcOq96ADR1GDZS8eV_h7tnSsLM80zN_WHwHQOeoMucUMSv14B0E3i6j14keu3J0vdHo39xnpF2IDonf8_DSr9pujA9a9xBb17RoZU_Y7BVrZwDlFThrwBgByXa8mQ0XiO2GVmI313pe0Vwl5pHmaDClM1uRIAY9HjQTHwnkt_0J4hCh1MGcuRoVtCLEqNS0v9IrjuVJvG8eUaUOSNkFQtFRW52_BrX9DBBLHfeBxj1PaSogWB3ElQ-PcxQgUynFA3AxGM72VdwgzMhY76Z75Xcj3e0bt2us9TdActbN31U4XyWZj4ZCB21CxCUsMvM8YYrDR2hTOnONpoJcxnvrH4LD-86_1kW1U8tmmx85ROc9qTYEnk1anGmymsaZByjxUsQvTFwFsfG.NT6VAUiyhnvK4Htdykqvsw',
          cardId: 'ATL:AUS:8:2020-09-27',
          durationMinutes: 230,
          numberOfStops: 1,
          departureTime: '0830'
        },
        isNextDayArrival: false
      }, {
        departureTime: '06:20',
        arrivalTime: '09:25',
        duration: '4h 5m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5926',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }, {
          number: '5182',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '07:25',
          departureTime: '08:30',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..TRk1AWVdMjRdyhGLjtX_9w.KnDGOvfZFvM4Hm2oZAQU-Pgxh4MFKoNhuB602LZ2mGlBeNaWL0EPpuZfWSLpvC-1fzJ_ULbWjQ2WB3m45E81-P7kJXBpRopCcyaCn36S-woNfA7dNqn3Ua8rl3x9H9lOlvwOJ5CM3KmnJlR-T4IQ3I-v1_uaBAlFOOzP4BQjmWtk95cg7_syfgV2NuVGrMmTwB6p3LnbFvbyFkeyXOAFE-29UJesnsZroUYTlP_KxPLCMBNbJnD6QD9QBLVoCuFyI0vvZ2G3TyuNi8S2cp6ikqYy6Lq1eWYs5TnZ5pqcB-nlUZ6hb3vGCMhxiDADBH9w1aNcwIfLlZjwZ9DnveQbL04oxGd2b-yVYgivs_10KDe2tH_opGAOi9V3HkfACYvInSkWfZa8rnA-_J-EArtilMPguW0d4dAETNYKWnQLxgLdBWWJXaf3AGgcKhnQ6UO6zM4-udqYG1DNOPPh5bUAZ4uNOcTG_u3zKtARyzbGJKjBVmYGR6k-gosUSxwG0WWNDTj7FF0gdo6EAHALt5ayjoO0D42ZVIrC-Me5Anotibxe2AZ0O8jfXiFnThxiMytJiHS5oG4BK0q3HS6XlaD0o8V-d8mz2Lvwz2KvUGBAlRC6SEw70GtHARNNYrFw95wUMxDAB82rTRMAkAy82ynKS0hqsZE9dXYl0ZdLUSLEgrs0ViUGhpiGCyrh7Ye_8664dVdQ-UDPuKF9ffj88iaY7jeCeiLRs7ettu14kCrECFkA2ozR4B7j5zeEaggttHeOW148AbZK5oF4JMznh2dPMKEmJYAgZXgP9l1iSF_QEc2x1063LIKRrsPvkvqPEbmV9FoGrOsrghgvrs94W1VyS6eXsSl6dOBgEIjB8Ovz4b3U3LRlysIFLaBM5osFBQNjQsvNSXEYdkvCocPtNKBre2NCg6kFspl1GS-H3olLvfihVhDiGuZ318UPSAr3cW9vPpmMVdLwhjdkepPZM-CapfWR_Wl086zAWQqaaenKHnPhb8rcO2eU7PK2068OH-m-sdKkHKK_RYu6p7IcFGZXI1ide1lymev24USzfpsSS1Czkqx6DnXAM_S5OTHAlaUGSEwPDaWnn-8r6NvBYH22AjYSZDM-XpZ3leVDHg_B6Gwss4g8teTXX9r70bhC5-nUqypnUco1wTQlNYVz7xI1cAqFotbSRvO5hi4XwvaaGJ-91gFVQ8707rjzWqPWrmac.GxiIEnUuGizh1InJNohHsg',
          cardId: 'ATL:AUS:9:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '0620'
        },
        isNextDayArrival: false
      }, {
        departureTime: '15:50',
        arrivalTime: '18:55',
        duration: '4h 5m',
        stopDescription: '1 Stop, MSY',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MSY',
        stopCity: 'MSY',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3732',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3426',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '16:25',
          departureTime: '17:30',
          changePlanes: true,
          airport: {
            name: 'New Orleans',
            state: 'LA',
            code: 'MSY',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..V8Zn9ASHRShVHR3IvZgNlQ.Bju94pKAYSvHiYgxPq1wugc2uJiiQWGMP3mUYrYDY2irDZfPUVnu34JTbRP1tb9SNKE0fI18afvEexjdqEZ34yGAFrXNaV6kL-z4pgaqF8LEEvs6U7pkQsyv-vkB7yaZHV0HTNfL8lvi2DQDMAk1QFGpupsceb2Tn3smSQkGAzDH5HG9dCryCEkmgZp1vmDGSlN49SK-bfzozz-F1Epib1OTDOybPHiLMRxRFZeDYUHYnt9pM3nLujHpd8TBUpN3qGksicHpvTlcR9Zl7uQxq1JuqqgZbrY1LXf2XHIX8Lw7cCiV3ZWKUNnuck7nwxjs-ObekAtrLuWznHdN3ejMXbcLJ6I2kiCkSikhE6_rxo_SFMaRqGn03S3knGaMNWBHtVoxPWryNnyjb9ZqSDo3HsWXNYJp75AlKvo5Y90gaKHKKCS7ejM_HTgDAL5VZAnEP_mW8ag7Is0Z686gwYhUGync3GLxhmE_AWTy3wVYBiCNOlc1aTrIvFWuGppzedyByLDm7OH1k2Qw3Zk63JntQD7ekzh7p1bLTwFBddwvkSowoyAgdPhzoLHkHcM8U6yL_8EUaLptMaggSu1jYJlMM81DgEC4OAQXBCPOplLw533eUCrVS9y7HTSq21UmEEPX8ChxRSirou6vfHdF43BhcX0uJKb4cnuGUdajDg1Sh_irEWYIUJm60Twci-ifGdcH8i1q-gey4p-IIuKWKLnL_cYenOKhnBv-0Qtyxwc8FGjUWpSUk2I4WqZvK9SvdB6L0zcHTzdcvjlA486QNamRGqsSljN-8Utftj0A3yLXltPNVyX-A2kQk4eKbuIdbbLwE1jO_rtgUe0NAzrsIQ_JBhxMTCaYMXj80twS-TL6TOOOwSsSjDMT-80DKimSTgFB6pee1hyVHZacvAX59FMAwPehY-JTr_UK0kGGmsY6Vy_tA4ga2T5_qaC6u5yvPd0XZ3BkIW8uXqMzkpQI8VB84gj3_56xHhl_ybRna7L2LxDHe7NwEuh7xZZNU0DK25p4O2VLrCzpCrIq_x_7Ur_DrGZ1l5xO2m2uTOy8oFKipW_m018jj-5LeUG7iUBrVBn0sATXb64mYONkvTSU2eYB0pumGBMN_oMK5DwOeUf1wsXpnJHKczTfBNF99tPdJM_j_XLuadyMlXbVCAIMaAjA_Uv0dI5Mv5RDJjjJhLabEf2mdicER1HdmWWRNlQTxcmI.JdYsYWl3UfK6z3Q4N_vUDA',
          cardId: 'ATL:AUS:10:2020-09-27',
          durationMinutes: 245,
          numberOfStops: 1,
          departureTime: '1550'
        },
        isNextDayArrival: false
      }, {
        departureTime: '09:10',
        arrivalTime: '12:35',
        duration: '4h 25m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3138',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '4746',
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:55',
          departureTime: '10:35',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..PCvGnkedSsLavMFla7rtGQ.ayiEl1x_olOxj0vJ8mG38la7YQr42YlV1Pke8fFSbNAfCT5FowM9xJJy6scQhICxPTu5lSHer_FpW4LyO-MclPtviWCZGct1_vp9j5goVXMXleIGugB5S1T7z6hNSxlv6PmyNDsbgiDEkGxvw_980hgzn-I3nuarVW87Ya-KlZ4NSCQbLtxIuHYCV4PbAnAD2fCAtAwF_EGmsvanRv3m2UMyNqZ97gfYl6aSkSCGerQVXUfk0aYXaIwBlpRh423UHIgljrzruoJII_6pqNDMU07LKPXoWBehGbUUFoIqx7hb_AcejkMobj4TTn-tYEZja7EMC2sLzkPYmApxW21vaVPRRj-mXHNURUVfGQ6NiDs7sEqbT2xkynhaJ0Yrmhe2CAoWmdnZ8PA188CHtDqYyMPclZYWSPoNPOTkjclkmXD9V1ITuM6zq6qZffhiIJTfggnLy_LzyYSGiMpgykwnXvwesc6y9s941cHib85ZWPufb5WAt_nia7JELDbKY0zT0cCHd1HZex_eki4Yf1oM6dyZqpZT7W6kJiAcVIFp4FGa-omk5CCGGoGg73V9W6Oh6WRhngb5LWBnfKqrW-7Rjln-v3ypnMMXXWe4JUlRbkwQDeIBVZ0Rr5mcjCCARmiwXF3-_bSy6KMAsNiIkiQaw48AXG1atcN_7l0XP6qzQaqZuvqsYVpOBlh3cBpKbV8eB7WnycRHvdVaoa9zlKHHr1tOnD_5Xq60GdqZRMrEcfEZl0AZeMD-BEnmWWKTTh5IYkhiY4WAN0-D-WCztzis1h2ZNF0-iz3in87rpdKY1CXuwTO-ugQf4uTleZoUza5_CTBzLjGCs3kdVb3ZsEBIjUnII-314mlbE9PW9EkYlUO78fc0SpYCVpQw8Hf2qCE-AyaEZw6jP0s3kmGao0bVDD79ytlmEZS4qASTqOmuYBTFjs4GNNpytUfl5Yem_YxQnKjjNQ70O3BWRjegb4rdutmwhzVly1c7n-XItWJiombqPOQYCbyDUoO1H5iZaZyK7JKa7vCYK4SzISbFdw8Gzyy76v8lWSz6aZTJCF0sYEALLyD_rXG1eo1vp_DhOKnpZTgEEMnQ1CElVueBqKX3mAwSPCV4JmfDKptfsyilTl4Rhb41fb6BeKhAJNOQaM4OlHT-5kS529a1pX-mYiz1BcxHTdw8rDy5tyDEnGQBec1TaSFwgvBGEM2h9GEGGwzn.3vyooDnJLPMNgghkaKmVTw',
          cardId: 'ATL:AUS:11:2020-09-27',
          durationMinutes: 265,
          numberOfStops: 1,
          departureTime: '0910'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:10',
        arrivalTime: '17:40',
        duration: '4h 30m',
        stopDescription: '1 Stop, STL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes STL',
        stopCity: 'STL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '3401',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '213',
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '14:50',
          departureTime: '15:40',
          changePlanes: true,
          airport: {
            name: 'St. Louis',
            state: 'MO',
            code: 'STL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..EGbjuS5qWjW98PnGc0tDwg.aqiCPMe1P0z93pfSHby1rGdZDIkmzqRp7Ry0jgyyMinK6rtP_Qw3hMCgugdzg0jWY9sjHRTdGofJQ1aYfqQDl9pZ7OpsHZ_ZdROXWLJJyemOVnc5z_4orCiRBh50Ff72WeGxpHwHnAotKS2c1epvwACa2Rspx40HmcUAeFZ7JmXDA1VF4WXCuNd3In_Qh7AhXfRyuKlY0KUyrRWxSMn3MqvzOiIWSsQaPrZyjo3-fwWvAct3bjV9_wwveraUoEQoXm_7WpUatahVggFBius155sltOpxUU5_qC-D9qVcXKX5YQscRcyvB4UZP5b6UTVLpa1lM2r1LOAnL5_n_s_qkGupkbSpoqMe4KbDZy4yhR5t8cmmhlXE0yt1wjG3WzbxOZHlsGVdfz-lH_y4lZ_nMYoMR4z14hHJI0Bx4k9zKOT96P5RlIpnBwa8JKu-wxlDSkaEYWoNtbA3UiCJ72Ekd6FCIKAyswq9Ze3vDjSOCFiNf8-vkqSv3u_Uw81nmnslFfkbs03hoPcAXTHkakl0hAqskrzVlI1NGNE2JpfGOzEYFAubgcbLj0qBwsbAs5XTyJ9wByAiu_Stdtv_fKATuaDIzNPYH9YXQ-PTF_Gcvz7__KhFBglanVDElSbYSrmq2uSnrjDDYQkqKzS2-nyyLG0wgMwzqr2mk0CnqI66mTIVVCxNgOUZVHberqpPVmAF3m9btWWgsnF28og-xOoivi5rIsNVfsNg559zCWKuaiQfybm46fKdNuWQ7XLqYzXmVCimlDj0vuv9YzVTML7HOPD8Q4FLYg4CdOtJPDu94rNJMtnbX6PFaoIiK434LDY8IfEfHKj1FPgFfUJFZ5zLFilqw7S_dfm5tFXkG0w6zVGeVvlNGIDJpQucO10cONuL2CHfCbOqyUZW_pt7CFbVK2bXiDw-pOPjpZZFKTY73Em3b7RGdP6nXZQgXx1_b5l9GVDqmfoWF7xt6D61Z9TKPbcMHeNQ5tucNDaMcDLyLrqxQWyvGdwGEHf6yEJM2J1T2yX4zvpXxF6jPYRjhB9o-eIKVtN80ZsfjSG9sgkzru_C1P9ZJa2uTbt9dHgb14yuCNig5K1iWv0uou_gCc4MiEiitfG_qoqgk2dnZeBdcwBgUImmEbbQ_0JKR1F_jjJAw6r75KNX1ktygbCbnwsvpgtJ3tJqh6EzKEQhtPphwvFtcktGzF1yrxQ_kzSDLIrK.E601vWCV2GKkdp8k9YyH3Q',
          cardId: 'ATL:AUS:12:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1410'
        },
        isNextDayArrival: false
      }, {
        departureTime: '14:40',
        arrivalTime: '18:10',
        duration: '4h 30m',
        stopDescription: '1 Stop, HOU',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        stopCity: 'HOU',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '662',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5866',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:15',
          changePlanes: true,
          airport: {
            name: 'Houston (Hobby)',
            state: 'TX',
            code: 'HOU',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..ttEteG9d0TYdWSXB1tRmeQ.qdsQGhrBpOSUacKZy8vV1Vd643bXRdrHEKe7Bku34OZkSOvhgkC4cQJ8jioJxZWn1Ldb0DMQzElRh4MTREBWgoCzuRJuxowoXGAEv0FxaH2dp7UXc7NsRwyOF_xW1xb238RttK0ygKd_SyaDF6P3jMIP0hVJtN3DAVEwg0kp8_8-a69gNwQe4t2FkwDr8JuPHRdSFxlOheVbuB41TFx1MxOFm5mEkUcqi3uleubRAxM4vDqy9XX4oR57mpI5hR_tvIaxPOje7VnralGyJxW9sIzQJaryZ24ZYyMQqUt7f-uTco0hkkBU-EkS-eZbQG33PfCRGPuaABznw4rcJcX8yzuOBVVALQUr9O1Xw7dyZAjo0hpnD01lmbToo0Ur_C7bxH0Ld7q_Ml5WMsuf_TN5ST-PqoK7RZ5DuWCVhNFuoJZW_udxpOFNryou-0IGdPV7igI6V_7Yratg2pQhB01f30hhDpgsyk89gqJqZgk5YIE-EbCpXGJ-Rs5tjr2tMIpvRWfoZJetRr5MZCZ13bswiqFWhOvMpLKKBMTtEaQtpkemzms8IKuqIUZzT4xYKGmyljWrO7kqhToqonmr_Ug6ACq_jBYq7p3-RoLeJGB5yGaMQ01QPkbyaJedwylE-iXuntTnapp10_3BEZpThGnvitwU3wJtI1yZWMT5se2U2MDZqAV0RYuCzG8q2XGzqHa9xnHIxPu_kXm_taWfpjoP0ens5bjP9GzeKXa8XSyuPgtrmd8t04ryWkM2B49gWd5bOGrfw8UhJJuOSPBypc34gE8xkNptmVlTrBgTYUoRlLEA7TRIZcKhN4yz869fkrtks0-JtVGGJI0dpo2Tl8Iu5buVL40J8PSZ9Txo7iA9wT9F5_haokJsfNyCWqwgOiUCF46Nfd4bRnbj53vWPYzhoQcznP7CIMkCn6Eu8Hir8fPygpEywgm-5uaD7vi4dUFHGfXtrjGaifD0emUaMq2IkKX-b5v1xC6t_e8GJQd9QzeDkVA0T6o5lJaCCC8POBLr6xgcMxJ_xZvzn3gOh9MKwytuLHVdfhM9p6PeYOd2oVbb7EEdfKO7UDgcLb7ovfrp8dHg36iStr-_uE4Jaa8z2tUdU5S1ZYwHc6z7_e8YH8Ml7LKxBiGR3AxWdx7NibnLJoFANfTt3JhQmOuEXGtPN1EuC5jg0ljaLXW0Sth9AcK9b0_T-726esWg-WxJP_b3.dmBVVrkHbytXLO8_FkFdxg',
          cardId: 'ATL:AUS:13:2020-09-27',
          durationMinutes: 270,
          numberOfStops: 1,
          departureTime: '1440'
        },
        isNextDayArrival: false
      }, {
        departureTime: '08:35',
        arrivalTime: '12:10',
        duration: '4h 35m',
        stopDescription: '1 Stop, MCI',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes MCI',
        stopCity: 'MCI',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '5214',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3502',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '09:45',
          departureTime: '10:20',
          changePlanes: true,
          airport: {
            name: 'Kansas City',
            state: 'MO',
            code: 'MCI',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..4KQe56oXx8JaBi-i6vzHsw.yDeDP4PIfoEMpITQMzTAbZJ2BqM96qdo0ha8bwHxC9MqfrZvyc9N8aDFGjiriij-z6YkG-a8s95RZYNRUf4Fv4TB8cgmyXk69nmBEASV9Cei3T8G3dN90FfsEAgf-UzJTi9LzuHrakwhFb3cEyoLFbuW-2bKOJXoNDKY2qFeZPzE2xqgUzbYma02knKfby4kZ7bp8I6jPTlw1e4VTkACUt6ZvPt0M7ykuL46L12i5PX0ASLkUPAhyPtUcwJ6ge8ELZrIjpQAp5BJNVIADkqlj4VIMwEFgHb7ijMXDSWf4oh3fJ-79BqJW-MAUlIgcmLmcxWVLKC0WnbeezW-aBIIe3EeWn6JlYBkoqzzWHZ4nSXHEM6QMdTs9ccvbePCmvZlFoHprq8q6oHr7pz51cGARUrmwd8OCBz24w-bYASEbxQpXH0QMVxVp1Z_4WP5aBdYoSiBvBqgBSL0OFxGuChmQ78DxHzOJgAyULTCJkHhneOto0-WNl4vvRtn_2QgOpIo_H07flDbcIAB0L6kSviz64QZzN-cMUIjD1s4em0EXKs38ZBOg35rNzxYCx--nXaaCv6nfyImOOJyePltESpJPlgYdoNyGmFq7sFCqXvnAvzli5OG7_HKT1E8APzYvmJpwZmumM2Y6uq8ep1uRK7NpNxMXfmkFz_7kCnJKSRoqFOBsia9iPbQsflq71RMgal7DgGtYpPVQBOwtm5FgYd31zTijK00S-Zbso30C4xH_bgIDOWujcbyAfl2tTxqf79dTwKsZIvcTobqwZGShD76212k5FbC80V_re9Tf_AjMVOZ3IiliUrvYoIpfw8QUdx3JD4ANdTM0yOeBo-AuNjH4FLtUqb4Hh0Vutdg7PXzNtJeKtGsN7-_BfIXU-SF0tRLq1gWr8lJM1b8dz6ljGS9gG-9ARQkHbocmJMbYYNfOjk2FLrz7P6YfEpHJC-F3Rc0yN4LL3uCAI-7nH1lOmk0foPKMTfb2_x83vk0DCwlKZJl-lzuW_zH31fCmJ247D5X8bi8Sx8k-jeaMBVuvuMLzDTFePsnOGNdRxBnsV5Kj5O4jmY4oldFXSO8oXjxZ68P--lNb3xTQMb7na8BxMPVe5Dwm2aNwjjFUcBiabk69EQHQ-Z9RYz9BqycofSi44Kxb1UPNuYVIHzz9p_dX4-JOtEHxrM-s4R9rgOZtOH0tijaQMYGyUMIk2Dmy5wkbB7z.Iln3Wp134u3Bh_ySgWZr4A',
          cardId: 'ATL:AUS:14:2020-09-27',
          durationMinutes: 275,
          numberOfStops: 1,
          departureTime: '0835'
        },
        isNextDayArrival: false
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '4939',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '17:35',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..5Q7z8EcToCXsJL7NQ9GAAQ.ZQyI1HGUI9JIyEmvlX5XBRRkHzzZX8ngi3e7TSVNv5UlqrSf1sfw6bDVnF4Pi4F9ajvsLO7VOx0l2EH23YvcA3kcdGXk2j8akPk-i9Q6CdTY2LdNAYOSFvxnksHNratnVqwDhZ06e0vVxNYuxOf4647NT5Txq7TllJtQ2I-i4xyT7OdwF3dw6FpGxqzgX7j9X1XLk4ahOxfq_iaoFhRPTvtEImQBfi8lyCi6yAOkSnw2MbOqZyh7yE_hqAXw1uyTQ22etgYczw3nxxHPac1tHP9GXhWphHSiW4SijvvKofjdVfTU7CA3Pt1dl15_9SlWqio_0zz4I5OBkbDFNrWBvd59pPc4UkkIWmmfc4qBC21VdjFCJSEHweE-F5Z66M5bIMGzHLhtYDjqNNJox-cW-wRvLusFYkB5DkDAQjVy7RbdG_RH0CiQ8Nol4F7SN-7RVfsehtt60GUqb9Xg8mNbe6Vdn67UahIhlVl2FetmjBW7J2i7rfq-m30BcrWmMZW_YHPJihP7SmnD0B2kyvAEv9XZ3D_NhiKfEP9rCn0tStMxH4exDybM4I_JP3J6RtOO2zXsBrif5yiYS24RlnXs8DWOMtw6TzlYn4_WG2ExMaGy7aa2u2Ng38th3zya2JRDpbYClvamtTK3-N2TH2l3Nb4Wf8_8SIAHy1x7h2-GhI67XkK9hWSI_KXYO_pgNVPdMkj6uu5GF5ShNSb_ykgbAFGeGT-_2GiGx7ZwaCRDL9-m8GAxBrn6pKKNNV-bgv_N77LtSS6wu5F0PFzV2RrPfEYwwX961C2s8fubCJwYf1IhWW0Va9UlQmyTtxWpbokc-a_DTjvldxp5QdxNPzx8BZ5Vb8dMlpu5u9RLX_qfm90qU3coPWgCkhT_2hzxIvGwaOcKl8A0cp0lamP2DuFU7ri_QUIrICwswkhoI8T9eJrAO6pCwws77hImwt22PjR86GyDNsWVJkhQNrfocLWUFyJ2MwzH7eILyBT_IR-y2FkHuMfzK5UvwE1_PQnCGZzWiLYi6NGIgY7Rd_knxp0DSRJbJItptrivcXDxyMeJA_xnOdxUJSOATs8nSRQHwaK0TWg8PsXhEp2A3rQChDBQOWN-wUtmXhCsehuF2XVuIEVraMIuCNk_i0Sivqg-1p1MqynRiMBJpPzTLbWOjXuejXEYFp9rmVXzXu9NFacwQXsieM1EnV5MxNBZoxqVrpO6.KWaO5co4ALmBTMC7jNqzEQ',
          cardId: 'ATL:AUS:15:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: true
      }, {
        departureTime: '17:30',
        arrivalTime: '21:15',
        duration: '4h 45m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9596',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3827',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '18:30',
          departureTime: '19:10',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..uNmvX4EjDfv7gW1rKp0Okw.yt7CgmCANf0zXTmL_c8DHjL60QXAemar_OqurzwikmRGZOYvJRk3VhKAJ8BeNAWRGwA3RnyQo9Fw8C0HVq7yihjw-DJH6T-5mtM1ryP3k0ayjwlVn6JzZK8OrLrvUJRzagES-IINm3aOqRpnxOLXETBCqC8EDbsbh-yi4T0mNhOIMcjSXKOW_u6Imd90VOj7yEXnpGmZXJFgn7uyrO1C5yqUSysr7CzxE4Ms15sjTo1w2RVKKAw7GXyhxOJDnMQzZf4RKyFHHjhMuOEkKULv4Og23FImFVcV6cvlG8hAB9vMV_E2vX70OJptVHsDfFFnYBpSn3CGgy7KBZsTMwMbpfwl3D9lIq-ltbQfuWBVACHC-XGu-3GXWJJI8-lwjcmi8P3uMx-7hwN4lMyT_DoMWfjLAk_9VEHPKT3jkiaP8QrFW_zRqiKw04mSCPDl39slSLzzT7WfoJq1qa95fIb-P7Vi7Sujmfyh2PWTBFN3_U92g5o9MLX40QnQS88QYSOKtHN4ArUsHyzpTqK37S_dDicCu0aoFgjfZ7zl6aDXo1gj6l_nIDluTvUZFKMgSWHtDABuFvUy8VdY0MLHOwrkM55ae-QxU_H0FPgoWXBaDZElkwVPnJEl7-T_OXARnBF8qfShFDEcxPkZqt7RgyDJZt4Jghm8TtupGNK7S7rm6v-Dzzug_i6hrZ7SiSMcjJ1djc-jFF4BGqVF2WmkcTtp7lHBYxdhKMwYU6qwP9hlvWcxsnW-0WBYTruo9lET-ogWJIouIhFFHZbVd9YYXZ_Axzze2jbbyQhwHRsUpDagSA7DtNGLlFfd_m-KnJL1iQq-i593HBG4asub5KbO7M2LWhshIZZjULcnuZTYD8tBSE1hFTCTQVFknpKWtW5wrIOxHK_okEC2XzaJzlgRY0BqA8LQVVFAerRAf2VQr4niSoREi-FO_pDgI0OCxcxmfY-DMoAkix-dqyyW_59YTqC4O89DP36-XmVIsAhl18CoRuWATYLzLekXkIYcLXToTsLAfG07WaDcENY7irq4z98P3euLgVBYwDCvQDXdrxG6sLDnAxHNljqoZD8dD0fa56dzouICkrhVDbersrZT1luXBx5bky4DKyvTTGJw87oKJYUHXRQo4Uc0d9wvekXEJ1bXQD5VYl3EyYvbFU-QIibxOANzF9HuD2sUciuszNW4wdDBhaj821Y2O5FUDx2BZhFn.W8Sluaj-tcoVJedFlGsmWw',
          cardId: 'ATL:AUS:16:2020-09-27',
          durationMinutes: 285,
          numberOfStops: 1,
          departureTime: '1730'
        },
        isNextDayArrival: true,
        isOvernight: true
      }, {
        departureTime: '14:35',
        arrivalTime: '18:25',
        duration: '4h 50m',
        stopDescription: '1 Stop, DAL',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes DAL',
        stopCity: 'DAL',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '2772',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '3281',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '15:45',
          departureTime: '17:25',
          changePlanes: true,
          airport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..A_nRhvCsbNFwZcxb2our4Q.m-AK3ZJB6a4M4MzObKjySXqbpRGF0KUXd8tBuMW_purkwcVhaRqnNySTPzBgg7z5mEhipnWJcVQrWj8H770La_YNUxKrMYawLFDKeaeeFk__uuuyEJ3G6wuvV_J45cPhfv_R6ToO23dIGvDoSlKiAKQ4PtwZG4qVU4MH0q_gXL8_XagIAbQKILEHJAvTb7m15BeRC6E6L2-V2_ttsP2DWN_eImKG38YbPXQpgT0e9dwP9zkdFuobxucZD65_VoVJopx6D5R8l-6XVSI2BV2_QxmJNah0Mge8P9DqYvDT4zSexzcxFGXQbeBjq74oLnBmaWMXq6MNJ4awgsAHzXIhPa2aaJFtJNynzKrZpvCGVHg6m8z1Fd1IJ67gvHFh3ABA9wNSEse7rO95KkDke7o2S1hkmBAlql687aIlKV2A-zTTd4vmsrano7EjrOxj0tb1dsCHTJ6XjRaS1uEkMRJY6Pm4ePy84B6_hroAzLecKYFp1dQkBz-Dv_hRhlLgrrfJgqAgHeSwz83LUvG9xPNrhqYuUQQnb9SZvBMq_2AbDtCvjFvH1m5NpSWhk8tJyOa1GC1V3VU9ls2DxlbjhKuYgizEmlg2YNk_xQRNycTH_wsW_MNXVBuEal3JI9iQCm5Y0e2fkLHwXAjmMdDnJpLQSKsfckjRDL1pzjnLw3QwxNw4bdm5XAUVZqeq1N7elfHq0gae3ugQpX9iXBryexPI2aTLnj1ax3jXLUmsXUJMNimLGN-m0rTiItPnFCiWrNiRPoULfJXW1Lf6hUsR4fsik_yC5bovfh8UXsjsO7uCwCOoMELnkSPmnbOhmBKpDr4IPuGs2sf7sExsRMVASRbsjOOK3zy6D4U_3Yp4ut4pavmg7AVQt6fic_vMa5VERPDZK3NUICDsNyQ-4Jz4nYI_-AXTQyajCuL_K2_sUz5hixzUL6uWZ5BebktO9xTY-ufjAspElfI_df4CNuGj9zAyIWvUrVBzw5-ClGJKvpc-CEjkGU_mlyb7hygmTVlQSE_uXmu_2b7jWV-Gks_DUFQkqaf2lQOLLJgozbMjfPrFKIjuDJeCXfkpe8UVn-ZbBtrg4Lub1gW6-_YTUKYX9jiTi12ixqJ-bJLfP8zAF1PJgxPUvXC6VyE1uD1cjs-hExkSElSpsh8aCs1ZL0vl5Kto_bd5Pc4CfqN4qFkYXxZBAO6uPAeJ4B3nhm2TA4GKVFNd.oQJOuf-vuaAJ6h2u5a_q0w',
          cardId: 'ATL:AUS:17:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '1435'
        },
        isNextDayArrival: true
      }, {
        departureTime: '20:00',
        arrivalTime: '23:50',
        duration: '4h 50m',
        stopDescription: '1 Stop, BNA',
        shortStopDescription: '1 Stop',
        stopDescriptionOnSelect: '1 Stop, Change planes BNA',
        stopCity: 'BNA',
        reasonIfUnavailable: 'AVAILABLE',
        limitedSeats: null,
        flights: [{
          number: '9602',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '5230',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        stops: [{
          arrivalTime: '21:00',
          departureTime: '21:45',
          changePlanes: true,
          airport: {
            name: 'Nashville',
            state: 'TN',
            code: 'BNA',
            country: null
          }
        }],
        _meta: {
          reaccomProductId: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..MX3rfJUJcfZqPsv32y6LgA.smAfqfX6sTcQMKZYjfqFPBu4DCBTxqAcErTDlZuVeG1cnQH8RwUnR-q4zpxaxqDsMdNI-w9BfpwpDh_j3EQJM11s9FiVtFAHPR-kSDY0zU2KCkRP0MdGe8VRtL-D-A6Vhnl2dk6uvA_ch-TRxhXGHmxj7T9R_TOY-mb3EGKjvgwZkgpeCTM-Zawx70av1FRbv-5JLKzYyMlokoERi_5nDgQFWwTRnzZCThwqFyhe6j-6qMdICrF4La1VuM66e7iayXBEQoYR7bTI09NxZtWCJOJ2FYTuWgGy9jCTMKYbNRIKv3BxrYEU36gGadcAuBtDBY5oRWKAEqhRs0TQKpS6Tp8IvP_4a3fXDLdq8pzUSJliVZ3_n1xkmcj3GrexXPMVKF7Zh90w8RtEDkfFZDch0LNlvYbgtZK0NcigmbmCScS91GeIODPIjjtvAZQwmD5PGySIqlAohUF5-MSy9ZAIJXzd-L6MpB9MvlQ8Pgm0PWFb3i4JFc3Zpe7Ncf5NCXXGeRHndZ8AG_CMW2W8bmr-XLzwlOIWtceLIUQ1EvSJy6ZvjgdVED7AgyupOviQHO3XE6oy2JZFShte_ZeNrWwFDBCHy8cG7gu3mFdmkYv6btnm6ijGsnIEfEi1qDewsXCUZ9ZWGar_kR0dUHVjFbAzxuXBG_NrxjnRhb6o1Nn6XW9wzExXpzbkgZK2u9WQBR65jdQXyakhrAqxcpe0Y67Xaeqf8p4Ij4IavN7jUETbdh7p_klnR_xjm5F_BSOfdgMgv1_yWQGSbkzbJUMDIn1ldYDXXgUI0-LNxmuByIhZajkpq2XUdinNUnTZq3UB_BLpzy1k76zRDZGDh7BJpybor5aTaolraUVzk9Zp8eW_FesHnRFmfg6GO3A4pTyQPCkOA8DUVFVhjVlukmieD0p56MoUQ4I-qq0Np19OrK7B1IEbOTHAhblmY-lE0xU-0SiLny-z8huYv8QK3x9cbxloGDIe9DXbLCXUuUxhWa1y3uy2VoItEsvhc1qL2qE-A0EJlo6wqaSNkyYjHAhMdcrJdMZcVACGptVh8KRLiAvZlMjeWT9X4f8Z_-x5T8y1Vzxy18_GVEJuCO3SDPWY3seYLi0Cx9p73WxTNDMdrAb4oBsmlN6m-E3VY8E4Z6l62TqI0RMs9-2KycWBVuauKQHOtP5A0toCMU2e9nJ4xF7_SY_8HbgUeXgfQzo3s6zIswqx.B4E-2N13qw2VpjTHg0cOdg',
          cardId: 'ATL:AUS:18:2020-09-27',
          durationMinutes: 290,
          numberOfStops: 1,
          departureTime: '2000'
        },
        isNextDayArrival: false,
        isOvernight: true
      }]
    };

    return this;
  }

  withMandatoryEmail() {
    this.response.needsEmailAddress = true;

    return this;
  }

  withDoubleConnect() {
    this.response.currentReservation.outbound.flights.push({
      number: '2202',
      wifiOnBoard: true,
      aircraftInfo: {
        aircraftType: 'Boeing 737-700',
        numberOfSeats: 143,
        wifiSupported: true
      }
    });

    return this;
  }

  build() {
    return { ...this.response };
  }
}

export default ChangeShoppingPageReaccomResponseBuilder;
