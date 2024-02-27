import _ from 'lodash';
import Q from 'q';
import { sandbox } from 'sinon';
import { integrationMount } from 'test/unit/helpers/testUtils';
import * as styledPages from 'src/wcm/pages/styledPages';
import * as WcmApi from 'src/shared/api/wcmApi';
import waitFor from 'test/unit/helpers/waitFor';

const sinon = sandbox.create();

describe('Styled Pages', () => {
  const styledPage = {
    title: 'fake title',
    body: ['fake body'],
    heroContainer: {
      type: 'hero',
      altText: '',
      image: 'fake image'
    }
  };

  beforeEach(() => {
    sinon.stub(WcmApi, 'getJsonFile').returns(Q({ styledPage }));
  });

  afterEach(() => {
    sinon.restore();
  });

  _.forIn(styledPages, (page, pageName) => {
    it(`should render ${pageName}`, (done) => {
      const wrapper = integrationMount()(undefined, page);

      waitFor.untilAssertPass(() => {
        wrapper.update();
        expect(wrapper.find(pageName)).to.have.prop('styledPage').to.deep.equal(styledPage);
      }, done);
    });
  });
});
