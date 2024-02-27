// @flow
import React from 'react';
import _ from 'lodash';
import RichNavItem from 'src/shared/components/richNavItem';
import cx from 'classnames';
import GetTheAppNavItem from 'src/homeAndNav/components/getTheAppNavItem';
import type { HomePagePromotion } from 'src/homeAndNav/flow-typed/homeAndNav.types';

type Props = {
  homepagePromotions: Array<HomePagePromotion>,
  onNavListItemClick?: ({ link_type: string, target: string }) => void,
  className?: string
};

const HomeNavList = (props: Props) => {
  const { homepagePromotions, onNavListItemClick = _.noop, className } = props;
  const mergedClassName = cx('home-nav-list', className);
  const imageRender = (image) => <img src={image} />;

  return (
    <div className={mergedClassName}>
      <GetTheAppNavItem onClick={onNavListItemClick} />
      {_.map(homepagePromotions, (item, index: number) => (
        <RichNavItem
          className="home-nav-list-item"
          {...item}
          imageRender={imageRender}
          key={index}
          onClick={onNavListItemClick}
        />
      ))}
    </div>
  );
};

export default HomeNavList;
