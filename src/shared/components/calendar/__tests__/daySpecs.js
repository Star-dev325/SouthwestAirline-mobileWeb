import React from 'react';
import { sandbox } from 'sinon';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import { BOTH } from 'src/shared/components/calendar/constants/calendarType';
import Day from 'src/shared/components/calendar/day';

const sinon = sandbox.create();

describe('Day component', () => {
  let today;
  let onClickStub;

  beforeEach(() => {
    today = dayjs().format();
    onClickStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('styles for departure date', () => {
    it('should apply the departure-date* styles if date is departure day', () => {
      const day = createComponent({ isFirstDayOfSelection: true, isPartOfSelectedRange: true });

      expect(day.find('.departure-date-bg')).to.have.lengthOf(1);
      expect(day.find('.date-cell-inner').find('.departure-date')).to.have.lengthOf(1);
    });
  });

  context('styles for return date', () => {
    it('should apply return-date* styles if date is returning day', () => {
      const day = createComponent({ isLastDayOfSelection: true });

      expect(day.find('.returning-date-bg')).to.have.lengthOf(1);
      expect(day.find('.date-cell-inner').find('.returning-date')).to.have.lengthOf(1);
    });

    it('should not apply return-date background styles if date is both a starting and returning day', () => {
      const day = createComponent({ isFirstDayOfSelection: true, isLastDayOfSelection: true });

      expect(day.find('.returning-date-bg')).to.have.lengthOf(0);
      expect(day.find('.date-cell-inner').find('.returning-date')).to.have.lengthOf(1);
    });
  });

  context('styles for between dates', () => {
    it('should apply the between-date-bg style if date is between departure and return day', () => {
      const day = createComponent({ isFirstDayOfSelection: false, isPartOfSelectedRange: true });

      expect(day.find('.between-date-bg')).to.have.lengthOf(1);
    });
  });

  context('styles for today-date', () => {
    it('should bold itself if date is todays date', () => {
      const day = createComponent({ isToday: true });

      expect(day.find('.date-cell-inner').find('.today')).to.have.lengthOf(1);
    });
  });

  context('disabled-date style', () => {
    it('should be applied for days that are not selectable', () => {
      const day = createComponent({ isSelectable: false });

      expect(day.find('.date-cell-inner').find('.disabled-date')).to.have.lengthOf(1);
    });
  });

  context('onClick', () => {
    it('should be invoked if date is selectable', () => {
      const day = createComponent({ isSelectable: true });

      day.simulate('click');

      expect(onClickStub).to.have.been.called;
    });

    it('should not be invoked if date is not selectable', () => {
      const day = createComponent({ isSelectable: false });

      day.simulate('click');

      expect(onClickStub).not.to.have.been.called;
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      date: today,
      type: BOTH,
      onClick: onClickStub
    };

    return mount(<Day {...defaultProps} {...props} />);
  };
});
