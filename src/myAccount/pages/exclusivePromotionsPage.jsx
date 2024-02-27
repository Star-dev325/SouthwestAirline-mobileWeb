// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import i18n from '@swa-ui/locale';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import SubHeader from 'src/shared/components/subHeader';
import Container from 'src/shared/components/container';
import PromotionCard from 'src/myAccount/components/promotionCard';
import {
  getExclusivePromotions,
  getPromotionDetails,
  registerUserExclusivePromotion
} from 'src/myAccount/actions/myAccountActions';

import type {
  ExclusivePromotionPageType,
  ExclusivePromotionType,
  ExclusivePromotionDetailsResponseType
} from 'src/myAccount/flow-typed/myAccount.types';
import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  push: Push,
  exclusivePromotions: ExclusivePromotionPageType,
  getExclusivePromotionsFn: () => void,
  getPromotionDetailsFn: (Link) => Promise<ExclusivePromotionDetailsResponseType>,
  registerUserExclusivePromotionFn: (Link) => void
};

export class ExclusivePromotionsPage extends Component<Props> {
  componentDidMount() {
    const { getExclusivePromotionsFn } = this.props;

    getExclusivePromotionsFn();
  }

  _onPromotionDetailClick = (detailsLink: Link) => {
    const { push, getPromotionDetailsFn } = this.props;

    getPromotionDetailsFn(detailsLink).then(() => {
      push('/my-account/promotion-detail');
    });
  };

  _onRegisterClick = (registerLink: Link) => {
    const { registerUserExclusivePromotionFn } = this.props;

    registerUserExclusivePromotionFn(registerLink);
  };

  _renderPromotionGroup = (filteredPromotionList: Array<ExclusivePromotionType>, isRegistered: boolean = false) => (
    <div className="promotions-page--group">
      <label>
        {filteredPromotionList.length}{' '}
        {isRegistered
          ? i18n('MY_ACCOUNT__PROMOTIONS_PAGE__REGISTERED_PROMOTIONS')
          : i18n('MY_ACCOUNT__PROMOTIONS_PAGE__ELIGIBLE_PROMOTIONS')}
      </label>
      {_.map(filteredPromotionList, (promotionItem, index: number) => (
        <PromotionCard
          key={`exclusive-promotion-${index}`}
          promotion={promotionItem}
          onPromotionDetailClick={this._onPromotionDetailClick}
          onRegisterClick={this._onRegisterClick}
        />
      ))}
    </div>
  );

  render() {
    const { exclusivePromotions } = this.props;

    if (_.isEmpty(exclusivePromotions)) return null;

    const { numberOfEligiblePromotions, eligiblePromotions, numberOfRegisteredPromotions, registeredPromotions } =
      exclusivePromotions;
    const numberOfPromotions = numberOfEligiblePromotions + numberOfRegisteredPromotions;

    if (numberOfPromotions === 0) {
      return (
        <Container className="promotions-page">
          <div className="promotions-page--group">
            <label>{i18n('MY_ACCOUNT__PROMOTIONS_PAGE__NO_PROMOTIONS_AVAILABLE')}</label>
          </div>
        </Container>
      );
    }

    return (
      <div className="my-rapid-rewards">
        <SubHeader title={'My Rapid Rewards'} />
        <Container className="promotions-page">
          {!_.isEmpty(eligiblePromotions) && this._renderPromotionGroup(eligiblePromotions)}
          {!_.isEmpty(registeredPromotions) && this._renderPromotionGroup(registeredPromotions, true)}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  exclusivePromotions: _.get(state, 'app.myAccountPages.exclusivePromotions')
});

const mapDispatchToProps = {
  getExclusivePromotionsFn: getExclusivePromotions,
  getPromotionDetailsFn: getPromotionDetails,
  registerUserExclusivePromotionFn: registerUserExclusivePromotion
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(ExclusivePromotionsPage);
