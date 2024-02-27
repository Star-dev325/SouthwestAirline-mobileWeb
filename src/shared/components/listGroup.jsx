// @flow

import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

type Props = {
  onItemSelect: (*) => void,
  items: Array<*>,
  group: string
};

const ListGroup = (props: Props) => {
  const itemCards = props.items.map((item, id) => (
    <li className="flex" key={id}>
      <div onClick={item.disabled ? _.noop : () => props.onItemSelect(item)} className="flex-auto">
        <span className={cx('item-label', { disabled: item.disabled })}>
          {item.label} {item.disabled && item.disabledMessage}
        </span>
      </div>
    </li>
  ));

  return (
    <div className="list-group-container">
      <div className="list-group-header">{props.group}</div>
      <ul className="list-group">{itemCards}</ul>
    </div>
  );
};

export default ListGroup;
