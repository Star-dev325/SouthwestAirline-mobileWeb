import _ from 'lodash';
import sinonModule from 'sinon';
import { toApplicationInfo } from 'src/chase/transformers/chaseTransformer';
import ChaseInstantCreditResponseBuilder from 'test/builders/apiResponse/v1/mobile-misc/feature/instant-credit/chaseInstantCreditResponseBuilder';
import * as CurrencyValueHelper from 'src/shared/helpers/currencyValueHelper';
import { CHASE_CREDIT_STATUS } from 'src/chase/constants/chaseConstants';

const { APPROVED, PENDING, DECLINED } = CHASE_CREDIT_STATUS;
const sinon = sinonModule.sandbox.create();

describe('chaseTransformer', () => {
  context('toApplicationInfo', () => {
    const customer = {
      accountNumber: '602056571',
      firstName: 'Michael',
      lastName: 'Scott'
    };
    let currencyValueHelperStub;

    beforeEach(() => {
      currencyValueHelperStub = sinon.stub(CurrencyValueHelper, 'toNumberFromFormattedString');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should transform a response with an approved status', () => {
      const response = new ChaseInstantCreditResponseBuilder().withCreditLimit('500').build();

      currencyValueHelperStub.onFirstCall().returns(250);
      currencyValueHelperStub.onSecondCall().returns(500);

      const result = toApplicationInfo(response);

      expect(result).to.deep.equal({
        chaseApplicationCompleted: true,
        chaseCreditStatus: APPROVED,
        credit: '500',
        customer,
        isApproved: true,
        isValidChaseSessionId: true
      });
    });

    it('should transform a response with a declined status', () => {
      const response = new ChaseInstantCreditResponseBuilder().withDeclinedStatus().withCreditLimit('500').build();

      currencyValueHelperStub.onFirstCall().returns(250);
      currencyValueHelperStub.onSecondCall().returns(500);

      const result = toApplicationInfo(response);

      expect(result).to.deep.equal({
        chaseApplicationCompleted: true,
        chaseCreditStatus: DECLINED,
        credit: '500',
        customer,
        isApproved: false,
        isValidChaseSessionId: true
      });
    });

    it('should transform a response with a pending status', () => {
      const response = new ChaseInstantCreditResponseBuilder().withPendingStatus().withCreditLimit('500').build();

      currencyValueHelperStub.onFirstCall().returns(250);
      currencyValueHelperStub.onSecondCall().returns(500);

      const result = toApplicationInfo(response);

      expect(result).to.deep.equal({
        chaseApplicationCompleted: true,
        chaseCreditStatus: PENDING,
        credit: '500',
        customer,
        isApproved: false,
        isValidChaseSessionId: true
      });
    });

    it('should transform a response with a undefined status and undefined customer', () => {
      const response = new ChaseInstantCreditResponseBuilder().withCreditLimit('500').build();

      _.set(response, 'creditStatus', undefined);
      _.set(response, 'customer', undefined);

      currencyValueHelperStub.onFirstCall().returns(250);
      currencyValueHelperStub.onSecondCall().returns(500);

      const result = toApplicationInfo(response);

      expect(result).to.deep.equal({
        chaseApplicationCompleted: false,
        chaseCreditStatus: '',
        credit: '500',
        customer: {
          accountNumber: '',
          firstName: '',
          lastName: ''
        },
        isApproved: false,
        isValidChaseSessionId: true
      });
    });
  });
});
