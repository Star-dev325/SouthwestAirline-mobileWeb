// @flow

import React from 'react';
import RichNavItem from 'src/shared/components/richNavItem';
import DeviceInfo from 'src/shared/helpers/deviceInfo';
import NavDrawerConstants from 'src/homeAndNav/constants/navDrawerConstants';

const { ANDROID_URL, IOS_URL } = NavDrawerConstants;

type Props = {
  onClick: ({ link_type: string, target: string }) => void
};

const GetTheAppNavItem = (props: Props) => {
  const { onClick } = props;
  const shouldNotRender = DeviceInfo.os.name !== 'Android' && DeviceInfo.os.name !== 'iOS';

  if (shouldNotRender) {
    return null;
  }

  const getTheAppImageRender = () => <div className="home-nav-list-item--image image-promo--swa-app" />;
  const getTheAppItem = {
    title: 'Get the app',
    description: 'Retrieve reservation, checkin for upcoming flights & more',
    link_type: 'browser',
    target: DeviceInfo.os.name === 'Android' ? ANDROID_URL : IOS_URL
  };

  return (
    <RichNavItem
      className="home-nav-list-item"
      imageRender={getTheAppImageRender}
      onClick={onClick}
      {...getTheAppItem}
    />
  );
};

export default GetTheAppNavItem;
