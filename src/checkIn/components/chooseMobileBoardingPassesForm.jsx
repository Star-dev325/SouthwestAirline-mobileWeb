// @flow

import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import Fields from 'src/shared/components/fields';
import Field from 'src/shared/components/field';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import Icon from 'src/shared/components/icon';
import Button from 'src/shared/components/button';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import { store } from 'src/shared/redux/createStore';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import chooseMobileBoardingPassesValidator from 'src/shared/form/formValidators/chooseMobileBoardingPassesValidator';
import ChooseMobileBoardingPassesConstants from 'src/checkIn/constants/chooseMobileBoardingPassesConstants';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

const { ALL_PASSES_FIELD_NAME } = ChooseMobileBoardingPassesConstants;

type Props = {
  formId: string,
  onSubmit: (*) => void,
  flights: Array<*>,
  formData: FormData
};

class ChooseMobileBoardingPassesForm extends React.Component<Props> {
  _allPassesChanged = (newValue: boolean) => {
    this._setAllOtherCheckBoxes(newValue);
  };

  _setAllOtherCheckBoxes = (newValue: boolean) => {
    const { formId, flights } = this.props;

    _.forEach(flights, (flight, flightIndex: number) => {
      _.forEach(flight.passengers, (passenger) => {
        const fieldName = _buildFieldName(flightIndex, passenger);
        const isFieldEnabled = _isEligibleForBoardingPass(passenger);

        isFieldEnabled && store.dispatch(FormDataActions.updateFormFieldDataValue(formId, `${fieldName}`, newValue));
      });
    });
  };

  _passengerCheckboxChanged = (fieldName: string, newValue: boolean) => {
    const { formId, formData } = this.props;

    if (ALL_PASSES_FIELD_NAME !== fieldName && !newValue) {
      store.dispatch(FormDataActions.updateFormFieldDataValue(formId, ALL_PASSES_FIELD_NAME, false));
    }

    const hasFalseValues = !_.isEmpty(_.chain(formData).omit(ALL_PASSES_FIELD_NAME).omit(fieldName).omitBy().value());

    if (ALL_PASSES_FIELD_NAME !== fieldName && newValue && !hasFalseValues) {
      store.dispatch(FormDataActions.updateFormFieldDataValue(formId, ALL_PASSES_FIELD_NAME, true));
    }
  };

  render() {
    const { formId, onSubmit, flights } = this.props;
    const shouldShowBoundsLabel = flights.length > 1;

    return (
      <div>
        <Form formId={formId} className="choose-mobile-boarding-passes-form" onSubmit={onSubmit}>
          <Segments>
            <Segment
              className="choose-mobile-boarding-passes-segment--label"
              ordinality="secondary"
              data-qa="form-header-message"
            >
              {i18n('CHECK_IN__MOBILE_BOARDING_PASS__CHOOSE_PASSES_MESSAGE')}
            </Segment>

            <Fields className="fields" type="grouped" divided>
              <FormCheckboxField
                name={ALL_PASSES_FIELD_NAME}
                data-qa={`checkbox-${ALL_PASSES_FIELD_NAME}`}
                className="checkbox-button"
                clickableChildren
                onChange={this._allPassesChanged}
              >
                {i18n('CHECK_IN__MOBILE_BOARDING_PASS__ALL_PASSES_CHECKBOX_LABEL')}
              </FormCheckboxField>
            </Fields>

            {_.map(flights, (flight, flightIndex: number) => (
              <Fields className="fields" type="grouped" divided key={flightIndex}>
                {shouldShowBoundsLabel && (
                  <div className="bounds-label" data-qa="flight-bounds-label">
                    {flight.originAirportCode}
                    <Icon type="airplane" />
                    {flight.destinationAirportCode}
                  </div>
                )}
                {_.map(flight.passengers, (passenger) => {
                  const fieldName = _buildFieldName(flightIndex, passenger);
                  const isFieldEnabled = _isEligibleForBoardingPass(passenger);
                  const passengerLabel = passenger.isInfant ? ` ${i18n('SHARED__LAP_CHILD__TITLE_LAP_CHILD')}` : '';

                  return (
                    <Field key={fieldName}>
                      <FormCheckboxField
                        name={fieldName}
                        data-qa={`checkbox-${fieldName}`}
                        className={cx('checkbox-button', { disabled: !isFieldEnabled })}
                        clickableChildren
                        onChange={(value) => this._passengerCheckboxChanged(fieldName, value)}
                      >
                        {`${passenger.name}${passengerLabel}`}
                      </FormCheckboxField>
                    </Field>
                  );
                })}
              </Fields>
            ))}

            <Segment color="blue" inverted>
              <Button type="submit" role="submit" size="large" color="yellow" fluid data-qa="continue-button">
                {i18n('CHECK_IN__MOBILE_BOARDING_PASS__CONTINUE_BUTTON')}
              </Button>
            </Segment>
          </Segments>
        </Form>
      </div>
    );
  }
}

const _buildFieldName = (flightIndex: number, passenger: *): string => {
  const travelerIdInLink = _.get(passenger, '_links.viewPassengerBoardingPass.body.travelerID[0]');
  const travelerId = _.get(passenger, 'travelerID', travelerIdInLink);
  const travelerSegmentIdentifier = _.get(passenger, 'travelerSegmentIdentifier');

  return `${flightIndex}-${travelerId}-${travelerSegmentIdentifier}`;
};

const _isEligibleForBoardingPass = (passenger: *): boolean => !!_.get(passenger, '_links.viewPassengerBoardingPass');

export default withForm({
  formValidator: chooseMobileBoardingPassesValidator,
  defaultValues: (props: Props) => {
    const { flights } = props;
    const initialFormData = {
      allPasses: true
    };

    _.forEach(flights, (flight, flightIndex: number) => {
      _.forEach(flight.passengers, (passenger) => {
        const fieldName = _buildFieldName(flightIndex, passenger);
        const isEligibleForBoardingPass = _isEligibleForBoardingPass(passenger);

        isEligibleForBoardingPass && _.set(initialFormData, `${fieldName}`, isEligibleForBoardingPass);
      });
    });

    return { ...initialFormData };
  }
})(ChooseMobileBoardingPassesForm);
