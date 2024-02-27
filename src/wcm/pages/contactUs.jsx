// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { retrieveContactUs } from 'src/wcm/actions/wcmActions';
import ContactUsItem from 'src/wcm/components/contactUsItem';
import PageHeader from 'src/shared/components/pageHeader';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

import type { WcmFooterType } from 'src/shared/flow-typed/shared.types';

type Props = {
  webContent: {
    title: ?string,
    description: ?string,
    primaryCTAText: ?string,
    primaryCTALink: ?string,
    contentBlock: ?Array<*>
  },
  retrieveContactUsFn: () => void,
  footerLinkRows: Array<WcmFooterType>,
  isWebView: boolean
};

export class ContactUs extends React.Component<Props> {
  componentDidMount() {
    this.props.retrieveContactUsFn();
  }

  render() {
    const {
      webContent: { title, description, primaryCTAText, primaryCTALink, contentBlock = [] },
      footerLinkRows,
      isWebView
    } = this.props;

    return (
      <div>
        <PageHeader data-qa="page-title" className="lineheight20">
          {title}
        </PageHeader>
        <div className="pt6 px4">
          <div className="gray5 my6 lineheight14 large" dangerouslySetInnerHTML={{ __html: description }} />
          <div className="contact-us--call-to-action yellow">
            <a href={primaryCTALink}>{primaryCTAText}</a>
          </div>
          {!!contentBlock &&
            contentBlock.map((block, index) => (
              <div data-qa="contact-us-block" className="mt6" key={index}>
                <h3 className="pt6 pb4 bdt bdgray2 gray5 medium regular caps" data-qa="block-title">
                  {block.blockName}
                </h3>
                <ul className="clearfix m0">
                  {block.items.map((item, idx: string) => (
                    <ContactUsItem key={idx} {...item} />
                  ))}
                </ul>
              </div>
            ))}
        </div>
        {!isWebView && <PageFooterWcmSourced footerLinkRows={footerLinkRows} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  webContent: _.get(state, 'app.wcmContent.contactUs') || {},
  footerLinkRows: _.get(state, 'app.wcmContent.footer.results.footer.content.placement.linkRows', []),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withBodyClass('bgwhite'),
  connect(mapStateToProps, {
    retrieveContactUsFn: retrieveContactUs
  })
);

export default enhancers(ContactUs);
