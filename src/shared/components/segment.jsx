// @flow
import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import type { Node } from 'react';

type Props = {
  ordinality?: 'primary' | 'secondary' | 'tertiary',
  color?: string,
  inverted?: boolean,
  transparent?: boolean,
  fill?: boolean,
  label?: string,
  verticalFill?: boolean,
  horizontalFill?: boolean,
  className?: string | *,
  children: Node
};

const Segment = (props: Props) => {
  const { ordinality, color, verticalFill, horizontalFill, fill, label, transparent, inverted } = props;
  const classes = {};

  ordinality && (classes[ordinality] = !!ordinality);
  color && (classes[color] = !!color);
  classes['vertical-fill'] = verticalFill;
  classes['horizontal-fill'] = horizontalFill;
  classes.fill = fill;
  classes.transparent = transparent;
  classes.inverted = inverted;
  classes.segment = true;

  const restProps = _.omit(props, [
    'transparent',
    'fill',
    'verticalFill',
    'horizontalFill',
    'ordinality',
    'inverted',
    'label'
  ]);

  return (
    <div {...restProps} className={cx(props.className, classes)}>
      {label && <span className={'segment--title'}>{label}</span>}
      {props.children}
    </div>
  );
};

Segment.defaultProps = {
  inverted: false,
  transparent: false,
  fill: false,
  verticalFill: false,
  horizontalFill: false
};

export default Segment;
