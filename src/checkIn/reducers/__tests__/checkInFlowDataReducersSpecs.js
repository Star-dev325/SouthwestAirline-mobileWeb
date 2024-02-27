import * as UpdateAPIsHelpers from 'src/checkIn/helpers/updateAPIsHelper';
import checkInFlowDataReducers, * as CheckInFlowDataReducers from 'src/checkIn/reducers/checkInFlowDataReducers';
import CheckInActionTypes from 'src/checkIn/actions/checkInActionTypes';
import * as checkInActionsTransformer from 'src/checkIn/transformers/checkInActionsTransformer';
import UpdateAPIsTransformers from 'src/checkIn/transformers/updateAPIsTransformer';
import CheckInReservationDetailsBuilder from 'test/builders/apiResponse/checkInReservationDetailsBuilder';

import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

describe('CheckInFlowDataReducers', () => {
  let transformReservationDetailsResponseToBoardingPassInfoForSharingStub;
  let transformLinksToTravelDocumentsStub;
  let transformPrefillAPISDataToCheckInAPISFormDataStub;

  beforeEach(() => {
    transformReservationDetailsResponseToBoardingPassInfoForSharingStub = sinon.stub(
      checkInActionsTransformer,
      'transformReservationDetailsResponseToBoardingPassInfoForSharing'
    );
  });
  afterEach(() => {
    sinon.restore();
  });
  context('travelDocuments', () => {
    it('should update the travelDocuments and session token when add nationality and emergency docs success', () => {
      const getMissingPassportOrEmergencyContactStub = sinon.stub(
        UpdateAPIsHelpers,
        'getMissingPassportOrEmergencyContact'
      );

      getMissingPassportOrEmergencyContactStub.returns(['doc1', 'doc2']);
      const state = checkInFlowDataReducers(
        {
          travelDocuments: [
            {
              passportPageFormData: { passport: 'oldpassport' },
              missingDocuments: ['doc1', 'doc3']
            }
          ],
          checkInSessionToken: 'checkInSessionToken'
        },
        {
          type: CheckInActionTypes.CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS,
          paxNumber: 1,
          response: {
            travelDocumentsNeeded: {
              _links: {
                travelDocuments: {
                  meta: {
                    missingDocuments: ['doc1', 'doc3'],
                    destinationConfig: {
                      destination: 'Travel Destination'
                    }
                  }
                }
              }
            },
            checkInSessionToken: 'new checkInSessionToken'
          },
          formData: { passport: 'newpassport' }
        }
      );

      expect(getMissingPassportOrEmergencyContactStub).to.be.calledWith(['doc1', 'doc3']);

      expect(state).to.be.deep.equal({
        boardingPassInfoForSharing: null,
        passengers: [],
        pnr: null,
        travelDocuments: [
          {
            passportPageFormData: { passport: 'newpassport' },
            missingDocuments: ['doc1', 'doc2', 'doc3'],
            destinationConfig: {
              destination: 'Travel Destination'
            }
          }
        ],
        recordLocator: null,
        checkInSessionToken: 'new checkInSessionToken',
        reservationDetailLinks: null,
        saveEmergencyContactForAll: null
      });
    });

    it('should update travel documents when receiving CHECK_IN__CLEAN_APIS_DATA', () => {
      const state = checkInFlowDataReducers(
        {
          travelDocuments: [
            {
              passportPageFormData: { passport: 'oldpassport' },
              missingDocuments: ['VISA', 'PERMANENT_RESIDENT_CARD'],
              additionalPassportPageFormData: {
                destination: 'destination'
              }
            }
          ],
          checkInSessionToken: 'checkInSessionToken'
        },
        {
          type: CheckInActionTypes.CHECK_IN__CLEAN_APIS_DATA,
          paxNumber: 1
        }
      );

      expect(state).to.be.deep.equal({
        boardingPassInfoForSharing: null,
        passengers: [],
        pnr: null,
        reservationDetailLinks: null,
        checkInSessionToken: 'checkInSessionToken',
        travelDocuments: [
          {
            passportPageFormData: {
              passport: 'oldpassport'
            },
            missingDocuments: ['VISA', 'PERMANENT_RESIDENT_CARD'],
            additionalPassportPageFormData: {}
          }
        ],
        recordLocator: null,
        saveEmergencyContactForAll: null
      });
    });

    it('should update travel documents for additionalPassportPageFormData when receiving CHECK_IN__CLEAN_APIS_DATA', () => {
      const state = CheckInFlowDataReducers.travelDocuments(
        [
          {
            passportPageFormData: { passport: 'oldpassport' },
            missingDocuments: ['VISA', 'PERMANENT_RESIDENT_CARD'],
            additionalPassportPageFormData: { destination: 'destination' }
          }
        ],
        {
          type: CheckInActionTypes.CHECK_IN__UPDATE_APIS_DATA,
          formData: {
            type: 'RESIDENT_ALIEN_CARD',
            number: 'abc-d22-222-222-222',
            issuedBy: 'AS',
            expiration: '2019-11-17'
          },
          paxNumber: '1',
          nodeName: 'permanentResidentCard'
        }
      );

      expect(state).to.be.deep.equal([
        {
          passportPageFormData: {
            passport: 'oldpassport'
          },
          missingDocuments: ['VISA', 'PERMANENT_RESIDENT_CARD'],
          additionalPassportPageFormData: {
            destination: 'destination',
            permanentResidentCard: {
              expiration: '2019-11-17',
              issuedBy: 'AS',
              number: 'abc-d22-222-222-222',
              type: 'RESIDENT_ALIEN_CARD'
            }
          }
        }
      ]);
    });

    context('Contact Tracing CHECK_IN__UPDATE_APIS_DATA', () => {
      it('should update contact country codes for destination', () => {
        const state = CheckInFlowDataReducers.travelDocuments(
          [
            {
              missingDocuments: ['DESTINATION']
            }
          ],
          {
            type: CheckInActionTypes.CHECK_IN__UPDATE_APIS_DATA,
            formData: {
              addressLine: '306 Main St',
              city: 'Brooklyn',
              contactEmail: 'example@wnco.com',
              contactPhone1Number: '248-123-4567',
              contactPhone2Number: '248-123-2222',
              isoCountryCode: 'US',
              stateProvinceRegion: 'AZ',
              zipOrPostalCode: '78922'
            },
            paxNumber: '1',
            nodeName: 'destination'
          }
        );

        expect(state).to.be.deep.equal([
          {
            additionalPassportPageFormData: {
              destination: {
                addressLine: '306 Main St',
                city: 'Brooklyn',
                contactEmail: 'example@wnco.com',
                contactPhone1CountryCode: '1',
                contactPhone1Number: '248-123-4567',
                contactPhone2CountryCode: '1',
                contactPhone2Number: '248-123-2222',
                isoCountryCode: 'US',
                stateProvinceRegion: 'AZ',
                zipOrPostalCode: '78922'
              }
            },
            missingDocuments: ['DESTINATION']
          }
        ]);
      });

      it('should not update contact country codes for destination when absent', () => {
        const state = CheckInFlowDataReducers.travelDocuments(
          [
            {
              missingDocuments: ['DESTINATION']
            }
          ],
          {
            type: CheckInActionTypes.CHECK_IN__UPDATE_APIS_DATA,
            formData: {
              addressLine: '306 Main St',
              city: 'Brooklyn',
              isoCountryCode: 'US',
              stateProvinceRegion: 'AZ',
              zipOrPostalCode: '78922'
            },
            paxNumber: '1',
            nodeName: 'destination'
          }
        );

        expect(state).to.be.deep.equal([
          {
            additionalPassportPageFormData: {
              destination: {
                addressLine: '306 Main St',
                city: 'Brooklyn',
                isoCountryCode: 'US',
                stateProvinceRegion: 'AZ',
                zipOrPostalCode: '78922'
              }
            },
            missingDocuments: ['DESTINATION']
          }
        ]);
      });

      it('should apply contact tracing data to all travel docs if indicated', () => {
        const formData = {
          addressLine: '306 Main St',
          city: 'Brooklyn',
          isoCountryCode: 'US',
          stateProvinceRegion: 'AZ',
          zipOrPostalCode: '78922',
          contactTracingSaveForAllPassengers: true
        };
        const state = CheckInFlowDataReducers.travelDocuments(
          [{ missingDocuments: ['DESTINATION'] }, { missingDocuments: ['DESTINATION'] }],
          {
            type: CheckInActionTypes.CHECK_IN__UPDATE_APIS_DATA,
            formData,
            paxNumber: '1',
            nodeName: 'destination'
          }
        );

        expect(state).to.be.deep.equal([
          {
            additionalPassportPageFormData: {
              destination: formData
            },
            missingDocuments: ['DESTINATION']
          },
          {
            additionalPassportPageFormData: {
              destination: formData
            },
            missingDocuments: ['DESTINATION']
          }
        ]);
      });
    });

    it('should update the travel documents when retrieve check in reservation details success', () => {
      const response = new CheckInReservationDetailsBuilder().build();

      const state = CheckInFlowDataReducers.travelDocuments(
        {},
        {
          type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
          pnr: { firstName: 'Shelton', lastName: 'Suen', recordLocator: 'XF3PNR' },
          response
        }
      );

      expect(state).to.deep.equal([
        {
          requestData: {
            href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
            method: 'POST',
            body: {
              accountNumber: null,
              firstName: 'SHELTON',
              fullName: 'Shelton Suen',
              lastName: 'SUEN',
              recordLocator: 'V2Q6MT',
              travelerIdentifier: '2301CBA10000C173'
            }
          },
          destinationConfig: undefined,
          missingDocuments: ['NATIONALITY'],
          travelerName: 'Shelton Suen',
          passportPageFormData: {
            passportNumber: undefined,
            passportIssuedBy: undefined,
            nationality: undefined,
            passportExpirationDate: undefined,
            countryOfResidence: undefined,
            doNotWishToProvideAnEmergencyContact: undefined,
            emergencyContactName: undefined,
            emergencyContactCountryCode: undefined,
            emergencyContactCountryDialingCode: undefined,
            emergencyContactPhoneNumber: undefined
          }
        }
      ]);
    });

    it('should update the travel documents when retrieve check in CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS', () => {
      const response = new CheckInReservationDetailsBuilder().build();

      const state = CheckInFlowDataReducers.travelDocuments(
        {},
        {
          type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
          pnr: { firstName: 'Shelton', lastName: 'Suen', recordLocator: 'XF3PNR' },
          response
        }
      );

      expect(state).to.deep.equal([
        {
          requestData: {
            href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
            method: 'POST',
            body: {
              accountNumber: null,
              firstName: 'SHELTON',
              fullName: 'Shelton Suen',
              lastName: 'SUEN',
              recordLocator: 'V2Q6MT',
              travelerIdentifier: '2301CBA10000C173'
            }
          },
          destinationConfig: undefined,
          missingDocuments: ['NATIONALITY'],
          travelerName: 'Shelton Suen',
          passportPageFormData: {
            passportNumber: undefined,
            passportIssuedBy: undefined,
            nationality: undefined,
            passportExpirationDate: undefined,
            countryOfResidence: undefined,
            doNotWishToProvideAnEmergencyContact: undefined,
            emergencyContactName: undefined,
            emergencyContactCountryCode: undefined,
            emergencyContactCountryDialingCode: undefined,
            emergencyContactPhoneNumber: undefined
          }
        }
      ]);
    });

    it('should return default state when action is undefined', () => {
      expect(CheckInFlowDataReducers.travelDocuments().response).to.deep.equal(undefined);
    });
  });

  context('receiving CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL', () => {
    it('should replace saveEmergencyContactForAll emergencyContactSaveForAllPassengers as true and doNotWishToProvideAnEmergencyContact false', () => {
      const state = CheckInFlowDataReducers.saveEmergencyContactForAll(
        {
          saveEmergencyContactForAll: {
            emergencyContactPhoneNumber: 2144708000,
            emergencyContactName: 'someone',
            emergencyContactCountryCode: 'US',
            emergencyContactCountryDialingCode: 1
          }
        },
        {
          type: CheckInActionTypes.CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL,
          formData: {
            doNotWishToProvideAnEmergencyContact: false,
            emergencyContactPhoneNumber: 2144708001,
            emergencyContactName: 'someone else',
            emergencyContactCountryCode: 'US',
            emergencyContactSaveForAllPassengers: true
          }
        }
      );

      expect(state).to.be.deep.equal({
        emergencyContactPhoneNumber: 2144708001,
        emergencyContactName: 'someone else',
        emergencyContactCountryCode: 'US',
        shouldUseForAll: true
      });
    });

    it('should replace saveEmergencyContactForAll emergencyContactSaveForAllPassengers as false and doNotWishToProvideAnEmergencyContact false', () => {
      const state = CheckInFlowDataReducers.saveEmergencyContactForAll(
        {
          saveEmergencyContactForAll: {
            emergencyContactPhoneNumber: 2144708000,
            emergencyContactName: 'someone',
            emergencyContactCountryCode: 'US',
            emergencyContactCountryDialingCode: 1
          }
        },
        {
          type: CheckInActionTypes.CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL,
          formData: {
            doNotWishToProvideAnEmergencyContact: false,
            emergencyContactPhoneNumber: 2144708001,
            emergencyContactName: 'someone else',
            emergencyContactCountryCode: 'US',
            emergencyContactCountryDialingCode: 1,
            emergencyContactSaveForAllPassengers: false
          }
        }
      );

      expect(state).to.be.deep.equal({
        shouldUseForAll: false
      });
    });

    it('should replace saveEmergencyContactForAll emergencyContactSaveForAllPassengers as true and doNotWishToProvideAnEmergencyContact true', () => {
      const state = CheckInFlowDataReducers.saveEmergencyContactForAll(
        {
          saveEmergencyContactForAll: {
            emergencyContactPhoneNumber: 2144708000,
            emergencyContactName: 'someone',
            emergencyContactCountryCode: 'US',
            emergencyContactCountryDialingCode: 1
          }
        },
        {
          type: CheckInActionTypes.CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL,
          formData: {
            doNotWishToProvideAnEmergencyContact: true,
            emergencyContactPhoneNumber: 2144708001,
            emergencyContactName: 'someone else',
            emergencyContactCountryCode: 'US',
            emergencyContactCountryDialingCode: 1,
            emergencyContactSaveForAllPassengers: false
          }
        }
      );

      expect(state).to.be.deep.equal({
        shouldUseForAll: false
      });
    });
  });

  context('checkInSessionToken', () => {
    it('should clear checkInSessionToken when clearCheckInSessionToken action triggered', () => {
      const state = checkInFlowDataReducers(
        { checkInSessionToken: 'token' },
        { type: 'CHECK_IN__CLEAR_CHECK_IN_SESSION_TOKEN' }
      );

      expect(state).to.be.deep.equal({
        boardingPassInfoForSharing: null,
        passengers: [],
        pnr: null,
        reservationDetailLinks: null,
        checkInSessionToken: null,
        travelDocuments: [],
        recordLocator: null,
        saveEmergencyContactForAll: null
      });
    });

    it('should update the checkInSessionToken when when retrieve check in CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS', () => {
      transformReservationDetailsResponseToBoardingPassInfoForSharingStub.returns('boardingPassInfoForSharing');
      transformLinksToTravelDocumentsStub.returns([]);

      const state = checkInFlowDataReducers(
        { checkInSessionToken: 'token' },
        {
          type: 'CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS',
          response: {
            checkInSessionToken: 'shouldUpdatedToken',
            checkInViewReservationPage: {
              pnr: {
                confirmationNumber: '123PNR',
                passengers: []
              }
            }
          },
          pnr: {
            recordLocator: 'XFTTDF',
            firstName: 'Shelton',
            lastName: 'Suen'
          }
        }
      );

      expect(state).to.be.deep.equal({
        boardingPassInfoForSharing: 'boardingPassInfoForSharing',
        passengers: [],
        pnr: null,
        reservationDetailLinks: {},
        checkInSessionToken: 'shouldUpdatedToken',
        travelDocuments: [],
        recordLocator: '123PNR',
        saveEmergencyContactForAll: null
      });
    });

    it('should return default state when action is undefined', () => {
      expect(checkInFlowDataReducers().pnr).to.deep.equal(null);
    });

    it('should update the checkInSessionToken when when retrieve check in reservation details success', () => {
      transformReservationDetailsResponseToBoardingPassInfoForSharingStub.returns('boardingPassInfoForSharing');
      transformLinksToTravelDocumentsStub.returns([]);

      const state = checkInFlowDataReducers(
        { checkInSessionToken: 'token' },
        {
          type: 'CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS',
          response: {
            checkInSessionToken: 'shouldUpdatedToken',
            checkInViewReservationPage: {
              pnr: {
                confirmationNumber: '123PNR',
                passengers: []
              }
            }
          },
          pnr: {
            recordLocator: 'XFTTDF',
            firstName: 'Shelton',
            lastName: 'Suen'
          }
        }
      );

      expect(state).to.be.deep.equal({
        boardingPassInfoForSharing: 'boardingPassInfoForSharing',
        passengers: [],
        pnr: {
          firstName: 'Shelton',
          lastName: 'Suen',
          recordLocator: 'XFTTDF'
        },
        reservationDetailLinks: {},
        checkInSessionToken: 'shouldUpdatedToken',
        recordLocator: '123PNR',
        travelDocuments: [],
        saveEmergencyContactForAll: null
      });
    });
  });

  it('should create/update the whole check in flow data when retrieve check in reservation details success', () => {
    transformLinksToTravelDocumentsStub = sinon
      .stub(UpdateAPIsTransformers, 'transformLinksToTravelDocuments')
      .returns([]);
    transformPrefillAPISDataToCheckInAPISFormDataStub = sinon.stub(
      UpdateAPIsTransformers,
      'transformPrefillAPISDataToCheckInAPISFormData'
    );
    transformReservationDetailsResponseToBoardingPassInfoForSharingStub.returns('boardingPassInfoForSharing');
    const state = checkInFlowDataReducers(
      {},
      {
        type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
        pnr: { firstName: 'firstName', lastName: 'lastName', recordLocator: '123PNR' },
        response: {
          checkInViewReservationPage: {
            pnr: {
              confirmationNumber: '123PNR',
              passengers: []
            }
          },
          prefillPassengerAPISDocuments: 'prefillPassengerAPISDocuments',
          checkInSessionToken: 'checkInSessionToken'
        }
      }
    );

    expect(transformReservationDetailsResponseToBoardingPassInfoForSharingStub).to.be.calledWith({
      checkInViewReservationPage: {
        pnr: {
          confirmationNumber: '123PNR',
          passengers: []
        }
      },
      prefillPassengerAPISDocuments: 'prefillPassengerAPISDocuments',
      checkInSessionToken: 'checkInSessionToken'
    });
    expect(transformPrefillAPISDataToCheckInAPISFormDataStub).to.be.calledWith('prefillPassengerAPISDocuments');
    expect(state).to.deep.equal({
      pnr: {
        firstName: 'firstName',
        lastName: 'lastName',
        recordLocator: '123PNR'
      },
      recordLocator: '123PNR',
      travelDocuments: [],
      reservationDetailLinks: {},
      checkInSessionToken: 'checkInSessionToken',
      boardingPassInfoForSharing: 'boardingPassInfoForSharing',
      saveEmergencyContactForAll: null,
      passengers: []
    });
  });

  it('should return default state when action is undefined', () => {
    expect(checkInFlowDataReducers().recordLocator).to.deep.equal(null);
  });

  it('should create/update the whole check in flow data when retrieve check in CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS', () => {
    transformLinksToTravelDocumentsStub = sinon
      .stub(UpdateAPIsTransformers, 'transformLinksToTravelDocuments')
      .returns([]);
    transformPrefillAPISDataToCheckInAPISFormDataStub = sinon.stub(
      UpdateAPIsTransformers,
      'transformPrefillAPISDataToCheckInAPISFormData'
    );
    transformReservationDetailsResponseToBoardingPassInfoForSharingStub.returns('boardingPassInfoForSharing');
    const state = checkInFlowDataReducers(
      {},
      {
        type: CheckInActionTypes.CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK_SUCCESS,
        pnr: { firstName: 'firstName', lastName: 'lastName', recordLocator: '123PNR' },
        response: {
          checkInViewReservationPage: {
            pnr: {
              confirmationNumber: '123PNR',
              passengers: []
            }
          },
          prefillPassengerAPISDocuments: 'prefillPassengerAPISDocuments',
          checkInSessionToken: 'checkInSessionToken'
        }
      }
    );

    expect(transformReservationDetailsResponseToBoardingPassInfoForSharingStub).to.be.calledWith({
      checkInViewReservationPage: {
        pnr: {
          confirmationNumber: '123PNR',
          passengers: []
        }
      },
      prefillPassengerAPISDocuments: 'prefillPassengerAPISDocuments',
      checkInSessionToken: 'checkInSessionToken'
    });
    expect(transformPrefillAPISDataToCheckInAPISFormDataStub).to.be.calledWith('prefillPassengerAPISDocuments');
    expect(state).to.deep.equal({
      pnr: null,
      travelDocuments: [],
      recordLocator: '123PNR',
      reservationDetailLinks: {},
      checkInSessionToken: 'checkInSessionToken',
      boardingPassInfoForSharing: 'boardingPassInfoForSharing',
      saveEmergencyContactForAll: null,
      passengers: []
    });
  });

  it('should return default passenger state when action is undefined', () => {
    expect(checkInFlowDataReducers().passengers).to.deep.equal([]);
  });

  it('should return default boardingPassInfoForSharing state when action is undefined', () => {
    expect(checkInFlowDataReducers().boardingPassInfoForSharing).to.deep.equal(null);
  });

  it('should return default reservationDetailLinks state when action is undefined', () => {
    expect(checkInFlowDataReducers().reservationDetailLinks).to.deep.equal(null);
  });

  it('should return default checkInSessionToken state when action is undefined', () => {
    expect(checkInFlowDataReducers().checkInSessionToken).to.deep.equal(null);
  });

  it('should return default saveEmergencyContactForAll state when action is undefined', () => {
    expect(checkInFlowDataReducers().saveEmergencyContactForAll).to.deep.equal(null);
  });

  it('should update checkIn session token when receiving CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_SUCCESS', () => {
    const state = CheckInFlowDataReducers.checkInSessionToken('oldCheckInSessionToken', {
      type: CheckInActionTypes.CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS_SUCCESS,
      response: {
        checkInSessionToken: 'newCheckInSessionToken'
      }
    });

    expect(state).to.be.deep.equal('newCheckInSessionToken');
  });

  it('should return default value when init', () => {
    const state = checkInFlowDataReducers(undefined, { type: '@@INIT' });

    expect(state).to.be.deep.equal({
      boardingPassInfoForSharing: null,
      passengers: [],
      travelDocuments: [],
      recordLocator: null,
      checkInSessionToken: null,
      pnr: null,
      reservationDetailLinks: null,
      saveEmergencyContactForAll: null
    });
  });
});
