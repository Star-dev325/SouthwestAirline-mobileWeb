import React from 'react';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import { BOTH } from 'src/shared/components/calendar/constants/calendarType';
import Month from 'src/shared/components/calendar/month';

const sinon = sandbox.create();

describe('Month', () => {
  let lastBookableDate;
  let onClickStub;

  beforeEach(() => {
    lastBookableDate = dayjs().add(90, 'days');
    onClickStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should get correct date for April 2015', () => {
    const day = dayjs().year(2015).month(3);

    const month = mount(
      <Month
        id={`${day.month()}`}
        type={BOTH}
        date={day}
        departureDay={day}
        returningDay={day}
        lastBookableDate={lastBookableDate}
        isMultiSelectionEnabled={false}
        onClick={onClickStub}
      />
    );

    expect(month.instance()._days(day)).to.have.lengthOf(35);
    expect(month.instance()._days(day)[0].isVisible).to.be.false;
    expect(month.instance()._days(day)[3].isVisible).to.be.true;
    expect(month.instance()._days(day)[3].displayValue).to.be.equal('1');
  });

  it('should return 7 days of a week start from Sunday', () => {
    const day = dayjs().year(2015).month(3);

    const month = mount(
      <Month
        id={`${day.month()}`}
        type={BOTH}
        date={day}
        departureDay={day}
        returningDay={day}
        lastBookableDate={lastBookableDate}
        isMultiSelectionEnabled={false}
        onClick={onClickStub}
      />
    );

    const weekDays = month.instance()._daysOfWeek();

    expect(weekDays).to.have.lengthOf(7);
    expect(weekDays[0]).to.be.equal('S');
    expect(weekDays[1]).to.be.equal('M');
    expect(weekDays[2]).to.be.equal('T');
    expect(weekDays[3]).to.be.equal('W');
    expect(weekDays[4]).to.be.equal('T');
    expect(weekDays[5]).to.be.equal('F');
    expect(weekDays[6]).to.be.equal('S');
  });
});
