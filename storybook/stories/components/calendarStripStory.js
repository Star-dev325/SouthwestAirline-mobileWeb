import _ from 'lodash';
import React from 'react';
import dayjs from 'dayjs';
import { storiesOf } from '@storybook/react';

import CalendarStrip from 'src/shared/components/calendar/calendarStrip';

storiesOf('components/calendarStrip', module)
  .add('default', () => {
    return (
      <div>
        <CalendarStrip
          defaultSelectedDate="2016-03-02"
          popupDate="2016-03-05"
          startDate={dayjs('2016-02-12')}
          endDate={dayjs('2016-03-20')}
          onDateSelected={_.noop}
        />
      </div>
    );
  })
  .add('disable', () => {
    return (
      <div>
        <CalendarStrip
          defaultSelectedDate="2016-03-02"
          startDate={dayjs('2016-02-12')}
          endDate={dayjs('2016-03-20')}
          disabled
          onDateSelected={_.noop}
        />
      </div>
    );
  })
  .add('dynamicWaiver', () => {
    return (
      <div>
        <CalendarStrip
          defaultSelectedDate="2016-03-02"
          startDate={dayjs('2016-02-12')}
          endDate={dayjs('2016-03-20')}
          dynamicWaiverStartDate={'2016-02-16'}
          dynamicWaiverEndDate={'2016-03-02'}
          onDateSelected={_.noop}
        />
      </div>
    );
  });
