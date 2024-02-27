// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Message from 'src/shared/components/message';
import SubHeader from 'src/shared/components/subHeader';
import Container from 'src/shared/components/container';
import FundResultsList from 'src/shared/components/fundResultsList';
import PriceTotalLine from 'src/shared/components/priceTotalLine';
import NavGroupItemLinks from 'src/shared/components/navGroupItemLinks';
import FlightSummaryCard from 'src/shared/components/flightSummaryCard/flightSummaryCard';
import EarlyBirdConfirmationNumber from 'src/earlyBird/components/earlyBirdConfirmationNumber';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import EarlyBirdFlightSummaryCardFooter from 'src/earlyBird/components/earlyBirdFlightSummaryCardFooter';
import { getEarlyBirdConfirmationPageResponse } from 'src/earlyBird/selectors/earlyBirdConfirmationPageSelector';
import i18n from '@swa-ui/locale';

import type { EarlyBirdConfirmationPageType } from 'src/earlyBird/flow-typed/earlyBird.types';
import type { PaymentInfo } from 'src/shared/flow-typed/shared.types';

type Props = {
  paymentInfo: PaymentInfo,
  earlyBirdConfirmationPage: EarlyBirdConfirmationPageType
};

export class EarlyBirdConfirmationPage extends React.Component<Props> {
  render() {
    const { recordLocator, earlyBirdPurchaseBounds, earlyBirdTotalPrice, billingInfo } =
      this.props.earlyBirdConfirmationPage;

    return (
      <div className="early-bird-confirmation">
        <SubHeader title="Confirmation" />
        <Container inverted>
          <Message status="success" className="early-bird-confirmation--message">
            {i18n('EARLY_BIRD_PURCHASE_CONFIRMATION_MESSAGES')}
          </Message>
        </Container>
        <Container>
          <EarlyBirdConfirmationNumber recordLocator={recordLocator} />
          {_.map(earlyBirdPurchaseBounds, (flightSummary, index: number) => (
            <FlightSummaryCard key={index} boundDetail={flightSummary.bound}>
              {!_.isEmpty(flightSummary.bound.passengers) && (
                <EarlyBirdFlightSummaryCardFooter
                  passengers={flightSummary.bound.passengers}
                  earlyBirdBoundPrice={flightSummary.bound.earlyBirdBoundPrice}
                  earlyBirdSubTotalPrice={flightSummary.bound.earlyBirdSubTotalPrice}
                />
              )}
            </FlightSummaryCard>
          ))}
        </Container>
        <div className="early-bird-price-total">
          <PriceTotalLine total={earlyBirdTotalPrice} type="total" title={i18n('EARLY_BIRD_TOTAL')} />
          <p className="early-bird-price-total--price-notes">{i18n('EARLY_BIRD_PRICE_TAXES')}</p>
        </div>
        <FundResultsList listTitle={i18n('SHARED__TRIP_BOOKED__AMOUNT_APPLIED')} billingInfo={billingInfo} />
        <Container>
          <NavGroupItemLinks />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  earlyBirdConfirmationPage: getEarlyBirdConfirmationPageResponse(state),
  paymentInfo: _.get(state, 'app.earlyBird.paymentInfo')
});

const enhancers = _.flowRight(withHideLoginButton, connect(mapStateToProps, {}));

export default enhancers(EarlyBirdConfirmationPage);
