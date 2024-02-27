import React from 'react';
import { PhoneNumberWithModal } from 'src/shared/form/fields/phoneNumberWithModal';
import { shallow } from 'enzyme';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('Phone Number With Modal', () => {
  let onChangeStub;
  let hideFullScreenModalStub;
  let showFullScreenModalStub;

  beforeEach(() => {
    onChangeStub = sinon.stub();
    showFullScreenModalStub = sinon.stub(FullScreenModalHelper, 'showFullScreenModal');
    hideFullScreenModalStub = sinon.stub(FullScreenModalHelper, 'hideFullScreenModal');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render default props', () => {
    expect(createComponent()).toMatchSnapshot();
  });

  it('should render non-iso props', () => {
    expect(
      createComponent({
        nameForPhoneCountryCode: 'testCaseCountryCode',
        nameForPhoneNumber: 'testCasePhoneNumber',
        isISOCountryCode: false,
        className: 'non-iso-codes'
      })
    ).toMatchSnapshot();
  });

  it('should open country modal on phone label click', () => {
    const component = createComponent();

    component.find('WithFields(PhoneNumberFields)').props().onLabelClick();

    expect(showFullScreenModalStub).to.have.been.calledWith('COUNTRY_CODE');
  });

  it('should reset phone number on country selection', () => {
    const component = createComponent();

    component.find('PhoneCountryCodeList').props().onCountryCodeSelect({ countryCode: 'NZ' });

    expect(onChangeStub.getCall(0).args).to.have.deep.equal(['countryCode', 'NZ']);
    expect(onChangeStub.getCall(1).args).to.have.deep.equal(['phoneNumber', '']);
  });

  it('should reset phone number on country selection for non-iso', () => {
    const component = createComponent({
      nameForPhoneCountryCode: 'testCaseCountryCode',
      nameForPhoneNumber: 'testCasePhoneNumber',
      isISOCountryCode: false
    });

    component.find('PhoneCountryCodeList').props().onCountryCodeSelect({ countryCode: 'NZ' });

    expect(onChangeStub.getCall(0).args).to.have.deep.equal(['testCaseCountryCode', '64']);
    expect(onChangeStub.getCall(1).args).to.have.deep.equal(['testCasePhoneNumber', '']);
  });

  it('should close country modal on cancel', () => {
    const component = createComponent();

    component.find('PhoneCountryCodeList').props().onCancel();

    expect(hideFullScreenModalStub).to.have.been.calledWith('COUNTRY_CODE');
  });

  function createComponent(props) {
    const context = {
      form: {
        onChange: onChangeStub
      }
    };
    const defaultProps = {
      nameForPhoneCountryCode: 'countryCode',
      nameForPhoneNumber: 'phoneNumber',
      isISOCountryCode: true
    };

    return shallow(
      <PhoneNumberWithModal
        {...{
          ...defaultProps,
          ...props
        }}
      />,
      { context }
    );
  }
});
