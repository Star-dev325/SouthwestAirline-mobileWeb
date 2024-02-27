import React from 'react';
import dayjs from 'dayjs';
import { mount } from 'enzyme';

import CreditCardExpirationFields from 'src/shared/form/fields/creditCardExpirationFields';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('CreditCardExpirationFields', () => {
  let wrapper;

  context('year dropdown', () => {
    context('showPreviousYears is true', () => {
      beforeEach(() => {
        wrapper = createComponent({ showPreviousYears: true }, { expiration: '2013-12' });
      });

      context('credit card expiration year is in the past', () => {
        it('should initially select the year in the past', () => {
          expect(wrapper.find('.date-selection-year')).to.contain.text('2013');
        });

        it('should not show the years prior to the current year in the dropdown list', () => {
          const yearsInThePast = dayjs().get('year') - 2013;
          const yearDropDown = wrapper.find('.date-selection-year');

          for (let i = 1; i <= yearsInThePast; i++) {
            expect(yearDropDown.find('option').at(i)).to.have.prop('hidden', true);
          }
        });
      });

      context('credit card has expiration year is in the future', () => {
        let expirationDate;

        beforeEach(() => {
          expirationDate = dayjs().add(10, 'years').format('YYYY-MM');
          wrapper = createComponent({ showPreviousYears: true }, { expiration: expirationDate });
        });

        it('should initially select the year in the past', () => {
          const yearPartOfExpirationDate = expirationDate.split('-')[0];

          expect(wrapper.find('.date-selection-year')).to.contain.text(yearPartOfExpirationDate);
        });

        it('should show the current year in the list', () => {
          const yearDropDown = wrapper.find('.date-selection-year');

          expect(yearDropDown.find('option').at(1)).to.have.text(dayjs().get('year'));
        });
      });
    });

    context('showPreviousYears is false', () => {
      it('should not allow a previous year to be initially selected and should default to the current year', () => {
        const currentYear = dayjs().get('year');

        wrapper = createComponent({ showPreviousYears: false }, { expiration: '2013-12' });

        expect(wrapper.find('.date-selection-year')).to.contain.text(`${currentYear}`);
      });
    });
  });

  context('webview', () => {
    it('should render `FormInputField` when isWebView is true', () => {
      wrapper = createComponent({ isWebview: true }, { expiration: '2024-12' });

      expect(wrapper.contains('input[placeholder="MM/YYYY"]')).to.exist;
    });
  });

  function createComponent(props = {}, initialValue = {}, formOptions = {}) {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm initialFormData={initialValue} onSubmit={() => null}>
        <CreditCardExpirationFields names={['expiration']} {...props} />
      </MockedForm>
    );
  }
});
