// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import SubHeader from 'src/shared/components/subHeader';
import { SAME_DAY_SELECT_FORM } from 'src/shared/constants/formIds';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import i18n from '@swa-ui/locale';
import BoundSelectForm from 'src/shared/components/boundSelect/boundSelectForm';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import * as viewReservationActions from 'src/viewReservation/actions/viewReservationActions';

import type { ViewForSameDayPage, sameDaySelectionBoundData } from 'src/sameDay/flow-typed/sameDay.types';
import type { SameDayReservation } from 'src/shared/flow-typed/shared.types';

type Props = {
  isWebView: boolean,
  location: {
    state: SameDayReservation
  },
  retrieveSameDayBoundInformationFn: (sameDayUpdates: SameDayReservation, replace?: boolean) => void,
  retrieveSameDayShoppingInformationFn: (
    viewForSameDayPage: ViewForSameDayPage,
    selectedBoundIndex: number
  ) => void,
  selectedBound: sameDaySelectionBoundData,
  viewForSameDayPage: ViewForSameDayPage
};

export class SameDayBoundSelectionPage extends React.Component<Props> {
  componentDidMount() {
    const {
      isWebView,
      location,
      retrieveSameDayBoundInformationFn
    } = this.props;

    if (isWebView && location?.state?.body) {
      const { body, href, labelText, method } = location?.state ?? {};

      retrieveSameDayBoundInformationFn({ body, href, labelText, method }, true);
    }
  }

  _onSameDayContinueButtonClick = () => {
    const { retrieveSameDayShoppingInformationFn, viewForSameDayPage, selectedBound } = this.props;
    const selectedBoundIndex = selectedBound.firstbound ? 0 : 1;

    retrieveSameDayShoppingInformationFn(viewForSameDayPage, selectedBoundIndex);
  };

  render() {
    const { viewForSameDayPage, isWebView } = this.props;
    const {
      boundSelectionMessage,
      boundSelections = [],
      _meta: {
        showBoundSelection
      } = {}
    } = viewForSameDayPage ?? {};

    return showBoundSelection ? (
      <div className="same-day bound-selection">
        <SubHeader title={i18n('SAME_DAY_CHANGE_AND_STANDBY__TITLE')}></SubHeader>
        <div className="same-day--intro">
          <p data-qa="same-day-select-flights-message">{boundSelectionMessage}</p>
        </div>
        <BoundSelectForm
          formId={SAME_DAY_SELECT_FORM}
          onSubmit={this._onSameDayContinueButtonClick}
          boundSelections={boundSelections}
          selectType="radio"
          name="same-day"
          selectedBound={this.props.selectedBound}
        />
      </div>
    ) : (
      <div className="same-day">
        { isWebView && <SubHeader title={i18n('SAME_DAY_WEB_VIEW__TITLE')}></SubHeader> }
      </div>
    );
  }
}

export const mapStateToProps = (state: *) => ({
  selectedBound: _.get(state, `app.formData.${SAME_DAY_SELECT_FORM}.data`),
  viewForSameDayPage: _.get(state, 'app.viewReservation.viewForSameDayPage', {}),
  isWebView: state.app?.webView?.isWebView
});

const mapDispatchToProps = {
  retrieveSameDayBoundInformationFn: viewReservationActions.retrieveSameDayBoundInformation,
  retrieveSameDayShoppingInformationFn: sameDayActions.retrieveSameDayShoppingInformationMethod
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(SameDayBoundSelectionPage);
