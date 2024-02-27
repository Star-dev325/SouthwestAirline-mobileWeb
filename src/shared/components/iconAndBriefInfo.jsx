// @flow
import React from 'react';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';

type Props = {
  linkIcon: string,
  linkSuffixClickableText: string,
  linkTitle: string,
  linkUrl?: string,
  onClick?: () => void,
  onIconAndBriefInfoClick?: () => void
};

const IconAndBriefInfo = (props: Props) => {
  const { linkIcon, linkSuffixClickableText, linkTitle, linkUrl, onIconAndBriefInfoClick } = props;

  return (
    <div className="icon-and-brief-info">
      <Icon className="icon-and-brief-info--icon" type={linkIcon} />
      <div className="icon-and-brief-info--info-container">
        <p className="icon-and-brief-info--text">{linkTitle}</p>
        { linkUrl ? (
          <a className="pblue" href={linkUrl} target="_blank">
            {linkSuffixClickableText}
          </a>
        ) : (
          <Button className="icon-and-brief-info--button" onClick={() => onIconAndBriefInfoClick && onIconAndBriefInfoClick()}>
            {linkSuffixClickableText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default IconAndBriefInfo;
