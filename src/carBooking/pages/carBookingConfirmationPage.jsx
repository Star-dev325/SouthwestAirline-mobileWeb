// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PageHeader from 'src/shared/components/pageHeader';
import HideForWebView from 'src/shared/components/hideForWebView';
import WithHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import Container from 'src/shared/components/container';
import Message from 'src/shared/components/message';
import CarBookingDriverCard from 'src/carBooking/components/carBookingDriverCard';
import CarBookingTotalPrice from 'src/carBooking/components/carBookingTotalPrice';
import ConfirmFooter from 'src/carBooking/components/confirmFooter';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import i18n from '@swa-ui/locale';

import type { CarReservationType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carReservation: CarReservationType,
  bookingResponse: {
    confirmationNumber: string,
    driver: {
      firstName: string,
      lastName: string
    }
  },
  isWebView?: boolean,
  history: *,
  enableNavigationControlsFn: (boolean) => void,
  displayAppReviewFn: () => void
};

export class CarBookingConfirmationPage extends React.Component<Props> {
  componentDidMount() {
    const { isWebView, enableNavigationControlsFn, displayAppReviewFn } = this.props;

    if (isWebView) {
      enableNavigationControlsFn(false);
      displayAppReviewFn();
    }
  }

  render() {
    const {
      carReservation,
      bookingResponse: { confirmationNumber, driver },
      isWebView,
      history: { push }
    } = this.props;

    return (
      <div className="car-booking-confirmation">
        <PageHeader noBottomPadding>
          {i18n('CAR_BOOKING__PURCHASE_CONFIRMATION__HEADER')}
          {isWebView && (
            <a
              className="right white regular page-header--right-button"
              onClick={() => {
                push('/');
              }}
            >
              {i18n('CAR_BOOKING__DONE')}
            </a>
          )}
        </PageHeader>

        <Container inverted>
          <Message status="success" className="p0 small">
            <h3 className="xxlarge bold white inline-block">{i18n('CAR_BOOKING__PURCHASE_CONFIRMATION__TITLE')}</h3>
          </Message>
        </Container>

        <CarBookingDriverCard carReservation={carReservation} confirmationNumber={confirmationNumber} driver={driver} />

        <CarBookingTotalPrice carReservation={carReservation} />

        <HideForWebView>
          <ConfirmFooter />
        </HideForWebView>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carReservation: _.get(state, 'app.carBooking.carPricingPage.carReservation'),
  bookingResponse: _.get(state, 'app.carBooking.carBookingConfirmationPage.response'),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  enableNavigationControlsFn: WebViewActions.enableNavigationControls,
  displayAppReviewFn: WebViewActions.displayAppReview
};

const enhancers = _.flowRight(WithHideLoginButton, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(CarBookingConfirmationPage);
