import React from 'react';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

describe('WCMStyledPageSection', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('when imagePlacement=', () => {
    ['below', 'inline', ''].forEach((imagePlacement) => {
      context(`"${imagePlacement}"`, () => {
        let renderedPage;

        beforeEach(() => {
          const props = createProps({
            imagePlacement,
            sectionTitle: 'test section title',
            sectionText: 'test section text',
            heading: 'test heading text',
            disclaimers: [{ disclaimerText: 'test disclaimer' }]
          });

          renderedPage = createComponent(props);
        });

        it('should render section text', () => {
          expect(renderedPage).to.contain.text('test section text');
        });

        it('should render heading', () => {
          expect(renderedPage).to.contain.text('test heading text');
        });

        it('should render section title', () => {
          expect(renderedPage).to.contain.text('test section title');
        });

        it('should render disclaimers', () => {
          expect(renderedPage).to.contain.text('test disclaimer');
        });
      });
    });
  });

  context(`when it contains an image with image placement of 'below'`, () => {
    const props = createProps({
      sectionText: 'test section text',
      heading: 'test heading text',
      image: 'img_src',
      imagePlacement: 'below',
      disclaimers: [{ disclaimerText: 'test disclaimer' }]
    });
    let renderedPage;

    beforeEach(() => {
      renderedPage = createComponent(props);
    });

    it('should render image below the section text', () => {
      const belowImg = renderedPage.find('img[data-qa="wcm-image-below"]');

      expect(belowImg).to.be.present();
      expect(belowImg).to.have.attr('src', 'img_src');
    });
  });

  context(`when it contains an image with image placement of 'inline'`, () => {
    const props = createProps({
      sectionText: 'test section text',
      heading: 'test heading text',
      image: 'img_src',
      altText: 'test alt text',
      imagePlacement: 'inline',
      disclaimers: [{ disclaimerText: 'test disclaimer' }]
    });
    let renderedPage;

    beforeEach(() => {
      renderedPage = createComponent(props);
    });

    it('should render image beside the section text', () => {
      const inlineImg = renderedPage.find('img[data-qa="wcm-image-inline"]');

      expect(inlineImg).to.be.present();
      expect(inlineImg).to.have.attr('src', 'img_src');
    });
  });

  context('when it doesnt contain an image', () => {
    const props = createProps({
      sectionText: 'test section text',
      heading: 'test heading text',
      image: '',
      altText: '',
      imagePlacement: ''
    });
    let renderedPage;

    beforeEach(() => {
      renderedPage = createComponent(props);
    });

    it('should render contents, but not image', () => {
      expect(renderedPage).to.contain.text('test section text');
      expect(renderedPage).to.contain.text('test heading text');
      const img = renderedPage.find('img');

      expect(img).to.have.lengthOf(0);
      expect(renderedPage.find('[data-qa="disclaimers"]')).to.not.exist;
    });
  });

  context('when a call to action is provided', () => {
    context(`and it is of type 'button'`, () => {
      let props;
      let onCallToActionClickStub;
      let renderedPage;

      beforeEach(() => {
        onCallToActionClickStub = sinon.stub();
        props = createProps({
          callToAction: {
            ctaType: 'button',
            ctaText: 'Enroll Now',
            linkType: 'app',
            target: 'rrenroll'
          },
          onCallToActionClick: onCallToActionClickStub
        });
      });

      it('should render a button', () => {
        renderedPage = createComponent(props);
        const button = renderedPage.find('button');

        expect(button).to.have.text('Enroll Now');
      });

      it('should trigger onCallToActionClick callback with correct values', () => {
        renderedPage = createComponent(props);
        const button = renderedPage.find('button');

        click(button);
        expect(onCallToActionClickStub).have.been.calledWith({ link_type: 'app', target: 'rrenroll' });
      });
    });

    context(`and it is of type 'text'`, () => {
      let renderedPage;
      let props;
      let onCallToActionClickStub;

      beforeEach(() => {
        onCallToActionClickStub = sinon.stub();
        props = createProps({
          callToAction: {
            ctaType: 'text',
            ctaText: 'If you click me good things happen',
            linkType: 'app',
            target: 'rrenroll'
          },
          onCallToActionClick: onCallToActionClickStub
        });
      });

      it('should render as a NavItem', () => {
        renderedPage = createComponent(props);

        expect(renderedPage.find('[data-qa="nav-item"]')).to.be.present();

        const navItem = renderedPage.find('[data-qa="nav-item"]');

        expect(navItem).to.contain.text('If you click me good things happen');
      });

      it('when clicked it should trigger onCallToActionClick callback', () => {
        renderedPage = createComponent(props);
        const navItem = renderedPage.find('[data-qa="nav-item"]');

        click(navItem);

        expect(onCallToActionClickStub).have.been.calledWith({ link_type: 'app', target: 'rrenroll' });
      });
    });
  });

  context('when mediaType=youtube', () => {
    const props = createProps({
      mediaType: 'youtube',
      targetVideo: 'some_target',
      image: 'src/to/an/image.png',
      imagePlacement: 'below'
    });

    it('should render youtube target video in iframe', () => {
      const renderedPage = createComponent(props);
      const youtubeVideo = renderedPage.find('iframe');

      expect(youtubeVideo).to.have.attr('src', 'https://www.youtube.com/embed/some_target');
    });
  });

  context('when mediaType is not youtube', () => {
    const props = createProps({
      mediaType: 'image',
      image: 'src/to/an/image.png',
      imagePlacement: 'below'
    });

    it('should not render an iframe', () => {
      const renderedPage = createComponent(props);

      expect(renderedPage.find('iframe')).to.not.exist;
    });
  });
});

function createProps(overrides) {
  const defaultProps = {
    sectionText: '',
    sectionTitle: '',
    heading: '',
    image: '',
    altText: '',
    imagePlacement: '',
    callToAction: {
      ctaType: 'none',
      ctaText: '',
      linkType: 'none',
      target: ''
    },
    onCallToActionClick: () => {}
  };

  return {
    ...defaultProps,
    ...overrides
  };
}

function createComponent(props) {
  const WcmStyledPageSection = require('src/wcm/components/wcmStyledPageSection').default;

  return mount(<WcmStyledPageSection {...props} />);
}
