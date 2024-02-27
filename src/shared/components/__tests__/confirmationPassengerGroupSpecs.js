import React from 'react';
import { mount } from 'enzyme';
import ConfirmationPassengerGroup from 'src/shared/components/confirmationPassengerGroup';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('ConfirmationPassengerGroup', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      passengers: [
        {
          displayName: 'Hank the Cow Dog',
          name: 'Hank',
          firstName: 'Hank',
          lastName: 'CowDog',
          hasExtraSeat: false,
          hasAnyEarlyBird: false
        }
      ]
    };
  });

  context('render', () => {
    it('should render correctly', () => {
      const confirmationPassengerGroup = createComponent(defaultProps);

      expect(confirmationPassengerGroup).to.exist;
      expect(confirmationPassengerGroup).to.not.contain.text('EarlyBird');
    });
  });

  context('early bird', () => {
    it('should display earlybird when passenger has earlybird', () => {
      const passengers = [
        {
          displayName: 'Hank the Cow Dog',
          name: 'Hank',
          firstName: 'Hank',
          lastName: 'CowDog',
          hasExtraSeat: false,
          hasAnyEarlyBird: true
        }
      ];
      const confirmationPassengerGroup = createComponent({ passengers });

      expect(confirmationPassengerGroup).to.contain.text('EarlyBird');
      expect(confirmationPassengerGroup).to.not.contain.text('Extra Seat');
    });

    it('should display earlybird when passenger has earlybird and extra seat', () => {
      const passengers = [
        {
          displayName: 'Hank the Cow Dog',
          name: 'Hank',
          firstName: 'Hank',
          lastName: 'CowDog',
          hasExtraSeat: true,
          hasAnyEarlyBird: true
        }
      ];
      const confirmationPassengerGroup = createComponent({ passengers });

      expect(confirmationPassengerGroup).to.contain.text('EarlyBird');
      expect(confirmationPassengerGroup).to.contain.text('Extra Seat');
    });

    it('should display lapChildConfirmation when lap child is in booking', () => {
      const passengers = [
        {
          displayName: 'Hank the Cow Dog',
          name: 'Hank',
          firstName: 'Hank',
          lastName: 'CowDog',
          hasExtraSeat: true,
          hasAnyEarlyBird: true,
          lapInfant: {
            name: 'Adult One'
          }
        }
      ];
      const greyBoxMessage = {
        body: 'A birth certificate or other government-issued identification bearing the birth date of each Lap Child is required upon request. <a href="https://www.southwest.com/faq/age-verified" target="_blank">Learn More</a>',
        header: '',
        key: 'GREY_BOX_INFANT_ON_LAP_PURCHASE_CONFIRMATION'
      };
      const confirmationPassengerGroup = createComponent({ passengers, greyBoxMessage });

      expect(confirmationPassengerGroup).toMatchSnapshot();
    });
  });

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

  const createComponent = (props) =>
    mount(
      <Provider store={store}>
        <ConfirmationPassengerGroup {...props} />
      </Provider>
    );
});
