// @flow
import React, { Component } from 'react';

import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';

import type { BookingTeaserType } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  bookingTeaser: ?BookingTeaserType,
  retrieveBookingTeaserFn: () => void,
  onClickBookATrip: () => void
};
export class BookingTeaser extends Component<Props> {
  componentDidMount() {
    this.props.retrieveBookingTeaserFn();
  }

  render() {
    const { bookingTeaser, onClickBookATrip } = this.props;

    return (
      <div>
        {bookingTeaser && (
          <Segments className="relative">
            <img className="fit mt1" src={bookingTeaser.image} alt={bookingTeaser.alt_text} />
            {bookingTeaser.image ? (
              <Segment className="booking-teaser-btn-wrapper absolute fullwidth">
                <Button data-qa="book-a-trip-btn" onClick={onClickBookATrip} color="yellow" size="larger" fluid>
                  {i18n('MY_ACCOUNT__TEASER__BOOK_A_TRIP')}
                </Button>
              </Segment>
            ) : null}
          </Segments>
        )}
      </div>
    );
  }
}

export default BookingTeaser;
