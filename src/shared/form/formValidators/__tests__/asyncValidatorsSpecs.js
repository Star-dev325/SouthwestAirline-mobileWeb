import sinonModule from 'sinon';
import { accountNumberValidator, rapidRewardsNumberValidator } from 'src/shared/form/formValidators/asyncValidators';
import { REQUIRED_ERROR } from 'src/shared/form/constants/validationErrorTypes';
import * as AccountsApi from 'src/shared/api/accountsApi';
import PassengerInfoBuilder from 'test/builders/model/passengerInfoBuilder';

const passengerInfoObject = new PassengerInfoBuilder();
const sinon = sinonModule.sandbox.create();

describe('asyncValidators', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('accountNumberValidator', () => {
    it('should return true when user did not input the account number', () => {
      const result = accountNumberValidator({}, {});

      expect(result).to.be.true;
    });

    it('should return true when there are other field errors', () => {
      const result = accountNumberValidator(
        {},
        {
          firstName: {
            type: REQUIRED_ERROR
          }
        }
      );

      expect(result).to.be.true;
    });

    it('should return a promise and resolve a true value when account look up success', () => {
      sinon.stub(AccountsApi, 'accountNumberLookup').returns(Promise.resolve());

      return accountNumberValidator(
        passengerInfoObject.getPersonalInfoWithRapidRewardNumber(false, '345634563456'),
        {}
      ).then((result) => {
        expect(AccountsApi.accountNumberLookup).to.have.been.calledWith(
          passengerInfoObject.getPersonalInfoWithAccountNumber(false, '345634563456')
        );
        expect(result).to.be.true;
      });
    });

    it('should return a promise and resolve a true value when secure account look up success', () => {
      sinon.stub(AccountsApi, 'accountNumberLookup').returns(Promise.resolve());

      return accountNumberValidator(passengerInfoObject.getPersonalInfoWithRapidRewardNumber(true, 'On File'), {}).then(
        (result) => {
          expect(AccountsApi.accountNumberLookup).to.have.been.calledWith(
            passengerInfoObject.getPersonalInfoWithAccountNumber(true, 'On File')
          );
          expect(result).to.be.true;
        }
      );
    });

    it('should return a promise and resolve an HttpRequestError when secure account look up fail with rapidRewardsNumber as `On File`', () => {
      sinon.stub(AccountsApi, 'accountNumberLookup').returns(
        Promise.reject({
          responseJSON: {
            code: 400307102,
            httpStatusCode: 'BAD_REQUEST',
            infoList: [],
            message:
              'This passenger name does not match the information on file for the Rapid Rewards account # entered',
            messageKey: 'VALIDATION__ACCOUNTS__INPUT__NOT_MATCH',
            requestId: '7129848c-c989-4a59-82e1-cddb0663d479:0vUX_At6SgWwFW2NYjvdag:mweb'
          }
        })
      );

      return accountNumberValidator(passengerInfoObject.getPersonalInfoWithRapidRewardNumber(true, 'On File'), {}).then(
        (result) => {
          expect(AccountsApi.accountNumberLookup).to.have.been.calledWith(
            passengerInfoObject.getPersonalInfoWithAccountNumber(true, 'On File')
          );
          expect(result.name).to.equal('HttpRequestError');
          expect(result.requestId).to.equal('7129848c-c989-4a59-82e1-cddb0663d479:0vUX_At6SgWwFW2NYjvdag:mweb');
          expect(result.code).to.equal(400307102);
          expect(result.message).to.equal(
            'This passenger name does not match the information on file for the Rapid Rewards account # entered'
          );
        }
      );
    });

    it('should return a promise and resolve an HttpRequestError when account look up fail', () => {
      sinon.stub(AccountsApi, 'accountNumberLookup').returns(
        Promise.reject({
          responseJSON: {
            code: 400618205,
            httpStatusCode: 'NOT_FOUND',
            infoList: [],
            message: 'The account number was not found',
            messageKey: 'ERROR__ACCOUNTS__ACCOUNT_NUMBER__CUSTOMER_NOT_FOUND',
            requestId: 'bbe1d1f5-6a1e-4c5d-89fc-e6a6641ea627:bvy-JzZKS5u2tmu8vAIATg:mweb'
          }
        })
      );

      return accountNumberValidator(
        {
          rapidRewardsNumber: '345634563456',
          firstName: 'Bob',
          lastName: 'Lee'
        },
        {}
      ).then((result) => {
        expect(result.name).to.equal('HttpRequestError');
        expect(result.requestId).to.equal('bbe1d1f5-6a1e-4c5d-89fc-e6a6641ea627:bvy-JzZKS5u2tmu8vAIATg:mweb');
        expect(result.code).to.equal(400618205);
        expect(result.message).to.equal('The account number was not found');
      });
    });
  });

  context('rapidRewardsNumberValidator', () => {
    const names = {
      firstName: 'Bob',
      middleName: '',
      lastName: 'Lee'
    };

    it('should return true when user did not input the rapid rewards number', () => {
      const result = rapidRewardsNumberValidator(names)({}, {});

      expect(result).to.be.true;
    });

    it('should return true when there are other field errors', () => {
      const result = rapidRewardsNumberValidator(names)(
        {},
        {
          firstName: {
            type: REQUIRED_ERROR
          }
        }
      );

      expect(result).to.be.true;
    });

    it('should return a promise and resolve a true value when account look up success', () => {
      sinon.stub(AccountsApi, 'accountNumberLookup').returns(Promise.resolve());

      return rapidRewardsNumberValidator(names)({ rapidRewardsNumber: '345634563456' }, {}).then((result) => {
        expect(AccountsApi.accountNumberLookup).to.have.been.calledWith({
          firstName: 'Bob',
          middleName: '',
          lastName: 'Lee',
          accountNumber: '345634563456'
        });
        expect(result).to.be.true;
      });
    });

    it('should return a promise and resolve an HttpRequestError when account look up fail', () => {
      sinon.stub(AccountsApi, 'accountNumberLookup').returns(
        Promise.reject({
          responseJSON: {
            code: 400618205,
            httpStatusCode: 'NOT_FOUND',
            infoList: [],
            message: 'The account number was not found',
            messageKey: 'ERROR__ACCOUNTS__ACCOUNT_NUMBER__CUSTOMER_NOT_FOUND',
            requestId: 'bbe1d1f5-6a1e-4c5d-89fc-e6a6641ea627:bvy-JzZKS5u2tmu8vAIATg:mweb'
          }
        })
      );

      return rapidRewardsNumberValidator(names)({ rapidRewardsNumber: '345634563456' }, {}).then((result) => {
        expect(result.name).to.equal('HttpRequestError');
        expect(result.requestId).to.equal('bbe1d1f5-6a1e-4c5d-89fc-e6a6641ea627:bvy-JzZKS5u2tmu8vAIATg:mweb');
        expect(result.code).to.equal(400618205);
        expect(result.message).to.equal('The account number was not found');
      });
    });
  });
});
