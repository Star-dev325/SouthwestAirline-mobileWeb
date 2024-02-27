import React from 'react';
import { mount } from 'enzyme';
import PassengerAdditionalInfo from 'src/shared/components/passengerAdditionalInfo';

describe('PassengerAdditionalInfo', () => {
  it('should render the Rapid Reward number without the leading zeros', () => {
    const component = createComponent({
      passenger: {
        accountNumber: '00000033333'
      }
    });

    expect(component.find('[data-qa="passenger-rapid-rewards"]')).to.have.text('33333');
  });

  context('TSA Precheck', () => {
    it('should hide TSA Precheck icon by default even if passenger have knownTravelerId', () => {
      const component = createComponent({
        passenger: {
          accountNumber: '00000033333',
          knownTravelerId: '1234ABCD'
        }
      });

      expect(component.find('Icon')).to.be.not.present();
    });

    it('should not show TSA Precheck icon when we set shouldDisplayTsaPrecheck as false', () => {
      const component = createComponent({
        passenger: {
          accountNumber: '00000033333',
          knownTravelerId: '1234ABCD'
        },
        shouldDisplayTsaPrecheck: false
      });

      expect(component.find('Icon')).to.not.be.present();
    });
  });

  const createComponent = (props) => mount(<PassengerAdditionalInfo {...props} />);
});
