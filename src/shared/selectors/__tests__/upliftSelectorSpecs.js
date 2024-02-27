import dayjs from 'dayjs';
import _ from 'lodash';
import sinonModule from 'sinon';
import * as AirportsHelpers from 'src/airports/helpers/airportsHelpers';
import { PRICE_TYPES } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { POINTS } from 'src/shared/constants/currencyTypes';
import sharedConstants from 'src/shared/constants/sharedConstants';
import StorageKeys from 'src/shared/helpers/storageKeys';
import {
  getShouldDisableUplift, getShouldShowUplift, getUpliftAdditionalMessaging, getUpliftPaymentMethodConfigParams
} from 'src/shared/selectors/upliftSelector';
import store2 from 'store2';
import * as CeptorBuilder from 'test/builders/model/ceptorBuilder';
import uuidGenerator from 'uuid-js';

const sinon = sinonModule.sandbox.create();
const { APP_FLOWS } = sharedConstants;

describe('upliftSelector', () => {
  context('getShouldShowUplift', () => {
    const defaultAfpAvailability = { paymentMethod: 'paymentMethod', shouldDisplay: true };

    context(`when ${APP_FLOWS.AIR_BOOKING}`, () => {
      const applicationType = APP_FLOWS.AIR_BOOKING;

      context('when should display is true and not a swabiz or points booking and toggle is on', () => {
        it('should return true', () => {
          const result = getShouldShowUplift(applicationType).resultFunc(defaultAfpAvailability, true, true);

          expect(result).to.eq(true);
        });
      });

      context('when mbox toggle is on', () => {
        it('and is visible is false should return false', () => {
          const result = getShouldShowUplift(applicationType).resultFunc(defaultAfpAvailability, true, true, true);

          expect(result).to.eq(false);
        });

        it('and is visible is true should return true', () => {
          const result = getShouldShowUplift(applicationType).resultFunc(defaultAfpAvailability, true, true);

          expect(result).to.eq(true);
        });
      });

      context('when mbox toggle is off', () => {
        it('should ignore is visible flag', () => {
          const result = getShouldShowUplift(applicationType).resultFunc(defaultAfpAvailability, false, false);

          expect(result).to.eq(true);
        });
      });

      context('when should display is false', () => {
        it('should return false', () => {
          const afpAvailability = { ...defaultAfpAvailability, shouldDisplay: false };
          const result = getShouldShowUplift(applicationType).resultFunc(afpAvailability, true, false, false);

          expect(result).to.eq(false);
        });
      });

      context('when swabiz booking', () => {
        it('should return false', () => {
          const result = getShouldShowUplift(applicationType).resultFunc(
            defaultAfpAvailability,
            true,
            false,
            false,
            'company'
          );

          expect(result).to.eq(false);
        });
      });

      context('when points booking', () => {
        it('should return false', () => {
          const result = getShouldShowUplift(applicationType).resultFunc(
            defaultAfpAvailability,
            true,
            false,
            false,
            '',
            POINTS
          );

          expect(result).to.eq(false);
        });
      });
    });

    context('when is available and unmatched applicationType', () => {
      it('should return false', () => {
        const applicationType = 'fake-application';
        const result = getShouldShowUplift(applicationType).resultFunc(defaultAfpAvailability, true, false);

        expect(result).to.eq(false);
      });
    });
  });

  context('getShouldDisableUplift', () => {
    let afpAvailability = { paymentMethod: 'paymentMethod', isAvailable: false, shouldDisplay: true };

    context(`when ${APP_FLOWS.AIR_BOOKING}`, () => {
      const applicationType = APP_FLOWS.AIR_BOOKING;
      const futureDate = dayjs().add(10, 'd');
      const defaultState = {
        app: {
          airBooking: {
            flightPricingPage: {
              response: {
                flightPricingPage: {
                  bounds: [
                    {
                      departureDate: futureDate.format('MM-DD-YYYY'),
                      departureTime: futureDate.format('HH:mm')
                    }
                  ]
                }
              }
            },
            passengerInfos: [
              {
                passengerInfo: {
                  dateOfBirth: dayjs().subtract(20, 'y').format('MM-DD-YYYY')
                }
              }
            ]
          },
          wcmContent: {
            applicationProperties: {
              UPLIFT_TIME_TO_TRAVEL_HOURS_LIMIT: 24,
              UPLIFT_PAX_AGE_LIMIT: 18
            }
          }
        }
      };

      it('should return false when isAvailable is false, shouldDisplay true, outside 24 hours, and first pax over 18', () => {
        afpAvailability = { paymentMethod: 'paymentMethod', isAvailable: true, shouldDisplay: false };
        const result = getShouldDisableUplift(defaultState, applicationType).resultFunc(afpAvailability);

        expect(result).to.eq(false);
      });

      it('should return false when isAvailable is true and shouldDisplay false', () => {
        afpAvailability = { paymentMethod: 'paymentMethod', isAvailable: true, shouldDisplay: false };
        const result = getShouldDisableUplift(defaultState, applicationType).resultFunc(afpAvailability);

        expect(result).to.eq(false);
      });

      it('should return true when within 24 hours', () => {
        const tooCloseDate = dayjs().add(6, 'h');
        const newState = {
          app: {
            airBooking: {
              flightPricingPage: {
                response: {
                  flightPricingPage: {
                    bounds: [
                      {
                        departureDate: tooCloseDate.format('MM-DD-YYYY'),
                        departureTime: tooCloseDate.format('HH:mm')
                      }
                    ]
                  }
                }
              }
            }
          }
        };
        const state = _.merge({}, defaultState, newState);
        const result = getShouldDisableUplift(state, applicationType).resultFunc(afpAvailability);

        expect(result).to.eq(true);
      });

      it('should return true when first pax not over 18', () => {
        const newState = {
          app: {
            airBooking: {
              passengerInfos: [
                {
                  passengerInfo: {
                    dateOfBirth: dayjs().subtract(10, 'y').format('MM-DD-YYYY')
                  }
                }
              ]
            }
          }
        };
        const state = _.merge({}, defaultState, newState);
        const result = getShouldDisableUplift(state, applicationType).resultFunc(afpAvailability);

        expect(result).to.eq(true);
      });

      context('when uplift is available and shouldDisplay is true', () => {
        it('should return false', () => {
          const state = {};

          afpAvailability = { paymentMethod: 'paymentMethod', isAvailable: true, shouldDisplay: true };
          const result = getShouldDisableUplift(state, applicationType).resultFunc(afpAvailability);

          expect(result).to.eq(false);
        });
      });
    });

    context('when default state and unmatched applicationType', () => {
      const applicationType = 'fake-application';

      it('should return false', () => {
        const result = getShouldDisableUplift({}, applicationType).resultFunc(afpAvailability);

        expect(result).to.eq(false);
      });
    });
  });

  context('getUpliftPaymentMethodConfigParams', () => {
    const amount = 10000;
    const moneyTotal = { amount: '100.00', currencyCode: 'USA' };
    const expectedMoneyTotalCents = 10000;

    let ceptorConfig;
    let applicationType = 'fake-application';
    let storeGetStub;
    let storeSetStub;
    let uuidCreateStub;

    beforeEach(() => {
      storeGetStub = sinon.stub(store2.session, 'get').returns('uuid');
      storeSetStub = sinon.stub(store2.session, 'set');
      uuidCreateStub = sinon.stub(uuidGenerator, 'create').returns({ hex: 'uuid' });
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when ceptor config has no uplift section', () => {
      it('should return object without upliftData', () => {
        ceptorConfig = CeptorBuilder.getCeptorConfig();

        const result = getUpliftPaymentMethodConfigParams({}, ceptorConfig, amount, applicationType);

        expect(result).to.deep.eq({});
      });
    });

    context('when ceptor config is undefined', () => {
      it('should return empty object', () => {
        const result = getUpliftPaymentMethodConfigParams({}, undefined, amount, applicationType);

        expect(result).to.deep.eq({});
      });
    });

    context('when ceptor config requested afp params is undefined', () => {
      it('should return empty object', () => {
        const ceptorConfig = {
          requestedAFPParams: undefined
        };
        const result = getUpliftPaymentMethodConfigParams({}, ceptorConfig, amount, applicationType);

        expect(result).to.deep.eq({});
      });
    });

    context('when ceptor config requested afp params payment method config params is undefined', () => {
      it('should return empty object', () => {
        const ceptorConfig = {
          requestedAFPParams: {
            paymentMethodConfigParams: undefined
          }
        };
        const result = getUpliftPaymentMethodConfigParams({}, ceptorConfig, amount, applicationType);

        expect(result).to.deep.eq({});
      });
    });

    context('when ceptor config has uplift section', () => {
      context(`when application type is ${APP_FLOWS.AIR_BOOKING}`, () => {
        const fakeCity = 'fakeCity';
        const firstName = 'Test';
        const lastName = 'Pax';
        const dateOfBirth = '1990-11-30';

        const tripType = 'oneWay';
        const origin = 'DAL';
        const destination = 'LAX';

        const departureDate = dayjs().add(10, 'd');
        const fareProductId = 'ABC';

        const defaultState = {
          app: {
            airBooking: {
              earlyBirdEligibility: {
                unitPrice: moneyTotal,
                totalPrice: moneyTotal,
                adultProductsCount: 1
              },
              passengerInfos: [
                {
                  passengerInfo: {
                    firstName,
                    lastName,
                    dateOfBirth
                  }
                }
              ],
              searchRequest: {
                origin,
                destination,
                tripType
              },
              flightPricingPage: {
                response: {
                  flightPricingPage: {
                    bounds: [
                      {
                        departureAirport: {
                          code: origin
                        },
                        departureDate: departureDate.format('YYYY-MM-DD'),
                        arrivalAirport: {
                          code: destination
                        },
                        isNextDayArrival: false,
                        fareProductDetails: {
                          fareProductId
                        }
                      }
                    ],
                    totals: {
                      moneyTotal
                    }
                  }
                }
              }
            },
            formData: {
              AIRBOOKING_PURCHASE_SUMMARY_FORM: {
                data: {
                  isEarlyBirdInPathRadioButtonChecked: true
                }
              }
            }
          }
        };

        beforeEach(() => {
          sinon.stub(AirportsHelpers, 'getAirportFromCode').returns({ cityName: fakeCity });
          applicationType = APP_FLOWS.AIR_BOOKING;
        });

        it('should return ceptorConfig enriched with upliftData', () => {
          ceptorConfig = CeptorBuilder.getCeptorConfigWithEmptyUpliftConfig();

          const result = getUpliftPaymentMethodConfigParams(defaultState, ceptorConfig, amount, applicationType);

          // prices
          _.set(
            ceptorConfig,
            `requestedAFPParams.paymentMethodConfigParams[0].config.prices.${PRICE_TYPES.UP_TRIP_TOTAL}.value`,
            expectedMoneyTotalCents
          );
          _.set(
            ceptorConfig,
            `requestedAFPParams.paymentMethodConfigParams[0].config.prices.${PRICE_TYPES.UP_EARLY_BIRD_CHECK_IN}.value`,
            expectedMoneyTotalCents
          );

          // travelers
          const expectedPaxInfo = {
            id: 0,
            first_name: firstName,
            last_name: lastName
          };

          _.set(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams[0].config.tripInfo.travelers', [
            expectedPaxInfo
          ]);

          // air reservations
          const expectedAirReservations = {
            trip_type: tripType.toLowerCase(),
            origin,
            destination,
            itinerary: [
              {
                departure_apc: origin,
                departure_time: departureDate.format('YYYYMMDD'),
                departure_city: fakeCity,
                arrival_apc: destination,
                arrival_time: departureDate.format('YYYYMMDD'),
                arrival_city: fakeCity,
                carrier_code: 'WN',
                fare_class: fareProductId
              }
            ],
            price: expectedMoneyTotalCents
          };

          _.set(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams[0].config.tripInfo.air_reservations', [
            expectedAirReservations
          ]);

          // order lines
          const expectedOrderLines = [
            {
              name: 'EarlyBird Check-in',
              quantity: 1,
              total_amount: expectedMoneyTotalCents,
              unit_price: expectedMoneyTotalCents
            }
          ];

          _.set(
            ceptorConfig,
            'requestedAFPParams.paymentMethodConfigParams[0].config.tripInfo.order_lines',
            expectedOrderLines
          );

          expect(result).to.deep.equal(ceptorConfig.requestedAFPParams.paymentMethodConfigParams[0]);
        });

        it('should return correct ceptorConfig if early bird is launched from wcm placement', () => {
          const state = {
            app: {
              toggles: {
                EARLY_BIRD_AB_TESTING: true
              },
              airBooking: {
                earlyBirdSelected: true,
                earlyBirdEligibility: {
                  unitPrice: moneyTotal,
                  totalPrice: moneyTotal,
                  adultProductsCount: 1
                },
                passengerInfos: [
                  {
                    passengerInfo: {
                      firstName,
                      lastName,
                      dateOfBirth
                    }
                  }
                ],
                searchRequest: {
                  origin,
                  destination,
                  tripType
                },
                flightPricingPage: {
                  response: {
                    flightPricingPage: {
                      bounds: [
                        {
                          departureAirport: {
                            code: origin
                          },
                          departureDate: departureDate.format('YYYY-MM-DD'),
                          arrivalAirport: {
                            code: destination
                          },
                          isNextDayArrival: false,
                          fareProductDetails: {
                            fareProductId
                          }
                        }
                      ],
                      totals: {
                        moneyTotal
                      }
                    }
                  }
                }
              },
              formData: {
                AIRBOOKING_PURCHASE_SUMMARY_FORM: {
                  data: {
                    isEarlyBirdInPathRadioButtonChecked: true
                  }
                }
              }
            }
          };

          ceptorConfig = CeptorBuilder.getCeptorConfigWithEmptyUpliftConfig();

          const result = getUpliftPaymentMethodConfigParams(state, ceptorConfig, amount, applicationType);

          // prices
          _.set(
            ceptorConfig,
            `requestedAFPParams.paymentMethodConfigParams[0].config.prices.${PRICE_TYPES.UP_TRIP_TOTAL}.value`,
            expectedMoneyTotalCents
          );
          _.set(
            ceptorConfig,
            `requestedAFPParams.paymentMethodConfigParams[0].config.prices.${PRICE_TYPES.UP_EARLY_BIRD_CHECK_IN}.value`,
            expectedMoneyTotalCents
          );

          // travelers
          const expectedPaxInfo = {
            id: 0,
            first_name: firstName,
            last_name: lastName
          };

          _.set(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams[0].config.tripInfo.travelers', [
            expectedPaxInfo
          ]);

          // air reservations
          const expectedAirReservations = {
            trip_type: tripType.toLowerCase(),
            origin,
            destination,
            itinerary: [
              {
                departure_apc: origin,
                departure_time: departureDate.format('YYYYMMDD'),
                departure_city: fakeCity,
                arrival_apc: destination,
                arrival_time: departureDate.format('YYYYMMDD'),
                arrival_city: fakeCity,
                carrier_code: 'WN',
                fare_class: fareProductId
              }
            ],
            price: expectedMoneyTotalCents
          };

          _.set(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams[0].config.tripInfo.air_reservations', [
            expectedAirReservations
          ]);

          // order lines
          const expectedOrderLines = [
            {
              name: 'EarlyBird Check-in',
              quantity: 1,
              total_amount: expectedMoneyTotalCents,
              unit_price: expectedMoneyTotalCents
            }
          ];

          _.set(
            ceptorConfig,
            'requestedAFPParams.paymentMethodConfigParams[0].config.tripInfo.order_lines',
            expectedOrderLines
          );

          expect(result).to.deep.equal(ceptorConfig.requestedAFPParams.paymentMethodConfigParams[0]);
        });

        context('when isNextDayArrival is true', () => {
          it('should return next day for arrival date', () => {
            const state = {
              app: {
                airBooking: {
                  flightPricingPage: {
                    response: {
                      flightPricingPage: {
                        bounds: [
                          {
                            departureAirport: {
                              code: origin
                            },
                            departureDate: departureDate.format('YYYY-MM-DD'),
                            arrivalAirport: {
                              code: destination
                            },
                            isNextDayArrival: true,
                            fareProductDetails: {
                              fareProductId
                            }
                          }
                        ],
                        totals: {
                          moneyTotal
                        }
                      }
                    }
                  }
                }
              }
            };

            const updatedState = _.merge({}, defaultState, state);

            ceptorConfig = CeptorBuilder.getCeptorConfigWithEmptyUpliftConfig();

            const result = getUpliftPaymentMethodConfigParams(updatedState, ceptorConfig, amount, applicationType);
            const arrivalDate = _.get(result, 'config.tripInfo.air_reservations[0].itinerary[0].arrival_time');

            expect(arrivalDate).to.eq(dayjs(departureDate).add(1, 'd').format('YYYYMMDD'));
          });

          context('when earlyBirdSelected is false', () => {
            it('should return empty array for order_lines', () => {
              const state = {
                app: {
                  formData: {
                    AIRBOOKING_PURCHASE_SUMMARY_FORM: {
                      data: {
                        isEarlyBirdInPathRadioButtonChecked: false
                      }
                    }
                  }
                }
              };

              const updatedState = _.merge({}, defaultState, state);

              ceptorConfig = CeptorBuilder.getCeptorConfigWithEmptyUpliftConfig();

              const result = getUpliftPaymentMethodConfigParams(updatedState, ceptorConfig, amount, applicationType);
              const orderLines = _.get(result, 'config.tripInfo.order_lines');

              expect(orderLines).to.deep.eq([]);
            });
          });

          context('when persistenceIdentifier is in local storage', () => {
            it('should not call uuidGenerator', () => {
              getUpliftPaymentMethodConfigParams(defaultState, ceptorConfig, amount, applicationType);
              expect(uuidCreateStub).to.not.be.called;
            });
          });

          context('when persistenceIdentifier is not in local storage', () => {
            it('should call uuidGenerator', () => {
              storeGetStub.returns(undefined);
              getUpliftPaymentMethodConfigParams(defaultState, ceptorConfig, amount, applicationType);
              expect(uuidCreateStub).to.be.called;
              expect(storeSetStub).to.be.calledWith(StorageKeys.CEPTOR_PERSISTENCE_IDENTIFIER, 'uuid');
            });
          });
        });

        context('when state is unavailable', () => {
          it('should return ceptorConfig enriched with default upliftData', () => {
            applicationType = APP_FLOWS.AIR_BOOKING;
            ceptorConfig = CeptorBuilder.getCeptorConfigWithEmptyUpliftConfig();

            const result = getUpliftPaymentMethodConfigParams({}, ceptorConfig, amount, applicationType);

            _.set(
              ceptorConfig,
              'requestedAFPParams.paymentMethodConfigParams[0].config.prices.up-trip-total.value',
              expectedMoneyTotalCents
            );
            expect(result).to.deep.eq(ceptorConfig.requestedAFPParams.paymentMethodConfigParams[0]);
          });
        });
      });

      context('when application type is other flow', () => {
        it('should return ceptorConfig enriched with default upliftData', () => {
          applicationType = 'fake-application';
          ceptorConfig = CeptorBuilder.getCeptorConfigWithEmptyUpliftConfig();

          const result = getUpliftPaymentMethodConfigParams({}, ceptorConfig, amount, applicationType);

          _.set(
            ceptorConfig,
            'requestedAFPParams.paymentMethodConfigParams[0].config.prices.up-trip-total.value',
            expectedMoneyTotalCents
          );
          expect(result).to.deep.eq(ceptorConfig.requestedAFPParams.paymentMethodConfigParams[0]);
        });
      });
    });
  });

  context('getUpliftAdditionalMessaging', () => {
    let upliftAvailability;

    beforeEach(() => {
      upliftAvailability = {
        paymentMethod: 'PayMonthly',
        isAvailable: true,
        isActive: true,
        hasError: false,
        amount: 10000,
        parameters: {
          offers: {
            'up-trip-total': {
              monthlyPaymentAmount: 10000
            }
          }
        }
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return correct messaging for monthly amount', () => {
      const result = getUpliftAdditionalMessaging('up-trip-total').resultFunc(upliftAvailability);

      expect(result).to.deep.eq('Pay Monthly from $100.00/mo');
    });

    it('should return correct messaging for monthly amount ending in 0', () => {
      const availability = _.merge({}, upliftAvailability, {
        parameters: {
          offers: {
            'up-trip-total': {
              monthlyPaymentAmount: 10010
            }
          }
        }
      });
      const result = getUpliftAdditionalMessaging('up-trip-total').resultFunc(availability);

      expect(result).to.deep.eq('Pay Monthly from $100.10/mo');
    });

    it('should return undefined when offerId does not exist', () => {
      const result = getUpliftAdditionalMessaging('fake-offer-id').resultFunc(upliftAvailability);

      expect(result).to.deep.eq(undefined);
    });

    it('should return undefined when uplift is unavailable', () => {
      upliftAvailability = _.merge({}, upliftAvailability, { isAvailable: false });
      const result = getUpliftAdditionalMessaging('up-trip-total').resultFunc(upliftAvailability);

      expect(result).to.deep.eq(undefined);
    });
    it('should return undefined when monthlyPaymentAmount is 0', () => {
      upliftAvailability = _.merge({}, upliftAvailability, {
        parameters: {
          offers: {
            'up-trip-total': {
              monthlyPaymentAmount: 0
            }
          }
        }
      });
      const result = getUpliftAdditionalMessaging('up-trip-total').resultFunc(upliftAvailability);

      expect(result).to.deep.eq(undefined);
    });
  });
});
