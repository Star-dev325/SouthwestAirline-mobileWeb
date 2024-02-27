// @flow
import React from 'react';

type Props = {
  body: Array<*>
};

const Overlay = ({ body }: Props) => {
  const getHTML = (content) => ({ __html: content });

  return (
    <div className="wcm-content">
      {body.map((element, index) => {
        if (element.type === 'heading') {
          return <div key={index} className="heading" dangerouslySetInnerHTML={getHTML(element.value)} />;
        } else {
          return <div key={index} dangerouslySetInnerHTML={getHTML(element.value)} />;
        }
      })}
    </div>
  );
};

export default Overlay;
