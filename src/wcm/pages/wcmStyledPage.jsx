// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import WCMStyledPageSection from 'src/wcm/components/wcmStyledPageSection';
import WCMStyledPageMenu from 'src/wcm/components/wcmStyledPageMenu';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';

import type { Push, WcmFooterType } from 'src/shared/flow-typed/shared.types';
import type { SectionType } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  styledPage: {
    title?: string,
    body?: Array<SectionType>,
    heroContainer?: *
  },
  wcmFetchActionFn: () => void,
  push: Push,
  footerLinkRows: Array<WcmFooterType>,
  isWebView: boolean
};
const WcmStyledPage = (wcmFetchAction: () => *, nodeName: string) => {
  class WcmStyledPageComponent extends React.Component<Props> {
    componentDidMount() {
      this.props.wcmFetchActionFn();
    }

    render() {
      const { footerLinkRows, isWebView } = this.props;
      const { title, body = [], heroContainer } = this.props.styledPage;
      const altText = _.get(heroContainer, 'altText', '');
      const heroSrc = _.get(heroContainer, 'image', undefined);

      return (
        <React.Fragment>
          <div className="medium">
            {heroSrc === undefined && <h1 className="m6"> {title} </h1>}
            {heroSrc !== undefined && <img className="heroContainer image fit" src={heroSrc} alt={altText} />}
          </div>
          <div>
            {body.map((section, index) => {
              if (section.type === 'section') {
                return <WCMStyledPageSection key={index} {...section} onCallToActionClick={wcmTransitionTo} />;
              } else if (section.type === 'menu') {
                return <WCMStyledPageMenu key={index} {...section} onClick={wcmTransitionTo} />;
              }
            })}
          </div>
          {!isWebView && <PageFooterWcmSourced footerLinkRows={footerLinkRows} />}
        </React.Fragment>
      );
    }
  }

  WcmStyledPageComponent.displayName = `${_.upperFirst(nodeName)}Page`;

  const mapStateToProps = (state) => ({
    styledPage: _.get(state, `app.wcmContent.${nodeName}.styledPage`) || {},
    footerLinkRows: _.get(state, 'app.wcmContent.footer.results.footer.content.placement.linkRows', []),
    isWebView: _.get(state, 'app.webView.isWebView')
  });

  const mapDispatchToProps = {
    wcmFetchActionFn: wcmFetchAction
  };

  const enhancers = _.flowRight(
    withConnectedReactRouter,
    withBodyClass('bgwhite'),
    connect(mapStateToProps, mapDispatchToProps)
  );

  return enhancers(WcmStyledPageComponent);
};

export default WcmStyledPage;
