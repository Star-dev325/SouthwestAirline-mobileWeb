import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '@swa-ui/locale';
import Icon from 'src/shared/components/icon';

export default class UpcomingTripsLink extends React.Component {
  render() {
    return (
      <Link to="/my-account/upcoming-trips" className="upcoming-trips-link">
        <span>{i18n('VIEW_RESERVATION__UPCOMING_TRIPS_LINK__VIEW_YOUR_UPCOMING_TRIPS')}</span>
        <Icon type="keyboard-arrow-right" />
      </Link>
    );
  }
}
