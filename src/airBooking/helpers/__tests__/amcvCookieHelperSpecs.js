import { sandbox } from 'sinon';
import { addMvcidToChaseUrl, appendParamsIfChaseUrl, getMcvid } from 'src/airBooking/helpers/amcvCookieHelper';
import * as Cookie from 'src/shared/swa-persistence/cookie';
import * as PathUtils from 'src/shared/helpers/pathUtils';

const sinon = sandbox.create();

describe('AmcvCookieHelper', () => {
  const isChaseCombo = true;
  const expectedMcvid = '91726036868651717631033606518438893362';
  const pageId = 'mobile-index-home';

  afterEach(() => {
    sinon.restore();
  });

  context('getMcvid', () => {
    it('should return mcid value when cookie contains the mcid key', () => {
      sinon.stub(Cookie, 'getValue').returns(`18492|vVersion|5.0.0|MCMID|${expectedMcvid}|MAAA|1`);
      expect(getMcvid()).to.equal(expectedMcvid);
    });

    it('should return empty string mcid value when cookie does not contain the mcid key', () => {
      sinon.stub(Cookie, 'getMcvid').returns('invalid-keys');
      expect(getMcvid()).to.equal('');
    });

    it('should return empty string mcid value when cookie contains the mcid key without pipe separator', () => {
      sinon.stub(Cookie, 'getValue').returns(`MCMID${expectedMcvid}`);
      expect(getMcvid()).to.equal('');
    });

    it('should return empty string mcid value when cookie contains the mcid key without pipe separator', () => {
      sinon.stub(Cookie, 'getValue').returns(undefined);
      expect(getMcvid()).to.equal('');
    });
  });

  context('addMvcidToChaseUrl', () => {
    context('without mcvid cookie', () => {
      it('should should not add mcvid to url when mcvid is empty and isChase true', () => {
        const url = 'https://chase.com?ref=mweb';

        expect(addMvcidToChaseUrl(url, true)).to.equal(url);
      });
    });

    context('with mcvid cookie', () => {
      beforeEach(() => {
        sinon.stub(Cookie, 'getValue').returns(`MCMID|${expectedMcvid}`);
      });

      it('should add mcvid to url when isChase is false and url contains chase keyword', () => {
        const url = 'https://creditcards.chase.com?ref=mweb';
        const expectedUrl = `${url}&mcvid=${expectedMcvid}`;

        expect(addMvcidToChaseUrl(url, false)).to.equal(expectedUrl);
      });

      it('should not add mcvid to url when isChase is false and url does not contain chase keyword', () => {
        const url = 'https://chase.com?ref=mweb';

        expect(addMvcidToChaseUrl(url, false)).to.equal(url);
      });

      it('should should not add mcvid to url when url is empty and isChase true', () => {
        const url = '';

        expect(addMvcidToChaseUrl(url, true)).to.equal(url);
      });

      it('should add mcvid to url when isChase true', () => {
        const url = 'https://chase.com?ref=mweb';
        const expectedUrl = `${url}&mcvid=${expectedMcvid}`;

        expect(addMvcidToChaseUrl(url, true)).to.equal(expectedUrl);
      });
    });
  });

  context('appendParamsIfChaseUrl', () => {
    let getValueStub;
    let buildPathWithQueryStub;

    beforeEach(() => {
      getValueStub = sinon.stub(Cookie, 'getValue');
      buildPathWithQueryStub = sinon.stub(PathUtils, 'buildPathWithQuery');
    });

    context('when chase url', () => {
      const target = 'creditcard.com';

      it('should handle valid mcvid', () => {
        getValueStub.returns(`MCMID|${expectedMcvid}`);

        appendParamsIfChaseUrl(target);

        expect(getValueStub).to.have.been.called;
        expect(buildPathWithQueryStub).to.have.been.calledWith(target, { mcvid: expectedMcvid });
      });

      it('should handle valid mcvid and pageId', () => {
        getValueStub.returns(`MCMID|${expectedMcvid}`);

        appendParamsIfChaseUrl(target, { isChaseCombo, pageId });

        expect(buildPathWithQueryStub).to.have.been.calledWith(target, {
          mcvid: expectedMcvid,
          pageId: 'mobile-index-home'
        });
      });

      it('should handle empty mcvid', () => {
        getValueStub.returns('');

        appendParamsIfChaseUrl(target);

        expect(getValueStub).to.have.been.called;
        expect(buildPathWithQueryStub).to.have.been.calledWith(target, {});
      });
    });

    context('when not chase url', () => {
      const target = 'other-url.com';

      context('when chase combo app', () => {
        it('should consider mcvid', () => {
          getValueStub.returns(`MCMID|${expectedMcvid}`);

          appendParamsIfChaseUrl(target, { isChaseCombo });

          expect(getValueStub).to.have.been.called;
          expect(buildPathWithQueryStub).to.have.been.calledWith(target, { mcvid: expectedMcvid });
        });
      });

      context('when not chase combo app', () => {
        it('should not consider mcvid', () => {
          appendParamsIfChaseUrl(target);

          expect(getValueStub).to.not.have.been.called;
          expect(buildPathWithQueryStub).to.have.been.calledWith(target, {});
        });
      });
    });
  });
});
