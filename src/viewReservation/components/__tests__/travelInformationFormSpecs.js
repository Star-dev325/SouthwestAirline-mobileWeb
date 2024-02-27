import _ from 'lodash';
import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import { createComponent } from 'test/unit/helpers/testUtils';
import { enterText, click } from 'test/unit/helpers/enzymeFormTestUtils';
import * as fullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

const sinon = sandbox.create();

describe('TravelInformationForm', () => {
  let form;
  let showFullScreenModalStub;
  let clickSpecialAssistanceFnStub;
  const EDIT_NAMES_MESSAGE_TEXT =
    'Last name change is limited to a one time change of up to 3 characters.  Passenger information must match government-issued ID';

  beforeEach(() => {
    showFullScreenModalStub = sinon.stub(fullScreenModalHelper, 'showFullScreenModal');
    clickSpecialAssistanceFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('Form', () => {
    context('basic render', () => {
      beforeEach(() => {
        form = renderComponent();
      });

      it('rapid rewards should field be enabled if rapid rewards is not already entered', () => {
        const field = form.find('Form').find('input[name="rapidRewardsNumber"]').at(0);

        expect(field).to.exist;
        expect(field).to.have.prop('disabled', false);
      });

      it('should display form with correct classname', () => {
        expect(form.find('Form')).to.have.className('travel-information-form');
      });

      it('should have have yellow submit button with text Save', () => {
        expect(form.find('Form').find('Button')).to.have.have.prop('color', 'yellow');
        expect(form.find('Form').find('Button')).to.have.have.text('Save');
      });

      it('should display editNamesMessage when not null', () => {
        expect(form.find('Form').find('[data-qa="edit-names-message"]')).to.have.text(EDIT_NAMES_MESSAGE_TEXT);
      });

      it('should not display editNamesMessage when null', () => {
        form = renderComponent({ editNamesMessage: null });
        expect(form.find('Form').find('[data-qa="edit-names-message"]')).to.not.exist;
      });

      context('Security Information', () => {
        it('should display Security Information', () => {
          expect(form.find('.travel-information-form--title').at(4)).to.have.have.text('SECURE TRAVELER INFORMATION');
        });
      });

      context('with initial form data', () => {
        context('and name is editable', () => {
          beforeEach(() => {
            form = renderComponent({ isEditablePassengerLastName: true, isEditablePassengerFirstMiddleName: true });
          });
          it('should set value of firstName field and not disable the field', () => {
            const firstName = form.find('input[name="firstName"]');

            expect(firstName).prop('value').to.equal('Fred');
            expect(firstName).prop('disabled').to.equal(false);
          });
          it('should set value of middleName field and not disable the field', () => {
            const middleName = form.find('input[name="middleName"]');

            expect(middleName).prop('value').to.equal('Bedrock');
            expect(middleName).prop('disabled').to.equal(false);
          });
          it('should set value of lastName field and not disable the field', () => {
            const lastName = form.find('input[name="lastName"]');

            expect(lastName).prop('value').to.equal('Flinstone');
            expect(lastName).prop('disabled').to.equal(false);
          });
        });
        context('and name is not editable', () => {
          beforeEach(() => {
            form = renderComponent();
          });
          it('should set value of firstName field and disable the field', () => {
            const firstName = form.find('input[name="firstName"]');

            expect(firstName).prop('value').to.equal('Fred');
            expect(firstName).prop('disabled').to.equal(true);
          });
          it('should set value of middleName field and disable the field', () => {
            const middleName = form.find('input[name="middleName"]');

            expect(middleName).prop('value').to.equal('Bedrock');
            expect(middleName).prop('disabled').to.equal(true);
          });
          it('should set value of lastName field and disable the field', () => {
            const lastName = form.find('input[name="lastName"]');

            expect(lastName).prop('value').to.equal('Flinstone');
            expect(lastName).prop('disabled').to.equal(true);
          });
        });
        it('should set suffix field disabled when has initial value for suffix', () => {
          const suffix = form.find('input[name="suffix"]');

          expect(suffix).prop('value').to.equal('Sr');
          expect(suffix).prop('disabled').to.equal(true);
        });
        it('should set dateOfBirth field disabled when has initial value for dateOfBirth', () => {
          const dateOfBirth = form.find('input[name="dateOfBirth"]');

          expect(dateOfBirth).prop('value').to.be.be.equal('02/01/XXXX');
          expect(dateOfBirth).prop('disabled').to.be.be.equal(true);
        });
        it('should set gender field disabled when has initial value for gender', () => {
          const gender = form.find('input[name="gender"]');

          expect(gender).prop('value').to.be.be.equal('On File');
          expect(gender).prop('disabled').to.be.be.equal(true);
        });
        it('should set RR number field disabled when has initial value for RR number', () => {
          form = renderComponent({ initialFormData: { rapidRewardsNumber: '601006545' } });

          expect(form.find('input[name="rapidRewardsNumber"]')).to.have.prop('disabled', true);
        });

        it('should not set KTN field disabled when has initial value for KTN', () => {
          form = renderComponent({ initialFormData: { knownTravelerNumber: 'T5435243' } });

          expect(form.find('input[name="knownTravelerNumber"]')).to.not.have.prop('disabled', true);
        });

        it('should not set redress number field disabled when has initial value for redress number', () => {
          form = renderComponent({ initialFormData: { redressNumber: '12345' } });
          expect(form.find('input[name="redressNumber"]')).to.not.have.prop('disabled', true);
        });

        it('should not be able to change RR Number if it has an initial value', () => {
          form = renderComponent({ initialFormData: { rapidRewardsNumber: '601006545' } });

          const field = form.find('input[name="rapidRewardsNumber"]');

          expect(field).to.have.prop('disabled', true);

          enterText(field, '1234');

          expect(field.prop('value')).to.be.be.equal('601006545');
        });

        it('should be able to change KTN if it has an initial value', () => {
          form = renderComponent({ initialFormData: { knownTravelerNumber: 'T5435243' } });

          const field = form.find('input[name="knownTravelerNumber"]');

          expect(field).to.not.have.prop('disabled', true);

          enterText(field, '123');
          form.update();

          expect(form.find('input[name="knownTravelerNumber"]').prop('value')).to.be.be.equal('123');
        });

        it('should be able to change redress number if it has an initial value', () => {
          form = renderComponent({ initialFormData: { redressNumber: '12345' } });

          const field = form.find('input[name="redressNumber"]');

          expect(field).to.not.have.prop('disabled', true);

          enterText(field, '001');
          form.update();

          expect(form.find('input[name="redressNumber"]').prop('value')).to.be.be.equal('001');
        });
      });

      context('SpecialAssistance', () => {
        it('should render SpecialAssistanceNavItem', () => {
          expect(form.find('SpecialAssistanceNavItem')).to.exist;
        });

        it('should navigate to SpecialAssistance page when NavItem is clicked', () => {
          form = renderComponent();
          form.find('SpecialAssistanceNavItem NavItemLink').simulate('click');

          expect(clickSpecialAssistanceFnStub).to.have.been.called;
        });

        it('should pass disabled: true to SpecialAssistanceNavItem if disableSpecialAssistance flag is true', () => {
          form = renderComponent({ initialFormData: { disableSpecialAssistance: true } });

          expect(form.find('SpecialAssistanceNavItem')).to.have.prop('disabled', true);
        });

        it('should pass disabled: false to SpecialAssistanceNavItem if disableSpecialAssistance flag is false', () => {
          form = renderComponent({ initialFormData: { disableSpecialAssistance: false } });

          expect(form.find('SpecialAssistanceNavItem')).to.have.prop('disabled', false);
        });
      });
    });

    context('render passport and emergency contact when trip is international', () => {
      beforeEach(() => {
        const props = {
          isInternational: true,
          initialFormData: {
            countryOfResidence: 'US',
            emergencyContactName: 'TEST NAME',
            nationality: 'AO',
            passportExpirationDate: '2019-11-17',
            passportIssuedBy: 'AS',
            passportNumber: 'AAAA',
            emergencyContactCountryCode: 'US',
            emergencyContactPhoneNumber: '2131312321'
          },
          disableNationalityItem: true
        };

        form = renderComponent(props);
      });

      context('passport', () => {
        let passportFields;

        beforeEach(() => {
          passportFields = form.find('.passport-form--info');
        });

        it('should render passport fields', () => {
          expect(passportFields.find('FormInputMaskField').props()).to.contains({
            name: 'passportNumber',
            value: 'AAAA',
            placeholder: 'Passport Number',
            onFocus: _.noop
          });
          expect(passportFields.find('FormNavItemField').at(0).props()).to.contains({
            name: 'passportIssuedBy',
            value: 'American Samoa - AS',
            placeholder: 'Passport was Issued by:'
          });
          expect(passportFields.find('FormNavItemField').at(1).props()).to.contains({
            name: 'nationality',
            value: 'Angola - AO',
            placeholder: 'Nationality'
          });
          expect(passportFields.find('FormNavItemField').at(1).prop('disabled')).to.be.true;

          expect(passportFields.find('FormDatePickerField')).to.have.prop('name', 'passportExpirationDate');
          expect(passportFields.find('FormNavItemField').at(2).props()).to.contains({
            name: 'countryOfResidence',
            value: 'United States of America - US',
            placeholder: 'Country of Residence'
          });
        });
      });

      context('emergency contact', () => {
        it('should render emergency contact method', () => {
          const emergencyContactFields = form.find('.passport-form--emergency-contact');

          expect(emergencyContactFields.find('FormInputField').at(0).props()).to.contains({
            name: 'emergencyContactName',
            value: 'TEST NAME',
            placeholder: 'Name'
          });
          expect(emergencyContactFields.find('PhoneNumberFields').props().formData).to.deep.equal({
            emergencyContactPhoneNumber: '2131312321',
            emergencyContactCountryCode: 'US'
          });
        });
      });
    });

    context('click events', () => {
      context('country list', () => {
        it('should show country list fullscreen modal when click passportIssuedBy', () => {
          const form = renderComponent({ isInternational: true });

          click(form.find('a[name="passportIssuedBy"]'));
          expect(showFullScreenModalStub).to.have.been.called;
        });
      });
    });
  });

  context('Security Information', () => {
    beforeEach(() => {
      form = renderComponent({});
    });

    it('should KTN field should be disabled if passenger is checked in', () => {
      const field = form.find('Form').find('input[name="knownTravelerNumber"]');

      expect(field).to.exist;
      expect(field).to.not.have.prop('disabled', true);
    });

    it('should redress number field should be disabled if passenger is checked in', () => {
      const field = form.find('Form').find('input[name="redressNumber"]');

      expect(field).to.exist;
      expect(field).to.not.have.prop('disabled', true);
    });
  });

  const renderComponent = (props) => {
    const TravelInformationForm = proxyquire('src/viewReservation/components/travelInformationForm', {
      'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper': {
        showFullScreenModal: showFullScreenModalStub,
        hideFullScreenModal: _.noop
      }
    }).default;
    const defaultProps = {
      formId: 'FORM_ID',
      passengerName: 'Fred Flintstone',
      onSubmit: () => {},
      initialFormData: {
        firstName: 'Fred',
        lastName: 'Flinstone',
        middleName: 'Bedrock',
        suffix: 'Sr',
        dateOfBirth: '02/01/XXXX',
        gender: 'On File'
      },
      isInternational: false,
      isCheckedIn: false,
      onChange: sinon.stub(),
      onPassPortNumberFocus: _.noop,
      disableNationalityItem: false,
      firstName: 'Fred',
      lastName: 'Flintstone',
      clickSpecialAssistanceFn: clickSpecialAssistanceFnStub,
      isEditablePassengerFirstMiddleName: false,
      isEditablePassengerLastName: false,
      editNamesMessage: {
        body: EDIT_NAMES_MESSAGE_TEXT,
        key: 'UPDATE_PASSENGER_NAMES_MESSAGE'
      }
    };

    return createComponent(TravelInformationForm, { props: { ...defaultProps, ...props } });
  };
});
