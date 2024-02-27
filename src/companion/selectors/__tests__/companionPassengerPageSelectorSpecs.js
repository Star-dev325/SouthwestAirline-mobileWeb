import _ from 'lodash';
import CompanionInformationPageBuilder from 'test/builders/apiResponse/v1/mobile-misc/page/companion/companionInformationPageBuilder';
import { getCompanionInfo } from 'src/companion/selectors/companionPassengerPageSelectors';

describe('Companion Passenger PageSelector', () => {
  it('should convert companion info from CHAPI companion information page API, which will contain name, gender, dateOfBirth and suffix', () => {
    const state = {};

    _.set(
      state,
      'app.companion.companionPassengerPage.response',
      new CompanionInformationPageBuilder().withSuffix('CEO').build()
    );

    const result = getCompanionInfo(state);

    expect(result).to.deep.equal({
      dateOfBirth: '1995-02-05',
      gender: 'F',
      name: 'Companion Fang',
      suffix: 'CEO'
    });
  });
});
