import React from 'react';
import { Provider } from 'react-redux';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import FakeClock from 'test/unit/helpers/fakeClock';
import CreditCardUpdateInfoBuilder from 'test/builders/model/creditCardUpdateInfoBuilder';
import { submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import CreditCardUpdateForm from 'src/shared/components/creditCardUpdateForm';
import i18n from '@swa-ui/locale';

const sinon = sandbox.create();

describe('CreditCardUpdateForm', () => {
  let onSubmitStub;
  let form;

  beforeEach(() => {
    onSubmitStub = sinon.stub();
    FakeClock.setTimeTo('2018-01-04T11:19');
    form = createComponent();
  });

  afterEach(() => {
    FakeClock.restore();
    sinon.restore();
  });

  context('render', () => {
    it('should render update form title', () => {
      expect(form.find('.segments .fields--label').first()).to.have.text('CREDIT/DEBIT CARD INFO');
    });

    it('should prefill form with props credit card', () => {
      const allInputs = form.find('input');

      expect(allInputs.first()).to.have.value('Li Rui');
    });
  });

  context('submit', () => {
    it('should trigger onSubmit callback with form data', () => {
      submitForm(form);

      expect(onSubmitStub).to.have.been.calledWith({
        nameOnCard: 'Li Rui',
        expiration: '2021-05',
        isoCountryCode: 'US',
        addressLine1: '956 Main St',
        addressLine2: '',
        zipOrPostalCode: '37693',
        city: 'Brooklyn',
        stateProvinceRegion: 'NY'
      });
    });

    it('should trigger validation errors when missing address', () => {
      const savedCreditCardWithEmptyAddress = new CreditCardUpdateInfoBuilder().build();

      _.set(savedCreditCardWithEmptyAddress, 'billingAddress', {
        isoCountryCode: 'US',
        addressLine1: '',
        addressLine2: '',
        city: '',
        stateProvinceRegion: '',
        zipOrPostalCode: '',
        isUSAddress: false
      });

      form = createComponent(savedCreditCardWithEmptyAddress);

      submitForm(form);

      expect(onSubmitStub).to.not.have.been.called;
      expect(form.find('.error-header')).to.contain.text(i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'));
    });
  });

  const createComponent = (savedCreditCard = new CreditCardUpdateInfoBuilder().build()) => {
    const props = {
      savedCreditCard,
      onSubmit: onSubmitStub
    };

    const wrapper = mount(
      <Provider store={createMockedFormStore()}>
        <CreditCardUpdateForm formId={'FORM_ID'} {...props} />
      </Provider>
    );

    return wrapper;
  };
});
