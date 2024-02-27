import { sandbox } from 'sinon';
import store2 from 'store2';
import { verifyFromPaypal } from 'src/shared/helpers/paypalHelper';

const sinon = sandbox.create();

describe('paypalHelper', () => {
  let sessionHasStub;

  beforeEach(() => {
    sessionHasStub = sinon.stub(store2.session, 'has');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return false when is paypal page and paypal data not exist', () => {
    sessionHasStub.returns(false);
    expect(verifyFromPaypal('/air/booking/review/paypal')).to.equal(false);
  });

  it('should return false when is not paypal page and paypal data exists', () => {
    sessionHasStub.returns(true);
    expect(verifyFromPaypal('/air/booking/shopping')).to.equal(false);
  });

  it('should return true when is  paypal page and paypal data exists', () => {
    sessionHasStub.returns(true);
    expect(verifyFromPaypal('/air/booking/review/paypal')).to.equal(true);
  });

  it('should return true when upgraded boarding have paypal as context path', () => {
    sessionHasStub.returns(true);
    expect(verifyFromPaypal('/upgraded-boarding/purchase/paypal')).to.equal(true);
  });

  it('should return true when upgraded boarding have paypal as context path', () => {
    sessionHasStub.returns(true);
    expect(verifyFromPaypal('/upgraded-boarding/purchase/')).to.equal(false);
  });
});
