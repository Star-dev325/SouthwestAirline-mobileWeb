// @flow
import React from 'react';

import type { Node } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

type Props = {
  className?: string,
  href?: ?string,
  id?: string,
  dataQa?: string,
  children?: Node,
  shouldOpenLinkInSelf?: boolean,
  raw?: ?string,
  hidden?: boolean,
  isWebView?: ?boolean,
  target?: string,
  onClick?: (*) => void
};

export const ContentLink = ({
  className,
  raw,
  onClick,
  href,
  id,
  children,
  dataQa,
  hidden,
  isWebView,
  target,
  shouldOpenLinkInSelf = true
}: Props) => {
  let component = null;

  const handleButtonClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick && onClick(event);
  };

  if (!hidden) {
    if (raw) {
      const finalHtml = isWebView && shouldOpenLinkInSelf ? raw.replace('_blank', '_self') : raw;

      component = (
        <span className={className} id={id} data-qa={dataQa} dangerouslySetInnerHTML={{ __html: finalHtml }} />
      );
    } else if (href && children) {
      const derivedTarget = isWebView ? '_self' : '_blank';

      component = (
        <a className={className} id={id} data-qa={dataQa} href={href} target={target || derivedTarget}>
          {children}
        </a>
      );
    } else if (onClick) {
      component = (
        <button className={`button--link ${className ? className : ''}`} id={id} onClick={handleButtonClick}>
          {children}
        </button>
      );
    } else {
      component = (
        <p className={className} id={id} data-qa={dataQa}>
          {children}
        </p>
      );
    }
  }

  return component;
};

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView')
});

export default connect(mapStateToProps, {})(ContentLink);
