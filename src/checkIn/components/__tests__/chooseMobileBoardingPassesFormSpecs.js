import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { sandbox } from 'sinon';
import ChooseMobileBoardingPassesForm from 'src/checkIn/components/chooseMobileBoardingPassesForm';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import CheckInConfirmationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInConfirmationBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sandbox.create();
const mockStock = createMockStore();

describe('ChooseMobileBoardingPassesForm', () => {
  let store;
  let onSubmitStub;
  let flights;

  beforeEach(() => {
    store = mockStock({ app: {} });
    onSubmitStub = sinon.stub();
    ({ flights } = new CheckInConfirmationBuilder()
      .withPassengersByCount(2)
      .withViewPassengerBoardingPass()
      .withFlightWithConnection()
      .build().checkInConfirmationPage);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should render form header message', () => {
      const component = createFormComponent();

      expect(component.find('div[data-qa="form-header-message"]')).to.have.text(
        'Choose the passes you want to access.'
      );
    });

    it('should render allPasses CheckBox', () => {
      const component = createFormComponent();
      const allPassesCheckbox = component.find('FormCheckboxField').at(0);

      expect(allPassesCheckbox).to.have.prop('name', 'allPasses');
      expect(allPassesCheckbox).to.have.prop('value', true);
    });

    context('flight 0', () => {
      it('should render pax 0 CheckBox', () => {
        const component = createFormComponent();
        const checkbox = component.find('FormCheckboxField').at(1);

        expect(checkbox).to.have.prop('name', '0-0000000000000001-2301DC520002823E');
        expect(checkbox).to.have.prop('value', true);
      });

      it('should render pax 1 CheckBox', () => {
        const component = createFormComponent();
        const checkbox = component.find('FormCheckboxField').at(2);

        expect(checkbox).to.have.prop('name', '0-0000000000000002-2301DC5200028240');
        expect(checkbox).to.have.prop('value', true);
      });
    });

    context('flight 1', () => {
      it('should render flight 1 pax 0 CheckBox', () => {
        const component = createFormComponent();
        const checkbox = component.find('FormCheckboxField').at(3);

        expect(checkbox).to.have.prop('name', '1-0000000000000001-2301DC520002823E');
        expect(checkbox).to.have.prop('value', true);
      });

      it('should render flight 1 pax 1 CheckBox', () => {
        const component = createFormComponent();
        const checkbox = component.find('FormCheckboxField').at(4);

        expect(checkbox).to.have.prop('name', '1-0000000000000002-2301DC5200028240');
        expect(checkbox).to.have.prop('value', true);
      });
    });

    context('with lap infants', () => {
      beforeEach(() => {
        ({ flights } = new CheckInConfirmationBuilder()
          .withLapInfants()
          .withViewPassengerBoardingPass()
          .build().checkInConfirmationPage);
      });
      it('should render lap child text next to name if passenger is lap infant', () => {
        const component = createFormComponent();

        expect(component).toMatchSnapshot();
      });
    });

    context('ineligible for MBP', () => {
      beforeEach(() => {
        ({ flights } = new CheckInConfirmationBuilder()
          .withPassengersByCount(2)
          .withViewPassengerBoardingPass()
          .withIneligibleViewPassengerBoardingPass(0)
          .withFlightWithConnection()
          .build().checkInConfirmationPage);
      });

      it('should render disabled checkbox when a passenger is ineligible and at least 1 passenger is eligible for mobile boarding pass', () => {
        const component = createFormComponent();
        const checkbox = component.find('FormCheckboxField').at(1).find('CheckboxField');

        expect(checkbox).to.have.className('checkbox-button');
        expect(checkbox).to.have.className('disabled');
      });

      it('should render allPasses as checked when a passenger is ineligible and at least 1 passenger is eligible for mobile boarding pass', () => {
        const component = createFormComponent();
        const checkbox = component.find('FormCheckboxField').at(0);

        expect(checkbox).to.have.prop('name', 'allPasses');
        expect(checkbox).to.have.prop('value', true);
      });
    });
  });

  context('submit', () => {
    it('should call onSubmit with all true values when form is submitted with initial values', () => {
      const component = createFormComponent();

      submitForm(component);

      expect(onSubmitStub).to.have.been.calledWith({
        allPasses: true,
        '0-0000000000000001-2301DC520002823E': true,
        '0-0000000000000002-2301DC5200028240': true,
        '1-0000000000000001-2301DC520002823E': true,
        '1-0000000000000002-2301DC5200028240': true
      });
    });
  });

  context('click checkbox interaction behavior', () => {
    it('should call update form field action with allPasses false values when allPasses is unchecked', async () => {
      const component = createFormComponent();
      const allPassesCheckbox = component.find('FormCheckboxField').at(0);

      click(allPassesCheckbox);

      await store.dispatch(FormDataActions.updateFormFieldDataValue('formId', 'allPasses', false));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: false,
          url: '/'
        },
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: false,
          url: '/'
        }
      ]);
    });

    it('should call update form field action with allPasses false values and then allPasses true value when allPasses is unchecked then checked', async () => {
      const component = createFormComponent();
      const allPassesCheckbox = component.find('FormCheckboxField').at(0);

      click(allPassesCheckbox);
      store.clearActions();
      click(allPassesCheckbox);

      await store.dispatch(FormDataActions.updateFormFieldDataValue('formId', 'allPasses', true));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: false,
          url: '/'
        },
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: true,
          url: '/'
        }
      ]);
    });

    it('should call update form field action with allPasses and first pax segment with false values when first pax segment is unchecked', async () => {
      const component = createFormComponent();
      const paxCheckbox = component.find('FormCheckboxField').at(1);

      click(paxCheckbox);

      await store.dispatch(FormDataActions.updateFormFieldDataValue('formId', 'allPasses', false));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: '0-0000000000000001-2301DC520002823E',
          value: false,
          url: '/'
        },
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: false,
          url: '/'
        }
      ]);
    });

    it('should call update form field action with allPasses and first pax segment with correct values values when unchecking allPasses, unchecking first pax segment then checking allPasses', async () => {
      const component = createFormComponent();
      const allPassesCheckbox = component.find('FormCheckboxField').at(0);
      const paxCheckbox = component.find('FormCheckboxField').at(1);

      click(allPassesCheckbox);
      click(paxCheckbox);
      click(allPassesCheckbox);

      await store.dispatch(FormDataActions.updateFormFieldDataValue('formId', 'allPasses', true));

      expect(store.getActions()).to.deep.equal([
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: false,
          url: '/'
        },
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: '0-0000000000000001-2301DC520002823E',
          value: false,
          url: '/'
        },
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: false,
          url: '/'
        },
        {
          type: 'UPDATE_FORM_FIELD_DATA_VALUE',
          formId: 'formId',
          fieldName: 'allPasses',
          value: true,
          url: '/'
        }
      ]);
    });
  });

  const createFormComponent = () => {
    const props = {
      formId: 'formId',
      flights,
      onSubmit: onSubmitStub
    };

    const wrapper = mount(
      <Provider store={store}>
        <ChooseMobileBoardingPassesForm {...props} />
      </Provider>
    );

    return wrapper.find('ChooseMobileBoardingPassesForm');
  };
});
