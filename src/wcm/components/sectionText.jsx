// @flow

import React from 'react';

type Props = {
  sectionText: string
};

const SectionText = ({ sectionText }: Props) => {
  const _sectionTextAsInnerHtml = () => ({
    __html: sectionText
  });

  return <div className="mx6 mb6" dangerouslySetInnerHTML={_sectionTextAsInnerHtml()} />;
};

export default SectionText;
