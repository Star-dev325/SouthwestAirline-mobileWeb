import * as SharedFieldValidatorRules from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import * as SharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import * as ValidatorHelpers from 'src/shared/form/helpers/validatorHelpers';
import transferTravelFundsFormValidator from 'src/shared/form/formValidators/transferTravelFundsFormValidator';

import { sandbox } from 'sinon';

const sinon = sandbox.create();

const { firstName, lastName, rapidRewardsNumber, emailRules } = SharedFieldValidatorRules;
const isRequired = true;

describe('TransferTravelFundsFormValidator', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('validation', () => {
    it('should use default validations', () => {
      const mockFormData = { test: 'data' };
      const response = 'response';
      const fieldRules = {
        firstName,
        lastName,
        rapidRewardsNumber: [{ isRequired }, ...rapidRewardsNumber(null)],
        recipientEmailAddress: [{ isRequired }, ...emailRules],
        additionalReceipt: emailRules
      };
      const formRules = { ...SharedFormValidators };
      const executeValidatorsStub = sinon.stub(ValidatorHelpers, 'executeValidators').returns(response);

      const result = transferTravelFundsFormValidator()(mockFormData);

      expect(result).to.equal(response);
      expect(JSON.stringify(executeValidatorsStub.getCall(0).args[0])).to.be.eql(JSON.stringify(mockFormData));
      expect(JSON.stringify(executeValidatorsStub.getCall(0).args[1])).to.be.eql(JSON.stringify(formRules));
      expect(JSON.stringify(executeValidatorsStub.getCall(0).args[2])).to.be.eql(JSON.stringify(fieldRules));
    });
  });
});
