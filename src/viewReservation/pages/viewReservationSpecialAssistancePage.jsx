// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as FormDataActions from 'src/shared/actions/formDataActions';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import SpecialAssistancePage from 'src/shared/pages/specialAssistancePage';
import { transformNonAncillaryToFormData } from 'src/shared/transformers/nonChargeableAncillaryProductsTransformer';
import {
  VIEW_RESERVATION_SPECIAL_ASSISTANCE_FORM,
  VIEW_RESERVATION_TRAVEL_INFORMATION_FORM
} from 'src/shared/constants/formIds';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import { buildPathWithParamAndUniqueQuery } from 'src/shared/helpers/pathUtils';
import { isEmpty } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { SpecialAssistanceType, Push } from 'src/shared/flow-typed/shared.types';
import type { NonChargeableAncillaryProductsType } from 'src/viewReservation/flow-typed/viewReservation.types';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';

type Props = {
  clearFormDataByIdFn: (string) => {},
  goBack: () => void,
  location: HistoryLocationWithState<*>,
  nonChargeableAncillaryProducts?: NonChargeableAncillaryProductsType,
  push: Push,
  query: {
    searchToken?: string,
    passengerReference?: string
  },
  retrieveFlightAndTravelInformationWithSearchTokenFn: (searchToken: string, passengerReference: string) => void,
  savedFormData?: SpecialAssistanceType,
  specialAssistanceAnalyticsFn: (boolean) => void,
  specialAssistanceFormData?: *,
  updateFormDataValueFn: (string, *) => {},
};

export class ViewReservationSpecialAssistancePage extends React.Component<Props> {
  componentDidMount() {
    const { nonChargeableAncillaryProducts, query: { passengerReference, searchToken } = {}, retrieveFlightAndTravelInformationWithSearchTokenFn } = this.props;

    if (searchToken && isEmpty(nonChargeableAncillaryProducts)) {
      passengerReference && retrieveFlightAndTravelInformationWithSearchTokenFn(searchToken, passengerReference);
    }
  }

  _goBack = () => {
    const { goBack, location = {}, push, query: { passengerReference, searchToken } = {} } = this.props;
    const { isInternalNav = false } = location?.state || {};
    const queryParams = searchToken ? { passengerReference, searchToken, clearFormData: false } : { passengerReference };

    if (searchToken && !isInternalNav) {
      push(buildPathWithParamAndUniqueQuery(getNormalizedRoute({ routeName: 'travelerInformation' }), {
        passengerReference
      }, queryParams, true));
    } else {
      goBack();
    }
  };

  _onFormSubmit = () => {
    const {
      specialAssistanceFormData,
      updateFormDataValueFn,
      clearFormDataByIdFn,
      nonChargeableAncillaryProducts,
      specialAssistanceAnalyticsFn
    } = this.props;

    updateFormDataValueFn(VIEW_RESERVATION_TRAVEL_INFORMATION_FORM, { specialAssistance: specialAssistanceFormData });
    _.isEqual(specialAssistanceFormData, transformNonAncillaryToFormData(nonChargeableAncillaryProducts))
      ? specialAssistanceAnalyticsFn(false)
      : specialAssistanceAnalyticsFn(true);
    clearFormDataByIdFn(VIEW_RESERVATION_SPECIAL_ASSISTANCE_FORM);
    this._goBack();
  };

  render() {
    const { updateFormDataValueFn, savedFormData, nonChargeableAncillaryProducts } = this.props;
    let initialFormData;

    if (savedFormData) {
      initialFormData = _.merge({}, DEFAULT_FIELD_VALUES, savedFormData);
    } else {
      initialFormData = _.merge(
        {},
        DEFAULT_FIELD_VALUES,
        transformNonAncillaryToFormData(nonChargeableAncillaryProducts)
      );
    }

    return (
      <SpecialAssistancePage
        onSubmit={this._onFormSubmit}
        formId={VIEW_RESERVATION_SPECIAL_ASSISTANCE_FORM}
        goBack={this._goBack}
        initialFormData={initialFormData}
        updateFormDataValueFn={updateFormDataValueFn}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  specialAssistanceFormData: _.get(state, `app.formData.${VIEW_RESERVATION_SPECIAL_ASSISTANCE_FORM}.data`),
  savedFormData: _.get(state, `app.formData.${VIEW_RESERVATION_TRAVEL_INFORMATION_FORM}.data.specialAssistance`),
  nonChargeableAncillaryProducts: _.get(
    state,
    'app.viewReservation.travelInformationPage.response.editPNRPassengerPage.nonChargeableAncillaryProducts'
  )
});

const mapDispatchToProps = {
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  retrieveFlightAndTravelInformationWithSearchTokenFn: ViewReservationActions.retrieveFlightAndTravelInformationWithSearchToken,
  specialAssistanceAnalyticsFn: AnalyticsActions.specialAssistanceAnalytics,
  updateFormDataValueFn: FormDataActions.updateFormDataValue
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(ViewReservationSpecialAssistancePage);
