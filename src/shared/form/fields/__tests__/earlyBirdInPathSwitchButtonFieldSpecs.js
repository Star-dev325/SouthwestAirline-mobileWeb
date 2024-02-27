import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';

import EarlyBirdInPathSwitchButtonField from 'src/shared/form/fields/earlyBirdInPathSwitchButtonField';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import sinon from 'sinon';

describe('EarlyBirdInPathSwitchButtonField', () => {
  const onClickSub = sinon.stub();

  it('should show the starting at price per passenger text when Inbound and OutBound EB unit prices are different', () => {
    const unitPriceInBound = {
      amount: '10.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const wrapper = createComponent({ unitPriceInBound });

    expect(wrapper.find('[data-qa="add-early-bird-check-in--banner--per-passenger-message"]')).to.have.text(
      '(Starting from $10.00 per passenger, each way)'
    );
  });

  it('should not show the starting at price per passenger text when Inbound and OutBound EB unit prices are the same', () => {
    const unitPriceInBound = {
      amount: '15.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const wrapper = createComponent({ unitPriceInBound });

    expect(wrapper.find('[data-qa="add-early-bird-check-in--banner--per-passenger-message"]')).to.have.text(
      '($15.00 per passenger, each way)'
    );
  });

  it('should not show the starting at price per passenger text when Inbound EB unit price do not exist', () => {
    const wrapper = createComponent({ unitPriceInBound: null, unitPriceOutBound: null });

    expect(wrapper.find('[data-qa="add-early-bird-check-in--banner--per-passenger-message"]')).to.have.text(
      '($0.00 per passenger, each way)'
    );
  });

  it('should not show the starting at price per passenger text when Outbound EB unit price do not exist', () => {
    const unitPriceInBound = {
      amount: '10.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    const wrapper = createComponent({ unitPriceInBound, unitPriceOutBound: null });

    expect(wrapper.find('[data-qa="add-early-bird-check-in--banner--per-passenger-message"]')).to.have.text(
      '($10.00 per passenger, each way)'
    );
  });

  it('should switch when click the switch button', () => {
    const wrapper = createComponent();

    wrapper.find('.early-bird-check-in--radio-button').simulate('click');
    expect(wrapper.find('RadioButtonMark')).to.have.prop('isChecked', true);

    expect(onClickSub).to.be.calledWith(true);

    wrapper.find('.early-bird-check-in--radio-button').simulate('click');
    expect(wrapper.find('RadioButtonMark')).to.have.prop('isChecked', false);
    expect(onClickSub).to.be.calledWith(false);
  });

  function createComponent(props = {}) {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, {});
    const defaultProps = {
      unitPriceOutBound: {
        amount: '15.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totalPrice: {
        amount: '15.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      onClick: onClickSub
    };

    return mount(
      <MockedForm initialFormData={{ isEarlyBirdInPathRadioButtonChecked: '' }} onSubmit={_.noop}>
        <EarlyBirdInPathSwitchButtonField
          name="isEarlyBirdInPathRadioButtonChecked"
          {..._.merge({}, defaultProps, props)}
        />
      </MockedForm>
    );
  }
});
