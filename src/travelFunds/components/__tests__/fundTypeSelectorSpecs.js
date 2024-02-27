import React from 'react';
import { mount } from 'enzyme';
import sinonModule from 'sinon';

import FundTypeSelector from 'src/travelFunds/components/fundTypeSelector';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

const { FUND_TYPES, FUND_TYPES_FORMATTED } = TravelFundsConstants;

const sinon = sinonModule.sandbox.create();

describe('FundTypeSelector', () => {
  let onClickSelectorStub, wrapper;

  beforeEach(() => {
    onClickSelectorStub = sinon.stub();
    wrapper = createComponent();
  });

  context('render', () => {
    it('should have travel-info set to active by default', () => {
      expect(wrapper.find('[data-qa="travel-funds-selector"]')).to.have.className('active');
    });

    it('should apply special border styling class to the center button', () => {
      expect(wrapper.find('[data-qa="luv-voucher-selector"]')).to.have.className('center-button');
    });

    it('should only have one active selector at a time', () => {
      wrapper = createComponent({ selectedFund: FUND_TYPES_FORMATTED[1] });
      expect(wrapper.find('[data-qa="travel-funds-selector"]')).to.not.have.className('active');
      expect(wrapper.find('[data-qa="gift-card-selector"]')).to.not.have.className('active');
      expect(wrapper.find('[data-qa="luv-voucher-selector"]')).to.have.className('active');
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      onClickSelector: onClickSelectorStub,
      selectedFund: FUND_TYPES_FORMATTED[0],
      fundTypes: FUND_TYPES
    };

    return mount(<FundTypeSelector {...defaultProps} {...props} />);
  };
});
