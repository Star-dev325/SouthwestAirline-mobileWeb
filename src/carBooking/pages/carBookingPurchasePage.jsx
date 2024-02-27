// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import LoginBanner from 'src/airBooking/components/loginBanner';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import CarBookingPurchaseForm from 'src/carBooking/components/carBookingPurchaseForm';
import type {
  CarBookingContactInfoType, CarResultVehicleType, DriverInfoType
} from 'src/carBooking/flow-typed/carBooking.types';
import TransformReservationCarRequestToApi from 'src/carBooking/transformers/reservationCarRequestTransformer';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import PageHeader from 'src/shared/components/pageHeader';
import { CAR_BOOKING_PURCHASE_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import type { Push, CurrencyType } from 'src/shared/flow-typed/shared.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  driverInfo: ?DriverInfoType,
  contactInfo: CarBookingContactInfoType,
  totalWithTaxesAndCurrencyCode: CurrencyType,
  reserveCarFn: (*, boolean) => void,
  showNativeAppLoginFn: () => void,
  isUserLoggedIn: boolean,
  isWebView: boolean,
  selectedCarResult: CarResultVehicleType,
  selectedExtras: Array<string>,
  push: Push
};

const contactFields = ['driverIsoCountryCode', 'driverPhoneNumber', 'confirmationEmail'];

export class CarBookingPurchasePage extends React.Component<Props> {
  _reserverCar = (formData: FormData) => {
    const { reserveCarFn, isUserLoggedIn, selectedCarResult, selectedExtras, driverInfo } = this.props;
    const requestData = _.merge({}, driverInfo, formData);
    const request = TransformReservationCarRequestToApi(requestData, selectedCarResult, selectedExtras);

    reserveCarFn(request, isUserLoggedIn);
  };

  _goToDriverInfoEdit = () => {
    this.props.push(getNormalizedRoute({ routeName: 'driverInfo' }));
  };

  render() {
    const { totalWithTaxesAndCurrencyCode, driverInfo, contactInfo, isUserLoggedIn, isWebView, showNativeAppLoginFn } =
      this.props;

    return (
      <div>
        <PageHeader>{i18n('CAR_BOOKING__PURCHASE')}</PageHeader>

        {isWebView && !isUserLoggedIn && <LoginBanner onClick={showNativeAppLoginFn} />}

        <CarBookingPurchaseForm
          formId={CAR_BOOKING_PURCHASE_FORM}
          isUserLoggedIn={isUserLoggedIn}
          driverInfo={isUserLoggedIn ? driverInfo : null}
          initialFormData={_.pick(contactInfo, contactFields)}
          onSubmit={this._reserverCar}
          totalWithTaxesAndCurrencyCode={totalWithTaxesAndCurrencyCode}
          onDriverInfoClick={this._goToDriverInfoEdit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  driverInfo: _.get(state, 'app.carBooking.userInfo.driverInfo'),
  contactInfo: _.get(state, 'app.carBooking.userInfo.contactInfo'),
  totalWithTaxesAndCurrencyCode: _.get(
    state,
    'app.carBooking.carPricingPage.carReservation.carReservationDetail.totalWithTaxesAndCurrencyCode'
  ),
  isWebView: _.get(state, 'app.webView.isWebView'),
  isUserLoggedIn: _.get(state, 'app.account.isLoggedIn', false),
  selectedCarResult: _.get(state, 'app.carBooking.carPricingPage.selectedCar'),
  selectedExtras: _.get(state, 'app.carBooking.carPricingPage.selectedExtras')
});

const mapDispatchToProps = {
  reserveCarFn: CarBookingActions.reserveCar,
  showNativeAppLoginFn: WebViewActions.showNativeAppLogin
};

const enhancers = _.flowRight(
  withBodyClass('car-booking_purchase'),
  withHideLoginButton,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CarBookingPurchasePage);
