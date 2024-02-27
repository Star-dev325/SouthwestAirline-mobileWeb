import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';

import Pagination from 'src/shared/components/pagination';

const sinon = sandbox.create();

describe('Pagination', () => {
  it('should be hidden if totalPageCount is 1', () => {
    const pagination = createComponent({ totalPageCount: 1 });

    expect(pagination).to.have.className('hidden');
  });

  it(`should render the number of items specified in the "totalPageCount" prop`, () => {
    const pagination = createComponent({ totalPageCount: 3 });

    expect(pagination.find('.page')).to.have.lengthOf(3);
  });

  it('should default the selected item to the first item', () => {
    const pagination = createComponent({ totalPageCount: 2 });

    expect(pagination.find('.page').first()).to.have.className('active');
  });

  it(`should set the selected item to the item specified in the "selected" prop`, () => {
    const pagination = createComponent({ totalPageCount: 2, selected: 1 });

    expect(pagination.find('.page').at(1)).to.have.className('active');
  });

  context('Next Button', () => {
    it('should be hidden if there is only one item', () => {
      const pagination = createComponent({ totalPageCount: 1 });

      expect(pagination.find('.toolbar-next')).to.have.className('invisible');
    });

    it('should be hidden if there is multiple items and the last item is selected', () => {
      const pagination = createComponent({ totalPageCount: 2, selected: 1 });

      expect(pagination.find('.toolbar-next')).to.have.className('invisible');
    });

    it('should not be hidden when there are items available', () => {
      const pagination = createComponent({ totalPageCount: 2 });

      expect(pagination.find('.toolbar-next')).to.not.have.className('invisible');
    });

    it('should invoke a callback prop with the next item in the list when clicked', () => {
      const callbackSpy = sinon.spy();
      const pagination = createComponent({ totalPageCount: 2, selected: 0, clickCallback: callbackSpy });

      pagination.find('[data-qa="nextLink"]').simulate('click', sinon.stub());

      expect(callbackSpy, 'Clicking "Next" should invoke the callback').to.have.been.called;
      expect(callbackSpy.args[0][0]).to.have.property('selected').which.equal(1);
    });
  });

  context('Prev Button', () => {
    const previousButtonShouldBeHidden = (pagination) => {
      const previousLink = pagination.find('.toolbar-previous');

      expect(previousLink).to.have.className('invisible');
    };

    const shouldBeVisible = (element) => {
      expect(element).to.not.have.className('invisible');
    };

    it('should be hidden if there is only one item', () => {
      const pagination = createComponent({ totalPageCount: 1 });

      previousButtonShouldBeHidden(pagination);
    });

    it('should be hidden when there are multiple items and the selected item is the first item', () => {
      const pagination = createComponent({ totalPageCount: 2, selected: 0 });

      previousButtonShouldBeHidden(pagination);
    });

    it('should not be hidden when there are multiple items and the selected item is not the first item', () => {
      const pagination = createComponent({ totalPageCount: 2, selected: 1 });
      const previousLink = pagination.find('.toolbar-previous');

      shouldBeVisible(previousLink);
    });

    it('should invoke a callback prop with the previous item in the list when clicked', () => {
      const callbackSpy = sinon.spy();
      const pagination = createComponent({ totalPageCount: 2, selected: 1, clickCallback: callbackSpy });

      pagination.find('[data-qa="prevLink"]').simulate('click', sinon.stub());

      expect(callbackSpy, 'Clicking "Prev" should invoke the callback').to.have.been.called;
      expect(callbackSpy.args[0][0]).to.have.property('selected').which.equal(0);
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      totalPageCount: 0,
      clickCallback: _.noop,
      selected: 0
    };

    return mount(<Pagination {...defaultProps} {...props} />);
  };
});
