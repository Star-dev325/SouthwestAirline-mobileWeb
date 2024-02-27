import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import WcmStyledPageSection from 'src/wcm/components/wcmStyledPageSection';

describe('WCMStyledPageSection', () => {
  describe('when imagePlacement=', () => {
    ['below', 'inline', ''].forEach((imagePlacement) => {
      describe(`"${imagePlacement}"`, () => {
        let renderedPage;

        beforeEach(() => {
          const props = createProps({
            disclaimers: [{ disclaimerText: 'test disclaimer' }],
            heading: 'test heading text',
            imagePlacement,
            sectionText: 'test section text',
            sectionTitle: 'test section title'
          });

          renderedPage = createComponent(props);
        });

        it('should render section component', () => {
          const { container } = renderedPage;

          expect(container).toMatchSnapshot();
        });
      });
    });
  });

  describe(`when it contains an image with image placement of 'below'`, () => {
    let props;

    beforeEach(() => {
      props = createProps({
        disclaimers: [{ disclaimerText: 'test disclaimer' }],
        heading: 'test heading text',
        image: 'img_src',
        imagePlacement: 'below',
        sectionText: 'test section text'
      });
    });

    it('should render image below the section text', () => {
      const { container } = createComponent(props);

      const belowImg = container.querySelector('img[data-qa="wcm-image-below"]');

      expect(belowImg.getAttribute('src')).toBe('img_src');
    });
  });

  describe(`when it contains an image with image placement of 'inline'`, () => {
    let props;

    beforeEach(() => {
      props = createProps({
        altText: 'test alt text',
        disclaimers: [{ disclaimerText: 'test disclaimer' }],
        heading: 'test heading text',
        image: 'img_src',
        imagePlacement: 'inline',
        sectionText: 'test section text'
      });
    });

    it('should render image beside the section text', () => {
      const { container } = createComponent(props);

      const inlineImg = container.querySelector('img[data-qa="wcm-image-inline"]');

      expect(inlineImg.getAttribute('src')).toBe('img_src');
    });
  });

  describe('when it does not contain an image', () => {
    let props;

    beforeEach(() => {
      props = createProps({
        altText: '',
        heading: 'test heading text',
        image: '',
        imagePlacement: '',
        sectionText: 'test section text'
      });
    });

    it('should render contents, but not image', () => {
      const { container, getByText } = createComponent(props);

      expect(getByText('test section text')).toBeTruthy();
      expect(getByText('test heading text')).toBeTruthy();
      const img = container.querySelectorAll('img');

      expect(img.length).toBe(0);
      expect(container.querySelector('[data-qa="disclaimers"]')).toBeFalsy();
    });
  });

  describe('when a call to action is provided', () => {
    describe(`and it is of type 'button'`, () => {
      let props;
      let onCallToActionClickMock;

      beforeEach(() => {
        onCallToActionClickMock = jest.fn();
        props = createProps({
          callToAction: {
            ctaText: 'Enroll Now',
            ctaType: 'button',
            linkType: 'app',
            target: 'rrenroll'
          },
          onCallToActionClick: onCallToActionClickMock
        });
      });

      it('should render a button', () => {
        const { container } = createComponent(props);

        const button = container.querySelector('button');

        expect(button.textContent).toBe('Enroll Now');
      });

      it('should trigger onCallToActionClick callback with correct values', () => {
        const { container } = createComponent(props);
        const button = container.querySelector('button');

        fireEvent.click(button);
        expect(onCallToActionClickMock).toHaveBeenCalledWith({ link_type: 'app', target: 'rrenroll' });
      });
    });

    describe(`and it is of type 'text'`, () => {
      let props;
      let onCallToActionClickMock;

      beforeEach(() => {
        onCallToActionClickMock = jest.fn();
        props = createProps({
          callToAction: {
            ctaText: 'If you click me good things happen',
            ctaType: 'text',
            linkType: 'app',
            target: 'rrenroll'
          },
          onCallToActionClick: onCallToActionClickMock
        });
      });

      it('should render as a NavItem', () => {
        const { container } = createComponent(props);

        expect(container.querySelector('[data-qa="nav-item"]')).toBeTruthy();

        const navItem = container.querySelector('[data-qa="nav-item"]');

        expect(navItem.textContent).toBe('If you click me good things happen');
      });

      it('when clicked it should trigger onCallToActionClick callback', () => {
        const { container } = createComponent(props);
        const navItem = container.querySelector('[data-qa="nav-item"]');

        fireEvent.click(navItem);

        expect(onCallToActionClickMock).toHaveBeenCalledWith({ link_type: 'app', target: 'rrenroll' });
      });
    });
  });

  describe('when mediaType=youtube', () => {
    let props;

    beforeEach(() => {
      props = createProps({
        image: 'src/to/an/image.png',
        imagePlacement: 'below',
        mediaType: 'youtube',
        targetVideo: 'some_target'
      });
    });

    it('should render youtube target video in iframe', () => {
      const { container } = createComponent(props);
      const youtubeVideo = container.querySelector('iframe');

      expect(youtubeVideo.getAttribute('src')).toBe('https://www.youtube.com/embed/some_target');
    });
  });

  describe('when mediaType is not youtube', () => {
    let props;

    beforeEach(() => {
      props = createProps({
        image: 'src/to/an/image.png',
        imagePlacement: 'below',
        mediaType: 'image'
      });
    });

    it('should not render an iframe', () => {
      const { container } = createComponent(props);

      expect(container.querySelector('iframe')).toBeFalsy();
    });
  });

  const createProps = (overrides) => {
    const defaultProps = {
      altText: '',
      callToAction: {
        ctaText: '',
        ctaType: 'none',
        linkType: 'none',
        target: ''
      },
      heading: '',
      image: '',
      imagePlacement: '',
      onCallToActionClick: () => {},
      sectionText: '',
      sectionTitle: ''
    };
  
    return {
      ...defaultProps,
      ...overrides
    };
  };
  
  const createComponent = (props) => render(<WcmStyledPageSection {...props} />);
});
