import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinonModule from 'sinon';

import { submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { ViewReservationSpecialAssistancePage } from 'src/viewReservation/pages/viewReservationSpecialAssistancePage';
import {
  VIEW_RESERVATION_TRAVEL_INFORMATION_FORM,
  VIEW_RESERVATION_SPECIAL_ASSISTANCE_FORM
} from 'src/shared/constants/formIds';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';

const sinon = sinonModule.sandbox.create();

describe('ViewReservationSpecialAssistancePage', () => {
  let clearFormDataByIdFnStub, goBackStub, pushStub, retrieveFlightAndTravelInformationWithSearchTokenFnStub, specialAssistanceAnalyticsFnStub, updateFormDataValueFnStub, wrapper;

  beforeEach(() => {
    clearFormDataByIdFnStub = sinon.stub();
    goBackStub = sinon.stub();
    pushStub = sinon.stub();
    retrieveFlightAndTravelInformationWithSearchTokenFnStub = sinon.stub();
    specialAssistanceAnalyticsFnStub = sinon.stub();
    updateFormDataValueFnStub = sinon.stub();
    wrapper = createComponent();
  });

  context('should render', () => {
    it('SpecialAssistancePage and SpecialAssistanceForm', () => {
      expect(wrapper.find('SpecialAssistancePage')).to.be.present();
      expect(wrapper.find('SpecialAssistanceForm')).to.be.present();
      expect(retrieveFlightAndTravelInformationWithSearchTokenFnStub).not.have.been.called;
    });

    it('SpecialAssistancePage and SpecialAssistanceForm with searchToken', () => {
      const additionalProps = {
        query: {
          passengerReference: 2,
          searchToken: 'ae!dwerfsgfj12jdsljf'
        }
      };

      wrapper = createComponent(additionalProps);
      expect(wrapper.find('SpecialAssistancePage')).to.be.present();
      expect(wrapper.find('SpecialAssistanceForm')).to.be.present();
      expect(retrieveFlightAndTravelInformationWithSearchTokenFnStub).to.have.been.calledWith('ae!dwerfsgfj12jdsljf', 2);
    });
  });

  context('initialFormData', () => {
    let formData;

    beforeEach(() => {
      formData = {
        BLIND: false,
        DEAF: true,
        COGNITIVE_AND_DEVELOPMENTAL_SSR: true,
        ASSISTANCE_ANIMAL: false,
        PEANUT_DUST_ALLERGY: false,
        PORTABLE_OXYGEN_CONCENTRATOR: false,
        WHEELCHAIR_ASSISTANCE: 'NONE',
        WHEELCHAIR_STOWAGE: 'NONE',
        WET_BATTERIES: null,
        DRY_BATTERIES: null
      };
    });

    it('should pass local savedFormData if it exists', () => {
      wrapper = createComponent({
        savedFormData: formData,
        nonChargeableAncillaryProducts: [{ ancillaryType: 'BLIND' }]
      });

      expect(wrapper.find('SpecialAssistancePage').props().initialFormData.BLIND).to.equal(false);
      expect(wrapper.find('SpecialAssistancePage').props().initialFormData.DEAF).to.equal(true);
    });
  });

  context('on submit with form data', () => {
    it('should save companion passenger info and back to purchase summary page when submit', () => {
      wrapper = createComponent({ specialAssistanceFormData: { BLIND: true } });
      submitForm(wrapper);

      expect(updateFormDataValueFnStub).to.have.been.calledWith(VIEW_RESERVATION_TRAVEL_INFORMATION_FORM, {
        specialAssistance: _.merge({}, DEFAULT_FIELD_VALUES, { BLIND: true })
      });
      expect(clearFormDataByIdFnStub).to.have.been.calledWith(VIEW_RESERVATION_SPECIAL_ASSISTANCE_FORM);
      expect(specialAssistanceAnalyticsFnStub).to.have.been.calledWith(true);
      expect(pushStub).not.have.been.called;
    });

    it('should save companion passenger info and back to purchase summary page when submit with searchToken with isInternalNav undefined', () => {
      const additionalProps = {
        query: {
          passengerReference: 2,
          searchToken: 'ae!dwerfsgfj12jdsljf'
        }
      };

      wrapper = createComponent({ specialAssistanceFormData: { BLIND: true }, ...additionalProps });
      submitForm(wrapper);

      expect(specialAssistanceAnalyticsFnStub).to.have.been.calledWith(true);
      expect(pushStub).to.have.been.calledWith('/air/manage-reservation/traveler-information.html?passengerReference=2&searchToken=ae!dwerfsgfj12jdsljf&clearFormData=false');
    });
  });

  context('on submit without changed form data', () => {
    it('should save companion passenger info and back to purchase summary page when submit', () => {
      wrapper = createComponent();
      submitForm(wrapper);

      expect(updateFormDataValueFnStub).to.have.been.calledWith(VIEW_RESERVATION_TRAVEL_INFORMATION_FORM, {
        specialAssistance: DEFAULT_FIELD_VALUES
      });
      expect(clearFormDataByIdFnStub).to.have.been.calledWith(VIEW_RESERVATION_SPECIAL_ASSISTANCE_FORM);
      expect(specialAssistanceAnalyticsFnStub).to.have.been.calledWith(false);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      clearFormDataByIdFn: clearFormDataByIdFnStub,
      goBack: goBackStub,
      nonChargeableAncillaryProducts: [],
      push: pushStub,
      retrieveFlightAndTravelInformationWithSearchTokenFn: retrieveFlightAndTravelInformationWithSearchTokenFnStub,
      savedFormData: {},
      specialAssistanceAnalyticsFn: specialAssistanceAnalyticsFnStub,
      specialAssistanceFormData: DEFAULT_FIELD_VALUES,
      updateFormDataValueFn: updateFormDataValueFnStub
    };

    const store = configureMockStore()({
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return mount(
      <Provider store={store}>
        <ViewReservationSpecialAssistancePage {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});
