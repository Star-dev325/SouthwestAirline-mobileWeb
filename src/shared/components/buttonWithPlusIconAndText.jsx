// @flow

import _ from 'lodash';
import React from 'react';
import type { Node } from 'react';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';

type Props = {
  disabled?: boolean,
  onClick: () => void,
  children?: Node
};

const ButtonWithPlusIconAndText = (props: Props) => {
  const _getProps = () => {
    const defaultProps = {
      className: 'button-with-plus-icon-and-text',
      color: 'grey',
      disabled: false,
      fluid: true,
      onClick: _.noop,
      size: 'large',
      type: 'button'
    };

    return _.merge({}, defaultProps, props);
  };

  return (
    <Button {..._getProps()}>
      <Icon className="button-with-plus-icon-and-text--icon" type={'plus-icon'}>
        +
      </Icon>
      <span className="button-with-plus-icon-and-text--text">{props.children}</span>
    </Button>
  );
};

export default ButtonWithPlusIconAndText;
