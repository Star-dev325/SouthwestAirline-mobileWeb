import React from 'react';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';

import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import CalendarStrip from 'src/shared/components/calendar/calendarStrip';

const sinon = sandbox.create();

describe('CalendarStrip', () => {
  let trackCalendarStripFnStub;
  let wrapper;
  let onDateSelectedStub;
  let verifyShouldHideWarningIconStub;

  const createComponent = (props) => {
    const defaultProps = {
      defaultSelectedDate: '2014-01-02',
      startDate: dayjs('2014-01-01'),
      disabled: false,
      endDate: dayjs('2015-01-01'),
      onDateSelected: onDateSelectedStub,
      verifyShouldHideWarningIcon: verifyShouldHideWarningIconStub,
      trackCalendarStripFn: trackCalendarStripFnStub
    };

    return mount(<CalendarStrip {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    onDateSelectedStub = sinon.stub();
    trackCalendarStripFnStub = sinon.stub();
    verifyShouldHideWarningIconStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a formatted date string for the date given, and the day before and after', () => {
    wrapper = createComponent({
      defaultSelectedDate: '2014-04-09'
    });
    const listItems = wrapper.find('li');

    expect(listItems.at(0)).to.have.text('Tue, Apr 08');
    expect(listItems.at(1)).to.have.text('Wed, Apr 09');
    expect(listItems.at(2)).to.have.text('Thu, Apr 10');
  });

  it('should add active class to the selected date', () => {
    wrapper = createComponent({
      defaultSelectedDate: '2014-04-09'
    });
    const listItems = getRenderedDates();

    expect(listItems.at(0)).to.not.have.className('bgsdkblue');
    expect(listItems.at(1)).to.have.className('bgsdkblue');
    expect(listItems.at(2)).to.not.have.className('bgsdkblue');
  });

  context('when pressing next button', () => {
    it('should show the next three days', () => {
      wrapper = createComponent({
        defaultSelectedDate: '2014-04-09'
      });
      wrapper.find('[data-qa="calendar-strip-next-dates"]').simulate('click');
      const listItems = getRenderedDates();

      expect(listItems.at(0)).to.have.valueOf('Fri, Apr 11');
      expect(listItems.at(1)).to.have.valueOf('Sat, Apr 12');
      expect(listItems.at(2)).to.have.valueOf('Sun, Apr 13');
    });
  });

  context('when pressing previous button', () => {
    it('should show the last three days', () => {
      wrapper = createComponent({
        defaultSelectedDate: '2014-04-09'
      });
      wrapper.find('[data-qa="calendar-strip-previous-dates"]').simulate('click');
      const listItems = getRenderedDates();

      expect(listItems.at(0)).to.have.valueOf('Sat, Apr 05');
      expect(listItems.at(1)).to.have.valueOf('Sun, Apr 06');
      expect(listItems.at(2)).to.have.valueOf('Mon, Apr 07');
    });
  });

  context('when pressing the same date button', () => {
    it('won`t search again', () => {
      wrapper = createComponent({
        defaultSelectedDate: '2014-04-09'
      });
      wrapper.find('.calendar-strip--item_active').simulate('click');

      expect(onDateSelectedStub).not.to.have.been.called;
    });
  });

  context('when displaying dates past the end date', () => {
    beforeEach(() => {
      wrapper = createComponent({
        defaultSelectedDate: '2014-04-09',
        startDate: dayjs('2014-04-09'),
        disabled: false,
        endDate: dayjs('2014-04-09'),
        onDateSelected: onDateSelectedStub
      });
    });

    it('disables the dates', () => {
      const listItems = getRenderedDates();

      expect(listItems.at(2)).to.have.className('calendar-strip--item_disabled');
    });

    it('removes the next link', () => {
      expect(wrapper.find('[data-qa="calendar-strip-next-dates"]')).to.not.exist;
    });
  });

  context('when the calendar strip is disabled', () => {
    beforeEach(() => {
      const searchDate = dayjs().add(4, 'day');

      wrapper = createComponent({
        defaultSelectedDate: searchDate.format('YYYY-MM-DD'),
        startDate: searchDate.subtract(10, 'day'),
        endDate: searchDate.add(10, 'day'),
        disabled: true,
        onDateSelected: onDateSelectedStub
      });
    });

    it('dates style should be disabled when is not current date', () => {
      const listItems = getRenderedDates();

      expect(listItems.at(0)).to.have.className('calendar-strip--item_disabled');
      expect(listItems.at(2)).to.have.className('calendar-strip--item_disabled');
    });

    it('dates style should not be disabled when is current date', () => {
      const listItems = getRenderedDates();

      expect(listItems.at(1)).to.not.have.className('calendar-strip--item_disabled');
    });

    it('should not display chevrons', () => {
      const arrowLeftIcon = wrapper.find('[data-qa="calendar-strip-previous-dates"]');
      const arrowRightIcon = wrapper.find('[data-qa="calendar-strip-previous-dates"]');

      expect(arrowLeftIcon).to.have.lengthOf(0);
      expect(arrowRightIcon).to.have.lengthOf(0);
    });
  });

  context('start date is today', () => {
    context('and default selected date is also today', () => {
      it('does not show the previous link', () => {
        wrapper = createComponent({
          defaultSelectedDate: dayjs().format('YYYY-MM-DD'),
          startDate: dayjs()
        });
        expect(wrapper.find('[data-qa="calendar-strip-previous-dates"]')).not.exist;
      });

      it('shows dates before today as disabled', () => {
        wrapper = createComponent({
          defaultSelectedDate: dayjs().format('YYYY-MM-DD'),
          startDate: dayjs(),
          disabled: true
        });
        const listItems = getRenderedDates();

        expect(listItems.at(0)).to.have.className('calendar-strip--item_disabled');
      });

      context('and default selected date is in the future', () => {
        it('shows the previous link', () => {
          wrapper = createComponent({
            defaultSelectedDate: dayjs().add(1, 'month').format('YYYY-MM-DD'),
            startDate: dayjs()
          });
          expect(wrapper.find('[data-qa="calendar-strip-previous-dates"]')).to.be.exist;
        });
      });
    });
  });

  context('on click date', () => {
    it('should not fire onDateSelected when the selected date is current date', () => {
      wrapper = createComponent();

      click(wrapper.find('li').at(1));

      expect(onDateSelectedStub).to.not.be.called;
    });

    it('should not fire onDateSelected when the selected date is disabled', () => {
      wrapper = createComponent({
        defaultSelectedDate: '2013-01-02'
      });

      click(wrapper.find('li').at(1));

      expect(onDateSelectedStub).to.not.be.called;
    });

    it('should fire onDateSelected when the selected date not disabled and is not current date', () => {
      wrapper = createComponent();

      click(wrapper.find('li').at(2));

      expect(onDateSelectedStub).to.be.called;
      expect(onDateSelectedStub.firstCall.args[0]).to.be.equal('2014-01-03');
      expect(onDateSelectedStub.firstCall.args[2]).to.be.deep.equal({ previousDate: '2014-01-02' });
    });

    it('should initialize the viewDate when onDateSelectedCallback were called with isSelectionCanceled to true', () => {
      wrapper = createComponent();

      click(wrapper.find('[data-qa="calendar-strip-next-dates"]'));
      click(wrapper.find('li').at(2));
      onDateSelectedStub.firstCall.args[1](true);

      expect(wrapper.state('viewDate').format('YYYY-MM-DD')).to.be.equal('2014-01-02');
    });

    it('should trigger analytics action with selectedDate when onDateSelectedCallback were called with isSelectionCanceled to false', () => {
      wrapper = createComponent();

      click(wrapper.find('[data-qa="calendar-strip-next-dates"]'));
      click(wrapper.find('li').at(2));
      onDateSelectedStub.firstCall.args[1](false, '2014-01-03');

      expect(trackCalendarStripFnStub).to.have.been.calledWith('2014-01-03');
    });
  });

  context('warning icon', () => {
    context('date disabled', () => {
      it('should not show waring icon when getShouldHideWarningIcon return true', () => {
        verifyShouldHideWarningIconStub.returns(true);
        wrapper = createComponent({
          defaultSelectedDate: '2013-12-31',
          startDate: dayjs('2014-01-01')
        });
        const warningIcons = wrapper.find('[data-qa="calendar-strip--warning-icon"]');

        expect(warningIcons.at(0)).to.have.className('hide');
        expect(warningIcons.at(1)).to.have.className('hide');
        expect(warningIcons.at(2)).to.have.className('hide');
      });

      it('should hide waring icon when getShouldHideWarningIcon return false', () => {
        verifyShouldHideWarningIconStub.returns(false);
        wrapper = createComponent({
          defaultSelectedDate: '2013-12-30',
          startDate: dayjs('2014-01-01')
        });
        const warningIcons = wrapper.find('[data-qa="calendar-strip--warning-icon"]');

        expect(warningIcons.at(0)).to.have.className('hide');
        expect(warningIcons.at(1)).to.have.className('hide');
        expect(warningIcons.at(2)).to.have.className('hide');
      });
    });

    context('date not disabled', () => {
      it('should hide waring icon when verifyShouldHideWarningIcon return true', () => {
        verifyShouldHideWarningIconStub.returns(true);
        wrapper = createComponent({
          defaultSelectedDate: '2014-04-09',
          startDate: dayjs('2014-01-01')
        });
        const warningIcons = wrapper.find('[data-qa="calendar-strip--warning-icon"]');

        expect(warningIcons.at(0)).to.have.className('hide');
        expect(warningIcons.at(1)).to.have.className('hide');
        expect(warningIcons.at(2)).to.have.className('hide');
      });

      it('should not hide waring icon when verifyShouldHideWarningIcon return false', () => {
        verifyShouldHideWarningIconStub.returns(false);
        wrapper = createComponent({
          defaultSelectedDate: '2014-04-09',
          startDate: dayjs('2014-01-01')
        });
        const warningIcons = wrapper.find('[data-qa="calendar-strip--warning-icon"]');

        expect(warningIcons.at(0)).to.not.have.className('hide');
        expect(warningIcons.at(1)).to.not.have.className('hide');
        expect(warningIcons.at(2)).to.not.have.className('hide');
      });

      it('should hide waring icon when verifyShouldHideWarningIcon is undefined', () => {
        wrapper = createComponent({
          defaultSelectedDate: '2014-04-09',
          startDate: dayjs('2014-01-01'),
          verifyShouldHideWarningIcon: undefined
        });
        const warningIcons = wrapper.find('[data-qa="calendar-strip--warning-icon"]');

        expect(warningIcons.at(0)).to.have.className('hide');
        expect(warningIcons.at(1)).to.have.className('hide');
        expect(warningIcons.at(2)).to.have.className('hide');
      });
    });
  });

  const getRenderedDates = () => wrapper.find('li');
});
