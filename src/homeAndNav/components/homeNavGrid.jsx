// @flow
import React from 'react';
import i18n from '@swa-ui/locale';
import HomeNavGridItem from 'src/homeAndNav/components/homeNavGridItem';
import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes.js';

type Props = {
  onNavGridItemClick: (path: string, isExternalPath: boolean) => void
};

const { index } = airBookingRoutes;
const HomeNavGrid = ({ onNavGridItemClick }: Props) => {
  const homeNavGridItems = [
    {
      data_a: 'BKFLT',
      dataQa: 'home-nav-book-a-flight',
      iconType: 'airplane-depart',
      isExternalPath: false,
      label: i18n('HOME_AND_NAV__BOOK_A_FLIGHT'),
      toPath: index.canonicalPath
    },
    {
      data_a: 'CHKIN',
      dataQa: 'home-nav-check-in',
      iconType: 'home-checkin',
      isExternalPath: false,
      label: i18n('HOME_AND_NAV__CHECK_IN'),
      toPath: '/check-in'
    },
    {
      data_a: 'SPOFFR',
      dataQa: 'home-nav-special-offers',
      iconType: 'home-special-offers-tag',
      isExternalPath: true,
      label: i18n('HOME_AND_NAV__SPECIAL_OFFERS'),
      toPath: 'https://www.southwest.com/html/specialoffers/air-offers.html'
    },
    {
      data_a: 'FLTSTATUS',
      dataQa: 'home-nav-flight-status',
      iconType: 'home-flight-status',
      isExternalPath: false,
      label: i18n('HOME_AND_NAV__FLIGHT_STATUS'),
      toPath: '/flight-status'      
    },
    {
      data_a: 'RPDRWD',
      dataQa: 'home-nav-rapid-rewards',
      iconType: 'home-rapid-rewards',
      isExternalPath: false,
      label: (
        <span>
          {i18n('HOME_AND_NAV__RAPID_REWARDS')}<sup>&reg;</sup>
        </span>
      ),
      toPath: '/rapid-rewards'
    },
    {
      data_a: 'MGTRIP',
      dataQa: 'home-nav-manage-trips',
      iconType: 'home-manage',
      isExternalPath: false,
      label: i18n('HOME_AND_NAV__MANAGE_TRIPS'),
      toPath: '/view-reservation'
    }
  ];

  return (
    <div className="home-nav-grid">
      {homeNavGridItems.map((item, itemIndex) => (
        <HomeNavGridItem
          data_a={item.data_a}
          dataQa={item.dataQa}
          iconType={item.iconType}
          key={itemIndex}
          label={item.label}
          onClick={() => onNavGridItemClick(item.toPath, item.isExternalPath)}
        />
      ))}
    </div>
  );
};

export default HomeNavGrid;
