import _ from 'lodash';
import {
  transformToTravelInformationFormInitialFormData,
  transformToSaveTravelInformationLink
} from 'src/viewReservation/transformers/travelInformationTransformer';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';

describe('travelInformationTransformer', () => {
  context('transformToTravelInformationFormInitialFormData', () => {
    it('should transform editPNRPassengerPage response to initial form data contains passport and emergency contact when trip is international', () => {
      const editPNRPassengerPage = {
        accountNumber: '601005646',
        redressNumber: '1234567',
        knownTravelerId: '123456789012345',
        passengerName: 'Age Verified Passenger',
        nonChargeableAncillaryProducts: null,
        disableSpecialAssistance: false,
        emergencyContact: {
          name: 'Fred Flintstone',
          contactPhone: {
            countryCode: 'DZ',
            number: '817-855-1234'
          }
        },
        passportInformation: {
          lastFourPassportNumber: '1234',
          passportIssuedBy: 'AL',
          nationality: 'DZ',
          passportExpirationDate: '2020-11-19',
          countryOfResidence: 'US'
        },
        _links: {
          href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: { passengerReference: '2', firstName: 'AGE', lastName: 'PASSENGER' }
        },
        passengerDetails: {
          name: {
            firstName: 'Age',
            lastName: 'Passenger',
            middleName: 'Verified',
            suffix: null
          },
          dateOfBirth: '02/02/xxxx',
          gender: 'On File'
        }
      };

      expect(transformToTravelInformationFormInitialFormData(editPNRPassengerPage)).to.deep.equal({
        rapidRewardsNumber: '601005646',
        knownTravelerNumber: '123456789012345',
        redressNumber: '1234567',
        passportNumber: '1234',
        emergencyContactName: 'Fred Flintstone',
        emergencyContactCountryCode: 'DZ',
        emergencyContactPhoneNumber: '817-855-1234',
        passportExpirationDate: '2020-11-19',
        passportIssuedBy: 'AL',
        nationality: 'DZ',
        countryOfResidence: 'US',
        specialAssistance: DEFAULT_FIELD_VALUES,
        disableSpecialAssistance: false,
        firstName: 'Age',
        lastName: 'Passenger',
        middleName: 'Verified',
        suffix: null,
        dateOfBirth: '02/02/xxxx',
        gender: 'On File'
      });
    });

    it('should transform editPNRPassengerPage response to initial form data NOT contain passport and emergency contact when trip is domestic', () => {
      const editPNRPassengerPage = {
        accountNumber: '601005646',
        redressNumber: '1234567',
        knownTravelerId: '123456789012345',
        passengerName: 'Age Verified Passenger',
        emergencyContact: null,
        passportInformation: null,
        nonChargeableAncillaryProducts: null,
        disableSpecialAssistance: false,
        _links: {
          href: '/v1/mobile-air-booking/feature/reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: { passengerReference: '2', firstName: 'AGE', lastName: 'PASSENGER' }
        },
        passengerDetails: {
          name: {
            firstName: 'Age',
            lastName: 'Passenger',
            middleName: 'Verified',
            suffix: null
          },
          dateOfBirth: '02/02/xxxx',
          gender: 'On File'
        }
      };

      expect(transformToTravelInformationFormInitialFormData(editPNRPassengerPage)).to.deep.equal({
        rapidRewardsNumber: '601005646',
        knownTravelerNumber: '123456789012345',
        redressNumber: '1234567',
        emergencyContactCountryCode: 'US',
        passportNumber: undefined,
        emergencyContactName: undefined,
        emergencyContactPhoneNumber: undefined,
        passportExpirationDate: undefined,
        passportIssuedBy: undefined,
        nationality: undefined,
        countryOfResidence: undefined,
        specialAssistance: DEFAULT_FIELD_VALUES,
        disableSpecialAssistance: false,
        firstName: 'Age',
        lastName: 'Passenger',
        middleName: 'Verified',
        suffix: null,
        dateOfBirth: '02/02/xxxx',
        gender: 'On File'
      });
    });
  });

  context('transformToSaveTravelInformationLink', () => {
    let isPassportNumberEdited;
    let initialFormDataEmptyForm;
    let initialNames;
    const link = {
      href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
      method: 'POST',
      body: {
        firstName: 'AGE',
        lastName: 'PASSENGER',
        passengerReference: '2'
      }
    };

    beforeEach(() => {
      isPassportNumberEdited = false;
      initialNames = {
        firstName: 'AGE',
        middleName: null,
        lastName: 'PASSENGER'
      };

      initialFormDataEmptyForm = {
        ...initialNames,
        rapidRewardsNumber: null,
        redressNumber: null,
        knownTravelerNumber: null,
        passportNumber: null,
        passportIssuedBy: null,
        nationality: null,
        passportExpirationDate: null,
        countryOfResidence: null,
        emergencyContactName: null,
        emergencyContactCountryCode: null,
        emergencyContactPhoneNumber: null,
        specialAssistance: DEFAULT_FIELD_VALUES
      };
    });

    context('international pnr', () => {
      it('should transform to travel information link contains all fields when reservation is international and without initialForm data', () => {
        const formData = {
          ...initialNames,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345',
          passportNumber: 'PASSPORT617',
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2030-11-21',
          countryOfResidence: 'US',
          emergencyContactName: 'TEST EMERGENCY',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '469-422-3678',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          true,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.deep.equal({
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: {
            firstName: 'AGE',
            lastName: 'PASSENGER',
            passengerReference: '2',
            accountNumber: '601005646',
            redressNumber: '1234567',
            knownTravelerId: '123456789012345',
            nonChargeableAncillaryProducts: null,
            passportInformation: {
              passportNumber: 'PASSPORT617',
              passportIssuedBy: 'CN',
              nationality: 'CN',
              passportExpirationDate: '2030-11-21',
              countryOfResidence: 'US'
            },
            emergencyContact: {
              name: 'TEST EMERGENCY',
              contactPhone: {
                countryCode: 'US',
                number: '4694223678'
              }
            }
          }
        });
      });

      it('should transform to return null when reservation is international and with Form data unchanged', () => {
        const formData = {
          firstName: 'Test',
          lastName: 'Tester',
          middleName: null,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345',
          passportNumber: 'PASSPORT617',
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2030-11-21',
          countryOfResidence: 'US',
          emergencyContactName: 'TEST EMERGENCY',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '469-422-3678',
          specialAssistance: DEFAULT_FIELD_VALUES
        };
        const initialFormData = formData;

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          true,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.be.null;
      });

      it('should transform to return null when reservation is International and user removes emergency contact info', () => {
        const initialFormData = {
          firstName: 'Test',
          lastName: 'Tester',
          middleName: null,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345',
          passportNumber: 'PASSPORT617',
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2030-11-21',
          countryOfResidence: 'US',
          emergencyContactName: 'TEST EMERGENCY',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '469-422-3678',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const formData = {
          firstName: 'Test',
          lastName: 'Tester',
          middleName: null,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345',
          passportNumber: 'PASSPORT617',
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2030-11-21',
          countryOfResidence: 'US',
          emergencyContactName: '',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          true,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.be.null;
      });

      it('should transform to return null when reservation is International and user does not enter any data', () => {
        const formData = {
          firstName: '',
          lastName: '',
          middleName: null,
          rapidRewardsNumber: null,
          redressNumber: null,
          knownTravelerNumber: null,
          passportNumber: '',
          passportIssuedBy: '',
          nationality: '',
          passportExpirationDate: '',
          countryOfResidence: '',
          emergencyContactName: '',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          true,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.be.null;
      });

      it('should transform to return null when reservation is International and initial form is empty and user does not enter any data', () => {
        const formData = {
          firstName: '',
          lastName: '',
          middleName: null,
          rapidRewardsNumber: null,
          redressNumber: null,
          knownTravelerNumber: null,
          passportNumber: '',
          passportIssuedBy: '',
          nationality: '',
          passportExpirationDate: '',
          countryOfResidence: '',
          emergencyContactName: '',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          true,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.be.null;
      });

      it('should transform to return passport data when reservation is International and user changes passport number', () => {
        const initialFormData = _.set(initialFormDataEmptyForm, 'passportNumber', '1234');
        const formData = {
          firstName: '',
          lastName: '',
          middleName: null,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345',
          passportNumber: 'PASSPORT002',
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2030-11-21',
          countryOfResidence: 'US',
          emergencyContactName: 'TEST EMERGENCY',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '469-422-3678',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        isPassportNumberEdited = true;
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          true,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.deep.equal({
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: {
            firstName: 'AGE',
            lastName: 'PASSENGER',
            passengerReference: '2',
            accountNumber: '601005646',
            redressNumber: '1234567',
            knownTravelerId: '123456789012345',
            passportInformation: {
              passportNumber: 'PASSPORT002',
              passportIssuedBy: 'CN',
              nationality: 'CN',
              passportExpirationDate: '2030-11-21',
              countryOfResidence: 'US'
            },
            emergencyContact: {
              name: 'TEST EMERGENCY',
              contactPhone: {
                countryCode: 'US',
                number: '4694223678'
              }
            },
            nonChargeableAncillaryProducts: null
          }
        });
      });

      it('should transform to travel information link without passport information and emergency contact method when reservation is domestic without InitialForm data', () => {
        const formData = {
          ...initialNames,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.deep.equal({
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: {
            firstName: 'AGE',
            lastName: 'PASSENGER',
            passengerReference: '2',
            accountNumber: '601005646',
            redressNumber: '1234567',
            knownTravelerId: '123456789012345',
            emergencyContact: null,
            nonChargeableAncillaryProducts: null
          }
        });
      });

      it('should transform to travel information link with passport information when initial form data contains passport information and user changes passportNumber to the last 4 digits of passport number', () => {
        const passportNumberFromTransformToTravelInformationFormInitialFormData = '1234';
        const initialFormDataWithPassportInfoOnly = {
          rapidRewardsNumber: null,
          redressNumber: null,
          knownTravelerNumber: null,
          passportNumber: passportNumberFromTransformToTravelInformationFormInitialFormData,
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2030-11-21',
          countryOfResidence: 'US',
          emergencyContactName: undefined,
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: undefined,
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const passportNumberUserReentersLastFourDigits = '1234';
        const formData = {
          rapidRewardsNumber: null,
          redressNumber: null,
          knownTravelerNumber: null,
          passportNumber: passportNumberUserReentersLastFourDigits,
          passportIssuedBy: 'CN',
          nationality: 'CN',
          passportExpirationDate: '2030-11-21',
          countryOfResidence: 'US',
          emergencyContactName: '',
          emergencyContactCountryCode: 'US',
          emergencyContactPhoneNumber: '',
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const isPassportNumberEdited = true;

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          true,
          initialFormDataWithPassportInfoOnly,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.deep.equal({
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: {
            firstName: 'AGE',
            lastName: 'PASSENGER',
            passengerReference: '2',
            accountNumber: null,
            redressNumber: null,
            knownTravelerId: null,
            passportInformation: {
              passportNumber: '1234',
              passportIssuedBy: 'CN',
              nationality: 'CN',
              passportExpirationDate: '2030-11-21',
              countryOfResidence: 'US'
            },
            emergencyContact: null,
            nonChargeableAncillaryProducts: null
          }
        });
      });
    });

    context('domestic pnr', () => {
      it('should transform to null when reservation is domestic without rapidRewardsNumber data and no data entered into form', () => {
        const initialFormData = _.set(initialFormDataEmptyForm, 'rapidRewardsNumber', '601005646');

        const formData = {
          ...initialNames,
          knownTravelerNumber: null,
          rapidRewardsNumber: '601005646',
          redressNumber: null
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.null;
      });

      it('should transform to return null when reservation is domestic with Form data unchanged', () => {
        const initialFormData = _.merge({}, initialFormDataEmptyForm, {
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345'
        });

        const formData = {
          ...initialNames,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345'
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.be.null;
      });

      it('should transform to return null for updateLink when passport fields are null', () => {
        const initialFormData = _.merge({}, initialFormDataEmptyForm, {
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345',
          passportNumber: null,
          passportExpirationDate: null,
          passportIssuedBy: null,
          nationality: null,
          countryOfResidence: null
        });

        const formData = {
          ...initialNames,
          rapidRewardsNumber: '601005646',
          redressNumber: '1234567',
          knownTravelerNumber: '123456789012345'
        };
        const isPassportNumberEdited = undefined;

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.be.null;
      });
    });

    context('special assistance', () => {
      it('should return null when data was not changed', () => {
        const initialFormData = _.merge({}, initialFormDataEmptyForm, {
          specialAssistance: DEFAULT_FIELD_VALUES
        });

        const formData = {
          ...initialNames,
          specialAssistance: DEFAULT_FIELD_VALUES
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.null;
      });

      it('should return an empty array for special assistance when form data existed but all selections were changed to default values', () => {
        const initialFormData = _.merge({}, initialFormDataEmptyForm, {
          specialAssistance: {
            BLIND: true,
            DEAF: false,
            COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
            ASSISTANCE_ANIMAL: false,
            PEANUT_DUST_ALLERGY: false,
            PORTABLE_OXYGEN_CONCENTRATOR: false,
            WHEELCHAIR_ASSISTANCE: 'NONE',
            WHEELCHAIR_STOWAGE: 'NONE',
            WET_BATTERIES: null,
            DRY_BATTERIES: null
          }
        });

        const formData = {
          ...initialNames,
          specialAssistance: {
            BLIND: false,
            DEAF: false,
            COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
            ASSISTANCE_ANIMAL: false,
            PEANUT_DUST_ALLERGY: false,
            PORTABLE_OXYGEN_CONCENTRATOR: false,
            WHEELCHAIR_ASSISTANCE: 'NONE',
            WHEELCHAIR_STOWAGE: 'NONE',
            WET_BATTERIES: null,
            DRY_BATTERIES: null
          }
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.deep.equal({
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: {
            firstName: 'AGE',
            lastName: 'PASSENGER',
            passengerReference: '2',
            accountNumber: undefined,
            redressNumber: undefined,
            knownTravelerId: undefined,
            emergencyContact: null,
            nonChargeableAncillaryProducts: []
          }
        });
      });

      it('should return a transformed ancillary products array for special assistance when form data changed to non-default values', () => {
        const initialFormData = _.merge({}, initialFormDataEmptyForm, {
          specialAssistance: {
            BLIND: true,
            DEAF: false,
            COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
            ASSISTANCE_ANIMAL: false,
            PEANUT_DUST_ALLERGY: false,
            PORTABLE_OXYGEN_CONCENTRATOR: false,
            WHEELCHAIR_ASSISTANCE: 'NONE',
            WHEELCHAIR_STOWAGE: 'NONE',
            WET_BATTERIES: null,
            DRY_BATTERIES: null
          }
        });

        const formData = {
          ...initialNames,
          specialAssistance: {
            BLIND: false,
            DEAF: true,
            COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
            ASSISTANCE_ANIMAL: false,
            PEANUT_DUST_ALLERGY: false,
            PORTABLE_OXYGEN_CONCENTRATOR: false,
            WHEELCHAIR_ASSISTANCE: 'NONE',
            WHEELCHAIR_STOWAGE: 'NONE',
            WET_BATTERIES: null,
            DRY_BATTERIES: null
          }
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.deep.equal({
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: {
            firstName: 'AGE',
            lastName: 'PASSENGER',
            passengerReference: '2',
            accountNumber: undefined,
            redressNumber: undefined,
            knownTravelerId: undefined,
            emergencyContact: null,
            nonChargeableAncillaryProducts: [{ ancillaryType: 'DEAF' }]
          }
        });
      });
    });

    context('name changes', () => {
      let expectedResult;

      beforeEach(() => {
        expectedResult = {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/PPUWKZ',
          method: 'POST',
          body: {
            firstName: 'AGE',
            lastName: 'PASSENGER',
            passengerReference: '2',
            accountNumber: null,
            redressNumber: null,
            knownTravelerId: null,
            emergencyContact: null,
            nonChargeableAncillaryProducts: null
          }
        };
      });

      it('should return link passenger with first middle and last names when user changes all 3 name fields', () => {
        const formData = {
          ...initialFormDataEmptyForm,
          firstName: 'this is a firstname change',
          middleName: 'this is a middlename change',
          lastName: 'this is a lastname change'
        };
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.true;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            passengerName: {
              firstName: 'this is a firstname change',
              middleName: 'this is a middlename change',
              lastName: 'this is a lastname change'
            }
          }
        });
      });

      it('should return link passenger with only firstName when user changes firstName', () => {
        const formData = {
          ...initialFormDataEmptyForm,
          firstName: 'this is a change'
        };
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.true;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            passengerName: {
              firstName: 'this is a change'
            }
          }
        });
      });

      it('should return link passenger with only lastName when user changes lastName', () => {
        const formData = {
          ...initialFormDataEmptyForm,
          lastName: 'this is a change'
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.true;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            passengerName: {
              lastName: 'this is a change'
            }
          }
        });
      });

      it('should return link passenger with only firstName when user changes firstName and user has a middle name', () => {
        const initialFormData = _.merge({}, initialFormDataEmptyForm, { middleName: 'Middleman' });
        const formData = {
          ...initialFormDataEmptyForm,
          firstName: 'this is a change',
          middleName: 'Middleman'
        };

        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormData,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.true;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            passengerName: {
              firstName: 'this is a change'
            }
          }
        });
      });

      it('should return link passenger with only middleName when user changes middleName', () => {
        const formData = {
          ...initialFormDataEmptyForm,
          middleName: 'this is a change'
        };
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.true;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            passengerName: {
              middleName: 'this is a change'
            }
          }
        });
      });

      it('should return link passenger with only middleName when user adds middleName', () => {
        const formData = {
          ...initialFormDataEmptyForm,
          middleName: 'this is a change'
        };
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.true;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            passengerName: {
              middleName: 'this is a change'
            }
          }
        });
      });

      it('should return link passenger with only middleName as empty string when user removes middle name', () => {
        initialFormDataEmptyForm.middleName = 'Middlename';
        const formData = {
          ...initialFormDataEmptyForm,
          middleName: ''
        };
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.true;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            passengerName: {
              middleName: ''
            }
          }
        });
      });

      it('should return link with no passenger name when no middle name and no change to middle name', () => {
        initialFormDataEmptyForm.middleName = undefined;
        const formData = {
          ...initialFormDataEmptyForm
        };
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.be.null;
      });

      it('should return link without passenger name object if items besides passenger first middle or last name are changed', () => {
        const formData = {
          ...initialFormDataEmptyForm,
          rapidRewardsNumber: '9829347524'
        };
        const { updateTravelInformationLink, isNameChanged } = transformToSaveTravelInformationLink(
          false,
          initialFormDataEmptyForm,
          formData,
          link,
          isPassportNumberEdited
        );

        expect(isNameChanged).to.be.false;
        expect(updateTravelInformationLink).to.deep.equal({
          ...expectedResult,
          body: {
            ...expectedResult.body,
            accountNumber: '9829347524'
          }
        });
      });
    });
  });
});
