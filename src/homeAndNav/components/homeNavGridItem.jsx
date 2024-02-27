// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import cx from 'classnames';

type Props = {
  iconType?: string,
  label?: string | *,
  onClick: (x: null, path: string) => void,
  className?: string,
  data_a?: string,
  dataQa?: string
};

const getProps = (props) => {
  const transformedProps = {
    className: cx('home-nav-grid-item', props.className),
    onClick: props.onClick,
    'data-a': props.data_a,
    'data-qa': props.dataQa
  };
  const { data_a } = props;

  if (data_a) {
    transformedProps['data-a'] = data_a;
  }

  if (props.dataQa) {
    transformedProps['data-qa'] = props.dataQa;
  }

  return transformedProps;
};

const HomeNavGridItem = ({ iconType, label, className, onClick, data_a, dataQa }: Props) => (
  <div {...getProps({ iconType, label, className, onClick, data_a, dataQa })}>
    <Icon className="home-nav-grid-item--icon" type={iconType} />
    <span>{label}</span>
  </div>
);

export default HomeNavGridItem;
