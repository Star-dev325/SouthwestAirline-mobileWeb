import React from 'react';
import _ from 'lodash';
import { sandbox } from 'sinon';
import { mount, shallow } from 'enzyme';

import { BottomLinksPopup } from 'src/shared/components/popups/bottomLinksPopup';

const sinon = sandbox.create();

describe('BottomLinksPopup', () => {
  let onCloseStub;

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    const shouldShallow = true;

    it('should render correctly', () => {
      const bottomLinksPopup = createComponent({ active: true }, shouldShallow);

      expect(bottomLinksPopup).toMatchSnapshot();
    });

    it('should render correctly with subtitle', () => {
      const bottomLinksPopup = createComponent({ active: true, subtitle: 'test subtitle' }, shouldShallow);

      expect(bottomLinksPopup).toMatchSnapshot();
    });
  });

  context('when close button is clicked', () => {
    it('should call onClose callback', () => {
      const bottomLinksPopup = createComponent({ active: true });

      const closeButton = bottomLinksPopup.find('button');

      closeButton.simulate('click');

      expect(onCloseStub).to.have.been.called;
    });
  });

  context('when bottom link list is clicked', () => {
    it('should call first link and onClose callback', () => {
      const firstLinkHandlerStub = sinon.stub();
      const bottomLinksPopup = createComponent({
        active: true,
        links: [
          {
            label: 'first label',
            id: 1,
            handler: firstLinkHandlerStub
          }
        ]
      });
      const firstButtonLink = bottomLinksPopup.find('a').first();

      firstButtonLink.simulate('click');

      expect(firstLinkHandlerStub).to.have.been.called;
      expect(onCloseStub).to.have.been.called;
    });
  });

  const createComponent = (props, shouldShallow) => {
    onCloseStub = sinon.stub();

    const defaultProps = {
      onClose: onCloseStub,
      links: [
        {
          label: 'test',
          id: 1,
          handler() {}
        },
        {
          label: 'test',
          id: 2,
          handler() {}
        }
      ]
    };

    props = _.assign(defaultProps, props);

    return shouldShallow ?
      shallow(<BottomLinksPopup {...props} />) :
      mount(<BottomLinksPopup {...props} />);
  };
});
