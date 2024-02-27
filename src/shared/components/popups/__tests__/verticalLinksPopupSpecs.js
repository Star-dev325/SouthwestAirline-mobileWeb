import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import _ from 'lodash';
import sinonModule from 'sinon';
import VerticalLinksPopup from 'src/shared/components/popups/verticalLinksPopup';
import createMockStore from 'test/unit/helpers/createMockStore';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

import { PRIMARY, DESTRUCTIVE } from 'src/shared/constants/buttonPopupStyleTypes';

const sinon = sinonModule.sandbox.create();
const mockStore = createMockStore();

describe('VerticalLinksPopup', () => {
  let onCloseStub;
  let store;

  beforeEach(() => {
    onCloseStub = sinon.stub();
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when close button is clicked', () => {
    it('should call onClose handler', () => {
      const verticalLinksPopup = createComponent({ onClose: onCloseStub, active: true });
      const closeButton = verticalLinksPopup.find('button');

      click(closeButton);
      expect(onCloseStub).to.have.been.called;
    });
  });

  it('should have the close button', () => {
    const verticalLinksPopup = createComponent({ active: true });

    expect(verticalLinksPopup.find('[data-qa="close"]')).to.be.present();
  });

  context('when hideCloseButton is `true`', () => {
    it('should hide the close button', () => {
      const verticalLinksPopup = createComponent({
        hideCloseButton: true,
        active: true
      });

      expect(verticalLinksPopup.find('[data-qa="close"]')).to.not.present();
    });
  });

  it('should have the "block-buttons" class', () => {
    const verticalLinksPopup = createComponent({ active: true });

    expect(verticalLinksPopup.find('.popup-buttons')).to.have.className('block-buttons');
  });

  context('when close button styles', () => {
    const defaultProps = {
      links: [{ label: 'just link', href: 'http://www.first-link.com' }],
      closeLabel: 'close button',
      onClose: _.noop,
      active: true
    };
    let closeButton, verticalLinksPopup;

    it('should render default style when closeLabelStyle is undefined', () => {
      verticalLinksPopup = createComponent(defaultProps);
      closeButton = verticalLinksPopup.find('button.button');

      expect(closeButton).to.have.className('button-popup_default');
    });

    it('should render primary style when closeLabelStyle is primary', () => {
      verticalLinksPopup = createComponent({
        ...defaultProps,
        closeLabelStyle: PRIMARY
      });
      closeButton = verticalLinksPopup.find('button.button');

      expect(closeButton).to.have.className('button-popup_primary');
    });

    it('should render destructive style when closeLabelStyle is destructive', () => {
      verticalLinksPopup = createComponent({
        ...defaultProps,
        closeLabelStyle: DESTRUCTIVE
      });
      closeButton = verticalLinksPopup.find('button.button');

      expect(closeButton).to.have.className('button-popup_destructive');
    });
  });

  context('when links', () => {
    let verticalLinksPopup;
    let stubCallbackOnly;
    let stubLinkAndCallback;

    beforeEach(() => {
      stubCallbackOnly = sinon.spy();
      stubLinkAndCallback = sinon.spy();
      verticalLinksPopup = createComponent({
        links: [
          { label: 'just link', href: 'http://www.first-link.com' },
          { label: 'just callback', onClick: stubCallbackOnly },
          { label: 'link and callback', href: 'http://www.mixed.org', onClick: stubLinkAndCallback },
          { label: 'link with External', href: 'http://www.first-link.com', isExternal: true }
        ],
        closeLabel: 'close button',
        onClose: _.noop,
        active: true
      });
    });

    it('should render links before the close button', () => {
      const allButtons = verticalLinksPopup.find('.button');

      expect(allButtons).to.have.lengthOf(5);
      expect(allButtons.at(0)).to.have.text('just link');
      expect(allButtons.at(1)).to.have.text('just callback');
      expect(allButtons.at(2)).to.have.text('link and callback');
      expect(allButtons.at(3)).to.have.text('link with External');
      expect(allButtons.at(4)).to.have.text('close button');
    });

    it('should create an anchor tag for each link', () => {
      const aHrefTags = verticalLinksPopup.find('a');

      expect(aHrefTags).to.have.lengthOf(4);
      expect(aHrefTags.at(0)).to.have.text('just link');
      expect(aHrefTags.at(1)).to.have.text('just callback');
      expect(aHrefTags.at(2)).to.have.text('link and callback');
    });

    it('should use the given href for each anchor tag if they exist', () => {
      const aHrefTags = verticalLinksPopup.find('a');

      expect(aHrefTags).to.have.lengthOf(4);
      expect(aHrefTags.at(0)).to.have.attr('href', 'http://www.first-link.com');
      expect(aHrefTags.at(2)).to.have.attr('href', 'http://www.mixed.org');
    });

    it('should set the target `_blank` when isExternal is true', () => {
      const aHrefTags = verticalLinksPopup.find('a');

      expect(aHrefTags).to.have.lengthOf(4);
      expect(aHrefTags.at(3)).to.have.attr('target', '_blank');
    });

    it('should add an onClick callback to anchor tag when link prop has onClick attribute', () => {
      const aHrefTags = verticalLinksPopup.find('a');

      aHrefTags.at(1).simulate('click');
      expect(stubCallbackOnly).to.have.been.called;

      aHrefTags.at(2).simulate('click');
      expect(stubLinkAndCallback).to.have.been.called;
    });
  });

  context('when link styles', () => {
    const defaultLinkTitle = 'link';
    const defaultLinkHref = 'http://www.link.com/';
    const defaultLinkProperties = {
      label: defaultLinkTitle,
      href: defaultLinkHref
    };

    let links;
    let verticalLinksPopup;

    beforeEach(() => {
      verticalLinksPopup = createComponent({
        links: [
          defaultLinkProperties,
          {
            ...defaultLinkProperties,
            style: PRIMARY
          },
          {
            ...defaultLinkProperties,
            style: DESTRUCTIVE
          }
        ],
        closeLabel: 'close button',
        onClose: _.noop,
        active: true
      });
      links = verticalLinksPopup.find('a.button');
    });

    it('should render default style when link style is undefined', () => {
      expect(links.at(0)).to.have.className('button-popup_default');
    });

    it('should render primary style when style is primary', () => {
      expect(links.at(1)).to.have.className('button-popup_primary');
    });

    it('should render destructive style when style is destructive', () => {
      expect(links.at(2)).to.have.className('button-popup_destructive');
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      title: 'some title',
      links: [],
      hideCloseButton: false
    };

    props = _.assign(defaultProps, props);

    return mount(
      <Provider store={store}>
        <VerticalLinksPopup {...props} />
      </Provider>
    );
  };
});
