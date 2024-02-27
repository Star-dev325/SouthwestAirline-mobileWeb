import i18n from '@swa-ui/locale';
import _ from 'lodash';
import { sandbox } from 'sinon';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import BoundSelectForm from 'src/shared/components/boundSelect/boundSelectForm';
import { AIR_CHANGE_SELECT_FORM, SAME_DAY_SELECT_FORM } from 'src/shared/constants/formIds';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import { enterCheckbox, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { createComponent } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('BoundSelectForm', () => {
  let wrapper;
  let onSubmitStub;
  let boundSelections;
  let defaultProps;
  let updateFormFieldDataValueSpy;

  beforeEach(() => {
    onSubmitStub = sinon.stub();
    updateFormFieldDataValueSpy = sinon.spy(FormDataActions, 'updateFormFieldDataValue');
    boundSelections = [new BoundSelectionBuilder().withDynamicWaiver(true).build()];
    defaultProps = {
      formId: AIR_CHANGE_SELECT_FORM,
      boundSelections,
      selectionMode: 'ALL',
      onSubmit: onSubmitStub,
      isDynamicWaiver: false,
      passengerDetails: null,
      name: 'air-change',
      selectType: 'checkbox'
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  const createFormComponent = (extraProps = {}) =>
    createComponent(BoundSelectForm, { props: _.merge({}, defaultProps, extraProps) });

  context('render', () => {
    beforeEach(() => {
      wrapper = createFormComponent();
    });

    it('should render expected component', () => {
      expect(wrapper.find('Button')).to.contain.text('Continue');
      expect(wrapper.find('FlightAbstraction')).to.have.prop('boundSelections').deep.equal(boundSelections);
      expect(wrapper.find('FlightAbstraction')).to.have.prop('selectionMode', 'ALL');
      expect(wrapper.find('[data-qa="air-change-footer-message"]')).to.be.not.present();
    });

    it('should show dynamic waiver message when is the flight is dynamic waiver', () => {
      wrapper = createFormComponent({ isDynamicWaiver: true });
      expect(wrapper.find('[data-qa="air-change-footer-message"]')).to.have.text(
        i18n('AIR_CHANGE__AIR_CHANGE_SELECT__FOOTER_MESSAGE')
      );
    });

    it('should pass ineligibleBoundMessages to FlightAbstraction', () => {
      const ineligibleBoundMessages = ['message1'];

      wrapper = createFormComponent({ ineligibleBoundMessages });

      const flightAbstraction = wrapper.find('FlightAbstraction');

      expect(flightAbstraction.prop('ineligibleBoundMessages')).to.deep.equal(ineligibleBoundMessages);
    });
  });

  describe('passenger details', () => {
    it('should show passenger details when passenger details exist', () => {
      const passengerDetails = {
        disclaimerTextWithLinks:
          'Flight changes apply to all passengers on this reservation. If you need to make changes to one person on your itinerary, please call , <a href="tel:18004359792">1 800 I FLY SWA( 1-800-435-9792)</a>.',
        title: 'PASSENGER(S)',
        passengerList: [{ displayName: 'Tesla Awesome' }, { displayName: 'Tesla Smart' }]
      };

      wrapper = createFormComponent({ passengerDetails });

      expect(wrapper.find('.passenger-details')).toMatchSnapshot();
    });

    it('should not show passenger details when passenger details not exist', () => {
      wrapper = createFormComponent();

      expect(wrapper.find('.passenger-details')).toMatchSnapshot();
    });
  });

  context('dynamic waiver', () => {
    beforeEach(() => {
      wrapper = createFormComponent();
    });

    it('should show check the dynamic waiver flights by default only for the bounds that have dynamic waiver', () => {
      const boundSelections = [
        new BoundSelectionBuilder().withDynamicWaiver(false).build(),
        new BoundSelectionBuilder().withDynamicWaiver(true).build()
      ];

      defaultProps.boundSelections = boundSelections;
      wrapper = createFormComponent(BoundSelectForm, { props: defaultProps });
      expect(wrapper.find('div[name="firstbound"]').find('.checkbox-button_checked')).to.not.exist;
      expect(wrapper.find('div[name="secondbound"]').find('.checkbox-button_checked')).to.exist;
    });
  });

  context('form submit', () => {
    beforeEach(() => {
      wrapper = createFormComponent();
    });

    it('should trigger submit when submit form', () => {
      submitForm(wrapper);

      expect(onSubmitStub).to.be.called;
    });
  });

  context('checkbox interaction', () => {
    beforeEach(() => {
      boundSelections = [
        new BoundSelectionBuilder().withReaccomBound().build(),
        new BoundSelectionBuilder().withReaccomBound().build()
      ];
    });

    context('when isReaccom true', () => {
      it('should uncheck other bounds when round trip and isReaccomBlockMultiBoundSelection is true', () => {
        const props = { boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection: true };

        wrapper = createFormComponent(props);

        enterCheckbox(wrapper.find('CheckboxField').at(0), true);
        expect(updateFormFieldDataValueSpy).calledWith(AIR_CHANGE_SELECT_FORM, 'secondbound', false);

        enterCheckbox(wrapper.find('CheckboxField').at(1), true);
        expect(updateFormFieldDataValueSpy).calledWith(AIR_CHANGE_SELECT_FORM, 'firstbound', false);
      });

      it('should not uncheck other bounds when round trip and isReaccomBlockMultiBoundSelection is false', () => {
        const props = { boundSelections, isReaccom: true, isReaccomBlockMultiBoundSelection: false };

        wrapper = createFormComponent(props);

        enterCheckbox(wrapper.find('CheckboxField').at(0), true);
        expect(updateFormFieldDataValueSpy).to.not.have.been.called;

        enterCheckbox(wrapper.find('CheckboxField').at(1), true);
        expect(updateFormFieldDataValueSpy).to.not.have.been.called;
      });
    });

    context('when isReaccom false', () => {
      it('should not uncheck other bounds when round trip', () => {
        const props = { boundSelections, isReaccom: false };

        wrapper = createFormComponent(props);

        enterCheckbox(wrapper.find('CheckboxField').at(0), true);
        expect(updateFormFieldDataValueSpy).to.not.have.been.called;
      });
    });
  });

  describe('radio interaction', () => {
    describe('when selectType is radio', () => {
      let props;

      beforeEach(() => {
        const {
          viewReservationViewPage: {
            viewForSameDayPage: { boundSelections }
          }
        } = new ViewReservationBuilder().withViewForSameDayPage().build();

        props = {
          formId: SAME_DAY_SELECT_FORM,
          boundSelections,
          name: 'same-day',
          selectType: 'radio'
        };
      });

      it('should render ', () => {
        wrapper = createFormComponent(props);

        expect(wrapper.find('FormRadioMarkField')).toMatchSnapshot();
      });

      it('should not allow unselect all', () => {
        wrapper = createFormComponent(props);

        wrapper.find('FormRadioMarkField').at(0).find('.flex-main-center').simulate('click');

        expect(updateFormFieldDataValueSpy).calledWith(SAME_DAY_SELECT_FORM, 'firstbound', true);

        wrapper.find('FormRadioMarkField').at(0).find('.flex-main-center').simulate('click');

        expect(updateFormFieldDataValueSpy).calledWith(SAME_DAY_SELECT_FORM, 'firstbound', true);
      });
    });
  });
});
