import React from 'react';
import _ from 'lodash';

import { mount } from 'enzyme';
import i18n from '@swa-ui/locale';
import CompanionReservationInfo from 'src/viewReservation/components/companionReservationInfo';

describe('CompanionReservationInfo', () => {
  let companionReservationInfo;

  it('should display companion name', () => {
    companionReservationInfo = createComponent();

    expect(companionReservationInfo).to.contain.text('COMPANION');
    expect(companionReservationInfo).to.contain.text('Iverson Li');
  });

  it('should display companion recordLocator', () => {
    companionReservationInfo = createComponent();

    expect(companionReservationInfo.find('ConfirmationNumber')).to.have.prop('confirmationNumber', 'HN2L3R');
  });

  it('should show "must checkin separately" messag', () => {
    companionReservationInfo = createComponent();
    expect(companionReservationInfo).to.contain.text(
      i18n('VIEW_RESERVATION__BOARDING_INFO__COMPANION_RESERVATION_MESSAGE')
    );
  });

  it('should not display companion info when user is not logged in', () => {
    companionReservationInfo = createComponent({ isUserLoggedIn: false });

    expect(companionReservationInfo.find('.trip-details-companion-info')).to.not.exist;
  });

  const createComponent = (props = {}) => {
    const options = {
      companion: {
        name: 'Iverson Li',
        confirmationNumber: 'HN2L3R',
        firstName: 'Iverson',
        lastName: 'Li'
      },
      isUserLoggedIn: true,
      isInternational: false,
      onDetailsButtonClick: () => {}
    };

    return mount(<CompanionReservationInfo {..._.merge({}, options, props)} />);
  };
});
