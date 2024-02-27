import upgradedBoardingFormValidator, {
  hasSelectedProductValidator
} from 'src/shared/form/formValidators/upgradedBoardingFormValidator';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import { emailReceiptTo, securityCodeRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import { SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';

import i18n from '@swa-ui/locale';

const fieldsError = {
  msg: 'Please correct the highlighted errors.',
  type: 'ERROR_HEADER'
};

const emailFieldError = {
  msg: 'Enter a valid email address.',
  type: 'FIELD_ERROR_MESSAGE'
};

const hasSelectedProductError = {
  type: 'SIMPLE_ERROR_POPUP',
  msg: 'Please make at least one selection'
};

const typeError = {
  type: 'REQUIRED_ERROR'
};

const hasSelectedProduct = [
  {
    type: SIMPLE_ERROR_POPUP,
    msg: i18n('UB_NO_SELECTION_ERROR_MESSAGE'),
    validator: hasSelectedProductValidator
  }
];

const formRules = {
  ...sharedFormValidators,
  hasSelectedProduct
};

describe('upgradedBoardingFormValidator', () => {
  it('should return true when at least 1 productId present and selected', () => {
    const formData = {
      productId1: true,
      productId2: false,
      paymentInfo: {
        selectedCardId: 'SELECTED_CARD_ID'
      }
    };

    expect(hasSelectedProductValidator(formData)).to.be.true;
  });

  it('should return false when no products selected', () => {
    const formData = {
      productId1: false,
      paymentInfo: {
        selectedCardId: 'SELECTED_CARD_ID'
      }
    };

    expect(hasSelectedProductValidator(formData)).to.be.false;
  });

  it('should return error  when email is invalid ', () => {
    const formData = {
      productId1: false,
      receiptEmail: '@gmail.com',
      paymentInfo: {
        selectedCardId: 'SELECTED_CARD_ID'
      }
    };

    const fieldRules = {
      receiptEmail: emailReceiptTo
    };

    const mockEmailFieldError = {
      hasSelectedProduct: hasSelectedProductError,
      receiptEmail: emailFieldError,
      hasSomeFieldsNeedToCorrect: fieldsError
    };

    const validations = executeValidators(formData, formRules, fieldRules);
    
    expect(validations).to.deep.equal(mockEmailFieldError);
  });

  it('should return error when email is empty ', () => {
    const formData = {
      productId1: true,
      receiptEmail: '',
      paymentInfo: {
        selectedCardId: 'SELECTED_CARD_ID'
      }
    };

    const fieldRules = {
      receiptEmail: emailReceiptTo
    };

    const mockEmailFieldError = {
      receiptEmail: typeError,
      hasSomeInputedValues: fieldsError
    };

    const valdiations = executeValidators(formData, formRules, fieldRules);

    expect(valdiations).to.deep.equal(mockEmailFieldError);
  });

  it('should not find validation errors when email is valid', () => {
    const formData = {
      productId1: true,
      receiptEmail: 'test@gmail.com',
      paymentInfo: {
        selectedCardId: 'SELECTED_CARD_ID'
      }
    };

    const fieldRules = {
      receiptEmail: emailReceiptTo
    };

    const valdiations = executeValidators(formData, formRules, fieldRules);

    expect(valdiations).to.deep.equal({});
  });

  context('paymentInfo', () => {
    it('should not pass form validation when payment info invalid', () => {
      const formData = {
        paymentInfo: null
      };

      expect(upgradedBoardingFormValidator()(formData)).to.deep.equal({
        hasSelectedProduct: {
          msg: 'Please make at least one selection',
          type: 'SIMPLE_ERROR_POPUP'
        },
        hasSomeInputedValues: {
          msg: 'Please correct the highlighted errors.',
          type: 'ERROR_HEADER'
        },
        paymentInfo: {
          type: 'REQUIRED_ERROR'
        }
      });
    });
    it('should not pass form validation when payment info invalid', () => {
      const formData = {
        productId1: true,
        productId2: false,
        paymentInfo: {
          selectedCardId: 'SELECTED_CARD_ID'
        }
      };

      expect(upgradedBoardingFormValidator()(formData)).to.deep.equal({});
    });
  });

  context('when securityCode has different values', () => {
    const fieldRules = {
      securityCode: [{ isRequired: true }, securityCodeRule]
    };

    it('should return error when securityCode is empty ', () => {
      const formData = {
        productId1: true,
        receiptEmail: 'test@gmail.com',
        paymentInfo: {
          selectedCardId: 'SELECTED_CARD_ID'
        },
        securityCode: ''
      };

      const mockSecurityCodeFieldError = {
        securityCode: typeError,
        hasSomeInputedValues: fieldsError
      };

      const valdiations = executeValidators(formData, formRules, fieldRules);

      expect(valdiations).to.deep.equal(mockSecurityCodeFieldError);
    });

    it('should not find validation errors when securityCode is valid', () => {
      const formData = {
        productId1: true,
        receiptEmail: 'test@gmail.com',
        paymentInfo: {
          selectedCardId: 'SELECTED_CARD_ID'
        },
        securityCode: '1212'
      };

      const valdiations = executeValidators(formData, formRules, fieldRules);

      expect(valdiations).to.deep.equal({});
    });
  });
});
