// @flow
import React from 'react';

import ContentLink from 'src/shared/components/contentLink';

type Props = {
  hideFareRules?: boolean,
  shouldOpenLinkInSelf?: boolean,
  fareRulesWithLinks: ?string
};

const PriceSummaryNotice = ({ hideFareRules, fareRulesWithLinks, shouldOpenLinkInSelf }: Props) => (
  <div className="price-summary-notice">
    <ContentLink raw={fareRulesWithLinks} hidden={hideFareRules} shouldOpenLinkInSelf={shouldOpenLinkInSelf} />
  </div>
);

export default PriceSummaryNotice;
