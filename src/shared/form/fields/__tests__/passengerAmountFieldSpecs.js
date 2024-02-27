import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { PassengerAmountField } from 'src/shared/form/fields/passengerAmountField';

const sinon = sandbox.create();

describe('PassengerAmountField', () => {
  let onChangeStub;
  let wrapper;

  beforeEach(() => {
    onChangeStub = sinon.stub();
    wrapper = createComponent();
  });

  context('render', () => {
    it('should render default component correct', () => {
      expect(wrapper.find('.passenger-amount-field--icon')).to.exist;
    });
  });

  context('when lapChild toggle is turned on', () => {
    it('should not show plus minus button', () => {
      wrapper = createComponent({ passengerNumber: 1 });

      expect(wrapper.find('Button')).to.have.lengthOf(0);
    });

    it('should call onSelectPassengerClicked function when clicked on wrapper', () => {
      const onSelectPassengerClickedStub = sinon.stub();

      wrapper = createComponent({
        passengerNumber: 1,
        onSelectPassengerClicked: onSelectPassengerClickedStub
      });

      click(wrapper.find('.passenger-amount-field').at(0));

      expect(onSelectPassengerClickedStub).to.have.been.called;
    });

    it('should render Passengers when multiple passengers are selected', () => {
      const passengerCountValue = {
        lapChildCount: 0,
        adultCount: 1,
        valueUpdated: true
      };

      wrapper = createComponent({
        passengerCountValue,
        adultsPlusChildrenCount: 2,
        MWEB_HOMEPAGE_REDESIGN: false
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render Passenger when single passenger is selected', () => {
      const passengerCountValue = {
        lapChildCount: 0,
        adultCount: 1,
        valueUpdated: true
      };

      wrapper = createComponent({
        passengerCountValue,
        adultsPlusChildrenCount: 1,
        MWEB_HOMEPAGE_REDESIGN: false,
        isLapChildEnabled: true
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render PassengerAmountField when MWEB_HOMEPAGE_REDESIGN is true', () => {
    wrapper = createComponent({ passengerNumber: 1, MWEB_HOMEPAGE_REDESIGN: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render PassengerAmountField when MWEB_HOMEPAGE_REDESIGN is false', () => {
    wrapper = createComponent({ passengerNumber: 1, MWEB_HOMEPAGE_REDESIGN: false });
    expect(wrapper).toMatchSnapshot();
  });

  const createComponent = ({
    paxType = 'Passenger',
    passengerNumber = 0,
    disablePlus,
    disableMinus,
    MWEB_HOMEPAGE_REDESIGN = false,
    onSelectPassengerClicked = () => {},
    adultsPlusChildrenCount = 1,
    passengerCountValue = {
      lapChildCount: 0,
      adultCount: 1,
      valueUpdated: false
    }
  } = {}) =>
    mount(
      <PassengerAmountField
        name="passenger-amount-field"
        paxType={paxType}
        onChange={onChangeStub}
        value={passengerNumber}
        disableMinus={disableMinus}
        disablePlus={disablePlus}
        clearError={() => {}}
        MWEB_HOMEPAGE_REDESIGN={MWEB_HOMEPAGE_REDESIGN}
        onSelectPassengerClicked={onSelectPassengerClicked}
        adultsPlusChildrenCount={adultsPlusChildrenCount}
        passengerCountValue={passengerCountValue}
      />
    );
});
