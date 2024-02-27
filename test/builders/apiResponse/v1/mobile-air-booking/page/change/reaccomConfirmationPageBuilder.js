import _ from 'lodash';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';

export default class ReaccomConfirmationPageBuilder {
  constructor() {
    this.response = {
      reaccomConfirmation: {
        headerMessage: {
          key: 'REACCOM_CONFIRMATION',
          header: 'Your trip is booked!',
          body: 'Check in up to 24 hours in advance. The earlier you check in, the better your seat selection.',
          icon: 'POSITIVE',
          textColor: 'DEFAULT',
          backgroundColor: 'DEFAULT'
        },
        messages: null,
        dates: {
          first: '2019-10-13',
          second: null
        },
        destinationDescription: 'Austin',
        passengers: [
          {
            displayName: 'Ben Lacy',
            accountNumber: '123456789',
            specialAssistanceMessage: null
          }
        ],
        recordLocator: 'ABC123',
        bounds: [new BoundDetailBuilder().withPassengerCountStringInsteadOfArray().build()]
      }
    };
  }

  withTicketingFailureMessage() {
    _.set(this.response, 'reaccomConfirmation.messages', [{
      key: 'ERROR__REACCOM_TICKETING_FAILURE',
      header: '',
      body: 'We are unable to complete the ticketing for this reservation. Please see a Southwest Customer Service Agent or <a href="https://www.southwest.com/contact-us/contact-us.html?clk=GFOOTER-CUSTOMER-CONTACT-US" target="_blank">Contact Us</a>.',
      icon: 'WARNING',
      textColor: 'DEFAULT',
      note: null
    }]);

    return this;
  }

  withCheckinFailureMessage() {
    _.set(this.response, 'reaccomConfirmation.messages', [{
      key: 'ERROR__REACCOM_CHECK_IN_FAILURE',
      header: '',
      body: 'We are unable to check you in for your flight at this time. For further assistance, please see a Southwest Customer Service Agent or <a href="https://www.southwest.com/contact-us/contact-us.html?clk=GFOOTER-CUSTOMER-CONTACT-US" target="_blank">Contact Us</a>.',
      icon: 'WARNING',
      textColor: 'DEFAULT',
      note: null
    }]);

    return this;
  }

  build() {
    return this.response;
  }
}
