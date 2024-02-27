import * as router from 'connected-react-router';
import footer from 'mocks/templates/content-delivery/footer';
import aboutRRMockStyledWcmResponse from 'mocks/wcm/wcm/content/generated/data/information/aboutRR';
import flyingSouthwestMockStyledWcmResponse from 'mocks/wcm/wcm/content/generated/data/information/travelExperience';
import Q from 'q';
import { sandbox } from 'sinon';
import * as WcmApi from 'src/shared/api/wcmApi';
import * as WcmTransitionHelper from 'src/shared/helpers/wcmTransitionHelper';
import { retrieveInTheAir } from 'src/wcm/actions/wcmActions';
import wcmStyledPage from 'src/wcm/pages/wcmStyledPage';
import FakeClock from 'test/unit/helpers/fakeClock';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testUtils';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sandbox.create();
const TODAY = '2022-12-31';

describe('WCMStyledPage', () => {
  let styledPage;
  let pushStub;
  let footerLinkRows;
  let wcmTransitionToStub;

  beforeEach(() => {
    FakeClock.setTimeTo(TODAY);
    footerLinkRows = footer.results.footer.content.placement.linkRows;
    wcmTransitionToStub = sinon.stub(WcmTransitionHelper, 'default');
  });

  afterEach(() => {
    pushStub = sinon.stub(router, 'push');
    FakeClock.restore();
    sinon.restore();
  });

  context('content', () => {
    it('should render contents', (done) => {
      sinon.stub(WcmApi, 'getJsonFile').returns(Q(aboutRRMockStyledWcmResponse));

      styledPage = createComponent();
      waitFor.untilAssertPass(() => {
        expect(styledPage).to.contain.text('Rapid Rewards makes it fast and easy to earn reward flights and more!');
      }, done);
    });

    it('should not display the title', (done) => {
      sinon.stub(WcmApi, 'getJsonFile').returns(Q(flyingSouthwestMockStyledWcmResponse));

      styledPage = createComponent();
      waitFor.untilAssertPass(() => {
        styledPage.update();
        expect(styledPage).to.not.contain.text('Travel Experience');

        const images = styledPage.find('.heroContainer');

        expect(images).to.have.lengthOf(1);
      }, done);
    });
  });

  context('click', () => {
    it('should transition when click', (done) => {
      sinon.stub(WcmApi, 'getJsonFile').returns(Q({ ...flyingSouthwestMockStyledWcmResponse }));

      styledPage = createComponent();

      waitFor.untilAssertPass(() => {
        styledPage.update();
        styledPage.find('WcmStyledPageMenu').at(0).simulate('click');

        waitFor.untilAssertPass(() => {
          expect(wcmTransitionToStub).to.have.been.called;
        });
      }, done);
    });
  });

  it('should render PageFooterWcmSourced by default', () => {
    sinon.stub(WcmApi, 'getJsonFile').returns(Q.resolve({}));
    const isWebView = false;
    const component = createComponent(footerLinkRows, isWebView);

    expect(component).toMatchSnapshot();
  });

  it('should not render PageFooterWcmSourced when in a webview', () => {
    sinon.stub(WcmApi, 'getJsonFile').returns(Q.resolve({}));
    const isWebView = true;
    const component = createComponent(footerLinkRows, isWebView);

    expect(component).toMatchSnapshot();
  });

  const createComponent = (footerLinkRows = [], isWebView = false) => {
    const page = wcmStyledPage(retrieveInTheAir, 'inTheAir');

    return mountWithMemoryRouterAndState(page, { keyLength: 0 }, '/', { push: pushStub, footerLinkRows, isWebView });
  };
});
