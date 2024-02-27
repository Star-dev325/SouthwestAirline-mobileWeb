import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import { AbstractPopup } from 'src/shared/enhancers/withAbstractPopup';
import sinonModule from 'sinon';

const sinon = sinonModule.sandbox.create();

import { click } from 'test/unit/helpers/enzymeFormTestUtils';

describe('withAbstractPopup', () => {
  let CustomPopup, Popup;

  beforeEach(() => {
    CustomPopup = () => <p>inner component</p>;
    Popup = createComponent();
    Popup.setProps({ active: false });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('pop-up', () => {
    it('should exist one has-pop-up class when popup show', () => {
      Popup.setProps({ active: true });

      expect(document.getElementsByClassName('has-pop-up')).to.have.lengthOf(1);
    });

    it('should not exist one has-pop-up class when popup show', () => {
      expect(document.getElementsByClassName('has-pop-up')).to.have.lengthOf(0);
    });
  });

  context('bottom attribute', () => {
    it('should not add a bottom class if not bottom attribute', () => {
      Popup.setProps({ active: true });

      expect(Popup.find('.popup-container_bottom')).to.have.lengthOf(0);
    });

    it('should check a bottom class is added to popup', () => {
      Popup.setProps({ active: true, bottom: true });

      expect(Popup.find('.popup-container_bottom')).to.have.lengthOf(1);
    });
  });

  context('dimmer', () => {
    it('should trigger the dimmer callback when click dimmer', () => {
      const stub = sinon.stub();

      Popup.setProps({ active: true, onDimmerClick: stub });

      click(Popup.find('.backdrop'));

      expect(stub).to.have.been.called;
    });
  });

  context('analytics', () => {
    it('should track analytics for dialog when a popup becomes active', () => {
      const viewModalStub = sinon.stub();

      Popup.setProps({ active: true, onViewModalFn: viewModalStub });

      expect(viewModalStub).to.have.been.called;
    });

    it('should not track analytics when a popup becomes inactive from a active state', () => {
      const viewModalStub = sinon.stub();

      Popup.setProps({ active: true });
      Popup.setProps({ active: false, onViewModalFn: viewModalStub });

      expect(viewModalStub).to.not.have.been.called;
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      active: true,
      links: [{ label: 'some label', href: '#' }],
      Component: CustomPopup
    };

    const newProps = _.merge({}, defaultProps, props);

    return mount(<AbstractPopup {...newProps} />);
  };
});
