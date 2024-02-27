import React from 'react';
import { shallow, mount } from 'enzyme';
import { sandbox } from 'sinon';
import { Provider } from 'react-redux';
import _ from 'lodash';

import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import TransferTravelFundsForm from 'src/travelFunds/components/transferTravelFundsForm';

const sinon = sandbox.create();

describe('TransferTravelFundsForm', () => {
  let onSubmitStub;

  const defaultInitialFormData = {
    firstName: 'Thomas',
    lastName: 'Shelby',
    rapidRewardsNumber: '123456',
    recipientEmailAddress: 'arthur@shelby.com',
    personalMessage: 'this is the personal message',
    additionalReceipt: 't@s.com'
  };

  beforeEach(() => {
    onSubmitStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the form', () => {
    const component = createComponent(defaultInitialFormData, {}, true);

    expect(component).toMatchSnapshot();
  });

  it('should update the remaining characters when the user types in the FormTextAreaField', () => {
    const props = { personalMsgMaxChar: 10 };
    const component = createComponent(defaultInitialFormData, props);
    const event = { target: { value: '123456' } };
    const event2 = { target: { value: '123456789012' } };

    expect(component.find('.fields--secondary-label').text()).to.equal('10 characters left');
    expect(component.find('textarea').simulate('change', event));
    expect(component.find('.fields--secondary-label').text()).to.equal('4 characters left');
    expect(component.find('textarea').simulate('change', event2));
    expect(component.find('.fields--secondary-label').text()).to.equal('0 characters left');
    expect(component.find('textarea').text()).to.equal(event2.target.value.substring(0, props.personalMsgMaxChar));
  });

  context('submit form', () => {
    it('should call onSubmit when data is valid', () => {
      const component = createComponent();

      component.find('form').first().simulate('submit');

      expect(onSubmitStub).to.have.been.calledWith(defaultInitialFormData);
    });

    context('first name invalid', () => {
      it('should not call onSubmit if too long', () => {
        const component = createComponent({
          ...defaultInitialFormData,
          firstName: 'testNameShouldBeTooLongForTheValidator'
        });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if invalid', () => {
        const component = createComponent({ ...defaultInitialFormData, firstName: '123456' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if missing', () => {
        const component = createComponent({ ...defaultInitialFormData, firstName: '' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });
    });

    context('last name invalid', () => {
      it('should not call onSubmit if too long', () => {
        const component = createComponent({
          ...defaultInitialFormData,
          lastName: 'testNameShouldBeTooLongForTheValidator'
        });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if invalid', () => {
        const component = createComponent({ ...defaultInitialFormData, lastName: '123456' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if missing', () => {
        const component = createComponent({ ...defaultInitialFormData, lastName: '' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });
    });

    context('rapid rewards number invalid', () => {
      it('should not call onSubmit if too long', () => {
        const component = createComponent({ ...defaultInitialFormData, rapidRewardsNumber: '123456789123456789' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if invalid', () => {
        const component = createComponent({ ...defaultInitialFormData, rapidRewardsNumber: 'abc' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if missing', () => {
        const component = createComponent({ ...defaultInitialFormData, rapidRewardsNumber: '' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });
    });

    context('recipient email address invalid', () => {
      it('should not call onSubmit if too long', () => {
        const longString = 'a'.repeat(100);
        const component = createComponent({
          ...defaultInitialFormData,
          recipientEmailAddress: `${longString}@test.com`
        });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if invalid', () => {
        const component = createComponent({ ...defaultInitialFormData, recipientEmailAddress: '@test.com' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if missing', () => {
        const component = createComponent({ ...defaultInitialFormData, recipientEmailAddress: '' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });
    });

    context('additional email address invalid', () => {
      it('should not call onSubmit if too long', () => {
        const longString = 'a'.repeat(100);
        const component = createComponent({ ...defaultInitialFormData, additionalReceipt: `${longString}@test.com` });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });

      it('should not call onSubmit if invalid', () => {
        const component = createComponent({ ...defaultInitialFormData, additionalReceipt: '@test.com' });

        component.find('form').first().simulate('submit');

        expect(onSubmitStub).to.not.have.been.called;
      });
    });
  });

  const createComponent = (initialFormData = defaultInitialFormData, props = {}, shouldShallow = false) => {
    const defaultProps = {
      formId: '123456',
      onSubmit: onSubmitStub,
      onSubmitLabel: 'Transfer Travel Funds',
      receiptEmailAddress: 'email@address.com',
      transferableAmount: {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      recipientInfoText: 'mock recipient info text',
      personalMsgMaxChar: 340,
      initialFormData
    };

    const JSX = (
      <Provider store={createMockedFormStore()}>
        <TransferTravelFundsForm {..._.merge({}, defaultProps, props)} />
      </Provider>
    );

    return shouldShallow ? shallow(JSX) : mount(JSX);
  };
});
