// @flow
import React from 'react';
import NavItem from 'src/shared/components/navItem';
import Icon from 'src/shared/components/icon';

type Props = {
  index?: number,
  title?: string,
  onClick?: (number) => void
};

const TravelAdvisoryItem = (props: Props) => {
  const { title, onClick } = props;

  return (
    <NavItem className="travel-advisory-item" onClick={onClick}>
      <Icon type="exclamation-circle" className="travel-advisory-item--title-icon" />
      <span className="travel-advisory-item--title">{title}</span>
    </NavItem>
  );
};

export default TravelAdvisoryItem;
