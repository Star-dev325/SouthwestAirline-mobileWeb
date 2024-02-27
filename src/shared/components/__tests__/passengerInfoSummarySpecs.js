import React from 'react';
import sinonModule from 'sinon';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import PassengerInfoSummary from 'src/shared/components/passengerInfoSummary';

const sinon = sinonModule.sandbox.create();

describe('passengerInfoSummary component', () => {
  let component;
  let onPassengerItemClickStub;

  beforeEach(() => {
    onPassengerItemClickStub = sinon.stub();
    const props = {
      passengers: [
        {
          name: 'Amber Awesome',
          rapidRewardsNumber: '8349157375'
        },
        {
          name: 'Steve Job'
        }
      ],
      onPassengerItemClick: onPassengerItemClickStub
    };

    component = mount(<PassengerInfoSummary {...props} />);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should display passenger name', () => {
      expect(component.find('span[data-qa="passenger-info-summary--passenger-name"]').first()).to.have.text(
        'Amber Awesome'
      );
    });

    it('should render accountNumber or rapidRewardsNumber', () => {
      const firstPassenger = component.find('NavItemLink').first();

      expect(firstPassenger.find('.passenger-info-summary--item-rapid-rewards')).to.have.text('8349157375');
    });

    it('should not render rapidRewardsNumber', () => {
      const secondPassenger = component.find('NavItemLink').at(1);

      expect(secondPassenger.find('.passenger-info-summary--item-rapid-rewards')).to.not.be.present();
    });
  });

  context('onClick', () => {
    it('should trigger onPassengerItemClick callback when user click the passenger item', () => {
      click(component.find('NavItemLink').at(1));

      expect(onPassengerItemClickStub).to.have.been.calledWith(1);
    });
  });
});
