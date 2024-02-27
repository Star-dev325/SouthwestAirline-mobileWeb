import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

export const calendarScheduleMessage = (state = '', action = {}) => {
  switch (action.type) {
    case SharedActionTypes.SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE: {
      return action.calendarScheduleMessage;
    }
    default:
      return state;
  }
};
