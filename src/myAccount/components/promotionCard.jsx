// @flow
import React from 'react';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import RegisteredMark from 'src/myAccount/components/registeredMark';
import i18n from '@swa-ui/locale';

import type { ExclusivePromotionType } from 'src/myAccount/flow-typed/myAccount.types';

type Props = {
  promotion: ExclusivePromotionType,
  onPromotionDetailClick: (Link) => void,
  onRegisterClick: (Link) => void
};

const PromotionCard = (props: Props) => {
  const _onClickPromotionDetail = (evt: Event) => {
    const {
      onPromotionDetailClick,
      promotion: {
        _links: { view }
      }
    } = props;

    evt.preventDefault();
    onPromotionDetailClick(view);
  };

  const _onClickRegister = (evt: Event) => {
    const {
      onRegisterClick,
      promotion: {
        _links: { register }
      }
    } = props;

    evt.preventDefault();
    register && onRegisterClick(register);
  };

  const {
    promotion: { title, subtitle, isRegistered }
  } = props;

  return (
    <Segment className="promotion-card">
      <Segment fill>
        <div className="promotion-card--info" onClick={_onClickPromotionDetail} data-qa="promotionCardInfo">
          <h4 className="promotion-card--title">{title}</h4>
          <p className="promotion-card--desc">{subtitle}</p>
          <p className="promotion-card--link">{i18n('MY_ACCOUNT__PROMOTION_CARD__PROMOTION_DETAILS')}</p>
        </div>
      </Segment>
      <Segment fill>
        {isRegistered ? (
          <RegisteredMark />
        ) : (
          <Button color="grey" size="large" fluid data-qa="registerButton" onClick={_onClickRegister}>
            {i18n('MY_ACCOUNT__PROMOTION_CARD__PROMOTION_REGISTER')}
          </Button>
        )}
      </Segment>
    </Segment>
  );
};

export default PromotionCard;
