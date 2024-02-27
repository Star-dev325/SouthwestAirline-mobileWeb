import dayjs from 'dayjs';
import proxyquire from 'proxyquire';
import { sandbox } from 'sinon';
import BrowserObject from 'src/shared/helpers/browserObject';

const sinon = sandbox.create();
const { location } = BrowserObject;

describe('cookie', () => {
  let Cookie;
  let nameSpecialChars;
  let valueSpecialChars;
  let valueDecoded;

  beforeEach(() => {
    Cookie = proxyquire('src/shared/swa-persistence/cookie', {});
    nameSpecialChars = 'AMCV_65D316D751E563EC0A490D4C%40AdobeOrg';
    valueSpecialChars =
      '870038026%7CMCIDTS%7C18492%7CvVersion%7C5.0.0%7CMCMID%7C91726036868651717631033606518438893362%7CMCAAMLH-1598383620%7C9%7CMCAAMB-1598383620%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1597786020s%7CNONE%7CMCAID%7CNONE';
    valueDecoded =
      '870038026|MCIDTS|18492|vVersion|5.0.0|MCMID|91726036868651717631033606518438893362|MCAAMLH-1598383620|9|MCAAMB-1598383620|RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y|MCOPTOUT-1597786020s|NONE|MCAID|NONE';

    document.cookie = 'name1=value1;';
    document.cookie = 'name2=value2;';
    document.cookie = `${nameSpecialChars}=${valueSpecialChars};`;
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getValue', () => {
    it('should get cookie value when cookie name exists', () => {
      expect(Cookie.getValue('name1')).to.equal('value1');
      expect(Cookie.getValue('name2')).to.equal('value2');
    });

    it('should get cookie decoded value when cookie name exists', () => {
      expect(Cookie.getValue(nameSpecialChars)).to.equal(valueDecoded);
    });

    it('should get null when cookie name does not exists', () => {
      expect(Cookie.getValue('noSuchName')).to.be.null;
    });

    it('should get null when no cookies exist', () => {
      expect(Cookie.getValue('noSuchKey')).to.be.null;
    });
  });

  context('setValue', () => {
    it('should set cookie value', () => {
      Cookie.setValue('setName', 'setValue');
      expect(Cookie.getValue('setName')).to.equal('setValue');
    });

    it('should set cookie value with expiration', () => {
      const mockDocument = {
        cookie: ''
      };

      Cookie = proxyquire('src/shared/swa-persistence/cookie', {
        'src/shared/helpers/browserObject': {
          default: { document: mockDocument }
        }
      });

      Cookie.setValue('setName', 'setValue', 7);
      const expiration = mockDocument.cookie.split('expires=')[1];

      expect(dayjs().add(7, 'days').isSame(dayjs(expiration), 'day')).to.be.true;
    });
  });

  context('deleteCookie', () => {
    it('should delete cookie', () => {
      location.href = 'http://example.com/';
      Cookie.setValue('testCookie', 'testCookieValue');

      expect(Cookie.getValue('testCookie')).to.equal('testCookieValue');

      Cookie.deleteCookie('testCookie');

      expect(Cookie.getValue('testCookie')).to.equal(null);
    });
  });
});
