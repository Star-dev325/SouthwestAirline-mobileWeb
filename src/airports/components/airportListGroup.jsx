// @flow

import _ from 'lodash';
import React from 'react';
import AirportCard from 'src/airports/components/airportCard';
import type { AirportGroupData, AirportType } from 'src/shared/flow-typed/shared.types';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';

type Props = {
  airportGroupData: AirportGroupData,
  airports: Array<AirportType>,
  clearFormDataById: (string) => {},
  disableInternationals?: boolean,
  formId: string,
  group: string,
  groupId: string,
  handleMultiSelectRecentSearch: (airport: AirportType) => void,
  isMultiSelectGroupEnabled: boolean,
  isReaccomCoTerminalEligible?: boolean,
  onAirportSelect: (airport: AirportType) => void,
  onDeleteRecentAirportSearch?: (airport: AirportType) => void,
  setAirportGroupData: (data: AirportGroupData) => void,
  updateFormDataValueFn: (string, *) => {}
};

const AirportListGroup = (props: Props) => {
  const {
    airportGroupData,
    airports,
    clearFormDataById,
    formId,
    group,
    groupId,
    isMultiSelectGroupEnabled,
    isReaccomCoTerminalEligible,
    setAirportGroupData,
    updateFormDataValueFn
  } = props;
  const isMultiSelectGroup = isMultiSelectGroupEnabled && airports.every((airport) => airport?.multiSelectGroup?.length);
  const airportCards = airports.map((airport, index) => (
    isMultiSelectGroup ? (
      <FormCheckboxField
        clickableChildren
        key={`multiSelectGroup${airport.code}${index}`}
        name={airport.code}
        onChange={(value) => {
          onAirportSelectChange(airport, value);
        }}
      >
        <AirportCard airport={airport} disableOnClick {...props} />
      </FormCheckboxField>
    ) : (
      <AirportCard airport={airport} key={index} {...props} />
    )
  ));

  const onAirportSelectChange = (airportSelected, value) => {
    const { airportGroupId, airportGroups, code } = airportSelected;
    let groupData = [...airportGroupData];

    if (value) {
      if (!_.isEmpty(groupData)) {
        const sameGroup = airports.some((airport) => airport.airportGroups.includes(groupData[0]));

        if (!sameGroup) {
          groupData = [];
          clearFormDataById(formId);
        }
      }
      groupData.push(code);

      if (_.isEqual(_.sortBy(airportGroups), _.sortBy(groupData))) {
        updateFormDataValueFn(formId, { [airportGroupId]: true });
      }
    } else {
      _.remove(groupData, (airportCode) => airportCode === code);
      updateFormDataValueFn(formId, { [airportGroupId]: value });
    }
    setAirportGroupData(groupData);
  };

  const onAirportGroupSelectChange = (airportGroupId, value) => {
    const getGroupChildAirport = airports.filter((airport) => airport.airportGroupId === airportGroupId);
    const groupCode = [];

    clearFormDataById(formId);

    if (value) {
      const formDataValues = {};

      getGroupChildAirport.forEach((airport) => {
        formDataValues[airport.code] = true;
        groupCode.push(airport.code);
      });
      updateFormDataValueFn(formId, formDataValues);
    }
    setAirportGroupData(groupCode);
  };

  return (
    <div className="airport-group-container">
      {!isReaccomCoTerminalEligible && (<div className="airport-group-header">{group}</div>)}
      <ul className="airport-group">
        {isMultiSelectGroup ? (
          <Form formId={formId} onSubmit={() => {}}>
            <FormCheckboxField
              clickableChildren
              name={groupId}
              onChange={(value) => onAirportGroupSelectChange(groupId, value)}
            >
              <li>{`All ${group}`}</li>
            </FormCheckboxField>
            {airportCards}
          </Form>
        ) : (
          airportCards
        )}
      </ul>
    </div>
  );
};

export default withForm({ autoClearFormData: false })(AirportListGroup);
