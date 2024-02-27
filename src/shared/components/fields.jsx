// @flow
import React from 'react';
import cx from 'classnames';

/**
 * Fields. need to work with `Field` and `Form`
 */

type Props = {
  type?: 'row' | 'inline' | 'grouped' | 'fluid',
  label?: string,
  secondaryLabel?: string,
  divided?: boolean,
  children?: *,
  className?: string
};

const Fields = (props: Props) => {
  const { type, label, divided, className, children, secondaryLabel } = props;

  const classes = {};

  type && (classes[type] = true);

  return (
    <div className={cx('fields', className, { divided: !!divided }, classes)}>
      {label && <label className="fields--label">{label}</label>}
      {secondaryLabel && <label className="fields--secondary-label">{secondaryLabel}</label>}
      {children}
    </div>
  );
};

export default Fields;
