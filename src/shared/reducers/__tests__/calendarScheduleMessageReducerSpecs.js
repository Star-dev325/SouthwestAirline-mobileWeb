import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import { calendarScheduleMessage as calendarScheduleMessageReducer } from 'src/shared/reducers/calendarScheduleMessageReducer';

describe('calendarScheduleMessageReducer', () => {
  const initialState = '';

  it('should have correct initial state', () => {
    expect(
      calendarScheduleMessageReducer(undefined, {
        type: 'INVALID_ACTION'
      })
    ).to.deep.equal(initialState);
  });

  it('should return calendarScheduleMessage when updateCalendarScheduleMessage is dispatched', () => {
    const state = calendarScheduleMessageReducer(null, {
      type: SharedActionTypes.SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE,
      calendarScheduleMessage: 'test calendar schedule message'
    });

    expect(state).to.be.deep.equal('test calendar schedule message');
  });

  it('should return default state when action is undefined', () => {
    expect(calendarScheduleMessageReducer().response).to.deep.equal(undefined);
  });
});
