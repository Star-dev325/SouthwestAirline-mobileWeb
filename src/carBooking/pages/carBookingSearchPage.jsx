// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import CarBookingSearchForm from 'src/carBooking/components/carBookingSearchForm';
import { CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT } from 'src/carBooking/constants/carBookingConstants';
import withQueryOverrideSearchRequest from 'src/carBooking/enhancers/withQueryOverrideSearchRequest';
import type {
  CarLocationResponseType,
  CarVendorType,
  PartialSearchRequestType,
  SearchRequestType,
  VendorDiscountType
} from 'src/carBooking/flow-typed/carBooking.types';
import { hasDuplicatePromoCode } from 'src/carBooking/helpers/carBookingSearchRequestHelper';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import Container from 'src/shared/components/container';
import HideForWebView from 'src/shared/components/hideForWebView';
import PageHeader from 'src/shared/components/pageHeader';
import ShowForWebView from 'src/shared/components/showForWebView';
import { CAR_BOOKING_SEARCH_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import WithShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import { get, isEmpty } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as WcmActions from 'src/wcm/actions/wcmActions';

const BOOKABLE_DATE_FORMAT = 'YYYY-MM-DD';

type Props = {
  carLocations: Array<CarLocationResponseType>,
  carVendors: Array<CarVendorType>,
  findCarsFn: (*) => void,
  getRecentSearchesFromLocalStorageFn: () => void,
  isWebView?: boolean,
  lastBookableDate: string,
  previousSearchRequest: ?SearchRequestType,
  push: Push,
  retrieveCarLocationsFn: () => void,
  retrieveCarVendorImagesFn: (boolean) => void,
  retrieveCarVendorsFn: () => void,
  selectedSearchRequest: ?PartialSearchRequestType,
  updateFormFieldDataValueFn: (string, string, *) => void
};

type State = { isSubmitted: boolean };

export class CarBookingSearchPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isSubmitted: false };
  }

  componentDidMount() {
    const { getRecentSearchesFromLocalStorageFn, retrieveCarVendorImagesFn, retrieveCarLocationsFn, retrieveCarVendorsFn } = this.props;

    getRecentSearchesFromLocalStorageFn();
    retrieveCarLocationsFn();
    retrieveCarVendorImagesFn(false);
    retrieveCarVendorsFn();
  }

  _addVendorNameToDiscounts = (discounts: Array<VendorDiscountType>): Array<VendorDiscountType> => {
    const { carVendors } = this.props;
    let matchingVendor;

    for (const discount of discounts) {
      if (!isEmpty(discount.vendor)) {
        matchingVendor = carVendors.find((vendor) => discount.vendor === vendor.vendorId);
        discount.vendorName = get(matchingVendor, 'name', '');
      }
    }

    return discounts;
  };

  _filterDuplicateDiscounts = (discounts: Array<VendorDiscountType>): Array<VendorDiscountType> =>
    (hasDuplicatePromoCode(discounts) ? [discounts[0]] : discounts);

  _getCarLocationFromCode = (carLocationCode: string) =>
    this.props.carLocations.find((location) => location.airport.code === carLocationCode)

  _onSubmit = (formData: FormData) => {
    const { findCarsFn, updateFormFieldDataValueFn } = this.props;
    const {
      carCompany,
      departureAndReturnCities: { pickUp, dropOff },
      departureAndReturnDate: { pickUpDate, dropOffDate },
      discount,
      dropOffTime,
      pickUpTime,
      vehicleType
    } = formData;
    const discountsWithVendorNames = this._addVendorNameToDiscounts(discount);
    const discounts = this._filterDuplicateDiscounts(discountsWithVendorNames);
    const pickUpAirport = this._getCarLocationFromCode(pickUp);
    const dropOffAirport = this._getCarLocationFromCode(dropOff);

    const defaultedPickUpTime = pickUpTime ? pickUpTime : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT;
    const defaultedDropOffTimeTime = dropOffTime ? dropOffTime : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT;

    updateFormFieldDataValueFn(CAR_BOOKING_SEARCH_FORM, 'pickUpTime', defaultedPickUpTime);
    updateFormFieldDataValueFn(CAR_BOOKING_SEARCH_FORM, 'dropOffTime', defaultedDropOffTimeTime);
    updateFormFieldDataValueFn(CAR_BOOKING_SEARCH_FORM, 'departureAndReturnDate', {
      dropOffDate,
      isDateChanged: true,
      pickUpDate
    });

    this.setState({ isSubmitted: true });

    const searchRequest = {
      carCompany,
      discount: discounts,
      dropOff,
      dropOffAirport,
      dropOffDate,
      dropOffTime: defaultedDropOffTimeTime,
      pickUp,
      pickUpAirport,
      pickUpDate,
      pickUpTime: defaultedPickUpTime,
      vehicleType
    };

    findCarsFn(searchRequest);
  };

  _renderPageHeader = (pageHeaderText: string, pageHeaderClassName: string, linkClassName: string) => {
    const { push } = this.props;

    return (
      <PageHeader className={pageHeaderClassName} noBottomPadding>
        {pageHeaderText}
        <a
          className={linkClassName}
          onClick={() => {
            push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'recent' })));
          }}
        >
          {i18n('CAR_BOOKING__RECENT')}
        </a>
      </PageHeader>
    );
  };

  render() {
    const {
      carLocations,
      carVendors,
      isWebView,
      lastBookableDate,
      previousSearchRequest,
      retrieveCarLocationsFn,
      retrieveCarVendorsFn,
      selectedSearchRequest
    } = this.props;
    const { isSubmitted } = this.state;

    return (
      <div className="car-booking--landing">
        <ShowForWebView>
          {this._renderPageHeader(
            i18n('CAR_BOOKING__SEARCH'),
            'center caps bgsdkblue px0',
            'right white bold page-header--right-button center halfwidth bgsblue'
          )}
        </ShowForWebView>
        <HideForWebView>
          {this._renderPageHeader(i18n('CAR_BOOKING__BOOK_A_CAR'), '', 'right white regular page-header--right-button')}
        </HideForWebView>
        <Container>
          <CarBookingSearchForm
            carLocations={carLocations}
            carVendors={carVendors}
            formId={CAR_BOOKING_SEARCH_FORM}
            isSubmitted={isSubmitted}
            isWebView={isWebView}
            lastBookableDate={dayjs(lastBookableDate, BOOKABLE_DATE_FORMAT)}
            onSubmit={this._onSubmit}
            retrieveCarLocationsFn={retrieveCarLocationsFn}
            retrieveCarVendorsFn={retrieveCarVendorsFn}
            selectedSearchRequest={selectedSearchRequest ? selectedSearchRequest : previousSearchRequest}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lastBookableDate: dayjs()
    .add(_.get(state, 'app.wcmContent.applicationProperties.CAR_BOOKING_MAX_DAYS_OUT', 330), 'days')
    .format(BOOKABLE_DATE_FORMAT),
  carLocations: _.get(state, 'app.carBooking.carLocations'),
  carVendors: _.get(state, 'app.carBooking.carVendors'),
  selectedSearchRequest: _.get(state, 'app.carBooking.selectedSearchRequest'),
  previousSearchRequest: _.get(state, 'app.carBooking.carShoppingResultsPage.searchRequest'),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  findCarsFn: CarBookingActions.findCars,
  retrieveCarVendorsFn: CarBookingActions.retrieveCarVendors,
  retrieveCarLocationsFn: CarBookingActions.retrieveCarLocations,
  retrieveCarVendorImagesFn: WcmActions.retrieveCarVendorImages,
  getRecentSearchesFromLocalStorageFn: CarBookingActions.getRecentSearchesFromLocalStorage,
  updateFormFieldDataValueFn: FormDataActions.updateFormFieldDataValue
};

const enhancers = _.flowRight(
  withBodyClass('car-booking_search'),
  WithShowOnlyLoginButton,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withQueryOverrideSearchRequest
);

export default enhancers(CarBookingSearchPage);
