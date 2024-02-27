// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import type { Node } from 'react';

type Props = {
  divided?: boolean,
  horizontal?: boolean,
  fluid?: boolean,
  children?: Node,
  className?: string
};

const List = (props: Props) => {
  const classes = {};

  classes.ui = true;
  classes.divided = !!props.divided;
  classes.horizontal = !!props.horizontal;
  classes.fluid = !!props.fluid;
  classes.list = true;
  const restProps = _.omit(props, ['divided', 'horizontal', 'children']);

  return (
    <div {...restProps} className={cx(props.className, classes)}>
      {props.children}
    </div>
  );
};

export default List;
