// @flow
import React from 'react';
import cx from 'classnames';

import type { Node } from 'react';

type Props = {
  className?: string,
  children: Node
};

const Segments = ({ className, children }: Props) => <div className={cx(className, 'segments')}>{children}</div>;

export default Segments;
