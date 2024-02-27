import React from 'react';
import { mount, shallow } from 'enzyme';
import sinonModule from 'sinon';
import SavedCreditCardRadioInput from 'src/shared/components/savedCreditCardRadioInput';
import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';
import {
  RAPID_REWARDS_VISA_ID,
  NEW_CREDIT_CARD_ID,
  PAY_PAL_CARD_ID,
  APPLE_PAY_CARD_ID,
  UPLIFT_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import CeptorWrapper from 'src/shared/helpers/ceptorWrapper';
import { PRICE_TYPES } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import i18n from '@swa-ui/locale';

const sinon = sinonModule.sandbox.create();

describe('SavedCreditCardRadioInput', () => {
  let wrapper;
  let onClickStub;
  let creditCardInfo;
  let getExtensionStub;

  beforeEach(() => {
    getExtensionStub = sinon.stub(CeptorWrapper, 'getExtension');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    beforeEach(() => {
      creditCardInfo = new PaymentSavedCreditCardBuilder().build();

      wrapper = createComponent({}, false);
    });

    it('should pass correct props to CreditCardRadioInput', () => {
      const creditCardRadioInput = wrapper.find('CreditCardRadioInput');

      expect(creditCardRadioInput).to.have.prop('onClick', onClickStub);
      expect(creditCardRadioInput).to.have.prop('selected', false);
      expect(creditCardRadioInput).to.have.prop('savedCreditCardId', '1-ENKS4K');
      expect(creditCardRadioInput).to.have.prop('name', 'VISA 9999');
      expect(creditCardRadioInput).to.have.prop('type', 'VISA');
      expect(creditCardRadioInput).to.have.prop('showRadioButton', true);
    });

    it('should call onClick prop with new credit card id when click on input', () => {
      wrapper.find('CreditCardRadioInput').simulate('click');

      expect(onClickStub).to.be.calledWith('1-ENKS4K');
    });
  });

  it('should call ceptor wrapper getExtension and addInfo function when Uplift', () => {
    creditCardInfo = {
      savedCreditCardId: UPLIFT_CARD_ID,
      type: 'UPLIFT',
      name: 'Pay Monthly'
    };
    const addInfoStub = sinon.stub();

    getExtensionStub.returns({ addInfo: addInfoStub });
    wrapper = createComponent(
      { additionalInfoMessage: 'Pay Monthly from $XX/mo', additionalInfoLink: 'Learn More' },
      false
    );

    expect(getExtensionStub).to.have.been.called;
    expect(addInfoStub).to.have.been.calledWith(sinon.match.defined, PRICE_TYPES.UP_TRIP_TOTAL);
  });

  it('should show Just added! text when justAdded is true', () => {
    creditCardInfo = {
      savedCreditCardId: RAPID_REWARDS_VISA_ID,
      type: 'INSTANT_CREDIT_RAPID_REWARDS_VISA',
      name: i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__RAPID_REWARDS_VISA')
    };
    wrapper = createComponent({
      justAdded: true
    });

    expect(wrapper).to.matchSnapshot();
  });

  it('should show additional info container when type is ghost card and its expired', () => {
    creditCardInfo = {
      savedCreditCardId: 'First Ghost Card',
      type: 'GHOST_CARD',
      name: 'First Ghost Card',
      isExpired: true
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should show additional info container for ghost card if additionalInfoMessage has value', () => {
    wrapper = createComponent({
      additionalInfoMessage: i18n('AIR_BOOKING__CORPORATE_BOOKING__TAP_TO_SELECT_A_DIFFERENT_CARD')
    });

    expect(wrapper).to.matchSnapshot();
  });

  it('should show last 4 digits when it is VISA credit card', () => {
    creditCardInfo = {
      savedCreditCardId: '1-YNA593',
      type: 'VISA',
      name: 'VISA Card'
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show last 4 digits when it is a chase credit card', () => {
    creditCardInfo = {
      savedCreditCardId: RAPID_REWARDS_VISA_ID,
      type: 'INSTANT_CREDIT_RAPID_REWARDS_VISA',
      name: i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__RAPID_REWARDS_VISA')
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show last 4 digits when it is a new credit card', () => {
    creditCardInfo = {
      savedCreditCardId: NEW_CREDIT_CARD_ID,
      type: 'NEW',
      name: i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__NEW_CREDIT_CARD')
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show last 4 digits when new credit card has been added', () => {
    creditCardInfo = {
      savedCreditCardId: 'MASTERCARD',
      type: 'NEW',
      name: 'MasterCard'
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show last 4 digits when its new disabled credit card', () => {
    creditCardInfo = {
      savedCreditCardId: 'MASTERCARD',
      type: 'NEW_DISABLED',
      name: 'MasterCard'
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show last 4 digits when it is a paypal card', () => {
    creditCardInfo = {
      savedCreditCardId: PAY_PAL_CARD_ID,
      type: 'PAYPAL',
      name: 'Use PayPal'
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show last 4 digits when it is an apple pay card', () => {
    creditCardInfo = {
      savedCreditCardId: APPLE_PAY_CARD_ID,
      type: 'APPLE_PAY',
      name: 'Use Apple Pay'
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show last 4 digits when it is ghost card', () => {
    creditCardInfo = {
      savedCreditCardId: 'First Ghost Card',
      type: 'GHOST_CARD',
      name: 'First Ghost Card'
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should not show additional info container for ghost card if additionalInfoMessage has no value', () => {
    wrapper = createComponent();

    expect(wrapper).to.not.contain.text(i18n('AIR_BOOKING__CORPORATE_BOOKING__TAP_TO_SELECT_A_DIFFERENT_CARD'));
  });

  it('should show the Paypal text when it is a paypal card', () => {
    creditCardInfo = {
      savedCreditCardId: PAY_PAL_CARD_ID,
      type: 'PAYPAL',
      name: 'Use PayPal'
    };
    wrapper = createComponent();

    expect(wrapper).to.matchSnapshot();
  });

  it('should show additionalInfoLink text when passed in', () => {
    creditCardInfo = {
      savedCreditCardId: UPLIFT_CARD_ID,
      type: 'UPLIFT',
      name: 'Pay Monthly'
    };
    wrapper = createComponent({ additionalInfoLink: 'Learn More' });

    expect(wrapper).to.matchSnapshot();
  });

  const createComponent = (props = {}, shouldShallow = true) => {
    onClickStub = sinon.stub();

    const mergedProps = {
      creditCardInfo,
      selected: false,
      onClick: onClickStub,
      showRadioButton: true,
      ...props
    };

    return shouldShallow
      ? shallow(<SavedCreditCardRadioInput {...mergedProps} />)
      : mount(<SavedCreditCardRadioInput {...mergedProps} />);
  };
});
