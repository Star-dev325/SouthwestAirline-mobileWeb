// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { getSelectedBounds } from 'src/airChange/transformers/airChangeSelectFormTransformer';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import FlightAbstraction from 'src/shared/components/boundSelect/flightAbstraction';
import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import boundSelectValidator from 'src/shared/form/formValidators/boundSelectValidator';
import { store } from 'src/shared/redux/createStore';

import type { PassengerDetails, SelectionMode } from 'src/airChange/flow-typed/airChange.types';
import type { sameDaySelectionBoundData } from 'src/sameDay/flow-typed/sameDay.types';
import type { BoundSelection, SelectedBounds } from 'src/shared/flow-typed/boundSelect.types';

type Props = {
  boundCancel?: boolean,
  boundSelections: Array<BoundSelection>,
  cancelMessage?: string,
  formData: SelectedBounds,
  formId: string,
  ineligibleBoundMessages?: Array<string>,
  isDynamicWaiver: boolean,
  isReaccom?: boolean,
  isReaccomBlockMultiBoundSelection?: boolean,
  name: string,
  onSubmit: (*) => void,
  passengerDetails?: PassengerDetails,
  selectType?: string,
  selectedBound?: sameDaySelectionBoundData,
  selectionMode: SelectionMode,
  showSwappedBounds?: boolean
};

class BoundSelectForm extends React.Component<Props> {
  _onBoundsSelected = (boundsKey: string, value: boolean) => {
    const { isReaccom, isReaccomBlockMultiBoundSelection, boundSelections, selectType } = this.props;

    if (
      selectType === 'radio' ||
      (isReaccom && isReaccomBlockMultiBoundSelection && value && boundSelections.length === 2)
    ) {
      const otherFieldName = boundsKey === 'firstbound' ? 'secondbound' : 'firstbound';

      value ? this._updateField(otherFieldName, false) : this._updateField(boundsKey, true);
    }
  };

  _updateField = (boundsKey: string, value: boolean) => {
    const { formId } = this.props;

    store.dispatch(FormDataActions.updateFormFieldDataValue(formId, boundsKey, value));
  };

  _renderFlightChangePassengerDetails = (passengerDetails: PassengerDetails) => {
    const { passengerList, disclaimerTextWithLinks, title } = passengerDetails;

    return (
      <div className="passenger-details">
        <div className="disclaimer" dangerouslySetInnerHTML={{ __html: disclaimerTextWithLinks }}></div>
        <div className="passenger-list-wrap">
          <div className="passenger-list">{title}</div>
          {_.map(passengerList, ({ displayName }, key: number) => (
            <span key={key} className="passenger-name">
              {displayName}
            </span>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const {
      formId,
      onSubmit,
      isDynamicWaiver,
      boundSelections,
      selectionMode,
      ineligibleBoundMessages,
      showSwappedBounds,
      selectType,
      name,
      cancelMessage,
      boundCancel,
      passengerDetails,
      selectedBound
    } = this.props;

    return (
      <Form formId={formId} onSubmit={onSubmit}>
        <FlightAbstraction
          boundSelections={boundSelections}
          selectionMode={selectionMode}
          ineligibleBoundMessages={ineligibleBoundMessages}
          showSwappedBounds={showSwappedBounds}
          onBoundsSelectedFn={this._onBoundsSelected}
          selectType={selectType}
          name={name}
          updateField={this._updateField}
          boundCancel={boundCancel}
          selectedBound={selectedBound}
        />
        {passengerDetails && this._renderFlightChangePassengerDetails(passengerDetails)}
        {isDynamicWaiver && (
          <div className="pt5 px5 pb3 medium gray5" data-qa={`${name}-footer-message`}>
            {i18n('AIR_CHANGE__AIR_CHANGE_SELECT__FOOTER_MESSAGE')}
          </div>
        )}
        {boundCancel && cancelMessage && <p className="cancel-message">{cancelMessage}</p>}
        <Segment>
          <Button
            data-qa={`${name}-select-bound-continue-button`}
            className="change"
            type="submit"
            color="yellow"
            size="larger"
            fluid
          >
            {i18n('SHARED__BUTTON_TEXT__CONTINUE')}
          </Button>
        </Segment>
      </Form>
    );
  }
}

export default withForm({
  formValidator: boundSelectValidator,
  defaultValues: getSelectedBounds
})(BoundSelectForm);
