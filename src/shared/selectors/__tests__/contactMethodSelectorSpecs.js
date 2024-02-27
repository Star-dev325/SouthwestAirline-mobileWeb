import sinonModule from 'sinon';
import { getContactMethodContent } from 'src/shared/selectors/contactMethodSelectors';
import * as ContactMethodHelper from 'src/shared/helpers/contactMethodHelper';

const sinon = sinonModule.sandbox.create();

describe('Contact Method Selector', () => {
  beforeEach(() => {
    sinon.stub(ContactMethodHelper, 'generateContactNavigatorLabel').returns('Converted Contact Method Info');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should get contact method content', () => {
    const contactMethodInfo = { contactMethod: 'MAIL', email: 'test@test.com', phoneNumber: '', phoneCountryCode: '' };

    const result = getContactMethodContent(sinon.stub()).resultFunc(contactMethodInfo);

    expect(ContactMethodHelper.generateContactNavigatorLabel).have.been.calledWith(contactMethodInfo);
    expect(result).to.be.equal('Converted Contact Method Info');
  });
});
