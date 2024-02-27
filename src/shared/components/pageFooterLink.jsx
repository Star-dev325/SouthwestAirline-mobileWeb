// @flow
import React from 'react';
import _ from 'lodash';
import ContentLink from 'src/shared/components/contentLink';

type Props = {
  linkTarget: string,
  linkText: string,
  linkType: string,
  showSeparator?: boolean
};

const PageFooterLink = (props: Props) => {
  const routerTarget = props.linkType === 'browser' ? '_blank' : '_self';
  const id = _.snakeCase(props.linkText);

  return (
    <div className="page-footer-wcm--link" key={id}>
      <ContentLink href={props.linkTarget} id={id} target={routerTarget}>
        {props.linkText}
      </ContentLink>
      {!!props.showSeparator && <span className="page-footer-wcm--divider">|</span>}
    </div>
  );
};

export default PageFooterLink;
