// @flow
import React from 'react';

type Props = {
  text: string
};

const InstructionText = (props: Props) => <div className="instruction">{props.text}</div>;

export default InstructionText;
