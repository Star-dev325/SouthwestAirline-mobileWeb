import _ from 'lodash';
import { createSha256Hash } from 'src/shared/helpers/hashHelper';
import { getPurchase as purchaseSelector } from 'src/carBooking/analytics/purchaseSelector';

describe('', () => {
  let state;
  let email;

  beforeEach(() => {
    state = {};
    email = 'abc@yahoo.com';

    _.set(state, 'app.carBooking.userInfo.driverInfo.accountNumber', '601005646');
    _.set(state, 'app.carBooking.carBookingConfirmationPage.response.confirmationEmail', email);
    _.set(state, 'app.carBooking.carBookingConfirmationPage.response.confirmationNumber', 'J034F147227');
    _.set(state, 'app.carBooking.carBookingConfirmationPage.response.purposeOfTravel', null);
  });

  it('should generate purchase', () => {
    const results = purchaseSelector(state);

    expect(results).to.deep.equal({
      confirmationEmail: createSha256Hash(email),
      confirmationNumber: 'J034F147227',
      driver: {
        accountNumber: '601005646'
      },
      purposeOfTravel: ''
    });
  });

  it('should generate purchase with purposeOfTravel', () => {
    const purposeOfTravel = 'BOTH';

    _.set(state, 'app.carBooking.carBookingConfirmationPage.response.purposeOfTravel', purposeOfTravel);
    const results = purchaseSelector(state);

    expect(results).to.deep.equal({
      confirmationEmail: createSha256Hash(email),
      confirmationNumber: 'J034F147227',
      driver: {
        accountNumber: '601005646'
      },
      purposeOfTravel
    });
  });
});
