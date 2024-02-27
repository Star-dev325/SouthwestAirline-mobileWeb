// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import i18n from '@swa-ui/locale';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import Container from 'src/shared/components/container';
import PageHeader from 'src/shared/components/pageHeader';
import Button from 'src/shared/components/button';
import Icon from 'src/shared/components/icon';
import RegisteredMark from 'src/myAccount/components/registeredMark';
import {
  getExclusivePromotions,
  getPromotionDetails,
  registerUserExclusivePromotion
} from 'src/myAccount/actions/myAccountActions';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';

import type { ExclusivePromotionSection } from 'src/myAccount/flow-typed/myAccount.types';
import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  push: Push,
  registerLink?: Link,
  isRegistered: boolean,
  promotionSections: Array<ExclusivePromotionSection>,
  showDialogFn: (*) => void,
  hideDialogFn: () => void,
  registerUserExclusivePromotionFn: (Link) => Promise<*>,
  isLoggedIn: boolean
};

type State = {
  promoIsRegistered: boolean
};

export class ExclusivePromotionDetailsPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      promoIsRegistered: props.isRegistered
    };
  }

  componentDidMount() {
    const { push, showDialogFn, hideDialogFn, promotionSections, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      push('/login', null, { to: '/my-account/my-rapid-rewards/promotions' });
    } else {
      _.isEmpty(promotionSections) &&
        showDialogFn({
          active: true,
          name: 'promotion-id-can-not-match-wcm',
          message: i18n('SHARED__ERROR_MESSAGES__DEFAULT_API_ERROR_LATER'),
          buttons: [
            {
              label: 'OK',
              onClick: () => hideDialogFn()
            }
          ]
        });
    }
  }

  _onRegisterClick = (registerLink: Link) => {
    this.props.registerUserExclusivePromotionFn(registerLink).then(() => {
      this.setState({ promoIsRegistered: true });
    });
  };

  _renderPageHeader = () => (
    <PageHeader>
      <a
        onClick={() => this.props.push('/my-account/my-rapid-rewards/promotions')}
        ref="gobackIcon"
        className="goback-link"
      >
        <Icon type="keyboard-arrow-left" />
      </a>
      <span className="header">{i18n('MY_ACCOUNT__PROMOTION_DETAILS_PAGE__PROMOTION_DETAILS')}</span>
    </PageHeader>
  );

  _renderRegisterButton = (isRegistered: boolean, registerLink?: Link) =>
    (isRegistered ? (
      <RegisteredMark />
    ) : (
      <div className="wrapper">
        <Button color="grey" size="large" fluid onClick={() => registerLink && this._onRegisterClick(registerLink)}>
          {i18n('MY_ACCOUNT__PROMOTION_DETAILS_PAGE__PROMOTION_REGISTER')}
        </Button>
      </div>
    ));

  _renderWCMSections = (sections: Array<*>) =>
    !_.isEmpty(sections) && (
      <div className="promotion-details--content">
        {_.map(sections, (sectionItem, idx: number) => (
          <section key={idx}>
            <h4>{sectionItem.name}</h4>
            <div dangerouslySetInnerHTML={{ __html: sectionItem.content }} />
          </section>
        ))}
      </div>
    );

  render() {
    const { registerLink, promotionSections } = this.props;
    const { promoIsRegistered } = this.state;

    return (
      <div className="promotion-details">
        {this._renderPageHeader()}
        <div className="promotion-detail--item">
          <Container>
            {this._renderRegisterButton(promoIsRegistered, registerLink)}
            {promotionSections && this._renderWCMSections(promotionSections)}
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  promotionSections: _.get(state, 'app.myAccountPages.exclusivePromotionDetailsPage.sections'),
  isRegistered: _.get(state, 'app.myAccountPages.exclusivePromotionDetailsPage.isRegistered'),
  registerLink: _.get(state, 'app.myAccountPages.exclusivePromotionDetailsPage._links.register'),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn')
});

const mapDispatchToProps = {
  showDialogFn: showDialog,
  hideDialogFn: hideDialog,
  getExclusivePromotionsFn: getExclusivePromotions,
  getPromotionDetailsFn: getPromotionDetails,
  registerUserExclusivePromotionFn: registerUserExclusivePromotion
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(ExclusivePromotionDetailsPage);
