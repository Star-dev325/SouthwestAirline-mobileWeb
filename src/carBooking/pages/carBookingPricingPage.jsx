// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import CarExtrasForm from 'src/carBooking/components/carExtrasForm';
import type { CarExtraProductType, CarReservationType } from 'src/carBooking/flow-typed/carBooking.types';
import { mapSelectedCarExtras } from 'src/carBooking/transformers/carReservationTransformer';
import CarReservation from 'src/shared/components/carReservation';
import PageHeader from 'src/shared/components/pageHeader';
import { CAR_BOOKING_PRICING_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import WithShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  carReservation: CarReservationType,
  carExtras: Array<CarExtraProductType>,
  productId: string,
  saveSelectedExtrasFn: (Array<string>) => void,
  saveCarReservationFn: (CarReservationType) => void,
  loadUserAccountInfoFn: (string) => void,
  isUserLoggedIn: boolean,
  push: Push,
  saveUserAccountDriverInfoFn: (*) => void,
  saveUserAccountContactInfoFn: (*) => void,
  isWebView?: boolean
};

export class CarBookingPricingPage extends React.Component<Props> {
  _saveSelectedExtras = (formData: FormData) => {
    const {
      saveSelectedExtrasFn,
      saveCarReservationFn,
      loadUserAccountInfoFn,
      isUserLoggedIn,
      push,
      saveUserAccountDriverInfoFn,
      saveUserAccountContactInfoFn,
      carReservation,
      carExtras
    } = this.props;

    const selectedCarExtras = _.compact(
      _.map(formData, (value, key) => {
        if (value) {
          return key;
        }
      })
    );
    const purchaseNormalizedRoute = getNormalizedRoute({ routeName: 'purchase' });

    saveSelectedExtrasFn(selectedCarExtras);
    saveCarReservationFn({
      carReservationItinerary: carReservation.carReservationItinerary,
      carReservationDetail: {
        ...carReservation.carReservationDetail,
        selectedCarExtras: mapSelectedCarExtras(carExtras, selectedCarExtras)
      }
    });

    if (isUserLoggedIn) {
      loadUserAccountInfoFn(purchaseNormalizedRoute);
    } else {
      saveUserAccountDriverInfoFn({});
      saveUserAccountContactInfoFn({});
      push(purchaseNormalizedRoute);
    }
  };

  render() {
    const { carExtras, productId, carReservation, isWebView, push } = this.props;

    return (
      <div>
        <PageHeader>{i18n('CAR_BOOKING__PRICE')}</PageHeader>
        <CarReservation {...carReservation} />
        <CarExtrasForm
          formId={CAR_BOOKING_PRICING_FORM}
          productId={productId}
          className="p4 car-extras-form-content"
          carExtras={carExtras}
          carReservation={carReservation}
          onSubmit={this._saveSelectedExtras}
          isWebView={isWebView}
          push={push}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carReservation: _.omit(
    _.get(state, 'app.carBooking.carPricingPage.carReservation'),
    'carReservationDetail.selectedCarExtras'
  ),
  productId: _.get(state, 'app.carBooking.carPricingPage.response.productId'),
  carExtras: _.get(state, 'app.carBooking.carPricingPage.response.extras', []),
  isUserLoggedIn: _.get(state, 'app.account.isLoggedIn', false),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  loadUserAccountInfoFn: CarBookingActions.loadUserAccountInfo,
  saveSelectedExtrasFn: CarBookingActions.saveSelectedExtras,
  saveCarReservationFn: CarBookingActions.saveCarReservation,
  saveUserAccountDriverInfoFn: CarBookingActions.saveUserAccountDriverInfo,
  saveUserAccountContactInfoFn: CarBookingActions.saveUserAccountContactInfo
};

const enhancers = _.flowRight(
  withBodyClass('car-booking_price'),
  WithShowOnlyLoginButton,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CarBookingPricingPage);
