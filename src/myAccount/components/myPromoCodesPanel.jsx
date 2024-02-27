// @flow
import React from 'react';
import _ from 'lodash';

import MyAccountPanel from 'src/myAccount/components/myAccountPanel';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import MyAccountNavItem from 'src/myAccount/components/myAccountNavItem';
import List from 'src/shared/components/list';
import i18n from '@swa-ui/locale';

import type { PromoCodesContentType } from 'src/myAccount/flow-typed/myAccount.types';

type Props = {
  promoCodesContent: PromoCodesContentType,
  onClick: () => void,
  PROMO_CODE_IN_MY_ACCOUNT: boolean
};

const MyPromoCodesPanel = (props: Props) => {
  const { promoCodesContent, onClick } = props;

  const mainBody = promoCodesContent.find((content) => content.props.id === 'main-body');
  const viewPromoCodesLink = promoCodesContent.find((content) => content.props.id === 'learn-more-btn');

  const mainBodyContent = _.get(mainBody, 'textContent', i18n('MY_ACCOUNT__PROMO_CODES_CONSTANT__MAIN_BODY_TEXT'));
  const viewPromoCodesText = _.get(
    viewPromoCodesLink,
    'textContent',
    i18n('MY_ACCOUNT__PROMO_CODES_CONSTANT__VIEW_PROMO_CODES')
  );

  return (
    <MyAccountPanel heading={i18n('MY_ACCOUNT__PROMO_CODES')}>
      <Segments>
        <Segment className="promo-panel-content">
          <div className="main-body-content">{mainBodyContent}</div>
        </Segment>
        <Segment verticalFill className="segment-border-top py0">
          <List className="promo-codes-panel--links" divided horizontal>
            <MyAccountNavItem data-qa="click-view-promo-codes" className="py5" onClick={onClick}>
              {viewPromoCodesText}
            </MyAccountNavItem>
          </List>
        </Segment>
      </Segments>
    </MyAccountPanel>
  );
};

export default MyPromoCodesPanel;
