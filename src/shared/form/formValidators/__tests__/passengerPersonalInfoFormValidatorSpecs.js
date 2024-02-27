import * as AsyncValidators from 'src/shared/form/formValidators/asyncValidators';
import * as SharedFieldValidatorRules from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import * as SharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import * as ValidatorHelpers from 'src/shared/form/helpers/validatorHelpers';
import i18n from '@swa-ui/locale';
import passengerPersonalInfoFormValidator from 'src/shared/form/formValidators/passengerPersonalInfoFormValidator';
import sinonModule from 'sinon';
import validator from 'src/shared/form/formValidators/validator';

import { API_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import ErrorMessages from 'src/shared/constants/errorMessages';

const { firstName, lastName, emailReceiptTo, gender, shareItineraryEmail, associatedAdult } = SharedFieldValidatorRules;
const { PASSENGER_NAME_SUFFIX_VALID } = ErrorMessages;

const sinon = sinonModule.sandbox.create();

describe('passengerPersonalInfoFormValidator', () => {
  let accountNumberValidatorStub;
  let contactMethodContentFieldRulesStub;
  let dateOfBirthFieldRulesStub;
  let executeValidatorsStub;
  let isLengthBetweenOrEqualStub;

  beforeEach(() => {
    accountNumberValidatorStub = sinon.stub(AsyncValidators, 'accountNumberValidator');
    contactMethodContentFieldRulesStub = sinon.stub(SharedFieldValidatorRules, 'contactMethodContentFieldRules');
    dateOfBirthFieldRulesStub = sinon.stub(SharedFieldValidatorRules, 'dateOfBirthFieldRules');
    executeValidatorsStub = sinon.stub(ValidatorHelpers, 'executeValidators');
    isLengthBetweenOrEqualStub = sinon.stub(validator, 'isLengthBetweenOrEqual');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('validations', () => {
    it('should use default validations', () => {
      const contactMethodContentResult = { contentMethod: 'contact method' };
      const dateOfBirthResult = { dob: 'dob validations' };
      const isLengthBetweenOrEqualStubResult = { length: 'length' };
      const mockFormData = {
        dateOfBirth: '05/06/2020',
        frequentTravelerId: '1-30MU1D9',
        frequentTravelerToken: 'y6aOQD5N_'
      };
      const options = {
        isWebView: false,
        initialFormData: {
          knownTravelerNumber: null,
          redressNumber: null,
          rapidRewardsNumber: null,
          frequentTravelerId: '1-30MU1D9',
          frequentTravelerToken: 'y6aOQD5N_'
        }
      };
      const response = 'response';

      accountNumberValidatorStub.returns(true);
      contactMethodContentFieldRulesStub.returns(contactMethodContentResult);
      dateOfBirthFieldRulesStub.returns(dateOfBirthResult);
      executeValidatorsStub.returns(response);
      isLengthBetweenOrEqualStub.returns(isLengthBetweenOrEqualStubResult);

      const formRules = {
        ...SharedFormValidators,
        isAccountNumberMatchWithName: [
          {
            type: API_ERROR_POPUP,
            msg: i18n('SHARED__ERROR_MESSAGES__DEFAULT_API_ERROR'),
            validator: accountNumberValidatorStub
          }
        ]
      };

      const fieldRules = {
        firstName,
        middleName: [
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_MIDDLE_NAME_VALID'),
            validator: validator.isName
          },
          {
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_MIDDLE_NAME_LENGTH'),
            validator: isLengthBetweenOrEqualStubResult
          }
        ],
        lastName,
        suffix: [
          {
            msg: PASSENGER_NAME_SUFFIX_VALID,
            validator: validator.isPassengerNameSuffix
          }
        ],
        gender,
        ...dateOfBirthResult,
        associatedAdult: associatedAdult(null),
        rapidRewardsNumber: SharedFieldValidatorRules.rapidRewardsNumber(null),
        emailReceiptTo,
        shareItineraryEmail,
        redressNumber: SharedFieldValidatorRules.redressNumber(null),
        knownTravelerNumber: SharedFieldValidatorRules.knownTravelerNumber(null),
        ...contactMethodContentResult
      };

      const result = passengerPersonalInfoFormValidator(options)(mockFormData);

      expect(result).to.equal(response);
      expect(JSON.stringify(executeValidatorsStub.getCall(0).args[0])).to.be.eql(JSON.stringify(mockFormData));
      expect(JSON.stringify(executeValidatorsStub.getCall(0).args[1])).to.be.eql(JSON.stringify(formRules));
      expect(JSON.stringify(executeValidatorsStub.getCall(0).args[2])).to.be.eql(JSON.stringify(fieldRules));
    });
  });
});
