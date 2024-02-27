import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { submitForm, click } from 'test/unit/helpers/enzymeFormTestUtils';
import i18n from '@swa-ui/locale';

const sinon = sandbox.create();

describe('AdditionalPassportInfoForm', () => {
  let wrapper;
  let onAdditionalNavItemClickStub;
  let AdditionalPassportInfoForm;
  let SharedActions;
  let onSubmitStub;

  beforeEach(() => {
    onAdditionalNavItemClickStub = sinon.stub();
    onSubmitStub = sinon.stub();
    SharedActions = require('src/shared/actions/sharedActions');
    sinon.spy(SharedActions, 'showErrorHeaderMsg');
    AdditionalPassportInfoForm = require('src/checkIn/components/additionalPassportInfoForm').default;

    wrapper = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    context('submit button text', () => {
      it('should be `Confirm and Continue` when isLastPage is false', () => {
        expect(wrapper.find('button.check-in').text()).to.equal(i18n('CHECK_IN__CONFIRM_AND_CONTINUE_BUTTON'));
      });

      it('should be `Continue` when isLastPage is true', () => {
        wrapper = createComponent({ isLastPAX: true });

        expect(wrapper.find('button.check-in').text()).to.equal(i18n('SHARED__BUTTON_TEXT__CONTINUE'));
      });
    });

    context('missing all additional info', () => {
      beforeEach(() => {
        wrapper = createComponent({
          initialFormData: {
            permanentResidentCard: null,
            visa: null,
            destination: null
          }
        });
      });

      it('should init additional passport page with green card, visa and destination', () => {
        expect(wrapper.find('FormNavItemField')).to.have.length(3);
        expect(wrapper.find('FormNavItemField').at(0)).to.contain.text('Green Card');
        expect(wrapper.find('FormNavItemField').at(1)).to.contain.text('Visa');
        expect(wrapper.find('FormNavItemField').at(2)).to.contain.text('Destination Address');
      });
    });

    it('should only render Green Card and Destination Address', () => {
      wrapper = createComponent({
        initialFormData: {
          permanentResidentCard: null,
          destination: null
        }
      });

      expect(wrapper.find('FormNavItemField')).to.have.length(2);
      expect(wrapper.find('FormNavItemField').at(0)).to.contain.text('Green Card');
      expect(wrapper.find('FormNavItemField').at(1)).to.contain.text('Destination Address');
    });

    it('should allow override of document titles', () => {
      const documentTitles = {
        permanentResidentCard: 'Permanent Resident Card',
        destination: 'Travel Destination'
      };

      wrapper = createComponent({
        documentTitles,
        initialFormData: {
          permanentResidentCard: null,
          destination: null
        }
      });

      expect(wrapper.find('FormNavItemField')).to.have.length(2);
      expect(wrapper.find('FormNavItemField').at(0)).to.contain.text('Permanent Resident Card');
      expect(wrapper.find('FormNavItemField').at(1)).to.contain.text('Travel Destination');
    });

    context('passenger name', () => {
      it('should re-render passenger name', () => {
        wrapper = createComponent();

        expect(wrapper.find('.passport-form--passenger-name')).to.have.text('Shelton Suen');
      });
    });
  });

  context('submit', () => {
    it('should show error message when form is empty', () => {
      wrapper = createComponent({
        initialFormData: { permanentResidentCard: null }
      });

      submitForm(wrapper.find('Form'));

      expect(SharedActions.showErrorHeaderMsg).to.have.been.calledWith(
        i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR')
      );
    });

    it('should trigger the submit callback with form data when pass the validators', () => {
      wrapper = createComponent({ initialFormData: { permanentResidentCard: 'green card' } });

      submitForm(wrapper.find('Form'));

      expect(onSubmitStub).to.have.been.calledWith({ permanentResidentCard: 'green card' });
    });
  });

  context('onClick', () => {
    it('should transition to permanentResidentCard page when click the permanent resident card nav item', () => {
      wrapper = createComponent({ initialFormData: { permanentResidentCard: 'green card' } });
      const permanentResidentCardNavItem = wrapper.find('a[name="permanentResidentCard"]');

      click(permanentResidentCardNavItem);

      expect(onAdditionalNavItemClickStub).to.have.been.calledWith('permanentResidentCard');
    });
  });

  const createComponent = (props = {}, initialState = {}) => {
    const defaultProps = {
      formId: 'additionalPassportInfoForm',
      isLastPAX: false,
      onAdditionalNavItemClick: onAdditionalNavItemClickStub,
      onSubmit: onSubmitStub,
      initialFormData: { permanentResidentCard: null },
      passengerName: 'Shelton Suen'
    };

    return mount(
      <Provider store={createMockedFormStore(initialState)}>
        <AdditionalPassportInfoForm {...defaultProps} {...props} />
      </Provider>
    );
  };
});
