// @flow

import React from 'react';
import SwitchButton from 'src/shared/components/switchButton';
import Button from 'src/shared/components/button';
import cx from 'classnames';

import type { Node } from 'react';

type Option = {
  label: string,
  value: string
};

type Props = {
  alignLeft?: boolean,
  backgroundColorSelection?: boolean,
  className?: string,
  color?: string,
  elementClassName?: string,
  grayText?: boolean,
  isVerticallyAligned?: boolean,
  options: Array<Option>,
  removeBorder?: boolean,
  removeShadows?: boolean,
  size?: string
};

type ButtonProps = {
  size?: string,
  color?: string
};

const RadioInput = (props: Props) => {
  const { alignLeft, backgroundColorSelection = false, className, color, elementClassName, grayText, isVerticallyAligned, options, removeBorder, removeShadows, size } = props;
  
  const _itemRender = (itemLabel: string | Node | number, active: boolean) => {
    const buttonProps: ButtonProps = { size, color };

    return (
      <Button
        {...buttonProps}
        className={elementClassName}
        color={active && backgroundColorSelection ? 'primary-blue' : 'white'}
        fluid
      >
        <div className={cx({ 'radio-input--padding-left': alignLeft, 'radio-input--gray-text': grayText })}>
          {itemLabel}
        </div>
        {!backgroundColorSelection && <span className={cx(
          { 'radio-input--mark': true,
            'radio-input--mark_left': alignLeft,
            'radio-input--mark_clickable': isVerticallyAligned
          })} />}
      </Button>
    );
  };

  return (
    <SwitchButton
      {...props}
      className={cx('radio-input', className)}
      isVerticallyAligned={isVerticallyAligned}
      itemClickable
      itemRender={_itemRender}
      options={options}
      removeBorder={removeBorder}
      removeShadows={removeShadows}
    />
  );
};

export default RadioInput;
