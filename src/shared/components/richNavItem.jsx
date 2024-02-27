// @flow

import React from 'react';
import cx from 'classnames';

import NavItem from 'src/shared/components/navItem';

import type { Node } from 'react';

type Props = {
  alt?: string,
  dataQa?: string,
  image?: string,
  target: string,
  title: string,
  description?: string,
  link_type: string,
  imageRender?: (?string, *) => Node,
  className?: string,
  onClick: ({ link_type: string, target: string }) => void
};

const RichNavItem = (props: Props) => {
  const { target = '/', onClick, title, description, imageRender, image, className, dataQa, link_type } = props;

  return (
    <NavItem className={cx('rich-nav-item', className)}>
      <a data-qa={dataQa} className="rich-nav-item--link" onClick={() => onClick && onClick({ link_type, target })}>
        <div className="main-col">
          <span className="rich-nav-item--title">{title}</span>
          <span className="rich-nav-item--description">{description}</span>
        </div>
        <div className="rich-nav-item--image-wrapper">
          {imageRender ? imageRender(image, props) : <img src={image} alt={props.alt} />}
        </div>
      </a>
    </NavItem>
  );
};

export default RichNavItem;
