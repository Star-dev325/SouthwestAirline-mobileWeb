import React from 'react';
import { sandbox } from 'sinon';
import { shallow } from 'enzyme';
import { createComponent } from 'test/unit/helpers/testUtils';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import CheckInAPISDestinationForm, {
  CheckInAPISDestinationForm as CheckInAPISDestinationFormComponent
} from '../checkInAPISDestinationForm';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

const sinon = sandbox.create();

describe('CheckInAPISDestinationForm', () => {
  let wrapper;
  let onCancelStub, onChangeStub, onSubmitStub, updateFormDataValueFnStub;

  beforeEach(() => {
    onSubmitStub = sinon.stub();
    onCancelStub = sinon.stub();
    updateFormDataValueFnStub = sinon.stub();
    onChangeStub = sinon.stub();
    sinon.stub(FullScreenModalHelper, 'showFullScreenModal');
    sinon.stub(FullScreenModalHelper, 'hideFullScreenModal');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when Initial the page with empty field', () => {
    beforeEach(() => {
      wrapper = createFormComponent();
    });

    it('should have page header with title and two buttons', () => {
      const pageHeaderWithButtons = wrapper.find('PageHeaderWithButtons');

      expect(pageHeaderWithButtons.find('.action-bar--container')).to.have.text('Destination Address');
      expect(pageHeaderWithButtons.find('button').at(0)).to.have.text('Cancel');
      expect(pageHeaderWithButtons.find('button').at(1)).to.have.text('Done');
    });

    it('should have country field', () => {
      wrapper = createFormComponent({
        initialFormData: {
          isoCountryCode: 'US'
        }
      });
      const countryField = wrapper.find('FormNavItemField');

      expect(countryField).to.be.exist;
      expect(countryField).to.have.prop('placeholder', 'Country');
      expect(countryField).to.have.prop('value', 'United States of America - US');
    });

    it('should have address field', () => {
      const addressField = wrapper.find('FormInputField').at(0);

      expect(addressField).to.be.exist;
      expect(addressField).to.have.prop('placeholder', 'Street address');
    });

    it('should have city field', () => {
      const cityField = wrapper.find('FormInputField').at(1);

      expect(cityField).to.be.exist;
      expect(cityField).to.have.prop('placeholder', 'City');
    });

    it('should have zip field', () => {
      const cityField = wrapper.find('FormInputField').at(2);

      expect(cityField).to.be.exist;
      expect(cityField).to.have.prop('placeholder', 'ZIP code');
    });

    it('should have state field', () => {
      const stateField = wrapper.find('FormSelectField').at(0);

      expect(stateField).to.be.exist;
      expect(stateField).to.have.prop('placeholder', 'State');
    });
  });

  it('should save destination address data and transition to additionalPassportInfoPage when click done button', () => {
    wrapper = createFormComponent({
      initialFormData: {
        isoCountryCode: 'US',
        zipOrPostalCode: '12344',
        addressLine: 'address',
        city: 'Dallas',
        stateProvinceRegion: 'Texas'
      }
    });

    submitForm(wrapper.find('Form'));

    expect(onSubmitStub).to.have.been.calledWith({
      isoCountryCode: 'US',
      zipOrPostalCode: '12344',
      addressLine: 'address',
      city: 'Dallas',
      stateProvinceRegion: 'Texas'
    });
  });

  it('should go back to additionalPassportInfoPage when click cancel button', () => {
    wrapper = createFormComponent();
    const cancelButton = wrapper.find('Button').at(0);

    click(cancelButton);

    expect(onCancelStub).to.have.been.called;
  });

  it('should call onChange with isoCountryCode and clear city, addressLine, zipOrPostalCode and state when reselect country (not US)', () => {
    wrapper = createFormComponent(
      {},
      {
        router: {
          location: {
            search: '_modal=countryList'
          }
        }
      }
    );

    wrapper.find('DestinationAddressFields').props().onCountrySelected('AS');

    expect(onChangeStub).to.have.been.calledWith('isoCountryCode', 'AS');
    expect(updateFormDataValueFnStub).to.have.been.calledWith('CHECK_IN_APIS_DESTINATION_FORM', {
      addressLine: '',
      city: '',
      zipOrPostalCode: '',
      stateProvinceRegion: ''
    });
  });

  context('Contact Tracing', () => {
    const destinationConfig = {
      title: 'Contact Tracing',
      includeContactTracingFields: true,
      addressTextWIthLinks: 'Enter the address you can be reached at during your stay in the United States.',
      contactEmailLabel: 'Email address',
      contactEmailRequired: true,
      contactPhone1Label: 'Phone number 1',
      contactPhone1Required: true,
      contactPhone2Label: 'Phone number 2',
      contactPhone2Required: true,
      applyToAllLabel: 'Use the contact tracing information for all passengers',
      collectionNoticeHeader: 'Collection notice header goes here',
      collectionNoticeTextWithLinks: 'Collection notice info goes here <a href="http://example.com">A link</a>',
      termsAndConditionsHeader: 'Terms and conditions header goes here',
      termsAndConditionsTextWithLinks: 'Terms and conditions info goes here <a href="http://example.com">A link</a>',
      allowApplyToAll: false
    };

    it('should render', () => {
      const props = {
        ...getDefaultProps(),
        destinationConfig,
        formData: {}
      };

      wrapper = shallow(<CheckInAPISDestinationFormComponent {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with use for all radio button', () => {
      destinationConfig.allowApplyToAll = true;

      const props = {
        ...getDefaultProps(),
        destinationConfig,
        formData: {},
        shouldDisplayUseForAll: true
      };

      wrapper = shallow(<CheckInAPISDestinationFormComponent {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  const getDefaultProps = () => ({
    formId: 'formId',
    initialFormData: {},
    onCancel: onCancelStub,
    onSubmit: onSubmitStub,
    onChange: onChangeStub,
    updateFormDataValueFn: updateFormDataValueFnStub
  });

  const createFormComponent = (props = {}, state = {}) =>
    createComponent(CheckInAPISDestinationForm, { state, props: { ...getDefaultProps(), ...props } });
});
