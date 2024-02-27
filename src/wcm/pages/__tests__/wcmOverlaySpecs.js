import { sandbox } from 'sinon';
import Q from 'q';
import { integrationMount } from 'test/unit/helpers/testUtils';
import wcmOverlay from 'src/wcm/pages/wcmOverlay';
import { retrieveHazardousMaterials } from 'src/wcm/actions/wcmActions';
import * as WcmApi from 'src/shared/api/wcmApi';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sandbox.create();

describe('wcmOverlay', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should render correct content for overlay when passing action', (done) => {
    const overlay = {
      title: 'fake title',
      body: ['fake body']
    };

    sinon.stub(WcmApi, 'getJsonFile').returns(Q({ overlay }));
    const wrapper = createComponent();

    waitFor.untilAssertPass(() => {
      wrapper.update();
      expect(wrapper.find('PageHeaderWithButtons')).to.have.props({ title: overlay.title, titleInCenter: true });
      expect(wrapper.find('Overlay')).to.to.have.props({ body: overlay.body });
    }, done);
  });

  function createComponent() {
    return integrationMount()(undefined, wcmOverlay(retrieveHazardousMaterials, 'hazardousMaterials'));
  }
});
