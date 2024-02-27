// @flow

import React from 'react';

type Props = {
  title?: string,
  icon: {
    src?: string
  },
  description?: string
};

const Alert = (props: Props) => (
  <div className="alert">
    <img className="icon" src={props.icon.src} />
    <div className="title">{props.title}</div>
    <div className="description" dangerouslySetInnerHTML={{ __html: props.description }} />
  </div>
);

export default Alert;
