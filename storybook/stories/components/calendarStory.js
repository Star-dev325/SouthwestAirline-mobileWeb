import { storiesOf } from '@storybook/react';
import React from 'react';
import Calendar from 'src/shared/components/calendar/calendar';
import dayjs from 'dayjs';

storiesOf('components/calendar', module)
  .add('default', () => {
    function handleSelectionComplete(departureDate, returningDate) {
      console.log(`${departureDate.format('YYYY MM DD')} ${returningDate.format('YYYY MM DD')}`); // eslint-disable-line no-console
    }
    function handleCancel() {
      console.log('Nothing selected, cancel operation'); // eslint-disable-line no-console
    }
    return (
      <div>
        <Calendar
          tripType="roundTrip"
          maxReservationDate={dayjs({ year: 2016, month: 7, day: 20 })}
          initDepartureDate={dayjs()}
          initReturningDate={dayjs().add(5, 'days')}
          onSelectionComplete={handleSelectionComplete}
          onCancel={handleCancel}
        />
      </div>
    );
  })
  .add('with calendar schedule message', () => {
    const calendarScheduleMessage =
      'We are currently accepting air reservations through July 20, 2023. At this time, we do not have a date for our next schedule extension therefore please check back frequently.';

    return (
      <div>
        <Calendar
          tripType="roundTrip"
          maxReservationDate={dayjs({ year: 2023, month: 7, day: 20 })}
          initDepartureDate={dayjs()}
          initReturningDate={dayjs().add(5, 'days')}
          onSelectionComplete={() => {}}
          onCancel={() => {}}
          calendarScheduleMessage={calendarScheduleMessage}
        />
      </div>
    );
  });
