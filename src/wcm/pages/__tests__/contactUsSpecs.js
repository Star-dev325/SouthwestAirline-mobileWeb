import React from 'react';
import { sandbox } from 'sinon';
import _ from 'lodash';
import { shallow } from 'enzyme';
import { integrationMount } from 'test/unit/helpers/testUtils';
import mockContactUsWcmJson from 'mocks/wcm/wcm/content/generated/data/contact/contactUs';
import { ContactUs } from 'src/wcm/pages/contactUs';
import footer from 'mocks/templates/content-delivery/footer';

const sinon = sandbox.create();

describe('Contact Us page', () => {
  let contactUsPage;
  let retrieveContactUsFnStub;

  beforeEach(() => {
    retrieveContactUsFnStub = sinon.stub();
    contactUsPage = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should have the page title', () => {
    const pageHeader = contactUsPage.find('PageHeader');

    expect(pageHeader).to.contain.text('Contact Us');
  });

  describe('blocks', () => {
    let blocks;

    beforeEach(() => {
      blocks = contactUsPage.find('[data-qa="contact-us-block"]');
    });

    it('should have exactly as many as are in the WCM json file', () => {
      expect(blocks).to.have.lengthOf(2);
    });

    describe('first block', () => {
      let firstBlock;

      beforeEach(() => {
        firstBlock = blocks.first();
      });

      it('should have "additional phone numbers" title', () => {
        const blockTitle = firstBlock.find('[data-qa="block-title"]');

        expect(blockTitle).to.contain.text('Additional Phone Numbers');
      });
    });
  });

  // randomly choose some values and assert on those
  describe('first item', () => {
    let firstItem;

    beforeEach(() => {
      firstItem = contactUsPage.find('.contact-us-item').first();
    });

    it('should contain item description', () => {
      expect(firstItem).to.contain.text('Baggage - (Delayed/Damaged)');
    });

    it('should contain detail text', () => {
      expect(firstItem).to.contain.text('1-888-202-1024');
    });

    it('should contain call-to-action text', () => {
      expect(firstItem).to.contain.text('Call');
    });

    it('should contain call-to-action link', () => {
      const link = firstItem.find('a');

      expect(link).to.have.attr('href', 'tel:18882021024');
    });
  });

  it('should show PageFooterWcmSourced by default', () => {
    const footerLinkRows = footer.results.footer.content.placement.linkRows;
    const shouldShallow = true;
    const component = createComponent({ footerLinkRows }, shouldShallow);

    expect(component).toMatchSnapshot();
  });

  it('should not show PageFooterWcmSourced when in a webview', () => {
    const footerLinkRows = footer.results.footer.content.placement.linkRows;
    const shouldShallow = true;
    const component = createComponent({ footerLinkRows, isWebView: true }, shouldShallow);

    expect(component).toMatchSnapshot();
  });

  function createComponent(props = {}, shouldShallow = false) {
    const defaultProps = {
      webContent: mockContactUsWcmJson,
      retrieveContactUsFn: retrieveContactUsFnStub,
      footerLinkRows: []
    };

    const state = {
      router: {
        location: {
          search: ''
        }
      }
    };

    const finalProps = _.merge({}, defaultProps, props);

    return shouldShallow ? shallow(<ContactUs {...finalProps} />) : integrationMount()(state, ContactUs, finalProps);
  }
});
