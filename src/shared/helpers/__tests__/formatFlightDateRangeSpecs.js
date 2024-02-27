import formatFlightDateRange from 'src/shared/helpers/formatFlightDateRange';

describe('formatFlightDateRange', () => {
  context('one-way', () => {
    let originationDestinations;

    beforeEach(() => {
      originationDestinations = [
        {
          segments: [
            {
              departureDateTime: '2016-01-15T06:20:00.000-06:00',
              arrivalDateTime: '2016-01-15T07:20:00.000-06:00'
            }
          ]
        }
      ];
    });

    it('should get only one date', () => {
      const dateTime = formatFlightDateRange(originationDestinations);

      expect(dateTime).to.equal('Jan 15');
    });
  });

  context('round-trip', () => {
    it('should get same date range when flights in same day', () => {
      const originationDestinations = [
        {
          segments: [
            {
              departureDateTime: '2016-01-15T06:20:00.000-06:00',
              arrivalDateTime: '2016-01-15T07:20:00.000-06:00'
            }
          ]
        },
        {
          segments: [
            {
              departureDateTime: '2016-01-15T20:35:00.000-06:00',
              arrivalDateTime: '2016-01-15T21:40:00.000-06:00'
            }
          ]
        }
      ];

      const dateTime = formatFlightDateRange(originationDestinations);

      expect(dateTime).to.equal('Jan 15');
    });

    it('should show different day in same month when flights in different days', () => {
      const originationDestinations = [
        {
          segments: [
            {
              departureDateTime: '2016-01-15T06:20:00.000-06:00',
              arrivalDateTime: '2016-01-15T07:20:00.000-06:00'
            }
          ]
        },
        {
          segments: [
            {
              departureDateTime: '2016-01-17T16:55:00.000-06:00',
              arrivalDateTime: '2016-01-17T18:10:00.000-06:00'
            },
            {
              departureDateTime: '2016-01-17T20:35:00.000-06:00',
              arrivalDateTime: '2016-01-17T21:40:00.000-06:00'
            }
          ]
        }
      ];

      const dateTime = formatFlightDateRange(originationDestinations);

      expect(dateTime).to.equal('Jan 15 - 17');
    });

    it('should show different month when flights in different months', () => {
      const originationDestinations = [
        {
          segments: [
            {
              departureDateTime: '2016-01-31T06:20:00.000-06:00',
              arrivalDateTime: '2016-01-31T07:20:00.000-06:00'
            }
          ]
        },
        {
          segments: [
            {
              departureDateTime: '2016-02-03T16:55:00.000-06:00',
              arrivalDateTime: '2016-02-03T18:10:00.000-06:00'
            },
            {
              departureDateTime: '2016-02-03T20:35:00.000-06:00',
              arrivalDateTime: '2016-02-03T21:40:00.000-06:00'
            }
          ]
        }
      ];

      const dateTime = formatFlightDateRange(originationDestinations);

      expect(dateTime).to.equal('Jan 31 - Feb 3');
    });
  });
});
