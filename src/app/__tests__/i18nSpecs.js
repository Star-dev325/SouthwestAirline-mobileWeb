import { i18nSources } from 'src/app/i18n/global';
import _ from 'lodash';
import i18n from '@swa-ui/locale';

describe('i18n', () => {
  it('should lookup keys', () => {
    expect(i18n('SHARED__HEADER_BUTTON__LOGIN_LONG')).to.equal('Log in / Enroll');
  });

  it('should report duplicate keys with differing values', () => {
    let workingI18n = {};

    i18nSources.forEach((source, position) => {
      const overlap = _.intersection(Object.keys(workingI18n), Object.keys(source));
      const matcher = (value, key) => overlap.includes(key);

      if (overlap.length > 0) {
        expect(_.pickBy(source, matcher), `at i18n sources array: ${position + 1}`).to.deep.equal(
          _.pickBy(workingI18n, matcher)
        );
      }

      workingI18n = {
        ...workingI18n,
        ...source
      };
    });
  });
});
