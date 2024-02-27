import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import { sandbox } from 'sinon';

import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import CreditCardsBottomBar from 'src/shared/components/creditCardsBottomBar';

const sinon = sandbox.create();

describe('CreditCardsBottomBar', () => {
  let onButtonClickStub;
  let wrapper;

  beforeEach(() => {
    onButtonClickStub = sinon.stub();
    wrapper = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should render two button', () => {
      expect(wrapper.find('.credit-cards-bottom-bar--button')).to.have.lengthOf(2);
    });

    it('should render enabled button', () => {
      expect(wrapper.find('.credit-cards-bottom-bar--button_active')).to.have.lengthOf(1);
    });
  });

  context('click button', () => {
    it('should call onButtonClick when click one button with button id', () => {
      click(wrapper.find('.credit-cards-bottom-bar--button_active').first());
      expect(onButtonClickStub).to.have.been.calledWith('UPDATE');
    });

    it('should not call onButtonClick when click not enabled button', () => {
      click(wrapper.find('.credit-cards-bottom-bar--button').first());
      expect(onButtonClickStub).not.to.have.been.calledWith('PRIMARY');
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      buttons: [
        {
          id: 'PRIMARY',
          text: 'Primary',
          enable: false
        },
        {
          id: 'UPDATE',
          text: 'Update',
          enable: true
        }
      ],
      onButtonClick: onButtonClickStub
    };

    _.merge(defaultProps, props);

    return shallow(<CreditCardsBottomBar {...defaultProps} />);
  };
});
