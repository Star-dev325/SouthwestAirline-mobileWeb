import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, withRouter } from 'react-router';
import SameDayBoundSelectionPage from 'src/sameDay/pages/sameDayBoundSelectionPage';
import SameDayPaymentPage from 'src/sameDay/pages/sameDayPaymentPage';
import SameDayPriceDifferencePage from 'src/sameDay/pages/sameDayPriceDifferencePage';
import SameDayPurchaseConfirmationPage from 'src/sameDay/pages/sameDayPurchaseConfirmationPage';
import SameDayRefundMethodPage from 'src/sameDay/pages/sameDayRefundMethodPage';
import SameDaySelectFarePage from 'src/sameDay/pages/sameDaySelectFarePage.jsx';
import SameDayShoppingPage from 'src/sameDay/pages/sameDayShoppingPage';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';
import FareDetailsPage from 'src/wcm/pages/fareDetails';

class SameDay extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="same-day">
        <Route exact path={`${match.url}/bound-selection`} component={SameDayBoundSelectionPage} />
        <Route exact path={`${match.url}/confirmation`} component={SameDayPurchaseConfirmationPage} />
        <Route exact path={`${match.url}/price-difference`} component={SameDayPriceDifferencePage} />
        <Route exact path={`${match.url}/price-difference/paypal`} component={SameDayPriceDifferencePage} />
        <Route exact path={`${match.url}/price-difference/paypal-canceled`} component={SameDayPriceDifferencePage} />
        <Route exact path={`${match.url}/pricing/payment`} component={SameDayPaymentPage} />
        <Route exact path={`${match.url}/refund-method`} component={SameDayRefundMethodPage} />
        <Route exact path={`${match.url}/refund-method/paypal`} component={SameDayRefundMethodPage} />
        <Route exact path={`${match.url}/refund-method/paypal-canceled`} component={SameDayRefundMethodPage} />
        <Route exact path={`${match.url}/refund-method/payment`} component={SameDayPaymentPage} />
        <Route exact path={`${match.url}/shopping/fare-details`} component={FareDetailsPage} />
        <Route exact path={`${match.url}/shopping/select-fare`} component={SameDaySelectFarePage} />
        <Route exact path={`${match.url}/shopping`} component={SameDayShoppingPage} />
      </div>
    );
  }
}

SameDay.propTypes = {
  match: PropTypes.object
};

const enhancers = _.flowRight(withRouter, withRouterHandler);

export default enhancers(SameDay);
