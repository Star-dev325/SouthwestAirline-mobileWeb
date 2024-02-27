// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  title?: string,
  subtitle?: string,
  content?: string,
  icon: {
    src?: string,
    alt?: string
  }
};

const Item = (props: Props) => {
  const isAmenitiesSection = props.title === 'AMENITIES';
  const isTsaSection = props.title === 'TSA';

  return (
    <div className="item flex flex-main-between flex-cross-center">
      <div>
        <div className="title">{props.title}</div>
        <div
          data-qa="airport-info-item-subtitle"
          className={cx({
            bold: !isTsaSection
          })}
          dangerouslySetInnerHTML={{ __html: props.subtitle }}
        />
        <div
          className={cx('content', {
            'gray5 pt1': isTsaSection
          })}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
      {props.icon.src && (
        <div>
          <img
            data-qa="airport-info-icon"
            className={cx({
              'icon-height': isAmenitiesSection,
              'icon-width': !isAmenitiesSection
            })}
            src={props.icon.src}
            alt={props.icon.alt}
          />
        </div>
      )}
    </div>
  );
};

export default Item;
