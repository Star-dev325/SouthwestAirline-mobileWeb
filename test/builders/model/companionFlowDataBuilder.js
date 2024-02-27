class CompanionFlowDataBuilder {
  withSavedCreditCard() {
    return {
      flowStatus: 'completed',
      reservation: this.getReservation(),
      accountInfo: this.getAccountInfo(),
      companionPrices: this.getCompanionPrices(),
      savedCreditCards: this.getSavedCreditCards(),
      paymentInfo: this.getPaymentInfoWithSavedCreditCard(),
      companionContactAndRedressInfo: this.getCompanionContactAndRedressInfo()
    };
  }

  withNewCreditCard() {
    return {
      flowStatus: 'completed',
      reservation: this.getReservation(),
      accountInfo: this.getAccountInfo(),
      companionPrices: this.getCompanionPrices(),
      savedCreditCards: this.getSavedCreditCards(),
      paymentInfo: this.getPaymentInfoWithNewCreditCard(),
      companionContactAndRedressInfo: this.getCompanionContactAndRedressInfo()
    };
  }

  getPaymentInfoWithNewCreditCard() {
    return {
      cardNumber: '4444331850431111',
      nameOnCard: 'a b',
      expiration: '2017-04',
      securityCode: '1234',
      isoCountryCode: 'US',
      addressLine1: 'APT 410 The Reviera',
      addressLine2: '',
      city: 'Dallas',
      stateProvinceRegion: 'TX',
      zipOrPostalCode: '72504',
      phoneNumber: '222-222-2222',
      lastFourDigitsOfCreditCard: '1111',
      creditCardType: 'VISA'
    };
  }

  getPaymentInfoWithSavedCreditCard() {
    return {
      selectedCardId: '1-F9J11E',
      lastFourDigitsOfCreditCard: '0158',
      creditCardType: 'UATP',
      nameOnCard: 'Fnameforpoints Lnameforpoints',
      addressLine1: 'test street',
      addressLine2: '',
      city: 'city',
      stateProvinceRegion: 'AL',
      zipOrPostalCode: '12345',
      addressType: 'HOME',
      isoCountryCode: 'US',
      companyName: null
    };
  }

  getReservation() {
    return {
      recordLocator: 'RZ9Q34',
      passengers: [
        {
          secureFlightName: {
            firstName: 'FNAMEFORPOINTS',
            lastName: 'LNAMEFORPOINTS',
            middleName: '',
            suffix: ''
          },
          birthDate: '1990-03-23',
          gender: 'F',
          accountNumber: '00025006157374',
          redressNumber: '',
          knownTravelerId: '',
          tier: 'A_LIST_PREFERRED',
          loyaltyAccountType: 'RAPID_REWARDS_MEMBER',
          earlyBirdEligibilities: [
            {
              earlyBirdProductId: null,
              status: 'RAPID_REWARDS_A_LIST',
              priceCents: 0,
              originationDestinationId: '201605120530-0700,201605120635-0700|LAS-LAX|WN3900'
            },
            {
              earlyBirdProductId: null,
              status: 'BUSINESS_SELECT',
              priceCents: 0,
              originationDestinationId: '201605120815-0700,201605120920-0700|LAX-LAS|WN2070'
            }
          ]
        }
      ],
      itinerary: {
        originationDestinations: [
          {
            segments: [
              {
                departureDateTime: '2016-05-12T05:30:00.000-07:00',
                arrivalDateTime: '2016-05-12T06:35:00.000-07:00',
                originationAirportCode: 'LAS',
                destinationAirportCode: 'LAX',
                operatingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '3900'
                },
                marketingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '3900'
                },
                legs: [
                  {
                    originationAirportCode: 'LAS',
                    destinationAirportCode: 'LAX'
                  }
                ],
                wifiAvailable: null
              }
            ],
            durationMinutes: 65,
            originationDestinationId: '201605120530-0700,201605120635-0700|LAS-LAX|WN3900',
            checkinDocumentReason: null,
            checkinDocumentType: null,
            fareType: 'Anytime',
            _links: {
              deleteBoardingPass: null
            }
          },
          {
            segments: [
              {
                departureDateTime: '2016-05-12T08:15:00.000-07:00',
                arrivalDateTime: '2016-05-12T09:20:00.000-07:00',
                originationAirportCode: 'LAX',
                destinationAirportCode: 'LAS',
                operatingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '2070'
                },
                marketingCarrierInfo: {
                  carrierCode: 'WN',
                  flightNumber: '2070'
                },
                legs: [
                  {
                    originationAirportCode: 'LAX',
                    destinationAirportCode: 'LAS'
                  }
                ],
                wifiAvailable: null
              }
            ],
            durationMinutes: 65,
            originationDestinationId: '201605120815-0700,201605120920-0700|LAX-LAS|WN2070',
            checkinDocumentReason: null,
            checkinDocumentType: null,
            fareType: 'Business Select',
            _links: {
              deleteBoardingPass: null
            }
          }
        ]
      },
      receiptEmail: 'TEST@TEST.COM',
      currencyType: 'Points',
      international: false,
      warnings: [],
      unaccompaniedMinor: false,
      _links: {
        retrieveForCancel: {
          href: '/v1/mobile/reservations/record-locator/RZ9Q34?first-name=FNAMEFORPOINTS&last-name=LNAMEFORPOINTS&action=CANCEL',
          method: 'GET'
        },
        retrieveForChange: {
          href: '/v1/mobile/reservations/record-locator/RZ9Q34?first-name=FNAMEFORPOINTS&last-name=LNAMEFORPOINTS&action=CHANGE',
          method: 'GET'
        },
        retrieveForBuyEarlyBird: null,
        companionReservations: null
      }
    };
  }

  getAccountInfo() {
    return {
      customerInfo: {
        name: {
          firstName: 'Fnameforpoints',
          lastName: 'Lnameforpoints'
        },
        gender: 'Female',
        birthDate: '1990-03-23',
        accountNumber: '00025006157374'
      },
      companionInfo: {
        name: {
          firstName: 'Juanjuan',
          lastName: 'Tao'
        },
        gender: 'Female',
        birthDate: '1990-12-12',
        accountNumber: '00026137157373'
      },
      contactInfo: {
        address: {
          addressLine1: 'APT 410 The Reviera',
          addressLine2: null,
          city: 'Dallas',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '72504',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        },
        phone: {
          number: '2222222222',
          countryCode: '1',
          phoneType: 'Home'
        },
        emailAddress: 'test@test.com',
        preferredTypeOfCommunication: {
          type: 'EMAIL_ME',
          value: 'aserafim@gm.com'
        }
      },
      rapidRewardsDetails: {
        redeemablePoints: 3978,
        tierInfo: {
          tier: 'A_LIST_PREFERRED',
          tierAchievedDate: '2016-03-22',
          tierQualifyingPoints: 964473,
          tierQualifyingFlights: 1
        },
        companionPassInfo: {
          companionPassAchieved: true,
          companionDeclared: true,
          companionPassExpirationDate: '2017-12-31',
          companionQualifyingPoints: 964473,
          companionQualifyingFlights: 1
        },
        isEnrolledInRapidRewards: true
      }
    };
  }

  getCompanionPrices() {
    return {
      promoCode: '',
      promoCodeApplied: false,
      discountApplied: false,
      priceSearchTotals: {
        verifyPriceChange: true,
        requestedAmountCents: 0,
        requestedAmountPoints: 0,
        priceTotalAmountCents: 560,
        priceTotalAmountPoints: 0,
        currencyPriceDetails: {
          baseFareCents: 0,
          taxCents: 0,
          discountedBaseFareCents: 0,
          segmentFees: [
            {
              passengerFacilityChargeCents: 0,
              securityFeeCents: 560,
              segmentFeeCents: 0
            }
          ]
        }
      },
      warnings: [],
      numberOfPassengers: 1
    };
  }

  getCompanionContactAndRedressInfo() {
    return {
      receiptEmail: 'test@test.com',
      contactMethod: 'EMAIL',
      contactEmail: 'aserafim@gm.com',
      number: '',
      countryCode: '1',
      shareItineraryEmail: '',
      redressNumber: '',
      knownTravelerId: '',
      purposeOfTravel: 'Business'
    };
  }

  getSavedCreditCards() {
    return [
      {
        cardDescription: 'UATP Card Description',
        creditCardType: 'UATP',
        lastFourDigitsOfCreditCard: '0158',
        isPrimary: true,
        savedCreditCardId: '1-F9J11E',
        cardHolder: {
          firstName: 'Fnameforpoints',
          lastName: 'Lnameforpoints'
        },
        billingAddress: {
          addressLine1: 'test street',
          addressLine2: '',
          city: 'city',
          stateProvinceRegion: 'AL',
          zipOrPostalCode: '12345',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        }
      },
      {
        cardDescription: 'Visa Descrip',
        creditCardType: 'VISA',
        lastFourDigitsOfCreditCard: '0000',
        isPrimary: false,
        savedCreditCardId: '1-F9KIJS',
        cardHolder: {
          firstName: 'Fnameforpoints',
          lastName: 'Lnameforpoints'
        },
        billingAddress: {
          addressLine1: 'test',
          addressLine2: '',
          city: 'city',
          stateProvinceRegion: 'AL',
          zipOrPostalCode: '12345',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        }
      },
      {
        cardDescription: 'Visa2 Descrip',
        creditCardType: 'VISA',
        lastFourDigitsOfCreditCard: '1111',
        isPrimary: false,
        savedCreditCardId: '1-F9KW1W',
        cardHolder: {
          firstName: 'Fnameforpoints',
          lastName: 'Lnameforpoints'
        },
        billingAddress: {
          addressLine1: 'test',
          addressLine2: '',
          city: 'city',
          stateProvinceRegion: 'AL',
          zipOrPostalCode: '12345',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        }
      },
      {
        cardDescription: 'Mastercard Card',
        creditCardType: 'MASTERCARD',
        lastFourDigitsOfCreditCard: '4444',
        isPrimary: false,
        savedCreditCardId: '1-F9MU02',
        cardHolder: {
          firstName: 'Fnameforpoints',
          lastName: 'Lnameforpoints'
        },
        billingAddress: {
          addressLine1: 'test',
          addressLine2: '',
          city: 'city',
          stateProvinceRegion: 'AL',
          zipOrPostalCode: '12345',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        }
      },
      {
        cardDescription: 'Visa3 Card',
        creditCardType: 'VISA',
        lastFourDigitsOfCreditCard: '0000',
        isPrimary: false,
        savedCreditCardId: '1-F9N0ZC',
        cardHolder: {
          firstName: 'Fnameforpoints',
          lastName: 'Lnameforpoints'
        },
        billingAddress: {
          addressLine1: 'test',
          addressLine2: '',
          city: 'city',
          stateProvinceRegion: 'AL',
          zipOrPostalCode: '12345',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        }
      }
    ];
  }
}

module.exports = CompanionFlowDataBuilder;
