// @flow

import React from 'react';

type Props = {
  onMessageChange?: (SyntheticInputEvent<*>) => void,
  className?: string,
  id?: string,
  placeholder?: string,
  rowCount: number,
  maxLength?: number,
  onChange: (SyntheticInputEvent<*>) => void,
  value?: string
};

const TextArea = (props: Props) => {
  const { className, id, placeholder, onMessageChange, rowCount, maxLength, onChange, value } = props;

  const _onChange = (event) => {
    onChange(event);
    onMessageChange && onMessageChange(event);
  };

  const textareaProps = {
    className: `text-area ${className ? className : ''}`,
    id,
    placeholder,
    onChange: _onChange,
    rows: rowCount,
    maxLength,
    ...(value ? { value } : {})
  };

  return (
    <div className={'text-area-container'}>
      <textarea {...textareaProps} />
    </div>
  );
};

export default TextArea;
