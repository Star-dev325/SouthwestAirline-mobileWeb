import React from 'react';
import dayjs from 'dayjs';
import { mount, shallow } from 'enzyme';
import { sandbox } from 'sinon';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { DEPART, RETURN, BOTH } from 'src/shared/components/calendar/constants/calendarType';
import Calendar from 'src/shared/components/calendar/calendar';
import Icon from 'src/shared/components/icon';

const sinon = sandbox.create();

describe('Calendar', () => {
  let instance;
  let onSelectionCompletedSpy;
  let onCancelSpy;
  let maxReservationDate;
  const departureDay = dayjs().add(1, 'days');
  const returningDay = dayjs().add(5, 'days');

  beforeEach(() => {
    onSelectionCompletedSpy = sinon.spy();
    onCancelSpy = sinon.spy();
    maxReservationDate = dayjs().add(5, 'month');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when initialize the state', () => {
    it('should not set the returning date if it is one way', () => {
      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(instance).have.state('returningDate').equal(null);
    });

    it('should set done select to be true if it is one way and init departure date is set', () => {
      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(instance).state('doneSelect').equal(true);
      expect(instance).state('departureDate').eql(departureDay);
    });

    it('should set done select to be false if it is round trip and init returning date is not set', () => {
      instance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(instance).state('doneSelect').equal(false);
    });

    it('should set init state to be departureDay and returningDay', () => {
      instance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(instance).state('doneSelect').equal(true);
      expect(instance).state('departureDate').eql(departureDay);
      expect(instance).state('returningDate').eql(returningDay);
    });
  });

  it('should render six month components for five months later', () => {
    const instance = mount(
      <Calendar
        type={DEPART}
        maxReservationDate={maxReservationDate}
        initDepartureDate={departureDay}
        onSelectionComplete={onSelectionCompletedSpy}
        onCancel={onCancelSpy}
      />
    ).instance();

    expect(instance._renderMonths()).have.length(6);
  });

  context('when the calendar is for one way trip', () => {
    let departureDay;
    let returningDay;

    beforeEach(() => {
      departureDay = dayjs().add(1, 'days');
      returningDay = dayjs().add(5, 'days');
    });

    it('should show title with `Calendar`', () => {
      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          onSelectionComplete={onSelectionCompletedSpy}
          initDepartureDate={departureDay}
          onCancel={onCancelSpy}
        />
      );

      expect(instance.find('.calendar-title')).to.have.text('Calendar');
    });

    it('should show title with `Select Dates` when in web view', () => {
      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          onSelectionComplete={onSelectionCompletedSpy}
          initDepartureDate={departureDay}
          onCancel={onCancelSpy}
          isWebView
        />
      );

      expect(instance.find('.calendar-title')).to.have.text('Select Dates');
    });

    it('should set done select to be true after set the departure date ', () => {
      const day = dayjs().add(1, 'days');

      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          onSelectionComplete={onSelectionCompletedSpy}
          initDepartureDate={departureDay}
          onCancel={onCancelSpy}
        />
      );

      instance.instance()._setDepartureDay(day);
      expect(instance).state('departureDate').eql(day);
      expect(instance).state('returningDate').equal(null);
      expect(instance).state('doneSelect').equal(true);
    });

    it('should change departure date when click different date', () => {
      const departureDate = dayjs().add(10, 'days');

      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      instance.instance()._onDayClicked(departureDate);
      expect(instance).have.state('departureDate').eql(departureDate);
      expect(instance).have.state('doneSelect').equal(true);
    });

    it('should not display a return date', () => {
      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      expect(instance.find('.flight-return')).have.length(0);
    });

    it('should not display a reset button', () => {
      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      expect(instance.find('.reset-area')).have.length(0);
    });

    it('should display departure date with class name "departure-date"', () => {
      instance = mount(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={null}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(instance.find('.departure-date')).to.exist;
    });

    context('when calendarType is DEPART', () => {
      beforeEach(() => {
        instance = mount(
          <Calendar
            type={DEPART}
            maxReservationDate={maxReservationDate}
            initDepartureDate={departureDay}
            initReturningDate={returningDay}
            onSelectionComplete={onSelectionCompletedSpy}
            onCancel={onCancelSpy}
          />
        );
      });

      it("should show 'DEPART' in start date and no 'RETURN' label", () => {
        const labelContainers = instance.find('.label-container--label');

        expect(labelContainers).have.length(1);
        expect(labelContainers.at(0)).have.text(DEPART);
      });

      it('should show Icon with type "airplane-depart"', () => {
        expect(instance.find(Icon)).to.have.prop('type', 'airplane-depart');
      });

      it('should have node with className depart-flight-day', () => {
        expect(instance.find('.depart-flight-day')).to.be.exist;
      });
    });

    context('when calendarType is RETURN', () => {
      beforeEach(() => {
        instance = mount(
          <Calendar
            type={RETURN}
            maxReservationDate={maxReservationDate}
            initDepartureDate={departureDay}
            initReturningDate={returningDay}
            onSelectionComplete={onSelectionCompletedSpy}
            onCancel={onCancelSpy}
          />
        );
      });

      it("should show 'RETURN' in start date", () => {
        const labelContainers = instance.find('.label-container--label');

        expect(labelContainers).have.length(1);
        expect(labelContainers.at(0)).have.text(RETURN);
      });

      it('should show Icon with type "airplane-return"', () => {
        expect(instance.find(Icon)).to.have.prop('type', 'airplane-return');
      });

      it('should have node with className return-flight-day', () => {
        expect(instance.find('.return-flight-day')).to.be.exist;
      });

      it('should show return day with class name "returning-date" and without "returning-date-bg"', () => {
        expect(instance.find('.returning-date')).to.exist;
        expect(instance.find('.returning-date-bg')).to.not.exist;
      });
    });
  });

  context('when the calendar is for round trip', () => {
    let calendarInstance;
    const departureDay = dayjs().add(1, 'days');
    const returningDay = dayjs().add(5, 'days');

    it('should show title with `Calendar`', () => {
      calendarInstance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      expect(calendarInstance.find('.calendar-title')).to.have.text('Calendar');
    });

    it('should show title with `Select Dates` when in web view', () => {
      calendarInstance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
          isWebView
        />
      );

      expect(calendarInstance.find('.calendar-title')).to.have.text('Select Dates');
    });

    it('should show title based on the title passed in', () => {
      const calendarTitle = 'Calendar Title';

      calendarInstance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
          title={calendarTitle}
        />
      );

      expect(calendarInstance.find('.calendar-title')).to.have.text(calendarTitle);
    });

    it('should reset init departure day after click', () => {
      calendarInstance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      const day = dayjs().add(10);

      calendarInstance.instance()._onDayClicked(day);
      expect(calendarInstance).state('departureDate').eql(day);
      expect(calendarInstance).state('doneSelect').eql(false);
    });

    it('should reset departure day if selected returning date is before departure date', () => {
      calendarInstance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          onSelectionComplete={onSelectionCompletedSpy}
          initDepartureDate={departureDay}
          onCancel={onCancelSpy}
        />
      );

      const tenDaysFromDeparture = departureDay.add(10, 'days');

      calendarInstance.instance()._onDayClicked(tenDaysFromDeparture);
      expect(calendarInstance).have.state('departureDate').eql(tenDaysFromDeparture);

      const fiveDaysFromDeparture = departureDay.add(5, 'days');

      calendarInstance.instance()._onDayClicked(fiveDaysFromDeparture);

      expect(calendarInstance).state('departureDate').eql(fiveDaysFromDeparture);
      expect(calendarInstance).state('doneSelect').eql(false);
    });

    it('should display date holder for return date when user clicks reset', () => {
      calendarInstance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      click(calendarInstance.find('.reset-area--link'));
      expect(calendarInstance.find('.return-flight-day')).have.text('- / - / -');
    });

    it('should set doneSelect to be true if BOTH dates are selected', () => {
      const calendarInstance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          onSelectionComplete={onSelectionCompletedSpy}
          initDepartureDate={departureDay}
          onCancel={onCancelSpy}
        />
      );
      const fiveDaysLater = dayjs().add(5, 'days');

      calendarInstance.instance()._onDayClicked(fiveDaysLater);
      expect(calendarInstance).state('departureDate').eql(fiveDaysLater);
      expect(calendarInstance).state('doneSelect').equal(false);

      const tenDaysLater = dayjs().add(10, 'days');

      calendarInstance.instance()._onDayClicked(tenDaysLater);
      expect(calendarInstance).state('returningDate').eql(tenDaysLater);
      expect(calendarInstance).state('doneSelect').equal(true);
    });

    it('should tell me to `Select Date` if there is no returning date on multi select', () => {
      instance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(instance.find('.return-flight-day')).to.have.text('Select Date');
    });

    it('should tell me the return date if there is a selected return date on multi select', () => {
      instance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(instance.find('.return-flight-day')).to.have.text(returningDay.format('M/DD/YY'));
    });

    it("should show 'DEPART' in start date and 'RETURN' in end date", () => {
      instance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      const labelContainers = instance.find('.label-container--label');

      expect(labelContainers.at(0)).to.have.text(DEPART);
      expect(labelContainers.at(1)).to.have.text(RETURN);
    });
  });

  context('#_onDoneSelect', () => {
    context('when all dates have been selected', () => {
      it('should invoke the callback with selected values', () => {
        const today = dayjs();
        const tomorrow = dayjs().add(1, 'days');
        const calendarInstance = mount(
          <Calendar
            type={BOTH}
            maxReservationDate={maxReservationDate}
            onSelectionComplete={onSelectionCompletedSpy}
            initDepartureDate={departureDay}
            onCancel={onCancelSpy}
          />
        );

        calendarInstance.instance().setState({
          departureDate: today,
          returningDate: tomorrow,
          doneSelect: true
        });

        click(calendarInstance.find('.done-area'));

        expect(onSelectionCompletedSpy).to.have.been.calledWith({
          newOutboundDate: today,
          newInboundDate: tomorrow
        });
      });
    });

    context('when not all dates have been selected', () => {
      it('should call onCancel without any date change', () => {
        const calendarInstance = mount(
          <Calendar
            type={BOTH}
            maxReservationDate={maxReservationDate}
            onSelectionComplete={onSelectionCompletedSpy}
            initDepartureDate={departureDay}
            initReturningDate={returningDay}
            onCancel={onCancelSpy}
          />
        );

        calendarInstance.instance().setState({
          departureDate: null,
          returningDate: null,
          doneSelect: false
        });

        click(calendarInstance.find('[data-qa="done-btn"]'));

        expect(onCancelSpy).to.have.been.called;
      });
    });
  });

  context('when calendar is for car booking', () => {
    const departureDay = dayjs().add(1, 'days');
    const returningDay = dayjs().add(5, 'days');

    it('should render car icon', () => {
      instance = mount(
        <Calendar
          type={BOTH}
          isCarBooking
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      expect(instance.find('.calender--car-icon')).have.length(2);
    });

    it('should hide calendar schedule message label', () => {
      instance = mount(
        <Calendar
          type={BOTH}
          isCarBooking
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      expect(instance.find('.calendar-schedule-message')).have.length(0);
    });

    it("should show 'PICK-UP' in start date and 'DROP-OFF' in end date", () => {
      instance = mount(
        <Calendar
          type={BOTH}
          isCarBooking
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          initReturningDate={returningDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );

      const labelContainers = instance.find('.label-container--label');

      expect(labelContainers.at(0)).have.text('PICK-UP');
      expect(labelContainers.at(1)).have.text('RETURN');
    });
  });

  context('componentDidMount', () => {
    let mockElement;

    beforeEach(() => {
      mockElement = {
        scrollIntoView: sinon.stub()
      };
    });

    it('should scroll view when it is not current month', () => {
      const initDate = dayjs().add(1, 'months');
      const monthId = initDate.month();

      sinon.stub(document, 'getElementById').withArgs(`${monthId}`).returns(mockElement);
      instance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={initDate}
          initReturningDate={initDate}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(document.getElementById(`${monthId}`).scrollIntoView).to.have.been.called;
    });

    it('should not scroll view when it is current month', () => {
      const initDate = dayjs();
      const monthId = initDate.month();

      sinon.stub(document, 'getElementById').withArgs(`${monthId}`).returns(mockElement);
      instance = mount(
        <Calendar
          type={BOTH}
          maxReservationDate={maxReservationDate}
          initDepartureDate={initDate}
          initReturningDate={initDate}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
        />
      );
      expect(document.getElementById(`${monthId}`).scrollIntoView).not.to.have.been.called;
    });

    it('should render calendar schedule message', () => {
      const CalendarWrapper = shallow(
        <Calendar
          type={DEPART}
          maxReservationDate={maxReservationDate}
          initDepartureDate={departureDay}
          onSelectionComplete={onSelectionCompletedSpy}
          onCancel={onCancelSpy}
          calendarScheduleMessage={'Calendar schedule message'}
        />
      );

      expect(CalendarWrapper.find('.calendar-schedule-message')).toMatchSnapshot();
    });
  });
});
