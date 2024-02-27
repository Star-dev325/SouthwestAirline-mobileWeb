// @flow
import _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import Icon from 'src/shared/components/icon';
import i18n from '@swa-ui/locale';
import { SELECTION_MODE } from 'src/airChange/constants/airChangeConstants';
import { retrieveHourAndMinutesIgnoreTimezone, formatDate } from 'src/shared/helpers/dateHelper';
import { getSelectedBoundsKey } from 'src/airChange/transformers/airChangeSelectFormTransformer';
import FormRadioMarkField from 'src/shared/form/fields/formRadioMarkField';

import type { SelectionMode } from 'src/airChange/flow-typed/airChange.types';
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';
import type { sameDaySelectionBoundData } from 'src/sameDay/flow-typed/sameDay.types';

const { ALL, SINGLE } = SELECTION_MODE;

type Props = {
  boundSelections?: Array<BoundSelection>,
  selectionMode: SelectionMode,
  ineligibleBoundMessages?: Array<string>,
  showSwappedBounds?: boolean,
  onBoundsSelectedFn?: (string, boolean) => void,
  selectType?: string,
  name: string,
  updateField?: (boundsKey: string, value: boolean) => void,
  boundCancel?: boolean,
  selectedBound?: sameDaySelectionBoundData
};

class FlightAbstraction extends React.Component<Props> {
  static _renderTimeBlock(label: string, time: string, dataQa: string) {
    const formattedTime = retrieveHourAndMinutesIgnoreTimezone(time);

    return (
      <div className="inline-block" data-qa={dataQa}>
        <h4 className="gray4 regular small">{label}</h4>
        <p className="bold">
          <span className="xxlarge">{_.get(formattedTime, 'time')}</span>
          <span className="small">{_.get(formattedTime, 'period')}</span>
        </p>
      </div>
    );
  }

  _renderFlightAbstractionCell = (index: number, boundSelection: BoundSelection, isBoundEnabled: boolean) => {
    const { flight, flightType, fromAirport, originalDate, timeArrives, timeDeparts, toAirport, showWarningIcon } = boundSelection;
    const { name } = this.props;

    const isDepartingBound = flightType === 'Departure' || flightType === 'DEPARTURE';

    return (
      <div data-qa={`${isDepartingBound ? `${name}-flight-selection-departure` : `${name}-flight-selection-return`}`}>
        <div data-qa="flight-abstraction-itinerary" className="mb5 nowrap">
          <div className="flex flex-cross-center">
            {showWarningIcon && <Icon className="red pl1 pr2 py2" type="travel-alert" />}
            <div
              data-qa="flight-abstraction-departure-date-label"
              className={cx(isBoundEnabled ? 'bold' : 'bold gray5')}
            >
              {flightType}
            </div>
            <div className={cx('regular ml2', isBoundEnabled ? '' : 'gray5')}>
              {' '}
              - {formatDate(originalDate, 'ddd, MMM D, YYYY', true)}
            </div>
          </div>
          <p className={cx('regular', isBoundEnabled ? '' : 'gray5')}>From: {`${fromAirport}`}</p>
          <p className={cx('regular', isBoundEnabled ? '' : 'gray5')}>To: {`${toAirport}`}</p>
        </div>
        <div className="nowrap">
          <div className="pr3 inline-block align-top flight-abstraction--flight-number">
            <h4 className="gray4 regular small">{i18n('SHARED__BOUND_SELECT__FLIGHT')}</h4>
            <p className={cx('bold larger', isBoundEnabled ? '' : 'gray5')}>{flight}</p>
          </div>
          <div className={cx('inline-block nowrap', isBoundEnabled ? '' : 'gray5')}>
            {FlightAbstraction._renderTimeBlock(i18n('SHARED__BOUND_SELECT__DEPARTS'), timeDeparts, 'departs-time')}
            <div className="xlarge relative inline-block flight--icon-airplane-wrapper">
              <Icon type="airplane" className="mt4" />
            </div>
            {FlightAbstraction._renderTimeBlock(i18n('SHARED__BOUND_SELECT__ARRIVES'), timeArrives, 'arrives-time')}
          </div>
        </div>
      </div>
    );
  };

  componentDidMount() {
    const { updateField, selectType, selectedBound } = this.props;
    const isBoundSelected = selectedBound?.firstbound || selectedBound?.secondbound;

    !isBoundSelected && selectType === 'radio' && updateField && updateField('firstbound', true);
  }

  render() {
    const {
      boundSelections,
      selectionMode,
      ineligibleBoundMessages,
      showSwappedBounds = false,
      onBoundsSelectedFn,
      selectType,
      boundCancel
    } = this.props;

    const isBoundNotFlown = (index) => selectionMode === ALL || (selectionMode === SINGLE && index === 1);

    return (
      <div className="bgwhite bdb bdt">
        {_.map(boundSelections, (boundSelection: BoundSelection, index: number) => {
          const ineligibleBoundMessage = _.get(ineligibleBoundMessages, `${index}`);
          const boundsKey = boundCancel ? (boundSelection?.productId ?? '') : getSelectedBoundsKey(index, showSwappedBounds);

          return (
            <div data-qa="bound" className="flight-abstraction--bound" key={`flight-abstraction-${index}`}>
              {!_.isEmpty(ineligibleBoundMessage) && (
                <div
                  className="flight-abstraction--message"
                  data-qa="flight-bound-message"
                  dangerouslySetInnerHTML={{ __html: ineligibleBoundMessage }}
                />
              )}
              {selectType === 'checkbox' && (
                <div className="flight-abstraction--table" key={index}>
                  {(boundCancel && boundSelection.isSelectable) ||
                  (!boundCancel && isBoundNotFlown(index) && _.isEmpty(ineligibleBoundMessage)) ? (
                      <FormCheckboxField
                        name={boundsKey}
                        className="px5"
                        checkBoxClassName="flex2 flex flex-main-center"
                        childrenClassName="flex10"
                        size="large"
                        clickableChildren
                        onChange={(value) => onBoundsSelectedFn && onBoundsSelectedFn(boundsKey, value)}
                      >
                        {this._renderFlightAbstractionCell(index, boundSelection, true)}
                      </FormCheckboxField>
                    ) : (
                      <div className="flex px5">
                        <div className="flex2">&nbsp;</div>
                        <div className="flex10 ml2">
                          {this._renderFlightAbstractionCell(index, boundSelection, false)}
                        </div>
                      </div>
                    )}
                </div>
              )}
              {selectType === 'radio' && (
                <div className="flight-abstraction--table" key={index}>
                  <div className="px5 flex">
                    <FormRadioMarkField
                      name={boundsKey}
                      className="field bound-selection-field"
                      size="large"
                      callback={(value) => onBoundsSelectedFn && onBoundsSelectedFn(boundsKey, value)}
                    />
                    <div className="flex10">{this._renderFlightAbstractionCell(index, boundSelection, true)}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default FlightAbstraction;
