import _ from 'lodash';
import sinonModule from 'sinon';
import { getCompanionContactMethodContent } from 'src/companion/selectors/companionContactMethodSelectors';
import * as ContactMethodHelper from 'src/shared/helpers/contactMethodHelper';

const sinon = sinonModule.sandbox.create();

describe('companionContactMethodSelectors', () => {
  beforeEach(() => {
    sinon.stub(ContactMethodHelper, 'generateContactNavigatorLabel').returns('Converted Contact Method Info');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should generate contact method content from contact method info for companion', () => {
    const state = {};
    const contactMethodInfo = { contactMethod: 'MAIL', email: 'test@test.com', phoneNumber: '', phoneCountryCode: '' };

    _.set(state, 'app.companion.contactMethodInfo', contactMethodInfo);

    const result = getCompanionContactMethodContent(state);

    expect(ContactMethodHelper.generateContactNavigatorLabel).have.been.calledWith(contactMethodInfo);
    expect(result).to.be.equal('Converted Contact Method Info');
  });
});
