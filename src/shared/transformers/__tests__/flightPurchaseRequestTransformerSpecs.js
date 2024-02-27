import _ from 'lodash';
import PurchaseFlightParamsBuilder from 'test/builders/model/purchaseFlightParamsBuilder';
import FakeClock from 'test/unit/helpers/fakeClock';
import optionsHelper from 'src/shared/helpers/optionsHelper';
import { transformToPurchaseRequest } from 'src/shared/transformers/flightPurchaseRequestTransformer';
import { UPLIFT, APPLE_PAY, UATP } from 'src/shared/constants/creditCardTypes';
import { TRAVEL_MANAGER_OPTIONS } from 'src/shared/constants/contactMethodOptions';

const contactMethodKeys = optionsHelper.keyMirror(TRAVEL_MANAGER_OPTIONS);

describe('flightPurchaseRequestTransformer', () => {
  context('transformToPurchaseRequest', () => {
    let expectedRequest;

    beforeEach(() => {
      expectedRequest = {
        body: {
          contactInformation: {
            contactMethod: 'CALL',
            phoneNumber: '11236548973',
            preferredLanguage: 'EN'
          },
          declineNotifications: false,
          payment: {
            pointsTotalBaseFare: null,
            moneyTotalFare: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            newCreditCard: {
              billingContactInfo: {
                address: {
                  addressLine1: 'asdfafa',
                  addressLine2: null,
                  city: 'Brooklyn',
                  isoCountryCode: 'US',
                  stateProvinceRegion: 'AS',
                  zipOrPostalCode: '12312'
                },
                firstName: 'adfds',
                lastName: 'gfd',
                phoneNumber: '5555555555'
              },
              cardNumber: '4123456789012',
              creditCardType: 'VISA',
              expiration: '2029-10',
              securityCode: '123',
              intentToStore: false,
              isPrimary: false
            }
          },
          promoCodeToken: null,
          purposeOfTravel: null,
          internalReferenceNumber: null,
          receiptEmail: 'aterris@example.com',
          reservationGroups: [
            {
              passengerType: 'ADULT',
              passengers: [
                {
                  accountNumber: '600597056',
                  dateOfBirth: '1959-12-22',
                  gender: 'M',
                  knownTravelerId: '42345345',
                  name: {
                    firstName: 'Andrew',
                    lastName: 'Phillips',
                    middleName: null,
                    suffix: null
                  },
                  passengerReference: 2,
                  redressNumber: '123435456'
                }
              ],
              productIds: [
                'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTRUMTM6MDAtMDU6MDAsMjAxNy0xMi0xNFQxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0='
              ],
              amountApplied: {
                totalBaseFare: {
                  amount: '203.52',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                taxesAndFees: [
                  {
                    code: 'US',
                    description: 'Excise Taxes',
                    fee: {
                      amount: '15.26',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'AY',
                    description: 'Sept 11 Security Fee',
                    fee: {
                      amount: '5.60',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'ZP',
                    description: 'Segment Fee',
                    fee: {
                      amount: '4.20',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'XF',
                    description: 'Passenger Facility Charge',
                    fee: {
                      amount: '4.50',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  }
                ]
              }
            }
          ],
          sharedItineraryEmail: 'test@test.com'
        },
        href: '/v1/mobile-air-booking/page/flights/purchase',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        method: 'POST'
      };
    });

    afterEach(() => {
      FakeClock.restore();
    });

    context('middle name and suffix', () => {
      it('should transform passenger middle name and suffix', () => {
        FakeClock.setTimeTo('2017-12-04T11:19');
        _.set(expectedRequest, 'body.reservationGroups[0].passengers[0].name.middleName', 'Fred');
        _.set(expectedRequest, 'body.reservationGroups[0].passengers[0].name.suffix', 'CEO');

        const purchaseFlightParams = new PurchaseFlightParamsBuilder().withPassengerWithSuffix().build();

        purchaseFlightParams.passengerInfos[0].passengerInfo.middleName = 'Fred';
        const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams);

        expect(purchaseRequest).to.deep.equal(expectedRequest);
      });
    });

    it('should transform to purchase request for one adult one way flight', () => {
      FakeClock.setTimeTo('2017-12-04T11:19');

      const purchaseRequest = transformToPurchaseRequest(new PurchaseFlightParamsBuilder().build());

      expect(purchaseRequest).to.deep.equal(expectedRequest);
    });

    it('should transform to purchase request for one adult and one lap child one way flight', () => {
      const purchaseRequest = transformToPurchaseRequest(new PurchaseFlightParamsBuilder().withLapChildInBooking());

      expect(purchaseRequest).toMatchSnapshot();
    });

    it('should transform to purchase request for one adult one way flight with early bird', () => {
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder()
          .withEarlyBirdInPathRadioButtonChecked()
          .withEarlyBird()
          .withPriceTotal('248.98')
          .build()
      );

      expect(purchaseRequest.body.earlyBird).to.deep.equal([
        {
          productId: 'mockProductId',
          passengerReference: ['2'],
          fare: {
            baseFare: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' },
            totalTaxesAndFees: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' },
            totalFare: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' }
          }
        }
      ]);
      expect(purchaseRequest.body.payment.moneyTotalFare).to.deep.equal({
        amount: '248.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });

    it('should not include early bird part when we uncheck the eb in path radio button', () => {
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder().withEarlyBird().withPriceTotal('248.98').build()
      );

      expect(purchaseRequest.body.earlyBird).to.equal(undefined);
    });

    it('should include early bird part when eb is selected from wcm placement', () => {
      const expectedEarlyBird = [
        {
          productId: 'mockProductId',
          passengerReference: ['2'],
          fare: {
            baseFare: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' },
            totalTaxesAndFees: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' },
            totalFare: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' }
          }
        }
      ];
      const purchaseFlightParams = _.merge(
        {},
        new PurchaseFlightParamsBuilder().withEarlyBird().withPriceTotal('248.98').build(),
        { earlyBirdSelected: true }
      );
      const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams);

      expect(purchaseRequest.body.earlyBird).to.deep.equal(expectedEarlyBird);
    });

    it('should not send eb if no passenger is eligible', () => {
      const purchaseFlightParams = _.merge(
        {},
        new PurchaseFlightParamsBuilder().withIneligibleEarlyBird().withPriceTotal('248.98').build(),
        { earlyBirdSelected: true }
      );
      const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams);

      expect(purchaseRequest.body.earlyBird).to.be.undefined;
    });

    it('should include earlyBirdPricingDifference in the request body if it exists and early bird is selected', () => {
      const purchaseFlightParams = _.merge({}, new PurchaseFlightParamsBuilder().withEarlyBird().build(), {
        earlyBirdPricingDifference: 'increase',
        earlyBirdSelected: true
      });
      const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams);

      expect(purchaseRequest.body.earlyBirdPricingDifference).to.deep.equal('increase');
    });

    it('should not include earlyBirdPricingDifference in the request body if early bird is not selected', () => {
      const purchaseFlightParams = _.merge({}, new PurchaseFlightParamsBuilder().withEarlyBird().build(), {
        earlyBirdPricingDifference: 'increase'
      });
      const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams);

      expect(purchaseRequest.body.earlyBirdPricingDifference).to.be.undefined;
    });

    it('should transform correctly with points booking', () => {
      const purchaseFlightParams = new PurchaseFlightParamsBuilder().build();

      purchaseFlightParams.flightPricingPageResponse.flightPricingPage.totals.pointsTotal = {
        amount: '2,3398',
        currencyCode: 'PTS',
        currencySymbol: null
      };

      const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams);

      expect(purchaseRequest.body.payment.pointsTotalBaseFare).to.deep.equal({
        amount: '2,3398',
        currencyCode: 'PTS'
      });
    });

    it('should transform multiple passenger in reservationGroup passengers section', () => {
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder().withMultiplePassengers().build()
      );

      expect(purchaseRequest.body.reservationGroups[0].passengers).to.have.lengthOf(2);
    });

    it('should transform multiple passenger in reservationGroup passengers section with frequentTravelerToken, frquentTravelerId', () => {
      const purchaseParams = new PurchaseFlightParamsBuilder().withMultiplePassengers().build();
      const updatedPurchaseInfoParams = {
        ...purchaseParams,
        passengerInfos: [
          {
            ...purchaseParams.passengerInfos[0],
            passengerInfo: {
              ...purchaseParams.passengerInfos[0].passengerInfo,
              frequentTravelerId: 'test id',
              frequentTravelerToken: 'test token',
              saveAsFrequentTraveler: true
            }
          },
          {
            ...purchaseParams.passengerInfos[1]
          }
        ]
      };
      const purchaseRequest = transformToPurchaseRequest(updatedPurchaseInfoParams);

      expect(purchaseRequest.body.reservationGroups[0].passengers[0]).to.include.keys(
        'frequentTravelerId',
        'frequentTravelerToken',
        'saveAsFrequentTraveler'
      );
    });

    it('should set the optional field as null if the value is empty string', () => {
      const purchaseRequest = transformToPurchaseRequest(new PurchaseFlightParamsBuilder().build());

      expect(purchaseRequest.body.reservationGroups[0].passengers[0].name.middleName).to.be.null;
      expect(purchaseRequest.body.payment.newCreditCard.billingContactInfo.address.addressLine2).to.be.null;
      expect(purchaseRequest.body.purposeOfTravel).to.be.null;
    });

    it('should contain savedCreditCard and securityCode when selected credit card id is not NEW_CREDIT_CARD_ID', () => {
      const expectedSavedCardRequest = {
        body: {
          contactInformation: {
            contactMethod: 'CALL',
            phoneNumber: '11236548973',
            preferredLanguage: 'EN'
          },
          declineNotifications: false,
          payment: {
            pointsTotalBaseFare: null,
            moneyTotalFare: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              savedCreditCardId: '1-4BGFWY',
              securityCode: '1234'
            }
          },
          promoCodeToken: null,
          purposeOfTravel: null,
          internalReferenceNumber: null,
          receiptEmail: 'aterris@example.com',
          reservationGroups: [
            {
              passengerType: 'ADULT',
              passengers: [
                {
                  accountNumber: '600597056',
                  dateOfBirth: '1959-12-22',
                  gender: 'M',
                  knownTravelerId: '42345345',
                  name: {
                    firstName: 'Andrew',
                    lastName: 'Phillips',
                    middleName: null,
                    suffix: null
                  },
                  passengerReference: 2,
                  redressNumber: '123435456'
                }
              ],
              productIds: [
                'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTRUMTM6MDAtMDU6MDAsMjAxNy0xMi0xNFQxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0='
              ],
              amountApplied: {
                totalBaseFare: {
                  amount: '203.52',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                taxesAndFees: [
                  {
                    code: 'US',
                    description: 'Excise Taxes',
                    fee: {
                      amount: '15.26',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'AY',
                    description: 'Sept 11 Security Fee',
                    fee: {
                      amount: '5.60',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'ZP',
                    description: 'Segment Fee',
                    fee: {
                      amount: '4.20',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'XF',
                    description: 'Passenger Facility Charge',
                    fee: {
                      amount: '4.50',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  }
                ]
              }
            }
          ],
          sharedItineraryEmail: 'test@test.com'
        },
        href: '/v1/mobile-air-booking/page/flights/purchase',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        method: 'POST'
      };
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder().withUsingSavedCreditCardAndSecurityCode().build()
      );

      expect(purchaseRequest).to.deep.equal(expectedSavedCardRequest);
    });

    it('should contain savedCreditCard when selected credit card id is not NEW_CREDIT_CARD_ID', () => {
      const expectedSavedCardRequest = {
        body: {
          contactInformation: {
            contactMethod: 'CALL',
            phoneNumber: '11236548973',
            preferredLanguage: 'EN'
          },
          declineNotifications: false,
          payment: {
            pointsTotalBaseFare: null,
            moneyTotalFare: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              savedCreditCardId: '1-4BGFWY'
            }
          },
          promoCodeToken: null,
          purposeOfTravel: null,
          internalReferenceNumber: null,
          receiptEmail: 'aterris@example.com',
          reservationGroups: [
            {
              passengerType: 'ADULT',
              passengers: [
                {
                  accountNumber: '600597056',
                  dateOfBirth: '1959-12-22',
                  gender: 'M',
                  knownTravelerId: '42345345',
                  name: {
                    firstName: 'Andrew',
                    lastName: 'Phillips',
                    middleName: null,
                    suffix: null
                  },
                  passengerReference: 2,
                  redressNumber: '123435456'
                }
              ],
              productIds: [
                'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTRUMTM6MDAtMDU6MDAsMjAxNy0xMi0xNFQxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0='
              ],
              amountApplied: {
                totalBaseFare: {
                  amount: '203.52',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                taxesAndFees: [
                  {
                    code: 'US',
                    description: 'Excise Taxes',
                    fee: {
                      amount: '15.26',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'AY',
                    description: 'Sept 11 Security Fee',
                    fee: {
                      amount: '5.60',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'ZP',
                    description: 'Segment Fee',
                    fee: {
                      amount: '4.20',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'XF',
                    description: 'Passenger Facility Charge',
                    fee: {
                      amount: '4.50',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  }
                ]
              }
            }
          ],
          sharedItineraryEmail: 'test@test.com'
        },
        href: '/v1/mobile-air-booking/page/flights/purchase',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        method: 'POST'
      };
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder().withUsingSavedCreditCard().build()
      );

      expect(purchaseRequest).to.deep.equal(expectedSavedCardRequest);
    });

    it('should contain savedGhostCard when selected credit card id is a ghost card', () => {
      const expectedSavedCardRequest = {
        body: {
          contactInformation: {
            contactMethod: 'CALL',
            phoneNumber: '11236548973',
            preferredLanguage: 'EN'
          },
          declineNotifications: false,
          payment: {
            pointsTotalBaseFare: null,
            moneyTotalFare: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedGhostCard: {
              savedGhostCardId: 'ghost card name'
            }
          },
          promoCodeToken: null,
          purposeOfTravel: null,
          internalReferenceNumber: null,
          receiptEmail: 'aterris@example.com',
          reservationGroups: [
            {
              passengerType: 'ADULT',
              passengers: [
                {
                  accountNumber: '600597056',
                  dateOfBirth: '1959-12-22',
                  gender: 'M',
                  knownTravelerId: '42345345',
                  name: {
                    firstName: 'Andrew',
                    lastName: 'Phillips',
                    middleName: null,
                    suffix: null
                  },
                  passengerReference: 2,
                  redressNumber: '123435456'
                }
              ],
              productIds: [
                'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTRUMTM6MDAtMDU6MDAsMjAxNy0xMi0xNFQxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0='
              ],
              amountApplied: {
                totalBaseFare: {
                  amount: '203.52',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                taxesAndFees: [
                  {
                    code: 'US',
                    description: 'Excise Taxes',
                    fee: {
                      amount: '15.26',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'AY',
                    description: 'Sept 11 Security Fee',
                    fee: {
                      amount: '5.60',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'ZP',
                    description: 'Segment Fee',
                    fee: {
                      amount: '4.20',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'XF',
                    description: 'Passenger Facility Charge',
                    fee: {
                      amount: '4.50',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  }
                ]
              }
            }
          ],
          sharedItineraryEmail: 'test@test.com'
        },
        href: '/v1/mobile-air-booking/page/flights/purchase',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        method: 'POST'
      };
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder().withUsingGhostCard().build()
      );

      expect(purchaseRequest).to.deep.equal(expectedSavedCardRequest);
    });

    it('should not contain savedGhostCard if selectedCardId and selectedGhostCardId do not match', () => {
      const expectedSavedCardRequest = {
        body: {
          contactInformation: {
            contactMethod: 'CALL',
            phoneNumber: '11236548973',
            preferredLanguage: 'EN'
          },
          declineNotifications: false,
          payment: {
            pointsTotalBaseFare: null,
            moneyTotalFare: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              savedCreditCardId: '1-4BGFWY'
            }
          },
          promoCodeToken: null,
          purposeOfTravel: null,
          internalReferenceNumber: null,
          receiptEmail: 'aterris@example.com',
          reservationGroups: [
            {
              passengerType: 'ADULT',
              passengers: [
                {
                  accountNumber: '600597056',
                  dateOfBirth: '1959-12-22',
                  gender: 'M',
                  knownTravelerId: '42345345',
                  name: {
                    firstName: 'Andrew',
                    lastName: 'Phillips',
                    middleName: null,
                    suffix: null
                  },
                  passengerReference: 2,
                  redressNumber: '123435456'
                }
              ],
              productIds: [
                'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTRUMTM6MDAtMDU6MDAsMjAxNy0xMi0xNFQxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0='
              ],
              amountApplied: {
                totalBaseFare: {
                  amount: '203.52',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                taxesAndFees: [
                  {
                    code: 'US',
                    description: 'Excise Taxes',
                    fee: {
                      amount: '15.26',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'AY',
                    description: 'Sept 11 Security Fee',
                    fee: {
                      amount: '5.60',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'ZP',
                    description: 'Segment Fee',
                    fee: {
                      amount: '4.20',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'XF',
                    description: 'Passenger Facility Charge',
                    fee: {
                      amount: '4.50',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  }
                ]
              }
            }
          ],
          sharedItineraryEmail: 'test@test.com'
        },
        href: '/v1/mobile-air-booking/page/flights/purchase',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        method: 'POST'
      };
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder().withUsingMismatchedGhostCard().build()
      );

      expect(purchaseRequest).to.deep.equal(expectedSavedCardRequest);
    });

    it('should contain chaseInstantCreditCard when selected credit card id is not NEW_CREDIT_CARD_ID', () => {
      const purchaseRequest = transformToPurchaseRequest(
        new PurchaseFlightParamsBuilder().withChaseCreditCard().build()
      );

      expect(purchaseRequest.body.payment.chaseInstantCreditCard).to.deep.equal({
        phoneNumber: '2223334444',
        sessionId: 'fakeChaseSessionId'
      });
    });

    it('should transform the name correctly when name contain multiple spaces', () => {
      const purchaseParams = new PurchaseFlightParamsBuilder().build();

      _.set(purchaseParams, 'paymentInfo.nameOnCard', 'Bob  Alex ');

      const purchaseRequest = transformToPurchaseRequest(purchaseParams);

      const { billingContactInfo } = purchaseRequest.body.payment.newCreditCard;

      expect(billingContactInfo.firstName).to.equal('Bob');
      expect(billingContactInfo.lastName).to.equal('Alex');
    });

    it('should transform to use new credit card when use a new payment method', () => {
      const purchaseParams = _.omit(new PurchaseFlightParamsBuilder().build(), 'paymentInfo.selectedCardId');

      const purchaseRequest = transformToPurchaseRequest(purchaseParams);

      const { newCreditCard } = purchaseRequest.body.payment;

      expect(newCreditCard).to.exist;
    });

    it('should transform passport information if not empty', () => {
      const purchaseParams = _.merge({}, new PurchaseFlightParamsBuilder().build(), {
        passengerInfos: [
          {
            passportAndEmergencyContact: {
              passportNumber: '231312321',
              passportIssuedBy: 'AS',
              nationality: 'AS',
              passportExpirationDate: '2019-05-09',
              countryOfResidence: 'AG',
              emergencyContactSaveForAllPassengers: '',
              doNotWishToProvideAnEmergencyContact: 'false',
              emergencyContactName: '',
              emergencyContactPhoneNumber: '',
              emergencyContactCountryDialingCode: '',
              emergencyContactCountryCode: 'US'
            }
          }
        ]
      });
      const purchaseRequest = transformToPurchaseRequest(purchaseParams);

      expect(purchaseRequest.body.reservationGroups[0].passengers[0].passportInformation).to.be.deep.equal({
        passportNumber: '231312321',
        passportIssuedBy: 'AS',
        nationality: 'AS',
        passportExpirationDate: '2019-05-09',
        countryOfResidence: 'AG'
      });
    });

    it('should not add passport information or emergency contact if empty', () => {
      const purchaseParams = _.merge({}, new PurchaseFlightParamsBuilder().build());
      const purchaseRequest = transformToPurchaseRequest(purchaseParams);

      expect(purchaseRequest.body.reservationGroups[0].passengers[0].passportInformation).to.not.be.exist;
      expect(purchaseRequest.body.reservationGroups[0].passengers[0].emergencyContact).to.not.be.exist;
    });

    it('should not add emergency contact if name is empty', () => {
      const purchaseParams = _.merge({}, new PurchaseFlightParamsBuilder().build(), {
        passengerInfos: [
          {
            passportAndEmergencyContact: {
              emergencyContactSaveForAllPassengers: '',
              emergencyContactName: '',
              emergencyContactPhoneNumber: '214-470-1501',
              emergencyContactCountryDialingCode: '',
              emergencyContactCountryCode: 'US'
            }
          }
        ]
      });
      const purchaseRequest = transformToPurchaseRequest(purchaseParams);

      expect(purchaseRequest.body.reservationGroups[0].passengers[0].emergencyContact).to.not.be.exist;
    });

    it('should not add emergency contact if number is empty', () => {
      const purchaseParams = _.merge({}, new PurchaseFlightParamsBuilder().build(), {
        passengerInfos: [
          {
            passportAndEmergencyContact: {
              emergencyContactSaveForAllPassengers: '',
              emergencyContactName: 'Bin Ma',
              emergencyContactPhoneNumber: '',
              emergencyContactCountryDialingCode: '',
              emergencyContactCountryCode: 'US'
            }
          }
        ]
      });
      const purchaseRequest = transformToPurchaseRequest(purchaseParams);

      expect(purchaseRequest.body.reservationGroups[0].passengers[0].emergencyContact).to.not.be.exist;
    });

    it('should add emergency contact if number and not empty is empty', () => {
      const purchaseParams = _.merge({}, new PurchaseFlightParamsBuilder().build(), {
        passengerInfos: [
          {
            passportAndEmergencyContact: {
              emergencyContactSaveForAllPassengers: '',
              emergencyContactName: 'Bin Ma',
              emergencyContactPhoneNumber: '214-470-1501',
              emergencyContactCountryDialingCode: '',
              emergencyContactCountryCode: 'US'
            }
          }
        ]
      });
      const purchaseRequest = transformToPurchaseRequest(purchaseParams);

      expect(purchaseRequest.body.reservationGroups[0].passengers[0].emergencyContact).to.be.deep.equal({
        emergencyContactInformation: {
          contactPhone: {
            countryCode: 'US',
            number: '2144701501'
          },
          name: 'Bin Ma'
        }
      });
    });

    it('should add internal reference number', () => {
      const purchaseRequest = transformToPurchaseRequest(new PurchaseFlightParamsBuilder().withSelectedIrn().build());

      expect(purchaseRequest.body.internalReferenceNumber).to.equal('mockIrn');
    });

    context('paypal', () => {
      it('should contain paypal payment info in the purchase request when paypal card is used', () => {
        const purchaseParams = new PurchaseFlightParamsBuilder().withPayPalCard().build();
        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        const { paypal } = purchaseRequest.body.payment;

        expect(paypal).to.be.deep.equal({
          paypalToken: 'EC-2KM06629GE7385637'
        });
      });
    });

    context('applePay', () => {
      it('should set up newCreditCard with applePay information when applePay is used', () => {
        const purchaseParams = new PurchaseFlightParamsBuilder().withApplePayCard().build();
        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        const applePay = purchaseRequest.body.payment.newCreditCard;

        expect(applePay).to.deep.eql({
          billingContactInfo: {
            address: {
              addressLine1: '1234 Test Ln',
              addressLine2: '',
              city: 'Dallas',
              isoCountryCode: 'US',
              stateProvinceRegion: 'TX',
              zipOrPostalCode: '12312'
            },
            firstName: 'First',
            lastName: 'Last'
          },
          cardNumber: '123456',
          creditCardType: UATP.key,
          digitalPaymentType: APPLE_PAY.key,
          digitalTransactionId: '123456',
          expiration: '2020-01'
        });
      });

      it('should set up newCreditCard with native applePay information when native applePay is used', () => {
        const moneyTotalFare = 'moneyTotalFare';
        const pointsTotalBaseFare = null;

        const purchaseParams = new PurchaseFlightParamsBuilder().withNativeApplePayCard().build();

        _.set(purchaseParams, 'priceTotal.totals.moneyTotal', moneyTotalFare);

        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        const applePay = purchaseRequest.body.payment;

        expect(applePay).to.deep.eql({
          moneyTotalFare,
          pointsTotalBaseFare,
          ...purchaseParams.applePayCard.purchaseRequest
        });
      });
    });

    context('uplift', () => {
      it('should set up newCreditCard with uplift information when uplift is used', () => {
        const purchaseParams = new PurchaseFlightParamsBuilder().withUpliftCard().build();
        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        const upliftCard = purchaseRequest.body.payment.newCreditCard;

        expect(upliftCard).to.deep.eql({
          billingContactInfo: {
            address: {
              addressLine1: '1234 Test Ln',
              addressLine2: '',
              city: 'Dallas',
              isoCountryCode: 'US',
              stateProvinceRegion: 'TX',
              zipOrPostalCode: '12312'
            },
            firstName: 'First',
            lastName: 'Last'
          },
          cardNumber: '123456',
          creditCardType: UATP.key,
          digitalPaymentType: UPLIFT.key,
          digitalTransactionId: undefined,
          expiration: '2020-01'
        });
      });
    });

    context('express purchase request', () => {
      context('reservationGroups field', () => {
        it('should return updated reservation groups', () => {
          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };
          const { reservationGroups } =
            purchaseParams.flightPricingPageResponse.flightPricingPage._links.flightConfirmationPage.body;

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.reservationGroups.size).to.equal(reservationGroups.size);
          expect(purchaseRequest.body.reservationGroups[0].passengerType).to.equal(
            _.toUpper(reservationGroups[0].passengerType)
          );
        });

        it('should return empty reservation groups if none exist in params', () => {
          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(
            purchaseParams,
            'flightPricingPageResponse.flightPricingPage._links.flightConfirmationPage.body.reservationGroups',
            undefined
          );

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.reservationGroups).to.be.eql([]);
        });
      });

      context('declineNotifications field', () => {
        it('should return declineNotifications as true when true in params', () => {
          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(purchaseParams, 'contactMethodInfo.declineNotifications', true);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.declineNotifications).to.be.true;
        });

        it('should return declineNotifications as false when not in params', () => {
          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.declineNotifications).to.be.false;
        });
      });

      context('payment field', () => {
        it('should return payment with money total when fundsAppliedToken does not exist', () => {
          const moneyTotal = 'moneyTotal';

          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(purchaseParams, 'fundsAppliedToken', undefined);
          _.set(purchaseParams, 'priceTotal.totals.moneyTotal', moneyTotal);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.payment.moneyTotalFare).to.equal(moneyTotal);
        });

        it('should return payment with travelFundsBalanceRemaining when fundsAppliedToken exists', () => {
          const travelFundsBalanceRemaining = 'travelFundsBalanceRemaining';

          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(purchaseParams, 'fundsAppliedToken', 'fundsAppliedToken');
          _.set(purchaseParams, 'travelFundsBalanceRemaining', travelFundsBalanceRemaining);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.payment.moneyTotalFare).to.equal(travelFundsBalanceRemaining);
        });

        it('should return payment with undefined pointsTotalBaseFare when pointsTotal undefined', () => {
          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(purchaseParams, 'flightPricingPageResponse.flightPricingPage.totals.pointsTotal', undefined);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.payment.pointsTotalBaseFare).to.equal(undefined);
        });

        it('should return payment with pointsTotalBaseFare with fields from pointsTotal', () => {
          const pointsTotal = { amount: 'amount', currencyCode: 'code' };

          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(purchaseParams, 'flightPricingPageResponse.flightPricingPage.totals.pointsTotal', {
            ...pointsTotal,
            extraField: 'extraField'
          });

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.payment.pointsTotalBaseFare).to.eql(pointsTotal);
        });
      });

      context('earlyBird field', () => {
        it('should return early bird when it exists', () => {
          const purchaseParams = {
            ...new PurchaseFlightParamsBuilder().withEarlyBirdInPathRadioButtonChecked().withEarlyBird().build()
          };

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.earlyBird).to.eql([
            {
              productId: 'mockProductId',
              passengerReference: ['2'],
              fare: {
                baseFare: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' },
                totalTaxesAndFees: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' },
                totalFare: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' }
              }
            }
          ]);
        });

        it('should omit early bird when it does not exist', () => {
          const purchaseParams = {
            ...new PurchaseFlightParamsBuilder().withEarlyBirdInPathRadioButtonChecked().build()
          };

          _.set(purchaseParams, 'earlyBirdEligibility', undefined);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.earlyBird).to.be.undefined;
        });

        it('should omit early bird when isEarlyBirdInPathRadioButtonChecked is false', () => {
          const purchaseParams = { ...new PurchaseFlightParamsBuilder().withEarlyBird().build() };

          _.set(purchaseParams, 'formData.isEarlyBirdInPathRadioButtonChecked', false);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.earlyBird).to.be.undefined;
        });
      });

      context('savedCreditCardSecurityCode field', () => {
        it('should return savedCreditCardSecurityCode when securityCode exists in form data', () => {
          const securityCode = 'securityCode';

          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(purchaseParams, 'formData.securityCode', securityCode);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.savedCreditCardSecurityCode).to.equal(securityCode);
        });

        it('should omit savedCreditCardSecurityCode when securityCode does not exist in form data', () => {
          const purchaseParams = _.merge({}, new PurchaseFlightParamsBuilder().build());

          _.set(purchaseParams, 'formData.securityCode', undefined);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.savedCreditCardSecurityCode).to.be.undefined;
        });
      });

      context('purposeOfTravel field', () => {
        it('should return purposeOfTravel when it exists in form data', () => {
          const purposeOfTravel = 'purposeOfTravel';

          const purchaseParams = { ...new PurchaseFlightParamsBuilder().build() };

          _.set(purchaseParams, 'formData.purposeOfTravel', purposeOfTravel);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.purposeOfTravel).to.equal(purposeOfTravel);
        });

        it('should omit purposeOfTravel when it does not exist in form data', () => {
          const purchaseParams = _.merge({}, new PurchaseFlightParamsBuilder().build());

          _.set(purchaseParams, 'formData.purposeOfTravel', undefined);

          const purchaseRequest = transformToPurchaseRequest(purchaseParams, true);

          expect(purchaseRequest.body.purposeOfTravel).to.be.undefined;
        });
      });

      context('internal reference number field', () => {
        it('should add internal reference number', () => {
          const purchaseRequest = transformToPurchaseRequest(
            new PurchaseFlightParamsBuilder().withSelectedIrn().build(),
            true
          );

          expect(purchaseRequest.body.internalReferenceNumber).to.equal('mockIrn');
        });

        it('should omit irn when it does not exist in form data', () => {
          const purchaseRequest = transformToPurchaseRequest(new PurchaseFlightParamsBuilder().build(), true);

          expect(purchaseRequest.body.internalReferenceNumber).to.be.null;
        });
      });
    });

    context('specialAssistance', () => {
      it('should contain Non Changable Ancillary Products in the passenger section of the purchase request when a passenger has specialAssistance options', () => {
        const purchaseParams = new PurchaseFlightParamsBuilder().withSpecialAssistance().build();

        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        const products = purchaseRequest.body.reservationGroups[0].passengers[0].nonChargeableAncillaryProducts;

        expect(products).to.deep.equal([{ ancillaryType: 'ASSISTANCE_ANIMAL' }]);
      });
    });

    context('Travel Funds', () => {
      it('should use balanceRemaining instead of priceTotal if fundsAppliedToken exists and send credit card to pay for remaining balance', () => {
        const purchaseParams = new PurchaseFlightParamsBuilder().withTravelFunds().build();

        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        expect(purchaseRequest.body.payment.moneyTotalFare).to.deep.equal({
          amount: '50.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        });
        expect(purchaseRequest.body.payment.newCreditCard).to.exist;
      });
      it('should use balanceRemaining instead of priceTotal if fundsAppliedToken exists and not send credit card if balance remaining is $0', () => {
        const purchaseParams = new PurchaseFlightParamsBuilder().withTravelFunds().withZeroBalanceRemaining().build();

        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        expect(purchaseRequest.body.payment.moneyTotalFare).to.deep.equal({
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        });
        expect(purchaseRequest.body.payment.savedCreditCard).to.be.undefined;
        expect(purchaseRequest.body.payment.newCreditCard).to.be.undefined;
        expect(purchaseRequest.body.payment.chaseInstantCreditCard).to.be.undefined;
      });
      it('should send travelFundsAddress when travel funds covers entire cost', () => {
        const purchaseParams = new PurchaseFlightParamsBuilder().withTravelFunds().withZeroBalanceRemaining().build();

        const purchaseRequest = transformToPurchaseRequest(purchaseParams);

        expect(purchaseRequest.body.travelFundsAddress).to.deep.equal({
          phoneNumber: '3214567890',
          address: {
            addressLine1: 'Testing',
            addressLine2: null,
            city: 'Austin',
            isoCountryCode: 'US',
            stateProvinceRegion: 'Texas',
            zipOrPostalCode: '12345'
          }
        });
      });
    });
  });

  describe('dutyCareContact', () => {
    it('should contain dutyCareContact data', () => {
      const expectedSavedCardRequest = {
        body: {
          contactInformation: {
            contactMethod: 'CALL',
            phoneNumber: '11236548973',
            preferredLanguage: 'EN'
          },
          dutyOfCareContact: {
            contactMethod: contactMethodKeys.CALL_ME,
            contactPhone: {
              number: '3455664545',
              countryCode: '1'
            }
          },
          declineNotifications: false,
          payment: {
            pointsTotalBaseFare: null,
            moneyTotalFare: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            savedCreditCard: {
              savedCreditCardId: '1-4BGFWY',
              securityCode: '1234'
            }
          },
          promoCodeToken: null,
          purposeOfTravel: null,
          internalReferenceNumber: null,
          receiptEmail: 'aterris@example.com',
          reservationGroups: [
            {
              passengerType: 'ADULT',
              passengers: [
                {
                  accountNumber: '600597056',
                  dateOfBirth: '1959-12-22',
                  gender: 'M',
                  knownTravelerId: '42345345',
                  name: {
                    firstName: 'Andrew',
                    lastName: 'Phillips',
                    middleName: null,
                    suffix: null
                  },
                  passengerReference: 2,
                  redressNumber: '123435456'
                }
              ],
              productIds: [
                'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTRUMTM6MDAtMDU6MDAsMjAxNy0xMi0xNFQxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0='
              ],
              amountApplied: {
                totalBaseFare: {
                  amount: '203.52',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                taxesAndFees: [
                  {
                    code: 'US',
                    description: 'Excise Taxes',
                    fee: {
                      amount: '15.26',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'AY',
                    description: 'Sept 11 Security Fee',
                    fee: {
                      amount: '5.60',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'ZP',
                    description: 'Segment Fee',
                    fee: {
                      amount: '4.20',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'XF',
                    description: 'Passenger Facility Charge',
                    fee: {
                      amount: '4.50',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  }
                ]
              }
            }
          ],
          sharedItineraryEmail: 'test@test.com'
        },
        href: '/v1/mobile-air-booking/page/flights/purchase',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        method: 'POST'
      };
      const purchaseRequest = transformToPurchaseRequest(new PurchaseFlightParamsBuilder().withDutyOfCareContact().build());

      expect(purchaseRequest).to.deep.equal(expectedSavedCardRequest);
    });
  });

  describe('splitPayment', () => {
    const calculateFundsTaxesAndFees = [{
      code: 'US',
      description: 'Excise Taxes',
      fee: {
        amount: '15.26',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    },
    {
      code: 'AY',
      description: 'Sept 11 Security Fee',
      fee: {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    },
    {
      code: 'ZP',
      description: 'Segment Fee',
      fee: {
        amount: '4.20',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    },
    {
      code: 'XF',
      description: 'Passenger Facility Charge',
      fee: {
        amount: '4.50',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    }];

    it('should update taxes and fees after split payment applied', () => {
      const purchaseRequest = new PurchaseFlightParamsBuilder().withPassengerWithSuffix().build();
      const modifiedPurchaseRequest = transformToPurchaseRequest({ ...purchaseRequest, calculateFundsTaxesAndFees });

      expect(modifiedPurchaseRequest.body.reservationGroups[0].amountApplied.taxesAndFees).to.deep.equal(calculateFundsTaxesAndFees);
    });

    it('should not update taxes and fees after split payment applied if the passenger is lap infant', () => {
      const purchaseRequest = new PurchaseFlightParamsBuilder().withLapChildInBooking();
      const modifiedPurchaseRequest = transformToPurchaseRequest({ ...purchaseRequest, calculateFundsTaxesAndFees });

      expect(modifiedPurchaseRequest.body.reservationGroups[1].amountApplied).to.be.undefined;
    });
  });
});
