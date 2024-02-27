import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';

const { APP, WEB_VIEW, BROWSER } = WcmLinkTypes;

const sinon = sandbox.create();

describe('WCMTransitionHelper', () => {
  const defaultHref = 'default-location';
  let openStub;
  let pushStub;
  let wcmTransitionTo;
  let windowObject;
  let appendParamsIfChaseUrlStub;
  let buildPathWithParamAndQueryStub;

  beforeEach(() => {
    openStub = sinon.stub();
    pushStub = sinon.stub();
    appendParamsIfChaseUrlStub = sinon.stub();
    buildPathWithParamAndQueryStub = sinon.stub();
    windowObject = { open: openStub, location: { href: defaultHref } };

    wcmTransitionTo = proxyquire('src/shared/helpers/wcmTransitionHelper', {
      'src/shared/helpers/browserObject': { default: { window: windowObject } },
      'src/appHistory': { history: { push: pushStub } },
      'src/shared/helpers/pathUtils': { buildPathWithParamAndQuery: buildPathWithParamAndQueryStub },
      'src/airBooking/helpers/amcvCookieHelper': { appendParamsIfChaseUrl: appendParamsIfChaseUrlStub }
    }).default;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should do nothing when transitionData is undefined', () => {
    wcmTransitionTo(undefined);

    expect(windowObject.location.href).to.equal(defaultHref);
    expect(openStub).to.not.have.been.called;
    expect(pushStub).to.not.have.been.called;
    expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
    expect(appendParamsIfChaseUrlStub).to.not.have.been.called;
  });

  it('should do nothing when target does not exist', () => {
    wcmTransitionTo({ link_type: WEB_VIEW, target: '' });

    expect(windowObject.location.href).to.equal(defaultHref);
    expect(openStub).to.not.have.been.called;
    expect(pushStub).to.not.have.been.called;
    expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
    expect(appendParamsIfChaseUrlStub).to.not.have.been.called;
  });

  it('should do nothing when link_type is invalid', () => {
    wcmTransitionTo({ link_type: 'invalid', target: 'airbooking' });

    expect(windowObject.location.href).to.equal(defaultHref);
    expect(openStub).to.not.have.been.called;
    expect(pushStub).to.not.have.been.called;
    expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
    expect(appendParamsIfChaseUrlStub).to.not.have.been.called;
  });

  it('should do nothing when linkType is invalid', () => {
    wcmTransitionTo({ linkType: 'invalid', target: 'airbooking' });

    expect(windowObject.location.href).to.equal(defaultHref);
    expect(openStub).to.not.have.been.called;
    expect(pushStub).to.not.have.been.called;
    expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
    expect(appendParamsIfChaseUrlStub).to.not.have.been.called;
  });

  context(`with link type of ${APP}`, () => {
    it('should handle simple route', () => {
      wcmTransitionTo({ link_type: APP, target: 'aircheckin' });

      expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
      expect(pushStub).to.have.been.calledWith('/check-in');
    });

    it('should handle complex object route', () => {
      const newRoute = 'new-route';

      buildPathWithParamAndQueryStub.returns(newRoute);

      wcmTransitionTo({ link_type: APP, target: 'carlookup' });

      expect(buildPathWithParamAndQueryStub).to.have.been.calledWith(
        '/view-reservation',
        {},
        { cleanFlow: true, clearFormData: false, tab: 'CAR' }
      );
      expect(pushStub).to.have.been.calledWith(newRoute);

      expect(windowObject.location.href).to.equal(defaultHref);
      expect(openStub).to.not.have.been.called;
      expect(appendParamsIfChaseUrlStub).to.not.have.been.called;
    });

    it('should handle relative urls', () => {
      const airBookingPath = '/air/booking/shopping';

      wcmTransitionTo({ link_type: APP, target: airBookingPath });

      expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
      expect(pushStub).to.have.been.calledWith(airBookingPath);
    });
  });

  context(`with link type of ${WEB_VIEW}`, () => {
    it('should handle target', () => {
      const newHref = 'new-href';

      appendParamsIfChaseUrlStub.returnsArg(0);

      wcmTransitionTo({ link_type: WEB_VIEW, target: newHref });

      expect(appendParamsIfChaseUrlStub).to.have.been.calledWith(newHref);
      expect(windowObject.location.href).to.equal(newHref);
      expect(openStub).to.not.have.been.called;
      expect(pushStub).to.not.have.been.called;
      expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
    });

    it('should handle target and append mcvid', () => {
      const newHref = 'new-href';
      const newHrefWithMcvid = 'new-href-mcvid';

      appendParamsIfChaseUrlStub.returns(newHrefWithMcvid);

      wcmTransitionTo({ link_type: WEB_VIEW, target: newHref });

      expect(appendParamsIfChaseUrlStub).to.have.been.calledWith(newHref);
      expect(windowObject.location.href).to.equal(newHrefWithMcvid);
      expect(openStub).to.not.have.been.called;
      expect(pushStub).to.not.have.been.called;
      expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
    });
  });

  context(`with link type of ${BROWSER}`, () => {
    it('should handle target', () => {
      const target = 'target';

      appendParamsIfChaseUrlStub.returnsArg(0);

      wcmTransitionTo({ link_type: BROWSER, target });

      expect(appendParamsIfChaseUrlStub).to.have.been.calledWith(target);
      expect(openStub).to.have.been.calledWith(target, '_blank');
      expect(pushStub).to.not.have.been.called;
      expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
      expect(windowObject.location.href).to.equal(defaultHref);
    });

    it('should handle target and append mcvid', () => {
      const target = 'target';
      const targetWithMcvid = 'target-mcvid';
      const useWebViewLinkType = false;

      appendParamsIfChaseUrlStub.returns(targetWithMcvid);

      wcmTransitionTo({ link_type: BROWSER, target, useWebViewLinkType });

      expect(appendParamsIfChaseUrlStub).to.have.been.calledWith(target);
      expect(openStub).to.have.been.calledWith(targetWithMcvid, '_blank');
      expect(pushStub).to.not.have.been.called;
      expect(buildPathWithParamAndQueryStub).to.not.have.been.called;
      expect(windowObject.location.href).to.equal(defaultHref);
    });

    it('should handle useWebViewLinkType', () => {
      const target = 'target';
      const useWebViewLinkType = true;

      appendParamsIfChaseUrlStub.returnsArg(0);

      wcmTransitionTo({ link_type: BROWSER, target, useWebViewLinkType });

      expect(windowObject.location.href).to.equal(target);
    });
  });
});
